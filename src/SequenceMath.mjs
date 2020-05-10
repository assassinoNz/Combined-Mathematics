//@ts-check
import { StringMath } from "./StringMath.mjs";

export class SequenceMath {
    /**
     * Returns the collatz sequence of an integer
     * @param {number} startingInt
     * @return {number[]} An array of all the numbers involved in the collatz sequence of the startingInt
     */
    static getCollatzSequence(startingInt) {
        const collatzSequence = [startingInt];
        let nextNumber = startingInt;
        while (nextNumber !== 1) {
            if (nextNumber % 2 === 0) {
                nextNumber = nextNumber / 2;
            } else {
                nextNumber = (3 * nextNumber) + 1;
            }
            collatzSequence.push(nextNumber);
        }
        return collatzSequence;
    }

    //TODO:Change return type
    /**
     * Returns the fibonacci sequence with the specified number of terms
     * @param {number} numOfTerms
     * @return {string[]} An array with the terms of the Fibonacci sequence
     */
    static getFibonacciSequence(numOfTerms) {
        //Fibonacci sequence
        //1 1 2 3 5 8 13 21 34 55 89 144 ...
        //Fibonacci sequence formula
        //T(n)=4T(n-3)+T(n-6)
        const fibonacciSequence = ["1", "1", "2", "3", "5", "8"];
        for (let i = 6; i < numOfTerms; i++) {
            fibonacciSequence[i] = StringMath.multiplyUnsignedInt(fibonacciSequence[i - 3], 4);
            fibonacciSequence[i] = StringMath.addUnsignedInt(fibonacciSequence[i], fibonacciSequence[i - 6]);
        }
        return fibonacciSequence;
    }

    /**
    * Checks if an integer is a perfect square
    * @param {number} integer
    * @return {boolean}
    */
    static isPerfectSquare(integer) {
        // const strInt = integer.toString();
        // const lastDigit = strInt.slice(-1);
        // if (["2", "3", "7", "8"].includes(lastDigit)) {
        //     return false;
        // } else if (lastDigit === "5") {
        //     let digitalSum = strInt;
        //     while (strInt.length>1) {
        //         let iterationSum = "0";
        //         for (let i = 0; i < digitalSum.length; i++) {
        //             iterationSum = StringMath.addUnsignedInt(iterationSum, digitalSum[i]);
        //         }
        //         digitalSum = iterationSum;
        //     }
        // }
        const squareRoot = Math.sqrt(integer);
        if (Math.trunc(squareRoot) === squareRoot) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Checks if an integer is a triangular number
     * @param {number} integer 
     * @return {boolean}
     */
    static isTriangular(integer) {
        return this.isPerfectSquare((8 * integer) + 1);
    }
}