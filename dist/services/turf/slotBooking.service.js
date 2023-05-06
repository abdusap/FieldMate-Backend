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
const slotBooking_repository_1 = __importDefault(require("../../repositories/turf/slotBooking.repository"));
const review_repository_1 = __importDefault(require("../../repositories/user/review.repository"));
const reviewRepository = new review_repository_1.default();
class SlotBookingService extends slotBooking_repository_1.default {
    AllSlotBooking(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield this.allSlotBooking(id);
            return details;
        });
    }
    CancelSlot(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield this.cancelSlot(id);
            return details;
        });
    }
    SlotDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield this.slotDetails(id);
            return details;
        });
    }
    GetAllSlotBooking(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield this.getAllSlotBooking(id);
            const reviewCount = yield reviewRepository.reviewCount(id);
            return {
                "slotBooking": details,
                "reviewCount": reviewCount
            };
        });
    }
}
exports.default = SlotBookingService;
