import { ConvertUtils } from '../lib/js-utils.js';

describe("ConvertUtilsTest", () => {
    it("testConvertObjectPropertyName", () => {
        const obj = {name: 'test', test: 'name', a: 1}
        const newObj = ConvertUtils.convertObjectPropertyName(obj, propertyName => propertyName + '_test')
        // eslint-disable-next-line no-prototype-builtins
        expect(newObj.hasOwnProperty('test_test')).toBeTruthy();
        expect(newObj.name_test).toEqual(obj.name);
        newObj.name_test = 'asdsadad'
        expect(newObj.name_test).not.toEqual(obj.name);
        console.log(newObj)
    });

    it("testPropertyNamesToCamlCase", () => {
        const obj = {user_name: 'test', test_case: 'name'}
        const newObj = ConvertUtils.propertyNamesToCamlCase(obj)
        // eslint-disable-next-line no-prototype-builtins
        expect(newObj.hasOwnProperty('userName')).toBeTruthy();
        // eslint-disable-next-line no-prototype-builtins
        expect(newObj.hasOwnProperty('testCase')).toBeTruthy();
    });

    it("testPropertyNamesToUnderLine", () => {
        const obj = {userName: 'test', testCase: 'name'}
        const newObj = ConvertUtils.propertyNamesToCamlCase(obj)
        // eslint-disable-next-line no-prototype-builtins
        expect(newObj.hasOwnProperty('user_name')).toBeTruthy();
        // eslint-disable-next-line no-prototype-builtins
        expect(newObj.hasOwnProperty('test_case')).toBeTruthy();
    });
});
