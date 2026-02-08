import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { ProductResponseDTO } from './dto/product-response.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<ProductResponseDTO<Product>> {
    const products = await this.productsService.getAllProducts();
    return new ProductResponseDTO<Product>(products, 0, '');
  }

  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<ProductResponseDTO<Product>> {
    const product = await this.productsService.getProductById(id);
    return new ProductResponseDTO<Product>(product ? [product] : [], 0, '');
  }

  @Post()
  async createProduct(@Body() productData: Partial<Product>): Promise<ProductResponseDTO<Product>> {
    const product = await this.productsService.createProduct(productData);
    return new ProductResponseDTO<Product>([product], 0, '');
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() productData: Partial<Product>,
  ): Promise<ProductResponseDTO<Product>> {
    const product = await this.productsService.updateProduct(id, productData);
    return new ProductResponseDTO<Product>(product ? [product] : [], 0, '');
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<ProductResponseDTO<Product>> {
    await this.productsService.deleteProduct(id);
    return new ProductResponseDTO<Product>([], 0, '');
  }
}