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
class TurfRepository {
    getAllTurf(search, sports, location) {
        return __awaiter(this, void 0, void 0, function* () {
            const pipeline = [
                { $unwind: "$sports" },
                { $lookup: {
                        from: "sports",
                        localField: "sports",
                        foreignField: "_id",
                        as: "sports_info"
                    } },
                { $unwind: "$sports_info" },
                { $group: {
                        _id: "$_id",
                        turfId: { $first: "$turfId" },
                        amenities: { $first: "$amenities" },
                        groundName: { $first: "$groundName" },
                        image: { $first: "$image" },
                        rules: { $first: "$rules" },
                        slots: { $first: "$slots" },
                        website: { $first: "$website" },
                        sports: { $push: "$sports_info.name" }
                    } }, { $lookup: {
                        from: "turfs",
                        localField: "turfId",
                        foreignField: "_id",
                        as: "info"
                    } },
                { $project: {
                        turfId: 1,
                        groundName: 1,
                        image: 1,
                        sports: 1,
                        location: { $arrayElemAt: ["$info.location", 0] }
                    } },
                { $lookup: {
                        from: "locations",
                        localField: "location",
                        foreignField: "_id",
                        as: "Location"
                    } },
                { $project: {
                        turfId: 1,
                        groundName: 1,
                        image: 1,
                        sports: 1,
                        location: { $arrayElemAt: ["$Location.name", 0] }
                    } },
            ];
            const Location = {
                $match: {
                    location: location
                }
            };
            const Search = {
                $match: {
                    groundName: { $regex: search, $options: 'i' }
                }
            };
            const Sports = {
                $match: {
                    sports: { $elemMatch: { $eq: sports } }
                }
            };
            if (location !== "" && sports === "" && search === "") {
                pipeline.push(Location);
            }
            if (sports !== "" && location === "" && search === "") {
                pipeline.push(Sports);
            }
            if (search !== "" && location === "" && sports === "") {
                pipeline.push(Search);
            }
            if (location !== "" && sports !== "" && search === "") {
                pipeline.push(Location);
                pipeline.push(Sports);
            }
            if (location !== "" && sports === "" && search !== "") {
                pipeline.push(Location);
                pipeline.push(Search);
            }
            if (location === "" && sports !== "" && search !== "") {
                pipeline.push(Sports);
                pipeline.push(Search);
            }
            if (location !== "" && sports !== "" && search !== "") {
                pipeline.push(Search);
                pipeline.push(Sports);
                pipeline.push(Location);
            }
            const details = yield turfDetails_model_1.default.aggregate(pipeline);
            return details;
        });
    }
    turfDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield turfDetails_model_1.default.aggregate([
                { $match: {
                        turfId: new mongoose_1.Types.ObjectId(id)
                    } }, { $unwind: "$sports" },
                { $lookup: {
                        from: "sports",
                        localField: "sports",
                        foreignField: "_id",
                        as: "sports_info"
                    } },
                { $unwind: "$sports_info" },
                { $group: {
                        _id: "$_id",
                        turfId: { $first: "$turfId" },
                        amenities: { $first: "$amenities" },
                        groundName: { $first: "$groundName" },
                        image: { $first: "$image" },
                        rules: { $first: "$rules" },
                        slots: { $first: "$slots" },
                        website: { $first: "$website" },
                        sports: { $push: "$sports_info.name" }
                    } },
            ]);
            return details;
        });
    }
    turfData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield turf_model_1.default.aggregate([
                { $match: {
                        _id: new mongoose_1.Types.ObjectId(id)
                    } }, { $lookup: {
                        from: "locations",
                        localField: "location",
                        foreignField: "_id",
                        as: "location_info"
                    } }, {
                    $project: {
                        location: { $arrayElemAt: ["$location_info.name", 0] },
                        gioCoordinates: 1,
                        email: 1,
                        mobile: 1
                    }
                }
            ]);
            return data;
        });
    }
    availableSports(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sports = yield turfDetails_model_1.default.aggregate([
                {
                    $match: {
                        turfId: new mongoose_1.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: "sports",
                        localField: "sports",
                        foreignField: "_id",
                        as: "sportsDetails"
                    }
                },
                {
                    $unwind: "$sportsDetails"
                },
                {
                    $project: {
                        _id: 0,
                        //   "sportsDetails.name": 1
                        name: "$sportsDetails.name",
                        id: "$sportsDetails._id",
                    }
                }
            ]);
            return sports;
        });
    }
    getSlots(turfId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield turfDetails_model_1.default.findOne({ turfId: turfId });
            return data;
        });
    }
}
exports.default = TurfRepository;
