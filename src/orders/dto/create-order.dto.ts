// create-order.dto.ts
export class CreateOrderDto {
  userId: number;
  items: { productId: number; quantity: number }[];
  idempotencyKey?: string;
}