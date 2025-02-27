import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Or, Repository } from 'typeorm';
import { OrderItem } from './entity/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus, UpdateOrderStatus } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
   
    constructor(
        @InjectRepository(Order) 
        private readonly orderRepository:Repository<Order>,
        @InjectRepository(OrderItem) 
        private readonly orderItemRepository:Repository<OrderItem>,
    ){}


     async create(createOrderDto: CreateOrderDto) : Promise<Order>{
        const {customerId, items} = createOrderDto;

        const order = this.orderRepository.create({
            customerId,
            status: 'PENDING',
        });
        const savedOrder = await this.orderRepository.save(order);

        const orderItems = items.map((item) => 
        this.orderItemRepository.create({
            productId: item.productId,
            price: item.price,
            quantity:item.quantity,
            order:savedOrder
        }),
    );

    await this.orderItemRepository.save(orderItems);
    const finalOrder = await this.orderRepository.findOne({
        where : {id:savedOrder.id},
        relations:['items']
    })as Order;

    return finalOrder;

     }

     async fetch(id: any) {
        return await this.orderRepository.findOne({
            where : {id},
            relations: ['items'],
        });
        //throw new Error('Method not implemented.');
    }

    async fetchAll(id: number) {
        return await this.orderRepository.find({relations:['items']});
       // throw new Error('Method not implemented.');
    }

    async updateOrderStatus(id: number, updateStatus: UpdateOrderStatus) {
        const order = await this.orderRepository.findOne({
            where : {id},
            relations: ['items'],
        });

        if(!order){
            throw new NotFoundException(`Order with id: ${id} is not found`);
        }
        if(
            order.status === OrderStatus.DELIVERED ||
            order.status === OrderStatus.CANCELLED){
            
            throw new BadRequestException(`Order status cannot be changed, when it is delivered or cancelled`);
        } 
        console.log('Current Order Status:', order.status);
        order.status = updateStatus.status;
        console.log('Updated Order Status:', order.status);
        return await this.orderRepository.save(order);
        //throw new Error('Method not implemented.');
    }
}
