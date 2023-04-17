import asyncHandler from "express-async-handler";
import AppError from "../../error/error";
import turfDetails from "../../services/turf/turfDetails.service";

      
const TurfDetails=new turfDetails()
export const details=asyncHandler(async(req,res)=>{ 
     
  // throws error is req.files is undefined or not an array or array of length 0
  if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        console.log('error');
        
        throw new AppError(500,'something went wrong')
        }

    const images=[]
    for(let i=0;i<req.files.length;i++){
          images.push(req.files[i].path)
    }
    const {groundName,website}=req.body
    const sport = JSON.parse(req.body.sports);

const sports=[]
for(let i=0;i<sport.length;i++){
      sports.push(sport[i].value)
}
    await TurfDetails.AddTurfDetails(groundName,website,sports,images)
    res.send({success:true})

})


export const addAmenity=asyncHandler(async(req,res)=>{
      console.log(req.body)
      const {email,password}=req.body
})