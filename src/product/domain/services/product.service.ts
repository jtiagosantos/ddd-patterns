import { Product } from '@/product/domain/entities/product';

export class ProductService {
  static increasePrice(products: Product[], percentage: number): Product[] {
    products.forEach((product) => {
      const price = product.price * (percentage / 100) + product.price;
      product.changePrice(price);
    });

    return products;
  }
}
