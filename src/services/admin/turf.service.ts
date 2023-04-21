import { stringify } from "querystring";
import { sendMail } from "../../helper/send.mail";
import TurfRepository from "../../repositories/admin/turf.repository";

class turfService extends TurfRepository{

    async AllTurf():Promise<any>{
        const allTurf=await this.allTurf()
        return allTurf
    }
    async AcceptTurf(id:string):Promise<any>{
        const turf=await this.acceptTurf(id)
        console.log(turf);
        const email:any=turf?.email
        // stringify(email)
        sendMail(email,"approved").then(()=>{

            return turf
        })
    }
    async RejectTurf(id:string):Promise<any>{
        const turf=await this.rejectTurf(id)
        const email:any=turf?.email
        sendMail(email,"rejected").then(()=>{

            return turf
        })
    }
}

export default turfService