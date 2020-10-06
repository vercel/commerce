import { Trash } from '@components/icon'

const CartItem = () => {
  return (
    <li className="flex flex-row space-x-6">
      <div className="h-12 w-12 bg-violet"></div>
      <div className="flex-1 flex flex-col">
        <span>T-Shirt</span>
        <div className="py-2">
          <span>-</span>
          <input
            className="w-6 border-gray-300 border mx-3 rounded text-center text-sm"
            defaultValue="1"
          />
          <span>+</span>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <span>$50.00</span>
        <span className="flex justify-end">
          <Trash />
        </span>
      </div>
    </li>
  )
}

export default CartItem
