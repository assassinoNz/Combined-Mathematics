//@ts-check
import { PrimeMath } from "./PrimeMath.mjs";
import { SequenceMath } from "./SequenceMath.mjs";

export class BasicMath {
    /** Returns all the integer factors of an integer
     * @param {number} integer
     * @return {number[]} All the integer factors of the integer
    */
    static getIntFactors(integer) {
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
     * @param {number} integer
     * @return {number} The factorial value of the integer
     */
    static getFactorial(integer) {
        let factorialProduct = 1;
        for (let i = 2; i <= integer; i++) {
            factorialProduct = factorialProduct * i;
        }
        return factorialProduct;
    }

    /**
     * Returns all the common integer factors of 2 integers
     * @param {number} integer1
     * @param {number} integer2
     * @return {number[]} The common integer factors of integer1 and integer2
     */
    static getCommonIntFactors(integer1, integer2) {
        if (integer1 === 0) {
            return BasicMath.getIntFactors(integer2);
        } else if (integer2 === 0) {
            return BasicMath.getIntFactors(integer1);
        } else {
            return BasicMath.getCommonIntFactors(integer2, integer1 % integer2);
        }
    }

    /**
     * Returns the greatest common divisor of 2 integers
     * @param {number} integer1
     * @param {number} integer2
     * @return {number} The greatest common divisor of integer1 and integer2
     */
    static GCD(integer1, integer2) {
        if (integer2 === 0) {
            return integer1;
        } else {
            return BasicMath.GCD(integer2, integer1 % integer2);
        }
    }

    /**
     * Returns the greatest common divisor of an array of integers
     * @param {number[]} integers
     * @return {number} The greatest common divisor of the integers
     */
    static getGCD(integers) {
        let gcd = integers[0];

        for (let i = 0; i < integers.length; i++) {
            if (gcd === 1) {
                break;
            } else {
                gcd = BasicMath.GCD(gcd, integers[i]);
            }
        }
        
        return gcd;
    }

    /**
     * Returns the least common multiple of 2 integers
     * @param {number} integer1
     * @param {number} integer2
     * @return {number} The least common multiple of integer1 and integer2
     */
    static LCM(integer1, integer2) {
        return (integer1*integer2)/BasicMath.GCD(integer1, integer2);
    }

    /**
     * Returns the least common multiple of an array of integers
     * @param {number[]} integers
     * @return {number} The least common multiple of the integers
     */
    static getLCM(integers) {
        let lcm = integers[0];

        for (let i = 0; i < integers.length; i++) {
            lcm = BasicMath.LCM(lcm, integers[i]);
        }
        
        return lcm;
    }

    /**
     * Checks if an integer has no square factors other than 1
     * @param {number} integer
     * @return {boolean}
     */
    static isSquareFree(integer) {
        if (integer === 1) {
            return false;
        } else {
            const intPrimeFactorization = PrimeMath.getPrimeFactorization(integer);
            const uniquePrimeFactors = new Set(intPrimeFactorization);
            return intPrimeFactorization.length === uniquePrimeFactors.size;
        }
    }
}