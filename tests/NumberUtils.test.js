import { NumberUtils } from '../lib/js-utils.js';

describe("NumberUtilsTest", () => {
    it("testRandomInteger", () => {
        for (let i = 0; i < 10000; i++) {
            const randomInteger = NumberUtils.randomInteger(10)
            expect(randomInteger).toBeLessThanOrEqual(10);
            const randomInteger2 = NumberUtils.randomInteger(10, 1)
            expect(randomInteger2).toBeGreaterThanOrEqual(1);
        }
    });
});
