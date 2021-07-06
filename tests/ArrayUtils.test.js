import { ArrayUtils } from '../lib/js-utils.js';

describe("ArrayUtilsTest", () => {
    it("testIsEmpty", () => {
        const arr1 = []
        expect(ArrayUtils.isEmpty(arr1)).toBeTruthy()
        const arr2 = null
        expect(ArrayUtils.isEmpty(arr2)).toBeTruthy()
        const arr3 = undefined
        expect(ArrayUtils.isEmpty(arr3)).toBeTruthy()
        const arr4 = [null]
        expect(ArrayUtils.isEmpty(arr4)).toBeFalsy()
        const arr5 = [undefined]
        expect(ArrayUtils.isEmpty(arr5)).toBeFalsy()
        const arr6 = [1]
        expect(ArrayUtils.isEmpty(arr6)).toBeFalsy()
    });

    it("testSafeIndex", () => {
        const arr1 = []
        expect(ArrayUtils.safeIndex(arr1, 0)).toBeUndefined()
        const arr2 = null
        expect(ArrayUtils.safeIndex(arr2, 0)).toBeUndefined()
        const arr3 = undefined
        expect(ArrayUtils.safeIndex(arr3, 0)).toBeUndefined()
        const arr4 = [1, 2, 3]
        expect(ArrayUtils.safeIndex(arr4, -1)).toBeUndefined()
        expect(ArrayUtils.safeIndex(arr4, 3)).toBeUndefined()
        expect(ArrayUtils.safeIndex(arr4, 2)).toEqual(3)
    });

    it("testFindIndexes", () => {
        const arr1 = ['adsad', 'sadadsad', 'asdasdasdasd', '', null, "test"]
        expect(ArrayUtils.findIndexes(arr1, item => item === 'test')).toEqual([5])
        expect(ArrayUtils.findIndexes(arr1, item => item === 'asdasdasdasdadadad')).toEqual([])
        expect(ArrayUtils.findIndexes([], item => item === 'asdasdasdasdadadad')).toEqual([])
        expect(ArrayUtils.findIndexes(null, item => item === 'asdasdasdasdadadad')).toEqual([])
        expect(ArrayUtils.findIndexes(undefined, item => item === 'asdasdasdasdadadad')).toEqual([])
    });

    it("testContain", () => {
        const arr1 = ['adsad', 'sadadsad', 'asdasdasdasd', '', null, "test"]
        expect(ArrayUtils.contain(arr1, item => item === 'test')).toBeTruthy()
        expect(ArrayUtils.contain(arr1, item => item === 'aaaaaaaaaaaaaaa')).toBeFalsy()
        expect(ArrayUtils.contain([], item => item === 'test')).toBeFalsy()
        expect(ArrayUtils.contain(undefined, item => item === 'test')).toBeFalsy()
        expect(ArrayUtils.contain(null, item => item === 'test')).toBeFalsy()
    });

    it("testCopy", () => {
        const arr = ['adsad', 'sadadsad', 'asdasdasdasd', '', null, "test"]
        const arrCopy = ArrayUtils.copy(arr)
        expect(arr == arrCopy).toBeFalsy()
        expect(arr[0] === arrCopy[0]).toBeTruthy()
        arrCopy[0] += 'test'
        expect(arr[0] === arrCopy[0]).toBeFalsy()
        console.log(arr[0], arrCopy[0])
    });
});
