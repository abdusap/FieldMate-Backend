class AppError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string) {
      super(message);
  console.log('errorF')
      Object.setPrototypeOf(this, new.target.prototype);
      this.statusCode = statusCode;
       
    }
    static validationError(message:string){
       return new Error(message)
    }
  }

  export default AppError