'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Gift, Users, Calendar, Wallet, Edit } from 'lucide-react';
import Link from 'next/link';

export default function PromotionDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [promo, setPromo] = useState<any>(null);

    useEffect(() => {
        // Find promo in local storage
        const saved = JSON.parse(localStorage.getItem('saved_promotions') || '[]');
        const found = saved.find((p: any) => String(p.id) === String(params.id));

        if (found) {
            // Merge found promo with defaults for robust rendering
            setPromo({
                segment: 'Sportsbook Players',
                rules: 'Min 6 Selections, 1 Loss, Stake > 5 ETB',
                reward: '100% - 200% Stake Back (Capped at 100k)',
                market: 'ET',
                stats: { claims: 0, cost: '-', conversion: '-' },
                period: 'Active',
                ...found,
            });
        } else {
            // Fallback for demo if ID doesn't match perfectly or direct link
            if (params.id === 'PRM-2024-001') {
                setPromo({
                    id: 'PRM-2024-001',
                    name: 'Ethiopia Acca Insurance',
                    type: 'Cashback',
                    status: 'active',
                    market: 'ET',
                    segment: 'Sportsbook Players',
                    rules: 'Min 6 Selections, 1 Loss, Stake > 5 ETB',
                    reward: '100% - 200% Stake Back (Capped at 100k)',
                    period: 'Feb 1 - Ongoing'
                });
            }
        }
    }, [params.id]);

    if (!promo) return <div className="p-12 text-center text-muted">Loading promotion details...</div>;

    return (
        <div className="details-page">
            <div className="page-header">
                <button onClick={() => router.back()} className="back-btn"><ArrowLeft size={18} /> Back to List</button>
                <div className="header-content">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="page-title">{promo.name}</h1>
                            <span className={`status-badge ${promo.status.toLowerCase()}`}>{promo.status}</span>
                        </div>
                        <p className="page-subtitle">ID: {promo.id} • {promo.type} • {promo.market || 'All Markets'}</p>
                    </div>
                    <button className="btn btn-primary"><Edit size={16} /> Edit Configuration</button>
                </div>
            </div>

            <div className="details-grid">
                {/* Main Info */}
                <div className="glass-panel main-panel">
                    <h3 className="panel-title">Configuration Summary</h3>

                    <div className="summary-section">
                        <h4>Targeting</h4>
                        <div className="data-row">
                            <span className="label">Audience Segment</span>
                            <span className="value">{promo.segment}</span>
                        </div>
                        <div className="data-row">
                            <span className="label">Markets</span>
                            <span className="value">{promo.market === 'ET' ? '🇪🇹 Ethiopia' : '🇰🇪 Kenya (Default)'}</span>
                        </div>
                    </div>

                    <div className="divider" />

                    <div className="summary-section">
                        <h4>Mechanics</h4>
                        <div className="rule-box">
                            {promo.name.includes('Acca') ? (
                                <>
                                    <div className="rule-line">IF <span className="text-cyan">Selections ≥ 6</span></div>
                                    <div className="rule-line">AND <span className="text-purple">Losing Selections = 1</span></div>
                                    <div className="rule-line">AND <span className="text-yellow">Stake ≥ 5 ETB</span></div>
                                </>
                            ) : (
                                <>
                                    <div className="rule-line">IF <span className="text-cyan">Deposit {'>'} 100</span></div>
                                    <div className="rule-line">AND <span className="text-purple">Is First Deposit = True</span></div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="divider" />

                    <div className="summary-section">
                        <h4>Rewards</h4>
                        <div className="reward-card">
                            <Gift size={20} className="text-yellow" />
                            <div>
                                <div className="reward-title">{promo.reward || 'Tiered Cashback'}</div>
                                <div className="reward-sub text-muted">{promo.name.includes('Acca') ? 'Max Cap: 100,000 ETB' : 'Standard Wager x35'}</div>
                            </div>
                        </div>
                    </div>

                    <div className="divider" />

                    <div className="summary-section">
                        <h4>Creative & Legal</h4>
                        {promo.bannerImage && (
                            <div className="banner-preview mb-4">
                                <img src={promo.bannerImage} alt="Promotion Banner" className="w-full rounded-lg" />
                            </div>
                        )}
                        <div className="tnc-box">
                            <h5>Terms & Conditions</h5>
                            <p>{promo.termsAndConditions || 'Standard promotional terms apply.'}</p>
                        </div>
                    </div>

                </div>

                {/* Sidebar Stats */}
                <div className="side-column">
                    <div className="glass-panel stat-panel">
                        <Users size={20} className="mb-2 text-cyan" />
                        <div className="stat-value">{promo.stats?.claims || 0}</div>
                        <div className="stat-label">Total Claims</div>
                    </div>
                    <div className="glass-panel stat-panel">
                        <Wallet size={20} className="mb-2 text-purple" />
                        <div className="stat-value">{promo.stats?.cost || '-'}</div>
                        <div className="stat-label">Total Cost</div>
                    </div>
                    <div className="glass-panel stat-panel">
                        <Calendar size={20} className="mb-2 text-muted" />
                        <div className="stat-value text-sm">{promo.period}</div>
                        <div className="stat-label">Duration</div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .details-page { max-width: 1200px; margin: 0 auto; padding-bottom: 40px; }
                
                .back-btn { background: transparent; border: none; color: #888; display: flex; align-items: center; gap: 8px; cursor: pointer; margin-bottom: 16px; font-size: 13px; }
                .back-btn:hover { color: #fff; }

                .page-header { margin-bottom: 32px; }
                .header-content { display: flex; justify-content: space-between; align-items: flex-start; }
                .page-title { font-size: 28px; font-weight: 700; margin: 0; color: #fff; }
                .page-subtitle { font-size: 14px; color: #888; margin-top: 4px; font-family: monospace; }

                .status-badge { font-size: 11px; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; font-weight: 700; border: 1px solid currentColor; }
                .status-badge.active { color: var(--color-betika-green); background: rgba(105, 153, 81, 0.2); }
                .status-badge.paused { color: #facc15; background: rgba(250, 204, 21, 0.2); }

                .details-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
                
                .glass-panel { background: rgba(22, 22, 34, 0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px; }
                .panel-title { font-size: 16px; font-weight: 600; margin: 0 0 24px 0; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 16px; }

                .summary-section h4 { font-size: 12px; color: #666; text-transform: uppercase; margin-bottom: 12px; }
                .data-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; }
                .label { color: #888; }
                .value { color: #fff; font-weight: 500; }

                .divider { height: 1px; background: rgba(255,255,255,0.05); margin: 24px 0; }

                .rule-box { background: rgba(0,0,0,0.3); padding: 16px; border-radius: 8px; font-family: monospace; font-size: 13px; color: #ccc; }
                .rule-line { margin-bottom: 4px; }
                .text-cyan { color: #06b6d4; }
                .text-purple { color: #a855f7; }
                .text-yellow { color: #facc15; }

                .reward-card { display: flex; gap: 12px; align-items: center; background: rgba(255,255,255,0.03); padding: 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); }
                .reward-title { font-weight: 700; color: #fff; font-size: 14px; }
                .reward-sub { font-size: 12px; color: #888; }

                .side-column { display: flex; flex-direction: column; gap: 16px; }
                .stat-panel { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 32px; text-align: center; }
                .stat-value { font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 4px; }
                .stat-label { font-size: 12px; color: #666; text-transform: uppercase; }
                .text-sm { font-size: 16px; }
                .flex { display: flex; }
                .items-center { align-items: center; }
                .gap-3 { gap: 12px; }

                .banner-preview { margin-bottom: 24px; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
                .banner-preview img { width: 100%; height: auto; display: block; }
                
                .tnc-box { background: rgba(255,255,255,0.03); padding: 16px; border-radius: 8px; border: left: 2px solid var(--color-betika-yellow); }
                .tnc-box h5 { margin: 0 0 8px 0; font-size: 13px; color: #ccc; font-weight: 600; text-transform: uppercase; }
                .tnc-box p { margin: 0; font-size: 13px; color: #888; line-height: 1.5; white-space: pre-wrap; }
            `}</style>
        </div>
    );
}
