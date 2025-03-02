import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entity/product.entity';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOSTNAME || 'localhost',
      port: 3306,
      username: 'root',
      password: '1qazxsw2##',
      database: 'inventory',
      entities: [Product],
      synchronize: true, //only on dev
    }),
  ],
})
export class AppModule { }
