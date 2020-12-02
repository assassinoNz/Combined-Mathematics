//@ts-check
export class BinaryExpressionNode {
    data = null;
    left = null;
    right = null;

    /**
     * @param {number} notation
     * @return {string[]}
     */
    tokenize(notation = ExpressionNotation.INFIX) {
        switch (notation) {
            case ExpressionNotation.PREFIX:
                return this.tokenizeToPrefix(this);
            case ExpressionNotation.INFIX:
                return this.tokenizeToInfix(this);
            case ExpressionNotation.POSTFIX:
                return this.tokenizeToPostfix(this);
            default:
                throw new Error("InvalidArgument: No such notation");
        }
    }

    /**
     * @param {BinaryExpressionNode} node
     * @return {string[]}
     */
    tokenizeToPrefix(node) {
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

    /**
     * @param {BinaryExpressionNode} node
     * @return {string[]}
     */
    tokenizeToInfix(node) {
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

    /**
     * @param {BinaryExpressionNode} node
     * @return {string[]}
     */
    tokenizeToPostfix(node) {
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

export class ExpressionNotation {
    static PREFIX = 0;
    static INFIX = 1;
    static POSTFIX = 2;
}

export class ExpressionContext {
    static ALGEBRA = 0;
    static LOGIC = 1;
    static BOOLEAN = 2;
}

export class ExpressionRegExp {
    static tokens = {
        variableOperand: /^-{0,1}[A-Z]{1}$/,
        numericOperand: /^-{0,1}\d{1,}$/,
        operands: /^-{0,1}[A-Z]{1}$|^-{0,1}\d{1,}$/,
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
     * @param {number} context
     * @return {number}
     */
    static getPrecedence(operator, context) {
        if (/[a-z]/.test(operator)) {
            //CASE: Operator is a function
            //Functions has the highest precedence
            return 4;
        } else {
            //WARNING: This code heavily relies on the switch statement's fall-through feature
            switch (context) {
                case ExpressionContext.ALGEBRA: {
                    switch (operator) {
                        case "+":
                        case "-":
                            return 1;
                        case "*":
                        case "/":
                        case ".":
                            return 2;
                        case "^":
                            return 3;
                        default:
                            throw SyntaxError(`No such operator "${operator}"`);
                    }
                }
                case ExpressionContext.BOOLEAN:
                case ExpressionContext.LOGIC: {
                    switch (operator) {
                        case "+":
                        case "|":
                        case "∨":
                        case "⊕":
                        case "^": //XOR
                        case "↔":
                        case "↓": //NOR
                            return 1;
                        case ".":
                        case "&":
                        case "→": //IMPLY
                        case ">": //IMPLY
                        case "∧":
                        case "↑": //NAND
                            return 2;
                        case "¬":
                        case "!":
                        case "~":
                            return 3;
                        default:
                            throw SyntaxError(`No such operator "${operator}"`);
                    }
                }
                default:
                    throw SyntaxError(`No such context "${context}"`);
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
            if (ExpressionRegExp.tokens.variableOperand.test(expressionTokens[t])) {
                //CASE: Token is a variable operand
                //NOTE: Variable operands may contain a "-" prefix
                valueDictionary[expressionTokens[t].replace("-", "")] = null;
            }
        }

        return valueDictionary;
    }

    /**Separates any expression into a its fundamental tokens.
     * WARNING: Negative numeric operands are not supported.
     * WARNING: Decimal numeric operands are not supported.
     * @param {string} expression
     * @param {number} context
     * @return {string[]} The expression separated into its fundamental tokens
    */
    static separateToTokens(expression, context) {
        //Remove all empty spaces before starting
        expression = expression.replace(/\s/g, "");

        let tokens = [];

        for (let c = 0; c < expression.length; c++) {
            if (ExpressionRegExp.tokens.variableOperand.test(expression[c]) || ExpressionRegExp.tokens.unaryOperators.test(expression[c])) {
                //CASE: Character is a variable operand or a unary operator token
                if (ExpressionRegExp.tokens.operands.test(tokens[tokens.length - 1])) {
                    //CASE: Previous token is an operand
                    //Since this character is a variable operand or a unary operator token, there must be a multiplication between them
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
     * @param {number} context
     * @return {string[]} The infix tokens rearranged in postfix notation
    */
    static infixToPostfix(infixTokens, context) {
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
                while ((operatorStack.length > 0) && (!ExpressionRegExp.tokens.openingBrackets.test(operatorStack[operatorStack.length - 1])) && (ExpressionMath.getPrecedence(operatorStack[operatorStack.length - 1], context) >= ExpressionMath.getPrecedence(infixTokens[c], context))) {
                    postfixTokens.push(operatorStack.pop());
                }
                operatorStack.push(infixTokens[c]);
            } else if (ExpressionRegExp.tokens.rightAssociativeOperators.test(infixTokens[c])) {
                //CASE: Token is a right associative operator
                while ((operatorStack.length > 0) && (!ExpressionRegExp.tokens.openingBrackets.test(operatorStack[operatorStack.length - 1])) && (ExpressionMath.getPrecedence(operatorStack[operatorStack.length - 1], context) > ExpressionMath.getPrecedence(infixTokens[c], context))) {
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
    static evaluateBinaryExpression(operator, operand1, operand2, context) {
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
    static evaluateUnaryExpression(operator, operand, context) {
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
     * Negates an operand value
     * @param {string} value
     * @param {number} context
     * @return {string} The value after negating it according to the context
     */
    static negateOperandValue(value, context) {
        switch (context) {
            case ExpressionContext.ALGEBRA: {
                if (value.startsWith("-")) {
                    return value.replace("-", "");
                } else {
                    return "-" + value;
                }
            }
            case ExpressionContext.BOOLEAN:
            case ExpressionContext.LOGIC: {
                if (value === "0") {
                    return "1";
                } else {
                    return "0";
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
     * @param valueDictionary A dictionary that maps a variable to it's value
     * @param {number} context
     * @return {string} The value after evaluating the complex expression
     */
    static evaluateExpression(postfixTokens, valueDictionary, context) {
        const valueStack = [];

        for (let t = 0; t < postfixTokens.length; t++) {
            if (ExpressionRegExp.tokens.variableOperand.test(postfixTokens[t])) {
                //CASE: Token is a variable operand
                let operandValue;

                if (postfixTokens[t].startsWith("-")) {
                    //CASE: Operand is negated
                    //Lookup its value in the valueDictionary and assign the negated value
                    operandValue = ExpressionMath.negateOperandValue(valueDictionary[postfixTokens[t].replace("-", "")], context);
                } else {
                    //Lookup its value in the valueDictionary and assign the value
                    operandValue = valueDictionary[postfixTokens[t]];
                }

                valueStack.push(operandValue);
            } if (ExpressionRegExp.tokens.numericOperand.test(postfixTokens[t])) {
                //CASE: Token is a numeric operand
                valueStack.push(postfixTokens[t]);
            } else if (ExpressionRegExp.tokens.binaryOperators.test(postfixTokens[t])) {
                //CASE: Token is a binary operator
                valueStack.push(ExpressionMath.evaluateBinaryExpression(postfixTokens[t], valueStack.pop(), valueStack.pop(), context));
            } else if (ExpressionRegExp.tokens.unaryOperators.test(postfixTokens[t])) {
                //CASE: Token is a unary operator
                valueStack.push(ExpressionMath.evaluateUnaryExpression(postfixTokens[t], valueStack.pop(), context));
            }
        }

        return valueStack[0];
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
                const tokenizedPostfixExpression = ExpressionMath.infixToPostfix(tokenizedInfixExpressions[e], ExpressionContext.BOOLEAN);
                const value = ExpressionMath.evaluateExpression(tokenizedPostfixExpression, valueDictionary, ExpressionContext.BOOLEAN);
                truthTable[tokenizedInfixExpressions[e].join(" ")][i] = value;
            }
        }

        return truthTable;
    }
}