class MatrixUtil {
    /**
     * Removes the specified row and column from a matrix
     * @param matrix Must be a square matrix
     * @param rowIndexToRemove Must be smaller than matrix.length
     * @param columnIndexToRemove Must be smaller than matrix[0].length
     * @return The resultant matrix after removal of the given row and the column
     */
    static getSplicedMatrix(matrix: number[][], rowIndexToRemove: number, columnIndexToRemove: number) {
        const splicedMatrix = JSON.parse(JSON.stringify(matrix));
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
}

interface SLEMatrix {
    zeroVariables: string[];
    variablesMatrix: string[][];
    coefficientsMatrix: number[][];
    constantsMatrix: number[][];
    solutionMatrix: number[][];
    solutionDictionary: any;
}