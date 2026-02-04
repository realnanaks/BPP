'use client';
import { CheckCircle2, Gift } from 'lucide-react';
import { useWizardContext } from '@/context/WizardContext';

export default function StepReview() {
    const { state } = useWizardContext();
    const { basics, eligibility, rewards, schedule } = state;

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
                    <div className="status-meta">Scan ID: #{Date.now().toString().slice(-5)}</div>
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
                                <span className="value">{basics.name || 'Untitled Promotion'}</span>
                            </div>
                            <div className="data-row">
                                <span className="label">Type</span>
                                <span className="value text-yellow" style={{ textTransform: 'capitalize' }}>{basics.type.replace('_', ' ')}</span>
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
                                <div className="value">
                                    {eligibility.markets.map(m => m.toUpperCase()).join(', ')}
                                </div>
                            </div>
                            <div className="data-row">
                                <span className="label">Platforms</span>
                                <span className="value" style={{ textTransform: 'capitalize' }}>
                                    {eligibility.channels.join(', ')}
                                </span>
                            </div>
                            <div className="data-row">
                                <span className="label">Audience</span>
                                <span className="value" style={{ textTransform: 'capitalize' }}>{eligibility.segment}</span>
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
                            {eligibility.triggers.length > 0 ? (
                                <div className="rule-preview">
                                    {eligibility.triggers.map((t, i) => (
                                        <div key={t.id}>
                                            {i > 0 && <div className="connector">OR</div>}
                                            <div>EVENT <span className="text-cyan">{t.eventId}</span></div>
                                            {t.rules.map(r => (
                                                <div key={r.id} style={{ marginLeft: 8 }}>
                                                    AND <span className="text-purple">{r.param} {r.operator} {r.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="rule-preview">No rules configured.</div>
                            )}
                        </div>
                    </div>

                    {/* 4. Rewards */}
                    <div className="glass-panel summary-card">
                        <div className="card-header">
                            <span className="step-num">04</span>
                            <h4>Incentives</h4>
                        </div>
                        <div className="card-body">
                            <div className="reward-highlight">
                                <Gift size={20} className="text-yellow" />
                                <span style={{ textTransform: 'capitalize' }}>{rewards.type}</span>
                            </div>
                            {rewards.calcType === 'tiered' && rewards.tiers.length > 0 && (
                                <div className="mt-4">
                                    {rewards.tiers.slice(0, 3).map(t => (
                                        <div key={t.id} className="data-row">
                                            <span className="label">{t.dimensionValue}</span>
                                            <span className="value">{t.percentage}%</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {rewards.calcType === 'simple' && (
                                <div className="data-row mt-4">
                                    <span className="label">Match</span>
                                    <span className="value">{rewards.simpleConfig.percentage}%</span>
                                </div>
                            )}
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
                                <span className="value">{schedule.startDate ? new Date(schedule.startDate).toLocaleDateString() : 'TBD'}</span>
                            </div>
                            <div className="data-row">
                                <span className="label">Duration</span>
                                <span className="value">{schedule.isRecurring ? `Recurring (${schedule.recurrence.frequency})` : 'Fixed Period'}</span>
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
                .status-content h3 { margin: 0 0 4px 0; font-size: 16px; color: var(--color-text-primary); }
                .status-content p { margin: 0; font-size: 13px; color: var(--color-text-secondary); }
                .status-meta { margin-left: auto; font-family: monospace; font-size: 12px; color: var(--color-text-muted); background: var(--color-bg-card); padding: 4px 8px; border-radius: 4px; }

                .summary-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px;
                    margin-bottom: 32px;
                }

                .summary-card { padding: 20px; border-radius: 12px; height: 100%; display: flex; flex-direction: column; }
                .card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; border-bottom: 1px solid var(--color-border); padding-bottom: 12px; }
                .step-num { font-size: 10px; font-weight: 700; color: var(--color-bg-app); background: var(--color-text-muted); padding: 2px 6px; border-radius: 4px; }
                .card-header h4 { margin: 0; font-size: 14px; font-weight: 600; color: var(--color-text-primary); }

                .card-body { font-size: 13px; display: flex; flex-direction: column; gap: 12px; }
                .data-row { display: flex; justify-content: space-between; align-items: center; }
                .label { color: var(--color-text-muted); }
                .value { color: var(--color-text-primary); font-weight: 500; text-align: right; }
                .text-yellow { color: var(--color-betika-yellow); }
                .text-xs { font-size: 11px; max-width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                
                .tags { display: flex; gap: 4px; }
                .tag { font-size: 10px; background: var(--color-bg-card); padding: 2px 6px; border-radius: 4px; color: var(--color-text-secondary); }

                /* Mechanics */
                .rule-preview { background: var(--color-bg-input); padding: 12px; border-radius: 8px; font-family: monospace; font-size: 12px; color: var(--color-text-secondary); overflow-wrap: break-word; }
                .connector { font-size: 10px; color: var(--color-betika-yellow); font-weight: 700; margin: 4px 0; text-align: center; }
                .text-purple { color: var(--color-accent-purple); }
                .text-cyan { color: var(--color-accent-cyan); }

                /* Reward */
                /* Reward */
                .reward-highlight { display: flex; gap: 12px; align-items: center; font-size: 14px; font-weight: 700; color: var(--color-text-primary); background: var(--color-bg-card); padding: 12px; border-radius: 8px; justify-content: center; }
                .mt-4 { margin-top: 4px; }

                .confirmation-area { display: flex; justify-content: center; margin-top: 16px; }
                .checkbox-container { display: flex; gap: 12px; align-items: center; cursor: pointer; }
                .check-text { font-size: 14px; color: var(--color-text-secondary); }
            `}</style>
        </div>
    );
}
