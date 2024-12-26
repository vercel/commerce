import { Link } from './link';

export interface Webhooks {
  id: number;
  name: string;
  status: 'all' | 'active' | 'paused' | 'disabled' | string;
  topic: string;
  resource: string;
  event: string;
  hooks: string[];
  delivery_url: string;
  secret: string;
  date_created: Date;
  date_created_gmt: Date;
  date_modified: Date;
  date_modified_gmt: Date;
  links: Partial<Link>;
  context: 'view' | 'edit' | string;
  page: 1 | number;
  per_page: 10 | 25 | 50 | 100 | number;
  search: string;
  after: string;
  before: string;
  exclude: number[];
  include: number[];
  offset: number;
  order: 'asc' | 'desc' | string;
  orderby: 'id' | 'include' | 'name' | 'date' | 'title' | 'slug' | string;
  force: boolean;
}

export type WebhooksParams = Partial<Webhooks>;
