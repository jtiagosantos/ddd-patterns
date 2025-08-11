import { Customer } from '@/customer/domain/entities/customer';
import { Order } from '../entities/order';
import { OrderItem } from '../entities/order-item';
import { randomUUID } from 'node:crypto';

export class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error('Order must have at least one item');
    }

    const order = new Order(randomUUID(), customer.id, items);

    customer.addRewardsPoints(order.total() / 2);

    return order;
  }

  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }
}
