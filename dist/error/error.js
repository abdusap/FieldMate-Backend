"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        console.log('errorF');
        Object.setPrototypeOf(this, new.target.prototype);
        this.statusCode = statusCode;
    }
    static validationError(message) {
        return new Error(message);
    }
}
exports.default = AppError;
