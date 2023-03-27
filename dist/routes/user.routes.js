"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user/user.controller");
exports.user = express_1.default.Router();
exports.user.post('/signup', user_controller_1.signup);
exports.user.post('/otp', user_controller_1.verityOtp);
exports.user.post('/login', user_controller_1.login);
