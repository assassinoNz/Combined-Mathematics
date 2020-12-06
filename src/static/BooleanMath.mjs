//@ts-check
import { ExpressionContext } from "./ExpressionMath.mjs";
import { ExpressionMath } from "./ExpressionMath.mjs";

export class BooleanMath {
    /**
     * Generates a truth table where the tokenizedInfixExpressions are represented by its columns
     * @param {string[][]} tokenizedInfixExpressions Must be tokenized properly
     * @param {number} context
     */
    static generateTruthTable(tokenizedInfixExpressions, context) {
        //NOTE: This value dictionary will include all the variables from all the expressions
        let globalValueDictionary = {

        };

        //Create the globalValueDictionary
        for (const infixTokens of tokenizedInfixExpressions) {
            const localValueDictionary = ExpressionMath.generateEmptyValueDictionary(infixTokens);
            globalValueDictionary = {...globalValueDictionary, ...localValueDictionary};
        }

        const variables = Object.keys(globalValueDictionary);

        const truthTable = {
            // "P": [],
            // "Q": [],
            // "P→Q": [],
            //"¬P∨Q": [],
            //"¬Q→¬P": []
        }

        //Add an entry for each expression in the truth table
        for (const tokenizedInfixExpression of tokenizedInfixExpressions) {
            truthTable[tokenizedInfixExpression.join(" ")] = [];
        }

        for (let i = 0; i < 2 ** variables.length; i++) {
            //Generate a new set of variable values
            const binaryString = i.toString(2);
            const generatedValues = ("0".repeat(variables.length - binaryString.length) + binaryString).split("");

            //Update valueDictionary
            if (context === ExpressionContext.BOOLEAN) {
                for (let v = 0; v < variables.length; v++) {
                    globalValueDictionary[variables[v]] = Boolean(generatedValues[v]);
                }
            } else if (context === ExpressionContext.BINARY) {
                for (let v = 0; v < variables.length; v++) {
                    globalValueDictionary[variables[v]] = parseInt(generatedValues[v]);
                }
            }

            //Evaluate each expression using the updated valueDictionary
            for (let e = 0; e < tokenizedInfixExpressions.length; e++) {
                const tokenizedPostfixExpression = ExpressionMath.infixToPostfix(tokenizedInfixExpressions[e], context);
                const value = ExpressionMath.evaluateExpression(tokenizedPostfixExpression, globalValueDictionary, context);
                truthTable[tokenizedInfixExpressions[e].join(" ")][i] = value;
            }
        }

        return truthTable;
    }
}