export class OrderItemResponseDTO<T> {
  orderItems: T[];
  error: {
    errorCode: number;
    errorMessage: string;
  };

  constructor(orderItems: T[] = [], errorCode = 0, errorMessage = '') {
    this.orderItems = orderItems;
    this.error = { errorCode, errorMessage };
  }
}