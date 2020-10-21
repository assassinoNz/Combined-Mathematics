//@ts-check
import { BasicMath } from "./src/BasicMath.mjs";
import { PrimeMath } from "./src/PrimeMath.mjs";
import { SequenceMath } from "./src/SequenceMath.mjs";
import { CustomMath } from "./src/CustomMath.mjs";
import { ExpressionMath } from "./src/ExpressionMath.mjs";
import * as Discord from "discord.js";

const client = new Discord.Client();

client.on("ready", () => {
    console.log("Connected as " + client.user.tag);
});

client.on("message", message => {
    if (message.content.startsWith("Matto")) {
        const userArguments = message.content.split(" ");

        const module = userArguments[1];
        const method = userArguments[2];

        let output = "No operation found that matches your arguments";

        switch (module) {
            case "get": {
                switch (method) {
                    case "factors": {
                        //Parse all arguments to integers
                        userArguments[3] = Math.abs(parseInt(userArguments[3]));

                        if (isNaN(userArguments[3])) {
                            output = `TypeError: Cannot parse argument "${userArguments[3]}" as Integer`;
                        } else {
                            output = BasicMath.getIntFactors(userArguments[3]);
                        }

                        break;
                    }

                    case "commonFactors": {
                        //Parse all arguments to integers
                        userArguments[3] = Math.abs(parseInt(userArguments[3]));
                        userArguments[4] = Math.abs(parseInt(userArguments[4]));

                        if (isNaN(userArguments[3])) {
                            output = `TypeError: Cannot parse argument "${userArguments[3]}" as Integer`;
                        } if (isNaN(userArguments[4])) {
                            output = `TypeError: Cannot parse argument "${userArguments[4]}" as Integer`;
                        } else {
                            output = BasicMath.getCommonIntFactors(userArguments[3], userArguments[4]);
                        }

                        break;
                    }

                    case "factorial": {
                        //Parse all arguments to integers
                        userArguments[3] = Math.abs(parseInt(userArguments[3]));

                        if (isNaN(userArguments[3])) {
                            output = `TypeError: Cannot parse argument "${userArguments[3]}" as Integer`;
                        } else {
                            output = BasicMath.getFactorial(userArguments[3]);
                        }

                        break;
                    }

                    case "gcd": {
                        //Parse all arguments to integers
                        userArguments[3] = Math.abs(parseInt(userArguments[3]));
                        userArguments[4] = Math.abs(parseInt(userArguments[4]));

                        if (isNaN(userArguments[3])) {
                            output = `TypeError: Cannot parse argument "${userArguments[3]}" as Integer`;
                        } if (isNaN(userArguments[4])) {
                            output = `TypeError: Cannot parse argument "${userArguments[4]}" as Integer`;
                        } else {
                            output = BasicMath.getGCD(userArguments[3], userArguments[4]);
                        }

                        break;
                    }

                    case "primes": {
                        if (userArguments[3] && userArguments[4]) {
                            //CASE: Two limits are specified
                            //Assume that it is for getPrimesWithin()

                            //Parse all arguments to integers
                            userArguments[3] = Math.abs(parseInt(userArguments[3]));
                            userArguments[4] = Math.abs(parseInt(userArguments[4]));

                            if (isNaN(userArguments[3])) {
                                output = `TypeError: Cannot parse argument "${userArguments[3]}" as Integer`;
                            } else if (isNaN(userArguments[4])) {
                                output = `TypeError: Cannot parse argument "${userArguments[4]}" as Integer`;
                            } else if (userArguments[3] < 3) {
                                output = `RangeError: First argument "${userArguments[3]}" should be greater than or equal to 3`;
                            } else {
                                output = PrimeMath.getPrimesWithin(userArguments[3], userArguments[4]);
                            }
                        } else {
                            //CASE: Only one limit is specified
                            //Assume that it is for getPrimesUpTo()

                            //Parse all arguments to integers
                            userArguments[3] = Math.abs(parseInt(userArguments[3]));

                            if (isNaN(userArguments[3])) {
                                output = `TypeError: Cannot parse argument "${userArguments[3]}" as Integer`;
                            } else {
                                output = PrimeMath.getPrimesUpTo(userArguments[3]);
                            }
                        }

                        break;
                    }

                    case "collatz": {
                        //Parse all arguments to integers
                        userArguments[3] = Math.abs(parseInt(userArguments[3]));

                        if (isNaN(userArguments[3])) {
                            output = `TypeError: Cannot parse argument "${userArguments[3]}" as Integer`;
                        } else {
                            output = SequenceMath.getCollatzSequence(userArguments[3]);
                        }

                        break;
                    }

                    case "fibonacci": {
                        //Parse all arguments to integers
                        userArguments[3] = Math.abs(parseInt(userArguments[3]));

                        if (isNaN(userArguments[3])) {
                            output = `TypeError: Cannot parse argument "${userArguments[3]}" as Integer`;
                        } else {
                            output = SequenceMath.getFibonacciSequence(userArguments[3]);
                        }

                        break;
                    }

                    case "name": {
                        //Parse all arguments to integers
                        userArguments[3] = parseInt(userArguments[3]);

                        if (isNaN(userArguments[3])) {
                            output = `TypeError: Cannot parse argument "${userArguments[3]}" as Integer`;
                        } else if (userArguments[3] < 0 || userArguments[3] > 9999) {
                            output = `RangeError: Argument "${userArguments[3]}" should be between 0 and 9999 (inclusive)`;
                        } else {
                            output = CustomMath.getNumberName(userArguments[3]);
                        }

                        break;
                    }

                    case "min-edit": {
                        if (userArguments[3] && userArguments[4]) {
                            output = CustomMath.getMinEditDistance(userArguments[3], userArguments[4]);
                        } else if (userArguments[3]) {
                            output = `InvalidArgumentsError: Argument "${userArguments[4]}" isn't valid`;
                        } else if (userArguments[4]) {
                            output = `InvalidArgumentsError: Argument "${userArguments[3]}" isn't valid`;
                        } else {
                            output = `InvalidArgumentsError: Arguments "${userArguments[3]}" and "${userArguments[4]}" isn't valid`;
                        }

                        break;
                    }

                    case "postfix": {
                        if (userArguments[3]) {
                            output = ExpressionMath.toPostfix(userArguments[3]);
                        } else {
                            output = `InvalidArgumentsError: Argument "${userArguments[3]}" isn't valid`;
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
                        userArguments[3] = Math.abs(parseInt(userArguments[3]));

                        if (isNaN(userArguments[3])) {
                            output = `TypeError: Cannot parse argument "${userArguments[3]}" as Integer`;
                        } else {
                            output = PrimeMath.getPrimeFactorization(userArguments[3]);
                        }

                        break;
                    }

                    case "permute": {
                        if (userArguments[3]) {
                            output = CustomMath.getAllPermutations(userArguments[3]);
                        } else {
                            output = `InvalidArgumentsError: Argument "${userArguments[3]}" isn't valid`;
                        }

                        break;
                    }

                    case "permute-unique": {
                        if (userArguments[3]) {
                            output = CustomMath.getUniquePermutations(userArguments[3]);
                        } else {
                            output = `InvalidArgumentsError: Argument "${userArguments[3]}" isn't valid`;
                        }

                        break;
                    }

                    case "solve": {
                        if (userArguments[3] && userArguments[4]) {
                            output = ExpressionMath.getSolution(userArguments[3], userArguments[4]);
                        } else if (userArguments[3]) {
                            output = `InvalidArgumentsError: Argument "${userArguments[4]}" isn't valid`;
                        } else if (userArguments[4]) {
                            output = `InvalidArgumentsError: Argument "${userArguments[3]}" isn't valid`;
                        } else {
                            output = `InvalidArgumentsError: Arguments "${userArguments[3]}" and "${userArguments[4]}" isn't valid`;
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
                        userArguments[3] = Math.abs(parseInt(userArguments[3]));

                        if (isNaN(userArguments[3])) {
                            output = `TypeError: Cannot parse argument "${userArguments[3]}" as Integer`;
                        } else {
                            output = BasicMath.isSquareFree(userArguments[3]);
                        }

                        break;
                    }

                    case "prime": {
                        //Parse all arguments to integers
                        userArguments[3] = Math.abs(parseInt(userArguments[3]));

                        if (isNaN(userArguments[3])) {
                            output = `TypeError: Cannot parse argument "${userArguments[3]}" as Integer`;
                        } else {
                            output = PrimeMath.isPrime(userArguments[3]);
                        }

                        break;
                    }

                    case "square": {
                        //Parse all arguments to integers
                        userArguments[3] = Math.abs(parseInt(userArguments[3]));

                        if (isNaN(userArguments[3])) {
                            output = `TypeError: Cannot parse argument "${userArguments[3]}" as Integer`;
                        } else {
                            output = SequenceMath.isSquare(userArguments[3]);
                        }

                        break;
                    }

                    case "triangular": {
                        //Parse all arguments to integers
                        userArguments[3] = Math.abs(parseInt(userArguments[3]));

                        if (isNaN(userArguments[3])) {
                            output = `TypeError: Cannot parse argument "${userArguments[3]}" as Integer`;
                        } else {
                            output = SequenceMath.isTriangular(userArguments[3]);
                        }

                        break;
                    }

                    case "pythagorean-triplet": {
                        //Parse all arguments to integers
                        userArguments[3] = Math.abs(parseInt(userArguments[3]));
                        userArguments[4] = Math.abs(parseInt(userArguments[4]));
                        process.argv[6] = Math.abs(parseInt(process.argv[6]));

                        if (isNaN(userArguments[3])) {
                            output = `TypeError: Cannot parse argument "${userArguments[3]}" as Integer`;
                        } if (isNaN(userArguments[4])) {
                            output = `TypeError: Cannot parse argument "${userArguments[4]}" as Integer`;
                        } if (isNaN(process.argv[6])) {
                            output = `TypeError: Cannot parse argument "${process.argv[6]}" as Integer`;
                        } else {
                            output = SequenceMath.isPythagoreanTriplet([userArguments[3], userArguments[4], process.argv[6]]);
                        }

                        break;
                    }
                }

                break;
            }
        }

        message.channel.send(output);
    }
});

client.login(process.env.discordToken).catch((error) => {
    console.log(error);
});
