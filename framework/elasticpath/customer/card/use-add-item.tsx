import { useCallback } from 'react'
import useAddItem, { UseAddItem } from '@commerce/customer/card/use-add-item'
import { MutationHook } from '@commerce/utils/types'
import useCard from './use-cards';

export default useAddItem as UseAddItem<typeof handler>
console.log("inside add card item ");

export const handler: MutationHook<any> = {
  
  fetchOptions: {
    query: '',
  },
  async fetcher({ input, options, fetch }) {
    console.log("inside add  card item handler ", input );
    const data = input;
    return data ;

  },
  useHook: ({ fetch }) => () => {
    const { mutate } = useCard()
  
    return useCallback(
      async function addItem(input) {
        const data = await fetch({ input })
        const cardData = data ;
        await mutate(cardData, true)
        return cardData
      },
      [fetch, mutate]
    )
  },
}


