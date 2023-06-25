import { ReadonlyURLSearchParams } from 'next/navigation';

export const createUrl = (
  pathname: string,
  params: Readonly<URLSearchParams> | ReadonlyURLSearchParams
): string => {
  const paramsString = params.toString();
  const queryString = paramsString ? `?${paramsString}` : '';

  return `${pathname}${queryString}`;
};
