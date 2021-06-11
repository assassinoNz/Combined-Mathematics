//@ts-check
import { LinearEquationMath } from "../src/math/EquationMath.mjs";
import { ExpressionContext } from "../src/math/ExpressionMath.mjs";
import { BooleanMath } from "../src/math/BooleanMath.mjs";
import { ExpressionMath } from "../src/math/ExpressionMath.mjs";
import { MatrixMath } from "../src/math/MatrixMath.mjs";
import { Expression } from "../src/main/Expression.mjs";
import { ExpressionNotation } from "../src/math/ExpressionMath.mjs";
import { SequenceGenerator } from "../src/math/SequenceMath.mjs";
import { SquareMatrix } from "../src/main/Matrix.mjs";

// let valueDictionary = {
//     A: 0,
//     B: 0
// }
// let context = ExpressionContext.REAL;

// let expressions = ["A+3B+C+0D=9", "2A+B+0C+D=8"];
// const tokenizedExpressions = [];
// const postfixedExpressions = [];
// const evaluatedExpressions = [];
// const standardizedEquations = [];
// const equationDictionaries = [];

// for (let e = 0; e < expressions.length; e++) {
    // tokenizedExpressions[e] = ExpressionMath.separateToTokens(expressions[e], context);
    // postfixedExpressions[e] = ExpressionMath.infixToPostfix(tokenizedExpressions[e], context);
    // evaluatedExpressions[e] = ExpressionMath.evaluateExpression(postfixedExpressions[e], valueDictionary, context);
    // standardizedEquations[e] = LinearEquationMath.standardizeTokens(tokenizedExpressions[e]);
    // equationDictionaries[e] = LinearEquationMath.simplifyToRHS(standardizedEquations[e]);
    // coefficientDictionaries[e] = LinearEquationMath.generateCoefficientsDictionary(standardizedEquations[e]);
    // LinearEquationMath.addMatrixRow(constantMatrix, coefficientsMatrix, coefficientDictionaries[e]);
// }

// const matrices = LinearEquationMath.convertToMatrices(equationDictionaries, new Set(["A", "B"]));
// LinearEquationMath.addSolutionMatrix(matrices);

// console.log(expressions);
// console.log(tokenizedExpressions);
// console.log(postfixedExpressions);
// console.log(evaluatedExpressions);
// console.log(standardizedEquations);
// console.log(equationDictionaries);
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
