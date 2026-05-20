import { PaginatedResult, PaginationInput } from '../../shared/pagination.types';
import { CreateProductInput } from '../dto/create-product.dto';
import { UpdateProductInput } from '../dto/update-product.dto';
import { ProductEntity } from '../entities/product.entity';

export const PRODUCTS_REPOSITORY = 'PRODUCTS_REPOSITORY';

export interface ProductsRepository {
  findAll(name?: string, orderBy?: 'price' | 'name', order?: 'asc' | 'desc'): Promise<ProductEntity[]>;
  findPaginated(pagination: PaginationInput, name?: string, orderBy?: 'price' | 'name', order?: 'asc' | 'desc'): Promise<PaginatedResult<ProductEntity>>;
  findById(id: number): Promise<ProductEntity | undefined>;
  create(input: CreateProductInput): Promise<ProductEntity>;
  update(id: number, input: UpdateProductInput): Promise<ProductEntity | undefined>;
  updateStock(id: number, input: { quantity: number }): Promise<ProductEntity>;
  remove(id: number): Promise<ProductEntity | undefined>;
}