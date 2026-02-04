'use client';
import { Calendar, Clock, DollarSign, Users, Repeat, AlertCircle } from 'lucide-react';
import { useWizardContext } from '@/context/WizardContext';

export default function StepSchedule() {
    const { state, updateSchedule } = useWizardContext();
    const { startDate, endDate, isRecurring, recurrence, limits } = state.schedule;

    const toggleRecurring = () => updateSchedule({ isRecurring: !isRecurring });

    return (
        <div className="step-container">
            <div className="glass-panel form-panel">
                <h2 className="panel-title">Schedule & Limits</h2>

                {/* 1. Duration */}
                <div className="form-section">
                    <label className="section-label"><Calendar size={16} /> Campaign Duration</label>
                    <div className="date-grid">
                        <div className="input-group">
                            <label>Start Date & Time</label>
                            <input
                                type="datetime-local"
                                className="form-input"
                                value={startDate}
                                onChange={(e) => updateSchedule({ startDate: e.target.value })}
                            />
                        </div>
                        <div className="arrow-col">→</div>
                        <div className="input-group">
                            <label>End Date & Time</label>
                            <input
                                type="datetime-local"
                                className="form-input"
                                value={endDate}
                                onChange={(e) => updateSchedule({ endDate: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="recurring-toggle" onClick={toggleRecurring}>
                        <div className={`checkbox ${isRecurring ? 'checked' : ''}`}>
                            {isRecurring && <Repeat size={14} />}
                        </div>
                        <span>Recurring Promotion (e.g. Every Weekend)</span>
                    </div>

                    {isRecurring && (
                        <div className="recurrence-options">
                            <select
                                className="form-select"
                                value={recurrence.frequency}
                                onChange={(e) => updateSchedule({ recurrence: { ...recurrence, frequency: e.target.value } })}
                            >
                                <option>Daily</option>
                                <option>Weekly</option>
                                <option>Monthly</option>
                            </select>
                            <div className="days-selector">
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                                    <div key={i} className={`day-circle ${i >= 4 ? 'active' : ''}`}>{d}</div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="section-divider" />

                {/* 2. Usage Limits */}
                <div className="form-section">
                    <label className="section-label"><AlertCircle size={16} /> Usage Controls</label>
                    <div className="limits-grid">

                        {/* Global Limit */}
                        <div className="limit-card">
                            <div className="limit-header">
                                <Users size={18} className="text-cyan" />
                                <span>Total Claims Limit</span>
                            </div>
                            <div className="limit-input-wrapper">
                                <input
                                    type="number"
                                    placeholder="Unlimited"
                                    className="limit-input"
                                    value={limits.totalClaims}
                                    onChange={(e) => updateSchedule({ limits: { ...limits, totalClaims: e.target.value } })}
                                />
                                <span className="unit">Users</span>
                            </div>
                            <p className="limit-hint">Stop campaign after X claims.</p>
                        </div>

                        {/* Per User Limit */}
                        <div className="limit-card">
                            <div className="limit-header">
                                <Users size={18} className="text-purple" />
                                <span>Per Player Limit</span>
                            </div>
                            <div className="limit-input-wrapper">
                                <input
                                    type="number"
                                    className="limit-input"
                                    value={limits.perPlayer}
                                    onChange={(e) => updateSchedule({ limits: { ...limits, perPlayer: e.target.value } })}
                                />
                                <span className="unit">Claims</span>
                            </div>
                            <p className="limit-hint">Max times a user can claim.</p>
                        </div>

                        {/* Budget Limit */}
                        <div className="limit-card">
                            <div className="limit-header">
                                <DollarSign size={18} className="text-yellow" />
                                <span>Total Budget Cap</span>
                            </div>
                            <div className="limit-input-wrapper">
                                <span className="prefix">€</span>
                                <input
                                    type="number"
                                    placeholder="No Limit"
                                    className="limit-input pl-6"
                                    value={limits.budget}
                                    onChange={(e) => updateSchedule({ limits: { ...limits, budget: e.target.value } })}
                                />
                            </div>
                            <p className="limit-hint">Stop when budget is exhausted.</p>
                        </div>

                    </div>
                </div>

                {/* Summary Box */}
                <div className="summary-box">
                    <div className="summary-icon"><Clock size={20} /></div>
                    <div className="summary-text">
                        <p className="highlight">This promotion will run for <strong>30 Days</strong>.</p>
                        <p className="sub">From {startDate || '...'} to {endDate || '...'}</p>
                    </div>
                </div>

            </div>

            <style jsx>{`
                .step-container { max-width: 800px; margin: 0 auto; animation: slideIn 0.3s ease-out; }
                @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                .form-panel { padding: 40px; }
                .panel-title { font-size: 20px; margin-bottom: 32px; font-weight: 700; color: var(--color-text-primary); }
                
                .form-section { margin-bottom: 32px; }
                .section-label { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: var(--color-text-secondary); margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.5px; }

                /* Date Grid */
                .date-grid { display: flex; align-items: flex-end; gap: 16px; margin-bottom: 24px; }
                .input-group { flex: 1; }
                .input-group label { display: block; margin-bottom: 8px; font-size: 13px; color: var(--color-text-muted); }
                .form-input {
                    width: 100%;
                    background: var(--color-bg-input);
                    border: 1px solid var(--color-border);
                    color: var(--color-text-primary);
                    padding: 12px;
                    border-radius: 8px;
                    font-family: inherit;
                    color-scheme: light dark;
                }
                .form-input:focus { border-color: var(--color-accent-cyan); outline: none; background: var(--color-bg-input-focus); }
                .arrow-col { padding-bottom: 12px; color: var(--color-text-muted); font-size: 20px; }

                /* Recurrence */
                .recurring-toggle { display: flex; align-items: center; gap: 12px; cursor: pointer; user-select: none; margin-bottom: 16px; }
                .checkbox {
                    width: 20px; height: 20px;
                    border: 2px solid var(--color-border);
                    border-radius: 4px;
                    display: flex; align-items: center; justify-content: center;
                    transition: all 0.2s;
                }
                .checkbox.checked { background: var(--color-accent-cyan); border-color: var(--color-accent-cyan); color: #000; }
                .recurring-toggle span { font-size: 14px; color: var(--color-text-primary); }

                .recurrence-options { 
                    margin-left: 32px; 
                    background: var(--color-bg-card); 
                    padding: 16px; 
                    border-radius: 8px; 
                    display: flex; 
                    align-items: center; 
                    gap: 16px;
                    animation: fadeIn 0.3s ease;
                }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                
                .form-select { background: var(--color-bg-input); border: 1px solid var(--color-border); color: var(--color-text-primary); padding: 8px; border-radius: 6px; }
                .days-selector { display: flex; gap: 8px; }
                .day-circle { width: 28px; height: 28px; border-radius: 50%; background: var(--color-border); display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--color-text-muted); cursor: pointer; }
                .day-circle.active { background: var(--color-accent-cyan); color: #000; font-weight: 700; }

                .section-divider { height: 1px; background: var(--color-border); margin: 32px 0; }

                /* Limits Grid */
                .limits-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
                .limit-card { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 12px; padding: 16px; }
                .limit-header { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: var(--color-text-primary); margin-bottom: 12px; }
                .text-cyan { color: var(--color-accent-cyan); }
                .text-purple { color: var(--color-accent-purple); }
                .text-yellow { color: var(--color-betika-yellow); }

                .limit-input-wrapper { display: flex; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 8px; margin-bottom: 8px; position: relative; }
                .limit-input { background: transparent; border: none; font-size: 18px; font-weight: 700; color: var(--color-text-primary); width: 100%; outline: none; }
                .unit { font-size: 12px; color: var(--color-text-muted); text-transform: uppercase; }
                .prefix { margin-right: 4px; color: var(--color-text-muted); }
                .limit-hint { font-size: 11px; color: var(--color-text-muted); margin: 0; }

                /* Summary */
                .summary-box { background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 12px; padding: 16px; display: flex; gap: 16px; align-items: center; margin-top: 16px; }
                .summary-icon { color: var(--color-accent-cyan); }
                .summary-text p { margin: 0; }
                .highlight { font-size: 14px; color: var(--color-text-primary); margin-bottom: 4px; }
                .highlight strong { color: var(--color-accent-cyan); }
                .sub { font-size: 12px; color: var(--color-text-secondary); }
            `}</style>
        </div>
    );
}
