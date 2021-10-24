import React, {
  FC,
  useCallback,
  useMemo,
  useReducer,
  useContext,
  createContext,
} from 'react'
import type { CardFields } from '@commerce/types/customer/card'
import type { AddressFields } from '@commerce/types/customer/address'

export type State = {
  cardFields: CardFields | {}
  addressFields: AddressFields | {}
}

type CheckoutContextType = State & {
  setCardFields: (cardFields: CardFields) => void
  setAddressFields: (addressFields: AddressFields) => void
  clearCheckoutFields: () => void
}

type Action =
  | {
      type: 'SET_CARD_FIELDS'
      card: CardFields
    }
  | {
      type: 'SET_ADDRESS_FIELDS'
      address: AddressFields
    }
  | {
      type: 'CLEAR_CHECKOUT_FIELDS'
    }

const initialState: State = {
  cardFields: {},
  addressFields: {},
}

export const CheckoutContext = createContext<State | any>(initialState)

CheckoutContext.displayName = 'CheckoutContext'

const checkoutReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CARD_FIELDS':
      return {
        ...state,
        cardFields: action.card,
      }
    case 'SET_ADDRESS_FIELDS':
      return {
        ...state,
        addressFields: action.address,
      }
    case 'CLEAR_CHECKOUT_FIELDS':
      return {
        ...state,
        cardFields: initialState.cardFields,
        addressFields: initialState.addressFields,
      }
    default:
      return state
  }
}

export const CheckoutProvider: FC = (props) => {
  const [state, dispatch] = useReducer(checkoutReducer, initialState)

  const setCardFields = useCallback(
    (card: CardFields) => dispatch({ type: 'SET_CARD_FIELDS', card }),
    [dispatch]
  )

  const setAddressFields = useCallback(
    (address: AddressFields) =>
      dispatch({ type: 'SET_ADDRESS_FIELDS', address }),
    [dispatch]
  )

  const clearCheckoutFields = useCallback(
    () => dispatch({ type: 'CLEAR_CHECKOUT_FIELDS' }),
    [dispatch]
  )

  const value = useMemo(
    () => ({
      ...state,
      setCardFields,
      setAddressFields,
      clearCheckoutFields,
    }),
    [state, setCardFields, setAddressFields, clearCheckoutFields]
  )

  return <CheckoutContext.Provider value={value} {...props} />
}

export const useCheckoutContext = () => {
  const context = useContext<CheckoutContextType>(CheckoutContext)
  if (context === undefined) {
    throw new Error(`useCheckoutContext must be used within a CheckoutProvider`)
  }
  return context
}
