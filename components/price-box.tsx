interface PriceBoxProps {
  title: string;
  price: number;
}

export const PriceBox = ({ title, price }: PriceBoxProps) => {
  return (
    <div className="flex w-full flex-col items-center gap-[5px] rounded bg-black/50 p-2">
      <p>{title}</p>
      <p className="text-xs text-lightText/80">£{price.toLocaleString('en-GB')}</p>
    </div>
  );
};
