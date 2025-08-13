import { EventHandler } from '@/@shared/base/events/event-handler.base';
import { ChangedCustomerAddressEvent } from '../changed-customer-address.event';

export class ChangedCutomerAddressEventHandler
  implements EventHandler<ChangedCustomerAddressEvent>
{
  handle(event: ChangedCustomerAddressEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address.toString()}`,
    );
  }
}
