import express from 'express'
import { addLocation, editLocation, findLocation, getLocationAndSports } from '../controllers/admin/location.controller'
import { addSports, editSports, findSports } from '../controllers/admin/sports.controller'

export const admin =express.Router()

admin.post('/location',addLocation)

admin.post('/sports',addSports)

admin.post('/location-and-sports',getLocationAndSports)

admin.post('/find_location',findLocation)

admin.post('/find_sports',findSports)

admin.post('/edit_location',editLocation)

admin.post('/edit_sports',editSports)
