import { EventHandler } from '@/@shared/base/events/event-handler.base';
import { CreatedCustomerEvent } from '../created-customer.event';

export class CreatedCustomerEvent2Handler implements EventHandler<CreatedCustomerEvent> {
  handle(event: CreatedCustomerEvent): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated');
  }
}
