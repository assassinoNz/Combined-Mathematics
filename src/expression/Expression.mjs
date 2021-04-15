import { BinaryExpressionNode } from "../static/ExpressionMath.mjs";
import { ExpressionMath } from "../static/ExpressionMath.mjs";

//@ts-check
export class Expression {
    expression = null;
    context = null;
    expressionTreeRoot = null;
    postfixTokens = null;

    valueDictionary = null;

    /**
     * @param {string} expression 
     * @param {number} context 
     */
    constructor(expression, context) {
        this.expression = expression;
        this.context = context;

        this.postfixTokens = ExpressionMath.infixToPostfix(ExpressionMath.separateToTokens(this.expression, this.context), this.context);

        this.valueDictionary = ExpressionMath.generateEmptyValueDictionary(this.postfixTokens);
    }

    getValueDictionary() {
        return this.valueDictionary;
    }

    /**
     * @param {string} variable 
     * @param {any} value 
     */
    assignVariable(variable, value) {
        this.valueDictionary[variable] = value;
    }

    /**
     * @return {BinaryExpressionNode} Root node of the expression tree
     */
    getTree() {
        if (this.expressionTree) {
            return this.expressionTreeRoot;
        } else {
            this.expressionTreeRoot = ExpressionMath.generateExpressionTree(this.postfixTokens);
            return this.expressionTreeRoot;
        }
    }

    evaluate() {
        //Check if values are assigned to all variables
        for (const variable of Object.keys(this.valueDictionary)) {
            if (this.valueDictionary[variable] === null) {
                throw Error(`No value assigned for the variable "${variable}"`);
            }
        }

        return ExpressionMath.evaluateExpression(this.postfixTokens, this.valueDictionary, this.context);
    }
}