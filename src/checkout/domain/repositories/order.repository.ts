import { Repository } from '@/@shared/base/repositories/repository.base';
import { Order } from '../entities/order';

export interface OrderRepositoryInterface extends Repository<Order> {}
