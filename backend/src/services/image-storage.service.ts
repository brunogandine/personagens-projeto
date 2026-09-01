import fs from "fs";
import path from "path";

type ImageStorageResponse = {
    ok: boolean;
    message?: string;
}

class ImageStorageService {
    async save(buffer: Buffer, filePath: string): Promise<ImageStorageResponse> {
        try {
            await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

            await fs.promises.writeFile(filePath, buffer);

            return { ok: true };
        }catch(err) {
            console.error(`Falha ao salvar arquivo de imagem: `, err);
            return { ok: false, message: `Falha ao salvar arquivo de imagem.` };
        }
    };

    async delete(filePath: string): Promise<ImageStorageResponse> {
        try {
            await fs.promises.unlink(filePath);

            return { ok: true };
        }catch(err) {
            console.error(`Falha ao remover arquivo de imagem: `, err);
            return { ok: false, message: `Falha ao remover arquivo de imagem.` };
        }
    };
}

export default new ImageStorageService();