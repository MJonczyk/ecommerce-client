import { Category } from './Category';
import { ProductDetail } from './ProductDetail';

export class Product {
  id: number;
  name: string;
  description: string;
  category: Category;
  details: ProductDetail[];
}
