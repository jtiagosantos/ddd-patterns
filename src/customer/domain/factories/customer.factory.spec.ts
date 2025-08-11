import { Address } from '../value-objects/address';
import { CustomerFactory } from './customer.factory';

describe('Customer Factory', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('John Doe');

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John Doe');
    expect(customer.address).toBeUndefined();
  });

  it('should create a customer with an address', () => {
    const address = new Address('Street', 999, 'Zip', 'City');

    const customer = CustomerFactory.createWithAddress('John Doe', address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John Doe');
    expect(customer.address).toBe(address);
  });
});
