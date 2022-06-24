import { describe, test, expect } from "@jest/globals";
import { StringUtils } from "src/util/StringUtils";

describe("StringUtils Test", () => {
  test("isEmpty Test", () => {
    expect(StringUtils.isEmpty("")).toBeTruthy();
  });
});
