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
      className={clsx('absolute bottom-0 left-0 flex w-full px-4 pb-4', {
        'px-4 pb-4 md:px-8 md:pb-8 lg:px-20 lg:pb-[35%]': position === 'center',
        'px-4 pb-4 md:px-8 md:pb-8': size === 'large'
      })}
    >
      <div
        className={clsx(
          'flex items-center rounded-full border bg-white/80 p-1 text-xs text-black backdrop-blur-md dark:border-gray-800 dark:bg-black/80 dark:text-white',
          {
            'text-sm': size === 'large'
          }
        )}
      >
        <h3
          data-testid="product-name"
          className="mr-6 inline pl-2 font-semibold leading-none tracking-tight"
        >
          {title}
        </h3>
        <Price
          className="flex-none rounded-full bg-blue-600 p-2 font-semibold text-white"
          amount={amount}
          currencyCode={currencyCode}
        />
      </div>
    </div>
  );
};

export default Label;
