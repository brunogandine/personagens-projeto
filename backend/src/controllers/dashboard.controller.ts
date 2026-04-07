import { RequestHandler } from "express";
import DashboardService from "../services/dashboard.service";

class DashboardController {
    getStats: RequestHandler = async (req, res) => {
        try {
            const userId = req.user?.id;

            if(!userId)
                return res.status(401).json({message: "Usuário não encontrado."});

            if(req.user?.user_power !== "Admin")
                return res.status(403).json({message: "Acesso negado."});

            const stats = await DashboardService.getDashboardStats();

            return res.status(200).json(stats);
        } catch(err) {

        }
    }
}

export default new DashboardController();