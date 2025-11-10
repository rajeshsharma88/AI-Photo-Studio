import React, { useEffect } from 'react';
import { XIcon } from './Icons';

interface LightboxProps {
    imageUrl: string;
    onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ imageUrl, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
        >
            <div 
                className="relative max-w-full max-h-full"
                onClick={(e) => e.stopPropagation()}
            >
                <img 
                    src={imageUrl} 
                    alt="Full resolution view" 
                    className="block max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl" 
                />
                <button
                    onClick={onClose}
                    className="absolute -top-3 -right-3 p-2 bg-slate-700 rounded-full text-white hover:bg-red-600 hover:scale-110 transition-all duration-200"
                    aria-label="Close lightbox"
                >
                    <XIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default Lightbox;
