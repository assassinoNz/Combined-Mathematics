import { Formatter } from "../util/util.js";

export class MultiPrecisionMath {
    /**
     * @deprecated
     * Adds two unsigned integers with unlimited precision
     * NOTE: Can only be used for unsigned(positive) integer addition
     * @param int1 
     * @param int2
     * @returns The sum of int1 and int2
     */
    static addUnsignedInt(int1: string, int2: string) {
        //Make both numbers have the same length by adding leading zeros
        if (int1.length - int2.length > 0) {
            int2 = "0".repeat(int1.length - int2.length) + int2;
        } else if (int2.length - int1.length > 0) {
            int1 = "0".repeat(int2.length - int1.length) + int1;
        }

        let carryValue = 0;
        const resultDigits = [];
        for (let i = int1.length - 1; i > -1; i--) {
            const temporalSum = parseInt(int1[i]) + parseInt(int2[i]) + carryValue;
            const temporalSumDigits = temporalSum.toString().split("");
            resultDigits.unshift(temporalSumDigits.pop());
            if (i === 0) {
                resultDigits.unshift(temporalSumDigits.join(""));
            } else if (temporalSumDigits.length > 0) {
                carryValue = parseInt(temporalSumDigits.join(""));
            } else {
                carryValue = 0;
            }
        }
        return Formatter.formatWholePart(resultDigits.join(""));
    }

    /**
     * @deprecated
     * Subtracts an integer from another integer with unlimited precision
     * NOTE: Can only be used for unsigned(positive) integer subtraction
     * NOTE: Subtraction refers to the operation and not the number's sign
     * @param largerInt 
     * @param smallerInt
     * @returns The difference of largerInt and smallerInt
     */
    static subtractUnsignedInt(largerInt: string, smallerInt: string) {
        //Make both numbers have the same length by adding leading zeros
        if (largerInt.length - smallerInt.length > 0) {
            smallerInt = "0".repeat(largerInt.length - smallerInt.length) + smallerInt;
        } else if (smallerInt.length - largerInt.length > 0) {
            largerInt = "0".repeat(smallerInt.length - largerInt.length) + largerInt;
        }

        const answers = [];
        for (let i = largerInt.length - 1; i > -1; i--) {
            let upgradedValue;
            if (i === largerInt.length - 1) {
                upgradedValue = parseInt(largerInt[i]) + 10;
            } else if (i === 0) {
                upgradedValue = parseInt(largerInt[i]) - 1;
            } else {
                upgradedValue = parseInt(largerInt[i]) - 1 + 10;
            }
            answers.unshift(upgradedValue - parseInt(smallerInt[i]));
        }

        const digits = [];
        let carryValue = 0;
        for (let j = answers.length - 1; j > -1; j--) {
            if (answers[j] + carryValue < 10) {
                digits[j] = answers[j] + carryValue;
                carryValue = 0;
            } else {
                digits[j] = answers[j] - 10 + carryValue;
                carryValue = 1;
            }
        }

        return Formatter.formatWholePart(digits.join(""));
    }

    /**
     * @deprecated
     * Adds two signed integers with unlimited precision
     * NOTE: Can only be used for signed integer addition
     * NOTE: Positive sign must be omitted for positive integers
     * @param int1 
     * @param int2
     * @returns The sum of int1 and int2
     */
    static addInt(int1: string, int2: string) {
        let int1Sign = "";
        let int2Sign = "";

        if (int1.startsWith("-")) {
            int1Sign = "-";
            int1 = int1.replace("-", "");
        }

        if (int2.startsWith("-")) {
            int2Sign = "-";
            int2 = int2.replace("-", "");
        }

        if (int1Sign === int2Sign) {
            return int1Sign + this.addUnsignedInt(int1, int2);
        } else if (int1 === int2) {
            return "0";
        } else {
            if (int1.length > int2.length) {
                return int1Sign + this.subtractUnsignedInt(int1, int2);
            } else if (int1.length < int2.length) {
                return int2Sign + this.subtractUnsignedInt(int2, int1);
            } else if (int1.length === int2.length) {
                for (let i = 0; i < int1.length; i++) {
                    if (int1[i] === int2[i]) {
                        continue;
                    } else if (parseInt(int1[i]) > parseInt(int2[i])) {
                        return int1Sign + this.subtractUnsignedInt(int1, int2);
                    } else {
                        return int2Sign + this.subtractUnsignedInt(int2, int1);
                    }
                }
            }
        }
    }

