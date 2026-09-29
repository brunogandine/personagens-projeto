import { RequestHandler } from "express";
import DashboardService from "../services/dashboard.service";

class DashboardController {
    getStats: RequestHandler = async (req, res) => {
        try {
            const stats = await DashboardService.getDashboardStats();

            return res.status(200).json(stats);
        } catch(err) {

        }
    }
}

export default new DashboardController();