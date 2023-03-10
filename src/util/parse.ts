export class ArgumentParser {
    static parseToInt(args: string[]) {
        const parsedArgs = [];
        //Parse all arguments to integers
        for (let i = 0; i < args.length; i++) {
            parsedArgs[i] = parseInt(args[i]);

            if (isNaN(parsedArgs[i])) {
                throw TypeError(`Cannot parse argument "${args[i]}" as Integer`);
            }
        }

        return parsedArgs;
    }
}