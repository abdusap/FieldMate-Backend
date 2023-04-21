import express from 'express'
import { addLocation, editLocation, findLocation, getLocationAndSports } from '../controllers/admin/location.controller'
import { addSports, editSports, findSports } from '../controllers/admin/sports.controller'
import { acceptTurf, allTurf, rejectTurf } from '../controllers/admin/turf.controller'

export const admin =express.Router()

admin.post('/location',addLocation)

admin.post('/sports',addSports)

admin.post('/location-and-sports',getLocationAndSports)

admin.post('/find_location',findLocation)

admin.post('/find_sports',findSports)

admin.post('/edit_location',editLocation)

admin.post('/edit_sports',editSports)

admin.get('/all_turf',allTurf)

admin.patch('/accept_turf',acceptTurf)

admin.patch('/reject_turf',rejectTurf)
