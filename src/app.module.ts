import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';

import { ProductEntity } from './products/entities/product.entity';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { TimingMiddleware } from './common/middlewares/timing.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [ProductEntity],
      synchronize: true
    }),
    ProductsModule,
    UsersModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, TimingMiddleware)
            .forRoutes('*');
  }
}
