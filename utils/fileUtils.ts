import { AspectRatio } from './types';

export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

export const formatImageToAspectRatio = (base64Image: string, aspectRatio: AspectRatio): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const [ratioW, ratioH] = aspectRatio.split(':').map(Number);
            if (isNaN(ratioW) || isNaN(ratioH)) {
                return reject(new Error("Invalid aspect ratio format"));
            }
            const targetRatio = ratioW / ratioH;
            
            const originalWidth = img.width;
            const originalHeight = img.height;
            const originalRatio = originalWidth / originalHeight;

            let canvasWidth: number;
            let canvasHeight: number;

            if (originalRatio > targetRatio) {
                // Original image is wider than target, so pillarbox
                canvasWidth = originalWidth;
                canvasHeight = originalWidth / targetRatio;
            } else {
                // Original image is taller than or equal to target, so letterbox
                canvasHeight = originalHeight;
                canvasWidth = originalHeight * targetRatio;
            }

            const canvas = document.createElement('canvas');
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return reject(new Error("Could not get canvas context"));
            }

            // Fill background with white
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Calculate position to center the image
            const x = (canvas.width - originalWidth) / 2;
            const y = (canvas.height - originalHeight) / 2;

            ctx.drawImage(img, x, y, originalWidth, originalHeight);

            // Export as PNG to preserve quality
            resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = (error) => reject(error);
        img.src = base64Image;
    });
};
