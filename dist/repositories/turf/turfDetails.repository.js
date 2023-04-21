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
const turf_model_1 = __importDefault(require("../../models/turf.model"));
const turfDetails_model_1 = __importDefault(require("../../models/turfDetails.model"));
const mongoose_1 = require("mongoose");
// import  Types  from "mongoose";
class TurfDetailsRepository {
    addTurfDetails(turfID, groundName, website, sport, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const sports = sport.map(sport => new mongoose_1.Types.ObjectId(sport));
            const turfId = new mongoose_1.Types.ObjectId(turfID);
            // const turfDetails = new turfDetailsModel({turfId,groundName,website,sports,image})
            // await turfDetails.save();
            const turfDetails = yield turfDetails_model_1.default.findOneAndUpdate({ turfId }, { $set: { turfId, groundName, website, sports, image } }, { upsert: true, new: true });
            return turfDetails;
        });
    }
    addAmenity(turfId, amenity) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield turfDetails_model_1.default.findOneAndUpdate({ turfId: new mongoose_1.Types.ObjectId(turfId) }, { $set: { amenities: amenity } });
            return details;
        });
    }
    addRules(turfId, rules) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield turfDetails_model_1.default.findOneAndUpdate({ turfId: new mongoose_1.Types.ObjectId(turfId) }, { $set: { rules: rules } });
            return details;
        });
    }
    getTurfDetails(turfId) {
        return __awaiter(this, void 0, void 0, function* () {
            // const data=await turfModel.findOne({_id:turfId})
            const data = yield turf_model_1.default.aggregate([
                { $match: { _id: new mongoose_1.Types.ObjectId(turfId) } },
                { $lookup: {
                        from: "locations",
                        localField: "location",
                        foreignField: "_id",
                        as: "locationName"
                    } },
                { $project: {
                        email: 1,
                        mobile: 1,
                        gioCoordinates: 1,
                        location: { $arrayElemAt: ["$locationName.name", 0] }
                    } }
            ]);
            const details = yield turfDetails_model_1.default.findOne({ turfId: turfId });
            return {
                turf: data,
                details: details
            };
        });
    }
    addSlot(turfId, slots, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield turfDetails_model_1.default.findOneAndUpdate({ turfId: new mongoose_1.Types.ObjectId(turfId) }, { $set: { price: price, slots: slots } });
            return details;
        });
    }
    getSlot(turfId) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield turfDetails_model_1.default.findOne({ turfId: new mongoose_1.Types.ObjectId(turfId) });
            return details;
        });
    }
}
exports.default = TurfDetailsRepository;
