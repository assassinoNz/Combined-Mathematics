//@ts-check
import { AlgebraicExpressionMath, CommonExpressionMath } from "./static/ExpressionMath.mjs";
import { BinaryExpressionNode } from "./generic/BinaryExpressionNode.mjs";

export class AlgebraicExpression {
    tree = null;
    prefixTokens = null;
    infixTokens = null;
    postfixTokens = null;
    valueDictionary = null;

    constructor(infixTokens) {
        const nodeStack = [];

        this.infixTokens = infixTokens;
        this.postfixTokens = AlgebraicExpressionMath.infixToPostfix(this.infixTokens);

        for (let t = 0; t < this.postfixTokens.length; t++) {
            if (/[A-Z]|[-A-Z]/.test(this.postfixTokens[t]) || /^\d/.test(this.postfixTokens[t])) {
                //CASE: Token is an operand
                const node = new BinaryExpressionNode();
                node.data = this.postfixTokens[t];
                nodeStack.push(node);
            } else if (/^[a-z]|[+^*/-]/.test(this.postfixTokens[t])) {
                //CASE: Token is a function name or an operator
                const node = new BinaryExpressionNode();
                node.data = this.postfixTokens[t];
                node.left = nodeStack.pop();
                node.right = nodeStack.pop();
                nodeStack.push(node);
            }
        }

        this.tree = nodeStack.pop();
    }

    tokenize(notation = "INFIX") {
        switch (notation) {
            case "PREFIX":
                if (this.prefixTokens === null) {
                    this.prefixTokens = this.tree.tokenizeToPrefix();
                }
                return this.prefixTokens;
            case "INFIX":
                return this.infixTokens;
            case "POSTFIX":
                return this.postfixTokens;
            default:
                throw new Error("InvalidArgument: No such notation");
        }
    }

    toString(notation = "INFIX") {
        return this.tokenize(notation).join(" ");
    }

    getValueDictionary() {
        if (this.valueDictionary === null) {
            this.valueDictionary = CommonExpressionMath.generateEmptyValueDictionary(this.infixTokens)
        }

        return this.valueDictionary;
    }

    getSolution() {
        //Check if all fields have values in the valueDictionary
        for (const variable of Object.keys(this.valueDictionary)) {
            if (this.valueDictionary[variable] === null) {
                throw Error(`No numeric value for the variable "${variable}"`);
            }
        }

        const replacedExpression = CommonExpressionMath.replaceVariablesByValues(this.postfixTokens, this.valueDictionary);

        return CommonExpressionMath.solveExpressionToValue(replacedExpression);
    }
}