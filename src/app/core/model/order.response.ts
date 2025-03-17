import {Order} from './order';

export interface OrderResponse {
  orders: Order[];
  totalItems: number;
}
