import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get(':id/validate')
  async validateStock(
    @Param('id') id: number,
    @Query('quantity') quantity: number,
  ): Promise<{ available: boolean }> {
    return this.productsService.validateStock(id, quantity);
  }
}

