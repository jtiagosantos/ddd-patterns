/* eslint-disable @typescript-eslint/no-explicit-any */

export interface DomainEvent<T = any> {
  occurredAt: Date;
  eventData: T;
}
