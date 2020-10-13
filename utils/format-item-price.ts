import formatPrice from './format-price'

export default function formatVariantPrice({
  listPrice,
  salePrice,
  currencyCode,
  locale,
}: {
  listPrice: number
  salePrice: number
  currencyCode: string
  locale: string
}) {
  const hasDiscount = listPrice > salePrice
  const formatDiscount = new Intl.NumberFormat(locale, { style: 'percent' })
  const discount = hasDiscount
    ? formatDiscount.format((listPrice - salePrice) / listPrice)
    : null

  const price = formatPrice({ amount: salePrice, currencyCode, locale })
  const compareAtPrice = hasDiscount
    ? formatPrice({ amount: listPrice, currencyCode, locale })
    : null

  return { price, compareAtPrice, discount }
}
