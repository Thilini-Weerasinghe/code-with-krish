import { Module } from '@nestjs/common';
import { DispatchersService } from './dispatchers.service';
import { DispatchersController } from './dispatchers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispatcher } from './entity/dispatcher.entity';

@Module({
  providers: [DispatchersService],
  controllers: [DispatchersController],
  imports: [TypeOrmModule.forFeature([Dispatcher])],
})
export class DispatchersModule {}
