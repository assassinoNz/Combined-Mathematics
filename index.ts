// import { ArraySort } from "./src/lib/algorithm.ts";

import { ExpressionContext } from "./src/enum/expression.ts";
import { ExpressionMath } from "./src/lib/expression.ts";

// const arr = [54, 26, 93, 17, 77, 31, 44, 55, 20];
// ArraySort.insertionSort(arr);
// console.log(arr);

let tokens = ExpressionMath.separateToTokens("((15 / (7-(1+1))) * 3) - (2 + (1 + 1))", ExpressionContext.REAL);

console.log(ExpressionMath.infixToPostfix(tokens, ExpressionContext.REAL));
