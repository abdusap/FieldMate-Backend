import asyncHandler from "express-async-handler";
import turfService from "../../services/admin/turf.service";


const TurfService=new turfService()
export const allTurf=asyncHandler(async(req,res)=>{ 
        const allTurf=await TurfService.AllTurf()
       res.send({allTurf})
})

export const acceptTurf=asyncHandler(async(req,res)=>{ 
        const id:any=req.query.id
        const turfDetails=await TurfService.AcceptTurf(id)
        res.send({success:true})
})

export const rejectTurf=asyncHandler(async(req,res)=>{ 
        const id:any=req.query.id
        await TurfService.RejectTurf(id)
        res.send({success:true})
})

export const getAllTurf=asyncHandler(async(req,res)=>{ 
        const allTurf=await TurfService.GetAllTurf()
       res.send({allTurf})
})

export const blockTurf=asyncHandler(async(req,res)=>{ 
        const id:any=req.query.id
    await TurfService.BlockTurf(id)
    res.send({success:true})
    })

