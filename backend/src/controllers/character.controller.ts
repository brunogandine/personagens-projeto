import { RequestHandler } from "express";
import CharacterService from "../services/character.service";
import { isAppError } from "@/utils/is-app-error.util";
import { detectImageType } from "@/utils/detectImageType";
import characterService from "../services/character.service";
class CharacterController {
    createCharacter: RequestHandler = async (req, res) => {
        try {
            const files = req.files as {
                artwork?: Express.Multer.File[];
                thumbnail?: Express.Multer.File[];
            };

            const [ artworkExt, thumbnailExt ] = await Promise.all([
                files.artwork?.[0] ? detectImageType(files.artwork[0].buffer) : null,
                files.thumbnail?.[0] ? detectImageType(files.thumbnail[0].buffer) : null
            ]);

            const result = await CharacterService.createCharacter({
                data: req.body,
                ...(files.artwork?.[0] && artworkExt 
                    ? {
                        artwork: {
                            buffer: files.artwork[0].buffer,
                            ext: artworkExt
                        }
                    }
                    : undefined
                ),
                ...(files.thumbnail?.[0] && thumbnailExt 
                    ? {
                        thumbnail: {
                            buffer: files.thumbnail[0].buffer,
                            ext: thumbnailExt
                        }
                    }
                    : undefined
                )
            });

            res.status(201).json(result);
        } catch(err) {
            if(isAppError(err)) {
                if(err.type === "not_found") {
                    return res.status(404).json({message: err.message});
                };
                if(err.type === "storage") {
                    return res.status(201).json({errors: err.errors});
                }
            };

            return res.status(500).json({message: "Erro Interno"});
        };
    };

    updateCharacter: RequestHandler = async (req, res) => {
        try {
            const files = req.files as {
                artwork?: Express.Multer.File[];
                thumbnail?: Express.Multer.File[];
            };

            const [ artworkExt, thumbnailExt ] = await Promise.all([
                files.artwork?.[0] ? detectImageType(files.artwork[0].buffer) : null,
                files.thumbnail?.[0] ? detectImageType(files.thumbnail[0].buffer) : null
            ])

            const result = await CharacterService.updateCharacter({
                id: Number(req.params.id),
                data: req.body,
                ...(files.artwork?.[0] && artworkExt 
                    ? {
                        artwork: {
                            buffer: files.artwork[0].buffer,
                            ext: artworkExt
                        },       
                    }
                    : undefined
                ),
                ...(files.thumbnail?.[0] && thumbnailExt 
                    ? {
                        thumbnail: {
                            buffer: files.thumbnail[0].buffer,
                            ext: thumbnailExt
                        },       
                    }
                    : undefined
                ),
            });

            res.status(200).json(result);
        } catch(err) {
            if(isAppError(err)) {
                if(err.type === "not_found") {
                    return res.status(404).json({message: err.message});
                };
                if(err.type === "storage") {
                    return res.status(201).json({errors: err.errors});
                }
            };
            
            return res.status(500).json({message: "Erro Interno"});
        };
    };

    getCounts: RequestHandler = async (req, res) => {
        try {
            const count = await CharacterService.getCharactersCount();

            return res.status(200).json({count});
        } catch(err) {
            return res.status(500).json({message: "Erro Interno."})
        }
    };

    getById: RequestHandler = async (req, res) => {
        try {
          const result = await characterService.getCharacterById(Number(req.params.id));

          return res.status(200).json(result);
        } catch(err) {
            if(isAppError(err)) {
                if(err.type === "not_found") {
                    return res.status(404).json({message: err.message});
                };
            };
        
            return res.status(500).json({message: "Erro Interno."});
        };
    };

    getAll: RequestHandler = async (req, res) => {
        try {
            const { page, search } = req.query;

            console.log(search)

            const result = await CharacterService.getCharacters({
                page: Number(page ?? 1),
                search: search as string
            });

            return res.status(200).json(result);
        } catch(err) {
            return res.status(500).json({message: "Erro Interno."})
        }
    }
}

export default new CharacterController();