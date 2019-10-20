//@ts-check
class CustomMath {
    //Returns all primes between lowerBound(inclusive) and upperBound(inclusive)
    //Minimum possible lowerBound is 3 (therefore prime number 2 is excluded from results)
    static getPrimesBetween(lowerBound = 1001, upperBound = 9999) {
        //Make the lowerBound an odd number if it is even
        if (lowerBound % 2 === 0) {
            lowerBound++;
        }

        const primes = [];
        for (let i = lowerBound; i <= upperBound; i = i + 2) {
            let isPrime = true;
            let factorRange = Math.ceil(Math.sqrt(i));
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

    //Calculates all primes using the sieve of Eratosthenes up to the specified range(inclusive)
    static getPrimesUpto(range = 30) {
        const oddNumbers = [];
        //Get all odd natural numbers starting from 3 (because only even prime is 2, and 1 is not a prime)
        for (let i = 3; i <= range; i = i + 2) {
            oddNumbers.push(i);
        }
        const primes = [2];
        while (oddNumbers.length > 0) {
            let nextPrime = oddNumbers.shift();
            primes.push(nextPrime);

            for (let j = 0; j < oddNumbers.length; j++) {
                if (oddNumbers[j] % nextPrime === 0) {
                    oddNumbers.splice(j, 1);
                }
            }
        }
        return primes;
    }

    //Returns the name of the given number in Pascal Case English(US)
    //Works with numbers only up to 9999
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
    //Can only be used with numbers below 1999993 (which is the highest prime below 2*10^6)
    static getPrimeFactorsWithLibrary(number = 10) {
        fetch("Primes2M.json").then(function (response) {
            return response.json();
        }).then(function (primes) {
            let numerator = number;
            const primeFactors = [];
            for (let i = 0; i < primes.length;) {
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

    static getPrimeFactors(number = 10) {
        const primeFactors = new Set();
        while (number % 2 === 0) {
            number = number / 2;
            primeFactors.add(2);
        }
        for (let i = 3; i <= Math.sqrt(number); i = i + 2) {
            while(number % i === 0) {
                number = number / i;
                primeFactors.add(i);
            }
        }
        if (number > 2) {
            primeFactors.add(number);
        }
        return Array.from(primeFactors);
    }

    //Returns the collatz sequence for the specified number
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

    //Returns the fibonacci sequence with the specified number of terms
    //Returned fibonacci sequence is an array of strings representing numbers (this is to preserve precision of large numbers)
    static getFibonacciSequence(numberOfTerms = 12) {
        //Fibonacci sequence
        //1 1 2 3 5 8 13 21 34 55 89 144 ...
        //Fibonacci sequence formula
        //T(n)=4T(n-3)+T(n-6)
        const fibonacciSequence = ["1", "1", "2", "3", "5", "8"];
        for (let i = 6; i < numberOfTerms; i++) {
            fibonacciSequence[i] = StringMath.multiplyUnsignedInt(fibonacciSequence[i - 3], 4);
            fibonacciSequence[i] = StringMath.addUnsignedInt(fibonacciSequence[i], fibonacciSequence[i - 6]);
        }
        return fibonacciSequence;
    }

    //Returns unique permuted strings from the specified string (duplicates are filtered)
    //NOTE: This algorithm is much faster with strings which include duplicate characters
    static getUniquePermutations(string = "ABC") {
        let previousLevelPermutations = [string];
        //"i" is the iterator for the levels (i = currentPermutationLevel)
        //"i" starts with 1. Because the 0th permutation level is the string itself
        for (let i = 1; i < string.length; i++) {
            //Declare a set to store current level permutations
            //NOTE: Sets don't allow duplicate values
            const currentLevelPermutations = new Set();
            //primaryCharacterIndex of currentPermutationLevel = previousPermutationLevel
            const primaryCharIndex = i - 1;
            //"j" is the iterator for permutations inside previous level (j = previousLevelPermutationIndex)
            //NOTE: Permutations array's 0th index will always be the previousPermutationLevel
            //We derive currentLevelPermutations by swapping letters in each permutation of the previous level permutations
            for (let j = 0; j < previousLevelPermutations.length; j++) {
                //secondaryCharacterIndex starts equal to primaryCharacterIndex
                //Because all the characters before primaryCharacterIndex is fixed and doesn't need swapping
                for (let secondaryCharIndex = primaryCharIndex; secondaryCharIndex < previousLevelPermutations[j].length; secondaryCharIndex++) {
                    const previousLevelPermutationChars = previousLevelPermutations[j].split("");
                    //Get the primary character to be swapped
                    const primaryChar = previousLevelPermutationChars[primaryCharIndex];
                    //Get the secondary character to be swapped
                    const secondaryChar = previousLevelPermutationChars[secondaryCharIndex];
                    //Replace primaryCharacter with secondaryCharacter
                    previousLevelPermutationChars[primaryCharIndex] = secondaryChar;
                    //Replace secondaryCharacter with primaryCharacter
                    previousLevelPermutationChars[secondaryCharIndex] = primaryChar;
                    //Now we have generated another permutation
                    //Since currentLevelPermutations set takes care of the duplication checking, we just have to add the generated permutation to currentLevelPermutations
                    currentLevelPermutations.add(previousLevelPermutationChars.join(""));
                }
            }
            //At the end of the current iteration currentLevelPermutations should become previousLevelPermutations for the next iteration
            previousLevelPermutations = Array.from(currentLevelPermutations);
        }
        //At last previousLevelPermutations represents all the possible permutations for the given string
        return previousLevelPermutations;
    }

    //Returns all permuted strings from the specified string (duplicates aren't filtered)
    //NOTE: This algorithm is faster with strings which don't include duplicate characters
    static getAllPermutations(string = "ABC") {
        let previousLevelPermutations = [string];
        //"i" is the iterator for the levels (i = currentPermutationLevel)
        //"i" starts with 1. Because the 0th permutation level is the string itself
        for (let i = 1; i < string.length; i++) {
            //Declare an array to store current level permutations
            const currentLevelPermutations = [];
            //primaryCharacterIndex of currentPermutationLevel = previousPermutationLevel
            const primaryCharacterIndex = i - 1;
            //"j" is the iterator for permutations inside previous level (j = previousLevelPermutationIndex)
            //NOTE: Permutations array's 0th index will always be the previousPermutationLevel
            //We derive currentLevelPermutations by swapping letters in each permutation of the previous level permutations
            for (let j = 0; j < previousLevelPermutations.length; j++) {
                //secondaryCharacterIndex starts equal to primaryCharacterIndex
                //Because all the characters before primaryCharacterIndex is fixed and doesn't need swapping
                for (let secondaryCharIndex = primaryCharacterIndex; secondaryCharIndex < previousLevelPermutations[j].length; secondaryCharIndex++) {
                    const previousLevelPermutationChars = previousLevelPermutations[j].split("");
                    //Get the primary character to be swapped
                    const primaryChar = previousLevelPermutationChars[primaryCharacterIndex];
                    //Get the secondary character to be swapped
                    const secondaryChar = previousLevelPermutationChars[secondaryCharIndex];
                    //Replace primaryCharacter with secondaryCharacter
                    previousLevelPermutationChars[primaryCharacterIndex] = secondaryChar;
                    //Replace secondaryCharacter with primaryCharacter
                    previousLevelPermutationChars[secondaryCharIndex] = primaryChar;
                    //Now we have generated another permutation
                    //Just add the new permutations (checking for duplicates is skipped)
                    currentLevelPermutations.push(previousLevelPermutationChars.join(""));
                }
            }
            //At the end of the current iteration currentLevelPermutations should become previousLevelPermutations for the next iteration
            previousLevelPermutations = currentLevelPermutations;
        }
        //At last previousLevelPermutations represents all the possible permutations for the given string
        return previousLevelPermutations;
    }

    //WARNING: ABYSMAL PERFORMANCE. METHOD EXISTS ONLY TO DEMONSTRATE THE ALGORITHM
    //Returns all unique permuted strings from the specified string
    static getUniquePermutations2(string = "ABC") {
        const permutations = [];

        function getPermutationsRecursively(string, possibleChars) {
            if (possibleChars.length === 1) {
                const permutation = string + possibleChars.shift();
                if (!permutations.includes(permutation)) {
                    permutations.push(permutation);
                }
            } else {
                for (let i = 0; i < possibleChars.length; i++) {
                    const clonedPossibleChars = possibleChars.slice(0);
                    const appendedString = string + clonedPossibleChars.splice(i, 1)[0];
                    getPermutationsRecursively(appendedString, clonedPossibleChars);
                }
            }
        }

        getPermutationsRecursively("", string.split(""));
        return permutations;
    }

    //Calculates the minimum edit distance between two strings (between columnString & rowString)
    //NOTE: All the editing methods (insertion, deletion, substitution) have a distance of +1, unlike Levenshtein Distance where substitution has +2 distance
    static calculateMinEditDistance(columnString = "", rowString = "") {
        //Convert all the strings into same case (in this case, lowercase)
        columnString = columnString.toLowerCase();
        rowString = rowString.toLowerCase();

        //Generate Dynamic Programming table
        const dpTable = [];
        for (let i = 0; i < rowString.length + 1; i++) {
            dpTable.push(new Array(columnString.length + 1));
        }

        //Fill-up edit distances compared with the "" (empty string)
        //Fill the first column (represents number of insertions)
        for (let i = 0; i < dpTable.length; i++) {
            dpTable[i][0] = i;
        }
        //Fill the first row (represents number of deletions)
        for (let i = 0; i < dpTable[0].length; i++) {
            dpTable[0][i] = i;
        }

        for (let i = 1; i <= columnString.length; i++) {
            for (let j = 1; j <= rowString.length; j++) {
                //Check if the last characters of both the column and row substrings matches
                //columnString[i-1] = last character of the column substring for the current iteration
                //rowString[j-1] = last character of the row substring for the current iteration
                if (columnString[i - 1] === rowString[j - 1]) {
                    //If matches, no edits are required. New min edit distance = previous min edit distance
                    dpTable[j][i] = dpTable[j - 1][i - 1];
                } else {
                    //If doesn't match, one or more edits are required. New min edit distance = (previous min edit distance) + (required number of edits)
                    //Required number of edits is always +1.
                    //Therefore, New min edit distance = (previous min edit distance) + 1
                    dpTable[j][i] = Math.min(dpTable[j - 1][i - 1], dpTable[j][i - 1], dpTable[j - 1][i]) + 1;
                }
            }
        }

        //Minimum edit distance is the lower right value of the dpTable
        return dpTable[rowString.length][columnString.length];
    }

    //Reverses the digit order of an integer using only mathematical operations
    static reverseIntMathematically(integer = 123) {
        //NOTE: Explanation considers the integer 123
        //positionalIntegers is for storing [300, 20, 1];
        const positionalIntegers = [];
        const integerLength = integer.toString().length;
        //nextInteger is for storing 123, 12, 1
        let nextInteger = integer;
        for (let i = 0; i < integerLength; i++) {
            //lastDroppedDigit is for calculating 123, 12, 1
            const lastDigitDroppedInt = Math.floor(nextInteger / 10);
            //positionedPositionalInt is for calculating 300, 20, 1 from 3, 2, 1
            const positionedPositionalInt = (nextInteger - (lastDigitDroppedInt * 10)) * Math.pow(10, integerLength - i - 1);
            positionalIntegers.push(positionedPositionalInt);
            nextInteger = lastDigitDroppedInt;
        }

        let sum = 0;
        for (let i = 0; i < positionalIntegers.length; i++) {
            sum = sum + positionalIntegers[i];
        }

        return sum;
    }

    // WARNING: NOT IMPLEMENTED
    static solveSudokuPuzzle(sudokuMultiArray) {

    }
}

class StringMath {
    //Adds two integers (given as strings) with unlimited precision
    //Can only be used for unsigned(positive) integer addition
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

    //Subtracts the first integer (given as a string) from the second integer (given as a string) with unlimited precision
    //Can only be used for unsigned(positive) integer subtraction (subtraction refers to the operation and not the number's sign)
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

    //Adds two integers (given as strings) with unlimited precision
    //Can only be used for signed(both positive and negative) integer addition
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

    //Adds two decimals (given as strings) with unlimited precision
    //Can only be used for unsigned(positive) decimal addition (no integers allowed)
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

    //Subtracts the first decimal (given as a string) from the second decimal (given as a string) with unlimited precision
    //Can only be used for unsigned(positive) decimal subtraction (no integers allowed, subtraction refers to the operation and not the number's sign)
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

    //Adds two decimals (given as strings) with unlimited precision
    //Can only be used for signed(both positive and negative) decimal addition (no integers allowed)
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
                    } else {
                        return numberString2Sign + this.subtractUnsignedDec(numberString2, numberString1);
                    }
                }
            }
        }
    }

    //Multiplies a much higher int value (given as a string) with a relatively much lower int value (given as an integer) with relatively higher precision
    //Can only be used for unsigned(positive) integer multiplication
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

    //Multiplies a much higher int value (given as a string) with a relatively much lower int value (given as an integer) with relatively higher precision
    //Can only be used for signed(both positive and negative) integer multiplication
    static multiplyInt(numberString = "-1", multiplier = -1) {
        let signString = "";
        if (!numberString.startsWith("-") !== !multiplier.toString().startsWith("-")) {
            signString = "-";
        }
        numberString = numberString.replace("-", "");
        multiplier = Math.abs(multiplier);

        return signString + this.multiplyUnsignedInt(numberString, multiplier);
    }

    //Multiplies a much higher dec value (given as a string) with a relatively much lower dec value (given as an integer) with relatively higher precision
    //Can be used for unsigned(positive) integer and decimal multiplication
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

    //Multiplies a much higher dec value (given as a string) with a relatively much lower dec value (given as an integer) with relatively higher precision
    //Can be used for signed(both positive and negative) integer and decimal multiplication
    static multiplyDec(numberString = "-1.0", multiplier = -1.0) {
        let signString = "";
        if (!numberString.startsWith("-") !== !multiplier.toString().startsWith("-")) {
            signString = "-";
        }
        numberString = numberString.replace("-", "");
        multiplier = Math.abs(multiplier);

        return signString + this.multiplyUnsignedDec(numberString, multiplier);
    }

    //Multiplies two integers (given as strings) with much higher precision
    //Can only be used for unsigned(positive) integer multiplication
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

    //Multiplies two signed integers (given as strings) with much higher precision
    //Can only be used for signed(both positive and negative) integer multiplication
    static multiplyInt2(numberString1 = "-1", numberString2 = "-1") {
        let signString = "";
        if (!numberString1.startsWith("-") !== !numberString2.startsWith("-")) {
            signString = "-";
        }
        numberString1 = numberString1.replace("-", "");
        numberString2 = numberString2.replace("-", "");

        return signString + this.multiplyUnsignedInt2(numberString1, numberString2);
    }

    //Multiplies two decimals (given as strings) with much higher precision
    //Can be used for unsigned(positive) integer and decimal multiplication
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

    //Multiplies two signed decimals (given as strings) with much higher precision
    //Can be used for signed(both positive and negative) integer and decimal multiplication
    static multiplyDec2(numberString1 = "-1.0", numberString2 = "-1.0") {
        let signString = "";
        if (!numberString1.startsWith("-") !== !numberString2.startsWith("-")) {
            signString = "-";
        }
        numberString1 = numberString1.replace("-", "");
        numberString2 = numberString2.replace("-", "");

        return signString + this.multiplyUnsignedDec2(numberString1, numberString2);
    }

    //Raises the number to the given power
    //Can be used with signed(both positive and negative) integers and decimals (both number and power must be instances of Number)
    static pow(number, power) {
        let finalProduct = number.toString();
        for (let i = 1; i < power; i++) {
            finalProduct = StringMath.multiplyDec(finalProduct, number);
        }
        return finalProduct;
    }
}

class MatrixMath {
    //Calculates the determinant of a square matrix
    //Can only be used with square multi arrays (type of elements must be numbers)
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

