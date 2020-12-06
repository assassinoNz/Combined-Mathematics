//@ts-check
import * as Discord from "discord.js";
import { IntegerMath, PrimeMath } from "./src/static/NumberMath.mjs";
import { StringMath } from "./src/static/StringMath.mjs";
import { SequenceMath } from "./src/static/SequenceMath.mjs";
import { CustomMath } from "./src/static/CustomMath.mjs";
import { SudokuPuzzle } from "./src/SudokuPuzzle.mjs";
import { ArrayUtil, Formatter, ArgumentParser } from "./src/static/Utility.mjs";

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
                                const parsedArgs = ArgumentParser.parseToInt(restArgs);
                                output = IntegerMath.getIntFactors(parsedArgs);
                                ArrayUtil.sortIntArray(output);
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
                                    const parsedArgs = ArgumentParser.parseToInt(restArgs);
                                    output = IntegerMath.getCommonIntFactors(parsedArgs[0], parsedArgs[1]);
                                    ArrayUtil.sortNumberArray(output);
                                }
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "factorial": {
                            try {
                                const parsedArgs = ArgumentParser.parseToInt(restArgs);
                                output = IntegerMath.getFactorial(parsedArgs[0]);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "gcd": {
                            try {
                                const parsedArgs = ArgumentParser.parseToInt(restArgs);
                                output = IntegerMath.getGcd(parsedArgs);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "lcm": {
                            try {
                                const parsedArgs = ArgumentParser.parseToInt(restArgs);
                                output = IntegerMath.getLcm(parsedArgs);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "primes": {
                            try {
                                const parsedArgs = ArgumentParser.parseToInt(restArgs);
                                if (parsedArgs.length > 1) {
                                    //CASE: Two limits are specified
                                    //Assume that it is for getPrimesWithin()
                                    if (parsedArgs[0] < 3) {
                                        throw RangeError("Lower bound should be greater than or equal to 3");
                                    } else {
                                        output = PrimeMath.getPrimesWithin(parsedArgs[0], parsedArgs[1]);
                                        ArrayUtil.sortNumberArray(output);
                                    }
                                } else {
                                    //CASE: Only one limit is specified
                                    //Assume that it is for getPrimesUpTo()
                                    output = PrimeMath.getPrimesUpTo(parsedArgs[0]);
                                    ArrayUtil.sortNumberArray(output);
                                }
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "collatz": {
                            try {
                                const parsedArgs = ArgumentParser.parseToInt(restArgs);
                                output = SequenceMath.getCollatzSequence(parsedArgs[0]);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "fibonacci": {
                            try {
                                const parsedArgs = ArgumentParser.parseToInt(restArgs);
                                output = SequenceMath.getFibonacciSequence(parsedArgs[0]);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "name": {
                            try {
                                const parsedArgs = ArgumentParser.parseToInt(restArgs);
                                if (parsedArgs[0] < 0 || parsedArgs[0] > 9999) {
                                    throw RangeError("Argument should be in the range from 0 to 9999");
                                } else {
                                    output = StringMath.getNumberName(parsedArgs[0]);
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
                                    output = StringMath.getMinEditDistance(restArgs[0], restArgs[1]);
                                }
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
                            output = "get factors <int:num>\nget common-factors <int:num1> <int:num2>\nget factorial <int:num>\nget gcd <int...:nums>\nget lcm <int...:nums>\nget primes <int:lowerBound> <int:upperBound>\nget primes <int:upperBound>\nget collatz <int:num>\nget fibonacci <int:limit>\nget name <int:num>\nget min-edit <String:str1> <String:str2>\nget nic-details <String:nicCode>\n\ndo help\ndo prime-factorize <int:num>\ndo permute <String:str>\n\nsolve sle <String...:expressions>\nsolve sudoku <String:puzzle>\n\nis square-free <int:num>\nis prime <int:num>\nis square <int:num>\nis triangular <int:num>\nis pythagorean-triplet <int:num1> <int:num2> <int:num3>";
    
                            break;
                        }
    
                        case "prime-factorize": {
                            try {
                                const parsedArgs = ArgumentParser.parseToInt(restArgs);
                                output = PrimeMath.getPrimeFactorization(parsedArgs[0]);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "permute": {
                            try {
                                output = StringMath.getUniquePermutations(restArgs[0]);
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
                        // case "sle": {
                        //     try {
                        //         if (restArgs.length > 1) {
                        //             output = ExpressionMath.getSolution(restArgs);
                        //         } else {
                        //             throw Error("Arguments doesn't form a valid system of linear equations");
                        //         }
                        //     } catch (error) {
                        //         output = error.toString();
                        //     }
    
                        //     break;
                        // }

                        case "sudoku": {
                            try {
                                const sudokuPuzzle = new SudokuPuzzle(restArgs[0]);
                                sudokuPuzzle.solve();
                                output = sudokuPuzzle.toString();
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
                                const parsedArgs = ArgumentParser.parseToInt(restArgs);
                                output = IntegerMath.isSquareFree(parsedArgs[0]);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "prime": {
                            try {
                                const parsedArgs = ArgumentParser.parseToInt(restArgs);
                                output = PrimeMath.isPrime(parsedArgs[0]);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "square": {
                            try {
                                const parsedArgs = ArgumentParser.parseToInt(restArgs);
                                output = SequenceMath.isSquare(parsedArgs[0]);
                            } catch (error) {
                                output = error.toString();
                            }
    
                            break;
                        }
    
                        case "triangular": {
                            try {
                                const parsedArgs = ArgumentParser.parseToInt(restArgs);
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
                                    const parsedArgs = ArgumentParser.parseToInt(restArgs);
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

        message.channel.send(Formatter.formatBotOutput(output));
    }
});

client.login(process.env.BOT_TOKEN).catch((error) => {
    console.log(error);
});
