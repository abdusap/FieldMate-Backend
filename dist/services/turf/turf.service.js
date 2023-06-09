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
const turf_repository_1 = __importDefault(require("../../repositories/turf/turf.repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TurfService extends turf_repository_1.default {
    JwtChecker(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (decoded) {
                const id = decoded.id;
                const turfData = yield this.findTurfById(id);
                return turfData;
            }
            else {
                const decode = false;
                return decode;
            }
        });
    }
    CreateTurf(name, mobile, email, location, gioCoordinates, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const turf = yield this.createTurf(name, mobile, email, location, gioCoordinates, hashedPassword);
            return turf;
        });
    }
    FindTurf(mobile, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const turf = yield this.findTurf(email, mobile);
            return turf;
        });
    }
    Login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountDetail = yield this.loginTurf(email);
            if (accountDetail) {
                const hashedPassword = accountDetail.password;
                const matchPassword = yield bcrypt_1.default.compare(password, hashedPassword);
                return {
                    'matchStatus': matchPassword, 'account': accountDetail
                };
            }
            else
                return null;
        });
    }
}
exports.default = TurfService;
