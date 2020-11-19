//@ts-check
export class PrimeMath {
    /**
    * Checks if an integer is a prime
    * @param {number} integer
    * @return {boolean}
    */
    static isPrime(integer) {
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
     * @param {number} lowerBound Must be greater than or equal to 3
     * @param {number} upperBound
     * @return {number[]} All primes between lowerBound(inclusive) and upperBound(inclusive)
    */
    static getPrimesWithin(lowerBound, upperBound) {
        //Make the lowerBound an odd number if it is even
        if (lowerBound % 2 === 0) {
            lowerBound++;
        }

        const primes = [];
        for (let i = lowerBound; i <= upperBound; i = i + 2) {
            if (this.isPrime(i)) {
                primes.push(i);
            }
        }
        return primes;
    }

    /** Returns all primes up to a given limit(inclusive)
     * @param {number} limit
     * @return {number[]} All primes starting from 2 up to the limit(inclusive)
    */
    static getPrimesUpTo(limit) {
        const oddNumbers = [];
        //Get all odd natural numbers starting from 3 (because only even prime is 2, and 1 is not a prime)
        for (let i = 3; i <= limit; i = i + 2) {
            oddNumbers.push(i);
        }
        const primes = [2];
        while (oddNumbers.length > 0) {
            let nextPrime = oddNumbers.shift();
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
     * @param {number} integer Must honor the range 0<=integer<=1999993 (which is the highest prime below 2*10^6)
     * @return {number[]} An array of all the prime factors of the number
     */
    static getPrimeFactorsWithLibrary(integer) {
        const primes = require("primes2M.json");

        let numerator = integer;
        const primeFactors = [];
        for (let i = 0; i < primes.length;) {
            if (primes[i] > numerator) {
                break;
            } else if (numerator % primes[i] === 0) {
                numerator = numerator / primes[i];
                primeFactors.push(primes[i]);
                i = 0;
            } else {
                i++;
            }
        }
        return primeFactors;
    }

    /**
     * Returns the prime factorization of an integer
     * @param {number} integer
     * @return {number[]} An array of all the prime factors involved in the prime factorization of the integer
     */
    static getPrimeFactorization(integer) {
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