"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = void 0;
const express_1 = __importDefault(require("express"));
const location_controller_1 = require("../controllers/admin/location.controller");
const sports_controller_1 = require("../controllers/admin/sports.controller");
exports.admin = express_1.default.Router();
exports.admin.post('/location', location_controller_1.addLocation);
exports.admin.post('/sports', sports_controller_1.addSports);
exports.admin.post('/location-and-sports', location_controller_1.getLocationAndSports);
exports.admin.post('/find_location', location_controller_1.findLocation);
exports.admin.post('/find_sports', sports_controller_1.findSports);
exports.admin.post('/edit_location', location_controller_1.editLocation);
exports.admin.post('/edit_sports', sports_controller_1.editSports);
