import campaignFragment from './campaign';
import priceFragment from './price';
import stockFragment from './stock';

const cartFragment = /* GraphQL */ `
  fragment Cart on CartType {
    id
    promoCode
    appliedCampaigns {
      ...Campaign
    }
    items {
      id
      campaign {
        appliedCampaigns {
          ...Campaign
        }
        prices {
          price {
            ...Price
          }
          quantity
        }
      }
      unitPrice {
        ...Price
      }
      product {
        productId
        articleNumber
        brand {
          name
        }
        name
        productImages {
          fileName
        }
        alias
        canonicalUrl
        primaryCategory {
          name
        }
        skus {
          skuId
          name
          stock {
            ...Stock
          }
        }
        unitPrice {
          ...Price
        }
      }
      quantity
      skuId
      totalPrice {
        ...Price
      }
    }
    summary {
      fixedAmountDiscountIncVat
      fixedAmountDiscountExVat
      balance {
        pending
        pendingFormatted
        totalSellingPriceExBalanceExVat
        totalSellingPriceExBalanceIncVat
        totalSellingPriceExBalanceIncVatFormatted
      }
      subTotal {
        regularPriceIncVatFormatted
        regularPriceExVatFormatted
        sellingPriceIncVatFormatted
        sellingPriceExVatFormatted
        sellingPriceExVat
        sellingPriceIncVat
        vat
      }
      shipping {
        amountLeftToFreeShipping
        amountLeftToFreeShippingFormatted
        feeExVatFormatted
        feeIncVatFormatted
        feeIncVat
        feeExVat
        isDefault
      }
      total {
        isDiscounted
        sellingPriceIncVatFormatted
        sellingPriceExVatFormatted
        sellingPriceIncVat
        sellingPriceExVat
        discountIncVatFormatted
        discountExVatFormatted
        discountExVat
        discountIncVat
        vatFormatted
        vat
      }
    }
  }
  ${priceFragment}
  ${stockFragment}
  ${campaignFragment}
`;
export default cartFragment;
