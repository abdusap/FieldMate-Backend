import  express  from "express";
import { allLocation } from "../controllers/turf/location.controller";
import { login, signup, verifyOtp } from "../controllers/turf/turf.controller";
import { addAmenity, addRules, addSlot, details, getSlot } from "../controllers/turf/turfDetails.controller";
import uploadCloudinary from "../helper/multer";
import { getAllSportsAndDetails } from "../controllers/turf/sports.controller";


export const turf=express.Router()

turf.get('/all_location',allLocation)

turf.post('/signup',signup)

// turf.patch('/turf_exist',checkTurfDupe)

turf.post('/otp',verifyOtp)

turf.post('/turf_details',uploadCloudinary.array('image',2),details)
// ,uploadCloudinary.array('image')

turf.get('/all_turf_details',getAllSportsAndDetails)

turf.post('/add_amenity',addAmenity)

turf.post('/add_rules',addRules)

turf.post('/login',login)

turf.post('/add_slot',addSlot)

turf.get('/get_slot',getSlot)