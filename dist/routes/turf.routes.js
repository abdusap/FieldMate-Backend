"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.turf = void 0;
const express_1 = __importDefault(require("express"));
const location_controller_1 = require("../controllers/turf/location.controller");
const turf_controller_1 = require("../controllers/turf/turf.controller");
const turfDetails_controller_1 = require("../controllers/turf/turfDetails.controller");
const multer_1 = __importDefault(require("../helper/multer"));
const sports_controller_1 = require("../controllers/turf/sports.controller");
exports.turf = express_1.default.Router();
exports.turf.get('/jwt', turf_controller_1.jwtChecker);
exports.turf.get('/all_location', location_controller_1.allLocation);
exports.turf.post('/signup', turf_controller_1.signup);
// turf.patch('/turf_exist',checkTurfDupe)
exports.turf.post('/otp', turf_controller_1.verifyOtp);
exports.turf.post('/turf_details', multer_1.default.array('image', 2), turfDetails_controller_1.details);
// ,uploadCloudinary.array('image')
exports.turf.get('/all_turf_details', sports_controller_1.getAllSportsAndDetails);
exports.turf.post('/add_amenity', turfDetails_controller_1.addAmenity);
exports.turf.post('/add_rules', turfDetails_controller_1.addRules);
exports.turf.post('/login', turf_controller_1.login);
exports.turf.post('/add_slot', turfDetails_controller_1.addSlot);
exports.turf.get('/get_slot', turfDetails_controller_1.getSlot);
