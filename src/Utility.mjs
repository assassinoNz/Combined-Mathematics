//@ts-check
export class Utility {
    //Clones a multiArray
    //NOTE: This won't be necessary if ECMAScript specification includes a method for deep copying of objects
    static cloneMultiArray(multiArray = [[1]]) {
        //Declare and initialize an array to store clonedArray
        const clonedMultiArray = [[]];
        //Iteratively clone every immutable elements inside the multiArray into clonedMultiArray
        for (let i = 0; i < multiArray.length; i++) {
            clonedMultiArray[i] = [];
            for (let j = 0; j < multiArray[i].length; j++) {
                clonedMultiArray[i][j] = multiArray[i][j];
            }
        }
        //return clonedMultiArray
        return clonedMultiArray;
    }

    //Returns the HTMLTableElement for a given multiArray
    static getTableForMultiArray(multiArray = [[1]]) {
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

    //Logs the comparison result after a comparison of two signed numbers given as strings
    static logComparisonReport(numberString1 = "-1.0", numberString2 = "-1.0") {
        let numberString1Sign = "";
        let numberString2Sign = "";

        if (numberString1.startsWith("-")) {
            numberString1Sign = "-";
            numberString1 = numberString1.replace("-", "");
        }

        if (numberString2.startsWith("-")) {
            numberString2Sign = "-";
            numberString2 = numberString2.replace("-", "");
        }

        if (numberString1Sign === numberString2Sign) {
            console.log("same sign,", "no need of further comparison");
        } else if (numberString1 === numberString2) {
            console.log("opposite signs,", "same values,", "no need of further comparison");
        } else {
            if (numberString1.length > numberString2.length) {
                console.log("opposite signs,", "number1.length > number2.length,", "number1 is large");
            } else if (numberString1.length < numberString2.length) {
                console.log("opposite signs,", "number1.length < number2.length,", "number2 is large");
            } else {
                for (let i = 0; i < numberString1.length; i++) {
                    if (numberString1[i] === numberString2[i]) {
                        console.log("opposite signs,", "lengths are equal,", `${i}th digits are equal,`, "searching further");
                        continue;
                    } else if (numberString1[i] === ".") {
                        console.log("opposite signs,", "lengths are equal,", "decimal place found early from number1,", "number2 is large");
                        break;
                    } else if (numberString2[i] === ".") {
                        console.log("opposite signs,", "lengths are equal,", "decimal place found early from number2,", "number1 is large");
                        break;
                    } else if (parseInt(numberString1[i]) > parseInt(numberString2[i])) {
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

    static formatOutput(value) {
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

    static sortIntArray(intArray) {
        intArray.sort((element1, element2) => element1 - element2);
    }

    static parseArgsAsInt(args) {
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