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
const review_model_1 = __importDefault(require("../../models/review.model"));
class ReviewRepository {
    addReview(turfId, userId, title, rating, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = new Date();
            const review = new review_model_1.default({
                turfId,
                userId,
                title,
                rating,
                message,
                date
            });
            review.save();
            return review;
        });
    }
    allReview(turfId) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield review_model_1.default.find({ turfId });
            return details;
        });
    }
    reviewCount(turfId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield review_model_1.default.count({ turfId: turfId });
            return count;
        });
    }
    getReview(turfId) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield review_model_1.default.find({ turfId }).sort({ rating: -1 }).limit(8);
            return details;
        });
    }
}
exports.default = ReviewRepository;
