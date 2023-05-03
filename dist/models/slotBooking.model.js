"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slotBookingSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId },
    turfId: { type: mongoose_1.Types.ObjectId },
    sports: { type: mongoose_1.Types.ObjectId },
    date: { type: Date },
    slots: { type: [String] },
    total: { type: Number },
    walletAmount: { type: Number, default: 0 },
    paymentAmount: { type: Number, default: 0 },
    status: { type: Boolean, default: true },
});
exports.default = (0, mongoose_1.model)("SlotBooking", slotBookingSchema);
