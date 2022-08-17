import {describe, test} from "@jest/globals";
import {ObjectUtils} from "../src";

describe("StringUtils Test", () => {
  test("isEmpty Test", () => {
    const a = new String("");
    console.log(ObjectUtils.getProp(a));
  });
});
