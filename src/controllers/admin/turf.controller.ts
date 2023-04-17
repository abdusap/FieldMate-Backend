import asyncHandler from "express-async-handler";
import turfService from "../../services/admin/turf.service";


const TurfService=new turfService()
export const allTurf=asyncHandler(async(req,res)=>{ 
        const allTurf=await TurfService.AllTurf()
       res.send({allTurf})
})

export const acceptTurf=asyncHandler(async(req,res)=>{ 
        console.log('hai')
        console.log(req.params)
})

