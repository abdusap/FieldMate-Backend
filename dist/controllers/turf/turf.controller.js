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
exports.signup = void 0;
const turf_validation_1 = __importDefault(require("../../validation/turf.validation"));
const turf_service_1 = __importDefault(require("../../services/turf/turf.service"));
const error_1 = __importDefault(require("../../error/error"));
const send_mail_1 = require("../../helper/send.mail");
const turfService = new turf_service_1.default();
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formData = req.body;
        turf_validation_1.default
            .validate(formData)
            .then((validatedData) => __awaiter(void 0, void 0, void 0, function* () {
            const { name, mobile, email, location, gioCoordinates, password } = validatedData;
            const otp = yield (0, send_mail_1.sendMail)(email, "approved");
            console.log(otp);
            const turfExist = yield turfService.FindTurf(mobile, email);
            console.log(turfExist);
            if (turfExist)
                res.send({ success: false });
            else {
                const newTurf = yield turfService.CreateTurf(name, mobile, email, location, gioCoordinates, password);
                console.log(newTurf);
                res.send({ success: true });
            }
            // sendVerificationToken(mobile).then((status) => {
            //   if (status) res.send({ success: true });
            // });
        })).catch(err => {
            throw error_1.default.validationError(err.message);
        });
    }
    catch (err) {
        next(err);
        // throw new AppError(500,err.message);
        // console.log(err)
    }
});
exports.signup = signup;
