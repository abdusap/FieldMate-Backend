import SportsRepository from "../../repositories/admin/sports.repository"

const sportsRepo=new SportsRepository()
class SportsService{
      
       async AllSports():Promise<object>{
        const sports=await sportsRepo.getAllSports()
        return sports
       }
}
export default SportsService