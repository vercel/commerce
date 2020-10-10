import useCart from './use-cart'

export default function useOpenCheckout() {
  const { data, mutate } = useCart()

  return async function openCheckout() {
    window.open(data?.redirect_urls.checkout_url)
    console.log('URL1', data?.redirect_urls.checkout_url)
    // Get new redirect urls
    await mutate()
  }
}
