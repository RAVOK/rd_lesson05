import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, Unique, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { OrderItem } from '../order-items/order-items.entity';

@Entity({ name: 's_order', schema: 'site' })
@Unique(['idempotencyKey'])
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  @JoinColumn({ name: 'user_id' })   // 👈 виправлення
  user: User;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @Column({ type: 'numeric', nullable: false })
  total: number;

  @Column({ type: 'uuid', nullable: false })
  idempotencyKey: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}