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
            {/* <a href="/analyze">Analyze</a> */}
            <a href="/qna-dashboard">Q&A Dashboard</a>
            <a href="/history">History</a>
            <a href="/settings">Settings</a>
            <a href="/blog">Blog</a>
            <a href="/faq">FAQ</a>
            <a href="/pricing">Pricing</a>
          </div>
        )}
      </nav>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <aside style={{
          width: 220,
          background: 'linear-gradient(120deg, #7f5af0 0%, #2cb67d 100%)',
          color: '#fff',
          minHeight: '100vh',
          padding: '32px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '2px 0 16px rgba(127,90,240,0.08)',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 10,
        }} className="dashboard-sidebar">
          <h2 style={{ fontWeight: 800, fontSize: 28, marginBottom: 32, letterSpacing: '-1px' }}>AI Resume Analyzer</h2>
          <a href="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 18, margin: '18px 0', padding: '8px 24px', borderRadius: 16, transition: 'background 0.2s, color 0.2s', display: 'block' }}>Dashboard</a>
          {/* <a href="/analyze" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 18, margin: '18px 0', padding: '8px 24px', borderRadius: 16, transition: 'background 0.2s, color 0.2s', display: 'block' }}>Analyze</a> */}
          <a href="/qna-dashboard" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 18, margin: '18px 0', padding: '8px 24px', borderRadius: 16, transition: 'background 0.2s, color 0.2s', display: 'block' }}>Q&A Dashboard</a>
          <a href="/history" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 18, margin: '18px 0', padding: '8px 24px', borderRadius: 16, transition: 'background 0.2s, color 0.2s', display: 'block' }}>History</a>
          <a href="/settings" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 18, margin: '18px 0', padding: '8px 24px', borderRadius: 16, transition: 'background 0.2s, color 0.2s', display: 'block' }}>Settings</a>
          <a href="/blog" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 18, margin: '18px 0', padding: '8px 24px', borderRadius: 16, transition: 'background 0.2s, color 0.2s', display: 'block' }}>Blog</a>
          <a href="/faq" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 18, margin: '18px 0', padding: '8px 24px', borderRadius: 16, transition: 'background 0.2s, color 0.2s', display: 'block' }}>FAQ</a>
          <a href="/pricing" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 18, margin: '18px 0', padding: '8px 24px', borderRadius: 16, transition: 'background 0.2s, color 0.2s', display: 'block' }}>Pricing</a>
        </aside>
        <main style={{ marginLeft: 220, flex: 1, padding: '48px 32px' }} className="dashboard-main">
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
        </main>
      </div>
    </>
  );
};

export default Settings;
