import { Repository } from '@/@shared/base/repositories/repository.base';
import { Customer } from '../entities/customer';

export interface CustomerRepository extends Repository<Customer> {}
