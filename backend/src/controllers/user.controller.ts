import { RequestHandler } from "express";
import UserService from "../services/user.service";

class UserController {
    getCounts: RequestHandler = async (req, res) => {
        try {
            const count = await UserService.getUsersCount();

            return res.status(200).json({count});
        } catch(err) {
            return res.status(500).json({message: "Erro Interno."})
        }
    }
}

export default new UserController();