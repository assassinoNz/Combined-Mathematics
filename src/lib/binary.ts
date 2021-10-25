export class BinaryMath {
    /**
     * NOTE: Can only be used with unsigned(positive) base-10 integers below Number.MAX_SAFE_INTEGER
     * @param decInteger 
     * @returns A string of an integer converted to its binary form
     */
    static convertUnsignedIntToBin(decInteger: number) {
        if (decInteger === 0) {
            return "0";
        } else {
            let binaryIntString = "";
            let numerator = decInteger;
            while (numerator > 1) {
                binaryIntString = (numerator % 2).toString() + binaryIntString;
                numerator = Math.floor(numerator / 2);
            }
            binaryIntString = "1" + binaryIntString;
            return binaryIntString;
        }
    }

    /**
     * NOTE: Can only be used with unsigned(positive) base-10 fractions(whole number part of the fraction should be 0)
     * @param num 
     * @returns A string of a fraction converted to its binary form
     */
    static convertUnsignedFractionToBin(num: number) {
        if (num === 0.0) {
            return "0.0";
        } else {
            let binaryFractionalString = "";
            let numerator = num;
            while (numerator > 0) {
                const doubledNumerator = numerator * 2;
                const wholeNumberPart = Math.floor(doubledNumerator);
                binaryFractionalString = binaryFractionalString + wholeNumberPart;
                numerator = doubledNumerator - wholeNumberPart;
            }
            return "0." + binaryFractionalString;
        }
    }

    /**
     * NOTE: Can only be used with unsigned(positive) base-10 integers and decimals(decimals cannot be integers)
     * @param number 
     * @returns A string of a decimal converted to its binary form. The binary form will always have a fractional part
     */
    static convertUnsignedDecToBin(number: number) {
        const wholeNumberPart = Math.floor(number);
        const fractionalPart = number - wholeNumberPart;

        return this.convertUnsignedIntToBin(wholeNumberPart) + this.convertUnsignedFractionToBin(fractionalPart).slice(1);
    }

    /**
     * NOTE: Any of the binary strings aren't trimmed or rounded
     * @param num 
     * @returns An array containing sign bit, bias exponent(decimal), mantissa(binary), entered number(binary)
     */
    static getIEEERawParts(num: number) {
        if (num === 0) {
            //0 can be represented as follows
            //Sing bit: 0 or 1
            //Biased Exponent: all 0
            //Mantissa: all 0
            return ["0", "0".repeat(11), "0".repeat(52), "0"];
        } else if (num === Infinity) {
            //+Infinity can be represented as follows
            //Sing bit: 0
            //Biased Exponent: all 1
            //Mantissa: all 0
            return ["0", "1".repeat(11), "0".repeat(52), "Positive Infinity"];
        } else if (num === -Infinity) {
            //-Infinity can be represented as follows
            //Sing bit: 1
            //Biased Exponent: all 1
            //Mantissa: all 0
            return ["1", "1".repeat(11), "0".repeat(52), "Negative Infinity"];
        } else if (isNaN(num)) {
            //NaN can be represented as follows
            //Sing bit: 0 or 1
            //Biased Exponent: all 1
            //Mantissa: any binary pattern except all 0
            return ["1", "1".repeat(11), "1".repeat(52), "Not A Number"];
        } else {
            let signBit = "0";
            //Determine signBit
            const absoluteValue = Math.abs(num);
            if (absoluteValue !== num) {
                signBit = "1";
            }

            const numberBin = this.convertUnsignedDecToBin(absoluteValue);

            const radixPosition = numberBin.indexOf(".");
            //replace(".", "") is used to unify the biased-exponent-finding equation for decimals (101001.00101) and fractions (0.01011) alike
            let first1BitPosition = numberBin.replace(".", "").indexOf("1");
            if (first1BitPosition === -1) {
                first1BitPosition = 0;
            }
            const biasedExponent = radixPosition - first1BitPosition - 1;

            //Remove radix point, remove leading zeros, ignore first bit (it is always 1)
            const mantissaBin = numberBin.replace(".", "").replace(/^0{1,}([0-1]{1})/, "$1").slice(1);

            return [signBit, biasedExponent.toString(), mantissaBin, numberBin];
        }
    }

    /**
     * Converts any unsigned(positive) number to binary32 format
     * @param num 
     * @returns 
     */
    static convertDecToBinary32(num: number) {
        const rawParts = this.getIEEERawParts(num);

        let biasedExponentBin = this.convertUnsignedIntToBin(parseInt(rawParts[1]) + 127);
        if (biasedExponentBin.length > 8) {
            biasedExponentBin = biasedExponentBin.substring(0, 8);
        } else if (biasedExponentBin.length < 8) {
            biasedExponentBin = "0".repeat(8 - biasedExponentBin.length) + biasedExponentBin;
        }

        let mantissaBin = rawParts[2];
        if (mantissaBin.length > 23) {
            mantissaBin = mantissaBin.substring(0, 23);
        } else if (mantissaBin.length < 23) {
            mantissaBin = mantissaBin + "0".repeat(23 - mantissaBin.length);
        }

        return rawParts[0] + biasedExponentBin + mantissaBin;
    }

    /**
     * Converts any unsigned(positive) number to binary64 format
     * @param num 
     * @returns 
     */
    static convertDecToBinary64(num: number) {
        const rawParts = this.getIEEERawParts(num);

        let biasedExponentBin = this.convertUnsignedIntToBin(parseInt(rawParts[1]) + 1023);
        if (biasedExponentBin.length > 11) {
            biasedExponentBin = biasedExponentBin.substring(0, 11);
        } else if (biasedExponentBin.length < 11) {
            biasedExponentBin = "0".repeat(11 - biasedExponentBin.length) + biasedExponentBin;
        }

        let mantissaBin = rawParts[2];
        if (mantissaBin.length > 52) {
            mantissaBin = mantissaBin.substring(0, 52);
        } else if (mantissaBin.length < 52) {
            mantissaBin = mantissaBin + "0".repeat(52 - mantissaBin.length);
        }

        return rawParts[0] + biasedExponentBin + mantissaBin;
    }
}