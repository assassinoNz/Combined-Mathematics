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

        let node, module, method, restArgs;
        [node, module, method, ...restArgs] = message.content.split(" ");

        let output = `Hello there! I'm Matta.\nMAThematical Task Automator.\nMake sure to call me "Matto" before any command.\nJust type "Matto do help" to find out what I can do.`;

        switch (module) {
            case "get": {
                switch (method) {
                    case "factors": {
                        //Parse all arguments to integers
                        restArgs[0] = Math.abs(parseInt(restArgs[0]));

                        if (isNaN(restArgs[0])) {
                            output = `TypeError: Cannot parse argument "${restArgs[0]}" as Integer`;
                        } else {
                            output = BasicMath.getIntFactors(restArgs[0]).sort();
                        }

                        break;
                    }

                    case "common-factors": {
                        //Parse all arguments to integers
                        restArgs[0] = Math.abs(parseInt(restArgs[0]));
                        restArgs[1] = Math.abs(parseInt(restArgs[1]));

                        if (isNaN(restArgs[0])) {
                            output = `TypeError: Cannot parse argument "${restArgs[0]}" as Integer`;
                        } if (isNaN(restArgs[1])) {
                            output = `TypeError: Cannot parse argument "${restArgs[1]}" as Integer`;
                        } else {
                            output = BasicMath.getCommonIntFactors(restArgs[0], restArgs[1]);
                        }

                        break;
                    }

                    case "factorial": {
                        //Parse all arguments to integers
                        restArgs[0] = Math.abs(parseInt(restArgs[0]));

                        if (isNaN(restArgs[0])) {
                            output = `TypeError: Cannot parse argument "${restArgs[0]}" as Integer`;
                        } else {
                            output = BasicMath.getFactorial(restArgs[0]);
                        }

                        break;
                    }

                    case "gcd": {
                        //Parse all arguments to integers
                        restArgs[0] = Math.abs(parseInt(restArgs[0]));
                        restArgs[1] = Math.abs(parseInt(restArgs[1]));

                        if (isNaN(restArgs[0])) {
                            output = `TypeError: Cannot parse argument "${restArgs[0]}" as Integer`;
                        } if (isNaN(restArgs[1])) {
                            output = `TypeError: Cannot parse argument "${restArgs[1]}" as Integer`;
                        } else {
                            output = BasicMath.getGCD(restArgs[0], restArgs[1]);
                        }

                        break;
                    }

                    case "primes": {
                        if (restArgs[0] && restArgs[1]) {
                            //CASE: Two limits are specified
                            //Assume that it is for getPrimesWithin()

                            //Parse all arguments to integers
                            restArgs[0] = Math.abs(parseInt(restArgs[0]));
                            restArgs[1] = Math.abs(parseInt(restArgs[1]));

                            if (isNaN(restArgs[0])) {
                                output = `TypeError: Cannot parse argument "${restArgs[0]}" as Integer`;
                            } else if (isNaN(restArgs[1])) {
                                output = `TypeError: Cannot parse argument "${restArgs[1]}" as Integer`;
                            } else if (restArgs[0] < 3) {
                                output = `RangeError: First argument "${restArgs[0]}" should be greater than or equal to 3`;
                            } else {
                                output = PrimeMath.getPrimesWithin(restArgs[0], restArgs[1]);
                            }
                        } else {
                            //CASE: Only one limit is specified
                            //Assume that it is for getPrimesUpTo()

                            //Parse all arguments to integers
                            restArgs[0] = Math.abs(parseInt(restArgs[0]));

                            if (isNaN(restArgs[0])) {
                                output = `TypeError: Cannot parse argument "${restArgs[0]}" as Integer`;
                            } else {
                                output = PrimeMath.getPrimesUpTo(restArgs[0]);
                            }
                        }

                        break;
                    }

                    case "collatz": {
                        //Parse all arguments to integers
                        restArgs[0] = Math.abs(parseInt(restArgs[0]));

                        if (isNaN(restArgs[0])) {
                            output = `TypeError: Cannot parse argument "${restArgs[0]}" as Integer`;
                        } else {
                            output = SequenceMath.getCollatzSequence(restArgs[0]);
                        }

                        break;
                    }

                    case "fibonacci": {
                        //Parse all arguments to integers
                        restArgs[0] = Math.abs(parseInt(restArgs[0]));

                        if (isNaN(restArgs[0])) {
                            output = `TypeError: Cannot parse argument "${restArgs[0]}" as Integer`;
                        } else {
                            output = SequenceMath.getFibonacciSequence(restArgs[0]);
                        }

                        break;
                    }

                    case "name": {
                        //Parse all arguments to integers
                        restArgs[0] = parseInt(restArgs[0]);

                        if (isNaN(restArgs[0])) {
                            output = `TypeError: Cannot parse argument "${restArgs[0]}" as Integer`;
                        } else if (restArgs[0] < 0 || restArgs[0] > 9999) {
                            output = `RangeError: Argument "${restArgs[0]}" should be between 0 and 9999 (inclusive)`;
                        } else {
                            output = CustomMath.getNumberName(restArgs[0]);
                        }

                        break;
                    }

                    case "min-edit": {
                        if (restArgs[0] && restArgs[1]) {
                            output = CustomMath.getMinEditDistance(restArgs[0], restArgs[1]);
                        } else if (restArgs[0]) {
                            output = `InvalidArgumentsError: Argument "${restArgs[1]}" isn't valid`;
                        } else if (restArgs[1]) {
                            output = `InvalidArgumentsError: Argument "${restArgs[0]}" isn't valid`;
                        } else {
                            output = `InvalidArgumentsError: Arguments "${restArgs[0]}" and "${restArgs[1]}" aren't valid`;
                        }

                        break;
                    }

                    case "postfix": {
                        if (restArgs[0]) {
                            output = ExpressionMath.toPostfix(restArgs[0]);
                        } else {
                            output = `InvalidArgumentsError: Argument "${restArgs[0]}" isn't valid`;
                        }

                        break;
                    }

                    case "nic-details": {
                        if (restArgs[0]) {
                            output = CustomMath.getNICDetails(restArgs[0]);
                        } else {
                            output = `InvalidArgumentsError: Argument "${restArgs[0]}" isn't valid`;
                        }

                        break;
                    }
                }

                break;
            }

            case "do": {
                switch (method) {
                    case "help": {
                        output = "get factors <Integer>\nget common-factors <Integer> <Integer>\nget factorial <Integer>\nget gcd <Integer> <Integer>\nget primes <lower> <upper>\nget collatz <Integer>\nget fibonacci <Integer>\nget name <Integer>\nget min-edit <String> <String>\nget postfix <ExpressionString>\nget nic-details <NICString>\n\ndo help\ndo prime-factorize <Integer>\ndo permute <String>\ndo solve ...<ExpressionString>\n\nis square-free <Integer>\nis prime <Integer>\nis square <Integer>\nis triangular <Integer>\nis pythagorean-triplet <Integer> <Integer> <Integer>";

                        break;
                    }

                    case "prime-factorize": {
                        //Parse all arguments to integers
                        restArgs[0] = Math.abs(parseInt(restArgs[0]));

                        if (isNaN(restArgs[0])) {
                            output = `TypeError: Cannot parse argument "${restArgs[0]}" as Integer`;
                        } else {
                            output = PrimeMath.getPrimeFactorization(restArgs[0]);
                        }

                        break;
                    }

                    case "permute": {
                        if (restArgs[0]) {
                            output = CustomMath.getUniquePermutations(restArgs[0]);
                        } else {
                            output = `InvalidArgumentsError: Argument "${restArgs[0]}" isn't valid`;
                        }

                        break;
                    }

                    case "solve": {
                        if (restArgs[0]) {
                            //Modify user arguments
                            let equations;
                            [module, method, ...equations] = restArgs;
                            output = ExpressionMath.getSolution(equations);
                        } else if (restArgs[0]) {
                            output = `InvalidArgumentsError: Argument "${restArgs[1]}" isn't valid`;
                        } else if (restArgs[1]) {
                            output = `InvalidArgumentsError: Argument "${restArgs[0]}" isn't valid`;
                        } else {
                            output = `InvalidArgumentsError: Arguments "${restArgs[0]}" and "${restArgs[1]}" aren't valid`;
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
                        restArgs[0] = Math.abs(parseInt(restArgs[0]));

                        if (isNaN(restArgs[0])) {
                            output = `TypeError: Cannot parse argument "${restArgs[0]}" as Integer`;
                        } else {
                            output = BasicMath.isSquareFree(restArgs[0]);
                        }

                        break;
                    }

                    case "prime": {
                        //Parse all arguments to integers
                        restArgs[0] = Math.abs(parseInt(restArgs[0]));

                        if (isNaN(restArgs[0])) {
                            output = `TypeError: Cannot parse argument "${restArgs[0]}" as Integer`;
                        } else {
                            output = PrimeMath.isPrime(restArgs[0]);
                        }

                        break;
                    }

                    case "square": {
                        //Parse all arguments to integers
                        restArgs[0] = Math.abs(parseInt(restArgs[0]));

                        if (isNaN(restArgs[0])) {
                            output = `TypeError: Cannot parse argument "${restArgs[0]}" as Integer`;
                        } else {
                            output = SequenceMath.isSquare(restArgs[0]);
                        }

                        break;
                    }

                    case "triangular": {
                        //Parse all arguments to integers
                        restArgs[0] = Math.abs(parseInt(restArgs[0]));

                        if (isNaN(restArgs[0])) {
                            output = `TypeError: Cannot parse argument "${restArgs[0]}" as Integer`;
                        } else {
                            output = SequenceMath.isTriangular(restArgs[0]);
                        }

                        break;
                    }

                    case "pythagorean-triplet": {
                        //Parse all arguments to integers
                        restArgs[0] = Math.abs(parseInt(restArgs[0]));
                        restArgs[1] = Math.abs(parseInt(restArgs[1]));
                        restArgs[2] = Math.abs(parseInt(restArgs[2]));

                        if (isNaN(restArgs[0])) {
                            output = `TypeError: Cannot parse argument "${restArgs[0]}" as Integer`;
                        } if (isNaN(restArgs[1])) {
                            output = `TypeError: Cannot parse argument "${restArgs[1]}" as Integer`;
                        } if (isNaN(restArgs[2])) {
                            output = `TypeError: Cannot parse argument "${restArgs[2]}" as Integer`;
                        } else {
                            output = SequenceMath.isPythagoreanTriplet([restArgs[0], restArgs[1], restArgs[2]]);
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

client.login(process.env.BOT_TOKEN).catch((error) => {
    console.log(error);
});
