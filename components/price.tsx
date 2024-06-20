import clsx from 'clsx';

const Price = ({
  amount,
  className,
  as,
  currencyCode = 'USD',
  currencyCodeClassName,
  showCurrency = false
}: {
  amount: string;
  as?: 'p' | 'span';
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
  showCurrency?: boolean;
} & React.ComponentProps<'p'>) => {
  // Convert string to float and check if it is zero
  const price = parseFloat(amount);

  // Return 'Included' if price is 0
  if (price === 0) {
    return <p className={className}>Included</p>;
  }

  const Component = as || 'p';
  // Otherwise, format and display the price
  return (
    <Component suppressHydrationWarning={true} className={className}>
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
