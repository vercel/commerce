export interface IOAuthToken {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token: string;
  created_at: number;
}

export interface IToken {
  order_token?: string;
  bearer_token?: string;
}

export type ProductId = string | number;

export interface Product {
  type: string;
  id: string;
  attributes: Object;
  relationships: Object;
}
