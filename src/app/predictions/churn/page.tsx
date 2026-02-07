'use client';

import {
    Users, AlertTriangle, TrendingDown, ArrowRight, ShieldAlert,
    Mail, MessageSquare, Gift
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
    PieChart, Pie
} from 'recharts';

// --- Mock Data ---
const RISK_SEGMENTS = [
    { id: 1, name: 'High Rollers (Declining)', count: 245, risk: 'High', value: '€45k' },
    { id: 2, name: 'New Depositors (Inactive)', count: 1200, risk: 'Medium', value: '€12k' },
    { id: 3, name: 'Sports Bettors (Losers)', count: 850, risk: 'High', value: '€28k' },
    { id: 4, name: 'Casino Frequent (Churned)', count: 560, risk: 'Critical', value: '€32k' },
];

const CHURN_TREND = [
    { month: 'Jan', rate: 4.2 },
    { month: 'Feb', rate: 4.5 },
    { month: 'Mar', rate: 4.1 },
    { month: 'Apr', rate: 3.8 },
    { month: 'May', rate: 4.6 }, // Spike
    { month: 'Jun', rate: 4.3 },
];

const RISK_DISTRIBUTION = [
    { name: 'Low Risk', value: 65, color: '#4ade80' },
    { name: 'Medium Risk', value: 20, color: '#F2D641' },
    { name: 'High Risk', value: 15, color: '#f87171' },
];

export default function ChurnPredictionPage() {
    return (
        <div className="prediction-container">
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Churn Prediction</h1>
                    <p className="page-subtitle">AI-driven identification of at-risk player segments.</p>
                </div>
            </div>

            {/* Top Stats */}
            <div className="stats-row">
                <div className="glass-panel stat-card">
                    <div className="stat-icon"><ShieldAlert size={24} color="#f87171" /></div>
                    <div className="stat-info">
                        <div className="stat-value">2,855</div>
                        <div className="stat-label">At-Risk Players</div>
                    </div>
                </div>
                <div className="glass-panel stat-card">
                    <div className="stat-icon"><TrendingDown size={24} color="#F2D641" /></div>
                    <div className="stat-info">
                        <div className="stat-value">4.3%</div>
                        <div className="stat-label">Predicted Churn Rate</div>
                    </div>
                </div>
                <div className="glass-panel stat-card">
                    <div className="stat-icon"><Users size={24} color="#60a5fa" /></div>
                    <div className="stat-info">
                        <div className="stat-value">€117k</div>
                        <div className="stat-label">Revenue at Risk</div>
                    </div>
                </div>
            </div>

            <div className="content-grid">
                {/* Main Risk Table */}
                <div className="glass-panel main-panel">
                    <div className="panel-header">
                        <h3>High Risk Segments</h3>
                    </div>
                    <table className="risk-table">
                        <thead>
                            <tr>
                                <th>Segment Name</th>
                                <th>Player Count</th>
                                <th>Est. Value</th>
                                <th>Risk Level</th>
                                <th className="text-right">Recommended Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RISK_SEGMENTS.map(seg => (
                                <tr key={seg.id}>
                                    <td className="font-medium">{seg.name}</td>
                                    <td>{seg.count}</td>
                                    <td>{seg.value}</td>
                                    <td>
                                        <span className={`risk-badge ${seg.risk.toLowerCase()}`}>
                                            {seg.risk}
                                        </span>
                                    </td>
                                    <td className="text-right">
                                        <div className="action-group">
                                            <button className="action-btn" title="Send Email"><Mail size={14} /></button>
                                            <button className="action-btn" title="Send SMS"><MessageSquare size={14} /></button>
                                            <button className="action-btn primary" title="Send Bonus">
                                                <Gift size={14} /> Send Offer
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Sidebar Charts */}
                <div className="side-column">
                    {/* Risk Distribution */}
                    <div className="glass-panel chart-panel">
                        <h3>Risk Distribution</h3>
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={RISK_DISTRIBUTION}
                                        innerRadius={50}
                                        outerRadius={70}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {RISK_DISTRIBUTION.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="legend">
                                {RISK_DISTRIBUTION.map(d => (
                                    <div key={d.name} className="legend-item">
                                        <span className="dot" style={{ background: d.color }}></span>
                                        {d.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Churn Trend */}
                    <div className="glass-panel chart-panel">
                        <h3>6-Month Trend</h3>
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height={150}>
                                <BarChart data={CHURN_TREND}>
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px' }}
                                    />
                                    <Bar dataKey="rate" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
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

        /* Stats Row */
        .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 24px; }
        .glass-panel {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px;
            padding: 24px;
            backdrop-filter: blur(10px);
        }
        .stat-card { display: flex; align-items: center; gap: 16px; }
        .stat-icon { 
            width: 56px; height: 56px; border-radius: 16px; 
            background: rgba(255,255,255,0.05);
            display: flex; align-items: center; justify-content: center;
        }
        .stat-value { font-size: 28px; font-weight: 700; line-height: 1.1; }
        .stat-label { font-size: 13px; color: var(--color-text-secondary); margin-top: 4px; }

        /* Content Grid */
        .content-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
        
        .main-panel { padding: 0; overflow: hidden; }
        .panel-header { padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .panel-header h3 { margin: 0; font-size: 18px; font-weight: 600; }

        /* Table */
        .risk-table { width: 100%; border-collapse: collapse; }
        .risk-table th { 
            text-align: left; padding: 16px 24px; 
            font-size: 11px; text-transform: uppercase; color: var(--color-text-secondary);
            background: rgba(0,0,0,0.2);
        }
        .risk-table td { padding: 16px 24px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .font-medium { font-weight: 500; }
        
        .risk-badge { 
            padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase;
        }
        .risk-badge.high { background: rgba(248, 113, 113, 0.15); color: #f87171; }
        .risk-badge.critical { background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.4); }
        .risk-badge.medium { background: rgba(242, 214, 65, 0.15); color: #F2D641; }
        
        .action-group { display: flex; gap: 8px; justify-content: flex-end; }
        .action-btn { 
            display: flex; align-items: center; justify-content: center;gap: 6px;
            width: 32px; height: 32px; border-radius: 6px;
            background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
            color: #fff; cursor: pointer; transition: all 0.2s;
        }
        .action-btn:hover { background: rgba(255,255,255,0.1); }
        .action-btn.primary { width: auto; padding: 0 12px; background: var(--color-betika-yellow); color: #000; border: none; font-size: 12px; font-weight: 600; }
        .action-btn.primary:hover { opacity: 0.9; }

        /* Side Column */
        .side-column { display: flex; flex-direction: column; gap: 24px; }
        .chart-panel h3 { margin: 0 0 16px 0; font-size: 16px; font-weight: 600; }
        
        .legend { display: flex; justify-content: center; gap: 16px; margin-top: 10px; flex-wrap: wrap; }
        .legend-item { font-size: 11px; color: var(--color-text-secondary); display: flex; align-items: center; gap: 6px; }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        
        .text-right { text-align: right; }
      `}</style>
        </div>
    );
}
