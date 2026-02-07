'use client';

import { useState } from 'react';
import {
    ShieldCheck, CheckCircle2, XCircle, Clock, AlertTriangle,
    FileText, TrendingUp, Users, DollarSign, Search, Filter,
    ChevronRight, MoreHorizontal, Download, History, Lock
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

// --- Types ---
type Tab = 'overview' | 'approvals' | 'budgets' | 'audits';

// --- Mock Data ---

const APPROVALS_DATA = [
    { id: 'REQ-1024', name: 'Kenya Mega Jackpot Boost', requestor: 'Sarah K.', market: 'Kenya', amount: '€12,500', urgency: 'High', status: 'Pending L2', created: '2 mins ago' },
    { id: 'REQ-1023', name: 'Ghana Welcome Offer', requestor: 'David O.', market: 'Ghana', amount: '€3,200', urgency: 'Medium', status: 'Pending L1', created: '1 hour ago' },
    { id: 'REQ-1021', name: 'Ethiopia Retention', requestor: 'Mesfin T.', market: 'Ethiopia', amount: '€800', urgency: 'Low', status: 'Pending L1', created: '4 hours ago' },
];

const AUDIT_LOGS = [
    { id: 1, user: 'Admin User', action: 'Approved Promotion', target: 'TZ-2023-005', time: '10 mins ago', type: 'success' },
    { id: 2, user: 'Sarah K.', action: 'Modified Budget Cap', target: 'Kenya Market', time: '2 hours ago', type: 'warning' },
    { id: 3, user: 'System', action: 'Auto-Rejected Request', target: 'REQ-0099 (Over Budget)', time: '5 hours ago', type: 'error' },
    { id: 4, user: 'David O.', action: 'Created Promotion', target: 'GH-2024-001', time: '1 day ago', type: 'info' },
];

const BUDGET_DATA = [
    { market: 'Kenya', cap: 50000, used: 32000, percent: 64, color: '#699951' },
    { market: 'Ghana', cap: 30000, used: 12500, percent: 41, color: '#F2D641' },
    { market: 'Ethiopia', cap: 20000, used: 18500, percent: 92, color: '#ef4444' },
    { market: 'Tanzania', cap: 25000, used: 8000, percent: 32, color: '#06b6d4' },
];

const COMPLIANCE_DATA = [
    { name: 'Compliant', value: 85, color: '#699951' },
    { name: 'Warnings', value: 10, color: '#F2D641' },
    { name: 'Violations', value: 5, color: '#ef4444' },
];

// --- Components ---

function StatusBadge({ status }: { status: string }) {
    let mode = 'default';

    if (status.includes('High') || status.includes('L2')) {
        mode = 'high';
    } else if (status.includes('Medium')) {
        mode = 'medium';
    } else if (status.includes('Low')) {
        mode = 'low';
    }

    return (
        <span className={`status-badge ${mode}`}>
            {status}
            <style jsx>{`
        .status-badge {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: 1px solid transparent;
            background: rgba(255,255,255,0.1);
            color: var(--color-text-secondary);
        }
        .status-badge.high {
            background: rgba(239, 68, 68, 0.1);
            color: #f87171;
            border-color: rgba(239, 68, 68, 0.2);
        }
        .status-badge.medium {
            background: rgba(234, 179, 8, 0.1);
            color: #facc15;
            border-color: rgba(234, 179, 8, 0.2);
        }
        .status-badge.low {
            background: rgba(59, 130, 246, 0.1);
            color: #60a5fa;
            border-color: rgba(59, 130, 246, 0.2);
        }
      `}</style>
        </span>
    );
}

export default function GovernancePage() {
    const [activeTab, setActiveTab] = useState<Tab>('overview');

    return (
        <div className="governance-container">
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Governance Console</h1>
                    <p className="page-subtitle">Manage approvals, compliance, and audit trails.</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary">
                        <Download size={16} /> Export Reports
                    </button>
                    <button className="btn btn-primary">
                        <Lock size={16} /> Update Policies
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="tabs-nav">
                {[
                    { id: 'overview', label: 'Overview', icon: ShieldCheck },
                    { id: 'approvals', label: 'Approvals Queue', icon: CheckCircle2, count: 3 },
                    { id: 'budgets', label: 'Budget Controls', icon: DollarSign },
                    { id: 'audits', label: 'Audit Logs', icon: History },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as Tab)}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                    >
                        <tab.icon size={18} />
                        {tab.label}
                        {tab.count && (
                            <span className="count-badge">{tab.count}</span>
                        )}
                        {activeTab === tab.id && <span className="active-line" />}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="tab-content">

                {/* --- OVERVIEW TAB --- */}
                {activeTab === 'overview' && (
                    <div className="overview-grid">
                        {/* KPI Cards */}
                        <div className="kpi-row">
                            <div className="glass-panel kpi-card">
                                <div className="kpi-header">
                                    <div className="icon-box blue"><FileText size={20} /></div>
                                    <span className="badge">Target: 24h</span>
                                </div>
                                <div className="kpi-value">4.2 hrs</div>
                                <div className="kpi-label">Avg. Approval Time</div>
                            </div>
                            <div className="glass-panel kpi-card">
                                <div className="kpi-header">
                                    <div className="icon-box green"><ShieldCheck size={20} /></div>
                                    <span className="badge success">+2.4%</span>
                                </div>
                                <div className="kpi-value">98.5%</div>
                                <div className="kpi-label">Compliance Score</div>
                            </div>
                            <div className="glass-panel kpi-card">
                                <div className="kpi-header">
                                    <div className="icon-box red"><AlertTriangle size={20} /></div>
                                    <span className="badge warning">High Risk</span>
                                </div>
                                <div className="kpi-value">3</div>
                                <div className="kpi-label">Pending L2 Approvals</div>
                            </div>
                            <div className="glass-panel kpi-card">
                                <div className="kpi-header">
                                    <div className="icon-box yellow"><DollarSign size={20} /></div>
                                    <span className="badge">Monthly</span>
                                </div>
                                <div className="kpi-value">62%</div>
                                <div className="kpi-label">Budget Utilization</div>
                            </div>
                        </div>

                        <div className="charts-row">
                            <div className="glass-panel chart-card full-width">
                                <h3 className="card-title">Budget vs Spend by Market</h3>
                                <div className="chart-container">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={BUDGET_DATA} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="market" type="category" stroke="#94a3b8" width={80} tickLine={false} axisLine={false} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                                                cursor={{ fill: 'transparent' }}
                                            />
                                            <Bar dataKey="cap" fill="#1e293b" barSize={20} radius={[0, 4, 4, 0]} stackId="a" />
                                            <Bar dataKey="used" fill="#F2D641" barSize={20} radius={[0, 4, 4, 0]} stackId="a" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="glass-panel chart-card">
                                <h3 className="card-title">Compliance Health</h3>
                                <div className="chart-container pie-wrapper">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={COMPLIANCE_DATA}
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {COMPLIANCE_DATA.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="pie-center">
                                        <span className="rating">A+</span>
                                        <span className="rating-label">Rating</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- APPROVALS TAB --- */}
                {activeTab === 'approvals' && (
                    <div className="glass-panel table-panel">
                        <div className="panel-header">
                            <h3 className="panel-title">
                                <AlertTriangle size={18} color="#F2D641" />
                                Pending Approvals
                            </h3>
                            <div className="panel-actions">
                                <button className="icon-btn"><Filter size={16} /></button>
                                <button className="icon-btn"><Search size={16} /></button>
                            </div>
                        </div>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Request ID</th>
                                    <th>Promotion Name</th>
                                    <th>Requestor</th>
                                    <th>Market</th>
                                    <th>Cost Est.</th>
                                    <th>Urgency</th>
                                    <th>Status</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {APPROVALS_DATA.map((item) => (
                                    <tr key={item.id}>
                                        <td className="font-mono text-muted">{item.id}</td>
                                        <td className="font-medium text-white">{item.name}</td>
                                        <td className="text-secondary">{item.requestor}</td>
                                        <td><span className="tag">{item.market}</span></td>
                                        <td className="text-white font-mono">{item.amount}</td>
                                        <td><StatusBadge status={item.urgency} /></td>
                                        <td><span className="status-text">{item.status}</span></td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="action-btn approve" title="Approve">
                                                    <CheckCircle2 size={18} />
                                                </button>
                                                <button className="action-btn reject" title="Reject">
                                                    <XCircle size={18} />
                                                </button>
                                                <button className="action-btn view">
                                                    <ChevronRight size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* --- BUDGETS TAB --- */}
                {activeTab === 'budgets' && (
                    <div className="budgets-grid">
                        {BUDGET_DATA.map((b) => (
                            <div key={b.market} className="glass-panel budget-card">
                                <div className="card-header">
                                    <div>
                                        <h3 className="card-title">{b.market} Market</h3>
                                        <p className="card-subtitle">Monthly Budget Cap</p>
                                    </div>
                                    <button className="icon-btn ghost"><MoreHorizontal size={20} /></button>
                                </div>

                                <div className="budget-stats">
                                    <span className="stat-item">Spent: <span className="mono">€{b.used.toLocaleString()}</span></span>
                                    <span className="stat-item">Cap: <span className="mono">€{b.cap.toLocaleString()}</span></span>
                                </div>

                                <div className="progress-bar-bg">
                                    <div
                                        className="progress-bar-fill"
                                        style={{ width: `${b.percent}%`, backgroundColor: b.color }}
                                    />
                                </div>

                                <div className="budget-footer">
                                    <span className={`utilization ${b.percent > 90 ? 'critical' : ''}`}>
                                        {b.percent}% Utilized
                                    </span>
                                    <button className="text-link">Adjust Cap</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* --- AUDIT LOGS TAB --- */}
                {activeTab === 'audits' && (
                    <div className="glass-panel table-panel">
                        <div className="panel-header">
                            <div className="search-bar">
                                <input type="text" placeholder="Search logs..." />
                            </div>
                            <button className="btn btn-secondary btn-sm">
                                <Filter size={14} /> Filter Activity
                            </button>
                        </div>
                        <div className="log-list">
                            {AUDIT_LOGS.map((log) => (
                                <div key={log.id} className="log-item group">
                                    <div className="log-content">
                                        <div className={`status-dot ${log.type}`} />
                                        <div>
                                            <p className="log-text">
                                                <span className="user">{log.user}</span> {log.action} <span className="target">{log.target}</span>
                                            </p>
                                            <p className="log-time">
                                                <Clock size={10} /> {log.time}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="icon-btn ghost hidden group-hover:block">
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="panel-footer">
                            <button className="text-link muted">View All History</button>
                        </div>
                    </div>
                )}

            </div>

            <style jsx>{`
        .governance-container {
            max-width: 1600px;
            margin: 0 auto;
            color: var(--color-text-primary);
            padding: 24px;
        }

        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 32px;
        }
        .page-title {
            font-size: 28px;
            font-weight: 700;
            margin: 0 0 8px 0;
            color: #fff;
        }
        .page-subtitle {
            margin: 0;
            color: var(--color-text-secondary);
            font-size: 14px;
        }
        .header-actions { display: flex; gap: 12px; }

        .btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            border: 1px solid transparent;
        }
        .btn-primary { background: var(--color-betika-yellow); color: #000; }
        .btn-primary:hover { background: #eab308; }
        .btn-secondary { background: rgba(255,255,255,0.05); color: #fff; border-color: rgba(255,255,255,0.1); }
        .btn-secondary:hover { background: rgba(255,255,255,0.1); }
        .btn-sm { padding: 6px 12px; font-size: 12px; }

        /* Tabs */
        .tabs-nav {
            display: flex;
            gap: 24px;
            border-bottom: 1px solid var(--color-border);
            margin-bottom: 32px;
        }
        .tab-btn {
            background: none;
            border: none;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 0 8px 16px 8px; /* Removed bottom padding since active line is absolute but container has spacing */
            font-size: 14px;
            font-weight: 500;
            color: var(--color-text-secondary);
            cursor: pointer;
            position: relative;
        }
        .tab-btn:hover { color: #fff; }
        .tab-btn.active { color: var(--color-betika-yellow); }
        .count-badge {
            background: #ef4444;
            color: #fff;
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 10px;
            line-height: 1;
        }
        .active-line {
            position: absolute;
            bottom: -1px;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--color-betika-yellow);
            box-shadow: 0 0 10px rgba(242, 214, 65, 0.5);
        }

        /* Overview Grid */
        .overview-grid { display: flex; flex-direction: column; gap: 24px; }
        .kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .kpi-card { padding: 20px; display: flex; flex-direction: column; }
        
        .kpi-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
        .icon-box { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .icon-box.blue { background: rgba(59, 130, 246, 0.1); color: #60a5fa; }
        .icon-box.green { background: rgba(34, 197, 94, 0.1); color: #4ade80; }
        .icon-box.red { background: rgba(239, 68, 68, 0.1); color: #f87171; }
        .icon-box.yellow { background: rgba(234, 179, 8, 0.1); color: #facc15; }
        
        .badge { font-size: 11px; padding: 4px 8px; border-radius: 4px; background: rgba(255,255,255,0.05); color: var(--color-text-secondary); }
        .badge.success { color: #4ade80; }
        .badge.warning { color: #f87171; background: rgba(239, 68, 68, 0.1); }
        
        .kpi-value { font-size: 28px; font-weight: 700; color: #fff; margin-bottom: 4px; }
        .kpi-label { font-size: 13px; color: var(--color-text-secondary); }

        .charts-row { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
        .chart-card { padding: 24px; height: 350px; display: flex; flex-direction: column; }
        .card-title { margin: 0 0 24px 0; font-size: 16px; font-weight: 600; color: #fff; }
        .chart-container { flex: 1; width: 100%; min-height: 0; position: relative; }
        
        .pie-wrapper { display: flex; align-items: center; justify-content: center; }
        .pie-center { position: absolute; display: flex; flex-direction: column; align-items: center; pointer-events: none; }
        .rating { font-size: 32px; font-weight: 700; color: #fff; line-height: 1; }
        .rating-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-secondary); }

        /* Tables & Lists */
        .table-panel { padding: 0; overflow: hidden; }
        .panel-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; border-bottom: 1px solid var(--color-border); background: rgba(255,255,255,0.02); }
        .panel-title { margin: 0; font-size: 16px; font-weight: 600; color: #fff; display: flex; align-items: center; gap: 8px; }
        .panel-actions { display: flex; gap: 8px; }
        .icon-btn { background: var(--color-bg-input); border: 1px solid var(--color-border); color: var(--color-text-secondary); padding: 8px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .icon-btn:hover { color: #fff; border-color: rgba(255,255,255,0.2); }
        .icon-btn.ghost { background: transparent; border: none; }

        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th { text-align: left; padding: 16px 24px; color: var(--color-text-muted); font-size: 11px; text-transform: uppercase; font-weight: 600; background: rgba(0,0,0,0.2); }
        .data-table td { padding: 16px 24px; border-bottom: 1px solid var(--color-border); vertical-align: middle; font-size: 14px; color: var(--color-text-secondary); }
        .data-table tr:hover td { background: rgba(255,255,255,0.02); }
        
        .font-mono { font-family: monospace; }
        .text-white { color: #fff; }
        .text-muted { color: var(--color-text-muted); }
        .tag { background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 4px; font-size: 12px; }
        .status-text { color: var(--color-betika-yellow); font-weight: 600; font-size: 12px; }

        .action-buttons { display: flex; gap: 8px; justify-content: flex-end; }
        .action-btn { background: transparent; border: none; padding: 6px; border-radius: 6px; cursor: pointer; opacity: 0.7; transition: all 0.2s; }
        .action-btn:hover { opacity: 1; background: rgba(255,255,255,0.1); }
        .action-btn.approve { color: #4ade80; }
        .action-btn.reject { color: #f87171; }
        .action-btn.view { color: #fff; }

        /* Budgets Grid */
        .budgets-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .budget-card { padding: 24px; }
        .card-header { display: flex; justify-content: space-between; margin-bottom: 24px; }
        .card-subtitle { margin: 4px 0 0 0; font-size: 13px; color: var(--color-text-secondary); }
        
        .budget-stats { display: flex; justify-content: space-between; font-size: 13px; color: var(--color-text-secondary); margin-bottom: 8px; }
        .mono { color: #fff; font-family: monospace; }
        
        .progress-bar-bg { height: 12px; background: rgba(255,255,255,0.1); border-radius: 6px; overflow: hidden; margin-bottom: 16px; }
        .progress-bar-fill { height: 100%; border-radius: 6px; transition: width 1s ease; }
        
        .budget-footer { display: flex; justify-content: space-between; align-items: center; font-size: 12px; }
        .utilization { color: var(--color-text-secondary); }
        .utilization.critical { color: #f87171; font-weight: 700; }
        .text-link { background: none; border: none; color: var(--color-accent-blue, #60a5fa); cursor: pointer; padding: 0; }
        .text-link.muted { color: var(--color-text-muted); }

        /* Logs */
        .search-bar { width: 300px; display: flex; }
        .search-bar input { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--color-border); padding: 8px 12px; border-radius: 6px; color: #fff; outline: none; }
        
        .log-list { display: flex; flex-direction: column; }
        .log-item { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; border-bottom: 1px solid var(--color-border); transition: background 0.2s; }
        .log-item:hover { background: rgba(255,255,255,0.02); }
        .log-content { display: flex; gap: 16px; align-items: flex-start; }
        
        .status-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 6px; }
        .status-dot.success { background: #4ade80; box-shadow: 0 0 8px rgba(74, 222, 128, 0.4); }
        .status-dot.warning { background: #facc15; }
        .status-dot.error { background: #f87171; }
        .status-dot.info { background: #60a5fa; }
        
        .log-text { font-size: 14px; color: var(--color-text-secondary); margin: 0 0 4px 0; }
        .user { color: #fff; font-weight: 500; }
        .target { color: var(--color-betika-yellow); }
        .log-time { font-size: 11px; color: var(--color-text-muted); display: flex; align-items: center; gap: 4px; margin: 0; }
        
        .panel-footer { padding: 16px; text-align: center; border-top: 1px solid var(--color-border); }
        
        .hidden { display: none; }
        .group:hover .hidden { display: block; }
      `}</style>
        </div>
    );
}
