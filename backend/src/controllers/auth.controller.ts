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
                secure: true,
                sameSite: "none",
                maxAge: 30 * 60 * 1000
            })

            return res.status(200).json({user: result.user, message: "Login realizado com sucesso!"});
        } catch(err: any) {
            if(err.type === "validation") {
                return res.status(400).json({errors: err.errors});
            } 
            
            return res.status(400).json({errors: "Erro desconhecido."});
        }
    }

    logout: RequestHandler = async (req, res) => {
        try {
            const sessionToken = req.cookies['session_token'];

            if(!sessionToken)
                return res.status(400).json({message: "Nenhuma sessão ativa."})

            const deletedSession = await AuthService.logoutUser(sessionToken);

            if(!deletedSession)
                return res.status(400).json({message: "Erro ao tentar remover a sessão."})

        } catch(err) {
            return res.status(500).json({message: "Erro ao realizar Logout."})
        }

        res.clearCookie('session_token');

        return res.status(200).json({message: "Logout efetuado com sucesso!"})
    }

    me: RequestHandler = async (req, res) => {
        return res.status(200).json({user: req.user});
    }
}

export default new AuthController();