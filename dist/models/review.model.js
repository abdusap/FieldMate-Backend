"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    turfId: { type: mongoose_1.Types.ObjectId, required: true },
    userId: { type: mongoose_1.Types.ObjectId, required: true },
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    message: { type: String, required: true },
    date: { type: Date },
});
exports.default = (0, mongoose_1.model)("Review", reviewSchema);
