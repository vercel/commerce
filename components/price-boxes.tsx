interface PriceBoxesProps {
  products: { title: string; price: string }[];
  totalWidth: number;
}

const PriceBoxes = ({ products, totalWidth }: PriceBoxesProps) => {
  return (
    <div className={`text-mainBG flex w-[${totalWidth}px] justify-center gap-[10px]`}>
      {products.map(({ title, price }) => (
        <PriceBox title={title} price={price} />
      ))}
    </div>
  );
};
export default PriceBoxes;

interface PriceBoxProps {
  title: string;
  price: string;
}

const PriceBox = ({ title, price }: PriceBoxProps) => {
  return (
    <div className="flex w-full flex-col items-center gap-[5px] rounded bg-black/50">
      <p>{title}</p>
      <p className="text-xs text-lightText/80">{price}</p>
    </div>
  );
};
