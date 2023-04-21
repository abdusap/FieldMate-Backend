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
exports.getAllSportsAndDetails = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const sports_service_1 = __importDefault(require("../../services/turf/sports.service"));
const turfDetails_service_1 = __importDefault(require("../../services/turf/turfDetails.service"));
const sportsService = new sports_service_1.default();
const turfDetail = new turfDetails_service_1.default();
exports.getAllSportsAndDetails = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query);
    const turfId = req.query.id;
    const allSports = yield sportsService.AllSports();
    const details = yield turfDetail.GetTurfDetails(turfId);
    // console.log(details);
    res.send({ allSports, details });
}));
