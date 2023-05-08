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
exports.profileDetails = exports.cancelBooking = exports.allBooking = exports.allSports = exports.bookSlot = exports.getWalletAndPrice = exports.paymentSuccess = exports.orders = exports.login = exports.verityOtp = exports.signup = void 0;
const user_validation_1 = __importDefault(require("../../validation/user.validation"));
const twilio_1 = require("../../config/twilio");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = __importDefault(require("../../services/user/user.service"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const razorpay_1 = __importDefault(require("razorpay"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const crypto_1 = __importDefault(require("crypto"));
const slotBooking_service_1 = __importDefault(require("../../services/user/slotBooking.service"));
const sports_service_1 = __importDefault(require("../../services/user/sports.service"));
const sportsService = new sports_service_1.default();
const userService = new user_service_1.default();
const slotBookingService = new slotBooking_service_1.default();
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
const orders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const amount = req.query.amount;
        parseInt(amount);
        const instance = new razorpay_1.default({
            key_id: process.env.KEYID,
            key_secret: process.env.KEYSECRET,
        });
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: "receipt_order_74394",
        };
        const order = yield instance.orders.create(options);
        if (!order)
            return res.status(500).send("Some error occured");
        res.json(order);
    }
    catch (_a) {
        next();
    }
});
exports.orders = orders;
const paymentSuccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderCreationId, razorpayPaymentId, razorpayOrderId, razorpaySignature, } = req.body;
        const signature = crypto_1.default
            .createHmac("sha256", process.env.KEYSECRET)
            .update(`${orderCreationId}|${razorpayPaymentId}`)
            .digest("hex");
        if (signature !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });
        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.paymentSuccess = paymentSuccess;
exports.getWalletAndPrice = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, turfId } = req.query;
    const details = yield userService.getWalletAndPrice(turfId, userId);
    const wallet = details.user.wallet;
    const slotPrice = details.slotPrice.price;
    res.send({ wallet, slotPrice });
}));
exports.bookSlot = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, turfId, date, slots, sportsId, total, walletUsed, paymentAmount } = req.body;
    if ('walletUsed' in req.body && 'paymentAmount' in req.body) {
        yield slotBookingService.BookSlotPaymentAndWallet(userId, turfId, date, slots, sportsId, total, walletUsed, paymentAmount);
        res.send({ success: true });
    }
    if ('walletUsed' in req.body) {
        yield slotBookingService.bookSlot(userId, turfId, date, slots, sportsId, total, walletUsed);
        res.send({ success: true });
    }
    if ('paymentAmount' in req.body) {
        yield slotBookingService.BookSlotPayment(userId, turfId, date, slots, sportsId, total, paymentAmount);
        res.send({ success: true });
    }
}));
exports.allSports = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sports = yield sportsService.allSports();
    res.send({ sports });
}));
exports.allBooking = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const data = yield slotBookingService.AllBooking(id);
    const presentBooking = data.presentBooking;
    const pastBooking = data.pastBooking;
    res.send({ presentBooking, pastBooking });
}));
exports.cancelBooking = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const data = yield slotBookingService.CancelBooking(id);
    res.send({ data });
}));
exports.profileDetails = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query);
    const { id } = req.query;
}));
