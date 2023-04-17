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
exports.verifyOtp = exports.signup = void 0;
const turf_validation_1 = __importDefault(require("../../validation/turf.validation"));
const turf_service_1 = __importDefault(require("../../services/turf/turf.service"));
const error_1 = __importDefault(require("../../error/error"));
const send_mail_1 = require("../../helper/send.mail");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const turfService = new turf_service_1.default();
exports.signup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formData = req.body;
        const validatedData = yield turf_validation_1.default.validate(formData);
        const { mobile, email } = validatedData;
        const turfExist = yield turfService.FindTurf(mobile, email);
        console.log(turfExist);
        if (turfExist)
            throw new error_1.default(409, "User Already Exist");
        else {
            const otp = yield (0, send_mail_1.sendMail)(email, "otp");
            console.log(otp);
            res.json({ success: true, otp: otp });
        }
    }
    catch (err) {
        throw new error_1.default(400, err.message);
    }
}));
exports.verifyOtp = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const orgOTP = req.body.OTP;
    const enteredOTP = parseInt(req.body.EnteredOtp);
    if (orgOTP === enteredOTP) {
        console.log('verified');
        const { name, mobile, email, location, gioCoordinates, password } = req.body;
        yield turfService.CreateTurf(name, mobile, email, location, gioCoordinates, password);
        res.send({ ok: true });
    }
    else {
        throw new error_1.default(400, "Verification Failed");
    }
}));
