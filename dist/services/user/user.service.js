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
const user_repository_1 = __importDefault(require("../../repositories/user/user.repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// const userRepository=new UserRepository()
class UserService extends user_repository_1.default {
    finduser(name, mobile, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUserDupe = yield this.Finduser(email);
            return checkUserDupe;
        });
    }
    createUser(name, mobile, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = yield this.CreateUser(name, mobile, email, hashedPassword);
            return user;
        });
    }
    verifyUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.Finduser(email);
            if (user) {
                const hashedPassword = user.password;
                const matchPassword = yield bcrypt_1.default.compare(password, hashedPassword);
                return matchPassword;
            }
            else
                return user;
        });
    }
}
exports.default = UserService;
