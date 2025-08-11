import { DomainEvent } from './domain-event.base';
import { EventDispatcher } from './event-dispatcher.base';
import { EventHandler } from './event-handler.base';

interface StubyCreatedProductEventProps {
  name: string;
  price: number;
  email: string;
}

class StubyCreatedProductEvent implements DomainEvent<StubyCreatedProductEventProps> {
  occurredAt: Date;
  eventData: StubyCreatedProductEventProps;

  constructor(eventData: StubyCreatedProductEventProps) {
    this.occurredAt = new Date();
    this.eventData = eventData;
  }
}

class StubySendEmailWhenProductIsCreatedHandler
  implements EventHandler<StubyCreatedProductEvent>
{
  handle(event: StubyCreatedProductEvent): void {
    console.log(`Sending email to ${event.eventData.email}`);
  }
}

class StubyEventDispatcher implements EventDispatcher {
  private handlers: Map<string, EventHandler[]> = new Map();

  get getEventHandlers(): { [eventName: string]: EventHandler[] } {
    const data: { [eventName: string]: EventHandler[] } = {};

    this.handlers.forEach((value, key) => {
      data[key] = value;
    });

    return data;
  }

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

describe('EventBase', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new StubyEventDispatcher();
    const eventHandler = new StubySendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register(StubyCreatedProductEvent.name, eventHandler);

    expect(eventDispatcher.getEventHandlers[StubyCreatedProductEvent.name]).toBeDefined();
    expect(eventDispatcher.getEventHandlers[StubyCreatedProductEvent.name].length).toBe(
      1,
    );
    expect(
      eventDispatcher.getEventHandlers[StubyCreatedProductEvent.name][0],
    ).toMatchObject(eventHandler);
  });

  it('should unregister an event handler', () => {
    const eventDispatcher = new StubyEventDispatcher();
    const eventHandler = new StubySendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register(StubyCreatedProductEvent.name, eventHandler);

    expect(
      eventDispatcher.getEventHandlers[StubyCreatedProductEvent.name][0],
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister(StubyCreatedProductEvent.name, eventHandler);

    expect(eventDispatcher.getEventHandlers[StubyCreatedProductEvent.name]).toBeDefined();
    expect(eventDispatcher.getEventHandlers[StubyCreatedProductEvent.name].length).toBe(
      0,
    );
  });

  it('should unregister all event handlers', () => {
    const eventDispatcher = new StubyEventDispatcher();
    const eventHandler = new StubySendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register(StubyCreatedProductEvent.name, eventHandler);

    expect(
      eventDispatcher.getEventHandlers[StubyCreatedProductEvent.name][0],
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers[StubyCreatedProductEvent.name],
    ).not.toBeDefined();
  });

  it('should notify all event handlers', () => {
    const eventDispatcher = new StubyEventDispatcher();
    const eventHandler = new StubySendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register(StubyCreatedProductEvent.name, eventHandler);

    const createdProductEvent = new StubyCreatedProductEvent({
      name: 'Product 1',
      price: 100,
      email: 'customer@example.com',
    });

    eventDispatcher.notify(createdProductEvent);

    expect(spyEventHandler).toHaveBeenCalledWith(createdProductEvent);
  });
});
