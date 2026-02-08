'use client';

import { useState, useEffect } from 'react';
import { X, Play, SkipForward } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface ExplainerVideoProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ExplainerVideo({ isOpen, onClose }: ExplainerVideoProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    // Portal to document.body
    const { createPortal } = require('react-dom');

    const content = (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="video-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="video-modal"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        <button className="close-btn" onClick={onClose}>
                            <X size={20} />
                        </button>

                        <div className="video-header">
                            <h2>Welcome to Betika Promotions</h2>
                            <p>Here's a quick 30s overview of the platform.</p>
                        </div>

                        <div className="video-player">
                            {/* Mock Video Player */}
                            <div className="video-placeholder">
                                <div className="play-icon">
                                    <Play size={48} fill="currentColor" />
                                </div>
                                <div className="video-overlay">
                                    <span className="duration">0:30</span>
                                </div>
                                {/* In a real app, this would be:
                                   <iframe src="https://www.youtube.com/embed/VIDEO_ID" ... />
                                */}
                                <img
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
                                    alt="Platform Preview"
                                    className="video-poster"
                                />
                            </div>
                        </div>

                        <div className="video-footer">
                            <button className="btn-skip" onClick={onClose}>
                                <SkipForward size={16} /> Skip Video
                            </button>
                            <button className="btn-primary" onClick={onClose}>
                                Get Started
                            </button>
                        </div>
                    </motion.div>

                    <style jsx global>{`
                        .video-backdrop {
                            position: fixed;
                            inset: 0;
                            background: rgba(0, 0, 0, 0.85);
                            z-index: 100000;
                            backdrop-filter: blur(5px);
                        }
                        
                        .video-modal {
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%) !important;
                            width: 100%;
                            max-width: 800px;
                            background: #18181b;
                            border: 1px solid rgba(255,255,255,0.1);
                            border-radius: 20px;
                            padding: 32px;
                            z-index: 100001;
                            box-shadow: 0 40px 80px rgba(0,0,0,0.6);
                        }

                        .close-btn {
                            position: absolute;
                            top: 20px;
                            right: 20px;
                            background: rgba(255,255,255,0.05);
                            border: none;
                            color: #a1a1aa;
                            padding: 8px;
                            border-radius: 50%;
                            cursor: pointer;
                            transition: all 0.2s;
                        }
                        .close-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }

                        .video-header { margin-bottom: 24px; text-align: center; }
                        .video-header h2 { font-size: 24px; font-weight: 700; color: #fff; margin: 0 0 8px 0; }
                        .video-header p { color: #a1a1aa; font-size: 15px; margin: 0; }

                        .video-player {
                            width: 100%;
                            aspect-ratio: 16/9;
                            background: #000;
                            border-radius: 12px;
                            overflow: hidden;
                            position: relative;
                            margin-bottom: 24px;
                            border: 1px solid rgba(255,255,255,0.1);
                        }

                        .video-placeholder {
                            width: 100%;
                            height: 100%;
                            position: relative;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                        }

                        .video-poster {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            opacity: 0.6;
                            transition: opacity 0.3s;
                        }
                        .video-placeholder:hover .video-poster { opacity: 0.4; }

                        .play-icon {
                            position: absolute;
                            z-index: 2;
                            width: 80px;
                            height: 80px;
                            background: rgba(234, 179, 8, 0.9);
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #000;
                            box-shadow: 0 0 40px rgba(234, 179, 8, 0.4);
                            transition: transform 0.2s;
                        }
                        .video-placeholder:hover .play-icon { transform: scale(1.1); }

                        .duration {
                            position: absolute;
                            bottom: 16px;
                            right: 16px;
                            background: rgba(0,0,0,0.8);
                            color: #fff;
                            padding: 4px 8px;
                            border-radius: 4px;
                            font-size: 12px;
                            font-weight: 600;
                            z-index: 2;
                        }

                        .video-footer {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        }

                        .btn-skip {
                            background: transparent;
                            border: none;
                            color: #71717a;
                            font-size: 14px;
                            font-weight: 500;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            padding: 8px 16px;
                            border-radius: 8px;
                            transition: all 0.2s;
                        }
                        .btn-skip:hover { color: #fff; background: rgba(255,255,255,0.05); }

                        .btn-primary {
                            background: var(--color-betika-yellow, #eab308);
                            color: #000;
                            border: none;
                            padding: 10px 24px;
                            border-radius: 8px;
                            font-weight: 700;
                            cursor: pointer;
                            transition: all 0.2s;
                        }
                        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(234, 179, 8, 0.2); }
                    `}</style>
                </>
            )}
        </AnimatePresence>
    );

    return createPortal(content, document.body);
}
