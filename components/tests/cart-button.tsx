'use client';

interface Props {
  id: number;
}

const CartButton: React.FC<Props> = ({ id }) => {
  const handleClick = () => {
    console.log('click', id);
  };

  return <button onClick={handleClick}>Add To Cart 1</button>;
};

export default CartButton;
