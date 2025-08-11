import { OrderItem } from './order-item';

export class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  private validate() {
    if (this._id.length === 0) {
      throw new Error('id is required');
    }
    if (this._customerId.length === 0) {
      throw new Error('customerId is required');
    }
    if (this._items.length === 0) {
      throw new Error('items are required');
    }
    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error('quantity must be greater than 0');
    }
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.total(), 0);
  }
}
