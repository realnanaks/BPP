'use client';
import { CheckCircle2, Gift } from 'lucide-react';

export default function StepReview() {
    return (
        <div className="step-container">
            <div className="review-layout">

                {/* Pre-flight Check Banner */}
                <div className="status-banner success">
                    <div className="status-icon"><CheckCircle2 size={24} /></div>
                    <div className="status-content">
                        <h3>Compliance Check Passed</h3>
                        <p>This promotion meets all regulatory guidelines for selected markets.</p>
                    </div>
                    <div className="status-meta">Scan ID: #90210</div>
                </div>

                <div className="summary-grid">

                    {/* 1. Basics */}
                    <div className="glass-panel summary-card">
                        <div className="card-header">
                            <span className="step-num">01</span>
                            <h4>General Info</h4>
                        </div>
                        <div className="card-body">
                            <div className="data-row">
                                <span className="label">Name</span>
                                <span className="value">Ethiopia Acca Insurance</span>
                            </div>
                            <div className="data-row">
                                <span className="label">Type</span>
                                <span className="value text-yellow">Cashback (Insurance)</span>
                            </div>
                            <div className="data-row">
                                <span className="label">Tags</span>
                                <div className="tags"><span className="tag">Retention</span><span className="tag">Sports</span></div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Scope */}
                    <div className="glass-panel summary-card">
                        <div className="card-header">
                            <span className="step-num">02</span>
                            <h4>Scope & Target</h4>
                        </div>
                        <div className="card-body">
                            <div className="data-row">
                                <span className="label">Markets</span>
                                <span className="value">🇪🇹 Ethiopia</span>
                            </div>
                            <div className="data-row">
                                <span className="label">Platforms</span>
                                <span className="value">Mobile, Lite, App</span>
                            </div>
                            <div className="data-row">
                                <span className="label">Audience</span>
                                <span className="value">All Players</span>
                            </div>
                        </div>
                    </div>

                    {/* 3. Mechanics */}
                    <div className="glass-panel summary-card">
                        <div className="card-header">
                            <span className="step-num">03</span>
                            <h4>Qualification Rules</h4>
                        </div>
                        <div className="card-body">
                            <div className="rule-preview">
                                <div>IF <span className="text-purple">Selections ≥ 6</span></div>
                                <div className="connector">AND</div>
                                <div>IF <span className="text-cyan">Losing Selections = 1</span></div>
                                <div className="connector">AND</div>
                                <div>IF <span className="text-purple">Stake ≥ 5 ETB</span></div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Rewards */}
                    <div className="glass-panel summary-card">
                        <div className="card-header">
                            <span className="step-num">04</span>
                            <h4>Incentives (Tiered)</h4>
                        </div>
                        <div className="card-body">
                            <div className="reward-highlight">
                                <Gift size={20} className="text-yellow" />
                                <span>Tiered Cashback</span>
                            </div>
                            <div className="data-row mt-4">
                                <span className="label">6-7 Selections</span>
                                <span className="value">100% Stake Back</span>
                            </div>
                            <div className="data-row">
                                <span className="label">8-9 Selections</span>
                                <span className="value">200% Stake Back</span>
                            </div>
                            <div className="data-row">
                                <span className="label">Max Cap</span>
                                <span className="value">100,000 ETB</span>
                            </div>
                        </div>
                    </div>

                    {/* 5. Schedule */}
                    <div className="glass-panel summary-card">
                        <div className="card-header">
                            <span className="step-num">05</span>
                            <h4>Schedule</h4>
                        </div>
                        <div className="card-body">
                            <div className="data-row">
                                <span className="label">Start</span>
                                <span className="value">Launch Date (TBD)</span>
                            </div>
                            <div className="data-row">
                                <span className="label">Duration</span>
                                <span className="value">Indefinite</span>
                            </div>
                        </div>
                    </div>

                    {/* 6. Communication */}
                    <div className="glass-panel summary-card">
                        <div className="card-header">
                            <span className="step-num">06</span>
                            <h4>Communication</h4>
                        </div>
                        <div className="card-body">
                            <div className="data-row">
                                <span className="label">Channels</span>
                                <span className="value">SMS, Push</span>
                            </div>
                            <div className="data-row">
                                <span className="label">SMS Template</span>
                                <span className="value text-xs">"Sorry you lost by one! We've refunded..."</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="confirmation-area">
                    <label className="checkbox-container">
                        <input type="checkbox" defaultChecked />
                        <span className="check-text">I confirm that all configuration is correct and approved by the Finance/Compliance team.</span>
                    </label>
                </div>
            </div>

            <style jsx>{`
                .step-container { max-width: 1000px; margin: 0 auto; animation: slideIn 0.3s ease-out; padding-bottom: 40px; }
                @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                .status-banner {
                    display: flex; align-items: center; gap: 16px;
                    background: rgba(105, 153, 81, 0.1);
                    border: 1px solid rgba(105, 153, 81, 0.2);
                    padding: 16px 24px;
                    border-radius: 12px;
                    margin-bottom: 32px;
                }
                .status-icon { color: var(--color-betika-green); }
                .status-content h3 { margin: 0 0 4px 0; font-size: 16px; color: #fff; }
                .status-content p { margin: 0; font-size: 13px; color: var(--color-text-secondary); }
                .status-meta { margin-left: auto; font-family: monospace; font-size: 12px; color: var(--color-text-muted); background: rgba(0,0,0,0.2); padding: 4px 8px; border-radius: 4px; }

                .summary-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px;
                    margin-bottom: 32px;
                }

                .summary-card { padding: 20px; border-radius: 12px; height: 100%; display: flex; flex-direction: column; }
                .card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 12px; }
                .step-num { font-size: 10px; font-weight: 700; color: #000; background: var(--color-text-muted); padding: 2px 6px; border-radius: 4px; }
                .card-header h4 { margin: 0; font-size: 14px; font-weight: 600; color: #fff; }

                .card-body { font-size: 13px; display: flex; flex-direction: column; gap: 12px; }
                .data-row { display: flex; justify-content: space-between; align-items: center; }
                .label { color: var(--color-text-muted); }
                .value { color: #fff; font-weight: 500; text-align: right; }
                .text-yellow { color: var(--color-betika-yellow); }
                .text-xs { font-size: 11px; max-width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                
                .tags { display: flex; gap: 4px; }
                .tag { font-size: 10px; background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; color: var(--color-text-secondary); }

                /* Mechanics */
                .rule-preview { background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; font-family: monospace; font-size: 12px; color: #ccc; }
                .connector { font-size: 10px; color: var(--color-betika-yellow); font-weight: 700; margin: 4px 0; text-align: center; }
                .text-purple { color: var(--color-accent-purple); }
                .text-cyan { color: var(--color-accent-cyan); }

                /* Reward */
                .reward-highlight { display: flex; gap: 12px; align-items: center; font-size: 14px; font-weight: 700; color: #fff; background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; justify-content: center; }
                .mt-4 { margin-top: 4px; }

                .confirmation-area { display: flex; justify-content: center; margin-top: 16px; }
                .checkbox-container { display: flex; gap: 12px; align-items: center; cursor: pointer; }
                .check-text { font-size: 14px; color: var(--color-text-secondary); }
            `}</style>
        </div>
    );
}
