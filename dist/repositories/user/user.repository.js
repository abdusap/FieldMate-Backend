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
const user_model_1 = __importDefault(require("../../models/user.model"));
class UserRepository {
    CreateUser(name, mobile, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_model_1.default({ name, mobile, email, password });
            yield user.save();
            return user;
        });
    }
    Finduser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email: email });
            return user;
        });
    }
    Getuser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findById(id);
            return user;
        });
    }
    updateName(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findByIdAndUpdate(id, { $set: { name: name } });
            return user;
        });
    }
    updateImage(id, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findByIdAndUpdate(id, { $set: { image: image } }, { upsert: true, new: true });
            return user;
        });
    }
}
exports.default = UserRepository;
