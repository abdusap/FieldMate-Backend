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
const turf_repository_1 = __importDefault(require("../../repositories/admin/turf.repository"));
const user_repository_1 = __importDefault(require("../../repositories/admin/user.repository"));
const turfRepository = new turf_repository_1.default();
class UserService extends user_repository_1.default {
    GetAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield this.getAllUser();
            return details;
        });
    }
    BlockUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield this.blockUser(id);
            return details;
        });
    }
    DashboardDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            const usersCount = yield this.usersCount();
            const turfDetails = yield turfRepository.getAllTurf();
            return {
                "userCount": usersCount,
                "turfDetails": turfDetails
            };
        });
    }
}
exports.default = UserService;
