import multer from "multer";

export const validMimeTypes = [ 
    "image/jpeg",
    "image/png",
    "image/webp"
];

const fileFilter = (_req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if(!validMimeTypes.includes(file.mimetype)) {
        return cb(new Error(`Tipo de Arquivo Inválido.`))
    };

    cb(null, true);
};

export const uploadAvatar = multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

