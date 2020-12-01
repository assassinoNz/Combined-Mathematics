//@ts-check
export class BinaryExpressionNode {
    data = null;
    left = null;
    right = null;

    tokenize(notation = "INFIX") {
        switch (notation) {
            case "PREFIX":
                return this.tokenizeToPrefix();
            case "INFIX":
                return this.tokenizeToInfix();
            case "POSTFIX":
                return this.tokenizeToPostfix();
            default:
                throw new Error("InvalidArgument: No such notation");
        }
    }

    tokenizeToPrefix(node = this) {
        if (node.left === null && node.right === null) {
            //CASE: Node is a leaf
            return [node.data];
        } else if (node.left instanceof BinaryExpressionNode && node.right === null) {
            //CASE: Node is a unary operator
            return [node.data, ...this.tokenizeToPrefix(node.left)];
        } else if (node.left instanceof BinaryExpressionNode && node.right instanceof BinaryExpressionNode) {
            //CASE: Node is a binary operator
            return [node.data, ...this.tokenizeToPrefix(node.left), ...this.tokenizeToPrefix(node.right)];
        }
    }

    tokenizeToInfix(node = this) {
        if (node.left === null && node.right === null) {
            //CASE: Node is a leaf
            return [node.data];
        } else if (node.left instanceof BinaryExpressionNode && node.right === null) {
            //CASE: Node is a unary operator
            return ["(", node.data, ...this.tokenizeToInfix(node.left), ")"];
        } else if (node.left instanceof BinaryExpressionNode && node.right instanceof BinaryExpressionNode) {
            //CASE: Node is a binary operator
            return ["(", ...this.tokenizeToInfix(node.left), node.data, ...this.tokenizeToInfix(node.right), ")"];
        }
    }

    tokenizeToPostfix(node = this) {
        if (node.left === null && node.right === null) {
            //CASE: Node is a leaf
            return [node.data];
        } else if (node.left instanceof BinaryExpressionNode && node.right === null) {
            //CASE: Node is a unary operator
            return [...this.tokenizeToPostfix(node.left), node.data];
        } else if (node.left instanceof BinaryExpressionNode && node.right instanceof BinaryExpressionNode) {
            //CASE: Node is a binary operator
            return [...this.tokenizeToPostfix(node.left), ...this.tokenizeToPostfix(node.right), node.data];
        }
    }
}

export class ExpressionMath {
    /**
     * Returns the precedence index of the operator
     * @param {string} operator 
     * @return {number}
     */
    static getPrecedence(operator) {
        const opPrecedence = {
            //Algebraic Operators
            "+": 2,
            "-": 2,
            "*": 3,
            "/": 3,
            "^": 4,
            //Logical operators
            "↔": 2,
            "→": 3,
            "∨": 4,
            "↓": 4,
            "⊕": 4,
            "∧": 5,
            ".": 5,
            "↑": 5,
            "¬": 6,
        }

        if (/[a-z]/.test(operator)) {
            //CASE: Operator is a function
            //Functions has the highest precedence
            return 7;
        } else {
            return opPrecedence[operator];
        }
    }

    /**
     * Generates an empty value dictionary for a given expression
     * @param expressionTokens 
     */
    static generateEmptyValueDictionary(expressionTokens) {
        const valueDictionary = {};

        for (let t = 0; t < expressionTokens.length; t++) {
            if (/^[A-Z]/.test(expressionTokens[t])) {
                //CASE: Token is a variable operand
                valueDictionary[expressionTokens[t]] = null;
            } else if (/^[-A-Z]/.test(expressionTokens[t])) {
                valueDictionary[expressionTokens[t].replace("-", "")] = null;
            }
        }

        return valueDictionary;
    }

    /**
     * Replaces all the matching variable operands in an expression with their values
     * @param {string[]} expressionTokens 
     * @param valueDictionary A dictionary that maps a variable to it's value
     */
    static replaceVariablesByValues(expressionTokens, valueDictionary) {
        const replacedExpression = JSON.parse(JSON.stringify(expressionTokens));

        for (let t = 0; t < expressionTokens.length; t++) {
            if (/[A-Z]|-[A-Z]/.test(expressionTokens[t])) {
                //CASE: Token is a variable operand
                //NOTE: The token may have "-" prefixed to it. Therefore only the english letter must be replaced
                const englishLetter = expressionTokens[t].match(/[A-Z]/)[0];
                replacedExpression[t] = expressionTokens[t].replace(englishLetter, valueDictionary[englishLetter]);

                if (replacedExpression[t].startsWith("--")) {
                    //CASE: Variable operand is negated and the english letter also has a negative value
                    //NOTE: This causes the english letter to be prefixed with "--". We can safely remove that "--"
                    replacedExpression[t] = replacedExpression[t].replace("--", "");
                }
            }
        }

        return replacedExpression;
    }

