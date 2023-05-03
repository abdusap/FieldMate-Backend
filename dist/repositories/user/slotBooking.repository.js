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
const slotBooking_model_1 = __importDefault(require("../../models/slotBooking.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
class SlotBookingRepository {
    getAllBookedSlots(turfId, sports, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield slotBooking_model_1.default.find({ turfId: turfId, sports: sports, date: date });
            return data;
        });
    }
    bookSlotWallet(userId, turfId, date, slots, sports, total, walletAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new slotBooking_model_1.default({
                userId, turfId, sports, date, slots, total, walletAmount
            });
            data.save();
            yield user_model_1.default.findOneAndUpdate({ _id: userId }, { $inc: { wallet: -walletAmount } });
            return data;
        });
    }
    bookSlotPayment(userId, turfId, date, slots, sports, total, paymentAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new slotBooking_model_1.default({
                userId, turfId, sports, date, slots, total, paymentAmount
            });
            data.save();
            return data;
        });
    }
    bookSlotPaymentAndWallet(userId, turfId, date, slots, sports, total, walletAmount, paymentAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new slotBooking_model_1.default({
                userId, turfId, sports, date, slots, total, walletAmount, paymentAmount
            });
            data.save();
            return data;
        });
    }
}
exports.default = SlotBookingRepository;
