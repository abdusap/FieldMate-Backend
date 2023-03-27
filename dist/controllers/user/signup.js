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
exports.verityOtp = exports.signup = void 0;
const user_validation_1 = __importDefault(require("../../validation/user.validation"));
const auth_user_services_1 = __importDefault(require("../../services/user/auth.user.services"));
const twilio_1 = require("../../config/twilio");
const authService = new auth_user_services_1.default();
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const formData = req.body;
    const mobile = req.body.mobile;
    user_validation_1.default.validate(formData).then((validatedData) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, mobile, email, password } = validatedData;
        const authUser = yield authService.finduser(name, mobile, email, password);
        if (authUser)
            res.send({ success: false });
        else
            (0, twilio_1.sendVerificationToken)(mobile).then((status) => {
                if (status)
                    res.send({ success: true });
            });
    })).catch((validationErrors) => {
        console.log(validationErrors.message);
    });
});
exports.signup = signup;
const verityOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp, mobile, name, email, password } = req.body;
    const checkOtp = yield (0, twilio_1.checkVerificationToken)(otp, mobile);
    if (checkOtp) {
        yield authService.createUser(name, mobile, email, password);
        res.json({ ok: true });
    }
    else
        res.json({ ok: false });
});
exports.verityOtp = verityOtp;
