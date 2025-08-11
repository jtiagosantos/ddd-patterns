import { Order } from './checkout/domain/entities/order';
import { OrderItem } from './checkout/domain/entities/order-item';
import { Customer } from './customer/domain/entities/customer';
import { Address } from './customer/domain/value-objects/address';
import { Product } from './product/domain/entities/product';

// Customer Aggregate
const customer = new Customer('123', 'John Doe');
const address = new Address('Main St', 123, '12345', 'Anytown');
customer.changeAddress(address);
customer.activate();

// Product Aggregate
const product1 = new Product('1', 'Product 1', 50);
const product2 = new Product('2', 'Product 2', 75);

// Order Aggregate
const item1 = new OrderItem('1', 'Item 1', 100, product1.id, 2);
const item2 = new OrderItem('2', 'Item 2', 200, product2.id, 1);
const order = new Order('1', customer.id, [item1, item2]);

console.log('Customer:', customer);
console.log('Order:', order);
