//@ts-check
import { StringMath } from "./StringMath.mjs"

export class BigNumber {
    constructor(valueString = "0") {
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

    //Adds the operand value to the current value
    add(operand) {
        if (operand instanceof BigNumber) {
            if (this.type === "decimal" && operand.type === "decimal") {
                if (this.sign === "+" && operand.sign === "+") {
                    return new BigNumber(StringMath.addUnsignedDec(this.value, operand.value));
                } else {
                    return new BigNumber(StringMath.addDec(this.value, operand.value));
                }
            } else if (this.type === "integer" && operand.type === "integer") {
                if (this.sign === "+" && operand.sign === "+") {
                    return new BigNumber(StringMath.addUnsignedInt(this.value, operand.value));
                } else {
                    return new BigNumber(StringMath.addInt(this.value, operand.value));
                }
            } else if (this.type === "integer") {
                if (this.sign === "+" && operand.sign === "+") {
                    return new BigNumber(StringMath.addUnsignedDec(this.value + ".0", operand.value));
                } else {
                    return new BigNumber(StringMath.addDec(this.value + ".0", operand.value));
                }
            } else if (operand.type === "integer") {
                if (this.sign === "+" && operand.sign === "+") {
                    return new BigNumber(StringMath.addUnsignedDec(this.value, operand.value + ".0"));
                } else {
                    return new BigNumber(StringMath.addDec(this.value, operand.value + ".0"));
                }
            }
        } else {
            throw new TypeError("An instance of BigNumber is required as the operand");
        }
    }

    //Multiplies the current value by the operand value
    //Using the multiplyByNumber method is more efficient if the operand is less than ((Number.MAX_SAFE_INTEGER - 9) / 9) (Infinite precision will be compromised)
    multiply(operand) {
        if (operand instanceof BigNumber) {
            if (this.type === "decimal" || operand.type === "decimal") {
                if (this.sign === "+" && operand.sign === "+") {
                    return new BigNumber(StringMath.multiplyUnsignedDec2(this.value, operand.value));
                } else {
                    return new BigNumber(StringMath.multiplyDec2(this.value, operand.value));
                }
            } else {
                if (this.sign === "+" && operand.sign === "+") {
                    return new BigNumber(StringMath.multiplyUnsignedInt2(this.value, operand.value));
                } else {
                    return new BigNumber(StringMath.multiplyInt2(this.value, operand.value));
                }
            }
        } else {
            throw new TypeError("An instance of BigNumber is required as the operand");
        }
    }

    //Multiplies the current value by the operand value
    //Operand must be of type Number
    //Using the multiply method is recommended if the operand is greater than ((Number.MAX_SAFE_INTEGER - 9) / 9)
    multiplyByNumber(operand) {
        if (typeof operand === "number") {
            if (operand > (Number.MAX_SAFE_INTEGER - 9) / 9) {
                throw new RangeError("Numbers larger than 1000799917193442.5 aren't allowed due to loss of precision. Use 'BigNumber.multiply()' instead");
            } else if (this.type === "decimal" || operand.toString().includes(".")) {
                if (this.sign === "+" && (Math.abs(operand) === operand)) {
                    return new BigNumber(StringMath.multiplyUnsignedDec(this.value, operand));
                } else {
                    return new BigNumber(StringMath.multiplyDec(this.value, operand));
                }
            } else {
                if (this.sign === "+" && (Math.abs(operand) === operand)) {
                    return new BigNumber(StringMath.multiplyUnsignedInt(this.value, operand));
                } else {
                    return new BigNumber(StringMath.multiplyInt(this.value, operand));
                }
            }
        } else {
            throw new TypeError("An instance of Number is required as the operand");
        }
    }
}