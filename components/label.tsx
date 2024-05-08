import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode
}: {
  title: string;
  amount: string;
  currencyCode: string;
}) => {
  return (
    <div className="flex flex-col">
      <h3 className="mt-4 text-sm text-gray-700">{title}</h3>
      <Price
        className="text-lg font-medium text-gray-900"
        amount={amount}
        currencyCode={currencyCode}
        currencyCodeClassName="hidden @[275px]/label:inline"
      />
    </div>
  );
};

export default Label;
