'use client';

import { useState } from 'react';
import {
    Users, UploadCloud, Search, CheckCircle2, XCircle,
    Gift, FileText, Filter, AlertCircle
} from 'lucide-react';
import {
    BarChart as RechartBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

// --- Types ---
interface Segment {
    id: string;
    name: string;
    count: number;
    criteria: string;
}

interface Player {
    id: string;
    username: string;
    status: 'active' | 'suspended';
    lastActive: string;
    selected?: boolean;
}

// --- Mock Data ---
const PRESET_SEGMENTS: Segment[] = [
    { id: 'seg_001', name: 'VIP High Rollers (Kenya)', count: 450, criteria: 'Dep > 5000 & Market = KE' },
    { id: 'seg_002', name: 'Churned Users (Last 30d)', count: 1250, criteria: 'Inactive > 30d' },
    { id: 'seg_003', name: 'New Registrations (Today)', count: 320, criteria: 'Reg Date = Today' },
];

const MOCK_PLAYERS: Player[] = [
    { id: 'PL-8821', username: 'Kofi_G.', status: 'active', lastActive: '2 mins ago' },
    { id: 'PL-9932', username: 'Sarah_K.', status: 'active', lastActive: '1 hr ago' },
    { id: 'PL-7741', username: 'David_O.', status: 'suspended', lastActive: '4 days ago' },
    { id: 'PL-3321', username: 'Emeka_J.', status: 'active', lastActive: '5 mins ago' },
    { id: 'PL-1102', username: 'Amina_S.', status: 'active', lastActive: 'Today' },
];

export default function ManualAwardPage() {
    const [activeTab, setActiveTab] = useState<'segment' | 'csv'>('segment');
    const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [awardType, setAwardType] = useState('bonus');
    const [amount, setAmount] = useState(10);
    const [isProcessing, setIsProcessing] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const handleAward = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setSuccessMsg(`Successfully queued ${selectedSegment ? 'segment' : 'CSV list'} for processing!`);
            setTimeout(() => setSuccessMsg(''), 5000);
        }, 1500);
    };

    const handleFileDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setCsvFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className="manual-award-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Manual Award</h1>
                    <p className="page-subtitle">Target specificity segments or upload lists to grant bonuses.</p>
                </div>
            </div>

            <div className="grid-layout">
                {/* LEFT COLUMN: Selection Method */}
                <div className="selection-panel">
                    <div className="tabs">
                        <button
                            className={`tab-btn ${activeTab === 'segment' ? 'active' : ''}`}
                            onClick={() => setActiveTab('segment')}
                        >
                            <Users size={18} /> Select Segment
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'csv' ? 'active' : ''}`}
                            onClick={() => setActiveTab('csv')}
                        >
                            <UploadCloud size={18} /> Upload CSV
                        </button>
                    </div>

                    <div className="panel-content glass-panel">
                        {activeTab === 'segment' ? (
                            <div className="segment-list">
                                <div className="search-box">
                                    <Search size={16} className="text-secondary" />
                                    <input type="text" placeholder="Search saved segments..." />
                                </div>
                                {PRESET_SEGMENTS.map(seg => (
                                    <div
                                        key={seg.id}
                                        className={`segment-item ${selectedSegment === seg.id ? 'selected' : ''}`}
                                        onClick={() => setSelectedSegment(seg.id)}
                                    >
                                        <div className="seg-info">
                                            <span className="seg-name">{seg.name}</span>
                                            <span className="seg-criteria">{seg.criteria}</span>
                                        </div>
                                        <div className="seg-count">
                                            <Users size={12} /> {seg.count}
                                        </div>
                                    </div>
                                ))}
                                <button className="btn-create-seg">
                                    + Create New Segment
                                </button>
                            </div>
                        ) : (
                            <div
                                className="upload-area"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleFileDrop}
                            >
                                {csvFile ? (
                                    <div className="file-preview">
                                        <FileText size={32} color="#4ade80" />
                                        <div className="file-info">
                                            <p className="file-name">{csvFile.name}</p>
                                            <p className="file-size">{(csvFile.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                        <button onClick={() => setCsvFile(null)} className="btn-remove">
                                            <XCircle size={18} />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <UploadCloud size={48} className="upload-icon" />
                                        <h3>Drag & Drop CSV File</h3>
                                        <p>or click to browse</p>
                                        <span className="helper-text">Expected format: player_id, amount (optional)</span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN: Configuration */}
                <div className="config-panel">
                    <div className="glass-panel form-panel">
                        <h3>Award Configuration</h3>

                        <div className="form-group">
                            <label>Award Type</label>
                            <div className="type-grid">
                                <button
                                    className={`type-card ${awardType === 'bonus' ? 'active' : ''}`}
                                    onClick={() => setAwardType('bonus')}
                                >
                                    <Gift size={24} />
                                    <span>Bonus Cash</span>
                                </button>
                                <button
                                    className={`type-card ${awardType === 'freebet' ? 'active' : ''}`}
                                    onClick={() => setAwardType('freebet')}
                                >
                                    <FileText size={24} />
                                    <span>Free Bet</span>
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Amount (€)</label>
                            <div className="amount-input">
                                <span>€</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="summary-box">
                            <div className="row">
                                <span>Target:</span>
                                <span className="val">
                                    {activeTab === 'segment'
                                        ? (selectedSegment ? PRESET_SEGMENTS.find(s => s.id === selectedSegment)?.name : 'None Selected')
                                        : (csvFile ? csvFile.name : 'No File')
                                    }
                                </span>
                            </div>
                            <div className="row">
                                <span>Est. Cost:</span>
                                <span className="val text-yellow">
                                    {activeTab === 'segment' && selectedSegment
                                        ? `€${(PRESET_SEGMENTS.find(s => s.id === selectedSegment)?.count || 0) * amount}`
                                        : '---'
                                    }
                                </span>
                            </div>
                        </div>

                        <button
                            className="btn-award"
                            disabled={(activeTab === 'segment' && !selectedSegment) || (activeTab === 'csv' && !csvFile) || isProcessing}
                            onClick={handleAward}
                        >
                            {isProcessing ? 'Processing...' : 'Confirm Award'}
                        </button>

                        {successMsg && (
                            <div className="success-banner">
                                <CheckCircle2 size={16} /> {successMsg}
                            </div>
                        )}
                    </div>

                    {/* Preview List (Mock) */}
                    <div className="glass-panel preview-panel">
                        <div className="panel-header">
                            <h3>Sample Recipients</h3>
                            <span className="badge">5 Random</span>
                        </div>
                        <div className="player-list">
                            {MOCK_PLAYERS.map(p => (
                                <div key={p.id} className="player-row">
                                    <div className="p-avatar">{p.username.charAt(0)}</div>
                                    <div className="p-info">
                                        <div className="p-name">{p.username}</div>
                                        <div className="p-id">{p.id}</div>
                                    </div>
                                    <div className={`p-status ${p.status}`}>{p.status}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .manual-award-container {
             max-width: 1200px;
            margin: 0 auto;
            padding: 24px;
            color: #fff;
        }
        .page-header { margin-bottom: 32px; }
        .page-title { font-size: 28px; font-weight: 700; margin: 0 0 8px 0; }
        .page-subtitle { color: var(--color-text-secondary); margin: 0; font-size: 14px; }

        .grid-layout { 
            display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 24px; 
            align-items: start;
        }

        .glass-panel {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px;
            backdrop-filter: blur(10px);
        }

        /* Tabs */
        .tabs { display: flex; gap: 12px; margin-bottom: 16px; }
        .tab-btn {
            background: transparent; border: none; color: var(--color-text-secondary);
            font-size: 14px; font-weight: 600; cursor: pointer;
            display: flex; align-items: center; gap: 8px;
            padding: 8px 16px; border-radius: 8px;
            transition: all 0.2s;
        }
        .tab-btn.active { background: rgba(255,255,255,0.1); color: #fff; }
        .tab-btn:hover { color: #fff; }

        /* Selection Panel */
        .selection-panel .panel-content { min-height: 400px; padding: 20px; }
        
        .search-box {
            display: flex; align-items: center; gap: 8px;
            background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);
            padding: 10px 12px; border-radius: 8px; margin-bottom: 16px;
        }
        .search-box input { background: transparent; border: none; color: #fff; font-size: 13px; width: 100%; outline: none; }
        .text-secondary { color: var(--color-text-secondary); }

        .segment-item {
            padding: 12px; border-radius: 8px;
            background: rgba(255,255,255,0.02); border: 1px solid transparent;
            margin-bottom: 8px; cursor: pointer;
            display: flex; justify-content: space-between; align-items: center;
            transition: all 0.2s;
        }
        .segment-item:hover { background: rgba(255,255,255,0.05); }
        .segment-item.selected { 
            background: rgba(242, 214, 65, 0.1); 
            border-color: rgba(242, 214, 65, 0.4); 
        }

        .seg-name { font-weight: 600; font-size: 13px; display: block; margin-bottom: 2px; }
        .seg-criteria { font-size: 11px; color: var(--color-text-secondary); font-family: monospace; }
        .seg-count { font-size: 12px; color: var(--color-text-secondary); display: flex; align-items: center; gap: 4px; }

        .btn-create-seg {
            width: 100%; padding: 12px; margin-top: 16px;
            background: transparent; border: 1px dashed rgba(255,255,255,0.2);
            color: var(--color-text-secondary); border-radius: 8px;
            cursor: pointer; font-size: 13px;
        }
        .btn-create-seg:hover { border-color: #fff; color: #fff; }

        /* Uplpad Area */
        .upload-area {
            height: 360px; border: 2px dashed rgba(255,255,255,0.1);
            border-radius: 8px; display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            color: var(--color-text-secondary);
            margin-top: 20px;
        }
        .upload-icon { margin-bottom: 16px; opacity: 0.5; }
        .upload-area h3 { color: #fff; margin: 0 0 4px 0; font-size: 16px; }
        .helper-text { font-size: 11px; margin-top: 12px; opacity: 0.6; }

        .file-preview { text-align: center; }
        .file-name { color: #fff; font-weight: 600; margin: 8px 0 2px 0; }
        .btn-remove { background: transparent; border: none; color: #f87171; cursor: pointer; margin-top: 12px; }

        /* Config Panel */
        .config-panel { display: flex; flex-direction: column; gap: 24px; }
        .form-panel { padding: 24px; }
        .form-panel h3 { margin: 0 0 20px 0; font-size: 16px; font-weight: 600; }

        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; font-size: 11px; text-transform: uppercase; color: var(--color-text-secondary); margin-bottom: 8px; letter-spacing: 0.5px; }

        .type-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .type-card {
            background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px; padding: 16px; cursor: pointer;
            display: flex; flex-direction: column; align-items: center; gap: 8px;
            color: var(--color-text-secondary); transition: all 0.2s;
        }
        .type-card.active { 
            background: rgba(242, 214, 65, 0.1); 
            border-color: #F2D641; 
            color: #F2D641; 
        }
        .type-card span { font-size: 12px; font-weight: 600; }

        .amount-input {
            display: flex; align-items: center; 
            background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px; padding: 0 12px;
        }
        .amount-input input {
            background: transparent; border: none; padding: 12px;
            color: #fff; flex: 1; font-size: 16px; outline: none;
        }

        .summary-box {
            background: rgba(255,255,255,0.03); border-radius: 8px; padding: 12px;
            margin-bottom: 20px;
        }
        .row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px; }
        .val { font-weight: 600; }
        .text-yellow { color: #F2D641; }

        .btn-award {
            width: 100%; padding: 14px; border: none; border-radius: 8px;
            background: var(--color-betika-yellow); color: #000;
            font-weight: 700; font-size: 14px; cursor: pointer;
            transition: all 0.2s;
        }
        .btn-award:disabled { opacity: 0.5; cursor: not-allowed; filter: grayscale(1); }
        .btn-award:hover:not(:disabled) { transform: translateY(-1px); }

        .success-banner {
            margin-top: 16px; background: rgba(74, 222, 128, 0.1); color: #4ade80;
            padding: 10px; border-radius: 6px; font-size: 13px; display: flex; align-items: center; gap: 8px;
        }

        /* Preview Panel */
        .preview-panel { padding: 0; }
        .preview-panel .panel-header {
             padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.08);
             display: flex; justify-content: space-between; align-items: center;
        }
        .preview-panel h3 { margin: 0; font-size: 14px; font-weight: 600; }
        .badge { font-size: 10px; background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; }

        .player-list { padding: 10px; }
        .player-row {
            display: flex; align-items: center; gap: 10px;
            padding: 8px 10px; border-radius: 6px;
            border-bottom: 1px solid rgba(255,255,255,0.02);
        }
        .p-avatar {
            width: 28px; height: 28px; border-radius: 50%;
            background: #333; display: flex; align-items: center; justify-content: center;
            font-size: 12px; font-weight: 700; color: #aaa;
        }
        .p-info { flex: 1; }
        .p-name { font-size: 12px; font-weight: 500; }
        .p-id { font-size: 10px; color: var(--color-text-secondary); }
        .p-status { font-size: 10px; text-transform: uppercase; font-weight: 700; }
        .p-status.active { color: #4ade80; }
        .p-status.suspended { color: #f87171; }
      `}</style>
        </div>
    );
}
