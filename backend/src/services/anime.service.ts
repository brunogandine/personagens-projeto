import path from "path";
import ImageStorageService from "@/services/image-storage.service";
import { animeModel } from "@/models/Anime";
import { CreateAnimeData, GetAnimeParams } from "@/types/anime.types";

const assetsDir = path.resolve(process.cwd(), process.env.FRONTEND_ASSETS_PATH!);
const uploadDir =  path.resolve(process.cwd(), assetsDir, "images", "animes");
class AnimeService {
    createAnime = async (payload: CreateAnimeData) => {
        const errors = [];

        const sameName = await animeModel.findByName(payload.data.name);

        if(sameName) 
            throw ({type: "conflict", message: "Já existe um anime com esse nome."});

        const anime = await animeModel.create(payload.data);

        const animeDir = path.resolve(uploadDir, `${anime.id}`);

        if(payload.symbol) {
            const symbolDir = path.resolve(animeDir, `symbol.${payload.symbol.ext}`);

            const symbolSave = await ImageStorageService.save(payload.symbol.buffer, symbolDir);

            if(!symbolSave.ok) {
                errors.push({message: `${symbolSave.message} - Anime Symbol`})
            };
        };

        if(errors.length > 0) {
            errors.push({message: "O anime foi criado com sucesso, mas ocorreram erros ao salvar uma ou mais imagens. Você pode tentar atualizar as imagens na edição de anime."});
            throw { type: "storage", errors };
        };

        return { message: "Anime criado com sucesso!" };
    };

    getAnimes = async ({
        page = 1,
        search = ""
    }: GetAnimeParams) => {
        const MAX_PAGES = 100;

        const safePages = page > 0
            ? Math.min(page, MAX_PAGES)
            : 1;

        const result = await animeModel.getAnimes({
            page: safePages,
            search
        });

        return result;
    };

    getCounts = async () => {
        const totalAnimes = await animeModel.getCount();

        return totalAnimes;
    };
}

export default new AnimeService();