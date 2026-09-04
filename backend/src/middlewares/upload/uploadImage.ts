import CreateImageUpload from "./createImageUpload";
import { ALLOWED_IMAGES_TYPES } from "@/middlewares/upload/uploadTypes";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const uploadImage = CreateImageUpload({
    mimeTypes: ALLOWED_IMAGES_TYPES,
    maxFileSize: MAX_FILE_SIZE
});

export default uploadImage;