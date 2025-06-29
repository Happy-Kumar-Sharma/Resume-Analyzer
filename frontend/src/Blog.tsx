import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  const [search, setSearch] = useState('');
  const [navOpen, setNavOpen] = useState(false);
  const posts = [
    {
      title: 'How AI is Revolutionizing Resume Analysis',
      date: 'June 2025',
      excerpt: 'Discover how artificial intelligence is transforming the way resumes are analyzed, helping job seekers stand out and land interviews faster.',
      link: '#',
    },
    {
      title: 'Top 10 Resume Mistakes to Avoid in 2025',
      date: 'May 2025',
      excerpt: 'Avoid these common pitfalls and make your resume shine with actionable tips from career experts and AI insights.',
      link: '#',
    },
    {
      title: 'The Future of Job Matching: AI-Powered Recommendations',
      date: 'April 2025',
      excerpt: 'Learn how AI-driven job matching is changing the hiring landscape for both candidates and employers.',
      link: '#',
    },
    {
      title: 'ResumeAI Product Updates: What’s New in 2025',
      date: 'March 2025',
      excerpt: 'See the latest features, improvements, and what’s coming soon to ResumeAI.',
      link: '#',
    },
  ];

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(search.toLowerCase())
  );

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
          <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 18, margin: '18px 0', padding: '8px 24px', borderRadius: 16, transition: 'background 0.2s, color 0.2s', display: 'block' }}>Dashboard</Link>
          <Link to="/analyze" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 18, margin: '18px 0', padding: '8px 24px', borderRadius: 16, transition: 'background 0.2s, color 0.2s', display: 'block' }}>Analyze</Link>
          <Link to="/history" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 18, margin: '18px 0', padding: '8px 24px', borderRadius: 16, transition: 'background 0.2s, color 0.2s', display: 'block' }}>History</Link>
          <Link to="/settings" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 18, margin: '18px 0', padding: '8px 24px', borderRadius: 16, transition: 'background 0.2s, color 0.2s', display: 'block' }}>Settings</Link>
          <Link to="/blog" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 18, margin: '18px 0', padding: '8px 24px', borderRadius: 16, transition: 'background 0.2s, color 0.2s', display: 'block' }}>Blog</Link>
          <Link to="/faq" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 18, margin: '18px 0', padding: '8px 24px', borderRadius: 16, transition: 'background 0.2s, color 0.2s', display: 'block' }}>FAQ</Link>
          <Link to="/pricing" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 18, margin: '18px 0', padding: '8px 24px', borderRadius: 16, transition: 'background 0.2s, color 0.2s', display: 'block' }}>Pricing</Link>
        </aside>
        <main style={{ marginLeft: 220, flex: 1, padding: '48px 32px' }} className="dashboard-main">
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#7f5af0', marginBottom: 32 }}>Blog</h2>
          <input
            type="text"
            placeholder="Search blog posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #e0d7f7', marginBottom: 32, fontSize: 16 }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {filteredPosts.length === 0 && <div style={{ color: '#888', fontSize: 18 }}>No posts found.</div>}
            {filteredPosts.map(post => (
              <div key={post.title} style={{
                background: '#f6fff7',
                borderRadius: 20,
                boxShadow: '0 2px 8px #2cb67d11',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}>
                <div style={{ color: '#2cb67d', fontWeight: 700, fontSize: 16 }}>{post.date}</div>
                <h3 style={{ color: '#7f5af0', fontWeight: 800, fontSize: 24, margin: 0 }}>{post.title}</h3>
                <p style={{ color: '#444', fontSize: 18, margin: '8px 0 0 0' }}>{post.excerpt}</p>
                <a href={post.link} style={{ color: '#2cb67d', fontWeight: 700, fontSize: 16, marginTop: 12, textDecoration: 'underline', alignSelf: 'flex-start' }}>
                  Read more
                </a>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Blog;
