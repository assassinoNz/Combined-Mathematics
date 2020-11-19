//@ts-check
import { PrimeMath } from "./PrimeMath.mjs";

export class BasicMath {
    /** Returns all the integer factors of an integer
     * @param {number} integer
     * @return {number[]} All the integer factors of the integer
    */
    static getIntFactors(integer) {
        const factors = [];
        let factorRange = Math.sqrt(integer);
        for (let i = 1; i <= factorRange; i++) {
            if (integer % i === 0) {
                factors.push(i);
                factors.push(integer / i);
            }
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
            return this.getIntFactors(integer2);
        } else if (integer2 === 0) {
            return this.getIntFactors(integer1);
        } else {
            const largerInt = Math.max(integer1, integer2);
            const smallerInt = Math.min(integer1, integer2);
            return this.getCommonIntFactors(smallerInt, largerInt % smallerInt);
        }
    }

    /**
     * Returns the greatest common divisor of 2 integers
     * @param {number} integer1
     * @param {number} integer2
     * @return {number} The greatest common divisor of integer1 and integer2
     */
    static calculateGCD(integer1, integer2) {
        if (integer2 === 0) {
            return integer1;
        } else {
            return BasicMath.calculateGCD(integer2, integer1 % integer2);
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
                gcd = BasicMath.calculateGCD(gcd, integers[i]);
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
    static calculateLCM(integer1, integer2) {
        return (integer1*integer2)/this.calculateGCD(integer1, integer2);
    }

    /**
     * Returns the least common multiple of an array of integers
     * @param {number[]} integers
     * @return {number} The least common multiple of the integers
     */
    static getLCM(integers) {
        let lcm = integers[0];

        for (let i = 0; i < integers.length; i++) {
            lcm = BasicMath.calculateLCM(lcm, integers[i]);
        }
        
        return lcm;
    }

    /**
     * Checks if an integer has no square factors other than 1
     * @param {number} integer
     * @return {boolean}
     */
    static isSquareFree(integer) {
        const intPrimeFactorization = PrimeMath.getPrimeFactorization(integer);
        const uniquePrimeFactors = new Set(intPrimeFactorization);
        return intPrimeFactorization.length === uniquePrimeFactors.size;
    }
}