"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        console.log('error');
        Object.setPrototypeOf(this, new.target.prototype);
        this.statusCode = statusCode;
    }
}
exports.default = AppError;
