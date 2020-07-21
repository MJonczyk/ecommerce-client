import { Category } from '../Category';

export interface CategoriesResponse {
  _embedded: EmbeddedCategories;
}

export interface EmbeddedCategories {
  categoryList: Category[];
}
