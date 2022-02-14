import { ArrayUtils } from '../lib/js-utils.ems.js';

describe("ArrayUtilsTest", () => {
    it("testCopy", () => {
        const f = (a, b) => {return a + b};
        const e = (a) => {return a === f};
       const test = [(a) => {return a}, f, (a) => {return a}, (a) => {return a}, f];
       expect(ArrayUtils.indexOf(test, e)).toEqual(0);
    });
});
