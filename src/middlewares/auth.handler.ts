import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Model } from "mongoose";
import adminModel from "../models/admin.model";
import turfModel from "../models/turf.model";
import userModel from "../models/user.model";
import AppError from "../error/error";

export const authorization = asyncHandler(async (req, res, next) => {
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer") &&
    req.query.role
  ) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded !== "string") {
      let collection=Model<any>
      switch(req.query.role){
        case('user'):
        collection=userModel
        break;
        case('admin'):
        collection=adminModel
        break;
        case('expert'):
        collection=turfModel
      }
      const user = await collection.findOne({_id:decoded.id});
      if (!user) {
        throw new AppError(401, "invalid token");
      } else {
        next();
      }
    } else {
      throw new AppError(401, "No authorization");
    }
  } else {
    throw new AppError(401, "No authorization");
  }
});



