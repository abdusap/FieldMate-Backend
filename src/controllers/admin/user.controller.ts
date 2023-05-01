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