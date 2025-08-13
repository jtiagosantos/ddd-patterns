import { EventDispatcher } from '@/@shared/base/events/event-dispatcher.base';
import { Customer } from '@/customer/domain/entities/customer';
import { ChangedCustomerAddressEvent } from '@/customer/domain/events/changed-customer-address.event';
import { Address } from '@/customer/domain/value-objects/address';

export class ChangeCustomerAddressUseCase {
  constructor(private readonly eventDispatcher: EventDispatcher) {}

  execute(customerId: string) {
    // Find customer by id

    const customer = new Customer('123', 'John'); // This should be replaced with actual logic to retrieve the customer

    const newAddress = new Address('Street', 123, 'ZipCode', 'City');

    customer.changeAddress(newAddress);

    // Persist changes...

    this.eventDispatcher.notify(new ChangedCustomerAddressEvent(customer));
  }
}
