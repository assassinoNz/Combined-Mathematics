//@ts-check
import { BasicMath } from "./src/BasicMath.mjs";
import { PrimeMath } from "./src/PrimeMath.mjs";
import { SequenceMath } from "./src/SequenceMath.mjs";
import { CustomMath } from "./src/CustomMath.mjs";
import { ExpressionMath } from "./src/ExpressionMath.mjs";
import { UtilityMath } from "./src/UtilityMath.mjs";
import { SudokuPuzzle } from "./src/SudokuPuzzle.mjs";

import * as Discord from "discord.js";

const client = new Discord.Client();

client.on("ready", () => {
    console.log("Connected as " + client.user.tag);
});

client.on("message", message => {
    if (message.content.startsWith("Matto")) {

        let node, module, method, restArgs;
        [node, module, method, ...restArgs] = message.content.split(" ");

        let output = `Hello there! I'm Matta.\nMAThematical Task Automator.\nMake sure to call me "Matto" before any command.\nJust type "Matto do help" to find out what I can do.`;

        if (module && method && restArgs.length === 0 && method !== "help") {
            output = "Error: No arguments found";
        } else {
            switch (module) {
                case "get": {
                    switch (method) {
                        case "factors": {
                            try {
                                const parsedArgs = UtilityMath.parseArgsAsInt(restArgs);
                                output = BasicMath.getIntFactors(parsedArgs);
                                UtilityMath.sortIntArray(output);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "common-factors": {
                            try {
                                if (restArgs.length < 2) {
                                    throw Error("2 Arguments must be provided");
                                } else {
                                    const parsedArgs = UtilityMath.parseArgsAsInt(restArgs);
                                    output = BasicMath.getCommonIntFactors(parsedArgs[0], parsedArgs[1]);
                                    UtilityMath.sortIntArray(output);
                                }
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "factorial": {
                            try {
                                const parsedArgs = UtilityMath.parseArgsAsInt(restArgs);
                                output = BasicMath.getFactorial(parsedArgs[0]);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "gcd": {
                            try {
                                const parsedArgs = UtilityMath.parseArgsAsInt(restArgs);
                                output = BasicMath.getGCD(parsedArgs);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "lcm": {
                            try {
                                const parsedArgs = UtilityMath.parseArgsAsInt(restArgs);
                                output = BasicMath.getLCM(parsedArgs);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "primes": {
                            try {
                                const parsedArgs = UtilityMath.parseArgsAsInt(restArgs);
                                if (parsedArgs.length > 1) {
                                    //CASE: Two limits are specified
                                    //Assume that it is for getPrimesWithin()
                                    if (parsedArgs[0] < 3) {
                                        throw RangeError("Lower bound should be greater than or equal to 3");
                                    } else {
                                        output = PrimeMath.getPrimesWithin(parsedArgs[0], parsedArgs[1]);
                                        UtilityMath.sortIntArray(output);
                                    }
                                } else {
                                    //CASE: Only one limit is specified
                                    //Assume that it is for getPrimesUpTo()
                                    output = PrimeMath.getPrimesUpTo(parsedArgs[0]);
                                    UtilityMath.sortIntArray(output);
                                }
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "collatz": {
                            try {
                                const parsedArgs = UtilityMath.parseArgsAsInt(restArgs);
                                output = SequenceMath.getCollatzSequence(parsedArgs[0]);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "fibonacci": {
                            try {
                                const parsedArgs = UtilityMath.parseArgsAsInt(restArgs);
                                output = SequenceMath.getFibonacciSequence(parsedArgs[0]);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "name": {
                            try {
                                const parsedArgs = UtilityMath.parseArgsAsInt(restArgs);
                                if (parsedArgs[0] < 0 || parsedArgs[0] > 9999) {
                                    throw RangeError("Argument should be in the range from 0 to 9999");
                                } else {
                                    output = CustomMath.getNumberName(parsedArgs[0]);
                                }
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "min-edit": {
                            try {
                                if (restArgs.length < 2) {
                                    throw Error("At least 2 arguments are required");
                                } else {
                                    output = CustomMath.getMinEditDistance(restArgs[0], restArgs[1]);
                                }
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "postfix": {
                            try {
                                output = ExpressionMath.toPostfix(restArgs[0]);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "nic-details": {
                            try {
                                output = CustomMath.getNICDetails(restArgs[0]);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
                    }
    
                    break;
                }
    
                case "do": {
                    switch (method) {
                        case "help": {
                            output = "get factors <int:num>\nget common-factors <int:num1> <int:num2>\nget factorial <int:num>\nget gcd <int...:nums>\nget lcm <int...:nums>\nget primes <int:lowerBound> <int:upperBound>\nget primes <int:upperBound>\nget collatz <int:num>\nget fibonacci <int:limit>\nget name <int:num>\nget min-edit <String:str1> <String:str2>\nget postfix <String:infixExpression>\nget nic-details <String:nicCode>\n\ndo help\ndo prime-factorize <int:num>\ndo permute <String:str>\n\nsolve sle <String...:expressions>\nsolve sudoku <String:puzzle>\n\nis square-free <int:num>\nis prime <int:num>\nis square <int:num>\nis triangular <int:num>\nis pythagorean-triplet <int:num1> <int:num2> <int:num3>";
    
                            break;
                        }
    
                        case "prime-factorize": {
                            try {
                                const parsedArgs = UtilityMath.parseArgsAsInt(restArgs);
                                output = PrimeMath.getPrimeFactorization(parsedArgs[0]);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "permute": {
                            try {
                                output = CustomMath.getUniquePermutations(restArgs[0]);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
                    }
    
                    break;
                }

                case "solve": {
                    switch (method) {
                        case "sle": {
                            try {
                                if (restArgs.length > 1) {
                                    output = ExpressionMath.getSolution(restArgs);
                                } else {
                                    throw Error("Arguments doesn't form a valid system of linear equations");
                                }
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }

                        case "sudoku": {
                            try {
                                const sudokuPuzzle = new SudokuPuzzle(restArgs[0]);
                                sudokuPuzzle.solve();
                                output = sudokuPuzzle.getStringifiedPuzzle();
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
                    }
                }
    
                case "is": {
                    switch (method) {
                        case "square-free": {
                            try {
                                const parsedArgs = UtilityMath.parseArgsAsInt(restArgs);
                                output = BasicMath.isSquareFree(parsedArgs[0]);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "prime": {
                            try {
                                const parsedArgs = UtilityMath.parseArgsAsInt(restArgs);
                                output = PrimeMath.isPrime(parsedArgs[0]);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "square": {
                            try {
                                const parsedArgs = UtilityMath.parseArgsAsInt(restArgs);
                                output = SequenceMath.isSquare(parsedArgs[0]);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "triangular": {
                            try {
                                const parsedArgs = UtilityMath.parseArgsAsInt(restArgs);
                                output = SequenceMath.isTriangular(parsedArgs[0]);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "pythagorean-triplet": {
                            try {
                                if (restArgs.length < 3) {
                                    throw Error("At least 3 arguments should be provided");
                                } else {
                                    const parsedArgs = UtilityMath.parseArgsAsInt(restArgs);
                                    output = SequenceMath.isPythagoreanTriplet(parsedArgs);
                                }
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
                    }
    
                    break;
                }
            }
        }

        message.channel.send(UtilityMath.formatOutput(output));
    }
});

client.login(process.env.BOT_TOKEN).catch((error) => {
    console.log(error);
});
