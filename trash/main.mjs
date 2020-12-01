//@ts-check

import { AlgebraicExpression } from "../src/Expression.mjs";
import { CommonExpressionMath, AlgebraicExpressionMath } from "../src/static/ExpressionMath.mjs";

// ex.print("PRE");
// ex.print("IN");
// ex.print("POST");

// console.log(ex.root.toPrefix());
// console.log(ex.root.toInfix());
// console.log(ex.root.toPostfix());

let ex = new AlgebraicExpression([ 'A', '+', '-B', '*', 'C' ]);
const valueDictionary = ex.getValueDictionary();
valueDictionary.A = 1;
valueDictionary.B = 2;
valueDictionary.C = 3;

console.log(ex.getSolution());