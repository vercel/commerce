import { ajax } from 'lib/shopify/ajax';
import { Config } from 'lib/shopify/payload-types';
import qs from 'qs';

type Collection = keyof Config['collections'];

const OPERATORS = [
  'equals',
  'contains',
  'not_equals',
  'in',
  'all',
  'not_in',
  'exists',
  'greater_than',
  'greater_than_equal',
  'less_than',
  'less_than_equal',
  'like',
  'within',
  'intersects',
  'near'
] as const;

type Operator = (typeof OPERATORS)[number];
type WhereField = {
  [key in Operator]?: unknown;
};
type Where = {
  [key: string]: Where[] | WhereField;
  and?: Where[];
  or?: Where[];
};

export type PaginatedDocs<T> = {
  docs: T[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage?: null | number;
  page?: number;
  pagingCounter: number;
  prevPage?: null | number;
  totalDocs: number;
  totalPages: number;
};

type FindParams = {
  where?: Where;
  depth?: number;
  sort?: string;
  page?: number;
  limit?: number;
};

export const find = <T>(collection: string, params: FindParams) => {
  const query = qs.stringify(params, { addQueryPrefix: true });

  const url = `${process.env.CMS_URL}/api/${collection}${query}`;
  return ajax<PaginatedDocs<T>>('GET', url);
};

export const findByID = <T>(collection: string, id: string) => {
  const url = `${process.env.CMS_URL}/api/${collection}/${id}`;
  return ajax<T>('GET', url);
};
