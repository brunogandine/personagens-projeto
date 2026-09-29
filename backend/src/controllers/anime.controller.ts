import AnimeService from "../services/anime.service";
import { RequestHandler } from "express";
import { detectImageType } from "@/utils/detectImageType";
import { isAppError } from "@/utils/is-app-error.util";
import { ZodError } from "zod";
import { deleteAnimeSchema, restoreAnimeSchema } from "@/validations/anime.validations";

class AnimeController {
    create: RequestHandler = async (req, res) => {
        try {
            const file = req.file;

            const imageExt = file
                ? await detectImageType(file.buffer)
                : null;

            const result = await AnimeService.createAnime({
                data: req.body,
                ...(file && imageExt 
                    ? {
                        symbol: {
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
                    return res.status(201).json({message: err.message, type: err.type})
                }
            }

            return res.status(500).json({message: "Erro Interno"});
        }
    };

    update: RequestHandler = async (req, res) => {
        try {
            const file = req.file;

            const imageExt = file
                ? await detectImageType(file.buffer)
                : null

            const result = await AnimeService.updateAnime({
                id: Number(req.params.id),
                data: req.body,
                ...(file && imageExt
                    ? { 
                        symbol: {
                            buffer: file.buffer,
                            ext: imageExt
                        }
                    }
                    : undefined
                )
            });

            return res.status(200).json(result);
        } catch(err) {
            if(isAppError(err)) {
                if(err.type === "not_found") {
                    return res.status(404).json({message: err.message});
                };
                if(err.type === "storage") {
                    return res.status(200).json({errors: err.errors, type: err.type});
                }
            };
            
            return res.status(500).json({message: "Erro Interno"});
        }
    };

    softDelete: RequestHandler = async (req, res) => {
        try {
            const data = deleteAnimeSchema.parse(req.body);

            const result = await AnimeService.softDeleteCharacter({
                data: {
                    ids: data.ids
                }
            });

            res.status(200).json(result);
        } catch(err) {
            if(err instanceof ZodError) {
                const issues = err.issues[0];

                if(!issues)
                    return res.status(400).json({
                        message: "Dados inválidos."
                });

                return res.status(400).json({message: issues.message});
            };

            if(isAppError(err)) {
                if(err.type === "not_found") {
                    return res.status(404).json({message: err.message});
                };
            };

            return res.status(500).json({message: "Erro Interno"});
        };
    };

    restore: RequestHandler = async (req, res) => {
        try {
            const data = restoreAnimeSchema.parse(req.body);

            const result = await AnimeService.restoreCharacter({
                data: {
                    ids: data.ids
                }
            });

            res.status(200).json(result);
        } catch(err){
            if(err instanceof ZodError) {
                const issues = err.issues[0];

                if(!issues) {
                    return res.status(400).json({
                        message: "Dados Inválidos"
                    });
                };

                return res.status(400).json({
                    message: issues.message
                });
            };

            if(isAppError(err)) {
                if(err.type === "not_found") {
                    return res.status(404).json({message: err.message});
                };

                if(err.type === "conflict") {
                    return res.status(409).json({message: err.message});
                };

                return res.status(500).json({message: "Erro Interno"});
            };
        };
    };

    getById: RequestHandler = async (req, res) => {
        try {
          const result = await AnimeService.getAnimeById(Number(req.params.id));

          return res.status(200).json(result);
        } catch(err) {
            if(isAppError(err)) {
                if(err.type === "not_found") {
                    return res.status(404).json({message: err.message});
                };
            };
        
            return res.status(500).json({message: "Erro Interno."});
        };
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