    //Calculates the transpose of a matrix
    //Can only be used with multi arrays (type of elements must be numbers)
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

    //Removes the specified row and column from a matrix
    //Can only be used with multi arrays (type of elements must be numbers)
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

    //Multiplies each element of a matrix with corresponding element of the sign matrix
    //Can only be used with multi arrays (type of elements must be numbers)
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

    //Multiplies the first matrix by the second matrix only where column count of the first matrix equals to the row count of the second matrix
    //Can only be used with multi arrays (type of elements must be numbers)
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

    //Multiplies each element of a matrix by the given scalar
    //Can only be used with square multi arrays (type of elements must be numbers)
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

    //Adds two matrices only where column and row count of first matrix equals to the column and row count of second matrix
    //Can only be used with multi arrays (type of elements must be numbers)
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

    //Replaces each element with determinant of the spliced matrix obtained after removing the relevant column and row
    //Can only be used with square multi arrays (type of elements must be numbers)
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

    //Calculates cofactor matrix of the given matrix using the relevant minor and sign matrices
    //Can only be used with square multi arrays (type of elements must be numbers)
    static getCofactorMatrix(matrix = [[1]]) {
        return this.getSignedMatrix(this.getMinorMatrix(matrix));
    }

    //Calculates adjoint matrix of the given matrix using the relevant minor, sign and cofactor matrices
    //Can only be used with square multi arrays (type of elements must be numbers)
    static getAdjointMatrix(matrix = [[1]]) {
        return this.getTransposeMatrix(this.getCofactorMatrix(matrix));
    }

