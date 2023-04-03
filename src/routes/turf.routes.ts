import  express  from "express";
import { allLocation } from "../controllers/turf/location.controller";
import { signup } from "../controllers/turf/turf.controller";


export const turf=express.Router()

turf.get('/all_location',allLocation)

turf.post('/signup',signup)

// turf.patch('/turf_exist',checkTurfDupe)