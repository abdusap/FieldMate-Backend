import mongoose from "mongoose";

const mongodb:()=>void=()=>{
    mongoose.set('strictQuery',true)
    mongoose.connect('mongodb://127.0.0.1:27017/fieldmate',{
        retryWrites:true,
        w:'majority'
    }).then(()=>{console.log('Database connected')}).catch(()=>{console.log('cannot connect to database')})
}
export default mongodb