import useGetCheckout from "./use-get-checkout"
import useSubmitCheckout from "./use-submit-checkout";
import useAddPayment from "../customer/card/use-add-item"
import useAddShipping from "../customer/address/use-add-item"

export type UseCheckout = any;

function useCheckout(): UseCheckout {
  const state = useGetCheckout()
  const actions = {
    submit: useSubmitCheckout(),
    addPayment: useAddPayment(),
    addShipping: useAddShipping()
  }

  return {...state, ...actions}
}

export default useCheckout
