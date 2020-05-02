//@ts-check
import { MatrixMath } from "./MatrixMath.mjs"

export class Matrix {
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

    //Transposes the current matrix
    transpose() {
        return new Matrix(MatrixMath.getTransposeMatrix(this.multiArray));
    }

    //Minorizes the current matrix
    minorize() {
        return new Matrix(MatrixMath.getMinorMatrix(this.multiArray));
    }

    //Multiplies each element of the current matrix with relevant element of the sign matrix
    signify() {
        return new Matrix(MatrixMath.getSignedMatrix(this.multiArray));
    }

    //Inverts the current matrix
    invert() {
        if (this.isInvertible === true) {
            return new Matrix(MatrixMath.getInverseMatrix(this.multiArray));
        } else if (this.rowCount !== this.columnCount) {
            throw new TypeError("Matrix inversion is not defined for a non-square matrix");
        } else {
            throw new RangeError("Cannot invert a matrix with a determinant of 0");
        }
    }

    //Add the specified matrix to the current matrix
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

    //Multiplies current matrix with the specified scalar
    multiplyByScalar(scalar) {
        if (typeof scalar === "number") {
            return new Matrix(MatrixMath.multiplyByScalar(this.multiArray, scalar));
        } else {
            throw new TypeError("An instance of Number is required as the scaler");
        }
    }

    //Multiplies the current matrix with the specified matrix
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