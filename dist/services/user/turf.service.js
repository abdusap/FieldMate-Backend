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
const slotBooking_repository_1 = __importDefault(require("../../repositories/user/slotBooking.repository"));
const turf_repository_1 = __importDefault(require("../../repositories/user/turf.repository"));
const slotBookingRepository = new slotBooking_repository_1.default();
class TurfService extends turf_repository_1.default {
    allTurf(search, sports, location) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getAllTurf(search, sports, location);
            return data;
        });
    }
    TurfDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const turf = yield this.turfDetails(id);
            const Turf = yield this.turfData(id);
            return {
                "turf": Turf,
                "turfDetails": turf
            };
        });
    }
    AvailableSports(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield this.availableSports(id);
            return details;
        });
    }
    AvailableSlots(turfId, sports, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const getAllBookedSlots = yield slotBookingRepository.getAllBookedSlots(turfId, sports, date);
            const getAllSlots = yield this.getSlots(turfId);
            return {
                "bookedSlots": getAllBookedSlots,
                "allSlots": getAllSlots
            };
        });
    }
}
exports.default = TurfService;
