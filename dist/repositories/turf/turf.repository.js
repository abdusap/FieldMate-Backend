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
    createTurf(name, mobile, email, location, gioCoordinates, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const turf = new turf_model_1.default({ name, mobile, email, location, gioCoordinates, password });
            yield turf.save();
            return turf;
        });
    }
    findTurf(email, mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            const turf = yield turf_model_1.default.findOne({
                $or: [{ email: email }, { mobile: mobile }]
            });
            return turf;
        });
    }
    loginTurf(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield turf_model_1.default.findOne({ email: email });
            return details;
        });
    }
    findTurfById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield turf_model_1.default.findById(id);
            return details;
        });
    }
    turfDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield turf_model_1.default.findById(id);
            return details;
        });
    }
}
exports.default = TurfRepository;