    //Calculates inverse matrix of the given matrix using the relevant minor, sign, cofactor and adjoint matrices where the determinant isn't zero
    //Can only be used with square multi arrays (type of elements must be numbers)
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

    //NOTE: NOT IMPLEMENTED
    static getRowEcholenMatrix(matrix = [[1]]) {
        matrix = UtilityMath.cloneMultiArray(matrix);
        //In here i acts as the row selector as well as column selector
        for (let i = 0; i < matrix.length - 1; i++) {
            for (let j = i + 1; j < matrix.length; j++) {
                // for (let k = i; k < matrix[0].length; k++) {
                //     matrix[j][k] = matrix[j][k] - ((matrix[i][k] / matrix[i][i]) * matrix[j][i]);
                // }
                for (let k = matrix[0].length - 1; k >= i; k--) {
                    console.log(`R${j + 1}[${k + 1}] = ${matrix[j][k]} - ((${matrix[i][k]} / ${matrix[i][i]}) * ${matrix[j][i]})`);
                    matrix[j][k] = matrix[j][k] - ((matrix[i][k] / matrix[i][i]) * matrix[j][i]);
                }
            }
            console.log("matrix");
            // return;
        }
        return matrix;
    }
}

class ExpressionMath {
    //Simplifies the given equation to the default polynomial notation (ax + by + c = 0) and returns all terms isolated
    //All the variables must have their coefficient explicitly given (x - y = 3 isn't valid. It must be 1x - 1y = 3)
    //NOTE: Variables abc, acb, cab in the same set of equations are considered equivalent
    //NOTE: Variables abc, ab, a, b in the same set of equations are considered distinct
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

