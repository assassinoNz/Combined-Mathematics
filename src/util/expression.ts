export class ExpressionNotation {
    static PREFIX = 0;
    static INFIX = 1;
    static POSTFIX = 2;
}

export class ExpressionContext {
    static REAL = 0;
    static BIG_INTEGER = 1;
    static BINARY = 2;
    static BOOLEAN = 3;
    static MATRIX = 4;
    static SET = 5;
    static STRING = 6;
}