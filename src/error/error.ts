
class AppError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    console.log('error')

    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
     
  }
}

export default AppError