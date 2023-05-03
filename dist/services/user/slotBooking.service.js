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
class SlotBookingService extends slotBooking_repository_1.default {
    bookSlot(userId, turfId, date, slots, sports, total, walletAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.bookSlotWallet(userId, turfId, date, slots, sports, total, walletAmount);
            return data;
        });
    }
    BookSlotPayment(userId, turfId, date, slots, sports, total, paymentAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.bookSlotPayment(userId, turfId, date, slots, sports, total, paymentAmount);
            return data;
        });
    }
    BookSlotPaymentAndWallet(userId, turfId, date, slots, sports, total, walletAmount, paymentAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.bookSlotPaymentAndWallet(userId, turfId, date, slots, sports, total, walletAmount, paymentAmount);
            return data;
        });
    }
}
exports.default = SlotBookingService;
