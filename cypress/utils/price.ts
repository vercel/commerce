export const destructPrice = (
  amount: string
): { currencySymbol?: string; price?: string; currencyCode?: string } => {
  const currencySymbol = amount.substring(0, 1);
  const price = amount.substring(1, amount.length - 3);
  const currencyCode = amount.slice(-3);
  return { currencySymbol, price, currencyCode };
};

export const omitSubstrings = (str: string, ...substrings: string[]): string => {
  let result = str;

  substrings.forEach((substring) => {
    const regex = new RegExp(substring, 'g');
    result = result.replace(regex, '');
  });

  return result.trim();
};
