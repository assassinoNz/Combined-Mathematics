//@ts-check
export class SequenceMath {
    /**
     * Returns the Collatz sequence of an integer
     * @param {number} startingInt
     * @return {number[]} An array of all the numbers involved in the Collatz sequence of the startingInt
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

    /**
     * Returns the fibonacci sequence with the specified number of terms
     * @param {number} numOfTerms
     * @return {BigInt[]} An array with the terms of the Fibonacci sequence
     */
    static getFibonacciSequence(numOfTerms) {
        //Fibonacci sequence
        //1 1 2 3 5 8 13 21 34 55 89 144 ...

        //Fibonacci sequence formula
        //T(n)=4T(n-3)+T(n-6)

        function* fibonacci () {
            let current = 0n;
            let next = 1n;
        
            while (true) {
                yield current;
                [current, next] = [next, current + next];
            }
        }
        const sequence = fibonacci();
        const terms = [];
        for (let i = 0; i < numOfTerms; i++) {
            terms[i] = sequence.next().value;
        }
        return terms;
    }

    /**
    * Checks if an integer is a perfect square
    * @param {number} integer
    * @return {boolean}
    */
    static isSquare(integer) {
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
        return this.isSquare((8 * integer) + 1);
    }

    /**
     * Checks if an integer triplet makes a Pythagorean triangle (A triangle with integer valued sides)
     * @param {number[]} triplet
     * @return {boolean}
     */
    static isPythagoreanTriplet(triplet) {
        const sortedTriplet = triplet.sort();
        return sortedTriplet[2]*sortedTriplet[2] === sortedTriplet[1]*sortedTriplet[1] + sortedTriplet[0]*sortedTriplet[0];
    }
}