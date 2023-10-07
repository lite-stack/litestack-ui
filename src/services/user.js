import User from "@/models/user.js";
import UserAPI from "@/api/user.js"

class UserService {
    async getUsers() {
        let usersJson = await UserAPI.getUsers()
        let users = []
        for (let userJson of usersJson) {
            users.push(new User(
                userJson['id'],
                userJson['email'],
                '',
                userJson['is_active'],
                userJson['is_superuser'],
                userJson['is_verified'],
                userJson['username'],
                )
                )
        }

        return users
    }
    
    async deleteUser(id) {
        return UserAPI.deleteUser(id);
    }
}

export default new UserService();