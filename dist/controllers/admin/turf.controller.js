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
exports.blockTurf = exports.getAllTurf = exports.rejectTurf = exports.acceptTurf = exports.allTurf = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const turf_service_1 = __importDefault(require("../../services/admin/turf.service"));
const TurfService = new turf_service_1.default();
exports.allTurf = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allTurf = yield TurfService.AllTurf();
    res.send({ allTurf });
}));
exports.acceptTurf = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const turfDetails = yield TurfService.AcceptTurf(id);
    res.send({ success: true });
}));
exports.rejectTurf = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    yield TurfService.RejectTurf(id);
    res.send({ success: true });
}));
exports.getAllTurf = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allTurf = yield TurfService.GetAllTurf();
    res.send({ allTurf });
}));
exports.blockTurf = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    yield TurfService.BlockTurf(id);
    res.send({ success: true });
}));
