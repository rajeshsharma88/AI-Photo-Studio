
import React from 'react';

interface Option {
    value: string;
    label: string;
}

interface OptionSelectorProps {
    label: string;
    options: Option[];
    selectedValue: string;
    onValueChange: (value: string) => void;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({ label, options, selectedValue, onValueChange }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => onValueChange(option.value)}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 ${
                            selectedValue === option.value
                                ? 'bg-cyan-500 text-white shadow-md'
                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OptionSelector;
