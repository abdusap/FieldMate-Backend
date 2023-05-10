import { IturfDetails } from "../../interface/turfDetails.interface";
import TurfDetailsRepository from "../../repositories/turf/turfDetails.repository";

// const turfDetailsRepository=new TurfDetailsRepository

class turfDetails extends TurfDetailsRepository{
   
   async AddTurfDetails(turfId:string,groundName:string,website:string,sports:Array<string>,images:Array<string>): Promise<IturfDetails> {
    const details=await this.addTurfDetails(turfId,groundName,website,sports,images)
      return details
}

   async AddAmenity(turfId:string,amenity:Array<string>): Promise<IturfDetails|null> {
    const details=await this.addAmenity(turfId,amenity)
      return details
}
   async AddRules(turfId:string,rules:Array<string>): Promise<IturfDetails|null> {
    const details=await this.addRules(turfId,rules)
      return details
}
   async GetTurfDetails(turfId:string): Promise<object|null> {
    const details=await this.getTurfDetails(turfId)
      return details
}

   async AddSlot(turfId:string,slots:Array<string>,price:number): Promise<object|null> {
    const details=await this.addSlot(turfId,slots,price)
      return details
}
   async GetSlot(turfId:string): Promise<object|null> {
    const details=await this.getSlot(turfId)
      return details
}

   async DeleteImage(turfId:string,image:string): Promise<object|null|any> {
    const details=await this.deleteImage(turfId,image)
      return details
}



}

export default turfDetails