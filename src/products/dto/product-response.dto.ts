export class ProductResponseDTO<T> {
  products: T[];
  error: {
    errorCode: number;
    errorMessage: string;
  };

  constructor(products: T[] = [], errorCode = 0, errorMessage = '') {
    this.products = products;
    this.error = { errorCode, errorMessage };
  }
}