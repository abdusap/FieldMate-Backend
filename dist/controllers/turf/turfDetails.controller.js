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
exports.deleteImage = exports.getSlot = exports.addSlot = exports.addRules = exports.addAmenity = exports.details = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const turfDetails_service_1 = __importDefault(require("../../services/turf/turfDetails.service"));
const TurfDetails = new turfDetails_service_1.default();
exports.details = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // throws error is req.files is undefined or not an array or array of length 0
    //   if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
    //         console.log('error');
    //         throw new AppError(500,'something went wrong')
    //         }
    const images = [];
    if ((req === null || req === void 0 ? void 0 : req.files) && (req === null || req === void 0 ? void 0 : req.files) instanceof Array) {
        for (let i = 0; i < (req === null || req === void 0 ? void 0 : req.files.length); i++) {
            images.push(req.files[i].path);
        }
    }
    const { turfId, groundName, website } = req.body;
    const sport = JSON.parse(req.body.sports);
    const sports = [];
    for (let i = 0; i < sport.length; i++) {
        sports.push(sport[i].value);
    }
    yield TurfDetails.AddTurfDetails(turfId, groundName, website, sports, images);
    res.send({ success: true });
}));
exports.addAmenity = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { turfId, amenity } = req.body;
    const amenities = yield TurfDetails.AddAmenity(turfId, amenity);
    res.send({ success: true });
}));
exports.addRules = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { turfId, rules } = req.body;
    const rule = yield TurfDetails.AddRules(turfId, rules);
    res.send({ success: true });
}));
exports.addSlot = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { turfId, slots, price } = req.body;
    console.log(req.body);
    const rule = yield TurfDetails.AddSlot(turfId, slots, price);
    res.send({ success: true });
}));
exports.getSlot = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const turfId = req.query.id;
    const slot = yield TurfDetails.GetSlot(turfId);
    res.send({ success: true, slot });
}));
exports.deleteImage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, image } = req.body;
    console.log(req.body);
    yield TurfDetails.DeleteImage(id, image);
    res.send({ succes: true });
}));
