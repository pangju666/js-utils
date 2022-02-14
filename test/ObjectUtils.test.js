import { ObjectUtils } from '../lib/js-utils.js';

describe("ObjectUtilsTest", () => {
    it("testIsNotNull", () => {
        expect(ObjectUtils.isNotNull(null)).toBeFalsy()
        expect(ObjectUtils.isNotNull('')).toBeTruthy()
    });

    it("testIsNull", () => {
        expect(ObjectUtils.isNull(null)).toBeTruthy()
        expect(ObjectUtils.isNull('')).toBeFalsy()
    });

    it("testIsExistProperty", () => {
        const testObj = {a: '', b: null}
        expect(ObjectUtils.isExistProperty(testObj, 'a')).toBeTruthy()
        expect(ObjectUtils.isExistProperty(testObj, 'c')).toBeFalsy()
    });

    it("testIsNullProperty", () => {
        const testObj = {a: '', b: null}
        expect(ObjectUtils.isNullProperty(testObj, 'b')).toBeTruthy()
        expect(ObjectUtils.isNullProperty(testObj, 'a')).toBeFalsy()
    });

    it("testGetSafeValue", () => {
        expect(ObjectUtils.getSafeValue(null, '')).toEqual('')
        expect(ObjectUtils.getSafeValue(undefined, '')).toEqual('')
        expect(ObjectUtils.getSafeValue(18, 20, value => value > 18)).toEqual(20)
    });

    it("testGetSafeProperty", () => {
        const testObj = {a: 'hello', b: null}
        expect(ObjectUtils.getSafeProperty(testObj, 'b', '')).toEqual('')
        expect(ObjectUtils.getSafeProperty(testObj, 'c', '')).toEqual('')
        expect(ObjectUtils.getSafeProperty(testObj, 'a', '')).toEqual('hello')
    });

    it("testGetSafeObject", () => {
        const testObj = {a: 'hello', b: null, c: undefined}
        expect(ObjectUtils.getSafeObject(testObj, {a: '', b: ''})).toEqual({a: 'hello', b: ''})
        expect(ObjectUtils.getSafeObject(testObj, {a: '', b: '', c: ''})).toEqual({a: 'hello', b: '', c: ''})
        expect(ObjectUtils.getSafeObject(testObj, {})).toEqual({a: 'hello', b: null})
    });

    it("testDeepClone", () => {
        const testStr = 'test'
        const testObj = {a: 'hello', b: null}
        expect(ObjectUtils.deepClone(testObj) == testObj).toBeFalsy()
        expect(ObjectUtils.deepClone(testStr) == testStr).toBeTruthy()
    });
});
