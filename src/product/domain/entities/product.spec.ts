import { Product } from './product';

describe('Product Entity', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Product('', 'Product 1', 100);
    }).toThrow('id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      new Product('123', '', 100);
    }).toThrow('name is required');
  });

  it('should throw error when price is less than zero', () => {
    expect(() => {
      new Product('123', 'Product 1', -1);
    }).toThrow('price must be greater than or equal to zero');
  });

  it('should change name', () => {
    const product = new Product('123', 'Product 1', 100);

    product.changeName('Product 2');
    expect(product.name).toBe('Product 2');
  });

  it('should throw an error when change name to an empty name', () => {
    const product = new Product('123', 'Product 1', 100);

    expect(() => {
      product.changeName('');
    }).toThrow('name is required');
  });

  it('should change price', () => {
    const product = new Product('123', 'Product 1', 100);

    product.changePrice(200);
    expect(product.price).toBe(200);
  });

  it('should throw an error when change price to a negative value', () => {
    const product = new Product('123', 'Product 1', 100);

    expect(() => {
      product.changePrice(-50);
    }).toThrow('price must be greater than or equal to zero');
  });
});
