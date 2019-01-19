//@ts-check
class CustomMath {
    //Returns all primes up to the specified range
    static getPrimes(range = 4) {
        const primes = [2];
        for (let i = 3; i < range; i = i + 2) {
            let isPrime = true;
            let factorRange = Math.sqrt(i);
            for (let j = 2; j <= factorRange; j++) {
                if (i % j === 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime === true) {
                primes.push(i);
            }
        }
        return primes;
    }

    //lowerBoundOdd must be an odd while the upperBound can be any integer
    //Calculates all primes using the sieve of Eratosthenes within the lowerBoundOdd and upperBound
    static getFromSieveOfEratosthenes(lowerBoundOdd = 3, upperBound = 30) {
        const numbers = [];
        //Get all natural numbers
        for (let i = lowerBoundOdd; i <= upperBound; i = i + 2) {
            numbers.push(i);
        }
        const primeNumbers = [];
        while (numbers.length > 0) {
            let nextPrime = numbers.unshift();
            primeNumbers.push(nextPrime);

            for (let j = 0; j < numbers.length; j++) {
                if (numbers[j] % nextPrime === 0) {
                    numbers.splice(j, 1);
                }
            }
        }
        return primeNumbers;
    }

    //Works with numbers only up to 9999 numbers
    //Returns the name of the given number in Pascal Case English(US)
    static getNumberName(number = 10) {
        if (number.toString().length > 4) {
            return "Number out of range";
        }

        const digitNames = [
            ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
            ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
            ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
            ["", "OneHundred", "TwoHundred", "ThreeHundred", "FourHundred", "FiveHundred", "SixHundred", "SevenHundred", "EightHundred", "NineHundred"],
            ["", "OneThousand", "TwoThousand", "ThreeThousand", "FourThousand", "FiveThousand", "SixThousand", "SevenThousand", "EightThousand", "NineThousand"]
        ];

        let modifiedNumber = number.toString();

        switch (modifiedNumber.length) {
            case 1:
                modifiedNumber = "000" + number;
                break;
            case 2:
                modifiedNumber = "00" + number;
                break;
            case 3:
                modifiedNumber = "0" + number;
                break;
            default:
                break;
        }

        const reversedDigitsArray = modifiedNumber.split("").reverse();

        let digitName1 = "";
        let digitName2 = "";
        let digitName3 = "";
        let digitName4 = "";

        if (reversedDigitsArray[1] === "1") {
            digitName1 = "";
            switch (reversedDigitsArray[0]) {
                case "0":
                    digitName2 = digitNames[0][0];
                    break;
                case "1":
                    digitName2 = digitNames[0][1];
                    break;
                case "2":
                    digitName2 = digitNames[0][2];
                    break;
                case "3":
                    digitName2 = digitNames[0][3];
                    break;
                case "4":
                    digitName2 = digitNames[0][4];
                    break;
                case "5":
                    digitName2 = digitNames[0][5];
                    break;
                case "6":
                    digitName2 = digitNames[0][6];
                    break;
                case "7":
                    digitName2 = digitNames[0][7];
                    break;
                case "8":
                    digitName2 = digitNames[0][8];
                    break;
                case "9":
                    digitName2 = digitNames[0][9];
                    break;
                default:
                    break;
            }
        } else {
            switch (reversedDigitsArray[0]) {
                case "0":
                    digitName1 = digitNames[1][0];
                    break;
                case "1":
                    digitName1 = digitNames[1][1];
                    break;
                case "2":
                    digitName1 = digitNames[1][2];
                    break;
                case "3":
                    digitName1 = digitNames[1][3];
                    break;
                case "4":
                    digitName1 = digitNames[1][4];
                    break;
                case "5":
                    digitName1 = digitNames[1][5];
                    break;
                case "6":
                    digitName1 = digitNames[1][6];
                    break;
                case "7":
                    digitName1 = digitNames[1][7];
                    break;
                case "8":
                    digitName1 = digitNames[1][8];
                    break;
                case "9":
                    digitName1 = digitNames[1][9];
                    break;
                default:
                    break;
            }
            switch (reversedDigitsArray[1]) {
                case "0":
                    digitName2 = digitNames[2][0];
                    break;
                case "1":
                    digitName2 = digitNames[2][1];
                    break;
                case "2":
                    digitName2 = digitNames[2][2];
                    break;
                case "3":
                    digitName2 = digitNames[2][3];
                    break;
                case "4":
                    digitName2 = digitNames[2][4];
                    break;
                case "5":
                    digitName2 = digitNames[2][5];
                    break;
                case "6":
                    digitName2 = digitNames[2][6];
                    break;
                case "7":
                    digitName2 = digitNames[2][7];
                    break;
                case "8":
                    digitName2 = digitNames[2][8];
                    break;
                case "9":
                    digitName2 = digitNames[2][9];
                    break;
                default:
                    break;
            }
        }

        switch (reversedDigitsArray[2]) {
            case "0":
                digitName3 = digitNames[3][0];
                break;
            case "1":
                digitName3 = digitNames[3][1];
                break;
            case "2":
                digitName3 = digitNames[3][2];
                break;
            case "3":
                digitName3 = digitNames[3][3];
                break;
            case "4":
                digitName3 = digitNames[3][4];
                break;
            case "5":
                digitName3 = digitNames[3][5];
                break;
            case "6":
                digitName3 = digitNames[3][6];
                break;
            case "7":
                digitName3 = digitNames[3][7];
                break;
            case "8":
                digitName3 = digitNames[3][8];
                break;
            case "9":
                digitName3 = digitNames[3][9];
                break;
            default:
                break;
        }
        switch (reversedDigitsArray[3]) {
            case "0":
                digitName4 = digitNames[4][0];
                break;
            case "1":
                digitName4 = digitNames[4][1];
                break;
            case "2":
                digitName4 = digitNames[4][2];
                break;
            case "3":
                digitName4 = digitNames[4][3];
                break;
            case "4":
                digitName4 = digitNames[4][4];
                break;
            case "5":
                digitName4 = digitNames[4][5];
                break;
            case "6":
                digitName4 = digitNames[4][6];
                break;
            case "7":
                digitName4 = digitNames[4][7];
                break;
            case "8":
                digitName4 = digitNames[4][8];
                break;
            case "9":
                digitName4 = digitNames[4][9];
                break;
            default:
                break;
        }

        return digitName4 + digitName3 + digitName2 + digitName1;
    }

    //Calculates all integer factors of a given number
    static getAllFactors(number = 10) {
        const factors = [];
        let factorRange = Math.sqrt(number);
        for (let i = 1; i <= factorRange; i++) {
            if (number % i === 0) {
                factors.push(i);
                factors.push(number / i);
            }
        }
        return factors;
    }

    //Calculates all prime factors of a given number using a prebuilt primes library (Primes2M.json)
    static getPrimeFactors(number = 10) {
        fetch("Primes2M.json").then(function (response) {
            return response.json();
        }).then(function (primes) {
            let numerator = number;
            const primeFactors = [];
            let primesLength = primes.length;
            for (let i = 0; i < primesLength;) {
                if (primes[i] > numerator) {
                    break;
                } else if (numerator % primes[i] === 0) {
                    numerator = numerator / primes[i];
                    primeFactors.push(primes[i]);
                    i = 0;
                } else {
                    i++;
                }
            }
            return primeFactors;
        });
    }

    //Returns the collatz sequence fot the specified number
    static getCollatzSequence(startingNumber = 9) {
        const collatzSequence = [startingNumber];
        let nextNumber = startingNumber;
        while (nextNumber !== 1) {
            if (nextNumber % 2 === 0) {
                nextNumber = nextNumber / 2;
            } else {
                nextNumber = (3 * nextNumber) + 1;
            }
            collatzSequence.push(nextNumber);
        }
        return collatzSequence;
    }

    //Returns the factorial value of the specified number
    static getFactorial(number = 5) {
        let factorialProduct = 1;
        for (let i = 2; i <= number; i++) {
            factorialProduct = factorialProduct * i;
        }
        return factorialProduct;
    }

    //Returns the fibonacci sequence up to the specified range
    static getFibonacciSequence(range = 12) {
        //Fibonacci sequence
        //1 1 2 3 5 8 13 21 34 55 89 144 ...
        //Fibonacci sequence formula
        //T(n)=4T(n-3)+T(n-6)
        const fibonacciSequence = ["0", "1", "1", "2", "3", "5"];
        for (let i = 6; i < range + 1; i++) {
            fibonacciSequence[i] = StringMath.multiplyUnsignedInt(fibonacciSequence[i - 3], 4);
            fibonacciSequence[i] = StringMath.addUnsignedInt(fibonacciSequence[i], fibonacciSequence[i - 6]);
        }
        return fibonacciSequence;
    }

    // Returns all possible permutations for the specified string
    // static getAllPermutations(string = "ABC") {
    //     const permutations = [];
    //     for (let i = 0; i < string.length; i++) {
    //         for (let j = i; j < string.length; j++) {
    //             string[]
    //         }
    //     }
    // }
}

class StringMath {
    //Can only be used for unsigned(positive) integer addition
    //Adds two integers (given as strings) with unlimited precision
    static addUnsignedInt(numberString1 = "1", numberString2 = "1") {
        //Make both numbers have the same length by adding leading zeros
        if (numberString1.length - numberString2.length > 0) {
            numberString2 = "0".repeat(numberString1.length - numberString2.length) + numberString2;
        } else if (numberString2.length - numberString1.length > 0) {
            numberString1 = "0".repeat(numberString2.length - numberString1.length) + numberString1;
        }

        const number1Length = numberString1.length;

        let carryValue = 0;
        const resultDigits = [];
        for (let i = number1Length - 1; i > -1; i--) {
            const temporalSum = parseInt(numberString1[i]) + parseInt(numberString2[i]) + carryValue;
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
        return resultDigits.join("");
    }

    //Can only be used for unsigned(positive) integer subtraction (subtraction refers to the operation and not the number's sign)
    //Subtracts the first integer (given as a string) from the second integer (given as a string) with unlimited precision
    static subtractUnsignedInt(largerNumberString = "2", smallerNumberString = "1") {
        //Make both numbers have the same length by adding leading zeros
        if (largerNumberString.length - smallerNumberString.length > 0) {
            smallerNumberString = "0".repeat(largerNumberString.length - smallerNumberString.length) + smallerNumberString;
        } else if (smallerNumberString.length - largerNumberString.length > 0) {
            largerNumberString = "0".repeat(smallerNumberString.length - largerNumberString.length) + largerNumberString;
        }

        const answersArray = [];
        for (let i = largerNumberString.length - 1; i > -1; i--) {
            let upgradedValue;
            if (i === largerNumberString.length - 1) {
                upgradedValue = parseInt(largerNumberString[i]) + 10;
            } else if (i === 0) {
                upgradedValue = parseInt(largerNumberString[i]) - 1;
            } else {
                upgradedValue = parseInt(largerNumberString[i]) - 1 + 10;
            }
            answersArray.unshift(upgradedValue - parseInt(smallerNumberString[i]));
        }

        const digitsArray = [];
        let carryValue = 0;
        for (let j = answersArray.length - 1; j > -1; j--) {
            if (answersArray[j] + carryValue < 10) {
                digitsArray[j] = answersArray[j] + carryValue;
                carryValue = 0;
            } else {
                digitsArray[j] = answersArray[j] - 10 + carryValue;
                carryValue = 1;
            }
        }

        return digitsArray.join("");
    }

    //Can only be used for signed(both positive and negative) integer addition
    //Adds two integers (given as strings) with unlimited precision
    static addInt(numberString1 = "-1", numberString2 = "-1") {
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
            return numberString1Sign + this.addUnsignedInt(numberString1, numberString2);
        } else if (numberString1 === numberString2) {
            return "0";
        } else {
            if (numberString1.length > numberString2.length) {
                return numberString1Sign + this.subtractUnsignedInt(numberString1, numberString2);
            } else if (numberString1.length < numberString2.length) {
                return numberString2Sign + this.subtractUnsignedInt(numberString2, numberString1);
            } else if (numberString1.length === numberString2.length) {
                for (let i = 0; i < numberString1.length; i++) {
                    if (numberString1[i] === numberString2[i]) {
                        continue;
                    } else if (parseInt(numberString1[i]) > parseInt(numberString2[i])) {
                        return numberString1Sign + this.subtractUnsignedInt(numberString1, numberString2);
                    } else {
                        return numberString2Sign + this.subtractUnsignedInt(numberString2, numberString1);
                    }
                }
            }
        }
    }

