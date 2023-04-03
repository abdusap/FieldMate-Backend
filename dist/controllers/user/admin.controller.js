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
exports.editSports = exports.findSports = exports.editLocation = exports.findLocation = exports.getLocationAndSports = exports.addSports = exports.addLocation = void 0;
const admin_service_1 = __importDefault(require("../../services/admin/admin.service"));
const adminservice = new admin_service_1.default();
const addLocation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const location = yield adminservice.AddLocation(name);
    res.json({ success: true });
});
exports.addLocation = addLocation;
const addSports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { name } = req.body;
    yield adminservice.AddSport(name);
    res.json({ success: true });
});
exports.addSports = addSports;
const getLocationAndSports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield adminservice.GetLocationAndSport();
    res.json({ data });
});
exports.getLocationAndSports = getLocationAndSports;
const findLocation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    console.log(id);
    const data = yield adminservice.FindLocation(id);
    console.log(data);
    res.json({ data });
});
exports.findLocation = findLocation;
const editLocation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.body;
    const data = yield adminservice.EditLocation(id, name);
    // console.log(data)
    res.json({ data, success: true });
});
exports.editLocation = editLocation;
const findSports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    console.log(id);
    const data = yield adminservice.FindSports(id);
    console.log(data);
    res.json({ data });
});
exports.findSports = findSports;
const editSports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.body;
    const data = yield adminservice.EditSports(id, name);
    // console.log(data)
    res.json({ data, success: true });
});
exports.editSports = editSports;
