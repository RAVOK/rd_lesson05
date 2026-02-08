import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItem } from './order-items.entity';
import { OrderItemResponseDTO } from './dto/order-item-response.dto';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Get()
  async getAllOrderItems(): Promise<OrderItemResponseDTO<OrderItem>> {
    const items = await this.orderItemsService.getAllOrderItems();
    return new OrderItemResponseDTO<OrderItem>(items, 0, '');
  }

  @Get(':id')
  async getOrderItemById(@Param('id') id: number): Promise<OrderItemResponseDTO<OrderItem>> {
    const item = await this.orderItemsService.getOrderItemById(id);
    return new OrderItemResponseDTO<OrderItem>(item ? [item] : [], 0, '');
  }

  @Post()
  async createOrderItem(@Body() data: Partial<OrderItem>): Promise<OrderItemResponseDTO<OrderItem>> {
    const item = await this.orderItemsService.createOrderItem(data);
    return new OrderItemResponseDTO<OrderItem>([item], 0, '');
  }

  @Put(':id')
  async updateOrderItem(@Param('id') id: number, @Body() data: Partial<OrderItem>): Promise<OrderItemResponseDTO<OrderItem>> {
    const item = await this.orderItemsService.updateOrderItem(id, data);
    return new OrderItemResponseDTO<OrderItem>(item ? [item] : [], 0, '');
  }

  @Delete(':id')
  async deleteOrderItem(@Param('id') id: number): Promise<OrderItemResponseDTO<OrderItem>> {
    await this.orderItemsService.deleteOrderItem(id);
    return new OrderItemResponseDTO<OrderItem>([], 0, '');
  }
}