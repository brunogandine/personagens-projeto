import { userModel } from "../models/User";

class UserService {
    async getUsersCount() {
        return userModel.getUserCount();
    }
}

export default new UserService();