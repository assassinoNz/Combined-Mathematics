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

export class ExpressionContext {
    static ALGEBRA = 0;
    static LOGIC = 1;
    static BOOLEAN = 2;
}

export class ExpressionRegExp {
    static tokens = {
        variableOperand: /^[A-Z]{1}$|^-[A-Z]{1}$/,
        numericOperand: /^\d{1,}$/,
        operands: /^-[A-Z]{1}$|^[A-Z]{1}$|^-\d{1,}$|^\d{1,}$/,
        leftAssociativeOperators: /^[*/.&→>∧↑¬~!↓↔⊕∨|+-]{1}$/,
        rightAssociativeOperators: /^\^{1}$/,
        binaryOperators: /^[*/.&→>∧↑^↓↔⊕∨|+-]{1}$/,
        unaryOperators: /^[¬~!]{1}$/,
        operators: /^[*/.&→>∧↑¬~!^↓↔⊕∨|+-]{1}$/,
        openingBrackets: /^[([{]{1}$/,
        closingBrackets: /^[)\]}]{1}$/,
        ignorables: /^,{1}$/,
        functionName: /^[a-z]{1,}$/
    };

    static characters = {
        //WARNING: Tokenizer can only recognize positive integers as numerical operands
        singleTokens: /^[,)(\][}{*/.&→>∧↑¬~!^↓↔⊕∨|+-]{1}$/,
        numericOperandCandidate: /^\d{1}$/, 
        functionNameCandidate: /^[a-z]{1}$/
    };

    static inverseBrackets = {
        ")": "(",
        "]": "[",
        "}": "{"
    }
}

