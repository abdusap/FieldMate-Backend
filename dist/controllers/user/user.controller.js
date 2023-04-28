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
exports.login = exports.verityOtp = exports.signup = void 0;
const user_validation_1 = __importDefault(require("../../validation/user.validation"));
const twilio_1 = require("../../config/twilio");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = __importDefault(require("../../services/user/user.service"));
const userService = new user_service_1.default();
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const formData = req.body;
    user_validation_1.default
        .validate(formData)
        .then((validatedData) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, mobile, email } = validatedData;
        const authUser = yield userService.finduser(name, mobile, email);
        if (authUser)
            res.send({ success: false });
        else
            (0, twilio_1.sendVerificationToken)(mobile).then((status) => {
                if (status)
                    res.send({ success: true });
            });
    }))
        .catch((validationErrors) => {
        console.log(validationErrors.message);
    });
});
exports.signup = signup;
const verityOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp, mobile, name, email, password } = req.body;
    const checkOtp = yield (0, twilio_1.checkVerificationToken)(otp, mobile);
    if (checkOtp) {
        yield userService.createUser(name, mobile, email, password);
        res.json({ ok: true });
    }
    else
        res.json({ ok: false });
});
exports.verityOtp = verityOtp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userService.verifyUser(email, password);
    if (user === null) {
        res.json({ message: "Invalid user" });
    }
    else if (user.matchPassword === true) {
        const data = { id: JSON.parse(JSON.stringify(user.user._id)), name: user.user.name };
        const token = jsonwebtoken_1.default.sign(data, "mysecretkey", { expiresIn: 86400 });
        console.log(token);
        res.json({ verify: true, message: "true", token: token, user: user.user });
    }
    else if (user.matchPassword === false) {
        res.json({ verify: false, message: "Email or Password Incorrect" });
    }
    else {
        res.json({ message: "Invalid user" });
    }
});
exports.login = login;
