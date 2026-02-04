'use client';
import { Layers, AlertTriangle, Copy } from 'lucide-react';

export default function StepTriggers() {
    return (
        <div className="main-layout">
            {/* LEFT COLUMN: Main Form */}
            <div className="form-column">
                <div className="glass-panel content-panel">
                    <div className="panel-header">
                        <h2 className="panel-title"><Layers size={18} className="text-accent-purple" /> Promotion Triggers & Conditions</h2>
                        <button className="btn-text">Reset Rules</button>
                    </div>

                    <div className="panel-body">

                        {/* Advanced Rule Builder UI Placeholder */}
                        <div className="rule-builder-canvas">
                            <div className="rule-node start-node">START</div>
                            <div className="connector-line vertical" />

                            <div className="rule-group">
                                <div className="rule-card">
                                    <div className="rule-header">
                                        <span className="rule-type">IF</span>
                                        <span className="rule-name">Deposit Amount</span>
                                    </div>
                                    <div className="rule-content">
                                        <span className="operator">&gt;</span>
                                        <span className="value">€20.00</span>
                                    </div>
                                </div>

                                <div className="connector-badge">AND</div>

                                <div className="rule-card">
                                    <div className="rule-header">
                                        <span className="rule-type">IF</span>
                                        <span className="rule-name">Game Category</span>
                                    </div>
                                    <div className="rule-content">
                                        <span className="operator">=</span>
                                        <span className="value text-accent-cyan">Slots</span>
                                    </div>
                                </div>
                            </div>

                            <div className="connector-line vertical" />
                            <button className="add-rule-btn">+ Add Condition</button>
                        </div>

                        <div className="section-divider" />

                        <div className="form-group">
                            <label className="form-label">Target Segments</label>
                            <div className="chip-input-container">
                                <div className="chip purple">VIP Players x</div>
                                <div className="chip cyan">New Registrations x</div>
                                <div className="chip">Weekend Warriors x</div>
                                <input type="text" placeholder="Search segments..." className="ghost-input" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: Preview & JSON */}
            <div className="preview-column">

                {/* Bonus Pool */}
                <div className="glass-panel sidebar-panel">
                    <h3 className="sidebar-title">Bonus Pool Progress</h3>
                    <div className="progress-wrapper">
                        <div className="progress-bar-bg">
                            <div className="progress-bar-fill" style={{ width: '75%' }} />
                        </div>
                        <div className="progress-labels">
                            <span>75% Claimed</span>
                            <span className="text-muted">€750,000 / €1,000,000</span>
                        </div>
                    </div>
                    <div className="warning-box">
                        <AlertTriangle size={14} className="text-betika-gold" />
                        <span>Approaching pool limit.</span>
                    </div>
                </div>

                {/* Wagering Table */}
                <div className="glass-panel sidebar-panel">
                    <h3 className="sidebar-title">Wagering Contribution</h3>
                    <table className="preview-table">
                        <thead>
                            <tr>
                                <th>Game</th>
                                <th className="text-right">Contrib.</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Slots</td><td className="text-right">100%</td></tr>
                            <tr><td>Live Casino</td><td className="text-right">20%</td></tr>
                            <tr><td>Table Games</td><td className="text-right">10%</td></tr>
                        </tbody>
                    </table>
                </div>

                {/* JSON Export */}
                <div className="glass-panel sidebar-panel json-panel">
                    <div className="sidebar-header-row">
                        <h3 className="sidebar-title">Config JSON</h3>
                        <button className="btn-icon-xs"><Copy size={12} /></button>
                    </div>
                    <pre className="json-code">
                        {`{
"promotion": {
"type": "deposit_match",
"segments": ["vip", "new"],
"rules": [
  { "field": "amt", "op": "gt", "val": 20 },
  { "field": "cat", "op": "eq", "val": "slots" }
]
}
}`}
                    </pre>
                </div>

            </div>
            <style jsx>{`
                .main-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; animation: slideIn 0.3s ease-out; }
                @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                
                .content-panel { min-height: 600px; padding: 0; overflow: hidden; background: var(--color-bg-panel); border: 1px solid var(--color-border); border-radius: 12px; }
                .panel-header { padding: 24px; border-bottom: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center; }
                .panel-title { margin: 0; font-size: 16px; font-weight: 600; display: flex; align-items: center; gap: 10px; color: var(--color-text-primary); }
                .panel-body { padding: 32px; }

                /* Rule Builder Canvas */
                .rule-builder-canvas { display: flex; flex-direction: column; align-items: center; padding: 40px; background: var(--color-bg-input); border-radius: 12px; border: 1px dashed var(--color-border); }
                .rule-node { background: var(--color-text-primary); color: var(--color-bg-app); font-weight: 700; padding: 8px 16px; border-radius: 8px; font-size: 12px; }
                .connector-line { width: 2px; height: 30px; background: var(--color-border); }
                .rule-group { display: flex; flex-direction: column; gap: 16px; align-items: center; }
                .rule-card { background: var(--color-bg-card); border: 1px solid var(--color-accent-purple); border-radius: 8px; width: 300px; overflow: hidden; box-shadow: 0 0 15px rgba(168, 85, 247, 0.1); }
                .rule-header { background: rgba(168, 85, 247, 0.1); padding: 8px 16px; font-size: 12px; font-weight: 600; color: var(--color-accent-purple); display: flex; justify-content: space-between; }
                .rule-content { padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; font-size: 14px; color: var(--color-text-primary); }
                .connector-badge { background: var(--color-betika-yellow); color: #000; font-size: 10px; font-weight: 800; padding: 4px 8px; border-radius: 4px; z-index: 2; }
                .add-rule-btn { background: transparent; border: 1px dashed var(--color-text-secondary); color: var(--color-text-secondary); padding: 8px 16px; border-radius: 6px; font-size: 12px; cursor: pointer; margin-top: 10px; }
                .add-rule-btn:hover { border-color: var(--color-text-primary); color: var(--color-text-primary); }

                /* Chips */
                .form-group { margin-top: 32px; }
                .form-label { display: block; margin-bottom: 12px; font-size: 14px; color: var(--color-text-secondary); }
                .chip-input-container { display: flex; flex-wrap: wrap; gap: 8px; background: var(--color-bg-input); padding: 12px; border: 1px solid var(--color-border); border-radius: 8px; }
                .chip { padding: 6px 12px; background: var(--color-bg-card); border-radius: 20px; font-size: 12px; color: var(--color-text-primary); cursor: pointer; }
                .chip.purple { background: rgba(168, 85, 247, 0.2); color: var(--color-accent-purple); border: 1px solid rgba(168, 85, 247, 0.3); }
                .chip.cyan { background: rgba(6, 182, 212, 0.2); color: var(--color-accent-cyan); border: 1px solid rgba(6, 182, 212, 0.3); }
                .ghost-input { background: transparent; border: none; color: var(--color-text-primary); outline: none; font-size: 13px; flex: 1; min-width: 120px; }

                /* Sidebar Items */
                .sidebar-panel { padding: 20px; margin-bottom: 24px; background: var(--color-bg-panel); border: 1px solid var(--color-border); border-radius: 12px; }
                .sidebar-title { font-size: 14px; margin: 0 0 16px 0; font-weight: 600; color: var(--color-text-secondary); }
                
                .progress-wrapper { margin-bottom: 12px; }
                .progress-bar-bg { height: 8px; background: var(--color-bg-input); border-radius: 4px; overflow: hidden; margin-bottom: 8px; }
                .progress-bar-fill { height: 100%; background: linear-gradient(90deg, var(--color-accent-purple), var(--color-accent-cyan)); box-shadow: 0 0 10px var(--color-accent-cyan); }
                .progress-labels { display: flex; justify-content: space-between; font-size: 11px; color: var(--color-text-primary); }

                .warning-box { display: flex; gap: 8px; align-items: center; font-size: 12px; color: var(--color-betika-yellow); background: rgba(251, 191, 36, 0.1); padding: 10px; border-radius: 6px; }

                .preview-table { width: 100%; border-collapse: collapse; font-size: 13px; color: var(--color-text-primary); }
                .preview-table th { text-align: left; color: var(--color-text-secondary); padding-bottom: 8px; border-bottom: 1px solid var(--color-border); }
                .preview-table td { padding: 10px 0; border-bottom: 1px solid var(--color-border); }
                .text-right { text-align: right; }

                .json-panel { background: #000; font-family: 'Fira Code', monospace; }
                .sidebar-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
                .json-code { color: var(--color-accent-cyan); font-size: 11px; line-height: 1.5; margin: 0; overflow-x: auto; opacity: 0.8; }
                .btn-icon-xs { background: transparent; border: none; color: var(--color-text-secondary); cursor: pointer; }
                .btn-text { background: none; border: none; color: var(--color-text-muted); cursor: pointer; font-size: 12px; text-decoration: underline; }
            `}</style>
        </div>
    );
}
