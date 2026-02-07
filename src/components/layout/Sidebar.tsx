'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Megaphone, ShieldCheck, Beaker, BarChart3, Settings, LogOut, ChevronRight, Layers, Users, TrendingUp, Gift, LayoutGrid, FlaskConical, Shield, X } from 'lucide-react';
import clsx from 'clsx';

const menuItems = [
  { name: 'Dashboard', path: '/', icon: LayoutGrid },
  { name: 'Promotions', path: '/promotions', icon: Megaphone },
  { name: 'Manual Award', path: '/manual-award', icon: Gift },
  { name: 'Governance', path: '/governance', icon: ShieldCheck },
  { name: 'Experiments', path: '/experiments', icon: FlaskConical },
  { name: 'Reports', path: '/reports', icon: BarChart3 },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Active state helper logic
  const isItemActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Brand */}
        <div className="logo-area">
          <div className="flex items-center gap-3">
            <div className="logo-icon">
              <Layers size={22} color="#000" />
            </div>
            <span className="logo-text">Betika<span className="text-yellow">.</span></span>
          </div>
          {/* Mobile Close Button */}
          <button className="mobile-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="nav-container">
          {/* ... existing nav content ... */}
          <p className="nav-title">MAIN MENU</p>
          <div className="nav-list">
            {menuItems.map((item) => {
              const isActive = isItemActive(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="nav-item"
                  onClick={onClose} // Close on nav click
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    marginBottom: '4px',
                    transition: 'all 0.2s ease',
                    backgroundColor: isActive ? '#F2D641' : 'transparent',
                    color: isActive ? '#000' : '#a1a1aa',
                    fontWeight: isActive ? 700 : 500,
                  }}
                >
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} color={isActive ? '#000' : '#a1a1aa'} />
                  <span className="item-label" style={{ flex: 1 }}>{item.name}</span>
                  {isActive && <ChevronRight size={16} color="#000" style={{ opacity: 0.5 }} />}
                </Link>
              )
            })}
          </div>

          {/* ... (Keep existing Predictions and System sections, just add onClick={onClose} to Links) ... */}
          {/* For brevity, I will assume the user wants me to retain the full list. I will use the ... pattern in the replacement content if possible, but replace needs exact content. */}
          {/* I'll just replace the wrapper and header, and style block. */}

          <p className="nav-title mt-6">AI PREDICTIONS</p>
          <div className="nav-list">
            <Link href="/predictions/churn" className="nav-item" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', textDecoration: 'none', marginBottom: '4px', transition: 'all 0.2s ease', backgroundColor: isItemActive('/predictions/churn') ? '#F2D641' : 'transparent', color: isItemActive('/predictions/churn') ? '#000' : '#a1a1aa', fontWeight: isItemActive('/predictions/churn') ? 700 : 500 }}>
              <Users size={20} /> <span className="item-label" style={{ flex: 1 }}>Churn</span>
            </Link>
            <Link href="/predictions/promotions" className="nav-item" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', textDecoration: 'none', marginBottom: '4px', transition: 'all 0.2s ease', backgroundColor: isItemActive('/predictions/promotions') ? '#F2D641' : 'transparent', color: isItemActive('/predictions/promotions') ? '#000' : '#a1a1aa', fontWeight: isItemActive('/predictions/promotions') ? 700 : 500 }}>
              <TrendingUp size={20} /> <span className="item-label" style={{ flex: 1 }}>Promotions</span>
            </Link>
            <Link href="/predictions/responsible-gambling" className="nav-item" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', textDecoration: 'none', marginBottom: '4px', transition: 'all 0.2s ease', backgroundColor: isItemActive('/predictions/responsible-gambling') ? '#F2D641' : 'transparent', color: isItemActive('/predictions/responsible-gambling') ? '#000' : '#a1a1aa', fontWeight: isItemActive('/predictions/responsible-gambling') ? 700 : 500 }}>
              <Shield size={20} /> <span className="item-label" style={{ flex: 1 }}>Responsible Gambling</span>
            </Link>
          </div>

          <p className="nav-title mt-6">SYSTEM</p>
          <div className="nav-list">
            <Link href="/settings" className="nav-item" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', textDecoration: 'none', color: '#a1a1aa' }}>
              <Settings size={20} /> <span className="item-label">Settings</span>
            </Link>
          </div>

        </nav>

        {/* Footer Profile */}
        <div className="footer-profile">
          <div className="profile-bg">
            <div className="avatar">A</div>
            <div className="meta">
              <p className="name">Admin User</p>
              <p className="role">Super Admin</p>
            </div>
            <button className="logout"><LogOut size={16} /></button>
          </div>
        </div>

        <style jsx>{`
        .sidebar {
            width: 260px;
            height: 100vh;
            background: #09090b;
            display: flex;
            flex-direction: column;
            padding: 24px 16px;
            border-right: 1px solid rgba(255,255,255,0.08);
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;
            transition: transform 0.3s ease;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
            .sidebar {
                transform: translateX(-100%);
            }
            .sidebar.open {
                transform: translateX(0);
            }
            .mobile-overlay {
                position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0,0,0,0.5); backdrop-filter: blur(2px);
                z-index: 9998;
                opacity: 0; pointer-events: none; transition: opacity 0.3s;
            }
            .mobile-overlay.open { opacity: 1; pointer-events: auto; }
            .mobile-close-btn { display: block; }
        }
        
        .mobile-close-btn {
            display: none;
            background: transparent; border: none; color: #fff; cursor: pointer;
        }

        /* Logo */
        .logo-area {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 0 12px 32px 12px;
        }
        .logo-icon {
            width: 36px;
            height: 36px;
            background: #F2D641;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .logo-text {
            font-size: 20px;
            font-weight: 800;
            color: #fff;
            letter-spacing: -0.5px;
        }
        .text-yellow { color: #F2D641; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .gap-3 { gap: 12px; }

        /* Nav */
        .nav-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow-y: auto; /* Scrollable nav on mobile */
        }
        .nav-title {
            font-size: 11px;
            font-weight: 700;
            color: #52525b;
            margin-bottom: 12px;
            padding-left: 12px;
            letter-spacing: 1.2px;
        }
        .mt-6 { margin-top: 24px; }

        .nav-list {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        /* Footer */
        .footer-profile {
            margin-top: auto;
            padding-top: 16px;
        }
        .profile-bg {
            background: #18181b;
            border-radius: 14px;
            padding: 12px;
            display: flex;
            align-items: center;
            gap: 10px;
            border: 1px solid rgba(255,255,255,0.05);
        }
        .avatar {
            width: 32px;
            height: 32px;
            background: #27272a;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 700;
            color: #fff;
        }
        .meta {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        .name { font-size: 13px; font-weight: 600; color: #fff; margin: 0; }
        .role { font-size: 11px; color: #71717a; margin: 0; }

        .logout {
            background: transparent;
            border: none;
            color: #71717a;
            cursor: pointer;
            padding: 6px;
            border-radius: 6px;
        }
        .logout:hover { background: #27272a; color: #fff; }
      `}</style>
      </aside>
    </>
  );
}
