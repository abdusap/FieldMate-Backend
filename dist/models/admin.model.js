"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    email: { type: String },
    password: { type: String }
});
exports.default = (0, mongoose_1.model)("Admin", adminSchema);
