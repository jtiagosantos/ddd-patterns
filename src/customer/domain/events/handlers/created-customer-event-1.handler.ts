import { EventHandler } from '@/@shared/base/events/event-handler.base';
import { CreatedCustomerEvent } from '../created-customer.event';

export class CreatedCustomerEvent1Handler implements EventHandler<CreatedCustomerEvent> {
  handle(event: CreatedCustomerEvent): void {
    console.log('Esse é o primeiro console.log do evento: CustomerCreated');
  }
}
