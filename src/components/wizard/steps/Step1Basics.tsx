'use client';
import { Type, AlignLeft, Tag } from 'lucide-react';
import { useWizardContext } from '@/context/WizardContext';

export default function StepBasics() {
    const { state, updateBasics } = useWizardContext();
    const { name, description, type } = state.basics;


    const PROMOTION_TYPES = [
        { id: 'welcome', icon: '👋', label: 'Welcome Bonus', desc: 'For new users on signup or first deposit' },
        { id: 'deposit_match', icon: '💰', label: 'Deposit Match', desc: 'Extra funds matched to a deposit' },
        { id: 'risk_free', icon: '🛡️', label: 'Risk-Free Bet', desc: 'Stake refunded if the bet loses' },
        { id: 'cashback', icon: '💸', label: 'Cashback', desc: 'Percentage of losses returned' },
        { id: 'odds_boost', icon: '🚀', label: 'Odds Boost', desc: 'Enhanced odds on selected events' },
        { id: 'accumulator', icon: '⚡', label: 'Multi Bonus', desc: 'Bonus for placing combo bets' },
        { id: 'happy_hour', icon: '⏰', label: 'Happy Hour', desc: 'Limited-time offers' },
        { id: 'loyalty', icon: '👑', label: 'Loyalty / VIP', desc: 'Tier-based rewards for frequent players' },
        { id: 'referral', icon: '🤝', label: 'Referral Bonus', desc: 'Rewards for inviting friends' },
        { id: 'reload', icon: '🔄', label: 'Reload Bonus', desc: 'Bonus on subsequent deposits' },
        { id: 'jackpot', icon: '🎰', label: 'Jackpot', desc: 'Fixed or progressive jackpots' },
        { id: 'bet_get', icon: '🎁', label: 'Bet & Get', desc: 'Place a bet to receive a free one' },
    ];

    return (
        <div className="step-container">
            <div className="glass-panel form-panel">
                <h2 className="panel-title">Basic Information</h2>
                <div className="input-group">
                    <label>Promotion Name</label>
                    <div className="input-wrapper">
                        <Type size={18} className="icon" />
                        <input
                            type="text"
                            placeholder="e.g. Welcome Bonus 2024"
                            className="form-input"
                            value={name}
                            onChange={(e) => updateBasics({ name: e.target.value })}
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label>Description (Internal)</label>
                    <div className="input-wrapper">
                        <AlignLeft size={18} className="icon" />
                        <textarea
                            placeholder="Description for internal team..."
                            className="form-input"
                            rows={3}
                            value={description}
                            onChange={(e) => updateBasics({ description: e.target.value })}
                        ></textarea>
                    </div>
                </div>

                <div className="input-group">
                    <label>Promotion Type</label>
                    <div className="type-grid">
                        {PROMOTION_TYPES.map((t) => (
                            <div
                                key={t.id}
                                className={`type-card ${type === t.id ? 'active' : ''}`}
                                onClick={() => updateBasics({ type: t.id })}
                            >
                                <span className="type-icon">{t.icon}</span>
                                <span className="type-name">{t.label}</span>
                                <div className="type-desc">{t.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="input-group">
                    <label>Tags</label>
                    <div className="input-wrapper">
                        <Tag size={18} className="icon" />
                        <input type="text" placeholder="Add tags..." className="form-input" />
                    </div>
                </div>
            </div>

            <style jsx>{`
                .step-container { max-width: 800px; margin: 0 auto; animation: slideIn 0.3s ease-out; }
                @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                .form-panel { padding: 40px; }
                .panel-title { font-size: 20px; margin-bottom: 32px; font-weight: 700; color: var(--color-text-primary); }

                .input-group { margin-bottom: 24px; }
                .input-group label { display: block; margin-bottom: 8px; color: var(--color-text-secondary); font-size: 14px; }
                
                .input-wrapper {
                    position: relative;
                    background: var(--color-bg-input);
                    border: 1px solid var(--color-border);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                }
                .icon { margin-left: 12px; color: var(--color-text-muted); }
                .form-input {
                    background: transparent;
                    border: none;
                    color: var(--color-text-primary);
                    width: 100%;
                    padding: 12px 12px 12px 12px;
                    outline: none;
                    font-size: 14px;
                    font-family: inherit;
                }
                .input-wrapper:focus-within { border-color: var(--color-betika-yellow); }

                .type-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
                .type-card {
                    background: var(--color-bg-card);
                    border: 1px solid var(--color-border);
                    border-radius: 12px;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                    position: relative;
                    overflow: hidden;
                    text-align: center;
                }
                .type-card:hover { background: var(--color-bg-input-focus); }
                .type-card.active {
                    background: rgba(242, 214, 65, 0.1);
                    border-color: var(--color-betika-yellow);
                    color: var(--color-betika-yellow);
                }
                .type-icon { font-size: 24px; }
                .type-name { font-size: 13px; font-weight: 600; }
                
                .type-desc {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.9);
                    backdrop-filter: blur(4px);
                    color: #fff;
                    font-size: 12px;
                    padding: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.2s;
                    line-height: 1.3;
                    font-weight: 500;
                }
                .type-card:hover .type-desc { opacity: 1; }
            `}</style>
        </div>
    )
}
