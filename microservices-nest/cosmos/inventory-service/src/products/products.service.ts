import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) 
    private readonly productRepository:Repository<Product>){}


    async create(createProductDto: CreateProductDto):Promise<Product> {

        const {name, price,quantity} = createProductDto;

        const product = this.productRepository.create({
            name,
            price,
            quantity,
        });
        const savedProduct = await this.productRepository.save(product);

    const finalProduct = await this.productRepository.findOne({
        where : {id:savedProduct.id},
    })as Product;

    return finalProduct;

       // throw new Error('Method not implemented.');
    }


   async fetch(id: number) {
    return await this.productRepository.findOne({
        where : {id:id},
    });
        //throw new Error('Method not implemented.');
    }

    async fetchAll() {

        return await this.productRepository.find();
       // throw new Error('Method not implemented.');
    }
}
