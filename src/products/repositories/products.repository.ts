import { PaginatedResult, PaginationInput } from '../../shared/pagination.types';
import { CreateProductInput } from '../dto/create-product.dto';
import { ProductStockDto } from '../dto/product-stock.dto';
import { UpdateProductInput } from '../dto/update-product.dto';
import { ProductEntity } from '../entities/product.entity';

export const PRODUCTS_REPOSITORY = 'PRODUCTS_REPOSITORY';

export interface ProductsRepository {
  findAll(name?: string, orderBy?: 'price' | 'name', order?: 'asc' | 'desc'): Promise<ProductEntity[]>;
  findPaginated(pagination: PaginationInput, name?: string, orderBy?: 'price' | 'name', order?: 'asc' | 'desc'): Promise<PaginatedResult<ProductEntity>>;
  findById(id: number): Promise<ProductEntity | undefined>;
  create(input: CreateProductInput): Promise<ProductEntity>;
  update(product: ProductEntity, input: UpdateProductInput): Promise<ProductEntity>;
  updateStock(product: ProductEntity, input: ProductStockDto): Promise<ProductEntity>;
  remove(product: ProductEntity): Promise<ProductEntity>;
}