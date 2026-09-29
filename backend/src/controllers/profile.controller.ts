import { RequestHandler } from "express";
import ProfileService from "../services/profile.service";

class ProfileController {
    getStats: RequestHandler = async (req, res) => {
        try {
            const userId = req.user?.id;

            if(!userId)
                return res.status(401).json({message: "Usuário não encontrado."})

            const stats = await ProfileService.getProfileStats(userId);

            return res.status(200).json(stats);
        } catch(err) {

        }
    }
}

export default new ProfileController()