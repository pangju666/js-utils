import { AxiosRequest, AxiosRequestUtils, ObjectUtils } from '../src/ index';

describe("add function", () => {
  it("deepCloneTest", () => {
   /* const obj = {a: {key: ''}}
    const objCopy = obj
    // 判断深拷贝后的对象是否与源对象为同一对象
    expect(objCopy === obj).toBeTruthy()
    expect(objCopy === obj).toBeTruthy()
    expect(ObjectUtils.deepClone(obj) === obj).toBeFalsy()
    expect(ObjectUtils.deepClone(obj) === obj).toBeFalsy()
    // 判断深拷贝后的属性是否与源对象为同一属性
    const deepCopy = ObjectUtils.deepClone(obj)
    obj.a = null
    expect(obj.a).toBeNull()
    expect(deepCopy['a']).not.toBeNull()*/
  });
});

describe("axios function", () => {
    it("axiosGet", async () => {
        /*const config = AxiosRequestUtils.getDefaultConfig()
        const request = new AxiosRequest(config)
        AxiosRequestUtils.setDefault(request)
        const res = await AxiosRequestUtils.get('127.0.0.1/test', {id: 'test'}, null)
        console.log(res);*/
    });
});
