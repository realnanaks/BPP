'use client';
import { WizardProvider } from '@/context/WizardContext';
import CreatePromotionWizard from '@/components/wizard/CreatePromotionWizard';

import { Suspense } from 'react';

export default function CreatePromotionPage() {
    return (
        <WizardProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <CreatePromotionWizard />
            </Suspense>
        </WizardProvider>
    );
}
