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
});
