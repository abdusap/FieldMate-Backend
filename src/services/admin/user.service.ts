import TurfRepository from "../../repositories/admin/turf.repository"
import UserRepository from "../../repositories/admin/user.repository"
const turfRepository=new TurfRepository()
class UserService extends UserRepository{

    async GetAllUser():Promise<object | null>{
        const details=await this.getAllUser()
        return details
    }

    async BlockUser(id:string):Promise<object | null>{
        const details=await this.blockUser(id)
        return details
    }

    async DashboardDetails():Promise<object | null>{
        const usersCount=await this.usersCount()
        const turfDetails=await turfRepository.getAllTurf()
        return {
             "userCount":usersCount,
             "turfDetails":turfDetails
        }
    }
    




}
export default UserService