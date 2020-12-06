import "mocha";
import * as assert from "assert";

import { MultiPrecisionMath } from "../src/static/MultiPrecisionMath.mjs";

//NOTE: Methods in this class aren't error handled. Therefore no use of testing for errors
describe("StringMath", () => {
    describe("#addUnsignedInt()", () => {
        it("should return the sum even when (int1=0)", () => {
            assert.strictEqual(MultiPrecisionMath.addUnsignedInt("0", "45"), "45");
        });
        it("should return the sum even when (int2=0)", () => {
            assert.strictEqual(MultiPrecisionMath.addUnsignedInt("123", "00000"), "123");
        });

        it("should return the sum when (int1>0) and (int2>0)", () => {
            assert.strictEqual(MultiPrecisionMath.addUnsignedInt("123", "45"), "168");
        });
    });

    describe("#subtractUnsignedInt()", () => {
        it("should return a positive difference even when (int2=0)", () => {
            assert.strictEqual(MultiPrecisionMath.addUnsignedInt("123", "0"), "123");
        });

        it("should return a positive difference when (int1>0) and (int2>0) and (int1>int2)", () => {
            assert.strictEqual(MultiPrecisionMath.subtractUnsignedInt("123", "45"), "78");
        });
    });

    describe("#addInt()", () => {
        it("should return a positive sum when (int1>0) and (int2>0)", () => {
            assert.strictEqual(MultiPrecisionMath.addInt("123", "45"), "168");
        });

        it("should return a positive sum when (int1>0) and (int2<0) and (int1+int2>0)", () => {
            assert.strictEqual(MultiPrecisionMath.addInt("123", "-45"), "78");
        });
        it("should return a negative sum when (int1>0) and (int2<0) and (int1+int2<0)", () => {
            assert.strictEqual(MultiPrecisionMath.addInt("12", "-345"), "-333");
        });

        it("should return a positive sum when (int1<0) and (int2>0) and (int1+int2>0)", () => {
            assert.strictEqual(MultiPrecisionMath.addInt("-123", "456"), "333");
        });
        it("should return a negative sum when (int1<0) and (int2>0) and (int1+int2<0)", () => {
            assert.strictEqual(MultiPrecisionMath.addInt("-123", "45"), "-78");
        });

        it("should return a negative sum when (int1<0) and (int2<0)", () => {
            assert.strictEqual(MultiPrecisionMath.addInt("-12", "-345"), "-357");
        });
    });

    describe("#addUnsignedDec()", () => {
        it("should return the sum even when (dec1=0)", () => {
            assert.strictEqual(MultiPrecisionMath.addUnsignedDec("000.0", "45.0"), "45.0");
        });
        it("should return the sum even when (dec2=0)", () => {
            assert.strictEqual(MultiPrecisionMath.addUnsignedDec("123.0", "0.0"), "123.0");
        });

        it("should return the sum when (dec1>0) and (dec1>0)", () => {
            assert.strictEqual(MultiPrecisionMath.addUnsignedDec("134.56", "11.24"), "145.8");
        });
    });

    describe("#subtractUnsignedDec()", () => {
        it("should return a positive difference even when (dec2=0)", () => {
            assert.strictEqual(MultiPrecisionMath.subtractUnsignedDec("123.0", "0.00"), "123.0");
        });

        it("should return the difference when (dec1>0) and (dec2>0) and (dec1>dec2)", () => {
            assert.strictEqual(MultiPrecisionMath.subtractUnsignedDec("134.56", "10.56"), "124.0");
        });
    });

    describe("#addDec()", () => {
        it("should return a positive sum when (dec1>0) and (dec2>0)", () => {
            assert.strictEqual(MultiPrecisionMath.addDec("123.45", "67.89"), "191.34");
        });

        it("should return a positive sum when (dec1>0) and (dec2<0) and (dec1+dec2>0)", () => {
            assert.strictEqual(MultiPrecisionMath.addDec("56.78", "-12.34"), "44.44");
        });
        it("should return a negative sum when (dec1>0) and (dec2<0) and (dec1+dec2<0)", () => {
            assert.strictEqual(MultiPrecisionMath.addDec("12.34", "-56.78"), "-44.44");
        });

        it("should return a positive sum when (dec1<0) and (dec2>0) and (dec1+dec2>0)", () => {
            assert.strictEqual(MultiPrecisionMath.addDec("-11.22", "33.44"), "22.22");
        });
        it("should return a negative sum when (dec1<0) and (dec2>0) and (dec1+dec2<0)", () => {
            assert.strictEqual(MultiPrecisionMath.addDec("-11.22", "5.67"), "-5.55");
        });

        it("should return a negative sum when (dec1<0) and (dec2<0)", () => {
            assert.strictEqual(MultiPrecisionMath.addDec("-12.34", "-56.78"), "-69.12");
        });
    });

    describe("#multiplyUnsignedInt()", () => {
        it("should return a positive product when (integer>0) and (multiplier>0) and (integer>multiplier)", () => {
            assert.strictEqual(MultiPrecisionMath.multiplyUnsignedInt("12345679", 9), "111111111");
        });
        it("should return a positive product when (integer>0) and (multiplier>0) and (integer<multiplier)", () => {
            assert.strictEqual(MultiPrecisionMath.multiplyUnsignedInt("9", 12345679), "111111111");
        });

        it("should return a single 0 when (integer=0) and (multiplier>0)", () => {
            assert.strictEqual(MultiPrecisionMath.multiplyUnsignedInt("0", 12345679), "0");
        });
        it("should return 0 when (integer>0) and (multiplier=0)", () => {
            assert.strictEqual(MultiPrecisionMath.multiplyUnsignedInt("12345679", 0), "0");
        });
    });

    describe("#multiplyInt()", () => {
        it("should return a positive product when (integer>0) and (multiplier>0)", () => {
            assert.strictEqual(MultiPrecisionMath.multiplyInt("12345679", 9), "111111111");
        });
        it("should return a positive product when (integer<0) and (multiplier<0)", () => {
            assert.strictEqual(MultiPrecisionMath.multiplyInt("-12345679", -9), "111111111");
        });

        it("should return a negative product when (integer<0) and (multiplier>0)", () => {
            assert.strictEqual(MultiPrecisionMath.multiplyInt("-12345679", 9), "-111111111");
        });
        it("should return a negative product when (integer>0) and (multiplier<0)", () => {
            assert.strictEqual(MultiPrecisionMath.multiplyInt("12345679", -9), "-111111111");
        });

        it("should return -0 when (integer=-0) regardless of the multiplier's sign or value", () => {
            assert.strictEqual(MultiPrecisionMath.multiplyInt("-0", -0), "-0");
        });
        it("should return 0 when (integer=0) regardless of the multiplier's sign or value", () => {
            assert.strictEqual(MultiPrecisionMath.multiplyInt("0", -0), "0");
        });
    });

    // describe("#multiplyUnsignedDec()", () => {
    //     it("should return the correct product when multiplier is an integer", () => {
    //         assert.strictEqual(StringMath.multiplyUnsignedDec("12.5", 2), "25.0");
    //     });
    //     it("should return the correct product when multiplier is a decimal", () => {
    //         assert.strictEqual(StringMath.multiplyUnsignedDec("2.0", 12.5), "25.0");
    //     });

    //     it("should return 0.0 when (decimal=0.0) and (multiplier>0)", () => {
    //         assert.strictEqual(StringMath.multiplyUnsignedDec("0.0", 12345679.0), "0.0");
    //     });
    //     it("should return 0.0 when (decimal>0) and (multiplier=0)", () => {
    //         assert.strictEqual(StringMath.multiplyUnsignedDec("12345679.0", 0), "0.0");
    //     });
    // });

    // describe("#multiplyDec()", () => {
    //     it("should return the correct product when (dec1>0) and (dec2>0)", () => {
    //         assert.strictEqual(StringMath.multiplyDec("12.5", "2.0"), "25.0");
    //     });
    //     it("should return the correct product when (dec1>0) and (dec2<0)", () => {
    //         assert.strictEqual(StringMath.multiplyDec("12.5", "-2.0"), "-25.0");
    //     });
    //     it("should return the correct product when (dec1<0) and (dec2>0)", () => {
    //         assert.strictEqual(StringMath.multiplyDec("-12.5", "2.0"), "-25.0");
    //     });
    //     it("should return the correct product when (dec1<0) and (dec2<0)", () => {
    //         assert.strictEqual(StringMath.multiplyDec("-12.5", "-2.0"), "25.0");
    //     });

    //     it("should return 0.0 when (decimal=0.0) and (multiplier>0)", () => {
    //         assert.strictEqual(StringMath.multiplyDec("0.0", 12345679.0), "0.0");
    //     });
    //     it("should return 0.0 (decimal>0) and (multiplier=0)", () => {
    //         assert.strictEqual(StringMath.multiplyDec("12345679.0", 0), "0.0");
    //     });
    // });

    describe("#addDecWithBigInt()", () => {
        it("should return a positive sum when (dec1>0) and (dec2>0)", () => {
            assert.strictEqual(MultiPrecisionMath.addDecWithBigInt("123.45", "67.890"), "191.34");
        });
        it("should return a positive sum when (dec1>0) and (dec2<0) and (dec1+dec2>0)", () => {
            assert.strictEqual(MultiPrecisionMath.addDecWithBigInt("56.78", "-12.34"), "44.44");
        });
        it("should return a negative sum when (dec1>0) and (dec2<0) and (dec1+dec2<0)", () => {
            assert.strictEqual(MultiPrecisionMath.addDecWithBigInt("12.342", "-56.78"), "-44.438");
        });
        it("should return a positive sum when (dec1<0) and (dec2>0) and (dec1+dec2>0)", () => {
            assert.strictEqual(MultiPrecisionMath.addDecWithBigInt("-11.220", "33.440"), "22.22");
        });
        it("should return a negative sum when (dec1<0) and (dec2>0) and (dec1+dec2<0)", () => {
            assert.strictEqual(MultiPrecisionMath.addDecWithBigInt("-11.22", "5.67"), "-5.55");
        });
        it("should return a negative sum when (dec1<0) and (dec2<0)", () => {
            assert.strictEqual(MultiPrecisionMath.addDecWithBigInt("-12.34", "-56.74"), "-69.08");
        });
    });

    describe("#multiplyDecWithBigInt()", () => {
        it("should return the correct product when (dec1>0) and (dec2>0)", () => {
            assert.strictEqual(MultiPrecisionMath.multiplyDecWithBigInt("12.5", "2.0"), "25.0");
        });
        it("should return the correct product when (dec1>0) and (dec2<0)", () => {
            assert.strictEqual(MultiPrecisionMath.multiplyDecWithBigInt("012.5", "-2.0"), "-25.0");
        });
        it("should return the correct product when (dec1<0) and (dec2>0)", () => {
            assert.strictEqual(MultiPrecisionMath.multiplyDecWithBigInt("-12.5", "2.0"), "-25.0");
        });
        it("should return the correct product when (dec1<0) and (dec2<0)", () => {
            assert.strictEqual(MultiPrecisionMath.multiplyDecWithBigInt("-12.5", "-2.0"), "25.0");
        });
    });

    describe("#formatWholePart()", () => {
        it("should return the number intact when it is already formatted", () => {
            assert.strictEqual(Formatter.formatWholePart("12"), "12");
        });
        it("should return the decimal intact when it is already formatted", () => {
            assert.strictEqual(Formatter.formatWholePart("-12"), "-12");
        });
        it("should return the number with leading zeros removed when number > 0", () => {
            assert.strictEqual(Formatter.formatWholePart("000012"), "12");
        });
        it("should return the number with leading zeros removed when number < 0", () => {
            assert.strictEqual(Formatter.formatWholePart("-000012"), "-12");
        });
    });

    describe("#formatFractionalPart()", () => {
        it("should return the decimal intact when it is already formatted", () => {
            assert.strictEqual(Formatter.formatFractionalPart("12.0"), "12.0");
        });
        it("should return the decimal intact when it is already formatted", () => {
            assert.strictEqual(Formatter.formatFractionalPart("0.0"), "0.0");
        });
        it("should return the decimal intact when it is already formatted", () => {
            assert.strictEqual(Formatter.formatFractionalPart("12.1324"), "12.1324");
        });
        it("should return the correct decimal when it has 0 fractional part", () => {
            assert.strictEqual(Formatter.formatFractionalPart("12.0000"), "12.0");
        });
        it("should return the correct decimal when it has trailing fractional zeros", () => {
            assert.strictEqual(Formatter.formatFractionalPart("12.545000"), "12.545");
        });
    });
});