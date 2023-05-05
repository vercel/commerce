const Price = ({
  className,
  amount,
  currencyCode,
  ...props
}: {
  amount: string;
  currencyCode: string | 'SEK' | 'GPB';
  className?: string;
} & React.ComponentProps<'p'>) => (
  <p className={className} suppressHydrationWarning={true} {...props}>
    
    {`${new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol'
    }).format(parseFloat(amount))} ${currencyCode}`}
    
  </p>
);

export default Price;
