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
const mongoose_1 = require("mongoose");
const user_model_1 = __importDefault(require("../../models/user.model"));
class SlotBookingRepository {
    allSlotBooking(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield slotBooking_model_1.default.aggregate([
                {
                    $match: {
                        turfId: new mongoose_1.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: "sports",
                        localField: "sports",
                        foreignField: "_id",
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
                        total: 1,
                        sports: { $arrayElemAt: ["$sports_info.name", 0] }
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user_info"
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
                        total: 1,
                        name: { $arrayElemAt: ["$user_info.name", 0] },
                        mobile: { $arrayElemAt: ["$user_info.mobile", 0] }
                    }
                },
            ]);
            return details;
        });
    }
    cancelSlot(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield slotBooking_model_1.default.findByIdAndUpdate(new mongoose_1.Types.ObjectId(id), [{ $set: { status: { $not: ["$status"] } } }], { new: true });
            const userId = details.userId;
            const total = details.total;
            const data = yield user_model_1.default.findByIdAndUpdate(userId, { $inc: { wallet: total } });
            return data;
        });
    }
    slotDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield slotBooking_model_1.default.aggregate([
                {
                    $match: {
                        _id: new mongoose_1.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: "sports",
                        localField: "sports",
                        foreignField: "_id",
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
                        total: 1,
                        paymentAmount: 1,
                        walletAmount: 1,
                        sports: { $arrayElemAt: ["$sports_info.name", 0] }
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user_info"
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
                        total: 1,
                        paymentAmount: 1,
                        walletAmount: 1,
                        name: { $arrayElemAt: ["$user_info.name", 0] },
                        mobile: { $arrayElemAt: ["$user_info.mobile", 0] }
                    }
                },
            ]);
            return details;
        });
    }
    getAllSlotBooking(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield slotBooking_model_1.default.find({ turfId: id });
            return data;
        });
    }
}
exports.default = SlotBookingRepository;
