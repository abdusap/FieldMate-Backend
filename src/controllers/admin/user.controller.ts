import asyncHandler from "express-async-handler";
import UserService from "../../services/admin/user.service";

const userService=new UserService()

export const AllUser=asyncHandler(async(req,res)=>{ 
const users=await userService.GetAllUser()
res.send({users})
})

export const blockUser=asyncHandler(async(req,res)=>{ 
    const id:any=req.query.id
await userService.BlockUser(id)
res.send({success:true})
})


export const dashboardData=asyncHandler(async(req,res)=>{
     const details:any=await userService.DashboardDetails()
     const userCount=details.userCount
     const turfDetails=details.turfDetails
     res.send({userCount,turfDetails})
})