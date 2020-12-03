//@ts-check
import { ExpressionMath } from "./ExpressionMath.mjs";
import { ExpressionRegExp } from "./ExpressionMath.mjs";
import { MatrixMath } from "./MatrixMath.mjs";

export class LinearEquationMath {
    /**
     * Returns formatted tokens where variable operand tokens have explicit coefficients
     * @param {string[]} equationTokens 
     * @return {string[]} Standardized equation tokens
     */
    static standardizeTokens(equationTokens) {
        const standardizedTokens = [];

        for (let t = 0; t < equationTokens.length; t++) {
            if (/^[+]$/.test(equationTokens[t])) {
                //CASE: Token is "+"
                if (ExpressionRegExp.tokens.variableOperand.test(equationTokens[t + 1])) {
                    //CASE: Next token is a variable operand
                    //Since this token is "+" and the next token is a variable operand, there must be -1* between them
                    standardizedTokens.push("+", "1", "*");
                } else {
                    standardizedTokens.push(equationTokens[t]);
                }
            } else if (/^[-]$/.test(equationTokens[t])) {
                //CASE: Token is "-"
                if (ExpressionRegExp.tokens.variableOperand.test(equationTokens[t + 1])) {
                    //CASE: Next token is a variable operand
                    //Since this token is "-" and the next token is a variable operand, there must be + -1 * between them
                    standardizedTokens.push("+", "-1", "*");
                } else if (ExpressionRegExp.tokens.numericOperand.test(equationTokens[t + 1])) {
                    //CASE: Next token is a numeric operand
                    //Since this token is "-" and the next token is a numeric operand, there must be + between them and "-" should be the sign of the operand
                    standardizedTokens.push("+", "-" + equationTokens[t + 1]);
                    t = t + 1;
                } else {
                    standardizedTokens.push(equationTokens[t]);
                }
            } else {
                standardizedTokens.push(equationTokens[t]);
            }
        }

        if (ExpressionRegExp.tokens.variableOperand.test(standardizedTokens[0])) {
            //CASE: Equation starts with a variable token
            //Add the constant explicitly
            standardizedTokens.unshift("1", "*");
        }

        return standardizedTokens;
    }

    /**
     * Returns a dictionary containing simplified coefficients  of each variable
     * @param {string[]} standardizedTokens 
     */
    static generateCoefficientsDictionary(standardizedTokens) {
        let isLHS = true;

        const coefficientsDictionary = {
            "#": 0
        };

        for (let t = 0; t < standardizedTokens.length; t++) {
            if (ExpressionRegExp.tokens.variableOperand.test(standardizedTokens[t])) {
                //CASE: Token is a variable operand
                if (!coefficientsDictionary.hasOwnProperty(standardizedTokens[t])) {
                    //CASE: Variable operand is not in the coefficients dictionary
                    coefficientsDictionary[standardizedTokens[t]] = 0;
                }

                //NOTE: The coefficient of a variable operand can be found 2 indices backwards
                if (isLHS) {
                    //CASE: Currently evaluating the LHS
                    coefficientsDictionary[standardizedTokens[t]] += parseFloat(standardizedTokens[t - 2]);
                } else {
                    //CASE: Currently evaluating the RHS
                    coefficientsDictionary[standardizedTokens[t]] -= parseFloat(standardizedTokens[t - 2]);
                }
            } else if (ExpressionRegExp.tokens.numericOperand.test(standardizedTokens[t]) && /^[-+=]$/.test(standardizedTokens[t - 1]) && (standardizedTokens.length - 1 === t || /^[-+=]$/.test(standardizedTokens[t + 1]))) {
                //CASE: Token is a numeric operand surrounded by either "+" of "-"
                //NOTE: Token is a constant
                //NOTE: Constants should be calculated as if they are in the RHS
                if (isLHS) {
                    coefficientsDictionary["#"] -= parseFloat(standardizedTokens[t]);
                } else {
                    coefficientsDictionary["#"] += parseFloat(standardizedTokens[t]);
                }
            } else if (/^=$/.test(standardizedTokens[t])) {
                //CASE: Token is "="
                //Change the evaluating side to RHS
                isLHS = false;
            }
        }

        return coefficientsDictionary;
    }

    /**
     * Returns the coefficient, variable and constants matrices for a given SLE
     * @param {string[]} equations Linear equation expressions written in the standard notation
     * @param {number} context 
     */
    static convertSLEToMatrixForm(equations, context) {
        const matrices = {
            coefficientsMatrix: new Array(equations.length),
            variablesMatrix: new Array(equations.length),
            constantsMatrix: new Array(equations.length),
        };

        for (let e = 0; e < equations.length; e++) {
            const tokenizedEquation = ExpressionMath.separateToTokens(equations[e], context);
            const standardizedEquation = LinearEquationMath.standardizeTokens(tokenizedEquation);
            const coefficientsDictionary = LinearEquationMath.generateCoefficientsDictionary(standardizedEquation);

            const variables = Object.keys(coefficientsDictionary).sort();
            
            //Add an entry in the constants matrix
            matrices.constantsMatrix[e] = [coefficientsDictionary["#"]];
            //Add an entry in the coefficients matrix matrix
            matrices.coefficientsMatrix[e] = new Array(variables.length - 1);
            
            //NOTE: v=0 index is the constant
            for (let v = 1; v < variables.length; v++) {
                matrices.variablesMatrix[v-1] = [variables[v]];
                matrices.coefficientsMatrix[e][v-1] = coefficientsDictionary[variables[v]];
            }
        }

        return matrices;
    }

    /**
     * Returns the coefficient, variable, constants and solution matrices for a given SLE
     * @param {string[]} equations Linear equation expressions written in the standard notation
     * @param {number} context 
     */
    static solveSLE(equations, context) {
        const matrices = LinearEquationMath.convertSLEToMatrixForm(equations, context);
        matrices.solutionMatrix = MatrixMath.multiplyByMatrix(MatrixMath.getInverseMatrix(matrices.coefficientsMatrix), matrices.constantsMatrix);

        return matrices;
    }
}