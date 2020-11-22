//@ts-check
export class SudokuPuzzle {
    puzzle = [
        // [5,3,0,0,7,0,0,0,0],
        // [6,0,0,1,9,5,0,0,0],
        // [0,9,8,0,0,0,0,6,0],
        // [8,0,0,0,6,0,0,0,3],
        // [4,0,0,8,0,3,0,0,1],
        // [7,0,0,0,2,0,0,0,6],
        // [0,6,0,0,0,0,2,8,0],
        // [0,0,0,4,1,9,0,0,5],
        // [0,0,0,0,8,0,0,7,9]
    ];

    constructor(puzzleString) {
        //NOTE: A puzzle string looks like follows
        //"530070000,600195000,098000060,800060003,400803001,700020006,060000280,000419005,000080079"

        //Add a trailing comma for the regexp to work
        puzzleString += ",";

        if (/(\d{9},){9}/.test(puzzleString)) {
            //Remove the trailing comma and split by "," to get row strings
            const rows = puzzleString.slice(0,-1).split(",");
            this.puzzle = new Array(rows.length);

            //Convert each row string into a row of cells
            for (let r = 0; r < rows.length; r++) {
                this.puzzle[r] = rows[r].split("");
            }

            //Parse each cell as integer
            for (let r = 0; r < this.puzzle.length; r++) {
                for (let c = 0; c < this.puzzle[r].length; c++) {
                    this.puzzle[r][c] = Number.parseInt(this.puzzle[r][c]);
                }
            }
        } else {
            throw TypeError("Unsupported sudoku string");
        }
    }

    getPuzzle() {
        return this.puzzle;
    }

    /**
     * Checks if the provided value is a candidate for the provided position
     * @param {number[][]} puzzle 
     * @param {number} rowIndex 
     * @param {number} colIndex 
     * @param {number} value 
     */
    isCandidate(puzzle, rowIndex, colIndex, value) {
        //Check along the column
        for (let r = 0; r < puzzle.length; r++) {
            if (puzzle[r][colIndex] === value) {
                return false;
            }
        }

        //Check along the row
        for (let c = 0; c < puzzle[rowIndex].length; c++) {
            if (puzzle[rowIndex][c] === value) {
                return false;
            }
        }

        //Check inside the neighboring square
        let neighSqRowStart = Math.floor(rowIndex / 3) * 3;
        let neighSqColStart = Math.floor(colIndex / 3) * 3;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (puzzle[neighSqRowStart + r][neighSqColStart + c] === value) {
                    return false;
                }
            }
        }

        return true;
    }

    solve() {
        for (let r = 0; r < this.puzzle.length; r++) {
            for (let c = 0; c < this.puzzle[r].length; c++) {
                if (this.puzzle[r][c] === 0) {
                    //CASE: Cell is empty
                    for (let i = 1; i < 10; i++) {
                        if (this.isCandidate(this.puzzle, r, c, i)) {
                            //CASE: Value is possible
                            //Place the value
                            this.puzzle[r][c] = i;
                            //Think the current state of the puzzle as a new puzzle and start solving over
                            this.solve();
                            this.puzzle[r][c] = 0;
                        }
                    }
                    return;
                }
            }
        }
    }

    getStringifiedPuzzle() {
        let stringifiedPuzzle = "";

        for (let r = 0; r < this.puzzle.length; r++) {
            stringifiedPuzzle += this.puzzle[r].join("") + "\n";
        }

        return stringifiedPuzzle;
    }
}