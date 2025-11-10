
import React, { useState, useRef } from 'react';
import { UploadCloudIcon, XIcon } from './Icons';

interface ImageUploaderProps {
    title: string;
    onFileSelect: (file: File | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ title, onFileSelect }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            onFileSelect(file);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        onFileSelect(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const file = event.dataTransfer.files?.[0] || null;
        if (file && file.type.startsWith('image/')) {
            setImagePreview(URL.createObjectURL(file));
            onFileSelect(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">{title}</label>
            <div className="relative w-full h-48 rounded-lg border-2 border-dashed border-slate-600 hover:border-cyan-500 transition-colors duration-300 flex justify-center items-center group">
                {imagePreview ? (
                    <>
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-md p-2" />
                        <button
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 p-1 bg-slate-800/80 rounded-full text-slate-300 hover:bg-red-500/80 hover:text-white transition-all duration-200"
                            aria-label="Remove image"
                        >
                            <XIcon className="w-5 h-5" />
                        </button>
                    </>
                ) : (
                    <label 
                        className="w-full h-full flex flex-col justify-center items-center cursor-pointer"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <div className="text-center">
                            <UploadCloudIcon className="mx-auto h-12 w-12 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                            <p className="mt-2 text-sm text-slate-400">
                                <span className="font-semibold text-cyan-400">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-slate-500">PNG, JPG, WEBP</p>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png, image/jpeg, image/webp"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                )}
            </div>
        </div>
    );
};

export default ImageUploader;
