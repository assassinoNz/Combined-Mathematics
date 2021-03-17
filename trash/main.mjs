//@ts-check
import { LinearEquationMath } from "../src/static/EquationMath.mjs";
import { ExpressionContext } from "../src/static/ExpressionMath.mjs";
import { BooleanMath } from "../src/static/BooleanMath.mjs";
import { ExpressionMath } from "../src/static/ExpressionMath.mjs";
import { MatrixMath } from "../src/static/MatrixMath.mjs";
import { Expression } from "../src/expression/Expression.mjs";
import { ExpressionNotation } from "../src/static/ExpressionMath.mjs";
import { SequenceGenerator } from "../src/static/SequenceMath.mjs";
import { SquareMatrix } from "../src/Matrix.mjs";

// let valueDictionary = {
//     A: [[1,2],[3,4]]
// }

// let context = ExpressionContext.MATRIX;
// let expressions = ["!A!B", "B", "A+B", "A.B", "A>B", "A↔B", "A↑B", "A↓B"];
// let expressions = ["2A"];

// const tokenizedExpressions = [];
// const postfixedExpressions = [];
// const evaluatedExpressions = [];
// const matrices = LinearEquationMath.solveSLE(["A+Z=3", "Z-A=1"], context);
// for (let e = 0; e < expressions.length; e++) {
//     tokenizedExpressions[e] = ExpressionMath.separateToTokens(expressions[e], context);
//     postfixedExpressions[e] = ExpressionMath.infixToPostfix(tokenizedExpressions[e], context);
//     evaluatedExpressions[e] = ExpressionMath.evaluateExpression(postfixedExpressions[e], valueDictionary, context);
    // standardizedEquations[e] = LinearEquationMath.standardizeTokens(tokenizedExpressions[e]);
    // coefficientDictionaries[e] = LinearEquationMath.generateCoefficientsDictionary(standardizedEquations[e]);
    // LinearEquationMath.addMatrixRow(constantMatrix, coefficientsMatrix, coefficientDictionaries[e]);
// }

// console.log(expressions);
// console.log(tokenizedExpressions);
// console.log(postfixedExpressions);
// console.log(evaluatedExpressions);
// console.log(standardizedEquations);
// console.log(coefficientDictionaries);
// console.log(constantMatrix);
// console.log(coefficientsMatrix);
// console.log(matrices);

// console.log(BooleanMath.generateTruthTable(tokenizedExpressions, context));

// let seq = SequenceGenerator.collatzSequence(10);
// let i = 0;
// while (i < 25) {
//     console.log(seq.next().value);
//     i++;
// }


// let m = new SquareMatrix([
//     [1,3,0],
//     [2,7,0],
//     [0,0,7]
// ]);

// console.log(m.getCoFactorMatrix());