    //Returns the solution of object for a given set of equations (number of equations must match with the number of variables)
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
    //Returns a string of an integer converted to its binary form
    //Can only be used with unsigned(positive) base-10 integers below Number.MAX_SAFE_INTEGER
    static convertUnsignedIntToBin(number = 1) {
        if (number === 0) {
            return "0";
        } else {
            let binaryIntString = "";
            let numerator = number;
            while (numerator > 1) {
                binaryIntString = (numerator % 2).toString() + binaryIntString;
                numerator = Math.floor(numerator / 2);
            }
            binaryIntString = "1" + binaryIntString;
            return binaryIntString;
        }
    }

    //Returns a string of a fraction converted to its binary form
    //Can only be used with unsigned(positive) base-10 fractions(whole number part of the fraction should be 0)
    static convertUnsignedFractionToBin(number = 0.1) {
        if (number === 0.0) {
            return "0.0";
        } else {
            let binaryFractionalString = "";
            let numerator = number;
            while (numerator > 0) {
                const doubledNumerator = numerator * 2;
                const wholeNumberPart = Math.floor(doubledNumerator);
                binaryFractionalString = binaryFractionalString + wholeNumberPart;
                numerator = doubledNumerator - wholeNumberPart;
            }
            return "0." + binaryFractionalString;
        }
    }

