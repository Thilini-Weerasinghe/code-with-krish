import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
   
  
    constructor(@InjectRepository(Customer) 
    private readonly custRepository:Repository<Customer>){}


    async create(createCustomerDto: CreateCustomerDto):Promise<Customer> {

        const {name, email,address} = createCustomerDto;

        const customer = this.custRepository.create({
            name,
            email,
            address,
        });
        const savedCustomer = await this.custRepository.save(customer);

    const finalCustomer = await this.custRepository.findOne({
        where : {id:savedCustomer.id},
    })as Customer;

    return finalCustomer;

       // throw new Error('Method not implemented.');
    }


   async fetch(id: number) {
    return await this.custRepository.findOne({
        where : {id:id},
    });
        //throw new Error('Method not implemented.');
    }

    async fetchAll() {

        return await this.custRepository.find();
       // throw new Error('Method not implemented.');
    }
}
