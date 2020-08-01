import { Product } from '../Product';
import {PageMetadata} from './PageMetadata';

export interface ProductsResponse {
  _embedded: EmbeddedProducts;
  page: PageMetadata;
}

export interface EmbeddedProducts {
  productList: Product[];
}
