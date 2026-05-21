import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRol } from '../../auth/types/user-role.enum';

import { ProductsService } from '../services/products.service';

import { CreateProductInput } from '../dto/create-product.dto';
import { UpdateProductInput } from '../dto/update-product.dto';
import { ProductStockDto } from '../dto/product-stock.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) {}

  @Get()
  async findAll(
    @Query('name') name: string,
    @Query('orderBy') orderBy: 'price' | 'name',
    @Query('order') order: 'asc' | 'desc' = 'asc',
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    if (page !== undefined || limit !== undefined) {
      return this.productsService.findPaginated({ page: Number(page), limit: Number(limit) }, name, orderBy, order);
    }

    return this.productsService.findAll(name, orderBy, order);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRol.ADMIN)
  async create(@Body() body: CreateProductInput) {
    return this.productsService.create(body);
  }
  
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRol.ADMIN)
  async update(@Param('id') id: string, @Body() body: UpdateProductInput) {
    return this.productsService.update(Number(id), body);
  }
  
  @Patch(':id/stock')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRol.ADMIN)
  async disminuirStock(@Param('id') id: string, @Body() body: ProductStockDto) {
    return this.productsService.updateStock(Number(id), body);
  }
  
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRol.ADMIN)
  async remove(@Param('id') id: string) {
    return this.productsService.remove(Number(id));
  }
}