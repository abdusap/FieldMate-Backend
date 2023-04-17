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
const location_model_1 = __importDefault(require("../../models/location.model"));
const mongodb_1 = require("mongodb");
class LocationRepository {
    addLocation(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const location = new location_model_1.default({ name });
            yield location.save();
            return location;
        });
    }
    isLocationExist(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const locationExist = yield location_model_1.default.findOne({ name: name });
            console.log(locationExist);
            return locationExist;
        });
    }
    findLocation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectId = new mongodb_1.ObjectId(id);
            const locationData = yield location_model_1.default.findById(objectId);
            return locationData;
        });
    }
    getAllLocation() {
        return __awaiter(this, void 0, void 0, function* () {
            const AllLocationData = yield location_model_1.default.find();
            return AllLocationData;
        });
    }
    editLocation(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectId = new mongodb_1.ObjectId(id);
            const locationData = yield location_model_1.default.findByIdAndUpdate(objectId, { $set: { name: name } });
            return locationData;
        });
    }
}
exports.default = LocationRepository;
