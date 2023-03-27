import  express  from "express";
import { login, signup, verityOtp } from "../controllers/user/user.controller";

export const user=express.Router()

user.post('/signup',signup)

user.post('/otp',verityOtp)

user.post('/login',login)

