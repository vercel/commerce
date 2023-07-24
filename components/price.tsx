const Price = ({
  amount,
  currencyCode = 'USD',
  ...props
}: {
  amount: string;
  currencyCode: string;
} & React.ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} {...props}>
    {`${new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol'
    }).format(parseFloat(amount))}`}
    <span className="hidden @[275px]/label:inline">{` ${currencyCode}`}</span>
  </p>
);

export default Price;
