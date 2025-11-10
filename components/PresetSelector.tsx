import React from 'react';
import { StylePreset } from '../types';

interface PresetSelectorProps {
    presets: StylePreset[];
    selectedPresetName: string | null;
    onPresetSelect: (preset: StylePreset) => void;
}

const PresetSelector: React.FC<PresetSelectorProps> = ({ presets, selectedPresetName, onPresetSelect }) => {
    return (
        <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
                <button
                    key={preset.name}
                    onClick={() => onPresetSelect(preset)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 ${
                        selectedPresetName === preset.name
                            ? 'bg-cyan-500 text-white shadow-md'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                >
                    {preset.name}
                </button>
            ))}
        </div>
    );
};

export default PresetSelector;
