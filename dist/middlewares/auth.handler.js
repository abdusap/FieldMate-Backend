"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const error_1 = __importDefault(require("../utils/error"));
const userModel_1 = __importDefault(require("../model/userModel"));
const adminModel_1 = __importDefault(require("../model/adminModel"));
const expertModel_1 = __importDefault(require("../model/expertModel"));
admin_model_1.default;
const mongoose_1 = require("mongoose");
const admin_model_1 = __importDefault(require("../models/admin.model"));
exports.authorization = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer") &&
        req.query.role) {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded !== "string") {
            let collection = (mongoose_1.Model);
            switch (req.query.role) {
                case ('user'):
                    collection = userModel_1.default;
                    break;
                case ('admin'):
                    collection = adminModel_1.default;
                    break;
                case ('expert'):
                    collection = expertModel_1.default;
            }
            const user = yield collection.findOne({ _id: decoded.id, isBlocked: false });
            if (!user) {
                throw new error_1.default(401, "invalid token");
            }
            else {
                next();
            }
        }
        else {
            throw new error_1.default(401, "No authorization");
        }
    }
    else {
        throw new error_1.default(401, "No authorization");
    }
}));
