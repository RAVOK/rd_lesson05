export class ResponseDTO<T> {
  users: T[];
  error: {
    errorCode: number;
    errorMessage: string;
  };

  constructor(users: T[] = [], errorCode = 0, errorMessage = '') {
    this.users = users;
    this.error = { errorCode, errorMessage };
  }
}