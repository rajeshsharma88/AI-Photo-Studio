
import { OptionType, AspectRatio, LightingStyle, CameraPerspective } from './types';

export const ASPECT_RATIOS: OptionType<AspectRatio>[] = [
    { value: '1:1', label: 'Square (1:1)' },
    { value: '16:9', label: 'Landscape (16:9)' },
    { value: '9:16', label: 'Portrait (9:16)' },
    { value: '4:3', label: 'Standard (4:3)' },
    { value: '3:4', label: 'Tall (3:4)' },
    { value: '3:2', label: 'Photo (3:2)' },
];

export const LIGHTING_STYLES: OptionType<LightingStyle>[] = [
    { value: 'Studio Light', label: 'Studio' },
    { value: 'Natural Light', label: 'Natural' },
    { value: 'Dramatic', label: 'Dramatic' },
    { value: 'Soft Light', label: 'Soft' },
    { value: 'Hard Light', label: 'Hard' },
    { value: 'Backlit', label: 'Backlit' },
];

export const CAMERA_PERSPECTIVES: OptionType<CameraPerspective>[] = [
    { value: 'Eye-Level', label: 'Eye-Level' },
    { value: 'High-Angle', label: 'High-Angle' },
    { value: 'Low-Angle', label: 'Low-Angle' },
    { value: 'Close-Up', label: 'Close-Up' },
    { value: 'Wide Shot', label: 'Wide' },
    { value: 'Top-Down', label: 'Top-Down' },
];
