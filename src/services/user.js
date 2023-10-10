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

    async updateUser(id, username, email, password, isActive, isSuperuser) {
        let user = {
            "username": username,
            "email": email,
            "is_active": isActive,
            "is_superuser": isSuperuser
        }
        if (password !== "") {
            user["password"] = password
        }
        return UserAPI.updateUser(id, user)
    }
    
    async updateMe(username, email, password) {
        let user = {
            "username": username,
            "email": email,
        }
        if (password !== "") {
            user["password"] = password
        }

        return UserAPI.updateMe(user)
    }

    async deleteUser(id) {
        return UserAPI.deleteUser(id);
    }
}

export default new UserService();