export class ArraySort {
    /**
     * Sorts a number array using the insertion sort
     * @param arr 
     */
    static insertionSort(arr: number[]) {
        //Iterate over each element of the unsorted array
        for (let i = 0; i < arr.length; i++) {
            //Iterate over each element of the sorted array from the end
            //Swap the ith unsorted element with each of the sorted array until its proper position is found
            for (let j = i; j > 0; j--) {
                if (arr[j] < arr[j - 1]) {
                    [arr[j - 1], arr[j]] = [arr[j], arr[j-1]];
                } else {
                    break;
                }
            }
        }
    }
}