    /**Separates any expression into a its fundamental tokens.
     * WARNING: Negative numeric operands are not supported.
     * WARNING: Decimal numeric operands are not supported.
     * @param {string} expression
     * @return {string[]} The expression separated into tokens
    */
    static separateToTokens(expression) {
        //Remove all empty spaces before starting
        expression = expression.replace(/\s/g, "");

        let tokens = [];

        for (let c = 0; c < expression.length; c++) {
            if (/[A-Z]/.test(expression[c])) {
                //CASE: Character is a variable operand
                if (/[A-Z\d]/.test(tokens[tokens.length - 1])) {
                    //CASE: Previous token is a numeric operand or a variable operand
                    //Since this character is a variable operand, there must be a multiplication between them
                    tokens.push("*");
                }
                tokens.push(expression[c]);
            } else if (/[,.↓⊕↑↔∨→¬∧/+*^()=-]/.test(expression[c])) {
                //CASE: Character is a single token
                tokens.push(expression[c]);
            } else if (/[a-z]/.test(expression[c])) {
                //CASE: Character is a function name starting character
                //Read ahead to capture the full function name
                let functionName = "";
                let c2 = c;
                while (/[a-z]/.test(expression[c2])) {
                    functionName += expression[c2];
                    c2++;
                }
                c = c2 - 1;
                tokens.push(functionName);
            } else if (/\d/.test(expression[c])) {
                //CASE: Character is digit
                //Read ahead to capture the full number
                let number = "";
                let c2 = c;
                while (/\d/.test(expression[c2])) {
                    number += expression[c2];
                    c2++;
                }
                c = c2 - 1;
                tokens.push(number);
            } else {
                throw SyntaxError(`Unknown token "${expression[c]}"`);
            }
        }

        return tokens;
    }

    /**Converts a tokenized infix expression into a postfix expression using the Shunting Yard algorithm
     * @param {string} infixTokens
     * @return {string[]} The postfix tokens of the given infix tokens
    */
    static infixToPostfix(infixTokens) {
        let postfixTokens = [];
        let operatorStack = [];

        for (let c = 0; c < infixTokens.length; c++) {
            if (/,/.test(infixTokens[c])) {
                //CASE: Token is a non-significant character
                //Do nothing
            } else if (/[A-Z\d]|-[A-Z\d]/.test(infixTokens[c])) {
                //CASE: Token is an operand
                postfixTokens.push(infixTokens[c]);
            } else if (/[a-z]/.test(infixTokens[c])) {
                //CASE: Token is a function name
                operatorStack.push(infixTokens[c]);
            } else if (/[.↓⊕↑↔∨→¬∧/+*-]/.test(infixTokens[c])) {
                //CASE: Token is a left associative operator
                while ((operatorStack.length > 0) && (ExpressionMath.getPrecedence(operatorStack[operatorStack.length - 1]) >= ExpressionMath.getPrecedence(infixTokens[c])) && (operatorStack[operatorStack.length - 1] !== "(")) {
                    postfixTokens.push(operatorStack.pop());
                }
                operatorStack.push(infixTokens[c]);
            } else if (/\^/.test(infixTokens[c])) {
                //CASE: Token is a right associative operator
                while ((operatorStack.length > 0) && (ExpressionMath.getPrecedence(operatorStack[operatorStack.length - 1]) > ExpressionMath.getPrecedence(infixTokens[c])) && (operatorStack[operatorStack.length - 1] !== "(")) {
                    postfixTokens.push(operatorStack.pop());
                }
                operatorStack.push(infixTokens[c]);
            } else if (infixTokens[c] === "(") {
                //CASE: Token is a left parenthesis
                operatorStack.push(infixTokens[c]);
            } else if (infixTokens[c] === ")") {
                //CASE: Token is a right parenthesis

                //Unload the stack until "(" becomes the top of the stack or stack is empty
                while ((operatorStack.length > 0) && (operatorStack[operatorStack.length - 1] !== "(")) {
                    postfixTokens.push(operatorStack.pop());
                }

                if (operatorStack[operatorStack.length - 1] === "(") {
                    //CASE: Top of the stack has a left parenthesis
                    //Discard it
                    operatorStack.pop();
                }
            } else {
                throw SyntaxError(`Invalid token "${infixTokens[c]}"`);
            }
        }

        while (operatorStack.length > 0) {
            postfixTokens.push(operatorStack.pop());
        }

        return postfixTokens;
    }

