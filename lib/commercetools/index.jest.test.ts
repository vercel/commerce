import { reshapeMoney, reshapeImage } from ".";
import {
  CentPrecisionMoney as CommercetoolsCentPrecisionMoney,
  HighPrecisionMoney as CommercetoolsHighPrecisionMoney
} from "@commercetools/platform-sdk";

describe("reshape & fetch functions", () => {
  describe("reshapeMoney", () => {
    it("returns correct amount for cent precision", () => {
      const centPrecisionMoney: CommercetoolsCentPrecisionMoney = {
        type: "centPrecision",
        centAmount: 1001,
        currencyCode: "EUR",
        fractionDigits: 2
      };

      const result = reshapeMoney(centPrecisionMoney);

      const expectedResult = { amount: "10.01", currencyCode: "EUR" };
      expect(result).toEqual(expectedResult);
    });

    it("returns correct amount for high precision", () => {
      const highPrecisionMoney: CommercetoolsHighPrecisionMoney = {
        type: "highPrecision",
        preciseAmount: 100001,
        centAmount: 1000,
        currencyCode: "EUR",
        fractionDigits: 4
      };

      const result = reshapeMoney(highPrecisionMoney);

      const expectedResult = { amount: "10.0001", currencyCode: "EUR" };
      expect(result).toEqual(expectedResult);
    });
  });

  describe("reshapeImage", () => {
    it("returns correctly reshaped image with alt text", () => {
      const image = {
        url: "an-url",
        dimensions: { w: 800, h: 600 },
        label: "a-label"
      };

      const result = reshapeImage(image);

      const expectedResult = { url: "an-url", width: 800, height: 600, altText: "a-label" };

      expect(result).toEqual(expectedResult);
    });

    it("returns correctly reshaped image with empty string as alt text", () => {
      const image = {
        url: "an-url",
        dimensions: { w: 800, h: 600 }
      };

      const result = reshapeImage(image);

      const expectedResult = { url: "an-url", width: 800, height: 600, altText: "" };

      expect(result).toEqual(expectedResult);
    });
  });
});
