import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

interface ImagePart {
    inlineData: {
        data: string;
        mimeType: string;
    };
}

interface TextPart {
    text: string;
}

const getImagePart = (base64Data: string): ImagePart | null => {
    const match = base64Data.match(/^data:(image\/\w+);base64,(.*)$/);
    if (!match) return null;

    return {
        inlineData: {
            mimeType: match[1],
            data: match[2],
        },
    };
};

export const generateStyledImage = async (
    prompt: string,
    productImageBase64: string,
    styleImageBase64: string | null
): Promise<string> => {
    
    const productPart = getImagePart(productImageBase64);
    if (!productPart) {
        throw new Error("Invalid product image data format.");
    }

    const parts: (ImagePart | TextPart)[] = [
        { text: prompt },
        productPart,
    ];

    if (styleImageBase64) {
        const stylePart = getImagePart(styleImageBase64);
        if (stylePart) {
            parts.push(stylePart);
        } else {
            console.warn("Could not parse style image data, skipping.");
        }
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: parts,
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        
        const firstPart = response.candidates?.[0]?.content?.parts?.[0];

        if (firstPart && 'inlineData' in firstPart && firstPart.inlineData) {
            return firstPart.inlineData.data;
        } else {
            throw new Error("No image data found in the API response.");
        }

    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw new Error("Failed to generate image. Please check your API key and prompt.");
    }
};