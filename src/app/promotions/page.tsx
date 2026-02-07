'use client';
import Link from 'next/link';
import {
    Plus, Search, Filter, MoreVertical,
    Calendar, CheckCircle2, AlertCircle, Clock,
    PlayCircle, PauseCircle, ChevronLeft, ChevronRight,
    TrendingUp, Users, RefreshCw, Edit, Trash2, Eye, Copy
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Default seeds if empty
const SEED_PROMOTIONS = [
    {
        id: 'PRM-2024-001',
        name: 'Ethiopia Acca Insurance',
        type: 'Cashback',
        status: 'active',
        segment: 'Sportsbook Players',
        stats: { claims: 1240, cost: 'ETB 124,000', conversion: '12%' },
        period: 'Feb 1 - Ongoing'
    },
    {
        id: 'PRM-2024-002',
        name: 'Cashia Launch Cashback',
        type: 'Deposit Match',
        status: 'active',
        segment: 'New Users',
        stats: { claims: 342, cost: '€3,400', conversion: '15%' },
        period: 'Feb 1 - Feb 28'
    },
    {
        id: 'PRM-2024-003',
        name: 'Super League Welcome Bonus',
        type: 'Deposit Match',
        status: 'paused',
        segment: 'New Users',
        stats: { claims: 850, cost: '€8,500', conversion: '8%' },
        period: 'Mar 1 - Mar 31'
    }
];

export default function PromotionsList() {
    const [promotions, setPromotions] = useState<any[]>([]);
    const [filter, setFilter] = useState('all');
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    useEffect(() => {
        // Load from local storage or seed
        const saved = JSON.parse(localStorage.getItem('saved_promotions') || '[]');

        let allPromos = [];
        if (saved.length > 0) {
            // Merge saved with seeds if needed, or just use saved. 
            // For this demo, let's prefer 'saved' but ensure our target seeds exist if not present.
            const savedIds = new Set(saved.map((p: any) => p.name));
            const missingSeeds = SEED_PROMOTIONS.filter(s => !savedIds.has(s.name));
            allPromos = [...saved, ...missingSeeds];
        } else {
            allPromos = SEED_PROMOTIONS;
            localStorage.setItem('saved_promotions', JSON.stringify(SEED_PROMOTIONS));
        }

        // Ensure stats exist on saved items if they were simple objects
        allPromos = allPromos.map(p => ({
            ...p,
            stats: p.stats || { claims: 0, cost: '-', conversion: '-' },
            segment: p.segment || 'All Players',
            period: p.period || 'Scheduled'
        }));

        setPromotions(allPromos);
    }, []);

    const filteredPromotions = promotions.filter(p => {
        if (filter === 'all') return true;
        return p.status.toLowerCase() === filter;
    });

    const toggleMenu = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveMenuId(activeMenuId === id ? null : id);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setActiveMenuId(null);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="page-container">
            {/* 1. Header & Actions */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Promotions</h1>
                    <p className="page-subtitle">Manage and track your campaign performance.</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary icon-only"><RefreshCw size={18} /></button>
                    <Link href="/promotions/create" className="btn btn-primary btn-new-promo">
                        <Plus size={18} /> New Promotion
                    </Link>
                </div>
            </div>

            {/* 2. Filters & Toolbar */}
            <div className="toolbar glass-panel">
                <div className="search-group">
                    <Search size={18} className="search-icon" />
                    <input type="text" placeholder="Search promotions..." className="search-input" />
                </div>

                <div className="filter-group">
                    <div className="tabs">
                        <button className={`tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
                        <button className={`tab ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Active</button>
                        <button className={`tab ${filter === 'scheduled' ? 'active' : ''}`} onClick={() => setFilter('scheduled')}>Scheduled</button>
                        <button className={`tab ${filter === 'draft' ? 'active' : ''}`} onClick={() => setFilter('draft')}>Drafts</button>
                    </div>
                    <div className="divider" />
                    <button className="btn btn-secondary btn-sm"><Filter size={14} /> Filters</button>
                </div>
            </div>

            {/* 3. Data Grid */}
            <div className="grid-container glass-panel">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th style={{ width: '120px' }}>ID</th>
                            <th>Promotion Name</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Performance</th>
                            <th>Period</th>
                            <th style={{ width: '50px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPromotions.map((promo) => (
                            <tr key={promo.id}>
                                <td className="text-mono text-muted">{String(promo.id).substring(0, 12)}...</td>
                                <td>
                                    <div className="cell-primary">
                                        <Link href={`/promotions/${promo.id}`} className="cell-title hover-link">
                                            {promo.name}
                                        </Link>
                                        <span className="cell-subtitle">{promo.segment}</span>
                                    </div>
                                </td>
                                <td>
                                    <span className="type-badge">{promo.type}</span>
                                </td>
                                <td>
                                    <StatusBadge status={promo.status} />
                                </td>
                                <td>
                                    <div className="mini-stats">
                                        <span title="Claims"><Users size={12} /> {promo.stats?.claims || 0}</span>
                                        <span title="Cost"><TrendingUp size={12} /> {promo.stats?.cost || '-'}</span>
                                    </div>
                                </td>
                                <td className="text-secondary text-sm">
                                    <div className="flex-center gap-2">
                                        <Calendar size={14} /> {promo.period}
                                    </div>
                                </td>
                                <td className="relative">
                                    <button className="btn-icon" onClick={(e) => toggleMenu(e, promo.id)}>
                                        <MoreVertical size={16} />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {activeMenuId === promo.id && (
                                        <div className="action-menu">
                                            <Link href={`/promotions/${promo.id}`} className="menu-item">
                                                <Eye size={14} /> View Details
                                            </Link>
                                            <button className="menu-item"><Edit size={14} /> Edit Config</button>
                                            <button className="menu-item"><Copy size={14} /> Duplicate</button>
                                            <div className="menu-divider" />
                                            <button className="menu-item danger"><Trash2 size={14} /> Deactivate</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Footer */}
                <div className="grid-footer">
                    <div className="rows-selector">
                        <span>Rows per page:</span>
                        <select><option>10</option><option>25</option></select>
                    </div>
                    <div className="pagination">
                        <span className="page-info">1-{filteredPromotions.length} of {filteredPromotions.length}</span>
                        <div className="page-controls">
                            <button className="page-btn disabled"><ChevronLeft size={16} /></button>
                            <button className="page-btn"><ChevronRight size={16} /></button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .page-container {
            max-width: 1400px;
            margin: 0 auto;
        }

        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 24px;
        }
        .page-title {
            font-size: 28px;
            font-weight: 700;
            color: #fff;
            margin: 0 0 4px 0;
        }
        .page-subtitle {
            font-size: 14px;
            color: var(--color-text-secondary);
            margin: 0;
        }
        .header-actions {
            display: flex;
            gap: 12px;
        }
        .icon-only { padding: 12px; }

        /* Toolbar */
        .toolbar {
            display: flex;
            justify-content: space-between;
            padding: 16px;
            margin-bottom: 24px;
        }
        .search-group {
            position: relative;
            width: 320px;
            display: flex;
            align-items: center;
            gap: 12px;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px;
            padding: 8px 12px;
            transition: border-color 0.2s;
        }
        .search-group:focus-within { border-color: var(--color-accent-purple); }
        .search-icon {
            color: var(--color-text-secondary);
            flex-shrink: 0;
        }
        .search-input {
            flex: 1;
            background: transparent;
            border: none;
            color: #fff;
            padding: 0;
            outline: none;
            min-width: 0;
        }
        .search-input:focus { border-color: var(--color-accent-purple); }

        .filter-group {
            display: flex;
            align-items: center;
            gap: 16px;
        }
        .tabs {
            display: flex;
            background: rgba(0,0,0,0.3);
            padding: 4px;
            border-radius: 8px;
        }
        .tab {
            background: transparent;
            border: none;
            color: var(--color-text-secondary);
            padding: 6px 16px;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.2s;
        }
        .tab.active {
            background: #2a2a35;
            color: #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .divider { width: 1px; height: 24px; background: rgba(255,255,255,0.1); }
        .btn-sm { padding: 8px 16px; font-size: 13px; min-height: 36px; }

        /* Data Grid */
        .grid-container {
            overflow: visible;
            display: flex;
            flex-direction: column;
            min-height: 400px;
        }
        .data-table {
            width: 100%;
            border-collapse: collapse;
        }
        .data-table th {
            text-align: left;
            padding: 16px 24px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            color: var(--color-text-muted);
            border-bottom: 1px solid rgba(255,255,255,0.08);
            background: rgba(0,0,0,0.2);
        }
        .data-table td {
            padding: 16px 24px;
            border-bottom: 1px solid rgba(255,255,255,0.04);
            font-size: 14px;
            color: var(--color-text-secondary);
            vertical-align: middle;
        }
        .data-table tr:hover td {
            background: rgba(255,255,255,0.02);
            color: #fff;
        }
        .data-table tr:last-child td { border-bottom: none; }

        /* Grid Cells */
        .text-mono { font-family: 'Fira Code', monospace; font-size: 12px; }
        .text-muted { color: var(--color-text-muted); }
        .text-sm { font-size: 13px; }
        
        .cell-primary { display: flex; flex-direction: column; }
        .cell-title { color: #fff; font-weight: 500; margin-bottom: 2px; }
        .cell-subtitle { font-size: 11px; color: var(--color-text-muted); }

        .type-badge {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            color: #fff;
        }

        .mini-stats { display: flex; gap: 12px; font-size: 12px; color: var(--color-text-muted); }
        .mini-stats span { display: flex; align-items: center; gap: 4px; }
        
        .flex-center { display: flex; align-items: center; }
        .gap-2 { gap: 8px; }
        
        .relative { position: relative; }

        .btn-icon {
            background: transparent;
            border: none;
            color: var(--color-text-muted);
            cursor: pointer;
            padding: 6px;
            border-radius: 4px;
        }
        .btn-icon:hover { background: rgba(255,255,255,0.1); color: #fff; }

        /* Action Menu */
        .action-menu {
            position: absolute;
            right: 0;
            top: 100%;
            width: 160px;
            background: #1a1a24;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px;
            padding: 6px;
            z-index: 50;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            animation: fadeIn 0.1s;
        }
        .menu-item {
            width: 100%;
            text-align: left;
            background: transparent;
            border: none;
            color: #ccc;
            padding: 8px 12px;
            font-size: 13px;
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            border-radius: 4px;
        }
        .menu-item:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .menu-item.danger { color: #f87171; }
        .menu-item.danger:hover { background: rgba(248,113,113,0.1); }
        .menu-divider { height: 1px; background: rgba(255,255,255,0.05); margin: 4px 0; }

        /* Footer */
        .grid-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 24px;
            border-top: 1px solid rgba(255,255,255,0.08);
            background: rgba(0,0,0,0.2);
            margin-top: auto;
        }
        .rows-selector { font-size: 13px; color: var(--color-text-muted); display: flex; gap: 8px; align-items: center; }
        .rows-selector select { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; padding: 2px 6px; }
        
        .pagination { display: flex; align-items: center; gap: 16px; }
        .page-info { font-size: 13px; color: var(--color-text-muted); }
        .page-controls { display: flex; gap: 4px; }
        .page-btn {
            background: transparent;
            border: 1px solid rgba(255,255,255,0.1);
            color: #fff;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            cursor: pointer;
        }
        .page-btn.disabled { opacity: 0.5; cursor: not-allowed; }
        .page-btn:not(.disabled):hover { background: rgba(255,255,255,0.1); }

        /* Button Consistency: Ghost Yellow Style (Global due to Link component scoping issues) */
        :global(.btn-new-promo) {
            background: transparent !important;
            color: var(--color-betika-yellow) !important;
            border: 1px solid var(--color-betika-yellow) !important;
            transition: all 0.2s;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        :global(.btn-new-promo:hover) {
            background: var(--color-betika-yellow) !important;
            color: #000 !important;
            box-shadow: 0 0 10px rgba(242, 214, 65, 0.3);
        }
      `}</style>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const s = status ? status.toLowerCase() : 'draft';
    const config = {
        active: { color: 'var(--color-betika-green)', icon: PlayCircle, label: 'Active', bg: 'rgba(105, 153, 81, 0.2)' },
        paused: { color: '#F2D641', icon: PauseCircle, label: 'Paused', bg: 'rgba(242, 214, 65, 0.2)' },
        draft: { color: '#94a3b8', icon: AlertCircle, label: 'Draft', bg: 'rgba(148, 163, 184, 0.2)' },
        scheduled: { color: 'var(--color-accent-cyan)', icon: Clock, label: 'Scheduled', bg: 'rgba(6, 182, 212, 0.2)' }
    }[s] || { color: '#fff', icon: AlertCircle, label: status, bg: 'rgba(255,255,255,0.1)' };

    const Icon = config.icon;

    return (
        <div className="status-badge" style={{ color: config.color, background: config.bg }}>
            <Icon size={12} />
            <span>{config.label}</span>
            <style jsx>{`
                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 10px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 600;
                    text-transform: uppercase;
                    border: 1px solid currentColor;
                }
            `}</style>
        </div>
    );
}
