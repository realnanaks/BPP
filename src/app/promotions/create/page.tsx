'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import WizardStepper from '@/components/wizard/WizardStepper';
import Step1Basics from '@/components/wizard/steps/Step1Basics';
import Step2Eligibility from '@/components/wizard/steps/Step2Eligibility';
import Step4Rewards from '@/components/wizard/steps/Step4Rewards';
import Step5Schedule from '@/components/wizard/steps/Step5Schedule';
import Step6Display from '@/components/wizard/steps/Step6Display';
import Step7Review from '@/components/wizard/steps/Step7Review';
import { Save, Rocket, ChevronRight, ChevronLeft, Code } from 'lucide-react';

export default function CreatePromotionPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const router = useRouter();

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

    const handlePublish = () => {
        // Mock saving the promotion
        // In a real app, this would submit the form state from a Context
        const newPromo = {
            id: Date.now(),
            name: 'Ethiopia Acca Insurance',
            type: 'Cashback',
            market: 'ET',
            status: 'Active',
            engagement: '0%',
            segment: 'Sportsbook Players',
            stats: { claims: 0, cost: '-', conversion: '-' },
            period: 'Feb 1 - Ongoing',
            rules: 'Min 6 Selections, 1 Loss, Stake > 5 ETB',
            reward: '100% - 200% Stake Back (Capped at 100k)'
        };

        // Save to local storage for the prototype dashboard to pick up
        const existing = JSON.parse(localStorage.getItem('saved_promotions') || '[]');
        const updated = [newPromo, ...existing];
        localStorage.setItem('saved_promotions', JSON.stringify(updated));

        // Navigate to dashboard
        router.push('/promotions');
    };

    return (
        <div className="wizard-page">
            <div className="wizard-header">
                <div>
                    <h1 className="page-title">Create New Promotion</h1>
                    <p className="page-subtitle">Configure rules, rewards, and eligibility criteria.</p>
                </div>
                <div className="header-meta">
                    <span className="draft-badge"><div className="dot" /> Draft Mode</span>
                </div>
            </div>

            <WizardStepper currentStep={currentStep} />

            <div className="step-content-area">
                {renderStep()}
            </div>

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

                    {currentStep < 6 ? (
                        <button className="btn btn-primary" onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}>
                            Next Step <ChevronRight size={16} />
                        </button>
                    ) : (
                        <button className="btn btn-primary glow-effect" onClick={handlePublish}>
                            <Rocket size={16} /> Publish Promotion
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
                    background: linear-gradient(90deg, #fff, #94a3b8);
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
            `}</style>
        </div>
    );
}
