import { RequestHandler } from "express";
import ProfileService from "../services/profile.service";

class ProfileController {
    getStats: RequestHandler = async (req, res) => {
        try {
            const userId = req.user!.id;

            const stats = await ProfileService.getProfileStats(userId);

            return res.status(200).json(stats);
        } catch(err) {

        }
    }
}

export default new ProfileController()