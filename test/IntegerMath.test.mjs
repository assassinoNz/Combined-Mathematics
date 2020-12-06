import "mocha";
import * as assert from "assert";

import { IntegerMath } from "../src/static/NumberMath.mjs";

describe("IntegerMath", () => {
    describe("#getIntFactors()", () => {
        it("should return correct factors for a non square", () => {
            assert.deepStrictEqual(IntegerMath.getIntFactors(12), [1, 12, 2, 6, 3, 4]);
        });
        it("should return correct factors for a square", () => {
            assert.deepStrictEqual(IntegerMath.getIntFactors(25), [1, 25, 5]);
        });
    });

    describe("#getFactorial()", () => {
        it("should return 1 as the factorial of 0", () => {
            assert.strictEqual(IntegerMath.getFactorial(0), 1);
        });
        it("should return the correct factorial for a non zero integer", () => {
            assert.strictEqual(IntegerMath.getFactorial(3), 6);
        });
    });

    describe("#getCommonIntFactors()", () => {
        it("should return the factors of the non zero integer when one of the integers is 0", () => {
            assert.deepStrictEqual(IntegerMath.getCommonIntFactors(0, 10), [1, 10, 2, 5]);
        });
        it("should return the factors of the non zero integer when one of the integers is 0", () => {
            assert.deepStrictEqual(IntegerMath.getCommonIntFactors(10, 0), [1, 10, 2, 5]);
        });
        it("should return the correct common factors when integer1 > integer2", () => {
            assert.deepStrictEqual(IntegerMath.getCommonIntFactors(15, 10), [1, 5]);
        });
        it("should return the correct common factors when integer1 < integer2", () => {
            assert.deepStrictEqual(IntegerMath.getCommonIntFactors(10, 15), [1, 5]);
        });
    });

    describe("#GCD()", () => {
        it("should return the non zero integer when one of the integers is 0", () => {
            assert.strictEqual(IntegerMath.gcd(0, 5), 5);
        });
        it("should return the non zero integer when one of the integers is 0", () => {
            assert.strictEqual(IntegerMath.gcd(5, 0), 5);
        });
        it("should return the correct GCD when integer1 > integer2", () => {
            assert.strictEqual(IntegerMath.gcd(15, 10), 5);
        });
        it("should return the correct GCD when integer1 < integer2", () => {
            assert.strictEqual(IntegerMath.gcd(10, 15), 5);
        });
    });

    describe("#getGCD()", () => {
        it("should return the correct GCD for an arbitrary number of integers", () => {
            assert.strictEqual(IntegerMath.getGcd([5, 10, 15, 20]), 5);
        });
        it("should return the correct GCD for an arbitrary number of integers", () => {
            assert.strictEqual(IntegerMath.getGcd([50, 10, 30, 20]), 10);
        });
    });

    describe("#LCM()", () => {
        it("should return the non zero integer when one of the integers is 0", () => {
            assert.strictEqual(IntegerMath.lcm(0, 5), 0);
        });
        it("should return the non zero integer when one of the integers is 0", () => {
            assert.strictEqual(IntegerMath.lcm(5, 0), 0);
        });
        it("should return the correct LCM when integer1 > integer2", () => {
            assert.strictEqual(IntegerMath.lcm(15, 10), 30);
        });
        it("should return the correct LCM when integer1 < integer2", () => {
            assert.strictEqual(IntegerMath.lcm(10, 15), 30);
        });
    });

    describe("#getLCM()", () => {
        it("should return the correct LCM for an arbitrary number of integers", () => {
            assert.strictEqual(IntegerMath.getLcm([5, 10, 15, 20]), 60);
        });
        it("should return the correct LCM for an arbitrary number of integers", () => {
            assert.strictEqual(IntegerMath.getLcm([50, 10, 30, 20]), 300);
        });
    });

    describe("#isSquareFree()", () => {
        it("should return false for 1", () => {
            assert.strictEqual(IntegerMath.isSquareFree(1), false);
        });
        it("should return true for a square free integer", () => {
            assert.strictEqual(IntegerMath.isSquareFree(30), true);
        });
        it("should return false for a non square free integer", () => {
            assert.strictEqual(IntegerMath.isSquareFree(8), false);
        });
    });
});