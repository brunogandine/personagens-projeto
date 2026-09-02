import CreateImageUpload from "./createImageUpload";

export const ALLOWED_TYPES = [
    "image/jpeg",
    "image/png"
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const uploadImage = CreateImageUpload({
    mimeTypes: ALLOWED_TYPES,
    maxFileSize: MAX_FILE_SIZE
});

export default uploadImage;