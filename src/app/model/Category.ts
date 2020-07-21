import { Feature } from './Feature';

export interface Category {
  id: number;
  name: string;
  features: Feature[];
}
