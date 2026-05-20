import { forwardRef, Global, Module } from '@nestjs/common';

import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { CATEGORIES_REPOSITORY } from './repositories/categories.repository';
import { InMenoryCategoryRepository } from './repositories/in-memory-categories.repository';
import { ProductsModule } from 'src/products/products.module';

@Global()
@Module({
  imports: [
    forwardRef(() => ProductsModule)
  ],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    { provide: CATEGORIES_REPOSITORY, useClass: InMenoryCategoryRepository }
  ],
  exports: [CategoriesService, CATEGORIES_REPOSITORY],
})
export class CategoriesModule {}
