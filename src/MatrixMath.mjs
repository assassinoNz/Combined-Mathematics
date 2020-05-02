//@ts-check
import { UtilityMath } from "./UtilityMath.mjs"

export class MatrixMath {
    //Calculates the determinant of a square matrix
    //Can only be used with square multi arrays (type of elements must be numbers)
    static getDeterminant(matrix = [[1]]) {
        let determinant = 0;
        //Check if there is only one element inside the matrix
        if (matrix.length === 1 && matrix[0].length === 1) {
            determinant = determinant + matrix[0][0];
        } else {
            //Else find the determinant using the first row
            let columnCount = matrix[0].length;
            for (let i = 0; i < columnCount; i++) {
                //Clone the matrix to make sure the matrix is not a reference
                let clonedMatrix = UtilityMath.cloneMultiArray(matrix);
                //Sign determinant according to the sign matrix
                if (i % 2 === 0) {
                    determinant = determinant + matrix[0][i] * this.getDeterminant(this.getSplicedMatrix(clonedMatrix, 0, i));
                }
                else {
                    determinant = determinant - matrix[0][i] * this.getDeterminant(this.getSplicedMatrix(clonedMatrix, 0, i));
                }
            }
        }
        return determinant;
    }

    //Calculates the transpose of a matrix
    //Can only be used with multi arrays (type of elements must be numbers)
    static getTransposeMatrix(matrix = [[1]]) {
        const transposeMatrix = [];
        const columnCount = matrix[0].length;
        const rowCount = matrix.length;
        for (let i = 0; i < columnCount; i++) {
            let transposeMatrixRow = [];
            for (let j = 0; j < rowCount; j++) {
                transposeMatrixRow.push(matrix[j][i]);
            }
            transposeMatrix.push(transposeMatrixRow);
        }
        return transposeMatrix;
    }

    //Removes the specified row and column from a matrix
    //Can only be used with multi arrays (type of elements must be numbers)
    static getSplicedMatrix(matrix = [[1]], rowIndexToRemove = 0, columnIndexToRemove = 0) {
        const splicedMatrix = UtilityMath.cloneMultiArray(matrix);
        //Remove rowToRemove
        splicedMatrix.splice(rowIndexToRemove, 1);
        //Remove column elements of columnToRemove recursively
        const rowCount = splicedMatrix.length;
        for (let i = 0; i < rowCount; i++) {
            splicedMatrix[i].splice(columnIndexToRemove, 1);
        }
        //Return splicedMatrix
        return splicedMatrix;
    }

    //Multiplies each element of a matrix with corresponding element of the sign matrix
    //Can only be used with multi arrays (type of elements must be numbers)
    static getSignedMatrix(matrix = [[1]]) {
        const signedMatrix = UtilityMath.cloneMultiArray(matrix);
        const rowCount = signedMatrix.length;
        const columnCount = signedMatrix[0].length;
        for (let i = 0; i < rowCount; i++) {
            for (let j = 0; j < columnCount; j++) {
                if ((i + j) % 2 !== 0) {
                    signedMatrix[i][j] = -1 * signedMatrix[i][j];
                }
            }
        }
        return signedMatrix;
    }

    //Multiplies the first matrix by the second matrix only where column count of the first matrix equals to the row count of the second matrix
    //Can only be used with multi arrays (type of elements must be numbers)
    static multiplyByMatrix(matrix1 = [[1]], matrix2 = [[2]]) {
        const resultMatrix = [[]];
        const matrix1RowCount = matrix1.length;
        const matrix2ColumnCount = matrix2[0].length;
        const matrix1ColumnCount = matrix1[0].length;
        for (let i = 0; i < matrix1RowCount; i++) {
            resultMatrix[i] = [];
            for (let j = 0; j < matrix2ColumnCount; j++) {
                let dotProductSum = 0;
                for (let k = 0; k < matrix1ColumnCount; k++) {
                    dotProductSum = dotProductSum + (matrix1[i][k] * matrix2[k][j]);
                }
                resultMatrix[i][j] = dotProductSum;
            }
        }
        return resultMatrix;
    }

