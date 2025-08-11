import { ProductInterface } from '../interfaces/product.interface';

export class Product implements ProductInterface {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;

    this.validateId();
    this.validateName();
    this.validatePrice();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  changeName(name: string): void {
    this._name = name;
    this.validateName();
  }

  changePrice(price: number): void {
    this._price = price;
    this.validatePrice();
  }

  private validateId() {
    if (!this._id) {
      throw new Error('id is required');
    }
  }

  private validateName() {
    if (!this._name) {
      throw new Error('name is required');
    }
  }

  private validatePrice() {
    if (this._price < 0) {
      throw new Error('price must be greater than or equal to zero');
    }
  }
}