    //Returns a string of a decimal converted to its binary form (binary form will always have a fractional part)
    //Can only be used with unsigned(positive) base-10 integers and decimals(decimals cannot be integers)
    static convertUnsignedDecToBin(number = 1.1) {
        const wholeNumberPart = Math.floor(number);
        const fractionalPart = number - wholeNumberPart;

        return this.convertUnsignedIntToBin(wholeNumberPart) + this.convertUnsignedFractionToBin(fractionalPart).slice(1);
    }

    //Returns sign bit, bias exponent(decimal), mantissa(binary), entered number(binary)
    //Any of the binary strings aren't trimmed or rounded
    static getIEEERawParts(number = 1.2) {
        if (number === 0) {
            //0 can be represented as follows
            //Sing bit: 0 or 1
            //Biased Exponent: all 0
            //Mantissa: all 0
            return ["0", "0".repeat(11), "0".repeat(52), "0"];
        } else if (number === Infinity) {
            //+Infinity can be represented as follows
            //Sing bit: 0
            //Biased Exponent: all 1
            //Mantissa: all 0
            return ["0", "1".repeat(11), "0".repeat(52), "Positive Infinity"];
        } else if (number === -Infinity) {
            //-Infinity can be represented as follows
            //Sing bit: 1
            //Biased Exponent: all 1
            //Mantissa: all 0
            return ["1", "1".repeat(11), "0".repeat(52), "Negative Infinity"];
        } else if (isNaN(number)) {
            //NaN can be represented as follows
            //Sing bit: 0 or 1
            //Biased Exponent: all 1
            //Mantissa: any binary pattern except all 0
            return ["1", "1".repeat(11), "1".repeat(52), "Not A Number"];
        } else {
            let signBit = "0";
            //Determine signBit
            const absoluteValue = Math.abs(number);
            if (absoluteValue !== number) {
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

    //Converts any unsigned(positive) number to binary32 format
    static convertDecToBinary32(number = 1.2) {
        const rawParts = this.getIEEERawParts(number);

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

    //Converts any unsigned(positive) number to binary64 format
    static convertDecToBinary64(number = 1.2) {
        const rawParts = this.getIEEERawParts(number);

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

class CryptoMath {
    static async getRSALock() {
        const primes = await fetch("Primes2M.json").then(function (response) {
            return response.json();
        });
        //Get a random prime from the library and calculate its digit cont
        const randomPrime1Index = Math.floor(Math.random() * primes.length + 1);
        const prime1Length = primes[randomPrime1Index].toString().length;
        //Get another random prime from the library and calculate its digit cont
        let randomPrime2Index;
        let prime2Length;
        //Iterate through random primes until prime1Length === prime2Length
        while (!(prime1Length === prime2Length)) {
            randomPrime2Index = Math.floor(Math.random() * primes.length + 1);
            //If randomPrime2 === randomPrime1 continue iteration (Because we don't want the same prime again)
            if (randomPrime2Index === randomPrime1Index) {
                continue;
            } else {
                prime2Length = primes[randomPrime2Index].toString().length;
            }
        }
        //Calculate n and phiOfn
        const n = primes[randomPrime1Index] * primes[randomPrime2Index];
        const phiOfn = (primes[randomPrime1Index] - 1) * (primes[randomPrime2Index] - 1);
        //Choose an encryption key
        //Encryption key must be an odd
        //Encryption key must not be a factor of phiOfn
        let encryptionKey = 3;
        while (phiOfn % encryptionKey === 0) {
            encryptionKey = encryptionKey + 2;
        }
        //Calculate decryption key
        const decryptionKey = (phiOfn + 1) / encryptionKey;
        return {prime1: primes[randomPrime1Index], prime2: primes[randomPrime2Index], n: n, phiOfn: phiOfn, encryptionKey: encryptionKey, decryptionKey: decryptionKey};
    }
}

class UtilityMath {
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
}

//CLASSES THAT MUST BE INSTANTIATED
class Matrix {
    constructor(multiArray = [[1]]) {
        this.multiArray = multiArray;
        this.rowCount = multiArray.length;
        this.columnCount = multiArray[0].length;
        this.order = `${this.rowCount}x${this.columnCount}`;
        this.isInvertible = false;
        this.determinant = null;
        if (this.rowCount === this.columnCount) {
            this.determinant = MatrixMath.getDeterminant(multiArray);
            if (this.determinant !== 0) {
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

    //Multiplies each element of the current matrix with relevant element of the sign matrix
    signify() {
        return new Matrix(MatrixMath.getSignedMatrix(this.multiArray));
    }

    //Inverts the current matrix
    invert() {
        if (this.isInvertible === true) {
            return new Matrix(MatrixMath.getInverseMatrix(this.multiArray));
        } else if (this.rowCount !== this.columnCount) {
            throw new TypeError("Matrix inversion is not defined for a non-square matrix");
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
            throw new TypeError("An instance of Number is required as the scaler");
        }
    }

    //Multiplies the current matrix with the specified matrix
    multiplyByMatrix(matrixToMultiply) {
        if (matrixToMultiply instanceof Matrix) {
            if (this.columnCount === matrixToMultiply.rowCount) {
                return new Matrix(MatrixMath.multiplyByMatrix(this.multiArray, matrixToMultiply.multiArray));
            } else {
                throw new TypeError(`A matrix of ${this.columnCount} columns cannot be multiplied by a matrix of ${matrixToMultiply.rowCount} rows`);
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
