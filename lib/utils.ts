import { MedusaProductOption } from './medusa/types';

export const createUrl = (pathname: string, params: URLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const mapOptionIds = (productOptions: MedusaProductOption[]) => {
  // Maps the option titles to their respective ids
  const map: Record<string, string> = {};
  productOptions.forEach((option) => {
    map[option.id] = option.title;
  });
  return map;
};
