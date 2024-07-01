const orderTransactionFragment = /* GraphQL */ `
  fragment OrderTransaction on OrderTransaction {
    id
    processedAt
    paymentIcon {
      id
      url
      altText
    }
    paymentDetails {
      ... on CardPaymentDetails {
        last4
        cardBrand
      }
    }
    transactionAmount {
      presentmentMoney {
        ...Price
      }
    }
    giftCardDetails {
      last4
      balance {
        ...Price
      }
    }
    status
    kind
    transactionParentId
    type
    typeDetails {
      name
      message
    }
  }
`;

export default orderTransactionFragment;
