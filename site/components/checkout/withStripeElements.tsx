import React, { Component } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

export default function withStripeElements(WrappedComponent) {
  const stripe = loadStripe(process.env.STRIPE_PUBLIC_API_KEY)

  return class extends Component {
    static displayName = "withStripeElements"

    render() {
      return (
        <Elements stripe={stripe}>
          <WrappedComponent {...this.props} />
        </Elements>
      );
    }
  };
}
