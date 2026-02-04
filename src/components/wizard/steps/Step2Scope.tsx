'use client';
import { Globe, Smartphone, Monitor, Users, CheckCircle2, Plus } from 'lucide-react';
import { useWizardContext } from '@/context/WizardContext';
import { useRouter } from 'next/navigation';

export default function StepScope() {
    const { state, updateEligibility } = useWizardContext();
    const { markets, channels: platforms, segment } = state.eligibility;
    const router = useRouter();

    const toggleMarket = (id: string) => {
        if (markets.includes(id)) updateEligibility({ markets: markets.filter(m => m !== id) });
        else updateEligibility({ markets: [...markets, id] });
    };

    const togglePlatform = (id: string) => {
        if (platforms.includes(id)) updateEligibility({ channels: platforms.filter(p => p !== id) });
        else updateEligibility({ channels: [...platforms, id] });
    };

    const handleSegmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        if (val === 'create_new') {
            // Mock redirect for creating new segment
            router.push('/segments/create');
            return;
        }
        updateEligibility({ segment: val });
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
                                className={`option-card market-card ${markets.includes(m.id) ? 'active' : ''}`}
                                onClick={() => toggleMarket(m.id)}
                            >
                                <span className="flag-large">{m.flag}</span>
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
                        <select className="form-select" value={segment} onChange={handleSegmentChange}>
                            <option value="all">All Registered Players</option>
                            <option value="new">New Players (Registered &lt; 30 days)</option>
                            <option value="vip">VIP Segments Only</option>
                            <option value="custom">Custom List (Upload CSV)</option>
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

            </div>

            <style jsx>{`
                .step-container { max-width: 800px; margin: 0 auto; animation: slideIn 0.3s ease-out; }
                @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                .form-panel { padding: 40px; }
                .panel-title { font-size: 20px; margin-bottom: 32px; font-weight: 700; color: var(--color-text-primary); }

                .form-section { margin-bottom: 32px; }
                .section-label { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--color-text-secondary); margin-bottom: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }

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
            `}</style>
        </div>
    );
}
