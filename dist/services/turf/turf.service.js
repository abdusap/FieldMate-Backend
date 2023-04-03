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
class TurfService extends turf_repository_1.default {
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
}
exports.default = TurfService;
