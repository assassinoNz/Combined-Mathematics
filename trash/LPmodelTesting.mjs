//@ts-check
import { LPModel } from "../src/main/LPModel.mjs";

const lp = new LPModel(["A+3B+C=9", "2A+B+D=8"], "A+B");
console.log(lp.findBasicSolution(new Set(["A", "B"])));
console.log(lp.findBasicSolution(new Set(["A", "C"])));
console.log(lp.findBasicSolution(new Set(["A", "D"])));
console.log(lp.findBasicSolution(new Set(["B", "C"])));
console.log(lp.findBasicSolution(new Set(["B", "D"])));
console.log(lp.findBasicSolution(new Set(["C", "D"])));
