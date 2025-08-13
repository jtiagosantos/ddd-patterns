import { EventDispatcher } from '@/@shared/base/events/event-dispatcher.base';
import { Customer } from '@/customer/domain/entities/customer';
import { CreatedCustomerEvent } from '@/customer/domain/events/created-customer.event';
import { RegisterCustomerInput } from './inputs/register-customer.input';

export class RegisterCustomerUseCase {
  constructor(private readonly eventDispatcher: EventDispatcher) {}

  execute(input: RegisterCustomerInput) {
    const customer = new Customer(input.id, input.name);

    //Persist customer...

    const event = new CreatedCustomerEvent(customer);

    this.eventDispatcher.notify(event);
  }
}