    /**
     * Returns the value after applying the specified operator on operand1 and operand2
     * @param {string} operator 
     * @param {string} operand1 
     * @param {string} operand2 
     */
    static solveBinaryExpression(operator, operand1, operand2) {
        switch (operator) {
            //Algebraic Operators
            case "+":
                return `${parseFloat(operand1) + parseFloat(operand2)}`;
            case "-":
                return `${parseFloat(operand2) - parseFloat(operand1)}`;
            case "*":
                return `${parseFloat(operand1) * parseFloat(operand2)}`;
            case "/":
                return `${parseFloat(operand2) / parseFloat(operand1)}`;
            case "^":
                return `${parseFloat(operand2) ** parseFloat(operand1)}`;
            //Logical Operators
            case "↔": {
                if (operand1 === operand2) {
                    return "1";
                } else {
                    return "0";
                }
            }
            case "→": {
                if (operand2 === "1" && operand1 === "0") {
                    return "0";
                } else {
                    return "1";
                }
            }
            case ".": {
                if (operand1 === "1" && operand2 === "1") {
                    return "1";
                } else {
                    return "0";
                }
            }
            case "∧": {
                if (operand1 === "1" && operand2 === "1") {
                    return "1";
                } else {
                    return "0";
                }
            }
            case "↑": {
                if (operand1 === "1" && operand2 === "1") {
                    return "0";
                } else {
                    return "1";
                }
            }
            case "∨": {
                if (operand1 === "1" || operand2 === "1") {
                    return "1";
                } else {
                    return "0";
                }
            }
            case "⊕": {
                if (operand1 === operand2) {
                    return "0";
                } else {
                    return "1";
                }
            }
            case "↓": {
                if (operand1 === "0" && operand2 === "0") {
                    return "1";
                } else {
                    return "0";
                }
            }
            default:
                throw SyntaxError(`No such operator "${operator}"`);
        }
    }

    /**
     * Returns the value after applying the specified operator on operand1 and operand2
     * @param {string} operator 
     * @param {string} operand
     */
    static solveUnaryExpression(operator, operand) {
        switch (operator) {
            case "¬": {
                if (operand === "1") {
                    return "0";
                } else {
                    return "1";
                }
            }
            default:
                throw SyntaxError(`No such operator "${operator}"`);
        }
    }

    /**
     * Solves an expression with only numeric operands to a single value
     * @param postfixExpressionTokens Must be an expression with only numeric operands
     */
    static evaluateExpression(postfixExpressionTokens) {
        const stack = [];

        for (let t = 0; t < postfixExpressionTokens.length; t++) {
            if (/-\d|\d/.test(postfixExpressionTokens[t])) {
                //CASE: Token is a numeric operand
                stack.push(postfixExpressionTokens[t]);
            } else if (/[.↓⊕↑↔∨→∧+*/^-]/.test(postfixExpressionTokens[t])) {
                //CASE: Token is a binary operator
                stack.push(ExpressionMath.solveBinaryExpression(postfixExpressionTokens[t], stack.pop(), stack.pop()));
            } else if (/¬/.test(postfixExpressionTokens[t])) {
                //CASE: Token is a unary operator
                stack.push(ExpressionMath.solveUnaryExpression(postfixExpressionTokens[t], stack.pop()));
            }
        }

        return stack[0];
    }

    static generateExpressionTree(postfixTokens) {
        const nodeStack = [];

        for (let t = 0; t < postfixTokens.length; t++) {
            if (/[A-Z\d]|-[A-Z]/.test(postfixTokens[t])) {
                //CASE: Token is an operand
                const node = new BinaryExpressionNode();
                node.data = postfixTokens[t];
                nodeStack.push(node);
            } else if (/[a-z.↓⊕↑↔∨→∧+^*/-]/.test(postfixTokens[t])) {
                //CASE: Token is a function name or a binary operator
                const node = new BinaryExpressionNode();
                node.data = postfixTokens[t];
                node.right = nodeStack.pop();
                node.left = nodeStack.pop();
                nodeStack.push(node);
            } else if (/¬/.test(postfixTokens[t])) {
                //CASE: Token is a unary operator
                const node = new BinaryExpressionNode();
                node.data = postfixTokens[t];
                node.left = nodeStack.pop();
                nodeStack.push(node);
            }
        }

        return nodeStack.pop();
    }
}

export class BooleanMath {
    static generateTruthTable(valueDictionary, tokenizedInfixExpressions) {
        const variables = Object.keys(valueDictionary);
        const truthTable = {
            // "P": [],
            // "Q": [],
            // "P→Q": []
        }

        for (const tokenizedInfixExpression of tokenizedInfixExpressions) {
            truthTable[tokenizedInfixExpression.join(" ")] = [];
        }

        for (let i = 0; i < 2**variables.length; i++) {
            //Generate a new set of variable values
            const binaryString = i.toString(2);
            const generatedValues = ("0".repeat(variables.length-binaryString.length) + binaryString).split("");

            //Update valueDictionary
            for (let v = 0; v < variables.length; v++) {
                valueDictionary[variables[v]] = generatedValues[v]; 
            }

            //Evaluate each expression using the updated valueDictionary
            for (let e = 0; e < tokenizedInfixExpressions.length; e++) {
                const replacedInfix = ExpressionMath.replaceVariablesByValues(tokenizedInfixExpressions[e], valueDictionary);
                const replacedPostFix = ExpressionMath.infixToPostfix(replacedInfix);
                const value = ExpressionMath.evaluateExpression(replacedPostFix);
                truthTable[tokenizedInfixExpressions[e].join(" ")][i] = value;
            }
        }

        return truthTable;
    }
}