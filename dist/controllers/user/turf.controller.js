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
exports.availableSlots = exports.availableSports = exports.turfDetails = exports.allTurf = exports.allLocationAndSports = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const sports_service_1 = __importDefault(require("../../services/user/sports.service"));
const locaton_service_1 = __importDefault(require("../../services/user/locaton.service"));
const turf_service_1 = __importDefault(require("../../services/user/turf.service"));
const sportService = new sports_service_1.default();
const locationService = new locaton_service_1.default();
const turfService = new turf_service_1.default();
exports.allLocationAndSports = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sports = yield sportService.allSports();
    const location = yield locationService.getLocation();
    res.send({ sports: sports, location: location });
}));
exports.allTurf = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, sports, location } = req.query;
    const turfs = yield turfService.allTurf(search, sports, location);
    res.send({ turfs });
}));
exports.turfDetails = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query);
    const id = req.query.id;
    const details = yield turfService.TurfDetails(id);
    const { turf, turfDetails } = details;
    res.send({ turf: turf[0], turfDetails: turfDetails[0] });
}));
exports.availableSports = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const sports = yield turfService.AvailableSports(id);
    // console.log(sports);
    res.send({ sports });
}));
exports.availableSlots = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { turfId, sports, date } = req.query;
    console.log(turfId);
    console.log(sports);
    console.log(date);
    const slots = yield turfService.AvailableSlots(turfId, sports, date);
    const bookedSlots = slots.bookedSlots;
    const allSlots = slots.allSlots.slots;
    if (bookedSlots.length == 0) {
        res.send({ allSlots, allSlot: true });
    }
    else {
        console.log(bookedSlots);
        const BookedSlots = [];
        bookedSlots.forEach((element) => {
            element.slots.forEach((data) => {
                BookedSlots.push(data);
            });
        });
        res.send({ allSlots, BookedSlots, bookedSlot: true });
    }
}));
