'use client';

import Sidebar from './Sidebar';
import Header from './Header';
import { Inter } from 'next/font/google';

// Font loading in client component is okay, or pass as className from root layout.
// Actually better to pass className from server layout. 
// I will accept className as prop.

export default function AppShell({ children, interClassName }: { children: React.ReactNode, interClassName?: string }) {
    return (
        <div className={`app-shell ${interClassName || ''}`}>
            <Sidebar />
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
          background-color: var(--color-bg-app); /* Ensure bg is applied */
        }
        .main-content {
          flex: 1;
          margin-left: 260px; /* var(--sidebar-width) but hardcoded for safety in JS style */
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .content-area {
          flex: 1;
          padding: 32px;
          animation: fadeIn 0.4s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
