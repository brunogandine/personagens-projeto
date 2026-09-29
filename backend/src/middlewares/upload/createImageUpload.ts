import multer from "multer";

type UploadImageOptions = {
    mimeTypes: string[];
    maxFileSize: number;
};

const createImageUpload = ({mimeTypes, maxFileSize}: UploadImageOptions) => {
    return multer({
        storage: multer.memoryStorage(),
        fileFilter: (_req, file, cb) => {
            if(!mimeTypes.includes(file.mimetype))
                return cb(new Error("Tipo de arquivo inválido."));

            return cb(null, true);
        },
        limits: {
            fileSize: maxFileSize
        }
    });
};

export default createImageUpload;