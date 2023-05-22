import { ExpressionContext } from "../enum/expression";
import { BinaryExpressionNode, ExpressionMath } from "../lib/expression";

export class Expression {
    expression: string;
    context: ExpressionContext;
    expressionTreeRoot: BinaryExpressionNode;
    postfixTokens: string[];
    valueDictionary = null;

    constructor(expression: string, context: ExpressionContext) {
        this.expression = expression;
        this.context = context;

        this.postfixTokens = ExpressionMath.infixToPostfix(ExpressionMath.separateToTokens(this.expression, this.context), this.context);

        this.valueDictionary = ExpressionMath.generateEmptyValueDictionary(this.postfixTokens);
    }

    getValueDictionary() {
        return this.valueDictionary;
    }

    assignVariable(variable, value) {
        this.valueDictionary[variable] = value;
    }

    getTree() {
        if (this.expressionTreeRoot) {
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