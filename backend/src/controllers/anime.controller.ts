import { RequestHandler } from "express";
import AnimeService from "../services/anime.service";

class AnimeController {
    createAnime: RequestHandler = async (req, res) => {
        try {
            const result = await AnimeService.createAnime(req.body);

            return res.status(200).json(result);
        } catch(err) {
            return res.status(500).json({message: "Erro Interno"});
        }
    }

    getById: RequestHandler = async (req, res) => {
        try {

        } catch(err) {
            
        }
    }

    getAll: RequestHandler = async (req, res) => {
        try {
            const { page, search } = req.query;

            const result = await AnimeService.getAnimes({
                page: Number(page),
                search: search as string
            })

            return res.status(200).json(result);
        } catch(err) {
            return res.status(500).json({message: "Erro Interno"});
        }
    }

    getCount: RequestHandler = async (req, res) => {
        try{
            const result = await AnimeService.getCounts();

            return res.status(200).json(result);
        } catch(err) {
            return res.status(500).json({message: "Erro Interno."})
        }
    }
}

export default new AnimeController();