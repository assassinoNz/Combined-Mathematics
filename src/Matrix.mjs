//@ts-check
import { MatrixMath } from "./MatrixMath.mjs"

export class Matrix {
    /**
     * Transposes the current matrix
     * @param {Number[][]} multiArray The initial multi array to build the matrix
     */
    constructor(multiArray = [[1]]) {
        this.multiArray = multiArray;
        this.rowCount = multiArray.length;
        this.columnCount = multiArray[0].length;
        this.order = `${this.rowCount}x${this.columnCount}`;
        this.isInvertible = false;
        this.determinant = null;
        if (this.rowCount === this.columnCount) {
            this.determinant = MatrixMath.getDeterminant(multiArray);
            if (this.determinant !== 0) {
                this.isInvertible = true;
            }
        }
    }

    /**
     * Returns a new matrix which is the transpose matrix of the current one
     * @return {Matrix} The transpose matrix of the matrix
     */
    transpose() {
        return new Matrix(MatrixMath.getTransposeMatrix(this.multiArray));
    }

    /**
     * Returns a new matrix which is the minor matrix of the current one
     * @return {Matrix} The minor matrix of the matrix
     */
    minorize() {
        return new Matrix(MatrixMath.getMinorMatrix(this.multiArray));
    }

    /**
     * Returns a new matrix which is the sign matrix of the current one
     * @return {Matrix} The transpose sign of the matrix
     */
    signify() {
        return new Matrix(MatrixMath.getSignedMatrix(this.multiArray));
    }

    /**
     * Returns a new matrix which is the inverse matrix of the current one
     * @return {Matrix} The inverse matrix of the matrix
     */
    invert() {
        if (this.isInvertible === true) {
            return new Matrix(MatrixMath.getInverseMatrix(this.multiArray));
        } else if (this.rowCount !== this.columnCount) {
            throw new TypeError("Matrix inversion is not defined for a non-square matrix");
        } else {
            throw new RangeError("Cannot invert a matrix with a determinant of 0");
        }
    }

    /**
     * Returns a new matrix which is the resultant matrix after the addition of the given matrix
     * @param {Matrix} matrixToAdd Another matrix of the same order
     * @return {Matrix} The transpose matrix of the matrix
     */
    addMatrix(matrixToAdd) {
        if (matrixToAdd instanceof Matrix) {
            if (matrixToAdd.rowCount === this.rowCount && matrixToAdd.columnCount === this.columnCount) {
                return new Matrix(MatrixMath.add(this.multiArray, matrixToAdd.multiArray));
            } else {
                throw new TypeError("A matrix of the same order is required as the parameter");
            }
        } else {
            throw new TypeError("An instance of Matrix is required as the parameter");
        }
    }

    /**
     * Returns a new matrix which is the product of the current matrix and the given scalar
     * @param {Number} scalar Another matrix of the same order
     * @return {Matrix} The product of the current matrix and the given scalar
     */
    multiplyByScalar(scalar) {
        if (typeof scalar === "number") {
            return new Matrix(MatrixMath.multiplyByScalar(this.multiArray, scalar));
        } else {
            throw new TypeError("An instance of Number is required as the scaler");
        }
    }

    /**
     * Returns a new matrix which is the product of the current matrix and the given matrix
     * @param {Number} matrixToMultiply Another matrix of the same row count as the column count of the current matrix
     * @return {Matrix} The product of the current matrix and the given matrix
     */
    multiplyByMatrix(matrixToMultiply) {
        if (matrixToMultiply instanceof Matrix) {
            if (this.columnCount === matrixToMultiply.rowCount) {
                return new Matrix(MatrixMath.multiplyByMatrix(this.multiArray, matrixToMultiply.multiArray));
            } else {
                throw new TypeError(`A matrix of ${this.columnCount} columns cannot be multiplied by a matrix of ${matrixToMultiply.rowCount} rows`);
            }
        } else {
            throw new TypeError("An instance of Matrix is required as the parameter");
        }
    }
}