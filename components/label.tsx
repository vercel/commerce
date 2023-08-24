import clsx from 'clsx';
import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode,
  size
}: {
  title: string;
  amount: string;
  currencyCode: string;
  size?: string;
}) => {
  return (
    <div className={clsx('@container/label')}>
      <div className="flex flex-col space-y-2">
        <h3 className="mr-4 line-clamp-2 grow font-serif text-3xl tracking-wider md:text-4xl">
          {title}
        </h3>
        <div className="font-multilingual flex flex-row items-center space-x-2 text-[17px]">
          <Price
            className="flex-none"
            amount={amount}
            currencyCode={currencyCode}
            currencyCodeClassName="hidden @[275px]/label:inline"
          />
          {!!size && (
            <>
              <div>/</div>
              <div>{size}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Label;
