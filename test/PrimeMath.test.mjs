import "mocha";
import * as assert from "assert";

import { PrimeMath } from "../src/static/NumberMath.mjs";

describe("PrimeMath", () => {
    describe("#isPrime()", () => {
        it("should return false for 0", () => {
            assert.strictEqual(PrimeMath.isPrime(0), false);
        });
        it("should return false for 1", () => {
            assert.strictEqual(PrimeMath.isPrime(1), false);
        });
        it("should return true for 2", () => {
            assert.strictEqual(PrimeMath.isPrime(2), true);
        });
        it("should return true for an arbitrary prime", () => {
            assert.strictEqual(PrimeMath.isPrime(2111), true);
        });
        it("should return false for an arbitrary composite", () => {
            assert.strictEqual(PrimeMath.isPrime(1111), false);
        });
    });

    describe("#getPrimesWithin()", () => {
        it("should return all primes within lowerBound(inclusive) and upperBound(inclusive) when both bounds are primes", () => {
            assert.deepStrictEqual(PrimeMath.getPrimesWithin(13, 19), [13, 17, 19]);
        });
        it("should return all primes within lowerBound and upperBound(inclusive) when only the upperBound is a prime", () => {
            assert.deepStrictEqual(PrimeMath.getPrimesWithin(10, 19), [11, 13, 17, 19]);
        });
        it("should return all primes within lowerBound(inclusive) and upperBound when only the lowerBound is a prime", () => {
            assert.deepStrictEqual(PrimeMath.getPrimesWithin(13, 25), [13, 17, 19, 23]);
        });
        it("should return all primes within lowerBound and upperBound when non of the bounds are primes", () => {
            assert.deepStrictEqual(PrimeMath.getPrimesWithin(4, 25), [5, 7, 11, 13, 17, 19, 23]);
        });
        it("should return 2 when loweBound=2", () => {
            assert.deepStrictEqual(PrimeMath.getPrimesWithin(2, 10), [2, 3, 5, 7]);
        });
        it("should return 2 when loweBound<2", () => {
            assert.deepStrictEqual(PrimeMath.getPrimesWithin(1, 10), [2, 3, 5, 7]);
        });
    });

    describe("#getPrimesUpTo()", () => {
        it("should return all primes up to limit(inclusive) when limit is a prime", () => {
            assert.deepStrictEqual(PrimeMath.getPrimesUpTo(13), [2, 3, 5, 7, 11, 13]);
        });
        it("should return all primes up to limit(exclusive) when limit is a composite", () => {
            assert.deepStrictEqual(PrimeMath.getPrimesUpTo(14), [2, 3, 5, 7, 11, 13]);
        });
        it("should return 2 when limit is 2", () => {
            assert.deepStrictEqual(PrimeMath.getPrimesUpTo(2), [2]);
        });
    });

    describe("#getPrimeFactorization()", () => {
        it("should return the correct prime factorization for a composite", () => {
            assert.deepStrictEqual(PrimeMath.getPrimeFactorization(1111), [11, 101]);
        });
        it("should return the number itself as the prime factorization for a prime", () => {
            assert.deepStrictEqual(PrimeMath.getPrimeFactorization(7), [7]);
        });
    });
});