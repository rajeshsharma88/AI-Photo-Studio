import React, { useState, useEffect, useCallback } from 'react';
import { generateStyledImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import ImageUploader from './components/ImageUploader';
import OptionSelector from './components/OptionSelector';
import PresetSelector from './components/PresetSelector';
import { ASPECT_RATIOS, LIGHTING_STYLES, CAMERA_PERSPECTIVES } from './constants';
import { STYLE_PRESETS } from './presets';
import { AspectRatio, CameraPerspective, LightingStyle, StylePreset } from './types';
import { WandSparklesIcon, LoaderCircleIcon, AlertTriangleIcon, ImageIcon, DownloadIcon, SparklesIcon } from './components/Icons';

const App: React.FC = () => {
    const [productImage, setProductImage] = useState<File | null>(null);
    const [styleImage, setStyleImage] = useState<File | null>(null);
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>(ASPECT_RATIOS[0].value);
    const [lightingStyle, setLightingStyle] = useState<LightingStyle>(LIGHTING_STYLES[0].value);
    const [cameraPerspective, setCameraPerspective] = useState<CameraPerspective>(CAMERA_PERSPECTIVES[0].value);
    const [activePreset, setActivePreset] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    // Effect to auto-generate the prompt
    useEffect(() => {
        if (!productImage) {
            setPrompt('');
            return;
        }

        const generatePrompt = () => {
            // Start with the most critical constraint: aspect ratio.
            let newPrompt = `Generate a new professional, high-resolution product photograph with a strict output aspect ratio of ${aspectRatio}.`;
            newPrompt += ` The subject is provided in the input product image.`;
            
            const selectedPreset = STYLE_PRESETS.find(p => p.name === activePreset);
            if (selectedPreset) {
                newPrompt += ` The style should be ${selectedPreset.promptEnhancement}.`;
            }

            newPrompt += ` The scene must be illuminated with ${lightingStyle.toLowerCase()}.`;
            newPrompt += ` Capture the image from a ${cameraPerspective.toLowerCase()}.`;

            if (styleImage) {
                newPrompt += ` The overall aesthetic, including mood, color grading, texture, and composition, should be heavily inspired by the provided style reference image.`;
            }

            newPrompt += ` Ensure the product is the clear focal point and looks exceptionally appealing. Eliminate any background from the original product photo, and place the product in a new, contextually appropriate, and visually stunning environment that complements both the product and the requested style. The final composition must be cropped to fill the entire ${aspectRatio} frame. Do not distort the subject, and do not add letterboxing or pillarboxing.`;
            
            setPrompt(newPrompt);
        };
        
        generatePrompt();
    }, [aspectRatio, lightingStyle, cameraPerspective, styleImage, productImage, activePreset]);

    const handleGenerateClick = useCallback(async () => {
        if (!productImage || !prompt) {
            setError('Please upload a product image and ensure a prompt is generated.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const productBase64 = await fileToBase64(productImage);
            const styleBase64 = styleImage ? await fileToBase64(styleImage) : null;
            
            const result = await generateStyledImage(prompt, productBase64, styleBase64);
            setGeneratedImage(`data:image/png;base64,${result}`);

        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred during image generation.');
        } finally {
            setIsLoading(false);
        }
    }, [productImage, styleImage, prompt]);

    const handlePresetSelect = (preset: StylePreset) => {
        setActivePreset(preset.name);
        setLightingStyle(preset.lightingStyle);
        setCameraPerspective(preset.cameraPerspective);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
            <main className="container mx-auto p-4 md:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                        AI Photo Studio
                    </h1>
                    <p className="mt-2 text-lg text-slate-400">Transform your product photos with Gemini Nano Banana</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Column 1 & 2: Controls & Inputs */}
                    <div className="lg:col-span-2 bg-slate-800/50 rounded-2xl p-6 shadow-2xl border border-slate-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Inputs */}
                            <div>
                                <h2 className="text-2xl font-semibold mb-4 text-cyan-400">1. Upload Images</h2>
                                <div className="space-y-6">
                                    <ImageUploader
                                        title="Product Photo"
                                        onFileSelect={setProductImage}
                                    />
                                    <ImageUploader
                                        title="Style Reference (Optional)"
                                        onFileSelect={setStyleImage}
                                    />
                                </div>
                            </div>
                            
                            {/* Styling Options */}
                            <div>
                                <h2 className="text-2xl font-semibold mb-4 text-cyan-400">2. Select Styles</h2>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="flex items-center text-sm font-medium text-slate-300">
                                            <SparklesIcon className="w-4 h-4 mr-2 text-yellow-400" />
                                            Style Presets
                                        </label>
                                        <PresetSelector 
                                            presets={STYLE_PRESETS}
                                            selectedPresetName={activePreset}
                                            onPresetSelect={handlePresetSelect}
                                        />
                                    </div>
                                    <OptionSelector
                                        label="Aspect Ratio"
                                        options={ASPECT_RATIOS}
                                        selectedValue={aspectRatio}
                                        onValueChange={(val) => setAspectRatio(val as AspectRatio)}
                                    />
                                    <OptionSelector
                                        label="Lighting Style"
                                        options={LIGHTING_STYLES}
                                        selectedValue={lightingStyle}
                                        onValueChange={(val) => {
                                            setLightingStyle(val as LightingStyle);
                                            setActivePreset(null);
                                        }}
                                    />
                                    <OptionSelector
                                        label="Camera Perspective"
                                        options={CAMERA_PERSPECTIVES}
                                        selectedValue={cameraPerspective}
                                        onValueChange={(val) => {
                                            setCameraPerspective(val as CameraPerspective);
                                            setActivePreset(null);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Prompt & Generate Button */}
                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">3. Generated Prompt</h2>
                             <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                rows={6}
                                className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow"
                                placeholder="Upload a product image to generate a prompt..."
                                readOnly={!productImage}
                            />
                        </div>
                        <div className="mt-6 text-center">
                            <button
                                onClick={handleGenerateClick}
                                disabled={isLoading || !productImage}
                                className="w-full md:w-auto inline-flex items-center justify-center px-12 py-4 text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg hover:from-cyan-400 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg disabled:shadow-none"
                            >
                                {isLoading ? (
                                    <>
                                        <LoaderCircleIcon className="animate-spin mr-3" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <WandSparklesIcon className="mr-3" />
                                        Generate Image
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Column 3: Output */}
                    <div className="bg-slate-800/50 rounded-2xl p-6 shadow-2xl border border-slate-700 flex flex-col justify-center items-center h-[400px] lg:h-auto">
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400 self-start">Result</h2>
                        <div className="w-full h-full flex justify-center items-center bg-slate-900 rounded-lg border-2 border-dashed border-slate-700 relative">
                             {isLoading && (
                                <div className="text-center text-slate-400">
                                    <LoaderCircleIcon className="w-12 h-12 animate-spin mx-auto mb-4" />
                                    <p className="font-semibold">Generating your masterpiece...</p>
                                    <p className="text-sm">This might take a moment.</p>
                                </div>
                            )}
                            {error && (
                                <div className="text-center text-red-400 p-4">
                                     <AlertTriangleIcon className="w-12 h-12 mx-auto mb-4"/>
                                    <p className="font-semibold">Generation Failed</p>
                                    <p className="text-sm mt-1">{error}</p>
                                </div>
                            )}
                            {!isLoading && !generatedImage && !error && (
                                <div className="text-center text-slate-500">
                                    <ImageIcon className="w-16 h-16 mx-auto mb-4" />
                                    <p>Your generated image will appear here</p>

                                </div>
                            )}
                            {generatedImage && (
                                <>
                                    <img
                                        src={generatedImage}
                                        alt="Generated product"
                                        className="w-full h-full object-contain rounded-md"
                                    />
                                    <a
                                        href={generatedImage}
                                        download="ai-photo-studio-result.png"
                                        className="absolute bottom-4 right-4 inline-flex items-center justify-center px-4 py-2 font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-500 transition-colors duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
                                        aria-label="Download image"
                                    >
                                        <DownloadIcon className="mr-2 h-5 w-5" />
                                        <span>Download</span>
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;