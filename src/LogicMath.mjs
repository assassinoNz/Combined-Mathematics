//@ts-check
export class LogicMath {
    /**Converts an infix expression into a postfix expression
     * @param {string} infixExpression
    */
    static toPostfix(infixExpression) {
        let postfixExpression = "";
        const stack = [];

        for (let i = 0; i < infixExpression.length; i++) {
            const char = infixExpression[i];
            if (/[a-zA-Z]/.test(char)) {
                //CASE: Char is an alphanumeric character
                //Append the char directly
                postfixExpression += char;
            } else if (/[(~]/.test(char)) {
                //CASE: Char has the highest precedence. Therefore greater than or equal to stack.top
                //Just push the char
                stack.push(char);
            } else if (/[\^]/.test(char)) {
                //CASE: Char has a medium precedence. Stack.top can have higher precedence
                //Append all higher/same precedence chars until "(" is encountered
                while (stack.length > 0 && /[(~\^]/.test(stack[stack.length - 1])) {
                    if (stack[stack.length - 1] === "(") {
                        stack.pop();
                        break;
                    } else {
                        postfixExpression += stack.pop();
                    }
                }
                //Finally push the char
                stack.push(char);
            } else if (/[+-]/.test(char)) {
                //CASE: Char has the lowest precedence. Stack.top can have higher precedence
                //Append all higher/same precedence chars until "(" is encountered
                while (stack.length > 0 && /[(\^\*\/+-]/.test(stack[stack.length - 1])) {
                    if (stack[stack.length - 1] === "(") {
                        stack.pop();
                        break;
                    } else {
                        postfixExpression += stack.pop();
                    }
                }
                //Finally push the char
                stack.push(char);
            } else if (char === ")") {
                //CASE: char is ")"
                //Append everything in stack until "(" is encountered
                while (stack.length > 0 && (stack[stack.length - 1] !== "(")) {
                    postfixExpression += stack.pop();
                }
            }
        }

        //Append everything else in stack
        while (stack.length > 0) {
            postfixExpression += stack.pop();
        }

        return postfixExpression;
    }

    static or(p, q) {
        if (p || q) {
            return true;
        } else {
            return false;
        }
    }

    static and(p, q) {
        if (p && q) {
            return true;
        } else {
            return false;
        }
    }

    static if(p, q) {
        if (p === true && q === false) {
            return false;
        } else {
            return true;
        }
    }

    static iff(p, q) {
        if (p === q) {
            return true;
        } else {
            return false;
        }
    }
}