import { ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CATEGORIES_REPOSITORY, CategoriesRepository } from '../repositories/categories.repository';
import { PaginatedResult, PaginationInput } from '../../shared/pagination.types';

import { Category, CreateCategoryInput } from '../category.types';
import { ProductsService } from 'src/products/services/products.service';
import { ProductEntity } from 'src/products/entities/product.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @Inject(CATEGORIES_REPOSITORY)
        private readonly categoriesRepo: CategoriesRepository,

        @Inject(forwardRef(() => ProductsService))
        private readonly productsService: ProductsService
    ) {}

    async findAll(): Promise<Category[]> {
        return this.categoriesRepo.findAll();
    }

    async findPaginated(pagination: PaginationInput): Promise<PaginatedResult<Category>> {
        return this.categoriesRepo.findPaginated(pagination);
    }

    async findOne(id: number): Promise<Category> {
        const category = this.categoriesRepo.findById(id);

        if (!category) {
            throw new NotFoundException(`Category con ID: ${id} no encontrada`);
        }

        return category;
    }

    async create(dto: CreateCategoryInput): Promise<Category> {
        return this.categoriesRepo.create(dto);
    }

    async delete(id: number): Promise<Category> {
        const category = await this.findOne(id);

        const products = await this.productsService.findAll();
        const hasProducts = products.some(p => p.categoryId === id);
        if (hasProducts) {
            throw new ConflictException('No se puede eliminar una categoría que tiene productos asociados');
        }

        this.categoriesRepo.delete(id);
        return category;
    }

    async findProductsByCategory(id: number): Promise<ProductEntity[]> {
        await this.findOne(id);
        return (await this.productsService.findAll()).filter(p => p.categoryId === id);
    }
}