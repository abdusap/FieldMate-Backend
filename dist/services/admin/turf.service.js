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
const send_mail_1 = require("../../helper/send.mail");
const turf_repository_1 = __importDefault(require("../../repositories/admin/turf.repository"));
class turfService extends turf_repository_1.default {
    AllTurf() {
        return __awaiter(this, void 0, void 0, function* () {
            const allTurf = yield this.allTurf();
            return allTurf;
        });
    }
    AcceptTurf(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const turf = yield this.acceptTurf(id);
            console.log(turf);
            const email = turf === null || turf === void 0 ? void 0 : turf.email;
            // stringify(email)
            (0, send_mail_1.sendMail)(email, "approved").then(() => {
                return turf;
            });
        });
    }
    RejectTurf(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const turf = yield this.rejectTurf(id);
            const email = turf === null || turf === void 0 ? void 0 : turf.email;
            (0, send_mail_1.sendMail)(email, "rejected").then(() => {
                return turf;
            });
        });
    }
    GetAllTurf() {
        return __awaiter(this, void 0, void 0, function* () {
            const allTurf = yield this.getAllTurf();
            return allTurf;
        });
    }
    BlockTurf(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield this.blockUser(id);
            return details;
        });
    }
}
exports.default = turfService;
