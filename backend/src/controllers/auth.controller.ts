import { RequestHandler } from "express"
import AuthService from "../services/auth.service"

class AuthController {
    register: RequestHandler = async (req, res) => {
        try {
            const user = await AuthService.registerUser(req.body);

            res.status(201).json({message: "Cadastro feito com sucesso!"})
        } catch (err: any) {
            if(err.type === "validation") {
                return res.status(400).json({message: "Erros de validação", errors: err.errors});
            };

            return res.status(400).json({message: "Erro desconhecido."});
        }
    }

    login: RequestHandler = async (req, res) => {
        try {
            const { email, user_key } = req.body;
            const result = await AuthService.loginUser(email, user_key);

            res.cookie("session_token", result.token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 30 * 60 * 1000
            })

            return res.status(200).json({user: result.user, message: "Login realizado com sucesso!"});
        } catch(err: any) {
            if(err.type === "validation") {
                return res.status(400).json({error: err.errors[0].message});
            } 
            
            return res.status(400).json({error: "Erro desconhecido."});
        }
    }
}

export default new AuthController();