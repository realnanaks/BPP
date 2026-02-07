'use client';
import { Bell, Search, Settings } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="search-bar">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search promotions by name, ID, or tag..." />
      </div>

      <div className="actions">
        {/* Direct Settings Link */}
        <Link href="/settings" className="icon-btn" aria-label="Settings">
          <Settings size={20} />
        </Link>

        <button className="icon-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="badge" />
        </button>
        <div className="profile">
          <div className="avatar">A</div>
          <div className="info">
            <span className="name">Admin User</span>
            <span className="role">CRM Manager</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .header {
          height: var(--header-height);
          background: rgba(15, 15, 15, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 400px;
          background: var(--color-bg-panel);
          border: 1px solid var(--color-border);
          padding: 0 12px;
          border-radius: 8px;
          transition: border-color 0.2s;
        }
        .search-bar:focus-within {
          border-color: var(--color-betika-yellow);
        }
        .search-icon {
          color: var(--color-text-secondary);
        }
        input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 10px 0;
          color: #fff;
          font-size: 14px;
          outline: none;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .icon-btn {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          cursor: pointer;
          position: relative;
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .icon-btn:hover {
          background: rgba(255,255,255,0.05);
          color: #fff;
        }

        .badge {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background: var(--color-error);
          border-radius: 50%;
          border: 2px solid var(--color-bg-app);
        }

        .profile {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-left: 8px;
          padding-left: 16px;
          border-left: 1px solid rgba(255,255,255,0.1);
        }
        .avatar {
          width: 36px;
          height: 36px;
          background: var(--color-betika-green);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 700;
          font-size: 14px;
        }
        
        .info {
            display: flex;
            flex-direction: column;
            line-height: 1.2;
        }
        .name { font-size: 13px; font-weight: 600; }
        .role { font-size: 11px; color: var(--color-text-secondary); }
      `}</style>
    </header>
  );
}
