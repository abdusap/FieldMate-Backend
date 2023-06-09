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
const turf_model_1 = __importDefault(require("../../models/turf.model"));
class TurfRepository {
    allTurf() {
        return __awaiter(this, void 0, void 0, function* () {
            const allTurf = yield turf_model_1.default.find({ verify: false });
            return allTurf;
        });
    }
    acceptTurf(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const turf = yield turf_model_1.default.findOneAndUpdate({ _id: id }, { $set: { verify: true, verificationStatus: "approved" } });
            return turf;
        });
    }
    rejectTurf(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const turf = yield turf_model_1.default.findOneAndUpdate({ _id: id }, { $set: { verify: false, verificationStatus: "rejected" } });
            return turf;
        });
    }
    getAllTurf() {
        return __awaiter(this, void 0, void 0, function* () {
            const allTurf = yield turf_model_1.default.find();
            return allTurf;
        });
    }
    blockUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield turf_model_1.default.findByIdAndUpdate(id, [{ $set: { status: { $not: ["$status"] } } }], { new: true });
            return user;
        });
    }
}
exports.default = TurfRepository;
