import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  History,
  FileText,
  Settings,
  Activity,
} from 'lucide-react';
import './Layout.css';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/log', icon: PlusCircle, label: 'Log Reading' },
  { to: '/history', icon: History, label: 'History' },
  { to: '/report', icon: FileText, label: 'Report' },
];

export default function Layout({ children, user }) {
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar__brand">
          <div className="sidebar__logo">
            <Activity size={20} strokeWidth={2.5} />
          </div>
          <span className="sidebar__wordmark">CIPHER</span>
        </div>

        <nav className="sidebar__nav">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__user">
            <div className="sidebar__avatar">{initials}</div>
            <div className="sidebar__user-info">
              <span className="sidebar__user-name">{user?.name || 'User'}</span>
              <span className="sidebar__user-sub">Health Partner</span>
            </div>
          </div>
          <button className="sidebar__settings" aria-label="Settings">
            <Settings size={16} />
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="layout__main">{children}</main>
    </div>
  );
}