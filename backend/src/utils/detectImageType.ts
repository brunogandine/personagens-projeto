import { ALLOWED_IMAGES_TYPES } from "@/middlewares/upload/uploadTypes";
import { fileTypeFromBuffer } from "file-type";

export const detectImageType = async (buffer: Buffer): Promise<string | null> => {
    const detectType = await fileTypeFromBuffer(buffer);

    if(!detectType || !ALLOWED_IMAGES_TYPES.includes(detectType.mime)) {
        return null;
    }

    return detectType.ext;
};
