'use client';
import { useState } from 'react';
import { Image, Type, Flag, FileText, UploadCloud, Eye, Globe, MessageSquare, Send, Bell, Smartphone } from 'lucide-react';
import { useWizardContext } from '@/context/WizardContext';

export default function StepDisplay() {
    const { state, updateDisplay } = useWizardContext();
    const { activeTab, title, teaser, badges, communication, bannerImage, termsAndConditions } = state.display;
    const [previewDevice, setPreviewDevice] = useState<'mobile' | 'web'>('mobile');

    // Helpers for updating nested communication object
    const updateComm = (data: Partial<typeof communication>) => {
        updateDisplay({ communication: { ...communication, ...data } });
    };

    const toggleBadge = (badge: string) => {
        if (badges.includes(badge)) {
            updateDisplay({ badges: badges.filter(b => b !== badge) });
        } else {
            updateDisplay({ badges: [...badges, badge] });
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateDisplay({ bannerImage: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="step-container">
            <div className="main-layout">
                {/* Left Column: Form */}
                <div className="glass-panel form-panel">
                    <div className="panel-header-row">
                        <h2 className="panel-title">Content Configuration</h2>
                        <div className="mode-toggle">
                            <button
                                className={`mode-btn ${activeTab === 'display' ? 'active' : ''}`}
                                onClick={() => updateDisplay({ activeTab: 'display' })}
                            >Display</button>
                            <button
                                className={`mode-btn ${activeTab === 'communication' ? 'active' : ''}`}
                                onClick={() => updateDisplay({ activeTab: 'communication' })}
                            >Communication</button>
                        </div>
                    </div>

                    {activeTab === 'display' ? (
                        <>
                            {/* 1. Assets */}
                            <div className="form-section">
                                <label className="section-label"><Image size={16} /> Visual Assets</label>
                                <div className="upload-area">
                                    <label className="upload-placeholder">
                                        {bannerImage ? (
                                            <img src={bannerImage} alt="Banner Preview" className="uploaded-preview" />
                                        ) : (
                                            <>
                                                <UploadCloud size={32} className="text-muted" />
                                                <span className="upload-text">Drop Hero Image here</span>
                                                <span className="upload-sub">1920x600 • Max 2MB</span>
                                            </>
                                        )}
                                        <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                                    </label>
                                    <div className="preview-mini">
                                        <div className="mini-box" style={{ backgroundImage: bannerImage ? `url(${bannerImage})` : 'none', backgroundSize: 'cover' }} />
                                        <div className="mini-box" />
                                    </div>
                                </div>
                            </div>

                            {/* 2. Text Content */}
                            <div className="form-section">
                                <label className="section-label"><Type size={16} /> Public Content</label>
                                <div className="input-group">
                                    <label>Display Title (Public)</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={title}
                                        onChange={(e) => updateDisplay({ title: e.target.value })}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Short Teaser</label>
                                    <textarea
                                        className="form-input"
                                        rows={2}
                                        value={teaser}
                                        onChange={(e) => updateDisplay({ teaser: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>

                            {/* 3. T&Cs */}
                            <div className="form-section">
                                <label className="section-label"><FileText size={16} /> Terms & Conditions</label>
                                <div className="input-group">
                                    <textarea
                                        className="form-input tnc-input"
                                        rows={6}
                                        value={termsAndConditions}
                                        onChange={(e) => updateDisplay({ termsAndConditions: e.target.value })}
                                        placeholder="Enter full terms and conditions..."
                                    ></textarea>
                                </div>
                            </div>

                            {/* 4. Badges */}
                            <div className="form-section">
                                <label className="section-label"><Flag size={16} /> Badges</label>
                                <div className="badge-selector">
                                    {['NEW', 'HOT', 'LIMITED', 'VIP'].map(badge => (
                                        <div
                                            key={badge}
                                            className={`badge-option ${badges.includes(badge) ? 'active' : ''}`}
                                            onClick={() => toggleBadge(badge)}
                                        >
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
                                    {/* SMS Toggle */}
                                    <div
                                        className={`channel-card ${communication.smsEnabled ? 'active' : ''}`}
                                        onClick={() => updateComm({ smsEnabled: !communication.smsEnabled })}
                                    >
                                        <div className="ch-icon"><MessageSquare size={18} /></div>
                                        <div className="ch-info">
                                            <h3>SMS</h3>
                                            <p>Instant text message</p>
                                        </div>
                                        <div className="toggle-switch">
                                            <div className="switch-knob" />
                                        </div>
                                    </div>

                                    {/* Push Toggle */}
                                    <div
                                        className={`channel-card ${communication.pushEnabled ? 'active' : ''}`}
                                        onClick={() => updateComm({ pushEnabled: !communication.pushEnabled })}
                                    >
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

                            {communication.smsEnabled && (
                                <div className="form-section animate-fade">
                                    <label className="section-label">SMS Template</label>
                                    <div className="template-editor">
                                        <div className="var-toolbar">
                                            <span>Insert Variable:</span>
                                            <button className="var-chip" onClick={() => updateComm({ smsTemplate: communication.smsTemplate + ' {{amount}}' })}>Amount</button>
                                            <button className="var-chip" onClick={() => updateComm({ smsTemplate: communication.smsTemplate + ' {{week}}' })}>Week</button>
                                            <button className="var-chip" onClick={() => updateComm({ smsTemplate: communication.smsTemplate + ' {{player_name}}' })}>Player Name</button>
                                        </div>
                                        <textarea
                                            className="template-input"
                                            rows={4}
                                            value={communication.smsTemplate}
                                            onChange={(e) => updateComm({ smsTemplate: e.target.value })}
                                        ></textarea>
                                        <div className="char-count">
                                            {communication.smsTemplate.length} characters • 1 Segment
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
                            <button
                                className={`device-btn ${previewDevice === 'mobile' ? 'active' : ''}`}
                                onClick={() => setPreviewDevice('mobile')}
                            ><Smartphone size={14} /> Mobile</button>
                            <button
                                className={`device-btn ${previewDevice === 'web' ? 'active' : ''}`}
                                onClick={() => setPreviewDevice('web')}
                            ><Globe size={14} /> Web</button>
                        </div>
                    </div>

                    {/* PREVIEW CONTAINER */}
                    <div className={`preview-container ${previewDevice}`}>

                        {/* MOBILE MOCKUP */}
                        {previewDevice === 'mobile' && (
                            <div className="phone-mockup">
                                <div className="phone-screen">
                                    {/* App Header */}
                                    <div className="app-header">
                                        <div className="menu-burger" />
                                        <div className="logo-placeholder" />
                                    </div>

                                    {activeTab === 'display' ? (
                                        <div className="promo-card-preview">
                                            <div className="card-image-area" style={{ backgroundImage: bannerImage ? `url(${bannerImage})` : 'none', backgroundSize: 'cover' }}>
                                                {!bannerImage && <div className="img-placeholder">Image Area</div>}
                                                {badges.length > 0 && <div className="card-badge">{badges[0]}</div>}
                                            </div>
                                            <div className="card-content">
                                                <h4 className="card-title">{title || 'Promotion Title'}</h4>
                                                <p className="card-desc">{teaser || 'Short description of the promotion goes here...'}</p>
                                                <button className="card-btn">Opt In</button>
                                            </div>
                                            <div className="card-footer">
                                                <span className="tnc-link" title={termsAndConditions}>T&C Apply</span>
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
                                                    {communication.smsTemplate
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
                        )}

                        {/* WEB MOCKUP */}
                        {previewDevice === 'web' && (
                            <div className="web-mockup">
                                <div className="browser-bar">
                                    <div className="dots">
                                        <span className="dot red" />
                                        <span className="dot yellow" />
                                        <span className="dot green" />
                                    </div>
                                    <div className="url-bar">betika.com/promotions</div>
                                </div>
                                <div className="web-screen">
                                    <div className="web-header">
                                        <div className="web-logo" />
                                        <div className="web-nav">
                                            <span className="nav-item" />
                                            <span className="nav-item" />
                                            <span className="nav-item" />
                                        </div>
                                    </div>

                                    <div className="web-promo-banner">
                                        <div className="web-banner-img" style={{ backgroundImage: bannerImage ? `url(${bannerImage})` : 'none', backgroundSize: 'cover' }}>
                                            {!bannerImage && <div className="img-placeholder">Hero Image</div>}
                                            {badges.length > 0 && <div className="web-badge">{badges[0]}</div>}
                                        </div>
                                        <div className="web-banner-content">
                                            <h1>{title || 'Promotion Title'}</h1>
                                            <p>{teaser || 'Full description of the promotion. Join now and win big!'}</p>
                                            <div className="web-actions">
                                                <button className="web-btn primary">Opt In</button>
                                                <button className="web-btn secondary">More Info</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="web-tnc-section">
                                        <h3>Terms and Conditions</h3>
                                        <div className="tnc-text">
                                            {termsAndConditions.split('\n').map((line, i) => (
                                                <p key={i}>{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            <style jsx>{`
                .step-container { max-width: 1200px; margin: 0 auto; animation: slideIn 0.3s ease-out; }
                @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                .main-layout { display: grid; grid-template-columns: 3fr 2fr; gap: 32px; }

                .form-panel { padding: 40px; }
                .panel-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
                .panel-title { font-size: 20px; font-weight: 700; color: var(--color-text-primary); margin: 0; }
                
                .mode-toggle { background: var(--color-bg-card); padding: 4px; border-radius: 8px; display: flex; gap: 4px; }
                .mode-btn { background: transparent; border: none; padding: 6px 12px; font-size: 13px; color: var(--color-text-muted); cursor: pointer; border-radius: 6px; font-weight: 500; transition: all 0.2s; }
                .mode-btn.active { background: var(--color-text-primary); color: var(--color-bg-app); }

                .form-section { margin-bottom: 32px; }
                .section-label { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: var(--color-text-secondary); margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px; }

                /* Upload Area */
                .upload-area { display: flex; gap: 16px; }
                .upload-placeholder { flex: 1; border: 2px dashed var(--color-border); border-radius: 12px; height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; overflow: hidden; position: relative; }
                .upload-placeholder:hover { border-color: var(--color-accent-purple); background: rgba(168, 85, 247, 0.05); }
                .uploaded-preview { width: 100%; height: 100%; object-fit: cover; }
                .text-muted { color: var(--color-text-muted); margin-bottom: 8px; }
                .upload-text { font-size: 14px; font-weight: 500; color: var(--color-text-primary); }
                .upload-sub { font-size: 11px; color: var(--color-text-muted); }
                .preview-mini { display: flex; flex-direction: column; gap: 8px; }
                .mini-box { width: 60px; height: 56px; background: var(--color-bg-card); border-radius: 8px; border: 1px solid var(--color-border); }

                /* Text Inputs */
                .input-group { margin-bottom: 16px; }
                .input-group label { display: block; margin-bottom: 8px; font-size: 12px; color: var(--color-text-muted); }
                .form-input { width: 100%; background: var(--color-bg-input); border: 1px solid var(--color-border); color: var(--color-text-primary); padding: 12px; border-radius: 8px; font-family: inherit; font-size: 14px; }
                .form-input:focus { border-color: var(--color-accent-cyan); outline: none; }
                .tnc-input { font-size: 12px; line-height: 1.5; font-family: monospace; }

                /* Badges */
                .badge-selector { display: flex; gap: 12px; }
                .badge-option { padding: 6px 16px; background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 20px; font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.2s; color: var(--color-text-primary); }
                .badge-option:hover { background: var(--color-border-hover); }
                .badge-option.active { background: var(--color-betika-yellow); color: #000; border-color: var(--color-betika-yellow); }

                /* Communication Channel Cards */
                .channel-toggles { display: flex; flex-direction: column; gap: 12px; }
                .channel-card { background: var(--color-bg-card); border: 1px solid var(--color-border); padding: 16px; border-radius: 12px; display: flex; align-items: center; gap: 16px; cursor: pointer; transition: all 0.2s; }
                .channel-card:hover { background: var(--color-bg-input-focus); }
                .channel-card.active { border-color: var(--color-accent-cyan); background: rgba(6, 182, 212, 0.05); }
                
                .ch-icon { width: 40px; height: 40px; border-radius: 8px; background: var(--color-border); display: flex; align-items: center; justify-content: center; color: var(--color-text-primary); }
                .channel-card.active .ch-icon { background: var(--color-accent-cyan); color: #000; }
                
                .ch-info { flex: 1; }
                .ch-info h3 { margin: 0 0 2px 0; font-size: 14px; color: var(--color-text-primary); font-weight: 600; }
                .ch-info p { margin: 0; font-size: 12px; color: var(--color-text-muted); }
                
                .toggle-switch { width: 44px; height: 24px; background: var(--color-border); border-radius: 12px; padding: 2px; position: relative; transition: all 0.2s; }
                .switch-knob { width: 20px; height: 20px; background: var(--color-text-muted); border-radius: 50%; transition: all 0.2s; }
                .channel-card.active .toggle-switch { background: rgba(6, 182, 212, 0.3); }
                .channel-card.active .switch-knob { transform: translateX(20px); background: var(--color-accent-cyan); }

                /* SMS Editor */
                .template-editor { background: var(--color-bg-input); border: 1px solid var(--color-border); border-radius: 8px; overflow: hidden; }
                .var-toolbar { background: var(--color-bg-card); padding: 8px; display: flex; gap: 8px; align-items: center; border-bottom: 1px solid var(--color-border); font-size: 12px; color: var(--color-text-muted); }
                .var-chip { background: var(--color-bg-app); border: 1px solid var(--color-border); padding: 2px 8px; border-radius: 4px; color: var(--color-accent-cyan); font-size: 11px; cursor: pointer; }
                .var-chip:hover { border-color: var(--color-accent-cyan); }
                
                .template-input { width: 100%; background: transparent; border: none; padding: 12px; color: var(--color-text-primary); font-family: monospace; font-size: 13px; outline: none; resize: vertical; }
                .char-count { padding: 4px 12px; font-size: 11px; color: var(--color-text-muted); text-align: right; background: var(--color-bg-card); }

                .animate-fade { animation: fadeIn 0.3s ease; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

                /* Preview Panel */
                .preview-panel { display: flex; flex-direction: column; align-items: center; justify-self: center; width: 100%; }
                .preview-header { display: flex; justify-content: space-between; width: 100%; align-items: center; margin-bottom: 24px; max-width: 320px; }
                .web .preview-header { max-width: 600px; } /* Expand header for web view */

                .preview-title { display: flex; gap: 8px; align-items: center; font-size: 14px; color: var(--color-text-secondary); }
                .device-toggles { display: flex; background: rgba(255,255,255,0.1); border-radius: 6px; padding: 2px; }
                .device-btn { display: flex; align-items: center; gap: 6px; background: transparent; border: none; font-size: 11px; padding: 4px 12px; color: var(--color-text-muted); cursor: pointer; border-radius: 4px; }
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
                .img-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.2); font-size: 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; }

                .card-badge { position: absolute; top: 12px; left: 12px; background: var(--color-betika-yellow); color: #000; font-size: 10px; font-weight: 800; padding: 4px 8px; border-radius: 4px; }
                .card-content { padding: 16px; }
                .card-title { font-size: 16px; color: #fff; margin: 0 0 4px 0; }
                .card-desc { font-size: 12px; color: #999; margin: 0 0 16px 0; line-height: 1.4; }
                .card-btn { width: 100%; background: var(--color-betika-yellow); border: none; padding: 10px; border-radius: 6px; font-weight: 700; color: #000; font-size: 13px; cursor: pointer; }
                .card-footer { padding: 8px 16px; background: #111; border-top: 1px solid #222; text-align: center; }
                .tnc-link { font-size: 10px; color: #666; text-decoration: underline; cursor: help; }

                .app-content-placeholder { display: flex; flex-direction: column; gap: 8px; margin-top: auto; }
                .line { height: 8px; background: #222; border-radius: 4px; }
                .line.long { width: 100%; }
                .line.medium { width: 70%; }
                .line.short { width: 40%; }

                /* Web Mockup Styles */
                .web-mockup { width: 100%; max-width: 800px; height: 500px; background: #1a1a1a; border-radius: 12px; border: 1px solid #333; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
                .browser-bar { height: 36px; background: #2a2a2a; display: flex; align-items: center; padding: 0 16px; gap: 16px; border-bottom: 1px solid #333; }
                .dots { display: flex; gap: 6px; }
                .dot { width: 10px; height: 10px; border-radius: 50%; }
                .dot.red { background: #ef4444; } 
                .dot.yellow { background: #facc15; } 
                .dot.green { background: #4ade80; }
                .url-bar { flex: 1; background: #111; height: 24px; border-radius: 4px; display: flex; align-items: center; padding: 0 12px; font-size: 11px; color: #666; }
                
                .web-screen { flex: 1; background: #000; overflow-y: auto; position: relative; }
                .web-header { height: 60px; border-bottom: 1px solid #222; display: flex; align-items: center; justify-content: space-between; padding: 0 32px; }
                .web-logo { width: 100px; height: 24px; background: #333; border-radius: 4px; }
                .web-nav { display: flex; gap: 16px; }
                .nav-item { width: 60px; height: 12px; background: #222; border-radius: 4px; }

                .web-promo-banner { height: 300px; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
                .web-banner-img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; opacity: 0.6; }
                .web-banner-content { position: relative; z-index: 2; text-align: center; max-width: 600px; padding: 32px; }
                .web-banner-content h1 { font-size: 32px; margin-bottom: 12px; font-weight: 800; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
                .web-banner-content p { font-size: 16px; margin-bottom: 24px; color: #ccc; }
                .web-actions { display: flex; gap: 16px; justify-content: center; }
                .web-btn { padding: 12px 24px; border-radius: 6px; font-weight: 700; cursor: pointer; border: none; }
                .web-btn.primary { background: var(--color-betika-yellow); color: #000; }
                .web-btn.secondary { background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.2); }
                .web-badge { position: absolute; top: 24px; right: 24px; background: var(--color-betika-yellow); color: #000; font-weight: 800; padding: 6px 12px; border-radius: 4px; z-index: 5; }

                .web-tnc-section { padding: 32px; border-top: 1px solid #222; }
                .web-tnc-section h3 { font-size: 14px; margin-bottom: 16px; color: #888; text-transform: uppercase; }
                .tnc-text p { font-size: 12px; color: #666; margin-bottom: 8px; line-height: 1.5; }

                @media (max-width: 768px) {
                    .main-layout { grid-template-columns: 1fr; gap: 24px; }
                    .panel-header-row { flex-direction: column; align-items: flex-start; gap: 16px; }
                    .mode-toggle { width: 100%; display: flex; }
                    .mode-btn { flex: 1; text-align: center; }
                    .preview-panel { margin-top: 24px; }
                    .phone-mockup { transform: scale(0.9); transform-origin: top center; }
                }
            `}</style>
        </div>
    );
}
