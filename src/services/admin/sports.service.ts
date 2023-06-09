import SportsRepository from "../../repositories/admin/sports.repository"
import { ISports } from "../../interface/sports.interface"


class SportsService extends SportsRepository{
    async AddSport(name:string):Promise<ISports | boolean>{
        const sportsExist=await this.isSportsExist(name)
        if(sportsExist){
        const exist=false
           return exist
        }
        const sports=this.addSports(name)
        return sports
    }

    async FindSports(id:string):Promise<any>{  
        const data=this.findSports(id)
        return data
    }
    // async GetLocationAndSport():Promise<any>{   
    //     const data=adminRepositories.getLocationAndSports()
    //     return data
    // }

    async EditSports(id:string,name:string):Promise<any>{  
        const data=this.editSports(id,name)
        return data
    }
     
    async BlockSports(id:string):Promise<ISports | null>{
        const details= await this.blockSports(id)
        return details
    }

}

export default SportsService