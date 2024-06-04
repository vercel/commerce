'use client';

import { addProductToCart } from '@commerce/api/cart';
import { useFormState, useFormStatus } from 'react-dom';

interface Props {
  id: number | string;
}

const CartButton: React.FC<Props> = ({ id }) => {
  const handleClick = async () => await addProductToCart(id);

  const [, formAction] = useFormState(handleClick, null);
  const { pending } = useFormStatus();

  return (
    <form action={formAction}>
      <button className="button" disabled={pending}>
        Add To Cart
      </button>
    </form>
  );
};

export default CartButton;