    //Can only be used for unsigned(positive) decimal addition (no integers allowed)
    //Adds two decimals (given as strings) with unlimited precision
    static addUnsignedDec(numberString1 = "1.0", numberString2 = "1.0") {
        const number1Parts = numberString1.split(".");
        const number2Parts = numberString2.split(".");
        //Make whole number part of both numbers have the same length by adding leading zeros
        if (number1Parts[0].length - number2Parts[0].length > 0) {
            number2Parts[0] = "0".repeat(number1Parts[0].length - number2Parts[0].length) + number2Parts[0];
        } else if (number2Parts[0].length - number1Parts[0].length > 0) {
            number1Parts[0] = "0".repeat(number2Parts[0].length - number1Parts[0].length) + number1Parts[0];
        }
        //Make decimal number part of both numbers have the same length by adding leading zeros
        if (number1Parts[1].length - number2Parts[1].length > 0) {
            number2Parts[1] = number2Parts[1] + "0".repeat(number1Parts[1].length - number2Parts[1].length);
        } else if (number2Parts[1].length - number1Parts[1].length > 0) {
            number1Parts[1] = number1Parts[1] + "0".repeat(number2Parts[1].length - number1Parts[1].length);
        }

        numberString1 = number1Parts.join("");
        numberString2 = number2Parts.join("");
        
        const resultDigits = this.addUnsignedInt(numberString1, numberString2).split("");
        resultDigits.splice(resultDigits.length - number1Parts[1].length, 0, ".");
        return resultDigits.join("");
    }

