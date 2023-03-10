export class Formatter {
    /**
     * Formats the whole part of an integer or a decimal string
     * @param num 
     */
    static formatWholePart(num: string) {
        let matches;
        if ((matches = num.match(/^-{0,1}(0{1,})[1-9]{1,}/)) !== null) {
            //CASE: Number is in one of the forms
            //-000XXX... or 000XXX...
            //Convert it into the form -XXX... or XXX...
            return num.replace(matches[1], "");
        } else if (/^-{0,1}0{1,}/.test(num)) {
            //CASE: Number is in one of the forms
            //-000... or 000...
            //Return a single zero
            return "0";
        } else {
            //CASE: No formatting needed
            return num;
        }
    }

    /**
     * Formats the fractional part of a decimal string
     * @param decimal 
     */
    static formatFractionalPart(decimal: string) {
        let matches;
        if ((matches = decimal.match(/[.]0{1,}$/)) !== null) {
            //CASE: Decimal is in the form XXX.00000...
            //Convert it into the form XXX.0
            return decimal.replace(matches[0], ".0");
        } else if ((matches = decimal.match(/0{1,}$/)) !== null) {
            //CASE: Decimal is in the form XXX.YYY00...
            //Convert it into the form XXX.YYY
            return decimal.replace(matches[0], "");
        } else {
            //CASE: No formatting needed
            return decimal;
        }
    }

    /**
     * Formats a given value in a user-friendly and Discord friendly way
     * @param value
     * @returns A user and Discord friendly output
     */
    static formatBotOutput(value: any) {
        if (value === true) {
            return "Yep";
        } else if (value === false) {
            return "Nope";
        } else if (Array.isArray(value)) {
            let stringifiedArray = "";

            for (let i = 0; i < value.length; i++) {
                stringifiedArray += value[i] + "   ";
            }

            return stringifiedArray;
        } else if (typeof value === "object") {
            let stringifiedObject = "";

            for (const key of Object.keys(value)) {
                stringifiedObject += key + " : " + value[key] + "\n";
            }

            return stringifiedObject;
        } else {
            return value;
        }
    }
}