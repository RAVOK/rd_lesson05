export class OrderResponseDTO<T> {
  orders: T[];
  error: {
    errorCode: number;
    errorMessage: string;
  };

  constructor(orders: T[] = [], errorCode = 0, errorMessage = '') {
    this.orders = orders;
    this.error = { errorCode, errorMessage };
  }
}