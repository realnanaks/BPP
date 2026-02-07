'use client';
import { Globe, Smartphone, Monitor, Users, CheckCircle2, Plus, RefreshCw } from 'lucide-react';
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

    // Load settings with fallback
    useEffect(() => {
        const loadMarkets = () => {
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

            // Fallback if nothing saved - use a default list to avoid empty state on first load
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

        loadMarkets();

        // Optional: Listen for storage events (if settings changed in another tab)
        window.addEventListener('storage', loadMarkets);
        return () => window.removeEventListener('storage', loadMarkets);
    }, []);

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
        updateEligibility({ segment: val });
    };

    return (
        <div className="step-container">
            <div className="glass-panel form-panel">
                <h2 className="panel-title">Scope & Eligibility</h2>

                {/* Markets Section */}
                <div className="form-section">
                    <div className="section-header">
                        <label className="section-label"><Globe size={16} /> Target Markets</label>
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
                .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
                .section-label { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--color-text-secondary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0; }

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
            `}</style>
        </div>
    );
}
