import { Address } from '../value-objects/address';

export class Customer {
  private _id: string;
  private _name: string;
  private _address: Address;
  private _active: boolean = true;
  private _rewardsPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

    this.validateId();
    this.validateName();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  get rewardsPoints(): number {
    return this._rewardsPoints;
  }

  isActive(): boolean {
    return this._active;
  }

  changeName(name: string) {
    this._name = name;
    this.validateName();
  }

  activate() {
    if (!this._address) {
      throw new Error('Cannot activate customer without an address');
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  addRewardsPoints(points: number) {
    if (points < 0) {
      throw new Error('Points cannot be negative');
    }

    this._rewardsPoints += points;
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
}
