import { DomainEvent } from './domain-event.base';
import { EventHandler } from './event-handler.base';

export interface EventDispatcher {
  register(eventName: string, eventHandler: EventHandler): void;
  unregister(eventName: string, eventHandler: EventHandler): void;
  unregisterAll(): void;
  notify(event: DomainEvent): void;
}
