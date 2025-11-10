import React from 'react';
import { HistoryEntry } from '../types';
import { HistoryIcon, TrashIcon } from './Icons';

interface HistoryPanelProps {
    history: HistoryEntry[];
    onRestore: (id: string) => void;
    onClear: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onRestore, onClear }) => {
    return (
        <div className="bg-slate-800/50 rounded-2xl p-6 shadow-2xl border border-slate-700">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-purple-400 flex items-center">
                    <HistoryIcon className="mr-3" />
                    Generation History
                </h2>
                {history.length > 0 && (
                     <button
                        onClick={onClear}
                        className="flex items-center px-3 py-1.5 text-sm font-medium text-slate-300 bg-slate-700 rounded-md hover:bg-red-500/80 hover:text-white transition-colors"
                        aria-label="Clear history"
                    >
                        <TrashIcon className="w-4 h-4 mr-2" />
                        Clear
                    </button>
                )}
            </div>
            <div className="relative">
                {history.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                        <p>Your previous generations will appear here.</p>
                    </div>
                ) : (
                    <div className="flex overflow-x-auto space-x-4 pb-4 -mb-4">
                        {history.map((entry) => (
                            <div key={entry.id} className="flex-shrink-0">
                                <button
                                    onClick={() => onRestore(entry.id)}
                                    className="block w-32 h-32 rounded-lg overflow-hidden bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 group"
                                    aria-label={`Restore generation from ${new Date(entry.id.split('+')[0]).toLocaleString()}`}
                                >
                                    <img
                                        src={entry.generatedImage}
                                        alt="Generated history item"
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryPanel;
