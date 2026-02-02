'use client';
import { Image, Type, Flag, FileText, UploadCloud, Eye, Globe, MessageSquare, Send, Bell } from 'lucide-react';
import { useState } from 'react';

export default function StepDisplay() {
    const [activeTab, setActiveTab] = useState('display'); // display | communication
    const [smsEnabled, setSmsEnabled] = useState(true);
    const [pushEnabled, setPushEnabled] = useState(false);

    // Default Cashia Mock Data
    const [smsTemplate, setSmsTemplate] = useState("Congratulations! Kshs {{amount}} cashback credited for {{week}} via Cashia. Check your Wallet. Deposit Kshs 50+ to stay eligible for next week. T&Cs apply.");

    return (
        <div className="step-container">
            <div className="main-layout">
                {/* Left Column: Form */}
                <div className="glass-panel form-panel">
                    <div className="panel-header-row">
                        <h2 className="panel-title">Content Configuration</h2>
                        <div className="mode-toggle">
                            <button className={`mode-btn ${activeTab === 'display' ? 'active' : ''}`} onClick={() => setActiveTab('display')}>Display</button>
                            <button className={`mode-btn ${activeTab === 'communication' ? 'active' : ''}`} onClick={() => setActiveTab('communication')}>Communication</button>
                        </div>
                    </div>

                    {activeTab === 'display' ? (
                        <>
                            {/* 1. Assets */}
                            <div className="form-section">
                                <label className="section-label"><Image size={16} /> Visual Assets</label>
                                <div className="upload-area">
                                    <div className="upload-placeholder">
                                        <UploadCloud size={32} className="text-muted" />
                                        <span className="upload-text">Drop Hero Image here</span>
                                        <span className="upload-sub">1920x600 • Max 2MB</span>
                                    </div>
                                    <div className="preview-mini">
                                        <div className="mini-box" />
                                        <div className="mini-box" />
                                    </div>
                                </div>
                            </div>

                            {/* 2. Text Content */}
                            <div className="form-section">
                                <label className="section-label"><Type size={16} /> Public Content</label>
                                <div className="input-group">
                                    <label>Display Title (Public)</label>
                                    <input type="text" defaultValue="Cashia Launch Cashback" className="form-input" />
                                </div>
                                <div className="input-group">
                                    <label>Short Teaser</label>
                                    <textarea className="form-input" rows={2} defaultValue="Get up to 30% weekly cashback on your deposits with Cashia!"></textarea>
                                </div>
                            </div>

                            {/* 3. Badges */}
                            <div className="form-section">
                                <label className="section-label"><Flag size={16} /> Badges</label>
                                <div className="badge-selector">
                                    {['NEW', 'HOT', 'LIMITED', 'VIP'].map(badge => (
                                        <div key={badge} className={`badge-option ${badge === 'NEW' ? 'active' : ''}`}>
                                            {badge}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* COMMUNICATION TAB */}
                            <div className="form-section">
                                <label className="section-label"><MessageSquare size={16} /> Notification Channels</label>
                                <div className="channel-toggles">
                                    <div className={`channel-card ${smsEnabled ? 'active' : ''}`} onClick={() => setSmsEnabled(!smsEnabled)}>
                                        <div className="ch-icon"><MessageSquare size={18} /></div>
                                        <div className="ch-info">
                                            <h3>SMS</h3>
                                            <p>Instant text message</p>
                                        </div>
                                        <div className="toggle-switch">
                                            <div className="switch-knob" />
                                        </div>
                                    </div>
                                    <div className={`channel-card ${pushEnabled ? 'active' : ''}`} onClick={() => setPushEnabled(!pushEnabled)}>
                                        <div className="ch-icon"><Bell size={18} /></div>
                                        <div className="ch-info">
                                            <h3>Push Notification</h3>
                                            <p>App & Web Alert</p>
                                        </div>
                                        <div className="toggle-switch">
                                            <div className="switch-knob" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {smsEnabled && (
                                <div className="form-section animate-fade">
                                    <label className="section-label">SMS Template</label>
                                    <div className="template-editor">
                                        <div className="var-toolbar">
                                            <span>Insert Variable:</span>
                                            <button className="var-chip" onClick={() => setSmsTemplate(prev => prev + ' {{amount}}')}>Amount</button>
                                            <button className="var-chip" onClick={() => setSmsTemplate(prev => prev + ' {{week}}')}>Week</button>
                                            <button className="var-chip" onClick={() => setSmsTemplate(prev => prev + ' {{player_name}}')}>Player Name</button>
                                        </div>
                                        <textarea
                                            className="template-input"
                                            rows={4}
                                            value={smsTemplate}
                                            onChange={(e) => setSmsTemplate(e.target.value)}
                                        ></textarea>
                                        <div className="char-count">
                                            {smsTemplate.length} characters • 1 Segment
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Right Column: Live Preview */}
                <div className="preview-panel">
                    <div className="preview-header">
                        <h3 className="preview-title"><Eye size={16} /> Live Preview</h3>
                        <div className="device-toggles">
                            <button className="device-btn active">Mobile</button>
                        </div>
                    </div>

                    {/* Phone Mockup */}
                    <div className="phone-mockup">
                        <div className="phone-screen">
                            {/* App Header */}
                            <div className="app-header">
                                <div className="menu-burger" />
                                <div className="logo-placeholder" />
                            </div>

                            {activeTab === 'display' ? (
                                <div className="promo-card-preview">
                                    <div className="card-image-area">
                                        <div className="card-badge">NEW</div>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Cashia Launch Cashback</h4>
                                        <p className="card-desc">Get up to 30% weekly cashback on your deposits with Cashia! Limited time offer.</p>
                                        <button className="card-btn">Deposit Now</button>
                                    </div>
                                    <div className="card-footer">
                                        <span className="tnc-link">T&C Apply</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="notification-preview-list">
                                    <div className="notif-bubble">
                                        <div className="notif-header">
                                            <span className="app-name">MESSAGES</span>
                                            <span className="time">Now</span>
                                        </div>
                                        <div className="notif-body">
                                            {smsTemplate
                                                .replace('{{amount}}', '100')
                                                .replace('{{week}}', 'Week 1')
                                                .replace('{{player_name}}', 'John')
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="app-content-placeholder">
                                <div className="line long" />
                                <div className="line short" />
                                <div className="line medium" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .step-container { max-width: 1200px; margin: 0 auto; animation: slideIn 0.3s ease-out; }
                @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                .main-layout { display: grid; grid-template-columns: 3fr 2fr; gap: 32px; }

                .form-panel { padding: 40px; }
                .panel-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
                .panel-title { font-size: 20px; font-weight: 700; color: #fff; margin: 0; }
                
                .mode-toggle { background: rgba(255,255,255,0.05); padding: 4px; border-radius: 8px; display: flex; gap: 4px; }
                .mode-btn { background: transparent; border: none; padding: 6px 12px; font-size: 13px; color: #888; cursor: pointer; border-radius: 6px; font-weight: 500; transition: all 0.2s; }
                .mode-btn.active { background: #333; color: #fff; }

                .form-section { margin-bottom: 32px; }
                .section-label { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: var(--color-text-secondary); margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px; }

                /* Upload Area */
                .upload-area { display: flex; gap: 16px; }
                .upload-placeholder { flex: 1; border: 2px dashed rgba(255,255,255,0.1); border-radius: 12px; height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
                .upload-placeholder:hover { border-color: var(--color-accent-purple); background: rgba(168, 85, 247, 0.05); }
                .text-muted { color: var(--color-text-muted); margin-bottom: 8px; }
                .upload-text { font-size: 14px; font-weight: 500; color: #fff; }
                .upload-sub { font-size: 11px; color: var(--color-text-muted); }
                .preview-mini { display: flex; flex-direction: column; gap: 8px; }
                .mini-box { width: 60px; height: 56px; background: rgba(255,255,255,0.05); border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); }

                /* Text Inputs */
                .input-group { margin-bottom: 16px; }
                .input-group label { display: block; margin-bottom: 8px; font-size: 12px; color: var(--color-text-muted); }
                .form-input { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 12px; border-radius: 8px; font-family: inherit; font-size: 14px; }
                .form-input:focus { border-color: var(--color-accent-cyan); outline: none; }

                /* Badges */
                .badge-selector { display: flex; gap: 12px; }
                .badge-option { padding: 6px 16px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
                .badge-option:hover { background: rgba(255,255,255,0.1); }
                .badge-option.active { background: var(--color-betika-yellow); color: #000; border-color: var(--color-betika-yellow); }

                /* Communication Channel Cards */
                .channel-toggles { display: flex; flex-direction: column; gap: 12px; }
                .channel-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 16px; border-radius: 12px; display: flex; align-items: center; gap: 16px; cursor: pointer; transition: all 0.2s; }
                .channel-card:hover { background: rgba(255,255,255,0.06); }
                .channel-card.active { border-color: var(--color-accent-cyan); background: rgba(6, 182, 212, 0.05); }
                
                .ch-icon { width: 40px; height: 40px; border-radius: 8px; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: #fff; }
                .channel-card.active .ch-icon { background: var(--color-accent-cyan); color: #000; }
                
                .ch-info { flex: 1; }
                .ch-info h3 { margin: 0 0 2px 0; font-size: 14px; color: #fff; font-weight: 600; }
                .ch-info p { margin: 0; font-size: 12px; color: #666; }
                
                .toggle-switch { width: 44px; height: 24px; background: rgba(255,255,255,0.1); border-radius: 12px; padding: 2px; position: relative; transition: all 0.2s; }
                .switch-knob { width: 20px; height: 20px; background: #888; border-radius: 50%; transition: all 0.2s; }
                .channel-card.active .toggle-switch { background: rgba(6, 182, 212, 0.3); }
                .channel-card.active .switch-knob { transform: translateX(20px); background: var(--color-accent-cyan); }

                /* SMS Editor */
                .template-editor { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; overflow: hidden; }
                .var-toolbar { background: rgba(255,255,255,0.05); padding: 8px; display: flex; gap: 8px; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 12px; color: #888; }
                .var-chip { background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 4px; color: var(--color-accent-cyan); font-size: 11px; cursor: pointer; }
                .var-chip:hover { border-color: var(--color-accent-cyan); }
                
                .template-input { width: 100%; background: transparent; border: none; padding: 12px; color: #fff; font-family: monospace; font-size: 13px; outline: none; resize: vertical; }
                .char-count { padding: 4px 12px; font-size: 11px; color: #666; text-align: right; background: rgba(0,0,0,0.2); }

                .animate-fade { animation: fadeIn 0.3s ease; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

                /* Preview Panel */
                .preview-panel { display: flex; flex-direction: column; align-items: center; justify-self: center; width: 100%; }
                .preview-header { display: flex; justify-content: space-between; width: 100%; align-items: center; margin-bottom: 24px; max-width: 320px; }
                .preview-title { display: flex; gap: 8px; align-items: center; font-size: 14px; color: var(--color-text-secondary); }
                .device-toggles { display: flex; background: rgba(255,255,255,0.1); border-radius: 6px; padding: 2px; }
                .device-btn { background: transparent; border: none; font-size: 11px; padding: 4px 12px; color: var(--color-text-muted); cursor: pointer; border-radius: 4px; }
                .device-btn.active { background: var(--color-bg-app); color: #fff; }

                 .phone-mockup { width: 320px; height: 600px; background: #000; border-radius: 32px; border: 8px solid #1e1e24; position: relative; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
                .phone-screen { height: 100%; background: #111; padding: 16px; display: flex; flex-direction: column; }
                
                .app-header { display: flex; justify-content: space-between; margin-bottom: 24px; }
                .menu-burger { width: 24px; height: 16px; border-top: 2px solid #333; border-bottom: 2px solid #333; }
                .logo-placeholder { width: 80px; height: 20px; background: #333; border-radius: 4px; }

                /* Notification Preview */
                .notification-preview-list { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; }
                .notif-bubble { background: #222; border-radius: 12px; padding: 12px; border: 1px solid #333; box-shadow: 0 4px 10px rgba(0,0,0,0.3); }
                .notif-header { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 10px; color: #888; font-weight: 600; }
                .notif-body { font-size: 13px; color: #ddd; line-height: 1.4; }

                .promo-card-preview { background: #1a1a1a; border-radius: 12px; overflow: hidden; margin-bottom: 24px; border: 1px solid #333; }
                .card-image-area { height: 120px; background: linear-gradient(135deg, #1e3a8a, #000); position: relative; }
                .card-badge { position: absolute; top: 12px; left: 12px; background: var(--color-betika-yellow); color: #000; font-size: 10px; font-weight: 800; padding: 4px 8px; border-radius: 4px; }
                .card-content { padding: 16px; }
                .card-title { font-size: 16px; color: #fff; margin: 0 0 4px 0; }
                .card-desc { font-size: 12px; color: #999; margin: 0 0 16px 0; line-height: 1.4; }
                .card-btn { width: 100%; background: var(--color-betika-yellow); border: none; padding: 10px; border-radius: 6px; font-weight: 700; color: #000; font-size: 13px; cursor: pointer; }
                .card-footer { padding: 8px 16px; background: #111; border-top: 1px solid #222; text-align: center; }
                .tnc-link { font-size: 10px; color: #666; text-decoration: underline; }

                .app-content-placeholder { display: flex; flex-direction: column; gap: 8px; margin-top: auto; }
                .line { height: 8px; background: #222; border-radius: 4px; }
                .line.long { width: 100%; }
                .line.medium { width: 70%; }
                .line.short { width: 40%; }
            `}</style>
        </div>
    );
}
