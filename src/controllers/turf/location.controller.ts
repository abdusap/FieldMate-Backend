import { NextFunction, Request, Response } from "express";
// import LocationService from "../../services/admin/location.service";
import LocationService from "../../services/turf/location.service";


 const locationService=new LocationService()
export const allLocation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const location = await locationService.AllLocation()
    console.log(location)
    res.json({ success: true ,location});
  };