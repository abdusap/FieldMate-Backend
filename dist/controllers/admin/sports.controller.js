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
exports.editSports = exports.findSports = exports.addSports = void 0;
const sports_service_1 = __importDefault(require("../../services/admin/sports.service"));
const sportsService = new sports_service_1.default();
const addSports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { name } = req.body;
    yield sportsService.AddSport(name);
    res.json({ success: true });
});
exports.addSports = addSports;
const findSports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    console.log(id);
    const data = yield sportsService.FindSports(id);
    console.log(data);
    res.json({ data });
});
exports.findSports = findSports;
const editSports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.body;
    const data = yield sportsService.EditSports(id, name);
    // console.log(data)
    res.json({ data, success: true });
});
exports.editSports = editSports;
