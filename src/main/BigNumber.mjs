//@ts-check
import { MultiPrecisionMath } from "../math/MultiPrecisionMath.mjs";

export class BigNumber {
    /** Constructs a BigNumber
     * @param {string} valueString
    */
    constructor(valueString) {
        valueString = valueString.toString();

        if (/^[+-]{0,1}[0-9]{1,}[.]{1}0{1}$/g.test(valueString)) {
            valueString = valueString.replace(".0", "");
            this.type = "integer";
        } else if (/^[+-]{0,1}[0-9]{1,}[.]{1}[0-9]{1,}$/g.test(valueString)) {
            this.type = "decimal";
            //Remove trailing zeros (only with decimals)
            valueString = valueString.replace(/([0-9]{1})0{1,}$/, "$1");
        } else if (/^[+-]{0,1}[0-9]{1,}$/g.test(valueString)) {
            this.type = "integer";
        } else {
            throw new SyntaxError("Parameter includes one or more invalid characters");
        }

        if (valueString.startsWith("-")) {
            this.sign = "-";
            //Remove leading zeros after removing "-" sign and add it back
            this.value = this.sign + valueString.replace("-", "").replace(/^0{1,}([0-9]{1})/, "$1");
        } else {
            this.sign = "+";
            //Remove leading zeros after removing "+" sign if present (no need of adding the sign back)
            this.value = valueString.replace("+", "").replace(/^0{1,}([0-9]{1})/, "$1");
        }
    }

    /** Returns a new big number with the operand added to this
     * @param {BigNumber} operand
     * @returns {BigNumber} A new big number with the sum of this and operand
    */
    add(operand) {
        if (operand instanceof BigNumber) {
            if (this.type === "decimal" && operand.type === "decimal") {
                if (this.sign === "+" && operand.sign === "+") {
                    return new BigNumber(MultiPrecisionMath.addUnsignedDec(this.value, operand.value));
                } else {
                    return new BigNumber(MultiPrecisionMath.addDec(this.value, operand.value));
                }
            } else if (this.type === "integer" && operand.type === "integer") {
                if (this.sign === "+" && operand.sign === "+") {
                    return new BigNumber(MultiPrecisionMath.addUnsignedInt(this.value, operand.value));
                } else {
                    return new BigNumber(MultiPrecisionMath.addInt(this.value, operand.value));
                }
            } else if (this.type === "integer") {
                if (this.sign === "+" && operand.sign === "+") {
                    return new BigNumber(MultiPrecisionMath.addUnsignedDec(this.value + ".0", operand.value));
                } else {
                    return new BigNumber(MultiPrecisionMath.addDec(this.value + ".0", operand.value));
                }
            } else if (operand.type === "integer") {
                if (this.sign === "+" && operand.sign === "+") {
                    return new BigNumber(MultiPrecisionMath.addUnsignedDec(this.value, operand.value + ".0"));
                } else {
                    return new BigNumber(MultiPrecisionMath.addDec(this.value, operand.value + ".0"));
                }
            }
        } else {
            throw new TypeError("An instance of BigNumber is required as the operand");
        }
    }

    /** Returns a new big number wth this multiplied by the operand
     * @param {BigNumber} operand
     * @returns {BigNumber} A new big number with the product of this and operand
    */
    multiply(operand) {
        if (operand instanceof BigNumber) {
            if (this.type === "decimal" || operand.type === "decimal") {
                if (this.sign === "+" && operand.sign === "+") {
                    return new BigNumber(MultiPrecisionMath.multiplyUnsignedDec2(this.value, operand.value));
                } else {
                    return new BigNumber(MultiPrecisionMath.multiplyDec2(this.value, operand.value));
                }
            } else {
                if (this.sign === "+" && operand.sign === "+") {
                    return new BigNumber(MultiPrecisionMath.multiplyUnsignedInt2(this.value, operand.value));
                } else {
                    return new BigNumber(MultiPrecisionMath.multiplyInt2(this.value, operand.value));
                }
            }
        } else {
            throw new TypeError("An instance of BigNumber is required as the operand");
        }
    }

    /** Returns a new big number wth this multiplied by the operand
     * NOTE: Using the multiply method is recommended if the operand is greater than ((Number.MAX_SAFE_INTEGER - 9) / 9)
     * @param {number} operand
     * @returns {BigNumber} A new big number with the product of this and operand
    */
    multiplyByNumber(operand) {
        if (typeof operand === "number") {
            if (operand > (Number.MAX_SAFE_INTEGER - 9) / 9) {
                throw new RangeError("Numbers larger than 1000799917193442.5 aren't allowed due to loss of precision. Use 'BigNumber.multiply()' instead");
            } else if (this.type === "decimal" || operand.toString().includes(".")) {
                if (this.sign === "+" && (Math.abs(operand) === operand)) {
                    return new BigNumber(MultiPrecisionMath.multiplyUnsignedDec(this.value, operand));
                } else {
                    return new BigNumber(MultiPrecisionMath.multiplyDec(this.value, operand));
                }
            } else {
                if (this.sign === "+" && (Math.abs(operand) === operand)) {
                    return new BigNumber(MultiPrecisionMath.multiplyUnsignedInt(this.value, operand));
                } else {
                    return new BigNumber(MultiPrecisionMath.multiplyInt(this.value, operand));
                }
            }
        } else {
            throw new TypeError("An instance of Number is required as the operand");
        }
    }
}