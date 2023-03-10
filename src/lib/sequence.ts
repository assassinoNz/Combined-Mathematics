export class SequenceGenerator {
    /**Generates the fibonacci sequence on demand */
    static* fibonacciSequence() {
        let current = 0n;
        let next = 1n;
    
        while (true) {
            yield current;
            [current, next] = [next, current + next];
        }
    }

    static* collatzSequence(integer: number) {
        let current = integer;

        while (true) {
            yield current;

            if (current === 1) {
                break;
            }

            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = (3 * current) + 1;
            }
        }
    }
}

export class SequenceMath {
    /**
    * Checks if an integer is a perfect square
    * @param integer
    * @returns
    */
    static isSquare(integer: number) {
        const squareRoot = Math.sqrt(integer);
        if (Math.trunc(squareRoot) === squareRoot) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Checks if an integer is a triangular number
     * @param integer 
     * @returns
     */
    static isTriangular(integer: number) {
        return this.isSquare((8 * integer) + 1);
    }

    /**
     * Checks if an integer triplet makes a Pythagorean triangle (A triangle with integer valued sides)
     * @param triplet
     * @returns
     */
    static isPythagoreanTriplet(triplet: number[]) {
        const sortedTriplet = triplet.sort();
        return sortedTriplet[2]**2 === sortedTriplet[1]**2 + sortedTriplet[0]**2;
    }
}