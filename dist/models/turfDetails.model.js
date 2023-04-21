"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const turfDetailsSchema = new mongoose_1.Schema({
    turfId: { type: mongoose_1.Types.ObjectId },
    groundName: { type: String },
    website: { type: String },
    sports: { type: [mongoose_1.Types.ObjectId] },
    image: { type: [String] },
    amenities: { type: [String] },
    rules: { type: [String] },
    price: { type: Number },
    slots: { type: [String] }
});
exports.default = (0, mongoose_1.model)("TurfDetails", turfDetailsSchema);
