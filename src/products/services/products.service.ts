import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { PaginatedResult, PaginationInput } from '../../shared/pagination.types';
import { PRODUCTS_REPOSITORY, ProductsRepository } from '../repositories/products.repository';
import { CategoriesService } from '../../categories/services/categories.service';

import { CreateProductInput } from '../dto/create-product.dto';
import { UpdateProductInput } from '../dto/update-product.dto';
import { ProductEntity } from '../entities/product.entity';
import { ProductStockDto } from '../dto/product-stock.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private readonly productsRepository: ProductsRepository,

    @Inject(forwardRef(() => CategoriesService))
    private readonly categoriesService: CategoriesService
  ) {}

  async findAll(name?: string, orderBy?: 'price' | 'name', order: 'asc' | 'desc' = 'asc'): Promise<ProductEntity[]> {
    return this.productsRepository.findAll(name, orderBy, order);
  }

  async findPaginated(pagination: PaginationInput, name?: string, orderBy?: 'price' | 'name', order: 'asc' | 'desc' = 'asc'): Promise<PaginatedResult<ProductEntity>> {
    return this.productsRepository.findPaginated(pagination, name, orderBy, order);
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productsRepository.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(input: CreateProductInput): Promise<ProductEntity> {
    if (input.categoryId !== undefined) {
      try {
        await this.categoriesService.findOne(input.categoryId);
      } catch {
        throw new BadRequestException(`No existe categoría con ID: ${input.categoryId}`);
      }
    }
    
    return this.productsRepository.create(input);
  }

  async update(id: number, input: UpdateProductInput): Promise<ProductEntity> {
    const product = await this.findOne(id);
    return this.productsRepository.update(product, input);
  }

  async updateStock(id: number, input: ProductStockDto): Promise<ProductEntity> {
    const product = await this.findOne(id);

    if (input.quantity > product.stock) {
      throw new BadRequestException('Stock insuficiente');
    }
    
    return this.productsRepository.updateStock(product, input);
  }

  async remove(id: number): Promise<ProductEntity> {
    const product = await this.findOne(id);
    return this.productsRepository.remove(product);
  }
}

