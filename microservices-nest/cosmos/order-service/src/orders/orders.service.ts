import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Or, Repository } from 'typeorm';
import { OrderItem } from './entity/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus, UpdateOrderStatus } from './dto/update-order.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
   
    constructor(
        @InjectRepository(Order) 
        private readonly orderRepository:Repository<Order>,
        @InjectRepository(OrderItem) 
        private readonly orderItemRepository:Repository<OrderItem>,
        private readonly httpService: HttpService
    ){}


     async create(createOrderDto: CreateOrderDto) : Promise<Order>{
        const {customerId, items} = createOrderDto;

        const customerUrl =`http://localhost:3002/customers/${customerId}`;
        

        try{
            const cust_response = await firstValueFrom(
                this.httpService.get(customerUrl)
            ); 

            console.log(cust_response.data);
        }catch(error){
            throw new NotFoundException("couldn't find a valid customer for given id");
        }

        const order = this.orderRepository.create({
            customerId,
            status: 'PENDING',
        });

        for (const item of items){
                try{
                    const validProductUrl= `http://localhost:3001/products/${item.productId}/validate?quantity=${item.quantity}`;
                    const product_valid_response = await firstValueFrom(
                        this.httpService.get(validProductUrl)
                    );
                    console.log(product_valid_response.data);
                }
                catch(error){
                    throw new NotFoundException(`product id: ${item.productId} is out of stock`);
                }
        }
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
        const order =  await this.orderRepository.findOne({
            where : {id},
            relations: ['items'],
        });

        if(!order){
            throw new NotFoundException(`Order with ID ${id} not found`);
        }

        return order;
        //throw new Error('Method not implemented.');
    }

    async fetchAll() {
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
