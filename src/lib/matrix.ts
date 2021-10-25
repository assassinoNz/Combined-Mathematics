export class MatrixMath {
    /**
     * Calculates the transposition matrix of a given matrix
     * @param matrix
     * @return The transposition matrix of the matrix
     */
    static getTransposeMatrix(matrix: number[][]) {
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

    /**
     * Multiplies the first matrix by the second matrix only where column count of the first matrix equals to the row count of the second matrix
     * @param matrix1
     * @param matrix2
     * @return The product of the two matrices
     */
    static multiplyByMatrix(matrix1: number[][], matrix2: number[][]) {
        const resultMatrix: number[][] = [[]];
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

    /**
     * Multiplies each element of a matrix by the given scalar
     * @param matrix Must be a square matrix
     * @param scalar Must be a square matrix
     * @return The product of the matrix and the scalar
     */
    static multiplyByScalar(matrix: number[][], scalar: number) {
        const resultMatrix: number[][] = [[]];
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

    /**
     * Adds two matrices only where column and row count of first matrix equals to the column and row count of second matrix
     * @param matrix1
     * @param matrix2
     * @return The sum of the two matrices
     */
    static add(matrix1: number[][], matrix2: number[][]) {
        const resultMatrix: number[][] = [[]];
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
}

export class SquareMatrixMath {
    /**
     * Calculates the determinant of a square matrix
     * @param matrix Must be a square matrix
     * @return The determinant of the matrix
     */
    static getDeterminant(matrix: number[][]) {
        let determinant = 0;
        if (matrix.length === 1 && matrix[0].length === 1) {
            //CASE: Matrix has only one element
            //Determinant is that element
            determinant = determinant + matrix[0][0];
        } else {
            //CASE: Matrix has more than one element
            let columnCount = matrix[0].length;
            for (let i = 0; i < columnCount; i++) {
                //Clone the matrix to make sure the matrix is not a reference
                let clonedMatrix = JSON.parse(JSON.stringify(matrix));
                //Sign determinant according to the sign matrix
                if (i % 2 === 0) {
                    determinant = determinant + matrix[0][i] * SquareMatrixMath.getDeterminant(MatrixUtil.getSplicedMatrix(clonedMatrix, 0, i));
                }
                else {
                    determinant = determinant - matrix[0][i] * SquareMatrixMath.getDeterminant(MatrixUtil.getSplicedMatrix(clonedMatrix, 0, i));
                }
            }
        }
        return determinant;
    }

    /**
     * Multiplies each element of a matrix with corresponding element of the sign matrix
     * @param matrix Must be a square matrix
     * @return The sign matrix of the matrix
     */
    static getSignedMatrix(matrix: number[][]) {
        const signedMatrix = JSON.parse(JSON.stringify(matrix));
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

    /**
     * Raises a matrix to a power
     * @param matrix Must be a square matrix
     * @param power
     * @return The given power of the matrix
     */
    static pow(matrix: number[][], power: number) {
        let resultMatrix = matrix;

        for (let i = 1; i < power; i++) {
            resultMatrix = MatrixMath.multiplyByMatrix(resultMatrix, matrix);
        }

        return resultMatrix;
    }

    /**
     * Replaces each element with determinant of the spliced matrix obtained after removing the relevant column and row
     * @param matrix Must be a square matrix
     * @return The minor matrix of the matrix
     */
    static getMinorMatrix(matrix: number[][]) {
        if (matrix.length === 1 && matrix[0].length === 1) {
            //CASE: Matrix has only one element
            //Minor matrix is the same as original matrix
            return matrix;
        } else {
            const minorMatrix: number[][] = [[]];
            const rowCount = matrix.length;
            const columnCount = matrix[0].length;
            for (let i = 0; i < rowCount; i++) {
                minorMatrix[i] = [];
                for (let j = 0; j < columnCount; j++) {
                    minorMatrix[i][j] = SquareMatrixMath.getDeterminant(MatrixUtil.getSplicedMatrix(matrix, i, j));
                }
            }
            return minorMatrix;
        }
    }

    /**
     * Calculates the co-factor matrix of the given matrix using the relevant minor and sign matrices
     * @param matrix Must be a square matrix
     * @return The co-factor matrix of the matrix
     */
    static getCoFactorMatrix(matrix: number[][]) {
        return SquareMatrixMath.getSignedMatrix(SquareMatrixMath.getMinorMatrix(matrix));
    }

    /**
     * Calculates the adjoint matrix of the given matrix using the relevant minor, sign and cofactor matrices
     * @param matrix Must be a square matrix
     * @return The adjoint matrix of the matrix
     */
    static getAdjointMatrix(matrix: number[][]) {
        return MatrixMath.getTransposeMatrix(SquareMatrixMath.getCoFactorMatrix(matrix));
    }

    /**
     * Calculates the inverse matrix of the given matrix using the relevant minor, sign, cofactor and adjoint matrices where the determinant isn't zero
     * @param matrix Must be a square matrix
     * @return The inverse matrix of the matrix
     */
    static getInverseMatrix(matrix: number[][]) {
        const determinant = SquareMatrixMath.getDeterminant(matrix);
        if (determinant === 0) {
            throw new RangeError("Matrix is not invertible");
        } else {
            const inverseMatrix = SquareMatrixMath.getAdjointMatrix(matrix);
            const rowCount = matrix.length;
            const columnCount = matrix[0].length;
            for (let i = 0; i < rowCount; i++) {
                for (let j = 0; j < columnCount; j++) {
                    inverseMatrix[i][j] = inverseMatrix[i][j] / determinant;
                }
            }
            return inverseMatrix;
        }
    }

    //NOTE: NOT IMPLEMENTED
    static getRowEchelonMatrix(matrix = [[1]]) {
        matrix = JSON.parse(JSON.stringify(matrix));
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