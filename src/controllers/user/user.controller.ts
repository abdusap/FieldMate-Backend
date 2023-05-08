import { NextFunction, Request, Response } from "express";
import { Iuser } from "../../interface/user.interface";
import userValidation from "../../validation/user.validation";
import AuthService from "../../services/user/auth.user.services";
import {
  checkVerificationToken,
  sendVerificationToken,
} from "../../config/twilio";
import jwt from "jsonwebtoken";
import UserService from "../../services/user/user.service";
import AppError from "../../error/error";
import asyncHandler from "express-async-handler";
import Razorpay from "razorpay";
import dotenv from 'dotenv';
dotenv.config();
import crypto from "crypto"
import SlotBookingService from "../../services/user/slotBooking.service";
import SportsService from "../../services/user/sports.service";



const sportsService=new SportsService()
const userService =new UserService()
const slotBookingService=new SlotBookingService()

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const formData: Iuser = req.body;
  userValidation
    .validate(formData)
    .then(async (validatedData) => {
      const { name, mobile, email } = validatedData;
      const authUser = await userService.finduser(name, mobile, email);
      if (authUser) res.send({ success: false });
      else
        sendVerificationToken(mobile).then((status) => {
          if (status) res.send({ success: true });
        });
    })
    .catch((validationErrors) => {
      console.log(validationErrors.message);
    });
};



export const verityOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { otp, mobile, name, email, password } = req.body;
  const checkOtp = await checkVerificationToken(otp, mobile);
  if (checkOtp) {
    await userService.createUser(name, mobile, email, password);
    res.json({ ok: true });
  } else res.json({ ok: false });
};



export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const user:any = await userService.verifyUser(email, password);
  if (user === null) {
    res.json({ message: "Invalid user" });
  } else if (user.matchPassword === true) {
    const data={id:JSON.parse(JSON.stringify(user.user._id)),name:user.user.name}
    const token = jwt.sign(data, "mysecretkey", { expiresIn: 86400 });

    res.json({ verify: true, message: "true", token: token ,user:user.user});
  } else if (user.matchPassword === false) {
    res.json({ verify: false, message: "Email or Password Incorrect" });
  } else {
    res.json({ message: "Invalid user" });
  }
};



export const orders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try{
const amount:any=req.query.amount
parseInt(amount)
    const instance = new Razorpay({
      key_id: process.env.KEYID as string,
    key_secret: process.env.KEYSECRET as string,
});

const options = {
    amount: amount*100, 
    currency: "INR",
    receipt: "receipt_order_74394",
};
const order = await instance.orders.create(options);

if (!order) return res.status(500).send("Some error occured");

res.json(order);
}catch{
  next()
}
}

export const paymentSuccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
        orderCreationId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
    } = req.body;

    const signature = crypto
    .createHmac("sha256", process.env.KEYSECRET as string)
    .update(`${orderCreationId}|${razorpayPaymentId}`)
    .digest("hex");
    if (signature !== razorpaySignature)
        return res.status(400).json({ msg: "Transaction not legit!" });

   

    res.json({
        msg: "success",
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
    });
} catch (err) {
    next(err)
}
}


export const getWalletAndPrice=asyncHandler(async(req,res)=>{
  const {userId,turfId}:any=req.query
  const details=await userService.getWalletAndPrice(turfId,userId)
  const wallet=details.user.wallet
  const slotPrice=details.slotPrice.price
  res.send({wallet,slotPrice})
})

export const bookSlot=asyncHandler(async(req,res)=>{
const {userId,turfId,date,slots,sportsId,total,walletUsed,paymentAmount}=req.body
if('walletUsed' in req.body && 'paymentAmount' in req.body){
  await slotBookingService.BookSlotPaymentAndWallet(userId,turfId,date,slots,sportsId,total,walletUsed,paymentAmount)
  res.send({success:true})
}
if ('walletUsed' in req.body){
  await slotBookingService.bookSlot(userId,turfId,date,slots,sportsId,total,walletUsed)
  res.send({success:true})
}
if ('paymentAmount' in req.body){
  await slotBookingService.BookSlotPayment(userId,turfId,date,slots,sportsId,total,paymentAmount)
  res.send({success:true})
}
})


export const allSports=asyncHandler(async(req,res)=>{
const sports=await sportsService.allSports()
res.send({sports})
})

export const allBooking=asyncHandler(async(req,res)=>{
  const {id}:any=req.query
  const data:any=await slotBookingService.AllBooking(id)
  const presentBooking=data.presentBooking
  const pastBooking=data.pastBooking
  res.send({presentBooking,pastBooking})
})

export const cancelBooking=asyncHandler(async(req,res)=>{
  const {id}:any=req.query
  const data:any=await slotBookingService.CancelBooking(id)
  res.send({data})
})

export const profileDetails=asyncHandler(async(req,res)=>{
const {id}:any=req.query
const details = await userService.GetUserById(id)
res.send({details})
})

export const profileUpdate=asyncHandler(async(req,res)=>{
  const {id,name}=req.body
  const details = await userService.UpdateName(id,name)
  res.send({details})
})

export const imageUpdate=asyncHandler(async(req,res)=>{
 
  if(req.file&&req.body){
    const {id}=req.body
    const image=req.file.path
    const updatedData=await userService.UpdateImage(id,image)
    res.send({updatedData})
  }
})
