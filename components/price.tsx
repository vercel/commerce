import clsx from 'clsx';
import { JSXElementConstructor } from 'react';

const Price = ({
  amount,
  className,
  as: Component = 'p',
  currencyCode = 'USD',
  currencyCodeClassName,
  showCurrency = false,
  prefix
}: {
  amount: string;
  as?: keyof JSX.IntrinsicElements | JSXElementConstructor<any>;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
  showCurrency?: boolean;
  prefix?: string;
} & React.ComponentProps<'p'>) => {
  // Convert string to float and check if it is zero
  const price = parseFloat(amount);

  // Return 'Included' if price is 0
  if (price === 0) {
    return <p className={className}>Included</p>;
  }

  // Otherwise, format and display the price
  return (
    <Component suppressHydrationWarning={true} className={className}>
      {prefix}
      {new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'narrowSymbol'
      }).format(price)}
      {showCurrency && (
        <span className={clsx('ml-1 inline', currencyCodeClassName)}>{currencyCode}</span>
      )}
    </Component>
  );
};

export default Price;
