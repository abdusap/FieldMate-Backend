"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { TokenExpiredError } from "jsonwebtoken";
const error_1 = __importDefault(require("./error"));
const errorHandler = (err, req, res, next) => {
    console.log(err + "dfd");
    if (err instanceof error_1.default) {
        res.status(err.statusCode).json({ error: { success: false, message: err.message } });
    }
    // else if(err instanceof TokenExpiredError){
    //     res.status(401).json({error:{success:false,tokenExpired:true,message:'token expired'}})
    // }
    else {
        res.status(500).json({ error: { success: false, message: 'something went wrong' } });
    }
};
exports.default = errorHandler;
