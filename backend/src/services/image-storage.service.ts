import fs from "fs";
import path from "path";
import sharp from "sharp";

type ImageStorageResponse = {
    ok: boolean;
    message?: string;
}

class ImageStorageService {
    async save(buffer: Buffer, filePath: string): Promise<ImageStorageResponse> {
        try {
            await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

            const pngBuffer = await sharp(buffer)
                .png()
                .toBuffer();

            await fs.promises.writeFile(filePath, pngBuffer);

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