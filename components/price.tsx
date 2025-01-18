const Price = ({
  amount,
  className,
  currencyCode = 'USD',
  needSplit = false,
  currencyCodeClassName
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  needSplit?: boolean;
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} className={className}>
    {`${new Intl.NumberFormat(undefined, {
      style: 'currency',

      currency: currencyCode,
      currencyDisplay: 'narrowSymbol'
    }).format(parseFloat(amount) / (needSplit ? 100 : 1))}`}
  </p>
);

export default Price;
