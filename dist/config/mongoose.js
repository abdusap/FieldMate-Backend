"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb = () => {
    mongoose_1.default.set('strictQuery', true);
    mongoose_1.default.connect('mongodb+srv://sapabdu:ugNPmWDCViLkjVIz@cluster0.ri7v6ef.mongodb.net/FieldMate?retryWrites=true&w=majority', {
        retryWrites: true,
        w: 'majority'
    }).then(() => { console.log('Database connected'); }).catch(() => { console.log('cannot connect to database'); });
};
exports.default = mongodb;
// mongodb+srv://sapabdu:ugNPmWDCViLkjVIz@cluster0.ri7v6ef.mongodb.net/FieldMate?retryWrites=true&w=majority
// mongodb://127.0.0.1:27017/fieldmate
