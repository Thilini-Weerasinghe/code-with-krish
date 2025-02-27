import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
    constructor(private customerService: CustomersService){}

    @Post()
    async create(@Body(new ValidationPipe()) createCustomerDto: CreateCustomerDto ){
        return await this.customerService.create(createCustomerDto);

    }

    @Get('/:id')
    async fetch(@Param('id') id : number){
        return await this.customerService.fetch(id);
    }

    @Get()
    async fetchAll(){
        return await this.customerService.fetchAll();
    }
}
