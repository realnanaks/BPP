'use client';
import { Globe, Smartphone, Monitor, Users, CheckCircle2, Plus, RefreshCw, X, Upload, FileText } from 'lucide-react';
import { useWizardContext } from '@/context/WizardContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// Robust flag emoji generator
const getFlagEmoji = (countryCode: string) => {
    if (!countryCode) return '�';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

export default function StepScope() {
    const { state, updateEligibility } = useWizardContext();
    const { markets, channels: platforms, segment } = state.eligibility;
    const router = useRouter();

    const [availableMarkets, setAvailableMarkets] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const loadMarkets = async () => {
        setIsLoading(true);
        // Simulate API latency
        await new Promise(resolve => setTimeout(resolve, 800));

        if (typeof window === 'undefined') return;

        const saved = localStorage.getItem('settings_countries');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setAvailableMarkets(parsed.map((c: any) => ({
                        id: c.code,
                        name: c.name
                    })));
                    setIsLoading(false);
                    return;
                }
            } catch (e) {
                console.error("Failed to parse settings_countries", e);
            }
        }

        // Fallback default markets
        setAvailableMarkets([
            { id: 'KE', name: 'Kenya' },
            { id: 'GH', name: 'Ghana' },
            { id: 'NG', name: 'Nigeria' },
            { id: 'ET', name: 'Ethiopia' },
            { id: 'TZ', name: 'Tanzania' },
            { id: 'UG', name: 'Uganda' },
        ]);
        setIsLoading(false);
    };

    useEffect(() => {
        loadMarkets();
        // Listen for settings changes
        window.addEventListener('storage', loadMarkets);
        return () => window.removeEventListener('storage', loadMarkets);
    }, []);

    const refreshMarkets = () => {
        setIsLoading(true);
        setTimeout(() => {
            loadMarkets();
            setIsLoading(false);
        }, 500);
    };

    const toggleMarket = (id: string) => {
        const target = id.toUpperCase();
        const current = markets.map(m => m.toUpperCase());

        if (current.includes(target)) {
            updateEligibility({ markets: markets.filter(m => m.toUpperCase() !== target) });
        } else {
            updateEligibility({ markets: [...markets, target] });
        }
    };

    const togglePlatform = (id: string) => {
        if (platforms.includes(id)) updateEligibility({ channels: platforms.filter(p => p !== id) });
        else updateEligibility({ channels: [...platforms, id] });
    };

    const handleSegmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        if (val === 'create_new') {
            router.push('/segments/create');
            return;
        }
        if (val === 'custom') {
            setIsUploadModalOpen(true);
            return;
        }
        updateEligibility({ segment: val });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Simulate upload
        setUploadProgress(10);
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        updateEligibility({ segment: 'custom_csv' });
                        setIsUploadModalOpen(false);
                        setUploadProgress(0);
                    }, 500);
                    return 100;
                }
                return prev + 20;
            });
        }, 300);
    };

    return (
        <div className="step-container">
            <div className="glass-panel form-panel">
                <h2 className="panel-title">Scope & Eligibility</h2>

                {/* Markets Section */}
                <div className="form-section">
                    <div className="section-header">
                        <label className="section-label"><Globe size={16} /> Target Markets</label>
                        <button className="refresh-btn" onClick={refreshMarkets} title="Reload countries from settings">
                            <RefreshCw size={14} /> Refresh List
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="loading-state">Loading markets...</div>
                    ) : (
                        <div className="grid-options">
                            {availableMarkets.length === 0 ? (
                                <div className="empty-state">
                                    No countries configured. Please go to Settings &gt; Countries & Limits.
                                </div>
                            ) : availableMarkets.map((m) => {
                                const isActive = markets.some(mk => mk.toUpperCase() === m.id.toUpperCase());
                                return (
                                    <div
                                        key={m.id}
                                        className={`option-card market-card ${isActive ? 'active' : ''}`}
                                        onClick={() => toggleMarket(m.id)}
                                    >
                                        <span className="flag-large">{getFlagEmoji(m.id)}</span>
                                        <span className="name">{m.name}</span>
                                        {isActive && <CheckCircle2 size={16} className="check-icon" />}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Platform Section */}
                <div className="form-section">
                    <label className="section-label"><Smartphone size={16} /> Platforms</label>
                    <div className="grid-options three-col">
                        <div
                            className={`option-card ${platforms.includes('mobile') ? 'active' : ''}`}
                            onClick={() => togglePlatform('mobile')}
                        >
                            <Smartphone size={24} className="icon" />
                            <span className="name">Mobile Web</span>
                        </div>
                        <div
                            className={`option-card ${platforms.includes('app') ? 'active' : ''}`}
                            onClick={() => togglePlatform('app')}
                        >
                            <div className="icon-group">
                                <span className="icon-text">iOS</span>
                                <span className="divider">/</span>
                                <span className="icon-text">Android</span>
                            </div>
                            <span className="name">Native App</span>
                        </div>
                        <div
                            className={`option-card ${platforms.includes('desktop') ? 'active' : ''}`}
                            onClick={() => togglePlatform('desktop')}
                        >
                            <Monitor size={24} className="icon" />
                            <span className="name">Desktop</span>
                        </div>
                    </div>
                </div>

                {/* Player Segments */}
                <div className="form-section">
                    <label className="section-label"><Users size={16} /> Player Eligibility</label>
                    <div className="segment-selector">
                        <select className="form-select" value={segment} onChange={handleSegmentChange}>
                            <option value="all">All Registered Players</option>
                            <option value="new">New Players (Registered &lt; 30 days)</option>
                            <option value="vip">VIP Segments Only</option>
                            <option value="custom">Custom List (Upload CSV)</option>
                            <option value="custom_csv" disabled hidden>Custom CSV List (Uploaded)</option>
                            <optgroup label="Actions">
                                <option value="create_new" className="action-option">
                                    + Create New Segment
                                </option>
                            </optgroup>
                        </select>
                        <div className="info-box">
                            <p>Targeting approx. <strong>2.4M users</strong> across selected markets.</p>
                        </div>
                    </div>
                </div>

                {state.eligibility.segment === 'custom_csv' && (
                    <div className="csv-success-badge">
                        <FileText size={14} /> <span>Custom list uploaded successfully (12,405 users)</span>
                        <button className="remove-btn" onClick={() => updateEligibility({ segment: 'all' })}><X size={12} /></button>
                    </div>
                )}

            </div>

            {/* Upload Modal */}
            {isUploadModalOpen && (
                <div className="modal-overlay">
                    <div className="upload-modal">
                        <div className="modal-header">
                            <h3>Upload Player List</h3>
                            <button onClick={() => setIsUploadModalOpen(false)}><X size={18} /></button>
                        </div>
                        <div className="modal-body">
                            <div className="upload-area">
                                <Upload size={32} className="upload-icon" />
                                <p>Drag and drop your CSV file here</p>
                                <span className="sub-text">or click to browse</span>
                                <input type="file" accept=".csv" onChange={handleFileUpload} />
                            </div>

                            {uploadProgress > 0 && (
                                <div className="progress-container">
                                    <div className="p-bar-bg"><div className="p-bar-fill" style={{ width: `${uploadProgress}%` }} /></div>
                                    <span className="p-text">Uploading... {uploadProgress}%</span>
                                </div>
                            )}

                            <div className="info-notes">
                                <p>• Accepted format: CSV, XLS</p>
                                <p>• Required columns: player_id, mobile_number</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .step-container { max-width: 800px; margin: 0 auto; animation: slideIn 0.3s ease-out; }
                @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                .form-panel { padding: 40px; }
                .panel-title { font-size: 20px; margin-bottom: 32px; font-weight: 700; color: var(--color-text-primary); }

                .form-section { margin-bottom: 32px; }
                .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
                .section-label { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--color-text-secondary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0; }
                .refresh-btn { background: rgba(255,255,255,0.05); border: none; color: var(--color-text-secondary); cursor: pointer; display: flex; align-items: center; gap: 6px; padding: 4px 8px; border-radius: 4px; font-size: 11px; transition: all 0.2s; }
                .refresh-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }

                .grid-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
                .grid-options.three-col { grid-template-columns: repeat(3, 1fr); }

                .option-card {
                    background: var(--color-bg-card);
                    border: 1px solid var(--color-border);
                    border-radius: 12px;
                    padding: 16px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                    position: relative;
                }
                .option-card:hover { border-color: var(--color-border-hover); }
                .option-card.active {
                    background: rgba(6, 182, 212, 0.1);
                    border-color: var(--color-accent-cyan);
                }
                .option-card.active .name, .option-card.active .icon, .option-card.active .icon-text { color: var(--color-text-primary); }

                /* Market Card Specifics */
                .market-card {
                    flex-direction: column;
                    justify-content: center;
                    text-align: center;
                    padding: 24px 16px;
                    gap: 8px;
                }
                .flag-large { font-size: 42px; line-height: 1; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)); }
                
                .name { font-size: 14px; font-weight: 500; color: var(--color-text-muted); transition: color 0.2s; }
                .icon { color: var(--color-text-muted); transition: color 0.2s; }
                .icon-group { display: flex; align-items: center; gap: 4px; color: var(--color-text-muted); font-weight: 600; font-size: 16px; }

                .check-icon { position: absolute; top: 10px; right: 10px; color: var(--color-accent-cyan); }

                .form-select {
                    width: 100%;
                    background: var(--color-bg-card);
                    border: 1px solid var(--color-border);
                    color: var(--color-text-primary);
                    padding: 12px;
                    border-radius: 8px;
                    font-size: 14px;
                    outline: none;
                    margin-bottom: 12px;
                }
                .form-select:focus { border-color: var(--color-accent-cyan); }
                
                .info-box { font-size: 13px; color: var(--color-text-muted); display: flex; align-items: center; gap: 8px; }
                .info-box strong { color: var(--color-betika-yellow); }
                
                .loading-state, .empty-state {
                    padding: 24px; text-align: center; color: var(--color-text-secondary); background: rgba(255,255,255,0.03); border-radius: 8px; font-size: 14px;
                }

                /* CSV Badge */
                .csv-success-badge {
                    margin-top: 12px;
                    background: rgba(34, 197, 94, 0.1);
                    border: 1px solid rgba(34, 197, 94, 0.3);
                    color: #22c55e;
                    padding: 10px 16px;
                    border-radius: 8px;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .remove-btn { margin-left: auto; background: transparent; border: none; color: #22c55e; cursor: pointer; opacity: 0.7; }
                .remove-btn:hover { opacity: 1; }

                /* Modal Styles */
                .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); z-index: 100; display: flex; align-items: center; justify-content: center; }
                .upload-modal { background: var(--color-bg-panel); width: 400px; border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
                .modal-header { padding: 16px 24px; border-bottom: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center; background: var(--color-bg-card); }
                .modal-header h3 { margin: 0; font-size: 16px; color: var(--color-text-primary); }
                .modal-header button { background: transparent; border: none; color: var(--color-text-muted); cursor: pointer; }
                
                .modal-body { padding: 24px; }
                .upload-area { 
                    border: 2px dashed var(--color-border); 
                    border-radius: 12px; 
                    padding: 32px; 
                    text-align: center; 
                    color: var(--color-text-muted); 
                    position: relative; 
                    cursor: pointer; 
                    background: var(--color-bg-input); 
                    transition: all 0.2s;
                }
                .upload-area:hover { border-color: var(--color-accent-cyan); color: var(--color-accent-cyan); background: rgba(6,182,212,0.05); }
                .upload-icon { margin-bottom: 12px; opacity: 0.5; }
                .sub-text { font-size: 12px; opacity: 0.7; display: block; margin-top: 4px; }
                .upload-area input { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }

                .progress-container { margin-top: 20px; }
                .p-bar-bg { height: 6px; background: var(--color-bg-input); border-radius: 3px; overflow: hidden; }
                .p-bar-fill { height: 100%; background: var(--color-accent-cyan); transition: width 0.3s ease; }
                .p-text { display: block; font-size: 11px; color: var(--color-text-muted); margin-top: 6px; text-align: right; }

                .info-notes { margin-top: 24px; font-size: 12px; color: var(--color-text-secondary); line-height: 1.6; }
            `}</style>
        </div>
    );
}