    //Multiplies each element of a matrix by the given scalar
    //Can only be used with square multi arrays (type of elements must be numbers)
    static multiplyByScalar(matrix = [[1]], scalar = 1) {
        const resultMatrix = [[]];
        const rowCount = matrix.length;
        const columnCount = matrix[0].length;
        for (let i = 0; i < rowCount; i++) {
            resultMatrix[i] = [];
            for (let j = 0; j < columnCount; j++) {
                resultMatrix[i][j] = matrix[i][j] * scalar;
            }
        }
        return resultMatrix;
    }

    //Adds two matrices only where column and row count of first matrix equals to the column and row count of second matrix
    //Can only be used with multi arrays (type of elements must be numbers)
    static add(matrix1 = [[1]], matrix2 = [[2]]) {
        const resultMatrix = [[]];
        const matrix1RowCount = matrix1.length;
        const matrix1ColumnCount = matrix1[0].length;
        for (let i = 0; i < matrix1RowCount; i++) {
            resultMatrix[i] = [];
            for (let j = 0; j < matrix1ColumnCount; j++) {
                resultMatrix[i][j] = matrix1[i][j] + matrix2[i][j];
            }
        }
        return resultMatrix;
    }

    //Replaces each element with determinant of the spliced matrix obtained after removing the relevant column and row
    //Can only be used with square multi arrays (type of elements must be numbers)
    static getMinorMatrix(matrix = [[1]]) {
        const minorMatrix = [[]];
        const rowCount = matrix.length;
        const columnCount = matrix[0].length;
        for (let i = 0; i < rowCount; i++) {
            minorMatrix[i] = [];
            for (let j = 0; j < columnCount; j++) {
                minorMatrix[i][j] = this.getDeterminant(this.getSplicedMatrix(matrix, i, j));
            }
        }
        return minorMatrix;
    }

    //Calculates cofactor matrix of the given matrix using the relevant minor and sign matrices
    //Can only be used with square multi arrays (type of elements must be numbers)
    static getCofactorMatrix(matrix = [[1]]) {
        return this.getSignedMatrix(this.getMinorMatrix(matrix));
    }

    //Calculates adjoint matrix of the given matrix using the relevant minor, sign and cofactor matrices
    //Can only be used with square multi arrays (type of elements must be numbers)
    static getAdjointMatrix(matrix = [[1]]) {
        return this.getTransposeMatrix(this.getCofactorMatrix(matrix));
    }

    //Calculates inverse matrix of the given matrix using the relevant minor, sign, cofactor and adjoint matrices where the determinant isn't zero
    //Can only be used with square multi arrays (type of elements must be numbers)
    static getInverseMatrix(matrix = [[1]]) {
        const determinant = this.getDeterminant(matrix);
        const inverseMatrix = this.getAdjointMatrix(matrix);
        const rowCount = matrix.length;
        const columnCount = matrix[0].length;
        for (let i = 0; i < rowCount; i++) {
            for (let j = 0; j < columnCount; j++) {
                inverseMatrix[i][j] = inverseMatrix[i][j] / determinant;
            }
        }
        return inverseMatrix;
    }

    //NOTE: NOT IMPLEMENTED
    static getRowEcholenMatrix(matrix = [[1]]) {
        matrix = UtilityMath.cloneMultiArray(matrix);
        //In here i acts as the row selector as well as column selector
        for (let i = 0; i < matrix.length - 1; i++) {
            for (let j = i + 1; j < matrix.length; j++) {
                // for (let k = i; k < matrix[0].length; k++) {
                //     matrix[j][k] = matrix[j][k] - ((matrix[i][k] / matrix[i][i]) * matrix[j][i]);
                // }
                for (let k = matrix[0].length - 1; k >= i; k--) {
                    console.log(`R${j + 1}[${k + 1}] = ${matrix[j][k]} - ((${matrix[i][k]} / ${matrix[i][i]}) * ${matrix[j][i]})`);
                    matrix[j][k] = matrix[j][k] - ((matrix[i][k] / matrix[i][i]) * matrix[j][i]);
                }
            }
            console.log("matrix");
            // return;
        }
        return matrix;
    }
}