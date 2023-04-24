"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.login = exports.verifyOtp = exports.signup = exports.jwtChecker = void 0;
const turf_validation_1 = __importDefault(require("../../validation/turf.validation"));
const turf_service_1 = __importDefault(require("../../services/turf/turf.service"));
const error_1 = __importDefault(require("../../error/error"));
const send_mail_1 = require("../../helper/send.mail");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const turfService = new turf_service_1.default();
exports.jwtChecker = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    console.log('hai');
    console.log(req.headers.authorization);
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            console.log(decoded);
            console.log(jsonwebtoken_1.JsonWebTokenError);
        }
    }
}));
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
exports.login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //       const authHeader = req.headers.authorization;
    // console.log(authHeader);
    const { email, password } = req.body;
    const Turf = yield turfService.Login(email, password);
    if (Turf != null) {
        const { matchStatus, account } = Turf;
        if (matchStatus == true) {
            const token = jsonwebtoken_1.default.sign(JSON.parse(JSON.stringify(account)), process.env.JWT_SECRET, { expiresIn: 86400 });
            res.send({ success: true, token: token, account: account });
        }
        if (matchStatus == false) {
            throw new error_1.default(401, "Email or Password Incorrect");
            res.send({ success: false });
        }
    }
    else {
        throw new error_1.default(404, "Invalid Details");
    }
}));
