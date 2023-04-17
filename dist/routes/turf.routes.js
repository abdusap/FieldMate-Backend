"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.turf = void 0;
const express_1 = __importDefault(require("express"));
const location_controller_1 = require("../controllers/turf/location.controller");
const turf_controller_1 = require("../controllers/turf/turf.controller");
exports.turf = express_1.default.Router();
exports.turf.get('/all_location', location_controller_1.allLocation);
exports.turf.post('/signup', turf_controller_1.signup);
// turf.patch('/turf_exist',checkTurfDupe)
exports.turf.post('/otp', turf_controller_1.verifyOtp);
