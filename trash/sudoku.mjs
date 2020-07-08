//@ts-check
// const sudokuPuzzle = [
//     ["05", "03", null, null, "07", null, null, null, null],
//     ["06", null, null, "01", "09", "05", null, null, null],
//     [null, "09", "08", null, null, null, null, "06", null],
//     ["08", null, null, null, "06", null, null, null, "03"],
//     ["04", null, null, "08", null, "03", null, null, "01"],
//     ["07", null, null, null, "02", null, null, null, "06"],
//     [null, "06", null, null, null, null, "02", "08", null],
//     [null, null, null, "04", "01", "09", null, null, "05"],
//     [null, null, null, null, "08", null, null, "07", "09"],
// ];

import { SequenceMath } from "./src/SequenceMath.mjs";
import { CustomMath } from "./src/CustomMath.mjs";
import { StringMath } from "./src/StringMath.mjs";

// function getUnusedValues(puzzle, rowIndex, columnIndex) {
//     const usedValues = new Set();

//     //Add used values of the current row
//     for (let iColumn = 0; iColumn < puzzle[rowIndex].length; iColumn++) {
//         usedValues.add(puzzle[rowIndex][iColumn]);
//     }

//     //Add used values of the current column
//     for (let iRow = 0; iRow < puzzle.length; iRow++) {
//         usedValues.add(puzzle[iRow][columnIndex]);
//     }

//     //Add used values of the current larger square
//     let sqRowIndex = null;
//     if (rowIndex < 3) {
//         sqRowIndex = 0;
//     } else if (rowIndex < 6) {
//         sqRowIndex = 3;
//     } else {
//         sqRowIndex = 6;
//     }

//     let sqColumnIndex = null;
//     if (columnIndex < 3) {
//         sqColumnIndex = 0;
//     } else if (columnIndex < 6) {
//         sqColumnIndex = 3;
//     } else {
//         sqColumnIndex = 6;
//     }

//     for (let iRow = sqRowIndex; iRow <= (sqRowIndex + 2); iRow++) {
//         for (let iColumn = sqColumnIndex; iColumn <= (sqColumnIndex + 2); iColumn++) {
//             usedValues.add(puzzle[iRow][iColumn]);
//         }
//     }

//     //Return the unused values (which is the set difference of [1,2,3,4,5,6,7,8,9] - usedValues)
//     return ["01", "02", "03", "04", "05", "06", "07", "08", "09"].filter(value => usedValues.has(value));
// }

// function solveSudokuPuzzle(puzzle, rowIndex, columnIndex) {
//     const unusedValues = getUnusedValues(puzzle, rowIndex, columnIndex);
//     if (unusedValues.length !== 0) {
//         for (let unusedValueIndex = 0; unusedValueIndex < unusedValues.length; unusedValueIndex++) {
//             puzzle[rowIndex][columnIndex] = unusedValues[unusedValueIndex];
//             if (!(rowIndex === 8 && columnIndex === 8)) {
//                 if (columnIndex < 8) {
//                     solveSudokuPuzzle(puzzle, rowIndex, columnIndex + 1);
//                 } else {
//                     solveSudokuPuzzle(puzzle, rowIndex + 1, 0);
//                 }
//             }
//         }
//         console.log("FINISHED: " + rowIndex + ", " + columnIndex);
//     }
// }

// console.log(sudokuPuzzle);
// solveSudokuPuzzle(sudokuPuzzle, 0, 0);
// console.log(sudokuPuzzle);

console.log(StringMath.multiplyInt("-12345679", 9));

