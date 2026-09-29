import CreateImageUpload from "./createImageUpload";
import { ALLOWED_PROFILE_IMAGES_TYPES } from "@/middlewares/upload/uploadTypes";

const MAX_FILE_SIZE = 5 * 1024 * 1024

const uploadAvatar = CreateImageUpload({
    mimeTypes: ALLOWED_PROFILE_IMAGES_TYPES,
    maxFileSize: MAX_FILE_SIZE
});

export default uploadAvatar;
