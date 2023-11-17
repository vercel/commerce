import {
  TypedMoney as CommercetoolsTypedMoney,
  Image as CommercetoolsImage,
  CentPrecisionMoney,
  HighPrecisionMoney,
  TypedMoney
} from "@commercetools/platform-sdk";
import { Image, Money } from "./types";

export function reshapeMoney(typedMoney: TypedMoney): Money {
  const { fractionDigits, currencyCode, type } = typedMoney;
  const typedAmount = type === "centPrecision" ? typedMoney.centAmount : typedMoney.preciseAmount;

  const amount = (typedAmount / Math.pow(10, fractionDigits)).toString();
  return { amount, currencyCode };
}

export function reshapeImage(image: CommercetoolsImage): Image {
  return {
    url: image.url,
    width: image.dimensions.w,
    height: image.dimensions.h,
    altText: image.label || ""
  };
}
