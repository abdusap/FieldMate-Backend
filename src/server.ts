// console.log('hainppffefe')
import {user} from './routes/user.routes' 

import express from 'express'
const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

import mongodb from './config/mongoose'
mongodb()

import cors from 'cors'
app.use(
    cors({
        origin:["http://localhost:3000","http://localhost:3001"],
        methods:["GET","POST","DELETE","PUT","PATCH"],
        credentials:true,
    })
    )

import session from 'express-session'
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'djfksfiddfi'
}))


app.use((req,res,next)=>{
    res.set("Cahe-Control","no-store");
    next();
})

import path from 'path'
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))


import cookieParser from 'cookie-parser'
// import { user } from './routes/user.routes'
app.use(cookieParser());

// app.use('/',userRouter)
app.use('/',user)

app.get('/helo',(req, res)=>{
    console.log('helow')
})
app.listen(9000,()=>{console.log('server started')})