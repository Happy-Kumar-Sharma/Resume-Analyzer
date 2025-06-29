import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const val = localStorage.getItem('settings_darkMode');
    return val ? JSON.parse(val) : false;
  });
  const [notifications, setNotifications] = useState(() => {
    const val = localStorage.getItem('settings_notifications');
    return val ? JSON.parse(val) : true;
  });
  const [autoEnhance, setAutoEnhance] = useState(() => {
    const val = localStorage.getItem('settings_autoEnhance');
    return val ? JSON.parse(val) : false;
  });
  const [showTips, setShowTips] = useState(() => {
    const val = localStorage.getItem('settings_showTips');
    return val ? JSON.parse(val) : true;
  });
  const [historyRetention, setHistoryRetention] = useState(() => {
    const val = localStorage.getItem('settings_historyRetention');
    return val ? val : '30';
  });
  const [saved, setSaved] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="dashboard-mobile-nav">
        <button
          className="dashboard-mobile-nav__toggle"
          aria-label="Open navigation menu"
          onClick={() => setNavOpen((open) => !open)}
        >
          <span className="dashboard-mobile-nav__icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        {navOpen && (
          <div className="dashboard-mobile-nav__links">
            <a href="/">Home</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/analyze">Analyze</a>
            <a href="/history">History</a>
            <a href="/settings">Settings</a>
            <a href="/blog">Blog</a>
            <a href="/faq">FAQ</a>
            <a href="/pricing">Pricing</a>
          </div>
        )}
      </nav>
      <div style={{ maxWidth: 600, margin: '48px auto', background: '#fff', borderRadius: 24, boxShadow: '0 2px 12px rgba(127,90,240,0.07)', padding: 40 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#7f5af0', marginBottom: 32 }}>Settings</h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 28 }} onSubmit={e => {
          e.preventDefault();
          localStorage.setItem('settings_darkMode', JSON.stringify(darkMode));
          localStorage.setItem('settings_notifications', JSON.stringify(notifications));
          localStorage.setItem('settings_autoEnhance', JSON.stringify(autoEnhance));
          localStorage.setItem('settings_showTips', JSON.stringify(showTips));
          localStorage.setItem('settings_historyRetention', historyRetention);
          setSaved(true);
          setTimeout(() => {
            setSaved(false);
            navigate('/dashboard');
          }, 1200);
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            Enable Dark Mode
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
            Enable Email Notifications
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <input type="checkbox" checked={autoEnhance} onChange={() => setAutoEnhance(!autoEnhance)} />
            Auto-enhance resumes with AI
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <input type="checkbox" checked={showTips} onChange={() => setShowTips(!showTips)} />
            Show helpful tips and onboarding
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span>Resume history retention (days):</span>
            <input type="number" min="1" max="365" value={historyRetention} onChange={e => setHistoryRetention(e.target.value)} style={{ width: 80, padding: 6, borderRadius: 8, border: '1px solid #e0d7f7' }} />
          </label>
          <button type="submit" style={{ background: 'linear-gradient(90deg, #2cb67d 0%, #7f5af0 100%)', color: '#fff', fontWeight: 700, fontSize: 18, borderRadius: 12, padding: '12px 0', border: 'none', marginTop: 12, cursor: 'pointer' }}>Save Settings</button>
          {saved && <div style={{ color: '#2cb67d', fontWeight: 600, marginTop: 8 }}>Settings saved!</div>}
        </form>
      </div>
    </>
  );
};

export default Settings;
