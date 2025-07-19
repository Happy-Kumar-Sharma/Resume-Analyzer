
// Sidebar link style for reuse



// Sidebar link style for reuse (define only once at the top)
const sidebarLinkStyle: React.CSSProperties = {
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

import React, { useState, useEffect } from 'react';
import { fetchQnAHistory } from '../api/resumeApi';




const QnADashboard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [qnaList, setQnaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false); // Prevents re-fetching
  const [navOpen, setNavOpen] = useState(false);

  const fetchQnA = async (searchEmail?: string) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchQnAHistory(searchEmail);
      setQnaList(data);
      setHasLoaded(true);
    } catch (e) {
      setError('Failed to fetch Q&A history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasLoaded) fetchQnA();
    // eslint-disable-next-line
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchQnA(email);
  };

  // Responsive: detect mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // List view
  if (!selectedEntry) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', flexDirection: isMobile ? 'column' : 'row' }}>
        {!isMobile && (
          <aside className="dashboard-sidebar" style={{
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
          }}>
            <a href="/" style={{ textDecoration: 'none' }}>
              <h2 style={{ fontWeight: 800, fontSize: 28, marginBottom: 32, letterSpacing: '-1px', color: '#fff', cursor: 'pointer' }}>AI Resume Analyzer</h2>
            </a>
            <a href="/dashboard" style={sidebarLinkStyle}>Dashboard</a>
            {/* <a href="/analyze" style={sidebarLinkStyle}>Analyze</a> */}
            <a href="/qna-dashboard" style={sidebarLinkStyle}>Q&A Dashboard</a>
            <a href="/history" style={sidebarLinkStyle}>History</a>
            <a href="/settings" style={sidebarLinkStyle}>Settings</a>
            <a href="/blog" style={sidebarLinkStyle}>Blog</a>
            <a href="/faq" style={sidebarLinkStyle}>FAQ</a>
            <a href="/pricing" style={sidebarLinkStyle}>Pricing</a>
          </aside>
        )}
        <main
          style={{
            marginLeft: !isMobile ? 220 : 0,
            flex: 1,
            padding: '48px 32px',
            width: isMobile ? '100%' : undefined,
            maxWidth: isMobile ? '100vw' : undefined,
            boxSizing: 'border-box',
          }}
          className="dashboard-main"
        >
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#7f5af0', marginBottom: 16 }}>Interview Q&A Dashboard</h2>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: isMobile ? 'wrap' : undefined }}>
            <input
              type="email"
              placeholder="Search by email..."
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ padding: 10, borderRadius: 8, border: '1.5px solid #b2f2dd', fontSize: 16, width: isMobile ? '100%' : 260, minWidth: 0 }}
            />
            <button className="cta-btn" type="submit" style={{ background: '#2cb67d', color: '#fff' }}>Search</button>
            <button className="cta-btn" type="button" style={{ background: '#e0d7f7', color: '#232046' }} onClick={() => { setEmail(''); fetchQnA(); }}>Clear</button>
          </form>
          {loading && <div>Loading...</div>}
          {error && <div style={{ color: '#f55' }}>{error}</div>}
          {qnaList.length === 0 && !loading && <div style={{ color: '#888' }}>No Q&A found.</div>}
          {qnaList.map((entry, idx) => (
            <div key={entry.id || idx} style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px #7f5af022', padding: 20, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: isMobile ? 'wrap' : undefined }}>
              <div>
                <div style={{ fontWeight: 600, color: '#7f5af0', marginBottom: 6 }}>Email: {entry.email}</div>
                <div style={{ fontSize: 13, color: '#888', marginBottom: 10 }}>Created: {new Date(entry.created_at).toLocaleString()}</div>
                <div style={{ color: '#888', fontSize: 14 }}>{entry.qna && entry.qna.length > 0 ? `${entry.qna.length} Q&A` : 'Click View to see details'}</div>
              </div>
              <button className="cta-btn" style={{ background: '#7f5af0', color: '#fff', marginLeft: 16, marginTop: isMobile ? 12 : 0 }} onClick={() => setSelectedEntry(entry)}>
                View
              </button>
            </div>
          ))}
        </main>
        {/* Collapsible top-left nav bar for mobile */}
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
      </div>
    );
  }

  // Detail view
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside className="dashboard-sidebar" style={{
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
      }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h2 style={{ fontWeight: 800, fontSize: 28, marginBottom: 32, letterSpacing: '-1px', color: '#fff', cursor: 'pointer' }}>AI Resume Analyzer</h2>
        </a>
        <a href="/dashboard" style={sidebarLinkStyle}>Dashboard</a>
        {/* <a href="/analyze" style={sidebarLinkStyle}>Analyze</a> */}
        <a href="/qna-dashboard" style={sidebarLinkStyle}>Q&A Dashboard</a>
        <a href="/history" style={sidebarLinkStyle}>History</a>
        <a href="/settings" style={sidebarLinkStyle}>Settings</a>
        <a href="/blog" style={sidebarLinkStyle}>Blog</a>
        <a href="/faq" style={sidebarLinkStyle}>FAQ</a>
        <a href="/pricing" style={sidebarLinkStyle}>Pricing</a>
      </aside>
      <main style={{ marginLeft: 220, flex: 1, padding: '48px 32px' }} className="dashboard-main">
        <button className="cta-btn" style={{ background: '#e0d7f7', color: '#232046', marginBottom: 24 }} onClick={() => setSelectedEntry(null)}>
          Minimize / Back to List
        </button>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#7f5af0', marginBottom: 16 }}>Q&A for {selectedEntry.email}</h2>
        <div style={{ fontSize: 13, color: '#888', marginBottom: 18 }}>Created: {new Date(selectedEntry.created_at).toLocaleString()}</div>
        <ol style={{ paddingLeft: 24 }}>
          {(selectedEntry.qna && selectedEntry.qna.length > 0
            ? selectedEntry.qna
            : selectedEntry.qna_json && selectedEntry.qna_json.length > 0
              ? selectedEntry.qna_json
              : []).length > 0 ?
            (selectedEntry.qna ? selectedEntry.qna : selectedEntry.qna_json).map((item: any, i: number) => (
              <li key={i} style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 600, color: '#232046', marginBottom: 4 }}>{item.question}</div>
                <div style={{ color: '#555', marginLeft: 8 }}>{item.answer}</div>
              </li>
            )) : <li style={{ color: '#888' }}>No Q&A data.</li>}
        </ol>
      </main>
      {/* Collapsible top-left nav bar for mobile */}
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
    </div>
  );
// Sidebar link style for reuse

};

export default QnADashboard;
