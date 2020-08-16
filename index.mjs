//@ts-check
import { BasicMath } from "./src/BasicMath.mjs";
import { PrimeMath } from "./src/PrimeMath.mjs";
import { SequenceMath } from "./src/SequenceMath.mjs";
import { CustomMath } from "./src/CustomMath.mjs";
import { ExpressionMath } from "./src/ExpressionMath.mjs";

const module = process.argv[2];
const method = process.argv[3];

let output = "No operation found that matches your arguments";

switch (module) {
    case "get": {
        switch (method) {
            case "factors": {
                //Parse all arguments to integers
                process.argv[4] = Math.abs(parseInt(process.argv[4]));

                if (isNaN(process.argv[4])) {
                    output = `TypeError: Cannot parse argument "${process.argv[4]}" as Integer`;
                } else {
                    output = BasicMath.getIntFactors(process.argv[4]);
                }

                break;
            }

            case "commonFactors": {
                //Parse all arguments to integers
                process.argv[4] = Math.abs(parseInt(process.argv[4]));
                process.argv[5] = Math.abs(parseInt(process.argv[5]));

                if (isNaN(process.argv[4])) {
                    output = `TypeError: Cannot parse argument "${process.argv[4]}" as Integer`;
                } if (isNaN(process.argv[5])) {
                    output = `TypeError: Cannot parse argument "${process.argv[5]}" as Integer`;
                } else {
                    output = BasicMath.getCommonIntFactors(process.argv[4], process.argv[5]);
                }

                break;
            }

            case "factorial": {
                //Parse all arguments to integers
                process.argv[4] = Math.abs(parseInt(process.argv[4]));

                if (isNaN(process.argv[4])) {
                    output = `TypeError: Cannot parse argument "${process.argv[4]}" as Integer`;
                } else {
                    output = BasicMath.getFactorial(process.argv[4]);
                }

                break;
            }

            case "gcd": {
                //Parse all arguments to integers
                process.argv[4] = Math.abs(parseInt(process.argv[4]));
                process.argv[5] = Math.abs(parseInt(process.argv[5]));

                if (isNaN(process.argv[4])) {
                    output = `TypeError: Cannot parse argument "${process.argv[4]}" as Integer`;
                } if (isNaN(process.argv[5])) {
                    output = `TypeError: Cannot parse argument "${process.argv[5]}" as Integer`;
                } else {
                    output = BasicMath.getGCD(process.argv[4], process.argv[5]);
                }

                break;
            }

            case "primes": {
                if (process.argv[4] && process.argv[5]) {
                    //CASE: Two limits are specified
                    //Assume that it is for getPrimesWithin()

                    //Parse all arguments to integers
                    process.argv[4] = Math.abs(parseInt(process.argv[4]));
                    process.argv[5] = Math.abs(parseInt(process.argv[5]));

                    if (isNaN(process.argv[4])) {
                        output = `TypeError: Cannot parse argument "${process.argv[4]}" as Integer`;
                    } else if (isNaN(process.argv[5])) {
                        output = `TypeError: Cannot parse argument "${process.argv[5]}" as Integer`;
                    } else if (process.argv[4] < 3) {
                        output = `RangeError: First argument "${process.argv[4]}" should be greater than or equal to 3`;
                    } else {
                        output = PrimeMath.getPrimesWithin(process.argv[4], process.argv[5]);
                    }
                } else {
                    //CASE: Only one limit is specified
                    //Assume that it is for getPrimesUpTo()

                    //Parse all arguments to integers
                    process.argv[4] = Math.abs(parseInt(process.argv[4]));

                    if (isNaN(process.argv[4])) {
                        output = `TypeError: Cannot parse argument "${process.argv[4]}" as Integer`;
                    } else {
                        output = PrimeMath.getPrimesUpTo(process.argv[4]);
                    }
                }

                break;
            }

            case "collatz": {
                //Parse all arguments to integers
                process.argv[4] = Math.abs(parseInt(process.argv[4]));

                if (isNaN(process.argv[4])) {
                    output = `TypeError: Cannot parse argument "${process.argv[4]}" as Integer`;
                } else {
                    output = SequenceMath.getCollatzSequence(process.argv[4]);
                }

                break;
            }

            case "fibonacci": {
                //Parse all arguments to integers
                process.argv[4] = Math.abs(parseInt(process.argv[4]));

                if (isNaN(process.argv[4])) {
                    output = `TypeError: Cannot parse argument "${process.argv[4]}" as Integer`;
                } else {
                    output = SequenceMath.getFibonacciSequence(process.argv[4]);
                }

                break;
            }

            case "name": {
                //Parse all arguments to integers
                process.argv[4] = parseInt(process.argv[4]);

                if (isNaN(process.argv[4])) {
                    output = `TypeError: Cannot parse argument "${process.argv[4]}" as Integer`;
                } else if (process.argv[4] < 0 || process.argv[4] > 9999) {
                    output = `RangeError: Argument "${process.argv[4]}" should be between 0 and 9999 (inclusive)`;
                } else {
                    output = CustomMath.getNumberName(process.argv[4]);
                }

                break;
            }

            case "min-edit": {
                if (process.argv[4] && process.argv[5]) {
                    output = CustomMath.getMinEditDistance(process.argv[4], process.argv[5]);
                } else if (process.argv[4]) {
                    output = `InvalidArgumentsError: Argument "${process.argv[5]}" isn't valid`;
                } else if (process.argv[5]) {
                    output = `InvalidArgumentsError: Argument "${process.argv[4]}" isn't valid`;
                } else {
                    output = `InvalidArgumentsError: Arguments "${process.argv[4]}" and "${process.argv[5]}" isn't valid`;
                }

                break;
            }

            case "postfix": {
                if (process.argv[4]) {
                    output = ExpressionMath.toPostfix(process.argv[4]);
                } else {
                    output = `InvalidArgumentsError: Argument "${process.argv[4]}" isn't valid`;
                }

                break;
            }
        }

        break;
    }

    case "do": {
        switch (method) {
            case "factorize": {
                //Parse all arguments to integers
                process.argv[4] = Math.abs(parseInt(process.argv[4]));

                if (isNaN(process.argv[4])) {
                    output = `TypeError: Cannot parse argument "${process.argv[4]}" as Integer`;
                } else {
                    output = PrimeMath.getPrimeFactorization(process.argv[4]);
                }

                break;
            }

            case "permute": {
                if (process.argv[4]) {
                    output = CustomMath.getAllPermutations(process.argv[4]);
                } else {
                    output = `InvalidArgumentsError: Argument "${process.argv[4]}" isn't valid`;
                }

                break;
            }

            case "permute-unique": {
                if (process.argv[4]) {
                    output = CustomMath.getUniquePermutations(process.argv[4]);
                } else {
                    output = `InvalidArgumentsError: Argument "${process.argv[4]}" isn't valid`;
                }

                break;
            }

            case "solve": {
                if (process.argv[4] && process.argv[5]) {
                    output = ExpressionMath.getSolution(process.argv[4], process.argv[5]);
                } else if (process.argv[4]) {
                    output = `InvalidArgumentsError: Argument "${process.argv[5]}" isn't valid`;
                } else if (process.argv[5]) {
                    output = `InvalidArgumentsError: Argument "${process.argv[4]}" isn't valid`;
                } else {
                    output = `InvalidArgumentsError: Arguments "${process.argv[4]}" and "${process.argv[5]}" isn't valid`;
                }

                break;
            }
        }

        break;
    }

    case "is": {
        switch (method) {
            case "square-free": {
                //Parse all arguments to integers
                process.argv[4] = Math.abs(parseInt(process.argv[4]));

                if (isNaN(process.argv[4])) {
                    output = `TypeError: Cannot parse argument "${process.argv[4]}" as Integer`;
                } else {
                    output = BasicMath.isSquareFree(process.argv[4]);
                }

                break;
            }

            case "prime": {
                //Parse all arguments to integers
                process.argv[4] = Math.abs(parseInt(process.argv[4]));

                if (isNaN(process.argv[4])) {
                    output = `TypeError: Cannot parse argument "${process.argv[4]}" as Integer`;
                } else {
                    output = PrimeMath.isPrime(process.argv[4]);
                }

                break;
            }

            case "square": {
                //Parse all arguments to integers
                process.argv[4] = Math.abs(parseInt(process.argv[4]));

                if (isNaN(process.argv[4])) {
                    output = `TypeError: Cannot parse argument "${process.argv[4]}" as Integer`;
                } else {
                    output = SequenceMath.isSquare(process.argv[4]);
                }

                break;
            }

            case "triangular": {
                //Parse all arguments to integers
                process.argv[4] = Math.abs(parseInt(process.argv[4]));

                if (isNaN(process.argv[4])) {
                    output = `TypeError: Cannot parse argument "${process.argv[4]}" as Integer`;
                } else {
                    output = SequenceMath.isTriangular(process.argv[4]);
                }

                break;
            }

            case "pythagorean-triplet": {
                //Parse all arguments to integers
                process.argv[4] = Math.abs(parseInt(process.argv[4]));
                process.argv[5] = Math.abs(parseInt(process.argv[5]));
                process.argv[6] = Math.abs(parseInt(process.argv[6]));

                if (isNaN(process.argv[4])) {
                    output = `TypeError: Cannot parse argument "${process.argv[4]}" as Integer`;
                } if (isNaN(process.argv[5])) {
                    output = `TypeError: Cannot parse argument "${process.argv[5]}" as Integer`;
                } if (isNaN(process.argv[6])) {
                    output = `TypeError: Cannot parse argument "${process.argv[6]}" as Integer`;
                } else {
                    output = SequenceMath.isPythagoreanTriplet([process.argv[4], process.argv[5], process.argv[6]]);
                }

                break;
            }
        }

        break;
    }
}

console.log(output);
