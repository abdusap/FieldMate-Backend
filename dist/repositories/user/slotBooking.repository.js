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
const mongoose_1 = require("mongoose");
class SlotBookingRepository {
    getAllBookedSlots(turfId, sports, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield slotBooking_model_1.default.find({ turfId: turfId, sports: sports, date: date, status: true });
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
    allBooking(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield slotBooking_model_1.default.aggregate([
                {
                    $match: {
                        userId: new mongoose_1.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: 'sports',
                        localField: 'sports',
                        foreignField: '_id',
                        as: "sports_info"
                    }
                },
                {
                    $project: {
                        turfId: 1,
                        userId: 1,
                        date: 1,
                        slots: 1,
                        status: 1,
                        sports: { $arrayElemAt: ["$sports_info.name", 0] }
                    }
                },
                {
                    $lookup: {
                        from: 'turfdetails',
                        localField: 'turfId',
                        foreignField: 'turfId',
                        as: "turf_info"
                    }
                },
                {
                    $project: {
                        turfId: 1,
                        userId: 1,
                        date: 1,
                        slots: 1,
                        status: 1,
                        sports: 1,
                        groundName: { $arrayElemAt: ["$turf_info.groundName", 0] }
                    }
                },
            ]);
            return data;
        });
    }
    cancelBooking(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield slotBooking_model_1.default.findByIdAndUpdate(id, [{ $set: { status: { $not: ["$status"] } } }], { new: true });
            const userId = details.userId;
            const total = details.total;
            const data = yield user_model_1.default.findByIdAndUpdate(userId, { $inc: { wallet: total } });
            return data;
        });
    }
}
exports.default = SlotBookingRepository;
