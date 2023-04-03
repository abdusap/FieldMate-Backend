"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const turfSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, 'name is require'] },
    mobile: { type: Number, required: [true, 'mobile is required'] },
    email: { type: String, required: [true, 'email is required'] },
    location: { type: mongoose_1.Types.ObjectId, required: [true, 'location is required'] },
    gioCoordinates: { type: String, required: [true, 'coordinates is required'] },
    password: { type: String, required: [true, 'password is required'] },
    verify: { type: Boolean, required: true, default: false },
    verificationStatus: { type: String, required: true, default: "Pending" },
    status: { type: Boolean, required: true, default: true }
});
exports.default = (0, mongoose_1.model)("Turfs", turfSchema);
