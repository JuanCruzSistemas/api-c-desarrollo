// import { PaginationInput, PaginatedResult } from "../../shared/pagination.types";

// import { CategoriesRepository } from "./categories.repository";

// import { Category, CreateCategoryInput } from "../category.types";

// export class InMenoryCategoryRepository implements CategoriesRepository {
//     private categorias: Category[] = [];
//     private nextId = 1;

//     findAll(): Category[] {
//         return [...this.categorias];
//     }

//     findPaginated(pagination: PaginationInput): PaginatedResult<Category> {
//         const categories = this.findAll();

//         const limit = Math.min(Math.max(pagination.limit || 1, 1), 50);
//         const page = Math.max(pagination.page || 1, 1);

//         const total = categories.length;
//         const totalPages = Math.ceil(total / limit);

//         const start = (page - 1) * limit;
//         const data = categories.slice(start, start + limit);

//         return {
//             data,
//             meta: {
//                 page,
//                 limit,
//                 total,
//                 totalPages
//             }
//         };
//     }

//     findById(id: number): Category | undefined {
//         return this.categorias.find(c => c.id === id);
//     }

//     create(dto: CreateCategoryInput): Category {
//         const category: Category = {
//             id: this.nextId++,
//             name: dto.name
//         };

//         this.categorias.push(category);
//         return category;
//     }

//     delete(id: number): Category | undefined {
//         const category = this.findById(id);

//         if (!category) {
//             return undefined;
//         }

//         this.categorias = this.categorias.filter(c => c.id !== id);
//         return category;
//     }
// }