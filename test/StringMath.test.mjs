import "mocha";
import * as assert from "assert";

import { StringMath } from "../src/StringMath.mjs";

//NOTE: Methods in this class aren't error handled. Therefore no use of testing for errors
describe("StringMath", () => {
    describe("#addUnsignedInt()", () => {
        it("should return the sum when (int1>0) and (int2>0)", () => {
            assert.strictEqual(StringMath.addUnsignedInt("123", "45"), "168");
        });
    });

    describe("#subtractUnsignedInt()", () => {
        it("should return the difference when (int1>0) and (int2>0) and (int1>int2)", () => {
            assert.strictEqual(StringMath.subtractUnsignedInt("123", "45"), "078");
        });
    });

    describe("#addInt()", () => {
        it("should return a positive sum when (int1>0) and (int2>0)", () => {
            assert.strictEqual(StringMath.addInt("123", "45"), "168");
        });

        it("should return a positive sum when (int1>0) and (int2<0) and (int1+int2>0)", () => {
            assert.strictEqual(StringMath.addInt("123", "-45"), "078");
        });
        it("should return a negative sum when (int1>0) and (int2<0) and (int1+int2<0)", () => {
            assert.strictEqual(StringMath.addInt("12", "-345"), "-333");
        });

        it("should return a positive sum when (int1<0) and (int2>0) and (int1+int2>0)", () => {
            assert.strictEqual(StringMath.addInt("-123", "456"), "333");
        });
        it("should return a negative sum when (int1<0) and (int2>0) and (int1+int2<0)", () => {
            assert.strictEqual(StringMath.addInt("-123", "45"), "-078");
        });

        it("should return a negative sum when (int1<0) and (int2<0)", () => {
            assert.strictEqual(StringMath.addInt("-12", "-345"), "-357");
        });
    });

    describe("#addUnsignedDec()", () => {
        it("should return the sum when (dec1>0) and (dec1>0)", () => {
            assert.strictEqual(StringMath.addUnsignedDec("134.56", "11.24"), "145.80");
        });
    });

    describe("#subtractUnsignedDec()", () => {
        it("should return the difference when (dec1>0) and (dec2>0) and (dec1>dec2)", () => {
            assert.strictEqual(StringMath.subtractUnsignedDec("134.56", "10.56"), "124.00");
        });
    });

    describe("#addDec()", () => {
        it("should return a positive sum when (dec1>0) and (dec2>0)", () => {
            assert.strictEqual(StringMath.addDec("123.45", "67.89"), "191.34");
        });

        it("should return a positive sum when (dec1>0) and (dec2<0) and (dec1+dec2>0)", () => {
            assert.strictEqual(StringMath.addDec("56.78", "-12.34"), "44.44");
        });
        it("should return a negative sum when (dec1>0) and (dec2<0) and (dec1+dec2<0)", () => {
            assert.strictEqual(StringMath.addDec("12.34", "-56.78"), "-44.44");
        });

        it("should return a positive sum when (dec1<0) and (dec2>0) and (dec1+dec2>0)", () => {
            assert.strictEqual(StringMath.addDec("-11.22", "33.44"), "22.22");
        });
        it("should return a negative sum when (dec1<0) and (dec2>0) and (dec1+dec2<0)", () => {
            assert.strictEqual(StringMath.addDec("-11.22", "5.67"), "-05.55");
        });

        it("should return a negative sum when (dec1<0) and (dec2<0)", () => {
            assert.strictEqual(StringMath.addDec("-12.34", "-56.78"), "-69.12");
        });
    });

    describe("#multiplyUnsignedInt()", () => {
        it("should return a positive product when (integer>0) and (multiplier>0) and (integer>multiplier)", () => {
            assert.strictEqual(StringMath.multiplyUnsignedInt("12345679", 9), "111111111");
        });
        it("should return a positive product when (integer>0) and (multiplier>0) and (integer<multiplier)", () => {
            assert.strictEqual(StringMath.multiplyUnsignedInt("9", 12345679), "111111111");
        });

        it("should return a single 0 when (integer=0) and (multiplier>0)", () => {
            assert.strictEqual(StringMath.multiplyUnsignedInt("0", 12345679), "0");
        });
        it("should return a line of 0s when (integer>0) and (multiplier=0)", () => {
            assert.strictEqual(StringMath.multiplyUnsignedInt("12345679", 0), "00000000");
        });
    });

    describe("#multiplyInt()", () => {
        it("should return a positive product when (integer>0) and (multiplier>0)", () => {
            assert.strictEqual(StringMath.multiplyInt("12345679", 9), "111111111");
        });
        it("should return a positive product when (integer<0) and (multiplier<0)", () => {
            assert.strictEqual(StringMath.multiplyInt("-12345679", -9), "111111111");
        });

        it("should return a negative product when (integer<0) and (multiplier>0)", () => {
            assert.strictEqual(StringMath.multiplyInt("-12345679", 9), "-111111111");
        });
        it("should return a negative product when (integer>0) and (multiplier<0)", () => {
            assert.strictEqual(StringMath.multiplyInt("12345679", -9), "-111111111");
        });

        it("should return -0 when (integer=-0) regardless of the multiplier's sign or value", () => {
            assert.strictEqual(StringMath.multiplyInt("-0", -0), "-0");
        });
        it("should return 0 when (integer=0) regardless of the multiplier's sign or value", () => {
            assert.strictEqual(StringMath.multiplyInt("0", -0), "0");
        });
    });

    describe("#multiplyUnsignedDec()", () => {
        it("should return the correct product when multiplier is an integer", () => {
            assert.strictEqual(StringMath.multiplyUnsignedDec("12.5", 2), "25.0");
        });
        it("should return the correct product when multiplier is a decimal", () => {
            assert.strictEqual(StringMath.multiplyUnsignedDec("2.0", 12.5), "25.00");
        });

        it("should return 0.0 when (decimal=0.0) and (multiplier>0)", () => {
            assert.strictEqual(StringMath.multiplyUnsignedDec("0.0", 12345679.0), "0.0");
        });
        it("should return a line of 0s when (decimal>0) and (multiplier=0)", () => {
            assert.strictEqual(StringMath.multiplyUnsignedDec("12345679.0", 0), "00000000.0");
        });
    });
});