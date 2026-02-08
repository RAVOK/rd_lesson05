import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity';
import { Product } from '../products/products.entity';
import { Order } from '../orders/orders.entity';
import { OrderItem } from '../order-items/order-items.entity';

ConfigModule.forRoot({
  envFilePath: 'config/.env.dev',
  isGlobal: true,
});

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  schema: configService.get<string>('DB_SCHEMA'),
  entities: [User, Product, Order, OrderItem],
  migrations: ['dist/migrations/*.js'],
});