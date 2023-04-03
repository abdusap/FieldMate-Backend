import { NextFunction, Request, Response } from "express";
import SportsService from "../../services/admin/sports.service";

const sportsService=new SportsService()

export const addSports = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log(req.body);
    const { name } = req.body;
    await sportsService.AddSport(name);
    res.json({ success: true });
  };
  

  export const findSports = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.body;
    console.log(id);
    const data = await sportsService.FindSports(id);
    console.log(data);
    res.json({ data });
  };

  export const editSports = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id, name } = req.body;
    const data = await sportsService.EditSports(id,name)
    // console.log(data)
    res.json({ data, success: true });
  };
  