    /**
     * @deprecated
     * Adds two unsigned decimal numbers with unlimited precision
     * NOTE: Can only be used for unsigned(positive) decimal number addition
     * @param dec1 
     * @param dec2
     * @returns The sum of dec1 and dec2
     */
    static addUnsignedDec(dec1: string, dec2: string) {
        const dec1Parts = dec1.split(".");
        const dec2Parts = dec2.split(".");
        //Make whole number part of both numbers have the same length by adding leading zeros
        if (dec1Parts[0].length - dec2Parts[0].length > 0) {
            dec2Parts[0] = "0".repeat(dec1Parts[0].length - dec2Parts[0].length) + dec2Parts[0];
        } else if (dec2Parts[0].length - dec1Parts[0].length > 0) {
            dec1Parts[0] = "0".repeat(dec2Parts[0].length - dec1Parts[0].length) + dec1Parts[0];
        }
        //Make decimal number part of both numbers have the same length by adding leading zeros
        if (dec1Parts[1].length - dec2Parts[1].length > 0) {
            dec2Parts[1] = dec2Parts[1] + "0".repeat(dec1Parts[1].length - dec2Parts[1].length);
        } else if (dec2Parts[1].length - dec1Parts[1].length > 0) {
            dec1Parts[1] = dec1Parts[1] + "0".repeat(dec2Parts[1].length - dec1Parts[1].length);
        }

        dec1 = dec1Parts.join("");
        dec2 = dec2Parts.join("");

        const resultDigits = this.addUnsignedInt(dec1, dec2).split("");
        resultDigits.splice(resultDigits.length - dec1Parts[1].length, 0, ".");
        return Formatter.formatFractionalPart(resultDigits.join(""));
    }

    /**
     * @deprecated
     * Subtracts a decimal number from another decimal number with unlimited precision
     * NOTE: Can only be used for unsigned(positive) decimal number subtraction
     * NOTE: Subtraction refers to the operation and not the number's sign
     * @param largerDec
     * @param smallerDec
     * @returns The difference of largerDec and smallerDec
     */
    static subtractUnsignedDec(largerDec: string, smallerDec: string) {
        const largerDecParts = largerDec.split(".");
        const smallerDecParts = smallerDec.split(".");
        //Make whole number part of both numbers have the same length by adding leading zeros
        if (largerDecParts[0].length - smallerDecParts[0].length > 0) {
            smallerDecParts[0] = "0".repeat(largerDecParts[0].length - smallerDecParts[0].length) + smallerDecParts[0];
        } else if (smallerDecParts[0].length - largerDecParts[0].length > 0) {
            largerDecParts[0] = "0".repeat(smallerDecParts[0].length - largerDecParts[0].length) + largerDecParts[0];
        }
        //Make decimal number part of both numbers have the same length by adding leading zeros
        if (largerDecParts[1].length - smallerDecParts[1].length > 0) {
            smallerDecParts[1] = smallerDecParts[1] + "0".repeat(largerDecParts[1].length - smallerDecParts[1].length);
        } else if (smallerDecParts[1].length - largerDecParts[1].length > 0) {
            largerDecParts[1] = largerDecParts[1] + "0".repeat(smallerDecParts[1].length - largerDecParts[1].length);
        }

        largerDec = largerDecParts.join("");
        smallerDec = smallerDecParts.join("");

        const resultDigits = this.subtractUnsignedInt(largerDec, smallerDec).split("");
        resultDigits.splice(resultDigits.length - largerDecParts[1].length, 0, ".");
        return Formatter.formatFractionalPart(resultDigits.join(""));
    }

