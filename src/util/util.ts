export class ArrayUtil {
    /**
     * Sorts an array of numbers
     * @param arr
     */
    static sortNumberArray(arr: number[]) {
        arr.sort((element1, element2) => element1 - element2);
    }
}