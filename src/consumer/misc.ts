export class CustomMath {
    /**
     * Reverses the digit order of an integer using only mathematical operations
     * @param integer
     * @returns The other palindromic half of the integer
     */
    static reverseIntMathematically(integer: number) {
        let quotient = integer;
        let sum = 0;

        while (quotient !== 0) {
            const remainder = quotient % 10;
            sum = sum * 10 + remainder;
            quotient = quotient / 10;
        }

        return sum;
    }

    /**
     * Extracts details from the NIC number in Sri Lanka
     * @param nic
     * @returns The detailed report of the owner
     */
    static getNICDetails(nic: string) {
        if (/^\d{9}([VX]|\d{3})$/.test(nic)) {
            //Create a new date for ThisYear-January-Today
            const birthDate = new Date();
            birthDate.setMonth(0);

            //Update old NIC formats to match the new format
            if (/^\d{9}[VX]$/.test(nic)) {
                nic = "19" + nic.substring(0, 5) + "0" + nic.substring(5, 9);
            }

            //Set year of birthDate
            const fullYear = parseInt(nic.substring(0, 4));
            birthDate.setFullYear(fullYear);

            //Update gender dropDownInput and subtract additional noOfDays if female
            let noOfDays = parseInt(nic.substring(4, 7));
            let gender = null;
            if (noOfDays > 500) {
                gender = "Female";
                noOfDays -= 500;
            } else {
                gender = "Male"
            }

            //Set number of days for birthDate
            //NOTE: This will automatically set the month and day
            if (fullYear % 4 !== 0 && noOfDays > 60) {
                birthDate.setDate(noOfDays - 1);
            } else {
                birthDate.setDate(noOfDays);
            }

            const now = new Date();

            return `Gender    : ${gender}\nBirth Date: ${birthDate.toISOString().slice(0, 10)}\nAge:      : ${now.getFullYear() - birthDate.getFullYear()}`;
        } else {
            return `InvalidArgumentsError: Argument "${nic}" isn't valid`;
        }
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