import { ReadonlyURLSearchParams } from 'next/navigation';
import countries from '../types/countries.json';

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;

export const getCountries = (): { name: string; icon: string }[] =>
  (countries as { country: string; flag_base64: string }[]).map(({ country, flag_base64 }) => ({
    name: country,
    icon: flag_base64
  }));

export const isStrinInteger = (value: string) => {
  const parsed = parseInt(value, 10);
  
  return !isNaN(parsed) && parsed.toString() === value.trim();
}
