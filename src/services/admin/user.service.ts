import UserRepository from "../../repositories/admin/user.repository"

class UserService extends UserRepository{

    async GetAllUser():Promise<object | null>{
        const details=await this.getAllUser()
        return details
    }

    async BlockUser(id:string):Promise<object | null>{
        const details=await this.blockUser(id)
        return details
    }





}
export default UserService