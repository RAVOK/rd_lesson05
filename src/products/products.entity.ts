import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 's_product', schema: 'site' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}