//@ts-check
export class CustomMath {
    /**
     * Reverses the digit order of an integer using only mathematical operations
     * WARNING: No usage for real tasks. Method exists only to demonstrate the algorithm
     * @param {number} integer
     * @return {number} The other palindromic half of the integer
     */
    static reverseIntMathematically(integer) {
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
     * @param {String} nicNumber
     * @return {String} The detailed report of the owner
     */
    static getNICDetails(nicNumber) {
        if (/^\d{9}([VX]|\d{3})$/.test(nicNumber)) {
            //Create a new date for ThisYear-January-Today
            const birthDate = new Date();
            birthDate.setMonth(0);

            //Update old NIC formats to match the new format
            if (/^\d{9}[VX]$/.test(nicNumber)) {
                nicNumber = "19" + nicNumber.substring(0, 5) + "0" + nicNumber.substring(5, 9);
            }

            //Set year of birthDate
            const fullYear = parseInt(nicNumber.substring(0, 4));
            birthDate.setFullYear(fullYear);

            //Update gender dropDownInput and subtract additional noOfDays if female
            let noOfDays = parseInt(nicNumber.substring(4, 7));
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

            return `Gender    : ${gender}\nBirth Date: ${birthDate.toISOString().slice(0, 10)}\nAge:      : ${now.getFullYear()-birthDate.getFullYear()}`;
        } else {
            return `InvalidArgumentsError: Argument "${nicNumber}" isn't valid`;
        }
    }
}