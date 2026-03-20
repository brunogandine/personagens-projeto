import { userModel } from "../models/User";
import { hashPassword, comparePassword } from "../utils/bcrypt.util";
import crypto from "crypto";
import { RegisterSchema } from "../validations/auth.validations";
import { userSessionModel } from "../models/UserSession";

class AuthService {
    async registerUser(data: RegisterSchema) {
        const { confirmPassword, ...safeData } = data;
        const errors = [];

        const userExists = await userModel.findByUsername(safeData.username)
        if(userExists) 
            errors.push({ field: "username", message: "Nome de usuário já cadastrado!"});

        const emailExists = await userModel.findByEmail(safeData.email)
        if(emailExists) 
            errors.push({ field: "email", message: "Email já cadastrado!" });

        if(errors.length > 0) 
            throw { type: "validation", errors };

        const hashedPassword = await hashPassword(safeData.user_key);

        const newUser = await userModel.create({
            ...safeData,
            user_key: hashedPassword,
            created_at: new Date()
        });

        return { id: newUser.id, email: newUser.email };
    }

    async loginUser(email: string, user_key: string) {
        const errors = [];

        const user = await userModel.findByEmail(email);  
        
        const match = user && await comparePassword(user_key, user.user_key);

        if(!match) {
            errors.push({ field: "login", message: "Usuário ou senha inválidos!" });

            throw { type: "validation", errors };
        }

        const token = crypto.randomBytes(64).toString("hex");

        await userSessionModel.create({
            user: { connect: { id: user.id }},
            session_token: token,
            expires_at: new Date(Date.now() + 30 * 60 * 1000)
        })

        return { token, user: { id: user.id, email: user.email, username: user.username, currency: user.currency, level: user.level, user_power: user.user_power, avatar_url: user.avatar_url } };
    }

    async logoutUser(sessionToken: string) {
        const deletedSession = await userSessionModel.delete(sessionToken);

        return !!deletedSession;
    }
}

export default new AuthService();