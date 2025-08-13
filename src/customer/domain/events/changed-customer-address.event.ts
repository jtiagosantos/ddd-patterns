import { DomainEvent } from '@/@shared/base/events/domain-event.base';
import { Customer } from '../entities/customer';

export class ChangedCustomerAddressEvent implements DomainEvent<Customer> {
  eventData: Customer;
  occurredAt: Date;

  constructor(eventData: Customer) {
    this.eventData = eventData;
    this.occurredAt = new Date();
  }
}
