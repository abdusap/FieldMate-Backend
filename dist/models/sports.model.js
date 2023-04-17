"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sportsSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    status: { type: Boolean, default: true }
});
exports.default = (0, mongoose_1.model)("Sports", sportsSchema);
