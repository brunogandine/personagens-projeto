import { RequestHandler } from "express";
import AnimeService from "../services/anime.service";
import { detectImageType } from "@/utils/detectImageType";
import { isAppError } from "@/utils/is-app-error.util";

class AnimeController {
    createAnime: RequestHandler = async (req, res) => {
        try {
            const file = req.file;

            const imageExt = file
                ? await detectImageType(file.buffer)
                : null;

            const result = await AnimeService.createAnime({
                data: req.body,
                ...(file && imageExt 
                    ? {
                        image: {
                            buffer: file.buffer,
                            ext: imageExt
                        }
                    }
                    : undefined
                )
            });

            return res.status(201).json(result);
        } catch(err) {
            if(isAppError(err)) {
                if(err.type === "conflict") {
                    return res.status(409).json({message: err.message});
                };

                if(err.type === "storage") {
                    return res.status(200).json({message: err.message, type: err.type})
                }
            }

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
                page: Number(page ?? 1),
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