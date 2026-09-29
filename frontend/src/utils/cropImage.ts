import type { Area } from "react-easy-crop";

export type CropOptions = {
    width?:  number;
    height?: number;
    format?: "image/png" | "image/jpeg" | "image/webp";
    quality?: number;
};

export const getCroppedImg = async (imageSrc: string, pixelCrop: Area, options?: CropOptions): Promise<Blob | null> => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageSrc;

    await new Promise((resolve) => {
        image.onload = resolve;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if(!ctx)
        return null;

    const outputWidth = options?.width ?? pixelCrop.width;
    const outputHeight = options?.height ?? pixelCrop.height;

    canvas.width = outputWidth;
    canvas.height = outputHeight;

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        outputWidth,
        outputHeight
    );

    return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/png");
    });
}