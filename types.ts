export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4' | '3:2';
export type LightingStyle = 'Studio Light' | 'Natural Light' | 'Dramatic' | 'Soft Light' | 'Hard Light' | 'Backlit';
export type CameraPerspective = 'Eye-Level' | 'High-Angle' | 'Low-Angle' | 'Close-Up' | 'Wide Shot' | 'Top-Down';

export interface OptionType<T> {
    value: T;
    label: string;
}

export interface StylePreset {
    name: string;
    lightingStyle: LightingStyle;
    cameraPerspective: CameraPerspective;
    promptEnhancement: string;
}

export interface HistoryEntry {
    id: string;
    generatedImage: string; // base64 data url
    prompt: string;
    productImage: string; // base64 data url
    styleImage: string | null; // base64 data url
    aspectRatio: AspectRatio;
    lightingStyle: LightingStyle;
    cameraPerspective: CameraPerspective;
    activePreset: string | null;
    styleDescription: string;
}
