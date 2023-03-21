import  express  from "express";
import { signup } from "../controllers/user/signup";


export const user=express.Router()

user.post('/signup',signup)

// user.post('/signup',(req,res)=>{
//     console.log('hai')
// })