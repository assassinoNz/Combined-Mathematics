//@ts-check
import { StringMath } from "./StringMath.mjs"

export class CustomMath {
    /** Returns all primes within a given range(inclusive)
     * @param {number} lowerBound Must be greater than or equal to 3
     * @param {number} upperBound
     * @return {number[]} All primes between lowerBound(inclusive) and upperBound(inclusive)
    */
    static getPrimesWithin(lowerBound, upperBound) {
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

    /** Returns all primes up to a given limit(inclusive)
     * @param {number} limit
     * @return {number[]} All primes starting from 2 up to the limit(inclusive)
    */
    static getPrimesUpTo(limit) {
        const oddNumbers = [];
        //Get all odd natural numbers starting from 3 (because only even prime is 2, and 1 is not a prime)
        for (let i = 3; i <= limit; i = i + 2) {
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

    /** Returns the name of an integer
     * @param {number} integer Must honor the range 0<=integer<=9999
     * @return {string} The name of the integer in US English pascal case
    */
    static getNumberName(integer) {
        if (integer.toString().length > 4) {
            return "Number out of range";
        }

        const digitNames = [
            ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
            ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
            ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
            ["", "OneHundred", "TwoHundred", "ThreeHundred", "FourHundred", "FiveHundred", "SixHundred", "SevenHundred", "EightHundred", "NineHundred"],
            ["", "OneThousand", "TwoThousand", "ThreeThousand", "FourThousand", "FiveThousand", "SixThousand", "SevenThousand", "EightThousand", "NineThousand"]
        ];

        let modifiedNumber = integer.toString();

        switch (modifiedNumber.length) {
            case 1:
                modifiedNumber = "000" + integer;
                break;
            case 2:
                modifiedNumber = "00" + integer;
                break;
            case 3:
                modifiedNumber = "0" + integer;
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

    /** Returns all the integer factors of an integer
     * @param {number} integer
     * @return {number[]} All the integer factors of the integer
    */
    static getIntFactors(integer) {
        const factors = [];
        let factorRange = Math.sqrt(integer);
        for (let i = 1; i <= factorRange; i++) {
            if (integer % i === 0) {
                factors.push(i);
                factors.push(integer / i);
            }
        }
        return factors;
    }

    //TODO: Fix Method
    /**
     * Returns all prime factors of a given number using a prebuilt primes library
     * @param {number} integer Must honor the range 0<=integer<=1999993 (which is the highest prime below 2*10^6)
     * @return {number[]} An array of all the prime factors of the number
     */
    static getPrimeFactorsWithLibrary(integer) {
        const primes = require("primes2M.json");

        let numerator = integer;
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
    }

    /**
     * Returns the prime factorization of an integer
     * @param {number} integer
     * @return {number[]} An array of all the prime factors involved in the prime factorization of the integer
     */
    static getPrimeFactorization(integer) {
        const primeFactors = [];
        while (integer % 2 === 0) {
            integer = integer / 2;
            primeFactors.push(2);
        }
        for (let i = 3; i <= Math.sqrt(integer); i = i + 2) {
            while (integer % i === 0) {
                integer = integer / i;
                primeFactors.push(i);
            }
        }
        if (integer > 2) {
            primeFactors.push(integer);
        }
        return primeFactors;
    }

    /**
     * Checks if an integer is a prime
     * @param {number} integer
     * @return {boolean}
     */
    static isPrime(integer) {
        if (integer <= 1) {
            return false;
        } else {
            for (let i = 2; i <= Math.sqrt(integer); i++) {
                if (integer % i == 0) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Returns the factorial of an integer
     * @param {number} integer
     * @return {number} The factorial value of the integer
     */
    static getFactorial(integer) {
        let factorialProduct = 1;
        for (let i = 2; i <= integer; i++) {
            factorialProduct = factorialProduct * i;
        }
        return factorialProduct;
    }

    /**
     * Returns unique permutations of a string
     * NOTE: This algorithm is much faster with strings which include duplicate characters
     * @param {string} string
     * @return {string[]} An array with all the permutations unique of the string
     */
    static getUniquePermutations(string) {
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

    /**
     * @deprecated
     * Returns unique permutations of a string
     * WARNING: Abysmal performance. Method exists only to demonstrate the algorithm
     * @param {string} string
     * @return {string[]} An array with all the permutations unique of the string
     */
    static getUniquePermutations2(string) {
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

    /**
     * Returns unique permutations of a string
     * NOTE: This algorithm is faster with strings which don't include duplicate characters
     * @param {string} string
     * @return {string[]} An array with all the permutations unique of the string
     */
    static getAllPermutations(string) {
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

    /**
     * Returns the minimum edit distance between two strings
     * NOTE: All the editing methods (insertion, deletion, substitution) have a distance of +1, unlike Levenshtein Distance where substitution has +2 distance
     * @param {string} string1 
     * @param {string} string2 
     */
    static getMinEditDistance(string1, string2) {
        //Convert all the strings into same case (in this case, lowercase)
        const columnString = string1.toLowerCase();
        const rowString = string2.toLowerCase();

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

    /**
     * Reverses the digit order of an integer using only mathematical operations
     * WARNING: No usage for real tasks. Method exists only to demonstrate the algorithm
     * @param {number} integer
     * @return {number} The other palindromic half of the integer
     */
    static reverseIntMathematically(integer) {
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

    /**
     * Returns the greatest common divisor of 2 integers
     * @param {number} integer1
     * @param {number} integer2
     * @return {number} The greatest common divisor of integer1 and integer2
     */
    static getGCD(integer1, integer2) {
        if (integer2 === 0) {
            return integer1;
        } else {
            return CustomMath.getGCD(integer2, integer1 % integer2);
        }
    }

    /**
     * Checks if an integer has no square factors other than 1
     * @param {number} integer
     * @return {boolean}
     */
    static isSquareFree(integer) {
        const intPrimeFactorization = CustomMath.getPrimeFactorization(integer);
        const uniquePrimeFactors = new Set(intPrimeFactorization);
        return intPrimeFactorization.length === uniquePrimeFactors.size;
    }
}