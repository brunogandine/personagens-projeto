import { userModel } from "../models/User";
import { characterModel } from "../models/Character";

class DashboardService {
    async getDashboardStats() {
        const [usersCount, charactersCount, moderatorsCount, adminsCount, recentUsers] = await Promise.all([
            userModel.getUserCount(),
            characterModel.getCount(),
            userModel.getModeratorsCount(),
            userModel.getAdminsCount(),
            userModel.getRecentUsers(5)
        ]);

        return {        
            totals: { 
                usersCount, 
                charactersCount, 
                moderatorsCount, 
                adminsCount
            }, 
            recentUsers
        };
    }
}

export default new DashboardService();