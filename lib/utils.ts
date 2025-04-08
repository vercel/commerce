import { ReadonlyURLSearchParams } from 'next/navigation';
import countries from '../types/countries.json';

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;

export const getCountries = (): { name: string; icon: string; code: string }[] =>
  (countries as { name: string; emoji: string; code: string }[]).map(({ name, emoji, code }) => ({
    name,
    icon: emoji,
    code
  }));

export const isStrinInteger = (value: string) => {
  const parsed = parseInt(value, 10);

  return !isNaN(parsed) && parsed.toString() === value.trim();
};
