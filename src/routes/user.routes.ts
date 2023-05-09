import  express  from "express";
import {  allBooking, allSports, bookSlot, cancelBooking, getWalletAndPrice, imageUpdate, login, orders, paymentSuccess, profileDetails, profileUpdate, signup, verityOtp } from "../controllers/user/user.controller";
import { allLocationAndSports, allTurf, availableSlots, availableSports, turfDetails } from "../controllers/user/turf.controller";
import { addReview, getReviews } from "../controllers/user/review.controller";
import uploadCloudinary from "../helper/multer";


export const user=express.Router()

user.post('/signup',signup)

user.post('/otp',verityOtp)

user.post('/login',login)

user.get('/all_locaton_sports',allLocationAndSports)

user.get('/all_turf',allTurf)

user.get('/turf_details',turfDetails)

user.get('/available_sports',availableSports)

user.get('/available_slots',availableSlots)

user.patch('/payment/orders',orders)

user.post('/payment/success',paymentSuccess)

user.get('/wallet_price',getWalletAndPrice)

user.post('/book_slot',bookSlot)

user.post('/add_review',addReview)

user.get('/all_sports',allSports)

user.get('/all_booking',allBooking)

user.patch('/cancel_booking',cancelBooking)

user.route('/profile').get(profileDetails).post(profileUpdate)

user.post('/profile_image',uploadCloudinary.single('image'),imageUpdate)

user.get('/review',getReviews)





