//@ts-check
export class BinaryExpressionNode {
    data = null;
    left = null;
    right = null;

    tokenize(notation) {
        switch (notation) {
            case "PREFIX":
                return this.tokenizeToPrefix();
            case "INFIX":
                return this.tokenizeToInfix();
            case "POSTFIX":
                return this.tokenizeToPostfix();
            default:
                throw new Error("InvalidArgument: No such notation");
        }
    }

    tokenizeToPrefix(node = this) {
        if (node.left === null && node.right === null) {
            return [node.data];
        } else if (typeof node.left === "object" && typeof node.right === "object") {
            return [node.data, ...this.tokenizeToPrefix(node.left), ...this.tokenizeToPrefix(node.right)];
        }
    }

    tokenizeToInfix(node = this) {
        if (node.left === null && node.right === null) {
            return [node.data];
        } else if (typeof node.left === "object" && typeof node.right === "object") {
            return ["(", ...this.tokenizeToInfix(node.left), node.data, ...this.tokenizeToInfix(node.right), ")"];
        }
    }

    tokenizeToPostfix(node = this) {
        if (node.left === null && node.right === null) {
            return [node.data];
        } else if (typeof node.left === "object" && typeof node.right === "object") {
            return [...this.tokenizeToPostfix(node.left), ...this.tokenizeToPostfix(node.right), node.data];
        }
    }
}