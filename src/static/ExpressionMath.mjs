import { MatrixMath } from "./MatrixMath.mjs";
import { BasicMath } from "./BasicMath.mjs";
import { CustomMath } from "./CustomMath.mjs";

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
    static REAL = 0;
    static BIG_INTEGER = 1;
    static BINARY = 2;
    static BOOLEAN = 3;
    static MATRIX = 4;
    static SET = 5;
    static STRING = 6;
}

export class ExpressionRegExp {
    static tokens = {
        variableOperand: /^-{0,1}[A-Z]{1}$/,
        numericOperand: /^-{0,1}\d{1,}[.]{0,1}\d{1,}$/,
        stringOperand: /^".*"$/,
        operand: /^-{0,1}[A-Z]{1}$|^-{0,1}\d{1,}[.]{0,1}\d{1,}$|^['"].*['"]$/,
        leftAssociativeOperator: /^[*/%.&→>∧↑↓↔⊕∨|+-]{1}$/,
        rightAssociativeOperator: /^[¬~!^]{1}$/,
        binaryOperator: /^[*/%.&→>∧↑^↓↔⊕∨|+-]{1}$/,
        unaryOperator: /^[¬~!]{1}$/,
        operator: /^[*/*.&→>∧↑¬~!^↓↔⊕∨|+-]{1}$/,
        openingBracket: /^[([{]{1}$/,
        closingBracket: /^[)\]}]{1}$/,
        ignorable: /^,{1}$/,
        binaryFunction: /^log|max|min|gcd|lcm|npr|ncr|levenshtein|concatenate$/,
        unaryFunction: /^abs|sin|cos|tan|floor|ceil|name$/,
        functionName: /^[a-z]{1,}$/
    };

    static characters = {
        //WARNING: Tokenizer can only recognize positive integers as numerical operands
        singleToken: /^[,=)(\][}{*/%.&→>∧↑¬~!^↓↔⊕∨|+-]{1}$/,
        numericOperandCandidate: /^\d{1}$/,
        stringOperandCandidate: /^['"]$/,
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
        if (ExpressionRegExp.tokens.functionName.test(operator)) {
            //CASE: Operator is a function
            //Functions has the highest precedence
            return 10;
        } else {
            //WARNING: This code heavily relies on the switch statement's fall-through feature
            switch (context) {
                case ExpressionContext.BIG_INTEGER:
                case ExpressionContext.REAL: {
                    switch (operator) {
                        case "+":
                        case "-":
                            return 1;
                        case "*":
                        case "/":
                        case "%":
                        case ".":
                            return 2;
                        case "^": //POWER
                            return 3;
                        default:
                            throw SyntaxError(`Operator "${operator}" isn't defined for the the context "${context}"`);
                    }
                }
                case ExpressionContext.BINARY:
                case ExpressionContext.BOOLEAN: {
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
                            throw SyntaxError(`Operator "${operator}" isn't defined for the the context "${context}"`);
                    }
                }
                case ExpressionContext.MATRIX: {
                    switch (operator) {
                        case "+":
                        case "-":
                            return 1;
                        case "*":
                        case ".":
                            return 2;
                        case "^": //POWER
                        case "!": //INVERSE
                        case "~": //INVERSE
                        case "¬": //INVERSE
                            return 3;
                        default:
                            throw SyntaxError(`Operator "${operator}" isn't defined for the the context "${context}"`);
                    }
                }
                case ExpressionContext.STRING: {
                    switch (operator) {
                        case "+": //CONCATENATION
                            return 1;
                        default:
                            throw SyntaxError(`Operator "${operator}" isn't defined for the the context "${context}"`);
                    }
                }
                default:
                    throw TypeError(`Operator "${operator}" isn't defined for the context "${context}"`);
            }
        }
    }

    /**
     * Returns all the variables in an expression
     * @param tokens
     * @return {Set} All the variables found in the expression
     */
    static getVariables(tokens) {
        const variables = new Set();

        for (let t = 0; t < tokens.length; t++) {
            if (ExpressionRegExp.tokens.variableOperand.test(tokens[t])) {
                //CASE: Token is a variable operand
                //NOTE: Variable operands may contain a "-" prefix
                variables.add(tokens[t].replace("-", ""));
            }
        }

        return variables;
    }

    /**
     * Generates an empty value dictionary for a given expression
     * @param tokens
     */
    static generateEmptyValueDictionary(tokens) {
        const valueDictionary = {};

        for (let t = 0; t < tokens.length; t++) {
            if (ExpressionRegExp.tokens.variableOperand.test(tokens[t])) {
                //CASE: Token is a variable operand
                //NOTE: Variable operands may contain a "-" prefix
                valueDictionary[tokens[t].replace("-", "")] = null;
            }
        }

        return valueDictionary;
    }

    /**Separates any expression into a its fundamental tokens.
     * WARNING: Decimal numeric operands are not supported.
     * @param {string} expression
     * @param {number} context
     * @return {string[]} The expression separated into its fundamental tokens
    */
    static separateToTokens(expression, context) {
        //Remove all empty spaces before starting
        expression = expression.replace(/\s/g, "");

        let tokens = [];

        //STAGE 1
        for (let c = 0; c < expression.length; c++) {
            if (ExpressionRegExp.tokens.variableOperand.test(expression[c]) || ExpressionRegExp.tokens.openingBracket.test(expression[c]) || ExpressionRegExp.tokens.unaryOperator.test(expression[c])) {
                //CASE: Character is a variable operand or an opening bracket or a unary operator
                if (ExpressionRegExp.tokens.operand.test(tokens[tokens.length - 1])) {
                    //CASE: Previous token is an operand
                    //There must be a multiplication between them
                    switch (context) {
                        case ExpressionContext.BIG_INTEGER:
                        case ExpressionContext.REAL: {
                            tokens.push("*");
                            break;
                        }
                        case ExpressionContext.MATRIX:
                        case ExpressionContext.BINARY: {
                            tokens.push(".");
                            break;
                        }
                        case ExpressionContext.BOOLEAN: {
                            tokens.push("∧");
                            break;
                        }
                    }
                }
                tokens.push(expression[c]);
            } else if (ExpressionRegExp.characters.singleToken.test(expression[c])) {
                //CASE: Character is an accepted token
                tokens.push(expression[c]);
            } else if (ExpressionRegExp.characters.functionNameCandidate.test(expression[c])) {
                //CASE: Character is a function name starting character
                if (ExpressionRegExp.tokens.operand.test(tokens[tokens.length - 1])) {
                    //CASE: Previous token is an operand
                    //There must be a multiplication between them
                    switch (context) {
                        case ExpressionContext.BIG_INTEGER:
                        case ExpressionContext.REAL: {
                            tokens.push("*");
                            break;
                        }
                        case ExpressionContext.MATRIX:
                        case ExpressionContext.BINARY: {
                            tokens.push(".");
                            break;
                        }
                        case ExpressionContext.BOOLEAN: {
                            tokens.push("∧");
                            break;
                        }
                    }
                }

                //Read ahead to capture the full function name token
                let functionNameToken = "";
                while (ExpressionRegExp.characters.functionNameCandidate.test(expression[c])) {
                    functionNameToken += expression[c];
                    c++;
                }
                c--;
                tokens.push(functionNameToken);
            } else if (ExpressionRegExp.characters.numericOperandCandidate.test(expression[c])) {
                //CASE: Character is numeric operand starting digit
                //NOTE: In the first stage, tokenizer can only recognize positive integers as numerical operands
                //Read ahead to capture the full numeric operand token
                let numericOperandToken = "";
                while (ExpressionRegExp.characters.numericOperandCandidate.test(expression[c])) {
                    numericOperandToken += expression[c];
                    c++;
                }
                c--;
                tokens.push(numericOperandToken);
            } else if (ExpressionRegExp.characters.stringOperandCandidate.test(expression[c])) {
                //CASE: Character is string operand starting quote
                //Read ahead to capture the full string operand token

                //Save the quote to find the string operand end
                const quote = expression[c];

                //stringOperandToken should be started with a double quote
                let stringOperandToken = '"';

                //Position must be incremented before acquiring other inner content of the quote
                c++;
                while (expression[c] !== quote) {
                    stringOperandToken += expression[c];
                    c++;
                }

                //NOTE: The while loop ends at the position where c is the ending quote
                stringOperandToken += '"';
                tokens.push(stringOperandToken);
            } else {
                throw SyntaxError(`Unknown token "${expression[c]}"`);
            }
        }

        //NOTE: Expressions starting with negative operands must be treated accordingly
        //EX: -A-B
        for (let t = 0; t < tokens.length; t++) {
            if (/^[+-]$/.test(tokens[t])) {
                //CASE: token is either + or -
                if (t === 0 || ExpressionRegExp.tokens.operator.test(tokens[t - 1]) || ExpressionRegExp.tokens.openingBracket.test(tokens[t - 1])) {
                    //CASE: Previous token is an opening bracket or an operand or this is the first token in the tokens
                    //This + or - token must be the sign of an operand
                    if (ExpressionRegExp.tokens.operand.test(tokens[t + 1])) {
                        //Case: Next token is an operand

                        if (tokens[t] === "-") {
                            //CASE: Current token is "-"
                            //Prefix the next operand with the current token before discarding the current token
                            tokens[t + 1] = tokens[t] + tokens[t + 1];
                        }

                        //Remove the current token
                        //WARNING: This changes the length of the tokens array
                        tokens.splice(t, 1);
                        t--;
                    }
                }
            }
        }
        // if (tokens[0] === "-" && ExpressionRegExp.tokens.operand.test(tokens[1])) {
        //     //CASE: Expression starts with a negative sign followed by an operand
        //     //Make the operand sign negative
        //     tokens[1] = "-" + tokens[1];
        //     tokens.shift();
        // }

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

        for (let t = 0; t < infixTokens.length; t++) {
            if (ExpressionRegExp.tokens.ignorable.test(infixTokens[t])) {
                //CASE: Token is a non-significant character
                //Do nothing
            } else if (ExpressionRegExp.tokens.operand.test(infixTokens[t])) {
                //CASE: Token is an operand
                postfixTokens.push(infixTokens[t]);
            } else if (ExpressionRegExp.tokens.functionName.test(infixTokens[t])) {
                //CASE: Token is a function name
                //NOTE: Functions are treated as operators
                operatorStack.push(infixTokens[t]);
            } else if (ExpressionRegExp.tokens.leftAssociativeOperator.test(infixTokens[t])) {
                //CASE: Token is a left associative operator
                while ((operatorStack.length > 0) && (!ExpressionRegExp.tokens.openingBracket.test(operatorStack[operatorStack.length - 1])) && (ExpressionMath.getPrecedence(operatorStack[operatorStack.length - 1], context) >= ExpressionMath.getPrecedence(infixTokens[t], context))) {
                    postfixTokens.push(operatorStack.pop());
                }
                operatorStack.push(infixTokens[t]);
            } else if (ExpressionRegExp.tokens.rightAssociativeOperator.test(infixTokens[t])) {
                //CASE: Token is a right associative operator
                while ((operatorStack.length > 0) && (!ExpressionRegExp.tokens.openingBracket.test(operatorStack[operatorStack.length - 1])) && (ExpressionMath.getPrecedence(operatorStack[operatorStack.length - 1], context) > ExpressionMath.getPrecedence(infixTokens[t], context))) {
                    postfixTokens.push(operatorStack.pop());
                }
                operatorStack.push(infixTokens[t]);
            } else if (ExpressionRegExp.tokens.openingBracket.test(infixTokens[t])) {
                //CASE: Token is an opening bracket
                operatorStack.push(infixTokens[t]);
            } else if (ExpressionRegExp.tokens.closingBracket.test(infixTokens[t])) {
                //CASE: Token is a closing bracket
                //Unload the stack until a matching opening bracket becomes the top of the stack or stack is empty
                while ((operatorStack.length > 0) && (operatorStack[operatorStack.length - 1] !== ExpressionRegExp.inverseBrackets[infixTokens[t]])) {
                    postfixTokens.push(operatorStack.pop());
                }

                //NOTE: Now the top of the stack has a matching opening bracket
                //Discard it
                operatorStack.pop();
            } else {
                throw SyntaxError(`Invalid token "${infixTokens[t]}"`);
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
            case ExpressionContext.BIG_INTEGER:
            case ExpressionContext.REAL: {
                switch (operator) {
                    case "+":
                        return operand1 + operand2;
                    case "-":
                        return operand2 - operand1;
                    case ".":
                    case "*":
                        return operand1 * operand2;
                    case "/":
                        return operand2 / operand1;
                    case "%":
                        return operand2 % operand1;
                    case "^":
                        return operand2 ** operand1;
                    default:
                        throw SyntaxError(`Operator "${operator}" isn't defined for the context "${context}"`);
                }
            }
            case ExpressionContext.BINARY:
            case ExpressionContext.BOOLEAN: {
                let value;

                switch (operator) {
                    case "+":
                    case "|":
                    case "∨":
                        value = operand1 || operand2;
                        break;
                    case ".":
                    case "&":
                    case "∧":
                        value = operand1 && operand2;
                        break;
                    case ">":
                    case "→":
                        value = !operand2 || operand1;
                        break;
                    case "↔":
                        value = (!operand2 || operand1) && (!operand1 || operand2);
                        break;
                    case "^":
                    case "⊕":
                        value = (!operand1 && operand2) || (operand1 && !operand2);
                        break;
                    case "↑":
                        value = !(operand1 && operand2);
                        break;
                    case "↓":
                        value = !(operand1 || operand2);
                        break;
                    default:
                        throw SyntaxError(`Operator "${operator}" isn't defined for the context "${context}"`);
                }

                if (context === ExpressionContext.BINARY) {
                    return Number(value);
                } else {
                    return value;
                }
            }
            case ExpressionContext.MATRIX: {
                switch (operator) {
                    case "+":
                        return MatrixMath.add(operand1, operand2);
                    case "-":
                        return MatrixMath.add(operand2, MatrixMath.multiplyByScalar(operand1, -1));
                    case ".":
                    case "*":
                        return MatrixMath.multiplyByMatrix(operand2, operand1);
                    case "^":
                        return MatrixMath.pow(operand2, operand1);
                    default:
                        throw SyntaxError(`Operator "${operator}" isn't defined for the context "${context}"`);
                }
            }
            case ExpressionContext.STRING: {
                switch (operator) {
                    case "+":
                        return argument2 + argument1;
                    default:
                        throw SyntaxError(`Operator "${operator}" isn't defined for the context "${context}"`);
                }
            }
            default: {
                throw TypeError(`Operator "${operator}" isn't defined for the context "${context}"`);
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
            case ExpressionContext.BINARY:
            case ExpressionContext.BOOLEAN: {
                let value;

                switch (operator) {
                    case "~":
                    case "!":
                    case "¬":
                        value = !operand;
                        break;
                    default:
                        throw SyntaxError(`Operator "${operator}" isn't defined for the context "${context}"`);
                }

                if (context === ExpressionContext.BINARY) {
                    return Number(value);
                } else {
                    return value;
                }
            }
            case ExpressionContext.MATRIX: {
                switch (operator) {
                    case "~":
                    case "!":
                    case "¬":
                        return MatrixMath.getInverseMatrix(operand);
                    default:
                        throw SyntaxError(`Operator "${operator}" isn't defined for the context "${context}"`);
                }
            }
            default: {
                throw TypeError(`Operator "${operator}" isn't defined for the context "${context}"`);
            }
        }
    }

    /**
     * Returns the value after applying passing the specified arguments as parameters
     * @param {string} func 
     * @param {string} argument1 
     * @param {string} argument2 
     * @param {number} context
     * @return {string} The value after evaluating the binary function
     */
    static evaluateBinaryFunction(func, argument1, argument2, context) {
        //WARNING: This code heavily relies on the switch statement's fall-through feature

        switch (context) {
            case ExpressionContext.REAL: {
                switch (func) {
                    case "log":
                        return Math.log(argument2) / Math.log(argument1);
                    case "max":
                        return Math.max(argument1, argument2);
                    case "min":
                        return Math.min(argument1, argument2);
                    case "gcd":
                        return BasicMath.GCD(argument1, argument2);
                    case "lcm":
                        return BasicMath.LCM(argument1, argument2);
                    case "npr":
                        return BasicMath.nPr(argument2, argument1);
                    case "ncr":
                        return BasicMath.nCr(argument2, argument1);
                    default:
                        throw SyntaxError(`No such function "${func}" for the given context "${context}"`);
                }
            }
            case ExpressionContext.STRING: {
                //NOTE: String arguments contain quotes around them
                //They must be removed before processing
                argument2 = argument2.slice(1, -1);
                argument1 = argument1.slice(1, -1);

                switch (func) {
                    case "levenshtein":
                        return CustomMath.getMinEditDistance(argument2, argument1);
                    default:
                        throw SyntaxError(`No such function "${func}" for the given context "${context}"`);
                }
            }
            default: {
                throw TypeError(`No such function "${func}" for the given context "${context}"`);
            }
        }
    }

    /**
     * Returns the value after applying passing the specified argument as parameters
     * @param {string} func 
     * @param {string} operand
     * @param {number} context
     * @return {string} The value after evaluating the unary function
     */
    static evaluateUnaryFunction(func, argument, context) {
        switch (context) {
            case ExpressionContext.REAL: {
                switch (func) {
                    case "sin":
                        return Math.sin(argument);
                    case "cos":
                        return Math.cos(argument);
                    case "tan":
                        return Math.tan(argument);
                    case "abs":
                        return Math.abs(argument);
                    case "floor":
                        return Math.floor(argument);
                    case "ceil":
                        return Math.ceil(argument);
                    case "name":
                        return CustomMath.getNumberName(argument);
                    default:
                        throw SyntaxError(`No such function "${func}" for the given context "${context}"`);
                }
            }
            default: {
                throw TypeError(`No such function "${func}" for the given context "${context}"`);
            }
        }
    }

    /**
     * Negates an operand value.
     * NOTE: Negation is done when an operand is prefixed with "-"
     * @param {string} value
     * @param {number} context
     * @return {string} The value after negating it according to the context
     */
    static negateOperandValue(value, context) {
        switch (context) {
            case ExpressionContext.BIG_INTEGER:
            case ExpressionContext.REAL:
                return -value;
            case ExpressionContext.BINARY:
            case ExpressionContext.BOOLEAN: {
                if (context === ExpressionContext.BINARY) {
                    return Number(!value);
                } else {
                    return !value;
                }
            }
            case ExpressionContext.MATRIX:
                return MatrixMath.multiplyByScalar(value, -1);
            default: {
                throw TypeError(`Operator "${operator}" isn't defined for the context "${context}"`);
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
                if (context === ExpressionContext.REAL) {
                    valueStack.push(parseFloat(postfixTokens[t]));
                } else if (context === ExpressionContext.BIG_INTEGER) {
                    valueStack.push(BigInt(postfixTokens[t]));
                }
            } else if (ExpressionRegExp.tokens.stringOperand.test(postfixTokens[t])) {
                //CASE: Token is a string operand
                valueStack.push(postfixTokens[t]);
            } else if (ExpressionRegExp.tokens.binaryOperator.test(postfixTokens[t])) {
                //CASE: Token is a binary operator
                valueStack.push(ExpressionMath.evaluateBinaryExpression(postfixTokens[t], valueStack.pop(), valueStack.pop(), context));
            } else if (ExpressionRegExp.tokens.unaryOperator.test(postfixTokens[t])) {
                //CASE: Token is a unary operator
                valueStack.push(ExpressionMath.evaluateUnaryExpression(postfixTokens[t], valueStack.pop(), context));
            } else if (ExpressionRegExp.tokens.binaryFunction.test(postfixTokens[t])) {
                //CASE: Token is a binary function
                valueStack.push(ExpressionMath.evaluateBinaryFunction(postfixTokens[t], valueStack.pop(), valueStack.pop(), context));
            } else if (ExpressionRegExp.tokens.unaryFunction.test(postfixTokens[t])) {
                //CASE: Token is a unary function
                valueStack.push(ExpressionMath.evaluateUnaryFunction(postfixTokens[t], valueStack.pop(), context));
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
            if (ExpressionRegExp.tokens.operand.test(postfixTokens[t])) {
                //CASE: Token is an operand
                const node = new BinaryExpressionNode();
                node.data = postfixTokens[t];
                nodeStack.push(node);
            } else if (ExpressionRegExp.tokens.binaryOperator.test(postfixTokens[t]) || ExpressionRegExp.tokens.functionName.test(postfixTokens[t])) {
                //CASE: Token is a function name or a binary operator
                const node = new BinaryExpressionNode();
                node.data = postfixTokens[t];
                node.right = nodeStack.pop();
                node.left = nodeStack.pop();
                nodeStack.push(node);
            } else if (ExpressionRegExp.tokens.unaryOperator.test(postfixTokens[t])) {
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