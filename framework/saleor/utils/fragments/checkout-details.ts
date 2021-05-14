export const CheckoutDetails = `
  id
  token
  created

  totalPrice {
    currency
    gross {
      amount
    }
  }
  subtotalPrice {
    currency
    gross {
      amount
    }
  }

  lines {
    id
    variant {
      id
      name
      sku
      product {
        slug
      }
      media {
        url
      }
      pricing {
        price {
          gross {
            amount
          }
        }
        
      }
    }
    quantity
    totalPrice {
      currency
      gross {
        amount
      }
    }
  }
`