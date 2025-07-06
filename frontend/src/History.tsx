import React, { useState } from 'react';
import ResumeHistory from './components/ResumeHistory';
import { Link } from 'react-router-dom';

const sidebarStyle: React.CSSProperties = {
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
};

const linkStyle: React.CSSProperties = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: 18,
  margin: '18px 0',
  padding: '8px 24px',
  borderRadius: 16,
  transition: 'background 0.2s, color 0.2s',
  display: 'block',
};

const History: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);

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
        <aside style={sidebarStyle} className="dashboard-sidebar">
          <h2 style={{ fontWeight: 800, fontSize: 28, marginBottom: 32, letterSpacing: '-1px' }}>AI Resume Analyzer</h2>
          <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
          {/* <Link to="/analyze" style={linkStyle}>Analyze</Link> */}
          <Link to="/qna-dashboard" style={linkStyle}>Q&A Dashboard</Link>
          <Link to="/history" style={linkStyle}>History</Link>
          <Link to="/settings" style={linkStyle}>Settings</Link>
          <Link to="/blog" style={linkStyle}>Blog</Link>
          <Link to="/faq" style={linkStyle}>FAQ</Link>
          <Link to="/pricing" style={linkStyle}>Pricing</Link>
        </aside>
        <main style={{ marginLeft: 220, flex: 1, padding: '48px 32px' }} className="dashboard-main">
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#7f5af0', marginBottom: 24 }}>Resume Analysis History</h1>
          <p style={{ fontSize: 18, color: '#444', maxWidth: 700 }}>
            Here you can view all your previously analyzed resumes and their details.
          </p>
          <ResumeHistory />
        </main>
      </div>
    </>
  );
};

export default History;
