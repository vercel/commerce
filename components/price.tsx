const Price = ({
  amount,
  className,
  currencyCode = 'SEK'
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} className={className}>
    {`${new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'code',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(parseFloat(amount))}`}
  </p>
);

export default Price;
