import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './orders.entity';
import { OrderResponseDTO } from './dto/order-response.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Get()
    async getAllOrders(): Promise<OrderResponseDTO<Order>> {
        const orders = await this.ordersService.getAllOrders();
        return new OrderResponseDTO<Order>(orders, 0, '');
    }

    @Get(':id')
    async getOrderById(@Param('id') id: number): Promise<OrderResponseDTO<Order>> {
        const order = await this.ordersService.getOrderById(id);
        return new OrderResponseDTO<Order>(order ? [order] : [], 0, '');
    }

    @Post()
    async create(@Body() orderData: CreateOrderDto) {
        return this.ordersService.createOrder(orderData);
    }


    @Put(':id')
    async updateOrder(@Param('id') id: number, @Body() orderData: Partial<Order>): Promise<OrderResponseDTO<Order>> {
        const order = await this.ordersService.updateOrder(id, orderData);
        return new OrderResponseDTO<Order>(order ? [order] : [], 0, '');
    }

    @Delete(':id')
    async deleteOrder(@Param('id') id: number): Promise<OrderResponseDTO<Order>> {
        await this.ordersService.deleteOrder(id);
        return new OrderResponseDTO<Order>([], 0, '');
    }
}