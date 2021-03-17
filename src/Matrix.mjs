//@ts-check
import { MatrixMath, SquareMatrixMath } from "./static/MatrixMath.mjs";

export class Matrix {
    multiArray = null;
    rowCount = null;
    columnCount = null;
        
    constructor(multiArray = [[1]]) {
        this.multiArray = multiArray;
        this.rowCount = multiArray.length;
        this.columnCount = multiArray[0].length;
    }

    transpose() {
        this.multiArray = MatrixMath.getTransposeMatrix(this.multiArray);

        //Swap the row and column counts
        [this.rowCount, this.columnCount] = [this.columnCount, this.rowCount];
    }

    add(matrix) {
        if (matrix.rowCount !== this.rowCount || matrix.columnCount !== this.columnCount) {
            throw RangeError(`Cannot add a matrix of order ${matrix.rowCount}x${matrix.columnCount} to this matrix`);
        } else {
            this.multiArray = MatrixMath.add(matrix.multiArray, this.multiArray);
        }
    }

    multiplyBy(operand) {
        if (typeof operand === "number") {
            this.multiArray = MatrixMath.multiplyByScalar(this.multiArray, operand);
        } else if (operand instanceof Matrix) {
            if (this.columnCount === operand.rowCount) {
                this.multiArray = MatrixMath.multiplyByMatrix(this.multiArray, operand.multiArray);
            } else {
                throw RangeError(`The operand matrix must have a row count of ${this.columnCount} for the matrix product to be defined`);
            }
        }
    }
}

export class SquareMatrix extends Matrix{
    determinant = null;

    constructor() {
        super();
    }

    isInvertible() {
        if (this.determinant === null) {
            this.determinant = SquareMatrixMath.getDeterminant();
        }

        if (this.determinant === 0) {
            return false;
        } else {
            return true;
        }
    }

    getDeterminant() {
        if (this.determinant === null) {
            this.determinant = SquareMatrixMath.getDeterminant();
            return this.determinant;
        } else {
            return this.determinant;
        }
    }

    getSignedMatrix() {
        this.multiArray = MatrixMath.getSignedMatrix(this.multiArray);
    }

    getCoFactorMatrix() {
        return SquareMatrixMath.getCoFactorMatrix(this.multiArray);
    }

    getAdjointMatrix() {
        return SquareMatrixMath.getCoFactorMatrix(this.multiArray);
    }

    invert() {
        if (this.isInvertible()) {
            this.multiArray = SquareMatrixMath.getInverseMatrix(this.multiArray);
        } else {
            throw Error("This matrix is not invertible");
        }
    }
}