    /**
     * @deprecated
     * Adds two signed decimal numbers with unlimited precision
     * NOTE: Can only be used for signed decimal number addition
     * NOTE: Positive sign must be omitted for positive integers
     * @param dec1 
     * @param dec2
     * @returns The sum of dec1 and dec2
     */
    static addDec(dec1: string, dec2: string) {
        let dec1Sign = "";
        let dec2Sign = "";

        if (dec1.startsWith("-")) {
            dec1Sign = "-";
            dec1 = dec1.replace("-", "");
        }

        if (dec2.startsWith("-")) {
            dec2Sign = "-";
            dec2 = dec2.replace("-", "");
        }

        if (dec1Sign === dec2Sign) {
            return dec1Sign + this.addUnsignedDec(dec1, dec2);
        } else if (dec1 === dec2) {
            return "0";
        } else {
            if (dec1.length > dec2.length) {
                return dec1Sign + this.subtractUnsignedDec(dec1, dec2);
            } else if (dec1.length < dec2.length) {
                return dec2Sign + this.subtractUnsignedDec(dec2, dec1);
            } else {
                for (let i = 0; i < dec1.length; i++) {
                    if (dec1[i] === dec2[i]) {
                        continue;
                    } else if (dec1[i] === ".") {
                        return dec2Sign + this.subtractUnsignedDec(dec2, dec1);
                    } else if (dec2[i] === ".") {
                        return dec1Sign + this.subtractUnsignedDec(dec1, dec2);
                    } else if (parseInt(dec1[i]) > parseInt(dec2[i])) {
                        return dec1Sign + this.subtractUnsignedDec(dec1, dec2);
                    } else {
                        return dec2Sign + this.subtractUnsignedDec(dec2, dec1);
                    }
                }
            }
        }
    }

    /**
     * @deprecated
     * Multiplies two unsigned integers with fairly unlimited precision
     * NOTE: Can only be used for unsigned(positive) integer multiplication
     * @param integer 
     * @param multiplier Must honor the range 0<=multiplier<=NUmber.MAX_SAFE_INTEGER/9
     * @returns The product of integer with multiplier
     */
    static multiplyUnsignedInt(integer: string, multiplier: number) {
        const resultDigits = [];
        let carryValue = 0;

        for (let i = integer.length - 1; i > -1; i--) {
            let temporalProduct = (parseInt(integer[i]) * multiplier) + carryValue;
            let temporalProductDigits = temporalProduct.toString().split("");
            resultDigits.unshift(temporalProductDigits.pop());
            if (i === 0) {
                resultDigits.unshift(temporalProductDigits.join(""));
            } else if (temporalProductDigits.length > 0) {
                carryValue = parseInt(temporalProductDigits.join(""));
            } else {
                carryValue = 0;
            }
        }

        return Formatter.formatWholePart(resultDigits.join(""));
    }

    /**
     * @deprecated
     * Multiplies two signed integers with fairly unlimited precision
     * NOTE: Can only be used for signed integer multiplication
     * NOTE: Positive sign must be omitted for positive integers
     * @param integer 
     * @param multiplier Must honor the range 0<=multiplier<=NUmber.MAX_SAFE_INTEGER/9
     * @returns The product of integer with multiplier
     */
    static multiplyInt(integer: string, multiplier: number) {
        let signString = "";
        if (!integer.startsWith("-") !== !multiplier.toString().startsWith("-")) {
            signString = "-";
        }
        integer = integer.replace("-", "");
        multiplier = Math.abs(multiplier);

        return signString + this.multiplyUnsignedInt(integer, multiplier);
    }

