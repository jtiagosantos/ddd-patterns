import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../../../../../customer/infrastructure/database/sequelize/models/customer.model';
import { OrderModel } from '../models/order.model';
import { OrderItemModel } from '../models/order-item.model';
import { ProductModel } from '../../../../../product/infrastructure/database/sequelize/models/product.model';
import { SequelizeCustomerRepository } from '../../../../../customer/infrastructure/database/sequelize/repositories/sequelize-customer.repository';
import { SequelizeProductRepository } from '../../../../../product/infrastructure/database/sequelize/repositories/sequelize-product.repository';
import { Product } from '@/product/domain/entities/product';
import { OrderItem } from '@/checkout/domain/entities/order-item';
import { Order } from '@/checkout/domain/entities/order';
import { SequelizeOrderRepository } from './sequelize-order.repository';
import { Customer } from '@/customer/domain/entities/customer';
import { Address } from '@/customer/domain/value-objects/address';

describe('SequelizeOrderRepository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel, CustomerModel, OrderItemModel, OrderModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a new order', async () => {
    const customerRepository = new SequelizeCustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new SequelizeProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem('1', product.name, product.price, product.id, 2);

    const order = new Order('123', '123', [orderItem]);

    const orderRepository = new SequelizeOrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel!.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '123',
          product_id: '123',
        },
      ],
    });
  });
});
