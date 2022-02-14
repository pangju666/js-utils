import { BooleanUtils } from '../lib/js-utils.js';

describe("BooleanUtilsTest", () => {
    it("testAnd", () => {
        expect(BooleanUtils.and(true, false, true)).toBeFalsy()
        expect(BooleanUtils.and(true)).toBeTruthy()
        expect(BooleanUtils.and(false)).toBeFalsy()
    });

    it("testOr", () => {
        expect(BooleanUtils.or(true, false, true)).toBeTruthy()
        expect(BooleanUtils.or(true)).toBeTruthy()
        expect(BooleanUtils.or(false)).toBeFalsy()
    });

    it("testNot", () => {
        expect(BooleanUtils.not(true)).toBeFalsy()
        expect(BooleanUtils.not(false)).toBeTruthy()
    });
});
