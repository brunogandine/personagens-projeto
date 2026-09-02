export const validateImageFile = (file: File ): Promise<boolean> => {
    return new Promise((resolve) => {
        const testUrl = URL.createObjectURL(file);
        const image = new Image();

        image.onload = () => {
            URL.revokeObjectURL(testUrl);
            resolve(true);
        };

        image.onerror = () => {
            URL.revokeObjectURL(testUrl);
            resolve(false);
        };

        image.src = testUrl;
    })
}