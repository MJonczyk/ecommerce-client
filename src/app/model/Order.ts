import { OrderItem } from './OrderItem';

export class Order {
  id: number;
  totalPrice: number;
  status: string;
  items: OrderItem[];
}
