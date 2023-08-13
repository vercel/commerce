import clsx from 'clsx';
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
    <div className={clsx('@container/label')}>
      <div className="flex flex-col space-y-2">
        <h3 className="mr-4 line-clamp-2 flex-grow text-3xl">{title}</h3>
        <Price
          className="flex-none"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
