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
exports.bookSlot = exports.getWalletAndPrice = exports.paymentSuccess = exports.orders = exports.login = exports.verityOtp = exports.signup = void 0;
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
// export const orders=asyncHandler(async(req: Request,
//   res: Response,
//   next: NextFunction)=>{
//   // console.log(req.body)
//   const instance = new Razorpay({
//     key_id: "rzp_test_pTxoFkiwXZuGgu",
//     key_secret: "vkkGHlCnqiN6bVNmgfhctjnl",
// });
// const options = {
//     amount: 50000, // amount in smallest currency unit
//     currency: "INR",
//     receipt: "receipt_order_74394",
// };
// const order = await instance.orders.create(options);
// if (!order) return res.status(500).send("Some error occured");
// res.json(order);
// })
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
        console.log(options);
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
        // getting the details back from our font-end
        const { orderCreationId, razorpayPaymentId, razorpayOrderId, razorpaySignature, } = req.body;
        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const signature = crypto_1.default
            .createHmac("sha256", process.env.KEYSECRET)
            .update(`${orderCreationId}|${razorpayPaymentId}`)
            .digest("hex");
        // comaparing our digest with the actual signature
        if (signature !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });
        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
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
    console.log(req.body);
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
