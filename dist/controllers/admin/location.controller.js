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
exports.editLocation = exports.findLocation = exports.getLocationAndSports = exports.addLocation = void 0;
const location_service_1 = __importDefault(require("../../services/admin/location.service"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const error_1 = __importDefault(require("../../error/error"));
const locationService = new location_service_1.default();
exports.addLocation = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const location = yield locationService.AddLocation(name);
    console.log(location);
    if (location)
        res.json({ success: true });
    else
        throw new error_1.default(409, "Location Exist");
}));
const getLocationAndSports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield locationService.GetLocationAndSport();
    res.json({ data });
});
exports.getLocationAndSports = getLocationAndSports;
const findLocation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    console.log(id);
    const data = yield locationService.FindLocation(id);
    console.log(data);
    res.json({ data });
});
exports.findLocation = findLocation;
const editLocation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.body;
    const data = yield locationService.EditLocation(id, name);
    // console.log(data)
    res.json({ data, success: true });
});
exports.editLocation = editLocation;
