import { NextFunction, Request, Response } from "express";
import LocationService from "../../services/admin/location.service";


 const locationService=new LocationService()
export const addLocation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name } = req.body;
    const location = await locationService.AddLocation(name)
    res.json({ success: true });
  };


  export const getLocationAndSports = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data = await locationService.GetLocationAndSport()
    res.json({ data });
  };
  

  export const findLocation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.body;
    console.log(id);
    const data = await locationService.FindLocation(id)
    console.log(data);
    res.json({ data });
  };
  

  export const editLocation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id, name } = req.body;
    const data = await locationService.EditLocation(id,name)
    // console.log(data)
    res.json({ data, success: true });
  };