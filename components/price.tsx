import clsx from 'clsx';

const Price = ({
  amount,
  className,
  currencyCode = 'EUR',
  currencyCodeClassName
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} className={className} data-test="price-amount">
    {`${new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol'
    }).format(parseFloat(amount))}`}
    <span
      className={clsx('ml-1 inline', currencyCodeClassName)}
      data-test="price-currency-code"
    >{`${currencyCode}`}</span>
  </p>
);

export default Price;
