import clsx from 'clsx';
import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode,
  position,
  size
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
  size?: 'large' | 'small';
}) => {
  return (
    <div
      className={clsx(
        'absolute bottom-0 left-0 flex items-center rounded-full border bg-white/80 p-1 text-black backdrop-blur-md dark:border-gray-800 dark:bg-black/80 dark:text-white',
        size === 'large' ? 'text-sm' : 'text-xs',
        position === 'center'
          ? 'mb-4 ml-4 md:mb-8 md:ml-8 lg:mb-[35%] lg:ml-20'
          : size === 'large'
          ? 'mb-4 ml-4 md:mb-8 md:ml-8'
          : 'mb-4 ml-4'
      )}
    >
      <h3 data-testid="product-name" className="mr-6 inline pl-2 font-semibold">
        {title}
      </h3>
      <Price
        className="flex-none rounded-full bg-blue-600 p-2 font-semibold text-white"
        amount={amount}
        currencyCode={currencyCode}
      />
    </div>
  );
};

export default Label;
