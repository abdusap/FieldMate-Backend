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
exports.dashboardDetails = exports.slotDetails = exports.cancelSlot = exports.getSlotBooking = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const slotBooking_service_1 = __importDefault(require("../../services/turf/slotBooking.service"));
const slotBookingService = new slotBooking_service_1.default();
exports.getSlotBooking = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const details = yield slotBookingService.AllSlotBooking(id);
    res.send({ details });
}));
exports.cancelSlot = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query;
    yield slotBookingService.CancelSlot(id);
    res.send({ success: true });
}));
exports.slotDetails = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query;
    const data = yield slotBookingService.SlotDetails(id);
    const details = data[0];
    res.send({ details });
}));
exports.dashboardDetails = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const details = yield slotBookingService.GetAllSlotBooking(id);
    const slotBooking = details.slotBooking;
    const reviewCount = details.reviewCount;
    res.send({ slotBooking, reviewCount });
}));
