'use client';
import { Globe, Smartphone, Monitor, Users, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function StepScope() {
    const [markets, setMarkets] = useState(['ke']);
    const [platforms, setPlatforms] = useState(['mobile', 'app']);

    const toggleMarket = (id: string) => {
        if (markets.includes(id)) setMarkets(markets.filter(m => m !== id));
        else setMarkets([...markets, id]);
    };

    const togglePlatform = (id: string) => {
        if (platforms.includes(id)) setPlatforms(platforms.filter(p => p !== id));
        else setPlatforms([...platforms, id]);
    };

    return (
        <div className="step-container">
            <div className="glass-panel form-panel">
                <h2 className="panel-title">Scope & Eligibility</h2>

                {/* Markets Section */}
                <div className="form-section">
                    <label className="section-label"><Globe size={16} /> Target Markets</label>
                    <div className="grid-options">
                        {[
                            { id: 'ke', name: 'Kenya', flag: '🇰🇪' },
                            { id: 'gh', name: 'Ghana', flag: '🇬🇭' },
                            { id: 'ng', name: 'Nigeria', flag: '🇳🇬' },
                            { id: 'et', name: 'Ethiopia', flag: '🇪🇹' },
                            { id: 'tz', name: 'Tanzania', flag: '🇹🇿' },
                            { id: 'ug', name: 'Uganda', flag: '🇺🇬' },
                        ].map((m) => (
                            <div
                                key={m.id}
                                className={`option-card ${markets.includes(m.id) ? 'active' : ''}`}
                                onClick={() => toggleMarket(m.id)}
                            >
                                <span className="flag">{m.flag}</span>
                                <span className="name">{m.name}</span>
                                {markets.includes(m.id) && <CheckCircle2 size={16} className="check-icon" />}
                            </div>
                        ))}
                    </div>
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
                        <select className="form-select">
                            <option>All Registered Players</option>
                            <option>New Players (Registered &lt; 30 days)</option>
                            <option>VIP Segments Only</option>
                            <option>Custom List (Upload CSV)</option>
                        </select>
                        <div className="info-box">
                            <p>Targeting approx. <strong>2.4M users</strong> across selected markets.</p>
                        </div>
                    </div>
                </div>

            </div>

            <style jsx>{`
                .step-container { max-width: 800px; margin: 0 auto; animation: slideIn 0.3s ease-out; }
                @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                .form-panel { padding: 40px; }
                .panel-title { font-size: 20px; margin-bottom: 32px; font-weight: 700; color: #fff; }

                .form-section { margin-bottom: 32px; }
                .section-label { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--color-text-secondary); margin-bottom: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }

                .grid-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
                .grid-options.three-col { grid-template-columns: repeat(3, 1fr); }

                .option-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    padding: 16px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                    position: relative;
                }
                .option-card:hover { background: rgba(255,255,255,0.06); }
                .option-card.active {
                    background: rgba(6, 182, 212, 0.1);
                    border-color: var(--color-accent-cyan);
                }
                .option-card.active .name, .option-card.active .icon, .option-card.active .icon-text { color: #fff; }

                .flag { font-size: 24px; }
                .name { font-size: 14px; font-weight: 500; color: var(--color-text-muted); }
                .icon { color: var(--color-text-muted); }
                .icon-group { display: flex; align-items: center; gap: 4px; color: var(--color-text-muted); font-weight: 600; font-size: 16px; }

                .check-icon { position: absolute; top: 10px; right: 10px; color: var(--color-accent-cyan); }

                .form-select {
                    width: 100%;
                    background: rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #fff;
                    padding: 12px;
                    border-radius: 8px;
                    font-size: 14px;
                    outline: none;
                    margin-bottom: 12px;
                }
                .info-box { font-size: 13px; color: var(--color-text-muted); display: flex; align-items: center; gap: 8px; }
                .info-box strong { color: var(--color-betika-yellow); }
            `}</style>
        </div>
    );
}
