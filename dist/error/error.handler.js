"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const error_1 = __importDefault(require("./error"));
const jsonwebtoken_2 = require("jsonwebtoken");
const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof error_1.default) {
        res.status(err.statusCode).json({ error: { success: false, message: err.message } });
    }
    else if (err instanceof jsonwebtoken_1.TokenExpiredError) {
        res.status(401).json({ error: { success: false, tokenExpired: true, message: 'token expired' } });
    }
    else if (err instanceof jsonwebtoken_2.JsonWebTokenError) {
        res.status(401).json({ error: { success: false, message: 'Invalid Signature Id' } });
    }
    else {
        res.status(500).json({ error: { success: false, message: 'something went wrong' } });
    }
};
exports.default = errorHandler;
