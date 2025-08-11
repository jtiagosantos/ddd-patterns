import { Repository } from '@/@shared/base/repositories/repository.base';
import { Product } from '../entities/product';

export interface ProductRepository extends Repository<Product> {}
