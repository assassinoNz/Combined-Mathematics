//@ts-check
import { ExpressionMath } from "../src/static/ExpressionMath.mjs";

// ex.print("PRE");
// ex.print("IN");
// ex.print("POST");

// console.log(ex.root.toPrefix());
// console.log(ex.root.toInfix());
// console.log(ex.root.toPostfix());

// let ex = ExpressionMath.separateToTokens("A+B*C^D");
let infix = ExpressionMath.separateToTokens("2-3");
console.log(infix);
let postfix = ExpressionMath.infixToPostfix(infix);
console.log(postfix);

let values = ExpressionMath.generateEmptyValueDictionary(postfix);
// values.A = "4";
// values.B = "-3";
// values.C = "-2";
// values.D = "1";

let replaced = ExpressionMath.replaceVariablesByValues(postfix, values);
console.log(ExpressionMath.solveExpressionToValue(replaced));
// let tree = ExpressionMath.generateExpressionTree(postfix);

// for (let i = 0; i < 8; i++) {
//     const bin = i.toString(2);
//     const generatedValues = ("0".repeat(3-bin.length) + bin).split("");
//     values.P = generatedValues[0];
//     values.Q = generatedValues[1];
//     values.R = generatedValues[2];

//     const replaced = ExpressionMath.replaceVariablesByValues(postfix, values);
//     console.log(generatedValues.join(""), ExpressionMath.solveExpressionToValue(replaced));
// }
