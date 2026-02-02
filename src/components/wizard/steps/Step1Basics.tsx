'use client';
import { Type, AlignLeft, Tag } from 'lucide-react';

export default function StepBasics() {
    return (
        <div className="step-container">
            <div className="glass-panel form-panel">
                <h2 className="panel-title">Basic Information</h2>
                <div className="input-group">
                    <label>Promotion Name</label>
                    <div className="input-wrapper">
                        <Type size={18} className="icon" />
                        <input type="text" placeholder="e.g. Welcome Bonus 2024" className="form-input" defaultValue="Super League Welcome" />
                    </div>
                </div>

                <div className="input-group">
                    <label>Description (Internal)</label>
                    <div className="input-wrapper">
                        <AlignLeft size={18} className="icon" />
                        <textarea placeholder="Description for internal team..." className="form-input" rows={3}></textarea>
                    </div>
                </div>

                <div className="input-group">
                    <label>Promotion Type</label>
                    <div className="type-grid">
                        <div className="type-card active">
                            <span className="type-icon">💰</span>
                            <span className="type-name">Deposit Match</span>
                        </div>
                        <div className="type-card">
                            <span className="type-icon">🎰</span>
                            <span className="type-name">Free Spins</span>
                        </div>
                        <div className="type-card">
                            <span className="type-icon">💸</span>
                            <span className="type-name">Cashback</span>
                        </div>
                        <div className="type-card">
                            <span className="type-icon">🏆</span>
                            <span className="type-name">Tournament</span>
                        </div>
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
                .panel-title { font-size: 20px; margin-bottom: 32px; font-weight: 700; }

                .input-group { margin-bottom: 24px; }
                .input-group label { display: block; margin-bottom: 8px; color: var(--color-text-secondary); font-size: 14px; }
                
                .input-wrapper {
                    position: relative;
                    background: rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                }
                .icon { margin-left: 12px; color: var(--color-text-muted); }
                .form-input {
                    background: transparent;
                    border: none;
                    color: #fff;
                    width: 100%;
                    padding: 12px 12px 12px 12px;
                    outline: none;
                    font-size: 14px;
                    font-family: inherit;
                }
                .input-wrapper:focus-within { border-color: var(--color-betika-yellow); }

                .type-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
                .type-card {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .type-card:hover { background: rgba(255,255,255,0.1); }
                .type-card.active {
                    background: rgba(242, 214, 65, 0.1);
                    border-color: var(--color-betika-yellow);
                    color: var(--color-betika-yellow);
                }
                .type-icon { font-size: 24px; }
                .type-name { font-size: 13px; font-weight: 600; }
            `}</style>
        </div>
    )
}
