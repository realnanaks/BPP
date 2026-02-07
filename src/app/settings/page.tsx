'use client';

import { useState } from 'react';
import {
    Settings, Users, Shield, Bell, Database, Save, CheckCircle2, Power,
    CreditCard, Globe, Key, Webhook, Mail
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

// --- Mock Data ---
const USERS = [
    { id: 1, name: 'Admin User', role: 'Super Admin', email: 'admin@betika.com', status: 'Active' },
    { id: 2, name: 'Sarah K.', role: 'CRM Manager', email: 'sarah.k@betika.com', status: 'Active' },
    { id: 3, name: 'David O.', role: 'Analyst', email: 'david.o@betika.com', status: 'Inactive' },
];

const INTEGRATIONS = [
    { id: 'twilio', name: 'Twilio SMS', status: 'connected', icon: 'T' },
    { id: 'sendgrid', name: 'SendGrid Email', status: 'connected', icon: 'S' },
    { id: 'segment', name: 'Segment.io', status: 'disconnected', icon: 'Io' },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');
    const [isSaving, setIsSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setSuccessMsg('Settings updated successfully!');
            setTimeout(() => setSuccessMsg(''), 3000);
        }, 1500);
    };

    return (
        <div className="settings-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">System Settings</h1>
                    <p className="page-subtitle">Manage platform configurations, users, and integrations.</p>
                </div>
                <button
                    className="btn-save"
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? 'Saving...' : <><Save size={16} /> Save Changes</>}
                </button>
            </div>

            {successMsg && (
                <div className="success-toast">
                    <CheckCircle2 size={16} /> {successMsg}
                </div>
            )}

            <div className="settings-layout">
                {/* Sidebar Navigation */}
                <div className="settings-nav glass-panel">
                    <button
                        className={`nav-btn ${activeTab === 'general' ? 'active' : ''}`}
                        onClick={() => setActiveTab('general')}
                    >
                        <Settings size={18} /> General
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('users')}
                    >
                        <Users size={18} /> Users & Roles
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'integrations' ? 'active' : ''}`}
                        onClick={() => setActiveTab('integrations')}
                    >
                        <Webhook size={18} /> Integrations
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'notifications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        <Bell size={18} /> Notifications
                    </button>
                </div>

                {/* Content Area */}
                <div className="settings-content glass-panel">

                    {/* --- GENERAL TAB --- */}
                    {activeTab === 'general' && (
                        <div className="tab-pane">
                            <h3>Platform Configuration</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Platform Name</label>
                                    <input type="text" defaultValue="Betika Promotions Platform" />
                                </div>
                                <div className="form-group">
                                    <label>Default Currency</label>
                                    <select defaultValue="EUR">
                                        <option value="EUR">EUR (€)</option>
                                        <option value="USD">USD ($)</option>
                                        <option value="KES">KES (Ksh)</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Timezone</label>
                                    <select defaultValue="UTC+3">
                                        <option value="UTC">UTC (Greenwich)</option>
                                        <option value="UTC+3">EAT (Nairobi)</option>
                                        <option value="UTC+1">CET (Berlin)</option>
                                    </select>
                                </div>
                            </div>

                            <h3 className="mt-8">Risk Controls</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Max Daily Bonus Cap (€)</label>
                                    <input type="number" defaultValue="50000" />
                                    <span className="help-text">Global limit for all active campaigns.</span>
                                </div>
                                <div className="form-group">
                                    <label>Fraud Detection Level</label>
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <input type="radio" name="fraud" /> Standard
                                        </label>
                                        <label className="radio-label">
                                            <input type="radio" name="fraud" defaultChecked /> Strict
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- USERS TAB --- */}
                    {activeTab === 'users' && (
                        <div className="tab-pane">
                            <div className="pane-header">
                                <h3>User Management</h3>
                                <button className="btn-secondary">+ Add User</button>
                            </div>
                            <table className="users-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {USERS.map(user => (
                                        <tr key={user.id}>
                                            <td className="font-medium">{user.name}</td>
                                            <td><span className="role-badge">{user.role}</span></td>
                                            <td className="text-secondary">{user.email}</td>
                                            <td>
                                                <span className={`status-dot ${user.status.toLowerCase()}`}></span>
                                                {user.status}
                                            </td>
                                            <td>
                                                <button className="icon-btn"><Settings size={14} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* --- INTEGRATIONS TAB --- */}
                    {activeTab === 'integrations' && (
                        <div className="tab-pane">
                            <h3>External Services</h3>
                            <div className="integrations-list">
                                {INTEGRATIONS.map(int => (
                                    <div key={int.id} className="integration-card">
                                        <div className="int-icon">{int.icon}</div>
                                        <div className="int-info">
                                            <h4>{int.name}</h4>
                                            <p className="status">
                                                <span className={`dot ${int.status}`}></span>
                                                {int.status === 'connected' ? 'Active Connection' : 'Not Configured'}
                                            </p>
                                        </div>
                                        <div className="int-actions">
                                            <button className="btn-configure">Configure</button>
                                            <label className="switch">
                                                <input type="checkbox" defaultChecked={int.status === 'connected'} />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h3 className="mt-8">API Keys</h3>
                            <div className="api-key-box">
                                <div className="key-header">
                                    <Key size={16} /> Public API Key
                                </div>
                                <div className="key-value">
                                    pk_live_51Msz...x923k
                                    <button className="copy-btn">Copy</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- NOTIFICATIONS TAB --- */}
                    {activeTab === 'notifications' && (
                        <div className="tab-pane">
                            <h3>Alert Preferences</h3>
                            <div className="notif-group">
                                <div className="notif-item">
                                    <div className="notif-info">
                                        <h4>Campaign Budget Warning</h4>
                                        <p>Notify when a campaign reaches 80% of budget.</p>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                                <div className="notif-item">
                                    <div className="notif-info">
                                        <h4>High Risk Churn Alert</h4>
                                        <p>Daily summary of newly identified high-risk players.</p>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                                <div className="notif-item">
                                    <div className="notif-info">
                                        <h4>System Performance</h4>
                                        <p>Alerts for API downtime or latency spikes.</p>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <style jsx>{`
        .settings-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 24px;
            color: #fff;
        }
        .page-header { 
            display: flex; justify-content: space-between; align-items: start;
            margin-bottom: 32px; 
        }
        .page-title { font-size: 28px; font-weight: 700; margin: 0 0 8px 0; }
        .page-subtitle { color: var(--color-text-secondary); margin: 0; font-size: 14px; }

        .btn-save {
            display: flex; align-items: center; gap: 8px;
            background: var(--color-betika-yellow);
            color: #000; border: none; padding: 10px 20px;
            border-radius: 8px; font-weight: 700; cursor: pointer;
            transition: all 0.2s;
        }
        .btn-save:hover { opacity: 0.9; transform: translateY(-1px); }
        .btn-save:disabled { opacity: 0.6; cursor: wait; transform: none; }

        .success-toast {
            position: fixed; top: 24px; right: 24px; z-index: 1000;
            background: rgba(74, 222, 128, 0.1); color: #4ade80;
            padding: 12px 20px; border-radius: 8px; border: 1px solid rgba(74, 222, 128, 0.2);
            display: flex; align-items: center; gap: 8px; font-weight: 600;
            animation: slideIn 0.3s ease-out;
            backdrop-filter: blur(10px);
        }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

        .settings-layout {
            display: grid; grid-template-columns: 240px 1fr; gap: 24px;
            align-items: start;
        }

        .glass-panel {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px;
            backdrop-filter: blur(10px);
        }

        /* Nav */
        .settings-nav { padding: 12px; display: flex; flex-direction: column; gap: 4px; }
        .nav-btn {
            display: flex; align-items: center; gap: 10px;
            width: 100%; padding: 12px 16px;
            background: transparent; border: none;
            color: var(--color-text-secondary); font-size: 14px; font-weight: 500;
            text-align: left; cursor: pointer; border-radius: 8px;
            transition: all 0.2s;
        }
        .nav-btn:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .nav-btn.active { background: rgba(255,255,255,0.1); color: #fff; font-weight: 600; }

        /* Content */
        .settings-content { padding: 32px; min-height: 600px; }
        .tab-pane h3 { margin: 0 0 24px 0; font-size: 18px; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px; }
        .mt-8 { margin-top: 32px; }

        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .form-group { margin-bottom: 16px; }
        .form-group label { display: block; font-size: 11px; text-transform: uppercase; color: var(--color-text-secondary); margin-bottom: 8px; letter-spacing: 0.5px; }
        
        input[type="text"], input[type="number"], select {
            width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
            padding: 10px 12px; border-radius: 6px; color: #fff; outline: none; font-size: 14px;
        }
        select { appearance: none; cursor: pointer; }
        .help-text { font-size: 11px; color: var(--color-text-secondary); margin-top: 4px; display: block; }

        .radio-group { display: flex; gap: 16px; }
        .radio-label { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; }
        input[type="radio"] { accent-color: var(--color-betika-yellow); }

        /* Users Table */
        .pane-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px; }
        .pane-header h3 { margin: 0; border: none; padding: 0; }
        .btn-secondary { background: rgba(255,255,255,0.1); border: none; color: #fff; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; }
        
        .users-table { width: 100%; border-collapse: collapse; }
        .users-table th { text-align: left; padding: 12px; font-size: 11px; text-transform: uppercase; color: var(--color-text-secondary); }
        .users-table td { padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13px; }
        .role-badge { background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 4px; font-size: 11px; }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; margin-right: 6px; }
        .status-dot.active { background: #4ade80; }
        .status-dot.inactive { background: #94a3b8; }
        .icon-btn { background: transparent; border: none; color: var(--color-text-secondary); cursor: pointer; padding: 4px; }
        .icon-btn:hover { color: #fff; }

        /* Integrations */
        .integrations-list { display: grid; gap: 16px; }
        .integration-card { 
            display: flex; align-items: center; gap: 16px; 
            padding: 16px; background: rgba(255,255,255,0.02); 
            border: 1px solid rgba(255,255,255,0.05); border-radius: 8px;
        }
        .int-icon { 
            width: 40px; height: 40px; background: rgba(255,255,255,0.1); 
            border-radius: 8px; display: flex; align-items: center; justify-content: center; 
            font-weight: 700; font-size: 16px;
        }
        .int-info { flex: 1; }
        .int-info h4 { margin: 0 0 4px 0; font-size: 14px; }
        .int-info .status { font-size: 11px; color: var(--color-text-secondary); display: flex; align-items: center; gap: 6px; }
        .dot { width: 6px; height: 6px; border-radius: 50%; }
        .dot.connected { background: #4ade80; }
        .dot.disconnected { background: #f87171; }
        
        .int-actions { display: flex; align-items: center; gap: 16px; }
        .btn-configure { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; }
        .btn-configure:hover { border-color: #fff; }

        /* Switch */
        .switch { position: relative; display: inline-block; width: 36px; height: 20px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.1); transition: .4s; border-radius: 20px; }
        .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 2px; bottom: 2px; background-color: white; transition: .4s; border-radius: 50%; }
        input:checked + .slider { background-color: #4ade80; }
        input:checked + .slider:before { transform: translateX(16px); }

        /* API Keys */
        .api-key-box { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 16px; }
        .key-header { margin-bottom: 8px; font-size: 12px; color: var(--color-text-secondary); display: flex; align-items: center; gap: 6px; }
        .key-value { font-family: monospace; font-size: 14px; color: #fff; display: flex; justify-content: space-between; align-items: center; }
        .copy-btn { background: rgba(255,255,255,0.1); border: none; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 10px; cursor: pointer; }

        /* Notifications */
        .notif-group { display: flex; flex-direction: column; gap: 16px; }
        .notif-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .notif-item:last-child { border-bottom: none; }
        .notif-info h4 { margin: 0 0 4px 0; font-size: 14px; }
        .notif-info p { margin: 0; font-size: 12px; color: var(--color-text-secondary); }
      `}</style>
        </div>
    );
}
