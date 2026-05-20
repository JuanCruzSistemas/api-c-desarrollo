import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';

import { CategoriesService } from '../services/categories.service';

import { CreateCategoryInput } from '../category.types';

@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService
    ) {}

    @Get()
    async findAll(
        @Query('page') page?: string,
        @Query('limit') limit?: string
    ) {
        if (page !== undefined || limit !== undefined) {
            return this.categoriesService.findPaginated({ page: Number(page), limit: Number(limit) });
        }

        return this.categoriesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(Number(id));
    }

    @Post()
    async create(@Body() body: CreateCategoryInput) {
        return this.categoriesService.create(body);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.categoriesService.delete(Number(id));
    }

    @Get(':id/products')
    async findProducts(@Param('id') id: string) {
        return this.categoriesService.findProductsByCategory(Number(id));
    }
}