import path from "path";
import ImageStorageService from "@/services/image-storage.service";
import { animeModel } from "@/models/Anime";
import { CreateAnimePayload, DeleteAnimePayload, RestoreAnimePayload, GetAnimeParams, UpdateAnimePayload } from "@/types/anime.types";

const assetsDir = path.resolve(process.cwd(), process.env.FRONTEND_ASSETS_PATH!);
const uploadDir =  path.resolve(process.cwd(), assetsDir, "images", "animes");
class AnimeService {
    async createAnime(payload: CreateAnimePayload) {
        const errors = [];

        const sameName = await animeModel.findByName(payload.data.name);

        if(sameName) 
            throw ({type: "conflict", message: "Já existe um anime com esse nome."});

        const anime = await animeModel.create(payload.data);

        const animeDir = path.resolve(uploadDir, `${anime.id}`);

        console.log(payload);

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

    async updateAnime (payload: UpdateAnimePayload) {
        const errors = [];

        const existAnime = await animeModel.findById(payload.id);

        if(!existAnime) 
            throw({type: "not_found", message: "Anime não encontrado."});

        const data = {
            name: payload.data.name,
            active: payload.data.active,
            description: payload.data.description
        };

        await animeModel.update(payload.id, data);

        const animeDir = path.resolve(uploadDir, `${payload.id}`);

        if(payload.symbol) {
            const symbolDir = path.resolve(animeDir, "symbol.jpg");

            const symbolSave = await ImageStorageService.save(payload.symbol.buffer, symbolDir);

            if(!symbolSave.ok)
                errors.push({message: `${symbolSave.message} - Symbol`});
        } else if(payload.data.remove_symbol) {
            const symbolDir = path.resolve(animeDir, "symbol.jpg");

            const symbolDelete = await ImageStorageService.delete(symbolDir);

            if(!symbolDelete.ok)
                errors.push({message: `symbolDelete.message - Symbol`});
        };

        if(errors.length > 0)
            throw { type: "storage", errors }

        return { message: "Anime atualizado com sucesso!" };
    };

    async softDeleteCharacter({data}: DeleteAnimePayload) {
        const existCharacters = await animeModel.findManyByIds(data.ids);

        if(existCharacters.length !== data.ids.length) {
            throw { type: "not_found", message: "Um ou mais animes não foram encontrados."};
        };

        const alreadyDeleted = existCharacters.some(
            (c) => c.deleted_at !== null
        );

        if(alreadyDeleted) {
            throw { type: "conflict", message: "Um ou mais animes já foram deletados." };
        };

        await animeModel.softDelete(data.ids);

        return { message: "Exclusão efetuada com sucesso!" };
    };

    async restoreCharacter({data}: RestoreAnimePayload) {
        const existAnimes = await animeModel.findManyByIds(data.ids);

        if(existAnimes.length !== data.ids.length) {
            throw { type: "not_found", message: "Um ou mais animes não foram encontrados."};
        };

        const notDeleted = existAnimes.some(
            (a) => a.deleted_at === null
        );

        if(notDeleted) {
            throw { type: "conflict", message: "Um ou mais animes não precisam ser restaurados."};
        };

        await animeModel.restore(data.ids);

        return { message: "Animes restaurados com sucesso."};
    };

    async getAnimes ({ page = 1, search = "" }: GetAnimeParams){
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

    async getCounts() {
        const totalAnimes = await animeModel.getCount();

        return totalAnimes;
    };

    async getAnimeById(id: number) {
        const anime = await animeModel.findById(id);

        if(!anime)
            throw { type: "not_found", message: "Personagem não encontrado."};

        return {
            id: anime.id,
            name: anime.name,
            active: anime.active,
            description: anime.description ?? null,
        };
    };
}

export default new AnimeService();