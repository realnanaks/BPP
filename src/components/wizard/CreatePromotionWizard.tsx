import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWizardContext } from '@/context/WizardContext';
import WizardStepper from '@/components/wizard/WizardStepper';
import Step1Basics from '@/components/wizard/steps/Step1Basics';
import Step2Eligibility from '@/components/wizard/steps/Step2Eligibility';
import Step4Rewards from '@/components/wizard/steps/Step4Rewards';
import Step5Schedule from '@/components/wizard/steps/Step5Schedule';
import Step6Display from '@/components/wizard/steps/Step6Display';
import Step7Review from '@/components/wizard/steps/Step7Review';
import { Save, Rocket, ChevronRight, ChevronLeft, Code, Sun, Moon, X } from 'lucide-react';

export default function CreatePromotionWizard() {
    const [currentStep, setCurrentStep] = useState(1);
    const [theme, setTheme] = useState('dark');
    const { state, updateEligibility, loadPromotion, resetWizard } = useWizardContext();
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get('edit');

    const [isSegmentModalOpen, setIsSegmentModalOpen] = useState(false);
    const [newSegmentName, setNewSegmentName] = useState('');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <Step1Basics />;
            case 2: return <Step2Eligibility />;
            case 3: return <Step4Rewards />;
            case 4: return <Step5Schedule />;
            case 5: return <Step6Display />;
            case 6: return <Step7Review />;
            default: return <Step1Basics />;
        }
    };

    // Load data if editing
    useEffect(() => {
        if (editId) {
            const saved = JSON.parse(localStorage.getItem('saved_promotions') || '[]');
            const promo = saved.find((p: any) => String(p.id) === String(editId));
            if (promo && promo.wizardState) {
                loadPromotion(promo.wizardState);
            } else if (promo) {
                // Fallback for seeds/legacy
                loadPromotion({
                    ...state, // defaults
                    basics: { ...state.basics, name: promo.name, type: promo.type || 'cashback' }
                });
            }
        } else {
            resetWizard();
        }
    }, [editId]);

    const handlePublish = async () => {
        // Prepare payload from context state
        const newPromo = {
            id: editId || Date.now(), // Keep ID if editing (string or number)
            name: state.basics.name || 'Untitled Promotion',
            type: state.basics.type,
            market: state.eligibility.markets[0]?.toUpperCase() || 'KE',
            status: 'Active',
            engagement: '0%',
            segment: state.eligibility.segment,
            stats: { claims: 0, cost: '-', conversion: '-' },
            period: `${new Date(state.schedule.startDate || Date.now()).toLocaleDateString()} - ${state.schedule.endDate ? new Date(state.schedule.endDate).toLocaleDateString() : 'Ongoing'}`,
            rules: `Min ${state.eligibility.triggers.length} Triggers`,
            reward: `${state.rewards.type} - ${state.rewards.calcType}`,
            // New fields being sent to backend
            bannerImage: state.display.bannerImage,
            termsAndConditions: state.display.termsAndConditions,
            wizardState: state // Save full state for re-editing
        };

        try {
            // Call the Mock Backend API
            const response = await fetch('/api/promotions/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPromo)
            });

            if (!response.ok) {
                console.error('Failed to create promotion via API');
            }

            // Save to local storage for the prototype dashboard
            const existing = JSON.parse(localStorage.getItem('saved_promotions') || '[]');

            let updated;
            if (editId) {
                updated = existing.map((p: any) => String(p.id) === String(editId) ? newPromo : p);
            } else {
                updated = [newPromo, ...existing];
            }

            localStorage.setItem('saved_promotions', JSON.stringify(updated));

            // Navigate to dashboard
            router.push('/promotions');

        } catch (err) {
            console.error('Publication error:', err);
            // Replace alert with toast in production
            console.log('Failed to publish promotion. See console for details.');
        }
    };

    const handleSaveSegment = () => {
        if (!newSegmentName.trim()) return;

        const updatedSegments = [...state.eligibility.customSegments, newSegmentName];
        updateEligibility({
            customSegments: updatedSegments,
            segment: newSegmentName
        });

        // Reset and close modal
        setNewSegmentName('');
        setIsSegmentModalOpen(false);

        // Optional: show feedback (e.g. toast) - for now just log
        console.log(`Segment "${newSegmentName}" saved successfully.`);
    };



    return (
        <div className="wizard-page">
            <div className="wizard-header">
                <div>
                    <h1 className="page-title">{editId ? 'Edit Promotion' : 'Create New Promotion'}</h1>
                    <p className="page-subtitle">{editId ? 'Update promotion details and configuration.' : 'Configure rules, rewards, and eligibility criteria.'}</p>
                </div>
                <div className="header-meta">
                    <button
                        className="theme-toggle-btn"
                        onClick={toggleTheme}
                        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>
            </div>

            <style jsx>{`
                .theme-toggle-btn {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: var(--color-text-secondary);
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .theme-toggle-btn:hover {
                    background: rgba(255,255,255,0.1);
                    color: #fff;
                }
            `}</style>

            <WizardStepper currentStep={currentStep} />

            <div className="step-content-area">
                {renderStep()}
            </div>

            {/* Segment Saving Modal (Global) */}
            {isSegmentModalOpen && (
                <div className="modal-overlay">
                    <div className="event-modal" style={{ width: '500px' }}>
                        <div className="modal-header">
                            <h3>Save Segment</h3>
                            <button onClick={() => setIsSegmentModalOpen(false)}><X size={18} /></button>
                        </div>
                        <div className="modal-body">
                            <p className="modal-desc">Save your current Qualification Rules as a reusable player segment.</p>
                            <div className="form-control">
                                <label>Segment Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. High Rollers Q1"
                                    value={newSegmentName}
                                    onChange={(e) => setNewSegmentName(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <div className="modal-actions">
                                <button className="btn-cancel" onClick={() => setIsSegmentModalOpen(false)}>Cancel</button>
                                <button className="btn-primary" onClick={handleSaveSegment} disabled={!newSegmentName.trim()}>Save Segment</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Sticky Footer */}
            <div className="wizard-footer">
                <div className="footer-left">
                    <button className="btn btn-secondary"><Save size={16} /> Save Draft</button>
                    {currentStep === 2 && <button className="btn btn-secondary text-accent-purple"><Code size={16} /> Compliance Scan</button>}
                </div>
                <div className="footer-right">
                    <button
                        className="btn btn-secondary"
                        onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                        disabled={currentStep === 1}
                        style={{ opacity: currentStep === 1 ? 0.5 : 1 }}
                    >
                        <ChevronLeft size={16} /> Back
                    </button>

                    {/* NEW: Save Segment Button (Only Step 2) */}
                    {currentStep === 2 && (
                        <button
                            className="btn btn-secondary text-betika-yellow"
                            style={{ borderColor: 'var(--color-betika-yellow)', color: 'var(--color-betika-yellow)' }}
                            onClick={() => setIsSegmentModalOpen(true)}
                            disabled={state.eligibility.triggers.length === 0}
                        >
                            <Save size={16} /> Save as Segment
                        </button>
                    )}

                    {currentStep < 6 ? (
                        <button className="btn btn-primary" onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}>
                            Next Step <ChevronRight size={16} />
                        </button>
                    ) : (
                        <button className="btn btn-primary glow-effect" onClick={handlePublish}>
                            <Rocket size={16} /> {editId ? 'Save Changes' : 'Publish Promotion'}
                        </button>
                    )}
                </div>
            </div>

            <style jsx>{`
                .wizard-page {
                    padding-bottom: 100px; /* Space for footer */
                }

                .step-content-area {
                    margin-top: 24px;
                }

                .wizard-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 32px;
                }
                .page-title {
                    font-size: 28px;
                    font-weight: 700;
                    margin: 0;
                    background: linear-gradient(90deg, var(--color-text-primary), var(--color-text-secondary));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .page-subtitle {
                    color: var(--color-text-secondary);
                    margin-top: 8px;
                }
                .draft-badge {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12px;
                    color: var(--color-text-muted);
                    background: rgba(255,255,255,0.05);
                    padding: 4px 12px;
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .dot { width: 6px; height: 6px; background: var(--color-betika-yellow); border-radius: 50%; box-shadow: 0 0 5px var(--color-betika-yellow); }

                /* Footer */
                .wizard-footer {
                    position: fixed;
                    bottom: 0;
                    left: var(--sidebar-width);
                    right: 0;
                    height: 80px;
                    background: rgba(15, 15, 23, 0.9);
                    backdrop-filter: blur(20px);
                    border-top: 1px solid var(--color-border);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 40px;
                    z-index: 100;
                    box-shadow: 0 -10px 30px rgba(0,0,0,0.5);
                }
                .footer-left, .footer-right { display: flex; gap: 16px; }
                .text-betika-yellow { color: var(--color-betika-yellow); }
                
                /* Reusing Modal Styles needed here since Step 2 styles are scoped */
                .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); z-index: 200; display: flex; align-items: center; justify-content: center; }
                .event-modal { background: var(--color-bg-panel); width: 600px; border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
                .modal-header { padding: 16px 24px; border-bottom: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center; background: var(--color-bg-card); }
                .modal-header h3 { margin: 0; font-size: 16px; color: var(--color-text-primary); }
                .modal-header button { background: transparent; border: none; color: var(--color-text-muted); cursor: pointer; }
                .modal-body { padding: 24px; }
                .modal-desc { font-size: 13px; color: var(--color-text-muted); margin-bottom: 20px; line-height: 1.5; }
                .form-control { margin-bottom: 16px; }
                .form-control label { display: block; font-size: 12px; color: var(--color-text-muted); margin-bottom: 8px; }
                .form-control input { width: 100%; background: var(--color-bg-input); border: 1px solid var(--color-border); color: var(--color-text-primary); padding: 10px; border-radius: 6px; font-size: 13px; outline: none; }
                .form-control input:focus { border-color: var(--color-accent-cyan); }
                .modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; }
                .btn-cancel { background: transparent; border: 1px solid var(--color-border); color: var(--color-text-muted); padding: 8px 16px; border-radius: 6px; cursor: pointer; }
            `}</style>
        </div>
    );
}
