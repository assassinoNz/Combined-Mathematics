//@ts-check
import { LinearEquationMath } from "../math/EquationMath.mjs";
import { ExpressionContext } from "../math/ExpressionMath.mjs";
import { ExpressionMath } from "../math/ExpressionMath.mjs";

export class LPModel {
    postfixedObjectiveExpression = [];
    tokenizedEquations = [];
    standardizedEquations = [];
    equationDictionaries = [];

    /**
     * @param {string[]} equations
     * @param {string} objectiveExpression
     */
    constructor(equations = ["A+3B+C=9", "2A+B+D=8"], objectiveExpression = "A+B") {
        this.postfixedObjectiveExpression = ExpressionMath.infixToPostfix(ExpressionMath.separateToTokens(objectiveExpression, ExpressionContext.REAL), ExpressionContext.REAL);

        for (let e = 0; e < equations.length; e++) {
            this.tokenizedEquations[e] = ExpressionMath.separateToTokens(equations[e], ExpressionContext.REAL);
            this.standardizedEquations[e] = LinearEquationMath.standardizeTokens(this.tokenizedEquations[e]);
            this.equationDictionaries[e] = LinearEquationMath.simplifyToRHS(this.standardizedEquations[e]);
        }
    }

    /**
     * @param {Set<string>} nonBasicVariables
     */
    evaluateBasicSolution(nonBasicVariables) {
        const matrixedSLE = LinearEquationMath.convertToMatrices(this.equationDictionaries, nonBasicVariables);
        LinearEquationMath.addSolution(matrixedSLE);
        matrixedSLE.objectiveValue = ExpressionMath.evaluateExpression(this.postfixedObjectiveExpression, matrixedSLE.solutionDictionary, ExpressionContext.REAL);
        console.log(matrixedSLE);
    }
}