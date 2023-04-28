import { ISports } from "../../interface/sports.interface";
import SportsRepository from "../../repositories/user/sports.repository";

class SportsService extends SportsRepository{

    async allSports():Promise<ISports | object>{
        const data = await this.getAllSports()
        return data
    }
}
export default SportsService