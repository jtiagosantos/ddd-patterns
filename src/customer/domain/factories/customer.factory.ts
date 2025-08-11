import { randomUUID } from 'node:crypto';
import { Customer } from '../entities/customer';
import { Address } from '../value-objects/address';

export class CustomerFactory {
  static create(name: string): Customer {
    const id = randomUUID();

    return new Customer(id, name);
  }

  static createWithAddress(name: string, address: Address): Customer {
    const id = randomUUID();

    const customer = new Customer(id, name);
    customer.changeAddress(address);

    return customer;
  }
}
