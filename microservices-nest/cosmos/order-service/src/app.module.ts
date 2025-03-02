import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders/entity/order.entity';
import { OrderItem } from './orders/entity/order-item.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [OrdersModule,HttpModule,TypeOrmModule.forRoot({
    type:'mysql',
    host:process.env.HOSTNAME || 'localhost',
    port:3306,
    username:'root',
    password:'123456',
    database:'cosmos',
    entities: [Order,OrderItem],
    synchronize:true
  })],
})
export class AppModule {}
