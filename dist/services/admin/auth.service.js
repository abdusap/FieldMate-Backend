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
const auth_repository_1 = __importDefault(require("../../repositories/admin/auth.repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthRepository = new auth_repository_1.default();
class authService {
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield AuthRepository.Login(email);
            if (details) {
                const hashedPassword = details.password;
                const matchPassword = yield bcrypt_1.default.compare(password, hashedPassword);
                return matchPassword;
            }
            else {
                return details;
            }
        });
    }
    JwtChecker(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (decoded) {
                const email = decoded.email;
                const Data = yield AuthRepository.findOne(email);
                return Data;
            }
            else {
                const decode = false;
                return decode;
            }
        });
    }
}
exports.default = authService;
