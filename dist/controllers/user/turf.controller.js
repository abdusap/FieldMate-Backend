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
exports.allLocationAndSports = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const sports_service_1 = __importDefault(require("../../services/user/sports.service"));
const locaton_service_1 = __importDefault(require("../../services/user/locaton.service"));
const sportService = new sports_service_1.default();
const locationService = new locaton_service_1.default();
exports.allLocationAndSports = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sports = yield sportService.allSports();
    const location = yield locationService.getLocation();
    res.send({ sports: sports, location: location });
}));
