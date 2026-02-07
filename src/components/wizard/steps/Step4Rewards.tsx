'use client';
import { Gift, Coins, CreditCard, Ticket, Percent, DollarSign, ArrowRight, Plus, Trash2, Layers, Calendar, Users, AlertCircle, List, AlertTriangle } from 'lucide-react';
import { useWizardContext, TierRule } from '@/context/WizardContext';
import { useState, useEffect } from 'react';

export default function StepRewards() {
    const { state, updateRewards } = useWizardContext();
    const { type: rewardType, calcType, matrixDimension, tiers, simpleConfig, wagering } = state.rewards;
    const { markets } = state.eligibility;

    const [countryLimits, setCountryLimits] = useState<Record<string, number>>({});
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const setRewardType = (val: string) => updateRewards({ type: val });
    const setCalcType = (val: string) => updateRewards({ calcType: val });
    const setMatrixDimension = (val: string) => updateRewards({ matrixDimension: val });

    // Load Country Limits from Settings
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('settings_countries');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    const limits: Record<string, number> = {};
                    if (Array.isArray(parsed)) {
                        parsed.forEach((c: any) => {
                            if (c.code) limits[c.code.toUpperCase()] = Number(c.promoLimit) || 0;
                        });
                        setCountryLimits(limits);
                    }
                } catch (e) {
                    console.error("Failed to load country limits", e);
                }
            }
        }
    }, []);

    // Validate Config against Limits
    useEffect(() => {
        const errors: string[] = [];
        const selectedMarkets = markets || [];

        selectedMarkets.forEach(m => {
            const code = m.toUpperCase();
            const limit = countryLimits[code];

            if (limit && limit > 0) {
                if (calcType === 'simple') {
                    const currentCap = Number(simpleConfig.cap) || 0;
                    if (currentCap > limit) {
                        errors.push(`Reward Cap (${currentCap}) exceeds the limit for ${code} (${limit})`);
                    }
                } else if (calcType === 'tiered') {
                    tiers.forEach(tier => {
                        const tierCap = Number(tier.cap) || 0;
                        if (tierCap > limit) {
                            errors.push(`Tier value (${tierCap}) exceeds the limit for ${code} (${limit})`);
                        }
                    });
                }
            }
        });

        // Dedup errors
        setValidationErrors([...new Set(errors)]);
    }, [simpleConfig, tiers, calcType, markets, countryLimits]);


    const addTier = () => {
        updateRewards({
            tiers: [...tiers, {
                id: Date.now(),
                dimensionKey: matrixDimension,
                dimensionValue: matrixDimension === 'week' ? 'Week X' : '6 Selections',
                segment: 'Any',
                percentage: '0',
                cap: '0'
            }]
        });
    };

    const removeTier = (id: number) => {
        updateRewards({ tiers: tiers.filter(t => t.id !== id) });
    };

    const updateTier = (id: number, field: keyof TierRule, value: string) => {
        updateRewards({
            tiers: tiers.map(t => t.id === id ? { ...t, [field]: value } : t)
        });
    };

    // Helper to switch matrix type
    const toggleMatrixMode = (mode: string) => {
        setMatrixDimension(mode);
        // Reset tiers for demo purposes when switching
        if (mode === 'selections') {
            updateRewards({
                tiers: [
                    { id: 1, dimensionKey: 'selections', dimensionValue: '6-7 Selections', segment: 'Any', percentage: '100', cap: 'Unlimited' },
                    { id: 2, dimensionKey: 'selections', dimensionValue: '8-9 Selections', segment: 'Any', percentage: '150', cap: 'Unlimited' }
                ]
            });
        } else {
            updateRewards({
                tiers: [
                    { id: 1, dimensionKey: 'week', dimensionValue: 'Week 1', segment: 'Low Value', percentage: '30', cap: '60' }
                ]
            });
        }
    };

    return (
        <div className="step-container">
            <div className="glass-panel form-panel">
                <h2 className="panel-title">Reward Configuration</h2>

                {/* Validation Warning Box */}
                {validationErrors.length > 0 && (
                    <div className="validation-warning">
                        <div className="vw-header">
                            <AlertTriangle size={18} className="text-warning" />
                            <span>Configuration Limit Exceeded</span>
                        </div>
                        <ul className="vw-list">
                            {validationErrors.map((err, i) => <li key={i}>{err}</li>)}
                        </ul>
                    </div>
                )}

                {/* 1. Reward Type Selection */}
                <div className="form-section">
                    <label className="section-label">Reward Type</label>
                    <div className="rewards-grid">
                        <div className={`reward-card ${rewardType === 'freespins' ? 'active' : ''}`} onClick={() => setRewardType('freespins')}>
                            <div className="r-icon yellow"><Ticket size={24} /></div>
                            <div className="r-content">
                                <h3>Freespins</h3>
                                <p>Spins on specific slot games.</p>
                            </div>
                        </div>
                        <div className={`reward-card ${rewardType === 'freebets' ? 'active' : ''}`} onClick={() => setRewardType('freebets')}>
                            <div className="r-icon blue"><Ticket size={24} /></div>
                            <div className="r-content">
                                <h3>Freebets</h3>
                                <p>Free bet tokens for sports.</p>
                            </div>
                        </div>
                        <div className={`reward-card ${rewardType === 'freerounds' ? 'active' : ''}`} onClick={() => setRewardType('freerounds')}>
                            <div className="r-icon purple"><Coins size={24} /></div>
                            <div className="r-content">
                                <h3>Freerounds</h3>
                                <p>Rounds for crash games.</p>
                            </div>
                        </div>
                        <div className={`reward-card ${rewardType === 'cash' ? 'active' : ''}`} onClick={() => setRewardType('cash')}>
                            <div className="r-icon green"><DollarSign size={24} /></div>
                            <div className="r-content">
                                <h3>Cash</h3>
                                <p>Real withdrawable cash.</p>
                            </div>
                        </div>
                        <div className={`reward-card ${rewardType === 'bonus' ? 'active' : ''}`} onClick={() => setRewardType('bonus')}>
                            <div className="r-icon purple"><Gift size={24} /></div>
                            <div className="r-content">
                                <h3>Bonus</h3>
                                <p>Bonus funds with wagering.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Value Configuration */}
                <div className="config-box">
                    <div className="config-header">
                        <h3 className="sub-title">Reward Value Model</h3>
                        <div className="toggle-group">
                            <button className={`toggle-btn ${calcType === 'simple' ? 'active' : ''}`} onClick={() => setCalcType('simple')}>
                                <Percent size={14} /> Simple Rule
                            </button>
                            <button className={`toggle-btn ${calcType === 'tiered' ? 'active' : ''}`} onClick={() => setCalcType('tiered')}>
                                <Layers size={14} /> Tiered Matrix
                            </button>
                        </div>
                    </div>

                    {calcType === 'simple' ? (
                        <div className="value-inputs">
                            <div className="input-col">
                                <label>Match Percentage</label>
                                <div className="big-input-wrapper">
                                    <input type="number" defaultValue="100" className="big-input" onChange={(e) => updateRewards({ simpleConfig: { ...simpleConfig, percentage: e.target.value } })} />
                                    <span className="suffix">%</span>
                                </div>
                            </div>
                            <div className="arrow-col">
                                <ArrowRight size={24} className="text-muted" />
                            </div>
                            <div className="input-col">
                                <label>Max Amount Cap</label>
                                <div className="big-input-wrapper">
                                    <span className="prefix">KES</span>
                                    <input type="number" defaultValue="500" className="big-input" onChange={(e) => updateRewards({ simpleConfig: { ...simpleConfig, cap: e.target.value } })} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="tiered-matrix">
                            <div className="matrix-toolbar">
                                <span className="label">Structure Tiers By:</span>
                                <div className="pill-selector">
                                    <button className={`pill ${matrixDimension === 'week' ? 'active' : ''}`} onClick={() => toggleMatrixMode('week')}>Time Period</button>
                                    <button className={`pill ${matrixDimension === 'selections' ? 'active' : ''}`} onClick={() => toggleMatrixMode('selections')}>Selection Count</button>
                                </div>
                            </div>

                            <div className="matrix-header">
                                <div className="col">
                                    {matrixDimension === 'week' ? 'Time Period' : 'Selections Range'}
                                </div>
                                <div className="col">Segment / Band</div>
                                <div className="col">Reward Allowed</div>
                                <div className="col">Max Cap</div>
                                <div className="col-action"></div>
                            </div>
                            <div className="matrix-body">
                                {tiers.map((tier) => (
                                    <div key={tier.id} className="matrix-row">
                                        <div className="col">
                                            <div className="field-group">
                                                {matrixDimension === 'week' ? <Calendar size={12} className="field-icon" /> : <List size={12} className="field-icon" />}
                                                <input
                                                    type="text"
                                                    value={tier.dimensionValue}
                                                    onChange={(e) => updateTier(tier.id, 'dimensionValue', e.target.value)}
                                                    className="t-input"
                                                    placeholder={matrixDimension === 'week' ? 'e.g. Week 1' : 'e.g. 6-10 Selections'}
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="field-group">
                                                <Users size={12} className="field-icon" />
                                                <input
                                                    type="text"
                                                    value={tier.segment}
                                                    onChange={(e) => updateTier(tier.id, 'segment', e.target.value)}
                                                    className="t-input"
                                                    placeholder="All Segments"
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="field-group highlight">
                                                <input
                                                    type="number"
                                                    value={tier.percentage}
                                                    onChange={(e) => updateTier(tier.id, 'percentage', e.target.value)}
                                                    className="t-input bold"
                                                />
                                                <span className="suffix">%</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="field-group">
                                                <span className="prefix">KES</span>
                                                <input
                                                    type="text"
                                                    value={tier.cap}
                                                    onChange={(e) => updateTier(tier.id, 'cap', e.target.value)}
                                                    className="t-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-action">
                                            <button className="remove-btn" onClick={() => removeTier(tier.id)}><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="add-row-btn" onClick={addTier}>
                                <Plus size={14} /> Add Reward Tier
                            </button>

                            <div className="matrix-info">
                                <AlertCircle size={14} /> Rules are evaluated top-to-bottom. First match applies.
                            </div>
                        </div>
                    )}
                </div>

                {/* 3. Wagering */}
                {rewardType === 'bonus' && (
                    <div className="form-section mt-8">
                        <label className="section-label">Wagering Requirements</label>
                        <div className="wagering-control">
                            <span className="multiplier">x{wagering}</span>
                            <input type="range" min="0" max="100" defaultValue={wagering} onChange={(e) => updateRewards({ wagering: parseInt(e.target.value) })} className="range-slider" />
                        </div>
                        <p className="hint-text">Player must wager bonus amount <strong>{wagering} times</strong> before withdrawing.</p>
                    </div>
                )}

                {rewardType === 'cashback' && (
                    <div className="form-section mt-8">
                        <label className="section-label">Credit Timing</label>
                        <div className="radio-group">
                            <label className="radio-opt">
                                <input type="radio" name="timing" defaultChecked />
                                <span>Instant (After Event)</span>
                            </label>
                            <label className="radio-opt">
                                <input type="radio" name="timing" />
                                <span>End of Day (00:00 UTC)</span>
                            </label>
                            <label className="radio-opt">
                                <input type="radio" name="timing" />
                                <span>Weekly Settlement</span>
                            </label>
                        </div>
                    </div>
                )}

            </div>

            <style jsx>{`
                .step-container { max-width: 900px; margin: 0 auto; animation: slideIn 0.3s ease-out; }
                @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                .form-panel { padding: 40px; background: var(--color-bg-panel); border: 1px solid var(--color-border); border-radius: 12px; }
                .panel-title { font-size: 20px; margin-bottom: 32px; font-weight: 700; color: var(--color-text-primary); }
                .section-label { display: block; font-size: 14px; font-weight: 600; color: var(--color-text-secondary); margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px; }

                /* Validation Warning */
                .validation-warning { background: rgba(248, 113, 113, 0.1); border: 1px solid rgba(248, 113, 113, 0.3); border-radius: 8px; padding: 16px; margin-bottom: 24px; animation: keyframe 0.3s ease; }
                .vw-header { display: flex; align-items: center; gap: 8px; font-weight: 700; color: #f87171; margin-bottom: 8px; font-size: 14px; }
                .vw-list { margin: 0; padding-left: 24px; color: #fecaca; font-size: 13px; }
                .vw-list li { margin-bottom: 4px; }
                
                .text-warning { color: #f87171; }

                /* Reward Grid */
                .rewards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px; }
                .reward-card {
                    background: var(--color-bg-card);
                    border: 1px solid var(--color-border);
                    border-radius: 12px;
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .reward-card:hover { background: var(--color-bg-input-focus); }
                .reward-card.active {
                    background: rgba(6, 182, 212, 0.1);
                    border-color: var(--color-accent-cyan);
                }
                
                .r-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: var(--color-bg-input); color: var(--color-text-primary); }
                .r-icon.purple { background: rgba(168, 85, 247, 0.2); color: #a855f7; }
                .r-icon.green { background: rgba(105, 153, 81, 0.2); color: #22c55e; }
                .r-icon.yellow { background: rgba(242, 214, 65, 0.2); color: #facc15; }
                .r-icon.blue { background: rgba(6, 182, 212, 0.2); color: #06b6d4; }

                .r-content h3 { margin: 0 0 4px 0; font-size: 15px; color: var(--color-text-primary); }
                .r-content p { margin: 0; font-size: 12px; color: var(--color-text-muted); }

                /* Config Box */
                .config-box { background: var(--color-bg-input); border-radius: 12px; border: 1px solid var(--color-border); padding: 24px; }
                .config-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
                .sub-title { margin: 0; font-size: 14px; font-weight: 600; color: var(--color-text-primary); }

                .toggle-group { display: flex; background: var(--color-bg-card); padding: 4px; border-radius: 8px; }
                .toggle-btn { background: transparent; border: none; color: var(--color-text-muted); padding: 6px 12px; font-size: 12px; font-weight: 500; cursor: pointer; border-radius: 6px; display: flex; align-items: center; gap: 6px; transition: all 0.2s; }
                .toggle-btn.active { background: var(--color-text-primary); color: var(--color-bg-app); }

                /* Simple Mode */
                .value-inputs { display: flex; align-items: center; justify-content: space-between; }
                .input-col label { display: block; font-size: 12px; color: var(--color-text-muted); margin-bottom: 8px; }
                .arrow-col { display: flex; align-items: center; justify-content: center; padding-top: 24px; }
                
                .big-input-wrapper { display: flex; align-items: center; background: var(--color-bg-input); border: 1px solid var(--color-border); border-radius: 12px; padding: 0 16px; width: 220px; }
                .big-input { background: transparent; border: none; color: var(--color-text-primary); font-size: 32px; font-weight: 700; width: 100%; padding: 16px 0; outline: none; text-align: right; }
                .suffix { font-size: 24px; color: var(--color-text-muted); font-weight: 600; margin-left: 8px; }
                .prefix { font-size: 24px; color: var(--color-text-muted); font-weight: 600; margin-right: 8px; }

                /* Tiered Matrix */
                .tiered-matrix { display: flex; flex-direction: column; gap: 8px; }
                
                .matrix-toolbar { display: flex; justify-content: flex-end; align-items: center; gap: 12px; margin-bottom: 12px; font-size: 11px; color: var(--color-text-muted); }
                .pill-selector { background: var(--color-bg-app); border-radius: 20px; padding: 2px; display: flex; }
                .pill { background: transparent; border: none; padding: 4px 12px; border-radius: 18px; font-size: 11px; color: var(--color-text-muted); cursor: pointer; transition: all 0.2s; }
                .pill.active { background: var(--color-accent-cyan); color: #000; font-weight: 600; }

                .matrix-header { display: flex; padding: 0 12px; margin-bottom: 4px; }
                .col { flex: 1; font-size: 11px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; padding-right: 8px; }
                .col-action { width: 30px; }
                
                .matrix-row { display: flex; align-items: center; gap: 8px; background: var(--color-bg-card); border: 1px solid var(--color-border); padding: 8px 12px; border-radius: 8px; transition: all 0.2s; }
                .matrix-row:hover { background: var(--color-bg-input-focus); border-color: var(--color-border-hover); }
                
                .field-group { display: flex; align-items: center; gap: 8px; background: var(--color-bg-input); padding: 6px 10px; border-radius: 6px; width: 100%; border: 1px solid transparent; }
                .field-group:focus-within { border-color: var(--color-accent-cyan); background: rgba(6,182,212,0.05); }
                .field-group.highlight { background: rgba(6,182,212,0.1); border-color: rgba(6,182,212,0.2); }
                
                .field-icon { opacity: 0.5; color: var(--color-text-primary); }
                .t-input { background: transparent; border: none; color: var(--color-text-primary); font-size: 13px; width: 100%; outline: none; }
                .t-input.bold { font-weight: 700; color: var(--color-accent-cyan); }
                .t-select { background: transparent; border: none; color: var(--color-text-primary); font-size: 13px; width: 100%; outline: none; cursor: pointer; }
                .t-select option { background: var(--color-bg-panel); color : var(--color-text-primary) }
                
                .remove-btn { background: transparent; border: none; color: var(--color-text-muted); cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; }
                .remove-btn:hover { color: #f87171; }
                
                .add-row-btn { background: var(--color-bg-card); border: 1px dashed var(--color-border); padding: 10px; border-radius: 8px; color: var(--color-text-muted); font-size: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; transition: all 0.2s; }
                .add-row-btn:hover { color: var(--color-text-primary); border-color: var(--color-text-muted); background: var(--color-bg-input); }
                
                .matrix-info { display: flex; align-items: center; gap: 6px; margin-top: 12px; font-size: 11px; color: var(--color-text-muted); font-style: italic; }

                /* Radio options */
                .radio-group { display: flex; gap: 24px; }
                .radio-opt { display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--color-text-secondary); font-size: 13px; }
                .radio-opt input { accent-color: var(--color-accent-cyan); }

                .mt-8 { margin-top: 32px; }
            `}</style>
        </div>
    );
}
