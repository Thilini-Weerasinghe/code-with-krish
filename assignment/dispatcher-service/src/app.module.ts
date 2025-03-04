import { Module } from '@nestjs/common';
import { DispatchersModule } from './dispatchers/dispatchers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispatcher } from './dispatchers/entity/dispatcher.entity';

@Module({
  imports: [
    DispatchersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOSTNAME || 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'cosmos',
      entities: [Dispatcher],
      synchronize: true, //only on dev
    }),
  ],
})
export class AppModule {}
