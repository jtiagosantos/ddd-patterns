import { Order } from '@/checkout/domain/entities/order';
import { OrderItemModel } from '../models/order-item.model';
import { OrderModel } from '../models/order.model';
import { OrderItem } from '@/checkout/domain/entities/order-item';
import { OrderRepository } from '@/checkout/domain/repositories/order.repository';

export class SequelizeOrderRepository implements OrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      },
    );
  }

  async update(entity: Order): Promise<void> {
    const order = await OrderModel.findByPk(entity.id);

    if (!order) throw new Error('Order not found');

    order.total = entity.total();

    await OrderItemModel.destroy({ where: { order_id: entity.id } });

    const items = entity.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      product_id: item.productId,
      quantity: item.quantity,
      order_id: entity.id,
    }));

    await OrderItemModel.bulkCreate(items);

    await order.save();
  }

  async find(id: string): Promise<Order> {
    let orderModel;

    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        include: ['items'],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error('Order not found');
    }

    const order = new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity,
        );
      }),
    );

    return order;
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: ['items'],
    });

    return orderModels.map((orderModel) => {
      return new Order(
        orderModel.id,
        orderModel.customer_id,
        orderModel.items.map((item) => {
          return new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity,
          );
        }),
      );
    });
  }
}
