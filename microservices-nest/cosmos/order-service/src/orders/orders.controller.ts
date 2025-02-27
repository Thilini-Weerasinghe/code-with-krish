import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatus } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private orderService : OrdersService){}

    @Post()
    async create(@Body() createOrderDto: CreateOrderDto ){
        return await this.orderService.create(createOrderDto);

    }

    @Get('/:id')
    async fetch(@Param('id') id : number){
        return await this.orderService.fetch(id);
    }

    @Get('/')
    async fetchAll(@Param('id') id : number){
        return await this.orderService.fetchAll(id);
    }

    @Patch('/:id/status')
    async updateOrderStaus(@Param('id') id : number,@Body() status : UpdateOrderStatus
){
    if (!status || !status.status) {
        throw new BadRequestException('Status is required');
    }
    return this.orderService.updateOrderStatus(id, status);
    }
}
