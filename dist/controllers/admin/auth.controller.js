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
exports.jwtChecker = exports.login = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_service_1 = __importDefault(require("../../services/admin/auth.service"));
const error_1 = __importDefault(require("../../error/error"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthService = new auth_service_1.default();
exports.login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const passwordMatch = yield AuthService.login(email, password);
    if (passwordMatch) {
        const data = { email: email };
        const token = jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET, {
            expiresIn: 86400,
        });
        res.json({ success: true, token: token });
    }
    else if (passwordMatch == null) {
        throw new error_1.default(404, "Invalid user");
    }
    else {
        throw new error_1.default(401, "Email or Password Incorrect");
    }
}));
exports.jwtChecker = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        const token = req.headers.authorization.split(" ")[1];
        const checker = yield AuthService.JwtChecker(token);
        if (checker != null) {
            res.json({ success: true });
        }
        else {
            throw new error_1.default(401, "invalid token");
        }
    }
    else {
        throw new error_1.default(401, "No authorization");
    }
}));
