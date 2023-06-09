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
const review_repository_1 = __importDefault(require("../../repositories/user/review.repository"));
class ReviewService extends review_repository_1.default {
    AddReview(turfId, userId, title, rating, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield this.addReview(turfId, userId, title, rating, message);
            return details;
        });
    }
    AllReview(turfId) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield this.allReview(turfId);
            return details;
        });
    }
    GetReview(turfId) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield this.getReview(turfId);
            return details;
        });
    }
}
exports.default = ReviewService;
