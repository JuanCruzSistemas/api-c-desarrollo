import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { PaginatedResult } from '../../common/types/pagination.types';
import { CreateProductInput } from '../dto/create-product.dto';
import { UpdateProductInput } from '../dto/update-product.dto';
import { ProductStockDto } from '../dto/product-stock.dto';

import { ProductEntity } from '../entities/product.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';

import { PRODUCTS_REPOSITORY, ProductsRepository } from '../repositories/products.repository';
import { CategoriesService } from '../../categories/services/categories.service';
import { QueryParamsProductDto } from '../dto/query-params-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private readonly productsRepository: ProductsRepository,

    @Inject(forwardRef(() => CategoriesService))
    private readonly categoriesService: CategoriesService
  ) {}

  async findAll(query: QueryParamsProductDto): Promise<PaginatedResult<ProductEntity>> {
    const { page = 1, limit = 10, name, orderBy, order } = query;
    
    return this.productsRepository.findAll(page, limit, name, orderBy, order);
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async findProductsByCategory(id: number): Promise<ProductEntity[]> {
    return this.productsRepository.findProductsByCategory(id);
  }

  async create(input: CreateProductInput): Promise<ProductEntity> {
    if (input.categoryId !== undefined) {
      try {
        await this.categoriesService.findOne(input.categoryId);
      } catch {
        throw new BadRequestException(`No existe categoría con ID: ${input.categoryId}`);
      }
    }

    const { categoryId, ...productData } = input;
    
    return this.productsRepository.create({
      ...productData,
      category: categoryId ? { id: categoryId } as CategoryEntity : undefined
    });
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

  async delete(id: number): Promise<ProductEntity> {
    const product = await this.findOne(id);
    return this.productsRepository.delete(product);
  }
}

