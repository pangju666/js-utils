import { StringUtils } from '../lib/js-utils.js';

describe("StringUtilsTest", () => {
    it("testIsUpperCase", () => {
        expect(StringUtils.isUpperCase('A')).toBeTruthy()
        expect(StringUtils.isUpperCase('a')).toBeFalsy()
    });

    it("testIsLowerCase", () => {
        expect(StringUtils.isLowerCase('A')).toBeFalsy()
        expect(StringUtils.isLowerCase('a')).toBeTruthy()
    });

    it("testIsEmpty", () => {
        expect(StringUtils.isEmpty('A')).toBeFalsy()
        expect(StringUtils.isEmpty('')).toBeTruthy()
        expect(StringUtils.isEmpty(null)).toBeTruthy()
    });

    it("testIsAnyEmpty", () => {
        expect(StringUtils.isAnyEmpty('A', null)).toBeTruthy()
        expect(StringUtils.isAnyEmpty('', 'Aasdasd')).toBeTruthy()
        expect(StringUtils.isAnyEmpty('asdasd', 'asdadad')).toBeFalsy()
    });

    it("testIsNoneEmpty", () => {
        expect(StringUtils.isNoneEmpty('A', null)).toBeFalsy()
        expect(StringUtils.isNoneEmpty('', 'Aasdasd')).toBeFalsy()
        expect(StringUtils.isNoneEmpty('asdasd', 'asdadad')).toBeTruthy()
    });

    it("testIsAnyEqual", () => {
        const a = ['A', '', null]
        expect(StringUtils.isAnyEqual('A', ...a)).toBeTruthy()
        expect(StringUtils.isAnyEqual(null, ...a)).toBeTruthy()
        expect(StringUtils.isAnyEqual('', ...a)).toBeTruthy()
        expect(StringUtils.isAnyEqual('asdsadasd', ...a)).toBeFalsy()
    });

    it("testIsAnyEqualsIgnoreCase", () => {
        const a = ['A', '', null]
        expect(StringUtils.isAnyEqualsIgnoreCase('A', ...a)).toBeTruthy()
        expect(StringUtils.isAnyEqualsIgnoreCase('a', ...a)).toBeTruthy()
        expect(StringUtils.isAnyEqualsIgnoreCase(null, ...a)).toBeTruthy()
        expect(StringUtils.isAnyEqualsIgnoreCase('', ...a)).toBeTruthy()
        expect(StringUtils.isAnyEqualsIgnoreCase('ASDSDSDAD', ...a)).toBeFalsy()
    });

    it("testTrimToEmpty", () => {
        expect(StringUtils.trimToEmpty('A')).toEqual('A')
        expect(StringUtils.trimToEmpty('a')).toEqual('a')
        expect(StringUtils.trimToEmpty(null)).toEqual('')
    });
});
