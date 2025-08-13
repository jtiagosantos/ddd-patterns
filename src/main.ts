import { EventDispatcherImplementation } from './@shared/events/event-dispatcher';
import { Order } from './checkout/domain/entities/order';
import { OrderItem } from './checkout/domain/entities/order-item';
import { ChangeCustomerAddressUseCase } from './customer/application/use-cases/change-customer-address.use-case';
import { RegisterCustomerUseCase } from './customer/application/use-cases/register-customer.use-case';
import { Customer } from './customer/domain/entities/customer';
import { ChangedCustomerAddressEvent } from './customer/domain/events/changed-customer-address.event';
import { CreatedCustomerEvent } from './customer/domain/events/created-customer.event';
import { ChangedCutomerAddressEventHandler } from './customer/domain/events/handlers/changed-customer-address-event.handler';
import { CreatedCustomerEvent1Handler } from './customer/domain/events/handlers/created-customer-event-1.handler';
import { CreatedCustomerEvent2Handler } from './customer/domain/events/handlers/created-customer-event-2.handler';
import { Address } from './customer/domain/value-objects/address';
import { Product } from './product/domain/entities/product';

const eventDispatcher = new EventDispatcherImplementation();

eventDispatcher.register(CreatedCustomerEvent.name, new CreatedCustomerEvent1Handler());
eventDispatcher.register(CreatedCustomerEvent.name, new CreatedCustomerEvent2Handler());
eventDispatcher.register(
  ChangedCustomerAddressEvent.name,
  new ChangedCutomerAddressEventHandler(),
);

const registerCustomerUseCase = new RegisterCustomerUseCase(eventDispatcher);
registerCustomerUseCase.execute({ id: '123', name: 'John Doe' });

const changeCustomerAddressUseCase = new ChangeCustomerAddressUseCase(eventDispatcher);
changeCustomerAddressUseCase.execute('123');

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