export class ExpressionMath {
    /**
     * Returns the precedence index of the operator. Higher the index, the greater the precedence
     * @param {string} operator 
     * @return {number}
     */
    static getPrecedence(operator) {
        if (/[a-z]/.test(operator)) {
            //CASE: Operator is a function
            //Functions has the highest precedence
            return 4;
        } else {
            //WARNING: This code heavily relies on the switch statement's fall-through feature
            //WARNING: "^" operator as the XOR is not supported because it conflicts with the power operator
            switch (operator) {
                case "+":
                case "-":
                case "|":
                case "∨":
                case "⊕":
                case "↔":
                case "↓": //NOR
                    return 1;
                case "*":
                case "/":
                case ".":
                case "&":
                case "→": //IMPLY
                case ">": //IMPLY
                case "∧":
                case "↑": //NAND
                    return 2;
                case "^": //POWER (See warning)
                case "¬":
                case "!":
                case "~":
                    return 3;
                default:
                    throw SyntaxError(`No such operator "${operator}"`);
            }
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
     * @return {string[]} The tokens of the expression whose variables are replaced by values
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
     * @return {string[]} The expression separated into its fundamental tokens
    */
    static separateToTokens(expression, context) {
        //Remove all empty spaces before starting
        expression = expression.replace(/\s/g, "");

        let tokens = [];

        for (let c = 0; c < expression.length; c++) {
            if (ExpressionRegExp.tokens.variableOperand.test(expression[c])) {
                //CASE: Character is a variable operand token
                if (ExpressionRegExp.tokens.operands.test(tokens[tokens.length - 1])) {
                    //CASE: Previous token is also an operand
                    //Since this character is a variable operand token, there must be a multiplication between them
                    switch (context) {
                        case ExpressionContext.ALGEBRA: {
                            tokens.push("*");
                            break;
                        }
                        case ExpressionContext.BOOLEAN: {
                            tokens.push(".");
                            break;
                        }
                        case ExpressionContext.LOGIC: {
                            tokens.push("∧");
                            break;
                        }
                        default:
                            throw SyntaxError(`No such context "${context}"`);
                    }
                }
                tokens.push(expression[c]);
            } else if (ExpressionRegExp.characters.singleTokens.test(expression[c])) {
                //CASE: Character is an accepted token
                tokens.push(expression[c]);
            } else if (ExpressionRegExp.characters.functionNameCandidate.test(expression[c])) {
                //CASE: Character is a function name starting character
                //Read ahead to capture the full function name token
                let functionNameToken = "";
                let c2 = c;
                while (ExpressionRegExp.characters.functionNameCandidate.test(expression[c2])) {
                    functionNameToken += expression[c2];
                    c2++;
                }
                c = c2 - 1;
                tokens.push(functionNameToken);
            } else if (ExpressionRegExp.characters.numericOperandCandidate.test(expression[c])) {
                //CASE: Character is numeric operand starting digit
                //WARNING: Tokenizer can only recognize positive integers as numerical operands
                //Read ahead to capture the full numeric operand token
                let numericOperandToken = "";
                let c2 = c;
                while (ExpressionRegExp.characters.numericOperandCandidate.test(expression[c2])) {
                    numericOperandToken += expression[c2];
                    c2++;
                }
                c = c2 - 1;
                tokens.push(numericOperandToken);
            } else {
                throw SyntaxError(`Unknown token "${expression[c]}"`);
            }
        }

        return tokens;
    }

    /**Converts a tokenized infix expression into a postfix expression using the Shunting Yard algorithm
     * @param {string[]} infixTokens
     * @return {string[]} The infix tokens rearranged in postfix notation
    */
    static infixToPostfix(infixTokens) {
        let postfixTokens = [];
        let operatorStack = [];

        for (let c = 0; c < infixTokens.length; c++) {
            if (ExpressionRegExp.tokens.ignorables.test(infixTokens[c])) {
                //CASE: Token is a non-significant character
                //Do nothing
            } else if (ExpressionRegExp.tokens.operands.test(infixTokens[c])) {
                //CASE: Token is an operand
                postfixTokens.push(infixTokens[c]);
            } else if (ExpressionRegExp.tokens.functionName.test(infixTokens[c])) {
                //CASE: Token is a function name
                //NOTE: Functions are treated as operators
                operatorStack.push(infixTokens[c]);
            } else if (ExpressionRegExp.tokens.leftAssociativeOperators.test(infixTokens[c])) {
                //CASE: Token is a left associative operator
                while ((operatorStack.length > 0) && (!ExpressionRegExp.tokens.openingBrackets.test(operatorStack[operatorStack.length - 1])) && (ExpressionMath.getPrecedence(operatorStack[operatorStack.length - 1]) >= ExpressionMath.getPrecedence(infixTokens[c]))) {
                    postfixTokens.push(operatorStack.pop());
                }
                operatorStack.push(infixTokens[c]);
            } else if (ExpressionRegExp.tokens.rightAssociativeOperators.test(infixTokens[c])) {
                //CASE: Token is a right associative operator
                while ((operatorStack.length > 0)&& (!ExpressionRegExp.tokens.openingBrackets.test(operatorStack[operatorStack.length - 1])) && (ExpressionMath.getPrecedence(operatorStack[operatorStack.length - 1]) > ExpressionMath.getPrecedence(infixTokens[c]))) {
                    postfixTokens.push(operatorStack.pop());
                }
                operatorStack.push(infixTokens[c]);
            } else if (ExpressionRegExp.tokens.openingBrackets.test(infixTokens[c])) {
                //CASE: Token is an opening bracket
                operatorStack.push(infixTokens[c]);
            } else if (ExpressionRegExp.tokens.closingBrackets.test(infixTokens[c])) {
                //CASE: Token is a closing bracket
                //Unload the stack until a matching opening bracket becomes the top of the stack or stack is empty
                while ((operatorStack.length > 0) && (operatorStack[operatorStack.length - 1] !== ExpressionRegExp.inverseBrackets[infixTokens[c]])) {
                    postfixTokens.push(operatorStack.pop());
                }

                //NOTE: Now the top of the stack has a matching opening bracket
                //Discard it
                operatorStack.pop();
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
     * @param {number} context
     * @return {string} The value after evaluating the single binary expression
     */
    static solveBinaryExpression(operator, operand1, operand2, context) {
        //WARNING: This code heavily relies on the switch statement's fall-through feature

        switch (context) {
            case ExpressionContext.ALGEBRA: {
                switch (operator) {
                    case "+":
                        return `${parseFloat(operand1) + parseFloat(operand2)}`;
                    case "-":
                        return `${parseFloat(operand2) - parseFloat(operand1)}`;
                    case ".":
                    case "*":
                        return `${parseFloat(operand1) * parseFloat(operand2)}`;
                    case "/":
                        return `${parseFloat(operand2) / parseFloat(operand1)}`;
                    case "^":
                        return `${parseFloat(operand2) ** parseFloat(operand1)}`;
                    default:
                        throw SyntaxError(`No such operator "${operator}" for the given context "${context}"`);
                }
            }
            case ExpressionContext.BOOLEAN:
            case ExpressionContext.LOGIC: {
                switch (operator) {
                    case "+":
                    case "|":
                    case "∨": {
                        if (operand1 === "1" || operand2 === "1") {
                            return "1";
                        } else {
                            return "0";
                        }
                    }
                    case ".":
                    case "&":
                    case "∧": {
                        if (operand1 === "1" && operand2 === "1") {
                            return "1";
                        } else {
                            return "0";
                        }
                    }
                    case ">":
                    case "→": {
                        if (operand2 === "1" && operand1 === "0") {
                            return "0";
                        } else {
                            return "1";
                        }
                    }
                    case "↔": {
                        if (operand1 === operand2) {
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
                    case "↑": {
                        if (operand1 === "1" && operand2 === "1") {
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
                        throw SyntaxError(`No such operator "${operator}" for the given context "${context}"`);
                }
            }
            default: {
                throw SyntaxError(`No such context "${context}"`);
            }
        }
    }


    /**
     * Returns the value after applying the specified operator on operand1 and operand2
     * @param {string} operator 
     * @param {string} operand
     * @param {number} context
     * @return {string} The value after evaluating the single unary expression
     */
    static solveUnaryExpression(operator, operand, context) {
        switch (context) {
            case ExpressionContext.BOOLEAN:
            case ExpressionContext.LOGIC: {
                switch (operator) {
                    case "~":
                    case "!":
                    case "¬": {
                        if (operand === "1") {
                            return "0";
                        } else {
                            return "1";
                        }
                    }
                    default:
                        throw SyntaxError(`No such operator "${operator}" for the given context "${context}"`);
                }
            }
            default: {
                throw SyntaxError(`No such context "${context}"`);
            }
        }
    }

    /**
     * Solves an expression with only numeric operands to a single value
     * @param {string[]} postfixTokens Must be an expression with only numeric operands
     * @return {string} The value after evaluating the complex expression
     */
    static evaluateExpression(postfixTokens, context) {
        const stack = [];

        for (let t = 0; t < postfixTokens.length; t++) {
            if (ExpressionRegExp.tokens.numericOperand.test(postfixTokens[t])) {
                //CASE: Token is a numeric operand
                stack.push(postfixTokens[t]);
            } else if (ExpressionRegExp.tokens.binaryOperators.test(postfixTokens[t])) {
                //CASE: Token is a binary operator
                stack.push(ExpressionMath.solveBinaryExpression(postfixTokens[t], stack.pop(), stack.pop(), context));
            } else if (ExpressionRegExp.tokens.unaryOperators.test(postfixTokens[t])) {
                //CASE: Token is a unary operator
                stack.push(ExpressionMath.solveUnaryExpression(postfixTokens[t], stack.pop(), context));
            }
        }

        return stack[0];
    }

    /**
     * Solves an expression with only numeric operands to a single value
     * @param {string[]} postfixTokens Must be an expression with only numeric operands
     * @return {BinaryExpressionNode} The root node of the expression tree
     */
    static generateExpressionTree(postfixTokens) {
        const nodeStack = [];

        for (let t = 0; t < postfixTokens.length; t++) {
            if (ExpressionRegExp.tokens.operands.test(postfixTokens[t])) {
                //CASE: Token is an operand
                const node = new BinaryExpressionNode();
                node.data = postfixTokens[t];
                nodeStack.push(node);
            } else if (ExpressionRegExp.tokens.binaryOperators.test(postfixTokens[t]) || ExpressionRegExp.tokens.functionName.test(postfixTokens[t])) {
                //CASE: Token is a function name or a binary operator
                const node = new BinaryExpressionNode();
                node.data = postfixTokens[t];
                node.right = nodeStack.pop();
                node.left = nodeStack.pop();
                nodeStack.push(node);
            } else if (ExpressionRegExp.tokens.unaryOperators.test(postfixTokens[t])) {
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
    /**
     * Generates a truth table where the tokenizedInfixExpressions are represented by its columns
     * @param valueDictionary Must contain entries for the variables used in infixExpressions
     * @param {string[][]} tokenizedInfixExpressions Must be tokenized properly
     */
    static generateTruthTable(valueDictionary, tokenizedInfixExpressions) {
        const variables = Object.keys(valueDictionary);
        const truthTable = {
            // "P": [],
            // "Q": [],
            // "P→Q": [],
            //"¬P∨Q": [],
            //"¬Q→¬P": []
        }

        for (const tokenizedInfixExpression of tokenizedInfixExpressions) {
            truthTable[tokenizedInfixExpression.join(" ")] = [];
        }

        for (let i = 0; i < 2 ** variables.length; i++) {
            //Generate a new set of variable values
            const binaryString = i.toString(2);
            const generatedValues = ("0".repeat(variables.length - binaryString.length) + binaryString).split("");

            //Update valueDictionary
            for (let v = 0; v < variables.length; v++) {
                valueDictionary[variables[v]] = generatedValues[v];
            }

            //Evaluate each expression using the updated valueDictionary
            for (let e = 0; e < tokenizedInfixExpressions.length; e++) {
                const replacedInfix = ExpressionMath.replaceVariablesByValues(tokenizedInfixExpressions[e], valueDictionary);
                const replacedPostFix = ExpressionMath.infixToPostfix(replacedInfix);
                const value = ExpressionMath.evaluateExpression(replacedPostFix, ExpressionContext.BOOLEAN);
                truthTable[tokenizedInfixExpressions[e].join(" ")][i] = value;
            }
        }

        return truthTable;
    }
}