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
const turfDetails_repository_1 = __importDefault(require("../../repositories/turf/turfDetails.repository"));
// const turfDetailsRepository=new TurfDetailsRepository
class turfDetails extends turfDetails_repository_1.default {
    AddTurfDetails(turfId, groundName, website, sports, images) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield this.addTurfDetails(turfId, groundName, website, sports, images);
            return details;
        });
    }
    AddAmenity(turfId, amenity) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield this.addAmenity(turfId, amenity);
            return details;
        });
    }
    AddRules(turfId, rules) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield this.addRules(turfId, rules);
            return details;
        });
    }
    GetTurfDetails(turfId) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield this.getTurfDetails(turfId);
            return details;
        });
    }
    AddSlot(turfId, slots, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield this.addSlot(turfId, slots, price);
            return details;
        });
    }
    GetSlot(turfId) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield this.getSlot(turfId);
            return details;
        });
    }
}
exports.default = turfDetails;
