import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginationInput, PaginatedResult } from "../../shared/pagination.types";
import { ProductsRepository } from "./products.repository";

import { ProductEntity } from "../entities/product.entity";
import { CreateProductInput } from "../dto/create-product.dto";
import { UpdateProductInput } from "../dto/update-product.dto";
import { ProductStockDto } from "../dto/product-stock.dto";

export class TypeOrmProductsRepository implements ProductsRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productsRepo: Repository<ProductEntity>
    ) {}

    async findAll(name?: string, orderBy?: "price" | "name", order?: "asc" | "desc"): Promise<ProductEntity[]> {
        let products = await this.productsRepo.find();

        if (name) {
            products = products.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
        }
        
        if (orderBy) {
            products.sort((p1, p2) =>
                orderBy === 'price'
                ? order === 'asc' ? p1.price - p2.price : p2.price - p1.price
                : order === 'asc' ? p1.name.localeCompare(p2.name) : p2.name.localeCompare(p1.name)
            );
        }
        
        return products;
    }

    async findPaginated(pagination: PaginationInput, name?: string, orderBy?: "price" | "name", order?: "asc" | "desc"): Promise<PaginatedResult<ProductEntity>> {
        const products = await this.findAll(name, orderBy, order);

        const limit = Math.min(Math.max(pagination.limit || 1 , 1), 50);
        const page = Math.max(pagination.page || 1, 1);

        const total = products.length;
        const totalPages = Math.ceil(total / limit);

        const start = (page - 1) * limit;
        const data = products.slice(start, start + limit);

        return {
            data,
            meta: {
                page,
                limit,
                total,
                totalPages
            }
        };
    }

    async findById(id: number): Promise<ProductEntity | undefined> {
        const product = await this.productsRepo.findOneBy({ id });
        if (!product) return undefined;
        return product;
    }

    async create(input: CreateProductInput): Promise<ProductEntity> {
        const product = this.productsRepo.create(input);
        return this.productsRepo.save(product);
    }

    async update(id: number, input: UpdateProductInput): Promise<ProductEntity | undefined> {
        const product = await this.findById(id);
        if (!product) return undefined;
        
        Object.assign(product, {
            name: input.name ?? product.name,
            price: input.price ?? product.price,
            stock: input.stock ?? product.stock,
            categoryId: input.categoryId ?? product.categoryId
        });

        return this.productsRepo.save(product);
    }

    async updateStock(id: number, input: ProductStockDto): Promise<ProductEntity> {
        const product = (await this.findById(id))!;
        product.stock -= input.quantity;
        return this.productsRepo.save(product);
    }
    
    async remove(id: number): Promise<ProductEntity | undefined> {
        const product = await this.findById(id);
        if (!product) return undefined;

        await this.productsRepo.remove(product);
        return product;
    }
}