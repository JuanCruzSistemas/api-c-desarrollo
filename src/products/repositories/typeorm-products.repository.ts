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
        return this.productosQuery(name, orderBy, order).getMany();
    }

    async findPaginated(pagination: PaginationInput, name?: string, orderBy?: "price" | "name", order?: "asc" | "desc"): Promise<PaginatedResult<ProductEntity>> {
        const limit = Math.min(Math.max(pagination.limit || 1 , 1), 50);
        const page = Math.max(pagination.page || 1, 1);

        const [data, total] = await this.productosQuery(name, orderBy, order).getManyAndCount();
        const totalPages = Math.ceil(total / limit);

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

    async update(product: ProductEntity, input: UpdateProductInput): Promise<ProductEntity> {
        Object.assign(product, {
            name: input.name ?? product.name,
            price: input.price ?? product.price,
            stock: input.stock ?? product.stock,
            categoryId: input.categoryId ?? product.categoryId
        });

        return this.productsRepo.save(product);
    }

    async updateStock(product: ProductEntity, input: ProductStockDto): Promise<ProductEntity> {
        product.stock -= input.quantity;
        return this.productsRepo.save(product);
    }
    
    async remove(product: ProductEntity): Promise<ProductEntity> {
        return this.productsRepo.remove(product);
    }

    private productosQuery(name?: string, orderBy?: "price" | "name", order?: "asc" | "desc") {
        const query =  this.productsRepo.createQueryBuilder('product');

        if (name) {
            query.where('LOWER(product.name) LIKE :name', { name: `%${name.toLowerCase()}%` });
        }

        if (orderBy) {
            query.orderBy(`product.${orderBy}`, order === 'asc' ? 'ASC' : 'DESC');
        }

        return query;
    }
}