'use client';

import { useState } from 'react';
import {
    Calculator, ChevronRight, TrendingUp, Users, DollarSign,
    BarChart2, PlayCircle, RefreshCw
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
    BarChart, Bar
} from 'recharts';

// --- Types ---
interface SimulationResult {
    participation: number;
    cost: number;
    ggr: number;
    roi: number;
}

// --- Mock Simulation Logic ---
// In a real app, this would be an API call to a python model
const PREDICT_LOGIC = (bonusAmount: number, targetSize: number): SimulationResult => {
    // Simple heuristic for mock
    const conversionRate = Math.min(0.05 + (bonusAmount / 50), 0.4); // Cap at 40%
    const participation = Math.round(targetSize * conversionRate);
    const cost = participation * bonusAmount;
    const ggr = participation * (bonusAmount * 1.8 + 10); // Simulated LTV

    return {
        participation,
        cost,
        ggr,
        roi: ((ggr - cost) / cost) * 100
    };
};

// Trend Data generator
const generateTrend = (baseGGR: number) => {
    return [
        { day: 'Day 1', value: baseGGR * 0.1 },
        { day: 'Day 2', value: baseGGR * 0.25 },
        { day: 'Day 3', value: baseGGR * 0.45 },
        { day: 'Day 4', value: baseGGR * 0.6 },
        { day: 'Day 5', value: baseGGR * 0.8 },
        { day: 'Day 6', value: baseGGR * 0.9 },
        { day: 'Day 7', value: baseGGR },
    ];
};

