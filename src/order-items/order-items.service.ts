import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './order-items.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
  ) {}

  async getAllOrderItems(): Promise<OrderItem[]> {
    return this.orderItemRepo.find({ relations: ['order', 'product'] });
  }

  async getOrderItemById(id: number): Promise<OrderItem | null> {
    return this.orderItemRepo.findOne({ where: { id }, relations: ['order', 'product'] });
  }

  async createOrderItem(data: Partial<OrderItem>): Promise<OrderItem> {
    const orderItem = this.orderItemRepo.create(data);
    return this.orderItemRepo.save(orderItem);
  }

  async updateOrderItem(id: number, data: Partial<OrderItem>): Promise<OrderItem | null> {
    await this.orderItemRepo.update(id, data);
    return this.getOrderItemById(id);
  }

  async deleteOrderItem(id: number): Promise<void> {
    await this.orderItemRepo.delete(id);
  }
}