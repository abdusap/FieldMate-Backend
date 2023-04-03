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
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendMail = (inputEmail, emailType) => __awaiter(void 0, void 0, void 0, function* () {
    const tempOTP = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    // Transporter
    const transporter = yield nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });
    //Mail options
    let mailOptions;
    if (emailType == "otp") {
        mailOptions = yield {
            from: process.env.EMAIL,
            to: inputEmail,
            subject: "OTP Verification",
            html: `<p>your OTP verification code is :${tempOTP}</p>`,
        };
    }
    if (emailType == "approved") {
        mailOptions = yield {
            from: process.env.EMAIL,
            to: inputEmail,
            subject: "Account Verification Successful",
            html: `<p>We are writing to inform you that your account has been successfully verified. You can now access all the features of our platform and start using it to its fullest potential.</p>`,
        };
    }
    if (emailType == "rejected") {
        mailOptions = yield {
            from: process.env.EMAIL,
            to: inputEmail,
            subject: " Account Verification Failed",
            html: `<p>We regret to inform you that your account verification was not successful. We were unable to confirm your identity with the information provided.</p>`,
        };
    }
    // Send mail
    yield transporter.sendMail(mailOptions);
    // console.log("Account creation OTP Sent: " + req.session.tempOTP)
    // res.json({success:true})
    // res.redirect("/otp")
    return tempOTP;
});
exports.sendMail = sendMail;
