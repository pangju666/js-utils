import { DateUtils } from '../lib/js-utils.js';

describe("DateUtilsTest", () => {
    it("testGetTimestamp", () => {
        console.log(DateUtils.getTimestamp('2021-07-07'))
        console.log(DateUtils.getTimestamp(new Date()))
    });

    it("testFromTimeStamp", () => {
        console.log(DateUtils.fromTimeStamp('1592611200000'))
        console.log(DateUtils.fromTimeStamp(1592611200000))
    });

    it("testFormatDate", () => {
        console.log(DateUtils.formatDate(new Date()))
        console.log(DateUtils.formatDate(1592611200000))
        console.log(DateUtils.formatDate('1592611200000'))
    });
});
