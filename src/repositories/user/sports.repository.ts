import { ISports } from "../../interface/sports.interface";
import sportsModel from "../../models/sports.model";

class SportsRepository{

  async getAllSports():Promise<ISports|object>{
    const details = await sportsModel.find()
    return details
  }

}

export default SportsRepository