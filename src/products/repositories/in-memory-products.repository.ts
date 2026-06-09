// import { PaginationInput, PaginatedResult } from 'src/shared/pagination.types';
// import {
//   CreateProductInput,
//   Product,
//   ProductStock,
//   UpdateProductInput,
// } from '../product.types';
// import { ProductsRepository } from './products.repository';

// export class InMemoryProductsRepository implements ProductsRepository {
//   private products: Product[] = [];
//   private nextId = 1;

//   async findAll(name?: string, orderBy?: 'price' | 'name', order: 'asc' | 'desc' = 'asc'): Promise<Product[]> {
//     let productos: Product[] = [...this.products];

//     if (name) {
//       productos = productos.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
//     }

//     if (orderBy) {
//       productos.sort((p1, p2) =>
//         orderBy === 'price'
//         ? order === 'asc' ? p1.price - p2.price : p2.price - p1.price
//         : order === 'asc' ? p1.name.localeCompare(p2.name) : p2.name.localeCompare(p1.name)
//       );
//     }
    
//     return productos;
//   }

//   async findPaginated(pagination: PaginationInput, name?: string, orderBy?: 'price' | 'name', order?: 'asc' | 'desc'): Promise<PaginatedResult<Product>> {
//     const products = await this.findAll(name, orderBy, order);

//     const limit = Math.min(Math.max(pagination.limit || 1, 1), 50);
//     const page = Math.max(pagination.page || 1, 1);

//     const total = products.length;
//     const totalPages = Math.ceil(total / limit);

//     const start = (page - 1) * limit;
//     const data = products.slice(start, start + limit);

//     return {
//       data,
//       meta: {
//         page,
//         limit,
//         total,
//         totalPages
//       }
//     };
//   }

//   async findById(id: number): Promise<Product | undefined> {
//     return this.products.find((p) => p.id === id);
//   }

//   async create(input: CreateProductInput): Promise<Product> {
//     const product: Product = {
//       id: this.nextId++,
//       name: input.name,
//       price: input.price,
//       stock: input.stock,
//       categoryId: input.categoryId ?? null
//     };
//     this.products.push(product);
//     return product;
//   }

//   async update(id: number, input: UpdateProductInput): Promise<Product | undefined> {
//     const product = await this.findById(id);
//     if (!product) return undefined;

//     if (input.name !== undefined) product.name = input.name;
//     if (input.price !== undefined) product.price = input.price;
//     if (input.stock !== undefined) product.stock = input.stock;
//     if (input.categoryId !== undefined) product.categoryId = input.categoryId;

//     return product;
//   }

//   async updateStock(id: number, body: ProductStock): Promise<Product> {
//     const producto = (await this.findById(id))!;
//     producto.stock -= body.quantity;
//     return producto;
//   }

//   async remove(id: number): Promise<Product | undefined> {
//     const product = this.findById(id);
//     if (!product) return undefined;

//     this.products = this.products.filter((p) => p.id !== id);
//     return product;
//   }
// }

