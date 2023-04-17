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
const sports_model_1 = __importDefault(require("../../models/sports.model"));
const mongodb_1 = require("mongodb");
class SportsRepository {
    addSports(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const sports = new sports_model_1.default({ name });
            yield sports.save();
            return sports;
        });
    }
    isSportsExist(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const sportsExist = yield sports_model_1.default.findOne({ name: name });
            return sportsExist;
        });
    }
    findSports(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectId = new mongodb_1.ObjectId(id);
            const locationData = yield sports_model_1.default.findById(objectId);
            return locationData;
        });
    }
    // async findAllSports():Promise<object>{
    //     const sportsAllData=await sportsModel.find()
    //      return sportsAllData
    // }
    editSports(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectId = new mongodb_1.ObjectId(id);
            const sportsData = yield sports_model_1.default.findByIdAndUpdate(objectId, { $set: { name: name } });
            return sportsData;
        });
    }
    getAllSports() {
        return __awaiter(this, void 0, void 0, function* () {
            const sportsData = yield sports_model_1.default.find();
            return sportsData;
        });
    }
}
exports.default = SportsRepository;
