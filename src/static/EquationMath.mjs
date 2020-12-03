//@ts-check
import { MatrixMath } from "./MatrixMath.mjs";

export class LinearEquationMath {
    //Simplifies the given equation to the default polynomial notation (ax + by + c = 0) and returns all terms isolated
    //All the variables must have their coefficient explicitly given (x - y = 3 isn't valid. It must be 1x - 1y = 3)
    //NOTE: Variables abc, acb, cab in the same set of equations are considered equivalent
    //NOTE: Variables abc, ab, a, b in the same set of equations are considered distinct
    static simplifyToLHSByAddition(equation) {
        //Remove all spaces
        equation = equation.replace(/\s/g, "");
        // equation = equation.replace(/[a-z]{1,})/g, "1" + "$1");
        //Split equation into two sides by "="
        const equationSides = equation.split("=");
        //Split left hand side into terms
        const equationLHSTerms = equationSides[0].match(/[+-]{0,1}[0-9]{1,}[a-z]{0,}/gi);
        //Split right hand side into terms
        const equationRHSTerms = equationSides[1].match(/[+-]{0,1}[0-9]{1,}[a-z]{0,}/gi);
        //Get all the right hand side terms into left hand side negating the sign
        for (let i = 0; i < equationRHSTerms.length; i++) {
            if (equationRHSTerms[i].startsWith("-")) {
                equationLHSTerms.push(equationRHSTerms[i].replace("-", "+"));
            } else if (equationRHSTerms[i].startsWith("+")) {
                equationLHSTerms.push(equationRHSTerms[i].replace("+", "-"));
            } else {
                equationLHSTerms.push("-" + equationRHSTerms[i]);
            }
        }
        //Sort out each multiplied term's character order ([+-][0-9][a-z])
        for (let i = 0; i < equationLHSTerms.length; i++) {
            let variablePart = equationLHSTerms[i].match(/[a-z]{1,}/gi);
            if (variablePart !== null) {
                equationLHSTerms[i] = equationLHSTerms[i].replace(variablePart[0], "");
                equationLHSTerms[i] = equationLHSTerms[i] + variablePart[0].split("").sort().join("");
            }
        }

        return equationLHSTerms;
    }

    /**
     * Negates each term in an infix expression considering only addition
     * @param {string[]} expressionTokens Must be in the infix notation
     */
    static negateTermsBySign(expressionTokens) {
        const negatedExpressionTokens = [];

        //Since all infix expressions begins with a 

        for (let t = 0; t < expressionTokens.length; t++) {
            if (expressionTokens[]) {

            }
            if (/[A-B]|^\d/.test(expressionTokens[t])) {
                //CASE: Token is an operand
                if (!/[+-]/.test(negatedExpressionTokens[negatedExpressionTokens.length - 1])) {
                    //CASE: Term isn't negated and has an implicit "+" sign
                    negatedExpressionTokens.push("-");
                } else if (expressionTokens[t] === "+") {
                    negatedExpressionTokens.push("-");
                } else if (expressionTokens[t] === "-") {
                    negatedExpressionTokens.push("+");
                } else {
                    negatedExpressionTokens.push(expressionTokens[t]);
                }
            }
        }
    }

    //Parses and categorizes the equation into variables, coefficients, and the simplified constant
    static getCategorizedEquationData(equation) {
        const equationLHSTerms = this.simplifyToLHSByAddition(equation);
        const equationData = {};
        //Extract variables used in the equation (The equation must be recreated with the sorted terms)
        equationData.variables = Array.from(new Set(equationLHSTerms.join("").match(/[a-z]{1,}/gi))).sort();
        //Get simplified coefficient for each variable
        equationData.coefficients = [];
        for (let i = 0; i < equationData.variables.length; i++) {
            let simplifiedCoefficient = 0;
            for (let j = 0; j < equationLHSTerms.length; j++) {
                if (equationLHSTerms[j].includes(equationData.variables[i])) {
                    simplifiedCoefficient = simplifiedCoefficient + parseInt(equationLHSTerms.splice(j, 1)[0].replace(equationData.variables[i], ""));
                    j = -1;
                }
            }
            equationData.coefficients.push(simplifiedCoefficient);
        }
        //Get simplified constant
        equationData.simplifiedConstant = [0];
        for (let i = 0; i < equationLHSTerms.length; i++) {
            equationData.simplifiedConstant[0] = equationData.simplifiedConstant[0] + parseInt(equationLHSTerms[i]);
        }
        equationData.simplifiedConstant[0] = equationData.simplifiedConstant[0] * -1;
        return equationData;
    }

    //Returns the solution of object for a given set of equations (number of equations must match with the number of variables)
    static getSolution(equations) {
        const coefficientsMultiArray = [];
        const constantsMultiArray = [];
        const variablesMultiArray = [];

        for (let i = 0; i < equations.length; i++) {
            const equationData = this.getCategorizedEquationData(equations[i]);
            coefficientsMultiArray.push(equationData.coefficients);
            constantsMultiArray.push(equationData.simplifiedConstant);
            variablesMultiArray.push(equationData.variables);
        }

        let variables = [];
        for (let i = 0; i < variablesMultiArray.length; i++) {
            if (variablesMultiArray[i].length > variables.length) {
                variables = variablesMultiArray[i];
            }
        }

        for (let i = 0; i < equations.length; i++) {
            for (let j = 0; j < variables.length; j++) {
                if (coefficientsMultiArray[i][j] === undefined) {
                    coefficientsMultiArray[i][j] = 0;
                }
            }
        }

        const resultMatrix = MatrixMath.multiplyByMatrix(MatrixMath.getInverseMatrix(coefficientsMultiArray), constantsMultiArray);

        const solution = {};
        for (let i = 0; i < variables.length; i++) {
            solution[variables[i]] = resultMatrix[i][0];
        }
        return solution;
    }
}