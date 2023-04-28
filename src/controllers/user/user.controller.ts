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



const userService =new UserService()

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
    console.log(token);

    res.json({ verify: true, message: "true", token: token ,user:user.user});
  } else if (user.matchPassword === false) {
    res.json({ verify: false, message: "Email or Password Incorrect" });
  } else {
    res.json({ message: "Invalid user" });
  }
};





