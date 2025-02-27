import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService){}

    @Post()
    async create(@Body(new ValidationPipe()) createProductDto: CreateProductDto ){
        return await this.productService.create(createProductDto);

    }

    @Get('/:id')
    async fetch(@Param('id') id : number){
        return await this.productService.fetch(id);
    }

    @Get()
    async fetchAll(){
        return await this.productService.fetchAll();
    }
}
