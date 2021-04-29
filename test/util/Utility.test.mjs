import "mocha";
import * as assert from "assert";

import { Formatter } from "../src/util/Utility.mjs";

//NOTE: Methods in this class aren't error handled. Therefore no use of testing for errors
describe("Formatter", () => {
    describe("#formatWholePart", () => {
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

    describe("#formatFractionalPart", () => {
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