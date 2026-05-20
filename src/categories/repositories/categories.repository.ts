import { PaginatedResult, PaginationInput } from "../../shared/pagination.types";

import { Category, CreateCategoryInput } from "../category.types";

export const CATEGORIES_REPOSITORY = 'CATEGORIES_REPOSITORY';

export interface CategoriesRepository {
    findAll(): Category[];
    findPaginated(pagination: PaginationInput): PaginatedResult<Category>;
    findById(id: number): Category | undefined;
    create(dto: CreateCategoryInput): Category;
    delete(id: number): Category | undefined;
}