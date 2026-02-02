'use client';
import { Check } from 'lucide-react';

const steps = [
    { id: 1, label: 'Basics' },
    { id: 2, label: 'Eligibility' },
    { id: 3, label: 'Rewards' },
    { id: 4, label: 'Schedule' },
    { id: 5, label: 'Display' },
    { id: 6, label: 'Review' },
];

export default function WizardStepper({ currentStep }: { currentStep: number }) {
    return (
        <div className="stepper-container">
            {steps.map((step, index) => {
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;

                return (
                    <div key={step.id} className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                        <div className="step-circle">
                            {isCompleted ? <Check size={14} strokeWidth={3} /> : step.id}
                        </div>
                        <span className="step-label">{step.label}</span>
                        {index < steps.length - 1 && <div className="step-line" />}
                    </div>
                );
            })}

            <style jsx>{`
                .stepper-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 20px 40px;
                    background: rgba(0,0,0,0.2);
                    border-radius: 16px;
                    margin-bottom: 32px;
                    border: 1px solid rgba(255,255,255,0.03);
                }

                .step-item {
                    display: flex;
                    align-items: center;
                    position: relative;
                    flex: 1;
                }

                .step-item:last-child {
                    flex: 0;
                }

                .step-circle {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.05);
                    border: 2px solid rgba(255,255,255,0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: 700;
                    color: var(--color-text-muted);
                    transition: all 0.3s ease;
                    z-index: 2;
                }

                .step-label {
                    margin-left: 12px;
                    font-size: 13px;
                    font-weight: 500;
                    color: var(--color-text-muted);
                    transition: all 0.3s ease;
                }

                .step-line {
                    height: 2px;
                    background: rgba(255,255,255,0.05);
                    flex: 1;
                    margin: 0 16px;
                    transition: all 0.3s ease;
                }

                /* Active State */
                .step-item.active .step-circle {
                    background: var(--color-bg-app);
                    border-color: var(--color-accent-purple);
                    color: var(--color-accent-purple);
                    box-shadow: 0 0 15px var(--color-accent-glow);
                }

                .step-item.active .step-label {
                    color: #fff;
                    text-shadow: 0 0 10px rgba(255,255,255,0.5);
                }

                /* Completed State */
                .step-item.completed .step-circle {
                    background: var(--color-accent-cyan);
                    border-color: var(--color-accent-cyan);
                    color: #000;
                }
                .step-item.completed .step-label {
                    color: var(--color-accent-cyan);
                }
                .step-item.completed .step-line {
                    background: var(--color-accent-cyan);
                    box-shadow: 0 0 8px rgba(6, 182, 212, 0.3);
                }
            `}</style>
        </div>
    );
}
