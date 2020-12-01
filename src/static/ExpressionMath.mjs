//@ts-check
export class CommonExpressionMath {
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
            if (/[A-Z]|[-A-Z]/.test(expressionTokens[t])) {
                //CASE: Token is a variable operand
                //NOTE: The token may have "-" prefixed to it. Therefore only the english letter must be replaced
                replacedExpression[t] = expressionTokens[t].replace(/[A-Z]/, valueDictionary[expressionTokens[t].replace("-", "")]);

                if (replacedExpression[t].startsWith("--")) {
                    //CASE: Variable operand is negated and the english letter also has a negative value
                    //NOTE: This causes the english letter to be prefixed with "--". We can safely remove that "--"
                    replacedExpression[t] = replacedExpression[t].replace("--", "");
                }
            }
        }

        return replacedExpression;
    }

    /**
     * Solves an expression with only numeric operands to a single value
     * @param postfixExpressionTokens Must be an expression with only numeric operands
     */
    static solveExpressionToValue(postfixExpressionTokens) {
        const stack = [];

        for (let t = 0; t < postfixExpressionTokens.length; t++) {
            if (/^[-\d]|^\d/.test(postfixExpressionTokens[t])) {
                //CASE: Token is a numeric operand
                stack.push(postfixExpressionTokens[t]);
            } else if (/[+*/^-]/.test(postfixExpressionTokens[t])) {
                //CASE: Token is an operator
                stack.push(AlgebraicExpressionMath.solveBinaryExpression(postfixExpressionTokens[t], stack.pop(), stack.pop()));
            }
        }

        return stack[0];
    }
}

export class AlgebraicExpressionMath {
    /**
     * Returns the precedence index of the operator
     * @param {string} operator 
     * @return {number}
     */
    static getPrecedence(operator) {
        const opPrecedence = {
            "+": 2,
            "-": 2,
            "*": 3,
            "/": 3,
            "^": 4
        }

        if (/^[a-z]{1,}$/.test(operator)) {
            //CASE: Operator is a function
            //Functions has the highest precedence
            return 5;
        } else {
            return opPrecedence[operator];
        }
    }

    /**
     * Return the value after applying the specified operator on operand1 and operand2
     * @param {string} operator 
     * @param {string} operand1 
     * @param {string} operand2 
     */
    static solveBinaryExpression(operator, operand1, operand2) {
        switch (operator) {
            case "+":
                return `${parseFloat(operand1) + parseFloat(operand2)}`;
            case "-":
                return `${parseFloat(operand1) - parseFloat(operand2)}`;
            case "*":
                return `${parseFloat(operand1) * parseFloat(operand2)}`;
            case "/":
                return `${parseFloat(operand2) / parseFloat(operand1)}`;
            case "^":
                return `${parseFloat(operand2) ** parseFloat(operand1)}`;
            default:
                throw SyntaxError(`No such operator "${operator}"`);
        }
    }

    /**Separates any expression into a its fundamental tokens.
     * WARNING: Negative numeric operands are not supported
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
                if (/[A-Z]|^\d/.test(tokens[tokens.length - 1])) {
                    //CASE: Previous token is a numeric operand or a variable operand
                    //Since this character is a variable operand, there must be a multiplication between them
                    tokens.push("*");
                }
                tokens.push(expression[c]);
            } else if (/[,/+*^()=-]/.test(expression[c])) {
                //CASE: Character is a single token
                tokens.push(expression[c]);
            } else if (/[a-z]/.test(expression[c])) {
                //CASE: Character is function name starting character
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
            if (/[,\s]/.test(infixTokens[c])) {
                //CASE: Token is a non-significant character
                //Do nothing
            } else if (/[A-Z]|[-A-Z]/.test(infixTokens[c]) || /^\d/.test(infixTokens[c])) {
                //CASE: Token is an operand
                postfixTokens.push(infixTokens[c]);
            } else if (/^[a-z]{1,}$/.test(infixTokens[c])) {
                //CASE: Token is a function name
                operatorStack.push(infixTokens[c]);
            } else if (/[/+*-]/.test(infixTokens[c])) {
                //CASE: Token is a left associative operator
                while ((operatorStack.length > 0) && (AlgebraicExpressionMath.getPrecedence(operatorStack[operatorStack.length - 1]) >= AlgebraicExpressionMath.getPrecedence(infixTokens[c])) && (operatorStack[operatorStack.length - 1] !== "(")) {
                    postfixTokens.push(operatorStack.pop());
                }
                operatorStack.push(infixTokens[c]);
            } else if (/\^/.test(infixTokens[c])) {
                //CASE: Token is a right associative operator
                while ((operatorStack.length > 0) && (AlgebraicExpressionMath.getPrecedence(operatorStack[operatorStack.length - 1]) > AlgebraicExpressionMath.getPrecedence(infixTokens[c])) && (operatorStack[operatorStack.length - 1] !== "(")) {
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
}