    //Can only be used for unsigned(positive) decimal subtraction (no integers allowed, subtraction refers to the operation and not the number's sign)
    //Subtracts the first decimal (given as a string) from the second decimal (given as a string) with unlimited precision
    static subtractUnsignedDec(largerNumberString = "2.0", smallerNumberString = "1.0") {
        const largerNumberParts = largerNumberString.split(".");
        const smallerNumberParts = smallerNumberString.split(".");
        //Make whole number part of both numbers have the same length by adding leading zeros
        if (largerNumberParts[0].length - smallerNumberParts[0].length > 0) {
            smallerNumberParts[0] = "0".repeat(largerNumberParts[0].length - smallerNumberParts[0].length) + smallerNumberParts[0];
        } else if (smallerNumberParts[0].length - largerNumberParts[0].length > 0) {
            largerNumberParts[0] = "0".repeat(smallerNumberParts[0].length - largerNumberParts[0].length) + largerNumberParts[0];
        }
        //Make decimal number part of both numbers have the same length by adding leading zeros
        if (largerNumberParts[1].length - smallerNumberParts[1].length > 0) {
            smallerNumberParts[1] = smallerNumberParts[1] + "0".repeat(largerNumberParts[1].length - smallerNumberParts[1].length);
        } else if (smallerNumberParts[1].length - largerNumberParts[1].length > 0) {
            largerNumberParts[1] = largerNumberParts[1] + "0".repeat(smallerNumberParts[1].length - largerNumberParts[1].length);
        }

        largerNumberString = largerNumberParts.join("");
        smallerNumberString = smallerNumberParts.join("");
        
        const resultDigits = this.subtractUnsignedInt(largerNumberString, smallerNumberString).split("");
        resultDigits.splice(resultDigits.length - largerNumberParts[1].length, 0, ".");
        return resultDigits.join("");
    }

