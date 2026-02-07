'use client';

import { useState } from 'react';
import {
    BarChart2, Download, Calendar, Filter, Users, DollarSign,
    TrendingUp, Globe, FileText, ChevronDown
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

// --- Mock Data ---
const MARKET_PERFORMANCE = [
    { market: 'Kenya', revenue: 125000, cost: 45000, participants: 65000 },
    { market: 'Ghana', revenue: 98000, cost: 32000, participants: 42000 },
    { market: 'Ethiopia', revenue: 45000, cost: 18000, participants: 28000 },
    { market: 'Tanzania', revenue: 72000, cost: 24000, participants: 35000 },
    { market: 'Uganda', revenue: 38000, cost: 12000, participants: 15000 },
];

const DAILY_TRENDS = [
    { day: 'Mon', actives: 4200, claims: 2100 },
    { day: 'Tue', actives: 4500, claims: 2300 },
    { day: 'Wed', actives: 5800, claims: 3200 }, // Midweek Boost
    { day: 'Thu', actives: 4600, claims: 2200 },
    { day: 'Fri', actives: 7200, claims: 4500 },
    { day: 'Sat', actives: 12500, claims: 8900 }, // Weekend Peak
    { day: 'Sun', actives: 11200, claims: 7800 },
];

const PROMO_TYPE_DISTRIBUTION = [
    { name: 'Deposit Match', value: 45, color: '#699951' }, // Betika Green
    { name: 'Free Bet', value: 30, color: '#F2D641' },      // Betika Yellow
    { name: 'Cashback', value: 15, color: '#60a5fa' },
    { name: 'Boosts', value: 10, color: '#f87171' },
];

export default function ReportsPage() {
    const [dateRange, setDateRange] = useState('Last 30 Days');

    return (
        <div className="reports-container">
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Analytics & Reports</h1>
                    <p className="page-subtitle">Deep-dive insights into campaign performance and ROI.</p>
                </div>
                <div className="header-actions">
                    <div className="date-picker">
                        <Calendar size={16} />
                        <span>{dateRange}</span>
                        <ChevronDown size={14} />
                    </div>
                    <button className="btn btn-primary">
                        <Download size={16} /> Export CSV
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="kpi-row">
                <div className="glass-panel kpi-card">
                    <div className="kpi-icon"><DollarSign size={20} color="#4ade80" /></div>
                    <div>
                        <div className="kpi-value">€378.2k</div>
                        <div className="kpi-label">Total GGR Generated</div>
                    </div>
                </div>
                <div className="glass-panel kpi-card">
                    <div className="kpi-icon"><TrendingUp size={20} color="#F2D641" /></div>
                    <div>
                        <div className="kpi-value">34.5%</div>
                        <div className="kpi-label">Avg. ROI</div>
                    </div>
                </div>
                <div className="glass-panel kpi-card">
                    <div className="kpi-icon"><Users size={20} color="#60a5fa" /></div>
                    <div>
                        <div className="kpi-value">185k</div>
                        <div className="kpi-label">Total Participants</div>
                    </div>
                </div>
                <div className="glass-panel kpi-card">
                    <div className="kpi-icon"><FileText size={20} color="#f87171" /></div>
                    <div>
                        <div className="kpi-value">12</div>
                        <div className="kpi-label">Campaigns Analyzed</div>
                    </div>
                </div>
            </div>

            {/* Main Charts */}
            <div className="charts-grid">
                {/* ROI by Market */}
                <div className="glass-panel chart-card col-span-2">
                    <div className="card-header">
                        <h3>Revenue vs Cost by Market</h3>
                        <button className="icon-btn"><Filter size={16} /></button>
                    </div>
                    <div className="chart-area">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={MARKET_PERFORMANCE} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="market" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Legend />
                                <Bar dataKey="revenue" name="GGR Revenue" fill="#4ade80" radius={[4, 4, 0, 0]} barSize={30} />
                                <Bar dataKey="cost" name="Bonus Cost" fill="#f87171" radius={[4, 4, 0, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Promo Type Distribution */}
                <div className="glass-panel chart-card col-span-1">
                    <div className="card-header">
                        <h3>Campaign Types</h3>
                    </div>
                    <div className="chart-area donut-chart">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={PROMO_TYPE_DISTRIBUTION}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {PROMO_TYPE_DISTRIBUTION.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px' }} />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="center-text">
                            <span className="total">4 Types</span>
                        </div>
                    </div>
                </div>

                {/* Daily Trends */}
                <div className="glass-panel chart-card col-span-3">
                    <div className="card-header">
                        <h3>Player Engagement Trends (Last 7 Days)</h3>
                    </div>
                    <div className="chart-area medium-height">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={DAILY_TRENDS} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="actives" name="Active Players" stroke="#60a5fa" strokeWidth={3} dot={{ r: 4, fill: '#60a5fa' }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="claims" name="Bonus Claims" stroke="#F2D641" strokeWidth={3} dot={{ r: 4, fill: '#F2D641' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .reports-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 24px;
            color: #fff;
        }

        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 32px;
        }
        .page-title { font-size: 28px; font-weight: 700; margin: 0 0 8px 0; }
        .page-subtitle { color: var(--color-text-secondary); margin: 0; font-size: 14px; }
        
        .header-actions { display: flex; gap: 12px; }
        
        .date-picker {
            display: flex; align-items: center; gap: 8px;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            padding: 8px 16px; border-radius: 8px;
            font-size: 13px; color: #fff; cursor: pointer;
        }
        
        .btn {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 10px 20px; border-radius: 8px;
            font-size: 13px; font-weight: 600; cursor: pointer;
            transition: all 0.2s; border: none;
        }
        .btn-primary { background: var(--color-betika-yellow); color: #000; }
        
        /* KPI Cards */
        .kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 32px; }
        .glass-panel {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px;
            backdrop-filter: blur(10px);
        }
        .kpi-card { padding: 20px; display: flex; align-items: center; gap: 16px; }
        .kpi-icon {
            width: 48px; height: 48px; border-radius: 12px;
            background: rgba(255,255,255,0.05);
            display: flex; align-items: center; justify-content: center;
        }
        .kpi-value { font-size: 24px; font-weight: 700; line-height: 1.2; margin-bottom: 2px; }
        .kpi-label { font-size: 12px; color: var(--color-text-secondary); text-transform: uppercase; }

        /* Charts Grid */
        .charts-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
        }
        .col-span-1 { grid-column: span 1; }
        .col-span-2 { grid-column: span 2; }
        .col-span-3 { grid-column: span 3; }
        
        .chart-card { padding: 24px; display: flex; flex-direction: column; }
        .card-header { display: flex; justify-content: space-between; margin-bottom: 24px; }
        .card-header h3 { margin: 0; font-size: 16px; font-weight: 600; }
        
        .icon-btn { background: transparent; border: 1px solid rgba(255,255,255,0.1); color: var(--color-text-secondary); padding: 6px; border-radius: 6px; cursor: pointer; }
        
        .chart-area { flex: 1; min-height: 300px; position: relative; }
        .medium-height { min-height: 350px; }
        
        .donut-chart { display: flex; align-items: center; justify-content: center; }
        .center-text { position: absolute; top: 45%; left: 0; right: 0; text-align: center; pointer-events: none; }
        .total { font-size: 14px; font-weight: 600; color: var(--color-text-secondary); }
      `}</style>
        </div>
    );
}
