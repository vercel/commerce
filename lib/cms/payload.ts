import { ajax } from 'lib/cms/ajax';
import { Config } from 'lib/cms/payload-types';
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
  // eslint-disable-next-line no-unused-vars
  [key in Operator]?: unknown;
};
export type Where = {
  [key: string]: Where[] | WhereField | undefined;
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

type Doc<T> = {
  message: string;
  doc: T;
};

type BaseParams = {
  depth?: number;
};

type FindParams = BaseParams & {
  where?: Where;
  depth?: number;
  sort?: string;
  page?: number;
  limit?: number;
};

type PayloadOptions = {
  baseUrl?: string;
};

export class Payload {
  readonly baseUrl?: string;

  constructor({ baseUrl }: PayloadOptions) {
    this.baseUrl = baseUrl;
  }

  find = <T>(collection: Collection, params: FindParams = {}) => {
    const query = qs.stringify(params, { addQueryPrefix: true });
    const url = `${this.baseUrl}/api/${collection}${query}`;
    return ajax<PaginatedDocs<T>>('GET', url);
  };

  findByID = <T>(collection: Collection, id: string, params: BaseParams = {}) => {
    const query = qs.stringify(params, { addQueryPrefix: true });
    const url = `${this.baseUrl}/api/${collection}/${id}${query}`;
    return ajax<T>('GET', url);
  };

  create = <T extends object>(collection: Collection, body: Partial<T>) => {
    const url = `${this.baseUrl}/api/${collection}`;
    return ajax<Doc<T>>('POST', url, body);
  };

  update = <T extends object>(collection: Collection, id: string, body: Partial<T>) => {
    const url = `${this.baseUrl}/api/${collection}/${id}`;
    return ajax<Doc<T>>('PATCH', url, body);
  };
}
