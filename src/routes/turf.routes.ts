import  express  from "express";
import { allLocation } from "../controllers/turf/location.controller";
import { jwtChecker, login, signup, verifyOtp } from "../controllers/turf/turf.controller";
import { addAmenity, addRules, addSlot, deleteImage, details, getSlot } from "../controllers/turf/turfDetails.controller";
import uploadCloudinary from "../helper/multer";
import { getAllSportsAndDetails } from "../controllers/turf/sports.controller";
import { cancelSlot, dashboardDetails, getSlotBooking, slotDetails } from "../controllers/turf/slotBooking.controller";
import { allReview } from "../controllers/turf/review.controller";


export const turf=express.Router()

turf.get('/jwt',jwtChecker)

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

turf.get('/get_slot_booking',getSlotBooking)

turf.patch('/cancel_slot',cancelSlot)

turf.patch('/slot_details',slotDetails)

turf.get('/all_review',allReview)

turf.get('/dashboard_details',dashboardDetails)

turf.post('/delete_image',deleteImage)