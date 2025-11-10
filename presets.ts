import { StylePreset } from './types';

export const STYLE_PRESETS: StylePreset[] = [
    {
        name: 'E-commerce',
        lightingStyle: 'Studio Light',
        cameraPerspective: 'Eye-Level',
        promptEnhancement: 'on a clean, minimalist white background, perfect for an e-commerce listing'
    },
    {
        name: 'Lifestyle',
        lightingStyle: 'Natural Light',
        cameraPerspective: 'Close-Up',
        promptEnhancement: 'in a realistic lifestyle setting with a soft, moody, and cinematic feel'
    },
    {
        name: 'Dynamic',
        lightingStyle: 'Dramatic',
        cameraPerspective: 'Low-Angle',
        promptEnhancement: 'to capture a sense of motion and energy, with dramatic shadows'
    },
    {
        name: 'Luxury',
        lightingStyle: 'Soft Light',
        cameraPerspective: 'High-Angle',
        promptEnhancement: 'with an elegant and luxurious atmosphere, using high-end materials in the background'
    },
    {
        name: 'Graphic',
        lightingStyle: 'Hard Light',
        cameraPerspective: 'Top-Down',
        promptEnhancement: 'with strong shadows creating a bold, graphic, and flat-lay composition'
    }
];
