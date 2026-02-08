'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Inter } from 'next/font/google';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import OnboardingTour from '../onboarding/OnboardingTour';

export default function AppShell({ children, interClassName }: { children: React.ReactNode, interClassName?: string }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return (
      <div className={`app-shell ${interClassName || ''}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`app-shell ${interClassName || ''}`}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <OnboardingTour />

      {/* Mobile Toggle Button (Fixed) */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu size={24} color="#fff" />
      </button>

      <div className="main-content">
        <Header />
        <main className="content-area">
          {children}
        </main>
      </div>

      <style jsx>{`
        .app-shell {
          display: flex;
          min-height: 100vh;
          background-color: var(--color-bg-app);
          position: relative;
        }
        .main-content {
          flex: 1;
          margin-left: 260px;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          transition: margin-left 0.3s ease;
          width: 100%; /* Ensure full width */
        }
        .content-area {
          flex: 1;
          padding: 32px;
          animation: fadeIn 0.4s ease-out;
          overflow-x: hidden; /* Prevent horizontal scroll on mobile */
        }

        .mobile-menu-btn {
            display: none;
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 50; /* Below sidebar (9999) but above content */
            background: #27272a;
            border: 1px solid rgba(255,255,255,0.1);
            padding: 8px;
            border-radius: 8px;
            cursor: pointer;
        }

        @media (max-width: 768px) {
            .main-content {
                margin-left: 0;
            }
            .mobile-menu-btn {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .content-area {
                padding: 80px 16px 32px 16px; /* Top padding for Menu button */
            }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
