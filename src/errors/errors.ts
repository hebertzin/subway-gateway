export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}

export class ResourseAlreadyExistError extends Error{
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.name = "ResourseAlreadyExistError";
  }
}