    //Can only be used for signed(both positive and negative) decimal addition (no integers allowed)
    //Adds two decimals (given as strings) with unlimited precision
    static addDec(numberString1 = "-1.0", numberString2 = "-1.0") {
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
            return numberString1Sign + this.addUnsignedDec(numberString1, numberString2);
        } else if (numberString1 === numberString2) {
            return "0";
        } else {
            if (numberString1.length > numberString2.length) {
                return numberString1Sign + this.subtractUnsignedDec(numberString1, numberString2);
            } else if (numberString1.length < numberString2.length) {
                return numberString2Sign + this.subtractUnsignedDec(numberString2, numberString1);
            } else {
                for (let i = 0; i < numberString1.length; i++) {
                    if (numberString1[i] === numberString2[i]) {
                        continue;
                    } else if (numberString1[i] === ".") {
                        return numberString2Sign + this.subtractUnsignedDec(numberString2, numberString1);
                    } else if (numberString2[i] === ".") {
                        return numberString1Sign + this.subtractUnsignedDec(numberString1, numberString2);
                    } else if (parseInt(numberString1[i]) > parseInt(numberString2[i])) {
                        return numberString1Sign + this.subtractUnsignedDec(numberString1, numberString2);
                    }  else {
                        return numberString2Sign + this.subtractUnsignedDec(numberString2, numberString1);
                    }
                }
            }
        }
    }

