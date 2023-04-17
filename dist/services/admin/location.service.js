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
const location_repository_1 = __importDefault(require("../../repositories/admin/location.repository"));
const sports_repository_1 = __importDefault(require("../../repositories/admin/sports.repository"));
// const locationRepository=new LocationRepository()
const sportsRepository = new sports_repository_1.default();
class LocationService extends location_repository_1.default {
    AddLocation(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const locatonExist = yield this.isLocationExist(name);
            if (locatonExist) {
                const exist = false;
                return exist;
            }
            const location = this.addLocation(name);
            return location;
        });
    }
    FindLocation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.findLocation(id);
            return data;
        });
    }
    GetLocationAndSport() {
        return __awaiter(this, void 0, void 0, function* () {
            const allSports = yield sportsRepository.getAllSports();
            const allLocation = yield this.getAllLocation();
            const data = {
                location: allLocation,
                sports: allSports
            };
            return data;
        });
    }
    EditLocation(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.editLocation(id, name);
            return data;
        });
    }
}
exports.default = LocationService;
