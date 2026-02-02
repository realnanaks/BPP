'use client';
import { Gift, Coins, CreditCard, Ticket, Percent, DollarSign, ArrowRight, Plus, Trash2, Layers, Calendar, Users, AlertCircle, List } from 'lucide-react';
import { useState } from 'react';

interface TierRule {
    id: number;
    dimensionKey: string; // 'week' | 'selections' | 'stake'
    dimensionValue: string;
    segment: string;
    percentage: string;
    cap: string;
}

export default function StepRewards() {
    const [rewardType, setRewardType] = useState('cashback');
    const [calcType, setCalcType] = useState('tiered');
    const [matrixDimension, setMatrixDimension] = useState('week'); // 'week' (Time) or 'selections' (Count)

    // Mock initial state for Cashia (Time-based)
    const [tiers, setTiers] = useState<TierRule[]>([
        { id: 1, dimensionKey: 'week', dimensionValue: 'Week 1', segment: 'Low Value (50-200)', percentage: '30', cap: '60' },
        { id: 2, dimensionKey: 'week', dimensionValue: 'Week 1', segment: 'Lower Mid', percentage: '30', cap: '100' },
        { id: 3, dimensionKey: 'week', dimensionValue: 'Week 1', segment: 'Higher Mid', percentage: '30', cap: '200' },
        { id: 4, dimensionKey: 'week', dimensionValue: 'Week 1', segment: 'High Value', percentage: '30', cap: '400' },
        { id: 5, dimensionKey: 'week', dimensionValue: 'Week 2', segment: 'All Segments', percentage: '20', cap: 'Varies' },
    ]);

    const addTier = () => {
        setTiers([...tiers, {
            id: Date.now(),
            dimensionKey: matrixDimension,
            dimensionValue: matrixDimension === 'week' ? 'Week X' : '6 Selections',
            segment: 'Any',
            percentage: '0',
            cap: '0'
        }]);
    };

    const removeTier = (id: number) => {
        setTiers(tiers.filter(t => t.id !== id));
    };

    const updateTier = (id: number, field: keyof TierRule, value: string) => {
        setTiers(tiers.map(t => t.id === id ? { ...t, [field]: value } : t));
    };

    // Helper to switch matrix type
    const toggleMatrixMode = (mode: string) => {
        setMatrixDimension(mode);
        // Reset tiers for demo purposes when switching
        if (mode === 'selections') {
            setTiers([
                { id: 1, dimensionKey: 'selections', dimensionValue: '6-7 Selections', segment: 'Any', percentage: '100', cap: 'Unlimited' },
                { id: 2, dimensionKey: 'selections', dimensionValue: '8-9 Selections', segment: 'Any', percentage: '150', cap: 'Unlimited' }
            ]);
        } else {
            setTiers([
                { id: 1, dimensionKey: 'week', dimensionValue: 'Week 1', segment: 'Low Value', percentage: '30', cap: '60' }
            ]);
        }
    };

    return (
        <div className="step-container">
            <div className="glass-panel form-panel">
                <h2 className="panel-title">Reward Configuration</h2>

                {/* 1. Reward Type Selection */}
                <div className="form-section">
                    <label className="section-label">Reward Type</label>
                    <div className="rewards-grid">
                        <div className={`reward-card ${rewardType === 'cashback' ? 'active' : ''}`} onClick={() => setRewardType('cashback')}>
                            <div className="r-icon green"><DollarSign size={24} /></div>
                            <div className="r-content">
                                <h3>Cashback</h3>
                                <p>Percentage back on losses/deposits.</p>
                            </div>
                        </div>
                        <div className={`reward-card ${rewardType === 'bonus' ? 'active' : ''}`} onClick={() => setRewardType('bonus')}>
                            <div className="r-icon purple"><Gift size={24} /></div>
                            <div className="r-content">
                                <h3>Bonus Wallet</h3>
                                <p>Standard bonus funds with wagering.</p>
                            </div>
                        </div>
                        <div className={`reward-card ${rewardType === 'spins' ? 'active' : ''}`} onClick={() => setRewardType('spins')}>
                            <div className="r-icon yellow"><Ticket size={24} /></div>
                            <div className="r-content">
                                <h3>Free Spins</h3>
                                <p>Spins on specific slot games.</p>
                            </div>
                        </div>
                        <div className={`reward-card ${rewardType === 'physical' ? 'active' : ''}`} onClick={() => setRewardType('physical')}>
                            <div className="r-icon blue"><Gift size={24} /></div>
                            <div className="r-content">
                                <h3>Physical Item</h3>
                                <p>Merch, electronics, or tickets.</p>
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
                                    <input type="number" defaultValue="100" className="big-input" />
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
                                    <input type="number" defaultValue="500" className="big-input" />
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
                            <span className="multiplier">x35</span>
                            <input type="range" min="0" max="100" defaultValue="35" className="range-slider" />
                        </div>
                        <p className="hint-text">Player must wager bonus amount <strong>35 times</strong> before withdrawing.</p>
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

                .form-panel { padding: 40px; background: #0f111a; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; }
                .panel-title { font-size: 20px; margin-bottom: 32px; font-weight: 700; color: #fff; }
                .section-label { display: block; font-size: 14px; font-weight: 600; color: #888; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px; }

                /* Reward Grid */
                .rewards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
                .reward-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .reward-card:hover { background: rgba(255,255,255,0.06); }
                .reward-card.active {
                    background: rgba(6, 182, 212, 0.1);
                    border-color: #06b6d4;
                }
                
                .r-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.1); color: #fff; }
                .r-icon.purple { background: rgba(168, 85, 247, 0.2); color: #a855f7; }
                .r-icon.green { background: rgba(105, 153, 81, 0.2); color: #22c55e; }
                .r-icon.yellow { background: rgba(242, 214, 65, 0.2); color: #facc15; }
                .r-icon.blue { background: rgba(6, 182, 212, 0.2); color: #06b6d4; }

                .r-content h3 { margin: 0 0 4px 0; font-size: 15px; color: #fff; }
                .r-content p { margin: 0; font-size: 12px; color: #666; }

                /* Config Box */
                .config-box { background: rgba(0,0,0,0.3); border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); padding: 24px; }
                .config-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
                .sub-title { margin: 0; font-size: 14px; font-weight: 600; color: #fff; }

                .toggle-group { display: flex; background: rgba(255,255,255,0.05); padding: 4px; border-radius: 8px; }
                .toggle-btn { background: transparent; border: none; color: #888; padding: 6px 12px; font-size: 12px; font-weight: 500; cursor: pointer; border-radius: 6px; display: flex; align-items: center; gap: 6px; transition: all 0.2s; }
                .toggle-btn.active { background: #333; color: #fff; }

                /* Simple Mode */
                .value-inputs { display: flex; align-items: center; justify-content: space-between; }
                .input-col label { display: block; font-size: 12px; color: #666; margin-bottom: 8px; }
                .arrow-col { display: flex; align-items: center; justify-content: center; padding-top: 24px; }
                
                .big-input-wrapper { display: flex; align-items: center; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 0 16px; width: 220px; }
                .big-input { background: transparent; border: none; color: #fff; font-size: 32px; font-weight: 700; width: 100%; padding: 16px 0; outline: none; text-align: right; }
                .suffix { font-size: 24px; color: #666; font-weight: 600; margin-left: 8px; }
                .prefix { font-size: 24px; color: #666; font-weight: 600; margin-right: 8px; }

                /* Tiered Matrix */
                .tiered-matrix { display: flex; flex-direction: column; gap: 8px; }
                
                .matrix-toolbar { display: flex; justify-content: flex-end; align-items: center; gap: 12px; margin-bottom: 12px; font-size: 11px; color: #888; }
                .pill-selector { background: #222; border-radius: 20px; padding: 2px; display: flex; }
                .pill { background: transparent; border: none; padding: 4px 12px; border-radius: 18px; font-size: 11px; color: #666; cursor: pointer; transition: all 0.2s; }
                .pill.active { background: #06b6d4; color: #000; font-weight: 600; }

                .matrix-header { display: flex; padding: 0 12px; margin-bottom: 4px; }
                .col { flex: 1; font-size: 11px; font-weight: 700; color: #666; text-transform: uppercase; padding-right: 8px; }
                .col-action { width: 30px; }
                
                .matrix-row { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 8px 12px; border-radius: 8px; transition: all 0.2s; }
                .matrix-row:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.1); }
                
                .field-group { display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.2); padding: 6px 10px; border-radius: 6px; width: 100%; border: 1px solid transparent; }
                .field-group:focus-within { border-color: #06b6d4; background: rgba(6,182,212,0.05); }
                .field-group.highlight { background: rgba(6,182,212,0.1); border-color: rgba(6,182,212,0.2); }
                
                .field-icon { opacity: 0.5; color: #fff; }
                .t-input { background: transparent; border: none; color: #fff; font-size: 13px; width: 100%; outline: none; }
                .t-input.bold { font-weight: 700; color: #06b6d4; }
                .t-select { background: transparent; border: none; color: #fff; font-size: 13px; width: 100%; outline: none; cursor: pointer; }
                .t-select option { background: #000; }
                
                .remove-btn { background: transparent; border: none; color: #666; cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; }
                .remove-btn:hover { color: #f87171; }
                
                .add-row-btn { background: rgba(255,255,255,0.03); border: 1px dashed rgba(255,255,255,0.15); padding: 10px; border-radius: 8px; color: #888; font-size: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; transition: all 0.2s; }
                .add-row-btn:hover { color: #fff; border-color: #666; background: rgba(255,255,255,0.06); }
                
                .matrix-info { display: flex; align-items: center; gap: 6px; margin-top: 12px; font-size: 11px; color: #666; font-style: italic; }

                /* Radio options */
                .radio-group { display: flex; gap: 24px; }
                .radio-opt { display: flex; align-items: center; gap: 8px; cursor: pointer; color: #ccc; font-size: 13px; }
                .radio-opt input { accent-color: #06b6d4; }

                .mt-8 { margin-top: 32px; }
            `}</style>
        </div>
    );
}
