import { RequestHandler } from "express";
import CharacterService from "../services/character.service";

class CharacterController {
    getCounts: RequestHandler = async (req, res) => {
        try {
            const count = await CharacterService.getCharactersCount();

            return res.status(200).json({count});
        } catch(err) {
            return res.status(500).json({message: "Erro Interno."})
        }
    }

    getAll: RequestHandler = async (req, res) => {
        try {
            const characters = await CharacterService.getAllCharacters();

            return res.status(200).json(characters);
        } catch(err) {
            return res.status(500).json({message: "Erro Interno."})
        }
    }
}

export default new CharacterController();