    //Can only be used for unsigned(positive) integer multiplication
    //Multiplies a much higher int value (given as a string) with a relatively much lower int value (given as an integer) with relatively higher precision
    static multiplyUnsignedInt(numberString = "1", multiplier = 1) {
        const resultDigits = [];
        let carryValue = 0;

        for (let i = numberString.length - 1; i > -1; i--) {
            let temporalProduct = (parseInt(numberString[i]) * multiplier) + carryValue;
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

        return resultDigits.join("");
    }

    //Can only be used for signed(both positive and negative) integer multiplication
    //Multiplies a much higher int value (given as a string) with a relatively much lower int value (given as an integer) with relatively higher precision
    static multiplyInt(numberString = "-1", multiplier = -1) {
        let signString = "";
        if (!numberString.startsWith("-") !== !multiplier.toString().startsWith("-")) {
            signString = "-";
        }
        numberString = numberString.replace("-", "");
        multiplier = Math.abs(multiplier);

        return signString + this.multiplyUnsignedInt(numberString, multiplier);
    }

    //Can be used for unsigned(positive) integer and decimal multiplication
    //Multiplies a much higher dec value (given as a string) with a relatively much lower dec value (given as an integer) with relatively higher precision
    static multiplyUnsignedDec(numberString = "1.0", multiplier = 1.0) {
        let numberStringDecimals = numberString.split("").reverse().indexOf(".");
        let multiplierDecimals = multiplier.toString().split("").reverse().indexOf(".");
        let numberOfDecimals = 0;
        if (numberStringDecimals !== -1) {
            numberOfDecimals = numberOfDecimals + numberStringDecimals;
        }
        if (multiplierDecimals !== -1) {
            numberOfDecimals = numberOfDecimals + multiplierDecimals;
        }
        numberString = numberString.replace(".", "");
        multiplier = parseInt(multiplier.toString().replace(".", ""));

        if (numberOfDecimals > 0) {
            const resultDigits = this.multiplyUnsignedInt(numberString, multiplier).split("");
            resultDigits.splice(resultDigits.length - numberOfDecimals, 0, ".");
            return resultDigits.join("");
        } else {
            return this.multiplyUnsignedInt(numberString, multiplier);
        }
    }

    //Can be used for signed(both positive and negative) integer and decimal multiplication
    //Multiplies a much higher dec value (given as a string) with a relatively much lower dec value (given as an integer) with relatively higher precision
    static multiplyDec(numberString = "-1.0", multiplier = -1.0) {
        let signString = "";
        if (!numberString.startsWith("-") !== !multiplier.toString().startsWith("-")) {
            signString = "-";
        }
        numberString = numberString.replace("-", "");
        multiplier = Math.abs(multiplier);

        return signString + this.multiplyUnsignedDec(numberString, multiplier);
    }

    //Can only be used for unsigned(positive) integer multiplication
    //Multiplies two integers (given as strings) with much higher precision
    static multiplyUnsignedInt2(numberString1 = "1", numberString2 = "1") {
        const productRows = [];

        for (let j = numberString2.length - 1; j > -1; j--) {

            const temporalResultDigits = [];
            let carryValue = 0;

            for (let i = numberString1.length - 1; i > -1; i--) {
                let temporalProduct = (parseInt(numberString1[i]) * parseInt(numberString2[j])) + carryValue;
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

            productRows.push(temporalResultDigits.join("") + "0".repeat(numberString2.length - 1 - j));
        }

        let resultDigits = "0";
        for (let k = 0; k < productRows.length; k++) {
            resultDigits = this.addUnsignedInt(resultDigits, productRows[k]);
        }

        return resultDigits;
    }

    //Can only be used for signed(both positive and negative) integer multiplication
    //Multiplies two signed integers (given as strings) with much higher precision
    static multiplyInt2(numberString1 = "-1", numberString2 = "-1") {
        let signString = "";
        if (!numberString1.startsWith("-") !== !numberString2.startsWith("-")) {
            signString = "-";
        }
        numberString1 = numberString1.replace("-", "");
        numberString2 = numberString2.replace("-", "");

        return signString + this.multiplyUnsignedInt2(numberString1, numberString2);
    }

    //Can be used for unsigned(positive) integer and decimal multiplication
    //Multiplies two decimals (given as strings) with much higher precision
    static multiplyUnsignedDec2(numberString1 = "1.0", numberString2 = "1.0") {
        const numberString1Decimals = numberString1.split("").reverse().indexOf(".");
        const numberString2Decimals = numberString2.split("").reverse().indexOf(".");
        let numberOfDecimals = 0;
        if (numberString1Decimals !== -1) {
            numberOfDecimals = numberOfDecimals + numberString1Decimals;
        }
        if (numberString2Decimals !== -1) {
            numberOfDecimals = numberOfDecimals + numberString2Decimals;
        }
        numberString1 = numberString1.replace(".", "");
        numberString2 = numberString2.replace(".", "");

        if (numberOfDecimals > 0) {
            const resultDigits = this.multiplyUnsignedInt2(numberString1, numberString2).split("");
            resultDigits.splice(resultDigits.length - numberOfDecimals, 0, ".");
            return resultDigits.join("");
        } else {
            return this.multiplyUnsignedInt2(numberString1, numberString2);
        }
    }

    //Can be used for signed(both positive and negative) integer and decimal multiplication
    //Multiplies two signed decimals (given as strings) with much higher precision
    static multiplyDec2(numberString1 = "-1.0", numberString2 = "-1.0") {
        let signString = "";
        if (!numberString1.startsWith("-") !== !numberString2.startsWith("-")) {
            signString = "-";
        }
        numberString1 = numberString1.replace("-", "");
        numberString2 = numberString2.replace("-", "");

        return signString + this.multiplyUnsignedDec2(numberString1, numberString2);
    }

    //Can be used with signed(both positive and negative) integers and decimals (both number and power must be instances of Number)
    //Raises the number to the given power
    static pow(number, power) {
        let finalProduct = number.toString();
        for (let i = 1; i < power; i++) {
            finalProduct = StringMath.multiplyDec(finalProduct, number);
        }
        return finalProduct;
    }
}

class MatrixMath {
    //Can only be used with square multi arrays (type of elements must be numbers)
    //Calculates the determinant of a square matrix
    static getDeterminant(matrix = [[1]]) {
        let determinant = 0;
        //Check if there is only one element inside the matrix
        if (matrix.length === 1 && matrix[0].length === 1) {
            determinant = determinant + matrix[0][0];
        } else {
            //Else find the determinant using the first row
            let columnCount = matrix[0].length;
            for (let i = 0; i < columnCount; i++) {
                //Clone the matrix to make sure the matrix is not a reference
                let clonedMatrix = UtilityMath.cloneMultiArray(matrix);
                //Sign determinant according to the sign matrix
                if (i % 2 === 0) {
                    determinant = determinant + matrix[0][i] * this.getDeterminant(this.getSplicedMatrix(clonedMatrix, 0, i));
                }
                else {
                    determinant = determinant - matrix[0][i] * this.getDeterminant(this.getSplicedMatrix(clonedMatrix, 0, i));
                }
            }
        }
        return determinant;
    }

    //Can only be used with multi arrays (type of elements must be numbers)
    //Calculates the transpose of a matrix
    static getTransposeMatrix(matrix = [[1]]) {
        const transposeMatrix = [];
        const columnCount = matrix[0].length;
        const rowCount = matrix.length;
        for (let i = 0; i < columnCount; i++) {
            let transposeMatrixRow = [];
            for (let j = 0; j < rowCount; j++) {
                transposeMatrixRow.push(matrix[j][i]);
            }
            transposeMatrix.push(transposeMatrixRow);
        }
        return transposeMatrix;
    }

    //Can only be used with multi arrays (type of elements must be numbers)
    //Removes the specified row and column from a matrix
    static getSplicedMatrix(matrix = [[1]], rowIndexToRemove = 0, columnIndexToRemove = 0) {
        const splicedMatrix = UtilityMath.cloneMultiArray(matrix);
        //Remove rowToRemove
        splicedMatrix.splice(rowIndexToRemove, 1);
        //Remove column elements of columnToRemove recursively
        const rowCount = splicedMatrix.length;
        for (let i = 0; i < rowCount; i++) {
            splicedMatrix[i].splice(columnIndexToRemove, 1);
        }
        //Return splicedMatrix
        return splicedMatrix;
    }

    //Can only be used with multi arrays (type of elements must be numbers)
    //Multiplies each element of a matrix with corresponding element of the sign matrix
    static getSignedMatrix(matrix = [[1]]) {
        const signedMatrix = UtilityMath.cloneMultiArray(matrix);
        const rowCount = signedMatrix.length;
        const columnCount = signedMatrix[0].length;
        for (let i = 0; i < rowCount; i++) {
            for (let j = 0; j < columnCount; j++) {
                if ((i + j) % 2 !== 0) {
                    signedMatrix[i][j] = -1 * signedMatrix[i][j];
                }
            }
        }
        return signedMatrix;
    }

    //Can only be used with multi arrays (type of elements must be numbers)
    //Multiples the first matrix by the second matrix only where column count of the first matrix equals to the row count of the second matrix
    static multiplyByMatrix(matrix1 = [[1]], matrix2 = [[2]]) {
        const resultMatrix = [[]];
        const matrix1RowCount = matrix1.length;
        const matrix2ColumnCount = matrix2[0].length;
        const matrix1ColumnCount = matrix1[0].length;
        for (let i = 0; i < matrix1RowCount; i++) {
            resultMatrix[i] = [];
            for (let j = 0; j < matrix2ColumnCount; j++) {
                let dotProductSum = 0;
                for (let k = 0; k < matrix1ColumnCount; k++) {
                    dotProductSum = dotProductSum + (matrix1[i][k] * matrix2[k][j]);
                }
                resultMatrix[i][j] = dotProductSum;
            }
        }
        return resultMatrix;
    }

    //Can only be used with square multi arrays (type of elements must be numbers)
    //Multiplies each element of a matrix by the given scalar
    static multiplyByScalar(matrix = [[1]], scalar = 1) {
        const resultMatrix = [[]];
        const rowCount = matrix.length;
        const columnCount = matrix[0].length;
        for (let i = 0; i < rowCount; i++) {
            resultMatrix[i] = [];
            for (let j = 0; j < columnCount; j++) {
                resultMatrix[i][j] = matrix[i][j] * scalar;
            }
        }
        return resultMatrix;
    }

    //Can only be used with multi arrays (type of elements must be numbers)
    //Adds two matrices only where column and row count of first matrix equals to the column and row count of second matrix
    static add(matrix1 = [[1]], matrix2 = [[2]]) {
        const resultMatrix = [[]];
        const matrix1RowCount = matrix1.length;
        const matrix1ColumnCount = matrix1[0].length;
        for (let i = 0; i < matrix1RowCount; i++) {
            resultMatrix[i] = [];
            for (let j = 0; j < matrix1ColumnCount; j++) {
                resultMatrix[i][j] = matrix1[i][j] + matrix2[i][j];
            }
        }
        return resultMatrix;
    }

    //Can only be used with square multi arrays (type of elements must be numbers)
    //Replaces each element with determinant of the spliced matrix obtained after removing the relevant column and row
    static getMinorMatrix(matrix = [[1]]) {
        const minorMatrix = [[]];
        const rowCount = matrix.length;
        const columnCount = matrix[0].length;
        for (let i = 0; i < rowCount; i++) {
            minorMatrix[i] = [];
            for (let j = 0; j < columnCount; j++) {
                minorMatrix[i][j] = this.getDeterminant(this.getSplicedMatrix(matrix, i, j));
            }
        }
        return minorMatrix;
    }

    //Can only be used with square multi arrays (type of elements must be numbers)
    //Calculates cofactor matrix of the given matrix using the relevant minor and sign matrices
    static getCofactorMatrix(matrix = [[1]]) {
        return this.getSignedMatrix(this.getMinorMatrix(matrix));
    }

    //Can only be used with square multi arrays (type of elements must be numbers)
    //Calculates adjoint matrix of the given matrix using the relevant minor, sign and cofactor matrices
    static getAdjointMatrix(matrix = [[1]]) {
        return this.getTransposeMatrix(this.getCofactorMatrix(matrix));
    }

    //Can only be used with square multi arrays (type of elements must be numbers)
    //Calculates inverse matrix of the given matrix using the relevant minor, sign, cofactor and adjoint matrices where the determinant isn't zero
    static getInverseMatrix(matrix = [[1]]) {
        const determinant = this.getDeterminant(matrix);
        const inverseMatrix = this.getAdjointMatrix(matrix);
        const rowCount = matrix.length;
        const columnCount = matrix[0].length;
        for (let i = 0; i < rowCount; i++) {
            for (let j = 0; j < columnCount; j++) {
                inverseMatrix[i][j] = inverseMatrix[i][j] / determinant;
            }
        }
        return inverseMatrix;
    }
}

class ExpressionMath {
    //Simplifies the given equation to the default polynomial notation (ax + by + c = 0)
    static simplifyToLHSByAddition(equation) {
        //Remove all spaces
        equation = equation.replace(/\s/g, "");
        // equation = equation.replace(/[a-z]{1,})/g, "1" + "$1");
        //Split equation into two sides by "="
        const equationSides = equation.split("=");
        //Split left hand side into terms
        const equationLHSTerms = equationSides[0].match(/[+-]{0,1}[0-9]{1,}[a-z]{0,}/gi);
        //Split right hand side into terms
        const equationRHSTerms = equationSides[1].match(/[+-]{0,1}[0-9]{1,}[a-z]{0,}/gi);
        //Get all the right hand side terms into left hand side negating the sign
        for (let i = 0; i < equationRHSTerms.length; i++) {
            if (equationRHSTerms[i].startsWith("-")) {
                equationLHSTerms.push(equationRHSTerms[i].replace("-", "+"));
            } else if (equationRHSTerms[i].startsWith("+")) {
                equationLHSTerms.push(equationRHSTerms[i].replace("+", "-"));
            } else {
                equationLHSTerms.push("-" + equationRHSTerms[i]);
            }
        }
        //Sort out each multiplied term's character order ([+-][0-9][a-z])
        for (let i = 0; i < equationLHSTerms.length; i++) {
            let variablePart = equationLHSTerms[i].match(/[a-z]{1,}/gi);
            if (variablePart !== null) {
                equationLHSTerms[i] = equationLHSTerms[i].replace(variablePart[0], "");
                equationLHSTerms[i] = equationLHSTerms[i] + variablePart[0].split("").sort().join("");
            }
        }

        return equationLHSTerms;
    }

    //Parses and categorizes the equation into variables, coefficients, and the simplified constant
    static getCategorizedEquationData(equation) {
        const equationLHSTerms = this.simplifyToLHSByAddition(equation);
        const equationData = {};
        //Extract variables used in the equation (The equation must be recreated with the sorted terms)
        equationData.variables = Array.from(new Set(equationLHSTerms.join("").match(/[a-z]{1,}/gi))).sort();
        //Get simplified coefficient for each variable
        equationData.coefficients = [];
        for (let i = 0; i < equationData.variables.length; i++) {
            let simplifiedCoefficient = 0;
            for (let j = 0; j < equationLHSTerms.length; j++) {
                if (equationLHSTerms[j].includes(equationData.variables[i])) {
                    simplifiedCoefficient = simplifiedCoefficient + parseInt(equationLHSTerms.splice(j, 1)[0].replace(equationData.variables[i], ""));
                    j = -1;
                }
            }
            equationData.coefficients.push(simplifiedCoefficient);
        }
        //Get simplified constant
        equationData.simplifiedConstant = [0];
        for (let i = 0; i < equationLHSTerms.length; i++) {
            equationData.simplifiedConstant[0] = equationData.simplifiedConstant[0] + parseInt(equationLHSTerms[i]);
        }
        equationData.simplifiedConstant[0] = equationData.simplifiedConstant[0] * -1;
        return equationData;
    }

    //Returns the solution of object for a given equation 
    static getSolution(...equations) {
        const coefficientsMultiArray = [];
        const constantsMultiArray = [];
        const variablesMultiArray = [];

        for (let i = 0; i < equations.length; i++) {
            const equationData = this.getCategorizedEquationData(equations[i]);
            coefficientsMultiArray.push(equationData.coefficients);
            constantsMultiArray.push(equationData.simplifiedConstant);
            variablesMultiArray.push(equationData.variables);
        }

        let variables = [];
        for (let i = 0; i < variablesMultiArray.length; i++) {
            if (variablesMultiArray[i].length > variables.length) {
                variables = variablesMultiArray[i];
            }
        }

        for (let i = 0; i < equations.length; i++) {
            for (let j = 0; j < variables.length; j++) {
                if (coefficientsMultiArray[i][j] === undefined) {
                    coefficientsMultiArray[i][j] = 0;
                }
            }
        }

        const coefficientsMatrixInverted = new Matrix(coefficientsMultiArray).invert();
        const constantsMatrix = new Matrix(constantsMultiArray);

        const resultMatrix = coefficientsMatrixInverted.multiplyByMatrix(constantsMatrix);

        const solution = {};
        for (let i = 0; i < variables.length; i++) {
            solution[variables[i]] = resultMatrix.multiArray[i][0];
        }
        return solution;
    }
}

class BinaryMath {

}

class UtilityMath {
    static cloneMultiArray(multiArray = [[1]]) {
        //Declare and initialize an array to store clonedArray
        const clonedMultiArray = [[]];
        //Recursively clone every immutable elements inside the multiArray into clonedMultiArray
        for (let i = 0; i < multiArray.length; i++) {
            clonedMultiArray[i] = [];
            for (let j = 0; j < multiArray[i].length; j++) {
                clonedMultiArray[i][j] = multiArray[i][j];
            }
        }
        //return clonedMultiArray
        return clonedMultiArray;
    }

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
}


//CLASSES THAT MUST BE INSTANTIATED
class Matrix {
    constructor(multiArray = [[1]]) {
        this.multiArray = multiArray;
        this.rowCount = multiArray.length;
        this.columnCount = multiArray[0].length;
        this.order = `${this.rowCount}x${this.columnCount}`;
        if (this.rowCount === this.columnCount) {
            this.determinant = MatrixMath.getDeterminant(multiArray);
            if (this.determinant === 0) {
                this.isInvertible = false;
            } else {
                this.isInvertible = true;
            }
        }
    }

    //Transposes the current matrix
    transpose() {
        return new Matrix(MatrixMath.getTransposeMatrix(this.multiArray));
    }

    //Minorizes the current matrix
    minorize() {
        return new Matrix(MatrixMath.getMinorMatrix(this.multiArray));
    }

    //multiplies each element of the current matrix with relevant element of the sign matrix
    signify() {
        return new Matrix(MatrixMath.getSignedMatrix(this.multiArray));
    }

    //Inverts the current matrix
    invert() {
        if (this.isInvertible === true) {
            return new Matrix(MatrixMath.getInverseMatrix(this.multiArray));
        } else {
            throw new RangeError("Cannot invert a matrix with a determinant of 0");
        }
    }

    //Add the specified matrix to the current matrix
    addMatrix(matrixToAdd) {
        if (matrixToAdd instanceof Matrix) {
            if (matrixToAdd.rowCount === this.rowCount && matrixToAdd.columnCount === this.columnCount) {
                return new Matrix(MatrixMath.add(this.multiArray, matrixToAdd.multiArray));
            } else {
                throw new TypeError("A matrix of the same order is required as the parameter");
            }
        } else {
            throw new TypeError("An instance of Matrix is required as the parameter");
        }
    }

    //Multiplies current matrix with the specified scalar
    multiplyByScalar(scalar) {
        if (typeof scalar === "number") {
            return new Matrix(MatrixMath.multiplyByScalar(this.multiArray, scalar));
        } else {
            throw new TypeError("An number is required as the scaler");
        }
    }

    //Multiplies the current matrix with the specified matrix
    multiplyByMatrix(matrixToMultiply) {
        if (matrixToMultiply instanceof Matrix) {
            if (this.columnCount === matrixToMultiply.rowCount) {
                return new Matrix(MatrixMath.multiplyByMatrix(this.multiArray, matrixToMultiply.multiArray));
            } else {
                throw new TypeError(`Matrix of ${this.columnCount} columns cannot be multiplied by a matrix of ${matrixToMultiply.rowCount} rows`);
            }
        } else {
            throw new TypeError("An instance of Matrix is required as the parameter");
        }
    }
}

class BigNumber {
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
            throw new SyntaxError("Value string includes one or more invalid characters");
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

    //Using the multiplyByNumber method is more efficient if the operand is less than Number.MAX_SAFE_INTEGER / 9 (Infinite precision will be compromised) 
    //Multiplies the current value by the operand value
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

    //Operand must be an instance of Number
    //Using the multiply method is recommended the operand is greater than Number.MAX_SAFE_INTEGER / 9
    //Multiplies the current value by the operand value
    multiplyByNumber(operand) {
        if (typeof operand === "number") {
            if (this.type === "decimal" || operand.toString().includes(".")) {
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