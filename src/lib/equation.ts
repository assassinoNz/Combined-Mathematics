import { ExpressionRegExp } from "./expression.js";
import { MatrixMath, SquareMatrixMath } from "./matrix.js";

export class LinearEquationMath {
    /**
     * Returns formatted tokens where variable operand tokens have explicit coefficients
     * @param equationTokens 
     * @returns Standardized equation tokens
     */
    static standardizeTokens(equationTokens: string[]) {
        const standardizedTokens = [];

        for (let t = 0; t < equationTokens.length; t++) {
            if (/^[+]$/.test(equationTokens[t])) {
                //CASE: Token is "+"
                if (ExpressionRegExp.tokens.variableOperand.test(equationTokens[t + 1])) {
                    //CASE: Next token is a variable operand
                    //Since this token is "+" and the next token is a variable operand, there must be 1* between them
                    standardizedTokens.push(equationTokens[t], "1", "*", equationTokens[t + 1]);
                    t = t + 1;
                } else {
                    standardizedTokens.push(equationTokens[t]);
                }
            } else if (/^[-]$/.test(equationTokens[t])) {
                //CASE: Token is "-"
                if (ExpressionRegExp.tokens.variableOperand.test(equationTokens[t + 1])) {
                    //CASE: Next token is a variable operand
                    //Since this token is "-" and the next token is a variable operand, there must be -1* between them
                    standardizedTokens.push(equationTokens[t], "-1", "*", equationTokens[t + 1]);
                    t = t + 1;
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
     * Returns a dictionary containing simplified coefficients of each variable
     * @param standardizedTokens 
     */
    static simplifyToRHS(standardizedTokens: string[]) {
        let isLHS = true;

        const coefficientsDictionary: any = {
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
                //NOTE: Constants should be calculated as if they are in the LHS
                if (isLHS) {
                    coefficientsDictionary["#"] += parseFloat(standardizedTokens[t]);
                } else {
                    coefficientsDictionary["#"] -= parseFloat(standardizedTokens[t]);
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
     * @param equationDictionaries An array of dictionaries describing the equations
     * @param zeroVariables Variables that needed to be set to zero. Useful for linear programming models
     * @returns The SLE in matrix representation
     */
    static convertToMatrices(equationDictionaries: any[], zeroVariables: Set<string>) {
        //NOTE: In an SLE, it is not necessary for a single equation to contain all the variables
        //Define a set to keep track of all the variables in the SLE
        const variablesSet: Set<string> = new Set();
        for (const equationDictionary of equationDictionaries) {
            for (const variable of Object.keys(equationDictionary)) {
                if (!zeroVariables.has(variable)) {
                    //CASE: Current iteration variable must be included
                    variablesSet.add(variable);
                }
            }
        }
        const variablesArray = Array.from(variablesSet);

        const matrices = {} as SLEMatrix;
        
        matrices.zeroVariables = Array.from(zeroVariables);

        //Construct variablesMatrix
        //NOTE: v=0 is the constant
        for (let v = 1; v < variablesArray.length; v++) {
            matrices.variablesMatrix.push([variablesArray[v]]);
        }

        //NOTE: We must have equationDictionaries equal to the number of effective variables
        //Add missing equation dictionaries
        const zeroEquationDictionary = Object.fromEntries(variablesArray.map(variable => [variable, 0]));
        const missingEquationsCount = variablesArray.length -1 - equationDictionaries.length;
        for (let i = 0; i < missingEquationsCount; i++) {
            equationDictionaries.push(zeroEquationDictionary);
        }

        //Construct coefficientsMatrix and constantsMatrix
        for (const equationDictionary of equationDictionaries) {
            //NOTE: When building the coefficients matrix, we must iterate in the order of the variables set
            const coefficientsRow = [];
            //NOTE: The equations are reduced to LHS, but in matrix form, constants must be in RHS. So we must multiply by -1
            const constantRow = [-equationDictionary["#"]];

            for (let v = 1; v < variablesArray.length; v++) {
                if (variablesArray[v] in equationDictionary) {
                    coefficientsRow.push(equationDictionary[variablesArray[v]]);
                } else {
                    coefficientsRow.push(0);
                }
            }
            matrices.coefficientsMatrix.push(coefficientsRow);
            matrices.constantsMatrix.push(constantRow);
        }

        return matrices;
    }

    /**
     * Adds the solution matrix to a SLE given in matrix form
     * @param SLEMatrix The SLE in matrix from
     * @returns 
     */
    static addSolution(SLEMatrix: SLEMatrix) {
        SLEMatrix.solutionMatrix = MatrixMath.multiplyByMatrix(SquareMatrixMath.getInverseMatrix(SLEMatrix.coefficientsMatrix), SLEMatrix.constantsMatrix);
        SLEMatrix.solutionDictionary = {};

        for (let i=0; i <  SLEMatrix.variablesMatrix.length; i++) {
            SLEMatrix.solutionDictionary[SLEMatrix.variablesMatrix[i][0]] = SLEMatrix.solutionMatrix[i][0];
        }

        for (let i=0; i <  SLEMatrix.zeroVariables.length; i++) {
            SLEMatrix.solutionDictionary[SLEMatrix.zeroVariables[i]] = 0;
        }

        return SLEMatrix;
    }
}