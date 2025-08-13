import { DomainEvent } from '../base/events/domain-event.base';
import { EventDispatcher } from '../base/events/event-dispatcher.base';
import { EventHandler } from '../base/events/event-handler.base';

export class EventDispatcherImplementation implements EventDispatcher {
  private handlers: Map<string, EventHandler[]> = new Map();

  register(eventName: string, eventHandler: EventHandler): void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }

    this.handlers.get(eventName)!.push(eventHandler);
  }

  unregister(eventName: string, eventHandler: EventHandler): void {
    if (!this.handlers.has(eventName)) {
      return;
    }

    const handlers = this.handlers.get(eventName)!;
    const index = handlers.indexOf(eventHandler);

    if (index !== -1) {
      handlers.splice(index, 1);
    }
  }

  unregisterAll(): void {
    this.handlers.clear();
  }

  notify(event: DomainEvent): void {
    const eventName = event.constructor.name;

    if (!this.handlers.has(eventName)) {
      return;
    }

    const handlers = this.handlers.get(eventName)!;

    handlers.forEach((handler) => {
      handler.handle(event);
    });
  }
}
