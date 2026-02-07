'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// --- Types ---

export interface Rule {
    id: number;
    param: string;
    operator: string;
    value: string;
    type: string;
}

export interface Trigger {
    id: string;
    eventId: string;
    rules: Rule[];
}

export interface TierRule {
    id: number;
    dimensionKey: string; // 'week' | 'selections' | 'stake'
    dimensionValue: string;
    segment: string;
    percentage: string;
    cap: string;
}

export interface WizardState {
    basics: {
        name: string;
        description: string;
        type: string;
    };
    eligibility: {
        markets: string[];
        channels: string[]; // platforms
        segment: string;
        customSegments: string[];
        triggers: Trigger[];
    };
    rewards: {
        type: string; // 'cashback', 'bonus', 'spins', 'physical'
        calcType: string; // 'simple', 'tiered'
        matrixDimension: string; // 'week', 'selections'
        tiers: TierRule[];
        simpleConfig: {
            percentage: string;
            cap: string;
        };
        wagering: number;
        creditTiming: string;
    };
    schedule: {
        startDate: string;
        endDate: string;
        isRecurring: boolean;
        recurrence: {
            frequency: string;
            days: string[];
        };
        limits: {
            totalClaims: string;
            perPlayer: string;
            budget: string;
        };
    };
    display: {
        activeTab: string; // 'display' | 'communication'
        title: string;
        teaser: string;
        bannerImage: string;
        termsAndConditions: string;
        badges: string[]; // ['NEW', 'HOT']
        communication: {
            smsEnabled: boolean;
            pushEnabled: boolean;
            smsTemplate: string;
        };
    };
}

const defaultState: WizardState = {
    basics: {
        name: '',
        description: '',
        type: 'cashback'
    },
    eligibility: {
        markets: ['ke'],
        channels: ['mobile', 'app'],
        segment: 'all',
        customSegments: [],
        triggers: []
    },
    rewards: {
        type: 'cashback',
        calcType: 'tiered',
        matrixDimension: 'week',
        tiers: [
            { id: 1, dimensionKey: 'week', dimensionValue: 'Week 1', segment: 'All Segments', percentage: '10', cap: '100' },
        ],
        simpleConfig: { percentage: '100', cap: '500' },
        wagering: 35,
        creditTiming: 'instant'
    },
    schedule: {
        startDate: '',
        endDate: '',
        isRecurring: false,
        recurrence: { frequency: 'Weekly', days: [] },
        limits: { totalClaims: '', perPlayer: '1', budget: '' }
    },
    display: {
        activeTab: 'display',
        title: '',
        teaser: '',
        bannerImage: '',
        termsAndConditions: '',
        badges: ['NEW'],
        communication: {
            smsEnabled: true,
            pushEnabled: false,
            smsTemplate: "Hi {{player_name}}, you have qualified for our promotion! Check your account for details."
        }
    }
};

interface WizardContextType {
    state: WizardState;
    updateBasics: (data: Partial<WizardState['basics']>) => void;
    updateEligibility: (data: Partial<WizardState['eligibility']>) => void;
    updateRewards: (data: Partial<WizardState['rewards']>) => void;
    updateSchedule: (data: Partial<WizardState['schedule']>) => void;
    updateDisplay: (data: Partial<WizardState['display']>) => void;
    resetWizard: () => void;
    loadPromotion: (promotion: WizardState) => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<WizardState>(defaultState);

    const updateBasics = (data: Partial<WizardState['basics']>) => {
        setState(prev => ({ ...prev, basics: { ...prev.basics, ...data } }));
    };

    const updateEligibility = (data: Partial<WizardState['eligibility']>) => {
        setState(prev => ({ ...prev, eligibility: { ...prev.eligibility, ...data } }));
    };

    const updateRewards = (data: Partial<WizardState['rewards']>) => {
        setState(prev => ({ ...prev, rewards: { ...prev.rewards, ...data } }));
    };

    const updateSchedule = (data: Partial<WizardState['schedule']>) => {
        setState(prev => ({ ...prev, schedule: { ...prev.schedule, ...data } }));
    };

    const updateDisplay = (data: Partial<WizardState['display']>) => {
        setState(prev => ({ ...prev, display: { ...prev.display, ...data } }));
    };

    const resetWizard = () => setState(defaultState);

    const loadPromotion = (promotion: WizardState) => setState(promotion);

    return (
        <WizardContext.Provider value={{ state, updateBasics, updateEligibility, updateRewards, updateSchedule, updateDisplay, resetWizard, loadPromotion }}>
            {children}
        </WizardContext.Provider>
    );
}

export function useWizardContext() {
    const context = useContext(WizardContext);
    if (context === undefined) {
        throw new Error('useWizardContext must be used within a WizardProvider');
    }
    return context;
}
