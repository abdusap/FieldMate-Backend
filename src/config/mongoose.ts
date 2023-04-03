import mongoose from "mongoose";

const mongodb:()=>void=()=>{
    mongoose.set('strictQuery',true)
    mongoose.connect('mongodb+srv://sapabdu:ugNPmWDCViLkjVIz@cluster0.ri7v6ef.mongodb.net/FieldMate?retryWrites=true&w=majority',{
        retryWrites:true,
        w:'majority'
    }).then(()=>{console.log('Database connected')}).catch(()=>{console.log('cannot connect to database')})
}
export default mongodb



// mongodb+srv://sapabdu:ugNPmWDCViLkjVIz@cluster0.ri7v6ef.mongodb.net/FieldMate?retryWrites=true&w=majority

// mongodb://127.0.0.1:27017/fieldmate