    /**
     * @deprecated
     * Multiplies two unsigned decimal numbers with fairly unlimited precision
     * NOTE: Can only be used for unsigned(positive) decimal number multiplication
     * @param decimal 
     * @param multiplier Must honor the range 0<=multiplier<=NUmber.MAX_SAFE_INTEGER/9
     * @returns The product of decimal with multiplier
     */
    static multiplyUnsignedDec(decimal: string, multiplier: number) {
        let decDecimals = decimal.split("").reverse().indexOf(".");
        let multiplierDecimals = multiplier.toString().split("").reverse().indexOf(".");
        let numOfDecimals = 0;
        if (decDecimals !== -1) {
            numOfDecimals = numOfDecimals + decDecimals;
        }
        if (multiplierDecimals !== -1) {
            numOfDecimals = numOfDecimals + multiplierDecimals;
        }
        decimal = decimal.replace(".", "");
        multiplier = parseInt(multiplier.toString().replace(".", ""));

        if (numOfDecimals > 0) {
            const resultDigits = this.multiplyUnsignedInt(decimal, multiplier).split("");
            resultDigits.splice(resultDigits.length - numOfDecimals, 0, ".");
            return resultDigits.join("");
        } else {
            return Formatter.formatFractionalPart(this.multiplyUnsignedInt(decimal, multiplier));
        }
    }

    /**
     * @deprecated
     * Multiplies two signed decimal numbers with fairly unlimited precision
     * NOTE: Can only be used for signed decimal number multiplication
     * NOTE: Positive sign must be omitted for positive integers
     * @param decimal 
     * @param multiplier Must honor the range 0<=multiplier<=NUmber.MAX_SAFE_INTEGER/9
     * @returns The product of decimal with multiplier
     */
    static multiplyDec(decimal: string, multiplier: number) {
        let signString = "";
        if (!decimal.startsWith("-") !== !multiplier.toString().startsWith("-")) {
            signString = "-";
        }
        decimal = decimal.replace("-", "");
        multiplier = Math.abs(multiplier);

        return signString + this.multiplyUnsignedDec(decimal, multiplier);
    }

    /**
     * @deprecated
     * Multiplies two signed integers with unlimited precision
     * NOTE: Can only be used for signed integer multiplication
     * @param int1 
     * @param int2
     * @returns The product of int1 with int2
     */
    static multiplyUnsignedInt2(int1: string, int2: string) {
        const productRows = [];

        for (let j = int2.length - 1; j > -1; j--) {

            const temporalResultDigits = [];
            let carryValue = 0;

            for (let i = int1.length - 1; i > -1; i--) {
                let temporalProduct = (parseInt(int1[i]) * parseInt(int2[j])) + carryValue;
                let temporalProductDigits = temporalProduct.toString().split("");
                temporalResultDigits.unshift(temporalProductDigits.pop());
                if (i === 0) {
                    temporalResultDigits.unshift(temporalProductDigits.join(""));
                } else if (temporalProductDigits.length > 0) {
                    carryValue = parseInt(temporalProductDigits.join(""));
                } else {
                    carryValue = 0;
                }
            }

            productRows.push(temporalResultDigits.join("") + "0".repeat(int2.length - 1 - j));
        }

        let resultDigits = "0";
        for (let k = 0; k < productRows.length; k++) {
            resultDigits = this.addUnsignedInt(resultDigits, productRows[k]);
        }

        return resultDigits;
    }

    /**
     * @deprecated
     * Multiplies two signed integers with unlimited precision
     * NOTE: Can only be used for signed integer multiplication
     * NOTE: Positive sign must be omitted for positive integers
     * @param int1 
     * @param int2
     * @returns The product of int1 with int2
     */
    static multiplyInt2(int1: string, int2: string) {
        let signString = "";
        if (!int1.startsWith("-") !== !int2.startsWith("-")) {
            signString = "-";
        }
        int1 = int1.replace("-", "");
        int2 = int2.replace("-", "");

        return signString + this.multiplyUnsignedInt2(int1, int2);
    }

