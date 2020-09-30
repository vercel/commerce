import { CommerceAPI } from 'lib/commerce/api';
import { GetAllProductsQuery } from '../schema';
import { getAllProductsQuery } from './queries/get-all-products';

export default class BigcommerceAPI implements CommerceAPI {
  getAllProducts<T = GetAllProductsQuery>(
    query: string = getAllProductsQuery
  ): Promise<T> {
    return null as any;
  }
}
