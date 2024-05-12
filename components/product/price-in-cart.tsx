const PriceInCart = ({ items }) => {
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="mt-4 border-t border-neutral-300 p-4">
      <ul>
        {items.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item.label}</span>
            <span>${item.price.toFixed(2)}</span>
          </li>
        ))}
        <li className="mt-2 flex justify-between border-t border-neutral-300 pt-2 font-bold">
          <span>Total In Cart</span>
          <span>${totalPrice.toFixed(2)}</span>
        </li>
      </ul>
    </div>
  );
};

export default PriceInCart;