    /**
     * @deprecated
     * Multiplies two unsigned decimal numbers with unlimited precision
     * NOTE: Can only be used for unsigned(positive) decimal number multiplication
     * @param dec1
     * @param dec2
     * @returns The product of dec1 with dec2
     */
    static multiplyUnsignedDec2(dec1: string, dec2: string) {
        const dec1Decimals = dec1.split("").reverse().indexOf(".");
        const dec2Decimals = dec2.split("").reverse().indexOf(".");
        let numOfDecimals = 0;
        if (dec1Decimals !== -1) {
            numOfDecimals = numOfDecimals + dec1Decimals;
        }
        if (dec2Decimals !== -1) {
            numOfDecimals = numOfDecimals + dec2Decimals;
        }
        dec1 = dec1.replace(".", "");
        dec2 = dec2.replace(".", "");

        if (numOfDecimals > 0) {
            const resultDigits = this.multiplyUnsignedInt2(dec1, dec2).split("");
            resultDigits.splice(resultDigits.length - numOfDecimals, 0, ".");
            return resultDigits.join("");
        } else {
            return this.multiplyUnsignedInt2(dec1, dec2);
        }
    }

    /**
     * @deprecated
     * Multiplies two signed decimal numbers with unlimited precision
     * NOTE: Can only be used for signed decimal number multiplication
     * NOTE: Positive sign must be omitted for positive integers
     * @param dec1
     * @param dec2
     * @returns The product of dec1 with dec2
     */
    static multiplyDec2(dec1: string, dec2: string) {
        let signString = "";
        if (!dec1.startsWith("-") !== !dec2.startsWith("-")) {
            signString = "-";
        }
        dec1 = dec1.replace("-", "");
        dec2 = dec2.replace("-", "");

        return signString + this.multiplyUnsignedDec2(dec1, dec2);
    }

    /**
     * Adds two signed decimal numbers with unlimited precision using BigInt
     * NOTE: Can only be used for signed decimal number addition
     * @param dec1 
     * @param dec2
     * @returns The sum of dec1 and dec2
     */
    static addDecWithBigInt(dec1: string, dec2: string) {
        const dec1Parts = dec1.split(".");
        const dec2Parts = dec2.split(".");

        //Make fractional number part of both numbers have the same length by adding trailing zeros
        let fractionalLength = 0;
        if (dec1Parts[1].length > dec2Parts[1].length) {
            fractionalLength = dec1Parts[1].length;
            dec2Parts[1] = dec2Parts[1] + "0".repeat(dec1Parts[1].length - dec2Parts[1].length);
        } else if (dec2Parts[1].length > dec1Parts[1].length) {
            fractionalLength = dec2Parts[1].length;
            dec1Parts[1] = dec1Parts[1] + "0".repeat(dec2Parts[1].length - dec1Parts[1].length);
        } else {
            fractionalLength = dec1Parts[1].length;
        }

        //Add the numbers as integers without considering the decimal point
        let answer = (BigInt(dec1Parts.join("")) + BigInt(dec2Parts.join(""))).toString();

        //Put the decimal point in the correct position
        answer = answer.slice(0, -fractionalLength) + "." + answer.slice(-fractionalLength);

        return Formatter.formatFractionalPart(answer);
    
    }

    /**
     * Multiplies two signed decimal numbers with unlimited precision using BigInt
     * NOTE: Can only be used for signed decimal number multiplication
     * @param dec1 
     * @param dec2
     * @returns The product of dec1 and dec2
     */
    static multiplyDecWithBigInt(dec1: string, dec2: string) {
        const dec1Parts = dec1.split(".");
        const dec2Parts = dec2.split(".");

        //Calculate total decimal places
        const totalDecimalPlaces = dec1Parts[1].length + dec2Parts[1].length;

        //Multiply the numbers as integers without considering the decimal point
        let answer = (BigInt(dec1.replace(".", "")) * BigInt(dec2.replace(".", ""))).toString();
        
        //Put the decimal point in the correct position
        answer = answer.slice(0, -totalDecimalPlaces) + "." + answer.slice(-totalDecimalPlaces);

        return Formatter.formatFractionalPart(answer);
    }

    /**
     * Raises a decimal number to a given integer power
     * NOTE: Can be used with signed(both positive and negative) integers and decimals
     * @param integer 
     * @param power
     */
    static powDec(integer: string, power: number) {
        let finalProduct = integer;
        for (let i = 1; i < power; i++) {
            finalProduct = this.multiplyDec(finalProduct, power);
        }
        return finalProduct;
    }
}