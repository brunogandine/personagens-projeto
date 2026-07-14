import CreateImageUpload from "./createImageUpload";

export const ALLOWED_TYPES = [ 
    "image/jpeg",
    "image/png",
    "image/webp"
];

const MAX_FILE_SIZE = 5 * 1024 * 1024

const uploadAvatar = CreateImageUpload({
    mimeTypes: ALLOWED_TYPES,
    maxFileSize: MAX_FILE_SIZE
});

export default uploadAvatar;
