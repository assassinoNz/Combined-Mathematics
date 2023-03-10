export class IntegerMath {
    /** Returns all the integer factors of an integer
     * @param integer
     * @returns All the integer factors of the integer
    */
    static getIntFactors(integer: number) {
        const factors = [];
        let factorRange = Math.sqrt(integer);
        for (let i = 1; i < factorRange; i++) {
            if (integer % i === 0) {
                factors.push(i);
                factors.push(integer / i);
            }
        }
        if (Math.trunc(factorRange) === factorRange) {
            //CASE: Integer is a perfect square
            factors.push(factorRange);
        }
        return factors;
    }

    /**
     * Returns the factorial of an integer
     * @param integer
     * @returns The factorial value of the integer
     */
    static getFactorial(integer: number) {
        let factorialProduct = 1;
        for (let i = 2; i <= integer; i++) {
            factorialProduct = factorialProduct * i;
        }
        return factorialProduct;
    }

    /**
     * Returns all the common integer factors of 2 integers
     * @param integer1
     * @param integer2
     * @returns The common integer factors of integer1 and integer2
     */
    static getCommonIntFactors(integer1: number, integer2: number): number[] {
        if (integer1 === 0) {
            return IntegerMath.getIntFactors(integer2);
        } else if (integer2 === 0) {
            return IntegerMath.getIntFactors(integer1);
        } else {
            return IntegerMath.getCommonIntFactors(integer2, integer1 % integer2);
        }
    }

    /**
     * Returns the greatest common divisor of 2 integers
     * @param integer1
     * @param integer2
     * @returns The greatest common divisor of integer1 and integer2
     */
    static gcd(integer1: number, integer2: number): number {
        if (integer2 === 0) {
            return integer1;
        } else {
            return IntegerMath.gcd(integer2, integer1 % integer2);
        }
    }

    /**
     * Returns the greatest common divisor of an array of integers
     * @param integers
     * @returns The greatest common divisor of the integers
     */
    static getGcd(integers: number[]) {
        let gcd = integers[0];

        for (let i = 0; i < integers.length; i++) {
            if (gcd === 1) {
                break;
            } else {
                gcd = IntegerMath.gcd(gcd, integers[i]);
            }
        }

        return gcd;
    }

    /**
     * Returns the least common multiple of 2 integers
     * @param  integer1
     * @param  integer2
     * @returns  The least common multiple of integer1 and integer2
     */
    static lcm(integer1: number, integer2: number) {
        return (integer1 * integer2) / IntegerMath.gcd(integer1, integer2);
    }

    /**
     * Returns the least common multiple of an array of integers
     * @param integers
     * @returns  The least common multiple of the integers
     */
    static getLcm(integers: number[]) {
        let lcm = integers[0];

        for (let i = 0; i < integers.length; i++) {
            lcm = IntegerMath.lcm(lcm, integers[i]);
        }

        return lcm;
    }

    /**
     * Returns the number of permutations that can be done using r elements among n unique elements
     * @param n
     * @param r
     * @returns The nPr
     */
    static nPr(n: number, r: number) {
        return IntegerMath.getFactorial(n) / IntegerMath.getFactorial(n - r);
    }

    /**
     * Returns the number of combinations that can be done using r elements among n unique elements
     * @param n
     * @param r
     * @returns The nCr
     */
    static nCr(n: number, r: number) {
        return IntegerMath.getFactorial(n) / (IntegerMath.getFactorial(n - r) * IntegerMath.getFactorial(r));
    }

    /**
     * Checks if an integer has no square factors other than 1
     * @param integer
     * @returns
     */
    static isSquareFree(integer: number) {
        if (integer === 1) {
            return false;
        } else {
            const intPrimeFactorization = PrimeMath.getPrimeFactorization(integer);
            const uniquePrimeFactors = new Set(intPrimeFactorization);
            return intPrimeFactorization.length === uniquePrimeFactors.size;
        }
    }
}

export class PrimeMath {
    /**
    * Checks if an integer is a prime
    * @param integer
    * @returns
    */
    static isPrime(integer: number) {
        if (integer <= 1) {
            return false;
        } else {
            for (let i = 2; i <= Math.sqrt(integer); i++) {
                if (integer % i == 0) {
                    return false;
                }
            }
        }
        return true;
    }

    /** Returns all primes within a given range(inclusive)
     * @param lowerBound Must be greater than or equal to 3
     * @param upperBound
     * @returns All primes between lowerBound(inclusive) and upperBound(inclusive)
    */
    static getPrimesWithin(lowerBound: number, upperBound: number) {
        const primes = [];
        //NOTE: Since we make the lowerBound even lowerBound=2 becomes lowerBound=3
        //So, 2 is not calculated as a prime
        //Add 2 as a prime
        if (lowerBound <= 2) {
            primes.push(2);
        }

        //NOTE: The only even prime is 2
        //So make the lowerBound an odd number if it is even to reduce calculation
        if (lowerBound % 2 === 0) {
            lowerBound++;
        }

        for (let i = lowerBound; i <= upperBound; i = i + 2) {
            if (this.isPrime(i)) {
                primes.push(i);
            }
        }

        return primes;
    }

    /** Returns all primes up to a given limit(inclusive)
     * @param limit
     * @returns All primes starting from 2 up to the limit(inclusive)
    */
    static getPrimesUpTo(limit: number) {
        const oddNumbers = [];
        //Get all odd natural numbers starting from 3 (because only even prime is 2, and 1 is not a prime)
        for (let i = 3; i <= limit; i = i + 2) {
            oddNumbers.push(i);
        }
        const primes = [2];
        while (oddNumbers.length > 0) {
            let nextPrime = oddNumbers.shift()!;
            primes.push(nextPrime);

            for (let j = 0; j < oddNumbers.length; j++) {
                if (oddNumbers[j] % nextPrime === 0) {
                    oddNumbers.splice(j, 1);
                }
            }
        }
        return primes;
    }

    //TODO: Fix Method
    /**
     * Returns all prime factors of a given number using a prebuilt primes library
     * @param integer Must honor the range 0<=integer<=1999993 (which is the highest prime below 2*10^6)
     * @returns An array of all the prime factors of the number
     */
    static getPrimeFactorsWithLibrary(integer: number) {
        // const primes = require("primes2M.json");

        // let numerator = integer;
        // const primeFactors = [];
        // for (let i = 0; i < primes.length;) {
        //     if (primes[i] > numerator) {
        //         break;
        //     } else if (numerator % primes[i] === 0) {
        //         numerator = numerator / primes[i];
        //         primeFactors.push(primes[i]);
        //         i = 0;
        //     } else {
        //         i++;
        //     }
        // }
        // return primeFactors;
    }

    /**
     * Returns the prime factorization of an integer
     * @param integer
     * @returns An array of all the prime factors involved in the prime factorization of the integer
     */
    static getPrimeFactorization(integer: number) {
        const primeFactors = [];
        while (integer % 2 === 0) {
            integer = integer / 2;
            primeFactors.push(2);
        }
        for (let i = 3; i <= Math.sqrt(integer); i = i + 2) {
            while (integer % i === 0) {
                integer = integer / i;
                primeFactors.push(i);
            }
        }
        if (integer > 2) {
            primeFactors.push(integer);
        }
        return primeFactors;
    }
}