export default function PromotionPredictionPage() {
    // Input State
    const [bonusAmount, setBonusAmount] = useState(10);
    const [targetAudience, setTargetAudience] = useState(10000); // Default to 10k as requested
    const [duration, setDuration] = useState(7);

    // Result State
    const [result, setResult] = useState<SimulationResult | null>(null);
    const [trendData, setTrendData] = useState<any[]>([]);
    const [isSimulating, setIsSimulating] = useState(false);

    const runSimulation = () => {
        setIsSimulating(true);
        // Simulate network delay
        setTimeout(() => {
            const res = PREDICT_LOGIC(bonusAmount, targetAudience);
            setResult(res);
            setTrendData(generateTrend(res.ggr));
            setIsSimulating(false);
        }, 800);
    };

    return (
        <div className="prediction-container">
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Promotion Forecaster</h1>
                    <p className="page-subtitle">Simulate campaign outcomes before launching.</p>
                </div>
            </div>

            <div className="simulation-grid">
                {/* 1. Configuration Panel */}
                <div className="glass-panel config-panel">
                    <div className="panel-header">
                        <Calculator size={18} className="text-secondary" />
                        <h3>Parameters</h3>
                    </div>

                    <div className="form-group">
                        <label>Bonus Amount (€)</label>
                        <div className="input-wrapper">
                            <input
                                type="number"
                                value={bonusAmount}
                                onChange={(e) => setBonusAmount(Number(e.target.value))}
                            />
                            <div className="slider-container">
                                <input
                                    type="range" min="1" max="100"
                                    value={bonusAmount}
                                    onChange={(e) => setBonusAmount(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Target Audience Size</label>
                        <div className="input-wrapper">
                            <input
                                type="number"
                                value={targetAudience}
                                onChange={(e) => setTargetAudience(Number(e.target.value))}
                            />
                            <div className="slider-container">
                                <input
                                    type="range" min="1000" max="100000" step="1000"
                                    value={targetAudience}
                                    onChange={(e) => setTargetAudience(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Duration (Days)</label>
                        <div className="segment-control">
                            {[3, 7, 14, 30].map(d => (
                                <button
                                    key={d}
                                    className={`segment-btn ${duration === d ? 'active' : ''}`}
                                    onClick={() => setDuration(d)}
                                >
                                    {d} Days
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        className="btn-simulate"
                        onClick={runSimulation}
                        disabled={isSimulating}
                    >
                        {isSimulating ? (
                            <><RefreshCw className="spin" size={18} /> Processing...</>
                        ) : (
                            <><PlayCircle size={18} /> Run Prediction</>
                        )}
                    </button>
                </div>

                {/* 2. Results Panel */}
                <div className="results-column">
                    {result ? (
                        <>
                            {/* KPI Row */}
                            <div className="kpi-grid">
                                <div className="glass-panel kpi-box">
                                    <div className="label">Participation</div>
                                    <div className="value">{result.participation.toLocaleString()}</div>
                                    <div className="sub"><Users size={12} /> players</div>
                                </div>
                                <div className="glass-panel kpi-box">
                                    <div className="label">Total Cost</div>
                                    <div className="value text-red">€{result.cost.toLocaleString()}</div>
                                    <div className="sub">Est. Budget</div>
                                </div>
                                <div className="glass-panel kpi-box">
                                    <div className="label">Predicted GGR</div>
                                    <div className="value text-green">€{result.ggr.toLocaleString()}</div>
                                    <div className="sub">Revenue</div>
                                </div>
                                <div className="glass-panel kpi-box highlight">
                                    <div className="label">ROI</div>
                                    <div className="value">{result.roi.toFixed(1)}%</div>
                                    <div className="sub">Return</div>
                                </div>
                            </div>

                            {/* Main Chart */}
                            <div className="glass-panel chart-view">
                                <h3>Predicted Revenue Trajectory</h3>
                                <div className="chart-container">
                                    <ResponsiveContainer width="100%" height={250}>
                                        <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorGGR" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px' }} />
                                            <Area type="monotone" dataKey="value" stroke="#4ade80" fillOpacity={1} fill="url(#colorGGR)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="empty-state glass-panel">
                            <TrendingUp size={48} className="text-muted" />
                            <h3>Ready to Forecast</h3>
                            <p>Adjust parameters and click "Run Prediction" to see AI-generated estimates.</p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .prediction-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 24px;
                    color: #fff;
                }
                .page-header { margin-bottom: 32px; }
                .page-title { font-size: 28px; font-weight: 700; margin: 0 0 8px 0; }
                .page-subtitle { color: var(--color-text-secondary); margin: 0; font-size: 14px; }

                .simulation-grid {
                    display: grid;
                    grid-template-columns: 320px 1fr;
                    gap: 24px;
                    align-items: start;
                }

                /* Config Panel */
                .glass-panel {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 12px;
                    backdrop-filter: blur(10px);
                }
                .config-panel { padding: 24px; }
                .panel-header { display: flex; align-items: center; gap: 8px; margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 16px; }
                .panel-header h3 { margin: 0; font-size: 16px; font-weight: 600; }
                .text-secondary { color: var(--color-text-secondary); }

                .form-group { margin-bottom: 24px; }
                .form-group label { display: block; font-size: 12px; color: var(--color-text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
                
                .input-wrapper input[type="number"] {
                    width: 100%;
                    background: rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 10px; border-radius: 6px;
                    color: #fff; font-size: 16px; font-family: monospace;
                    margin-bottom: 8px;
                }
                .input-wrapper input[type="range"] { width: 100%; accent-color: var(--color-betika-yellow); }

                .segment-control { display: flex; background: rgba(0,0,0,0.3); padding: 4px; border-radius: 6px; }
                .segment-btn {
                    flex: 1; padding: 6px; border: none; background: transparent; 
                    color: var(--color-text-secondary); font-size: 12px; cursor: pointer; border-radius: 4px;
                }
                .segment-btn.active { background: rgba(255,255,255,0.1); color: #fff; font-weight: 600; }

                .btn-simulate {
                    width: 100%;
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    padding: 12px; border-radius: 8px; border: none;
                    background: var(--color-betika-yellow); color: #000;
                    font-weight: 700; font-size: 14px; cursor: pointer;
                    transition: all 0.2s;
                }
                .btn-simulate:hover { opacity: 0.9; transform: translateY(-1px); }
                .btn-simulate:disabled { opacity: 0.6; cursor: wait; }
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }

                /* Results Column */
                .results-column { display: flex; flex-direction: column; gap: 24px; }
                
                .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
                .kpi-box { padding: 16px; text-align: center; }
                .kpi-box .label { font-size: 11px; text-transform: uppercase; color: var(--color-text-secondary); margin-bottom: 4px; }
                .kpi-box .value { font-size: 24px; font-weight: 700; margin-bottom: 4px; }
                .kpi-box .sub { font-size: 11px; color: var(--color-text-secondary); display: flex; align-items: center; justify-content: center; gap: 4px; }
                
                .text-green { color: #4ade80; }
                .text-red { color: #f87171; }
                .highlight { border-color: var(--color-betika-yellow); background: rgba(242, 214, 65, 0.05); }

                .chart-view { padding: 24px; flex: 1; min-height: 350px; }
                .chart-view h3 { margin: 0 0 24px 0; font-size: 16px; font-weight: 600; }

                .empty-state {
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    height: 400px; text-align: center; color: var(--color-text-secondary);
                }
                .empty-state h3 { color: #fff; margin: 16px 0 8px 0; }
                .text-muted { opacity: 0.3; }
            `}</style>
        </div>
    );
}
