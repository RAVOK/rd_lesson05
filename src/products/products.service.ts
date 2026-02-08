import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepo.find();
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.productRepo.findOne({ where: { id } });
  }

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepo.create(productData);
    return this.productRepo.save(product);
  }

  async updateProduct(id: number, productData: Partial<Product>): Promise<Product | null> {
    await this.productRepo.update(id, productData);
    return this.getProductById(id);
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepo.delete(id);
  }
}