//@ts-check
import { LinearEquationMath } from "../src/static/EquationMath.mjs";
import { ExpressionContext } from "../src/static/ExpressionMath.mjs";
import { BooleanMath } from "../src/static/BooleanMath.mjs";
import { ExpressionMath } from "../src/static/ExpressionMath.mjs";

let valueDictionary = {
    A: true,
    B: false,
    C: false,
}

let context = ExpressionContext.REAL;
// let expressions = ["!A!B", "B", "A+B", "A.B", "A>B", "A↔B", "A↑B", "A↓B"];
let expressions = ["-A*-B"];

const tokenizedExpressions = [];
const postfixedExpressions = [];
const evaluatedExpressions = [];
// const matrices = LinearEquationMath.solveSLE(["A+Z=3", "Z-A=1"], context);
for (let e = 0; e < expressions.length; e++) {
    tokenizedExpressions[e] = ExpressionMath.separateToTokens(expressions[e], context);
    // postfixedExpressions[e] = ExpressionMath.infixToPostfix(tokenizedExpressions[e], context);
    // evaluatedExpressions[e] = ExpressionMath.evaluateExpression(postfixedExpressions[e], valueDictionary, context);
    // standardizedEquations[e] = LinearEquationMath.standardizeTokens(tokenizedExpressions[e]);
    // coefficientDictionaries[e] = LinearEquationMath.generateCoefficientsDictionary(standardizedEquations[e]);
    // LinearEquationMath.addMatrixRow(constantMatrix, coefficientsMatrix, coefficientDictionaries[e]);
}



// console.log(expressions);
console.log(tokenizedExpressions);
// console.log(postfixedExpressions);
// console.log(evaluatedExpressions);
// console.log(standardizedEquations);
// console.log(coefficientDictionaries);
// console.log(constantMatrix);
// console.log(coefficientsMatrix);
// console.log(matrices);

// console.log(BooleanMath.generateTruthTable(tokenizedExpressions, context));