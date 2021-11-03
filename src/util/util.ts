export class TestUtil {
    /**
     * Returns the HTMLTableElement for a given multiArray
     * @param multiArray 
     * @returns 
     */
    static getTableForMultiArray(multiArray: number[][]) {
        var table = document.createElement("table");
        var tableBody = document.createElement("tbody");

        for (var i = 0; i < multiArray.length; i++) {
            var tableRow = document.createElement("tr");

            for (var j = 0; j < multiArray[i].length; j++) {
                var tableData = document.createElement("td");
                tableData.innerHTML = multiArray[i][j].toString();
                tableRow.appendChild(tableData);
            }

            tableBody.appendChild(tableRow);
        }

        table.appendChild(tableBody);
        return table;
    }

    /**
     * Logs the comparison result after a comparison of two signed numbers given as strings
     * @param num1 
     * @param num2 
     */
    static logComparisonReport(num1: string, num2: string) {
        let num1Sign = "";
        let num2Sign = "";

        if (num1.startsWith("-")) {
            num1Sign = "-";
            num1 = num1.replace("-", "");
        }

        if (num2.startsWith("-")) {
            num2Sign = "-";
            num2 = num2.replace("-", "");
        }

        if (num1Sign === num2Sign) {
            console.log("same sign,", "no need of further comparison");
        } else if (num1 === num2) {
            console.log("opposite signs,", "same values,", "no need of further comparison");
        } else {
            if (num1.length > num2.length) {
                console.log("opposite signs,", "number1.length > number2.length,", "number1 is large");
            } else if (num1.length < num2.length) {
                console.log("opposite signs,", "number1.length < number2.length,", "number2 is large");
            } else {
                for (let i = 0; i < num1.length; i++) {
                    if (num1[i] === num2[i]) {
                        console.log("opposite signs,", "lengths are equal,", `${i}th digits are equal,`, "searching further");
                        continue;
                    } else if (num1[i] === ".") {
                        console.log("opposite signs,", "lengths are equal,", "decimal place found early from number1,", "number2 is large");
                        break;
                    } else if (num2[i] === ".") {
                        console.log("opposite signs,", "lengths are equal,", "decimal place found early from number2,", "number1 is large");
                        break;
                    } else if (parseInt(num1[i]) > parseInt(num2[i])) {
                        console.log("opposite signs,", "lengths are equal,", `number1's ${i}th digit > number2's ${i}th digit,`, "number1 is large");
                        break;
                    } else {
                        console.log("opposite signs,", "lengths are equal,", `number1's ${i}th digit < number2's ${i}th digit,`, "number2 is large");
                        break;
                    }
                }
            }
        }
    }
}

export class ArgumentParser {
    static parseToInt(args: string[]) {
        const parsedArgs = [];
        //Parse all arguments to integers
        for (let i = 0; i < args.length; i++) {
            parsedArgs[i] = parseInt(args[i]);

            if (isNaN(parsedArgs[i])) {
                throw TypeError(`Cannot parse argument "${args[i]}" as Integer`);
            }
        }

        return parsedArgs;
    }
}

export class ArrayUtil {
    /**
     * Sorts an array of numbers
     * @param arr
     */
    static sortNumberArray(arr: number[]) {
        arr.sort((element1, element2) => element1 - element2);
    }
}

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
     * @return A user and Discord friendly output
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