import  express  from "express";
import {  login, signup, verityOtp } from "../controllers/user/user.controller";
import { allLocationAndSports, allTurf, turfDetails } from "../controllers/user/turf.controller";


export const user=express.Router()

user.post('/signup',signup)

user.post('/otp',verityOtp)

user.post('/login',login)

user.get('/all_locaton_sports',allLocationAndSports)

user.get('/all_turf',allTurf)

user.get('/turf_details',turfDetails)





