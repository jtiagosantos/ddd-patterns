import { Address } from '../value-objects/address';
import { Customer } from './customer';

describe('Customer Entity', () => {
  it('should create a customer with valid id and name', () => {
    const customer = new Customer('123', 'John Doe');

    expect(customer).toBeDefined();
    expect(customer.id).toBe('123');
    expect(customer.name).toBe('John Doe');
  });

  it('should throw error when id is empty', () => {
    expect(() => {
      new Customer('', 'John');
    }).toThrow('id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      new Customer('123', '');
    }).toThrow('name is required');
  });

  it('should be able to change name', () => {
    const customer = new Customer('123', 'John');

    customer.changeName('Ada');

    expect(customer.name).toBe('Ada');
  });

  it('should throw error when changing name to empty', () => {
    const customer = new Customer('123', 'John');

    expect(() => {
      customer.changeName('');
    }).toThrow('name is required');
  });

  it('should be able to change address', () => {
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 123, '13330-250', 'São Paulo');

    expect(customer.address).toBeUndefined();

    customer.changeAddress(address);

    expect(customer.address).toEqual(address);
  });

  it('should be able to activate customer', () => {
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 123, '13330-250', 'São Paulo');
    customer.changeAddress(address);

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it('should throw error when address is undefined when you activate a customer', () => {
    expect(() => {
      const customer = new Customer('1', 'Customer 1');
      customer.activate();
    }).toThrow('Cannot activate customer without an address');
  });

  it('should deactivate customer', () => {
    const customer = new Customer('1', 'Customer 1');

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it('should add rewards points', () => {
    const customer = new Customer('1', 'Customer 1');
    expect(customer.rewardsPoints).toBe(0);

    customer.addRewardsPoints(10);
    expect(customer.rewardsPoints).toBe(10);

    customer.addRewardsPoints(22);
    expect(customer.rewardsPoints).toBe(32);
  });

  it('should not allow adding negative rewards points', () => {
    const customer = new Customer('1', 'Customer 1');

    expect(() => {
      customer.addRewardsPoints(-5);
    }).toThrow('Points cannot be negative');
  });
});
