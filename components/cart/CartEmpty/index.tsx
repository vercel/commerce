import { Bag } from '@components/icons'
import { Button } from '@components/ui'

const CartEmpty: React.FC = () => {
  return (
    <div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
      <span className="border border-dashed border-secondary rounded-full flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-primary">
        <Bag className="absolute" />
      </span>
      <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
        Your cart is empty
      </h2>
      <p className="text-accents-6 px-10 text-center pt-2">
        Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
      </p>
      <Button href="/" Component="a" className="block mt-8">
        Continue Shopping
      </Button>
    </div>
  )
}

export default CartEmpty
