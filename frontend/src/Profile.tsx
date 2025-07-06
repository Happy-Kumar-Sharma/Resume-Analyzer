import React, { useState } from 'react';

const Profile: React.FC = () => {
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
            <a href="/history">History</a>
            <a href="/settings">Settings</a>
            <a href="/blog">Blog</a>
            <a href="/faq">FAQ</a>
            <a href="/pricing">Pricing</a>
          </div>
        )}
      </nav>
      <div style={{ maxWidth: 600, margin: '48px auto', background: '#fff', borderRadius: 24, boxShadow: '0 2px 12px rgba(127,90,240,0.07)', padding: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" style={{ width: 80, height: 80, borderRadius: '50%', border: '4px solid #7f5af0' }} />
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#7f5af0', margin: 0 }}>John Doe</h2>
            <div style={{ color: '#888', fontWeight: 600 }}>john.doe@email.com</div>
          </div>
        </div>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <label>
            Name
            <input type="text" defaultValue="John Doe" style={{ width: '100%', padding: 12, borderRadius: 12, border: '1.5px solid #e0d7f7', marginTop: 4 }} />
          </label>
          <label>
            Email
            <input type="email" defaultValue="john.doe@email.com" style={{ width: '100%', padding: 12, borderRadius: 12, border: '1.5px solid #e0d7f7', marginTop: 4 }} />
          </label>
          <label>
            Bio
            <textarea defaultValue="AI enthusiast and Python developer." style={{ width: '100%', padding: 12, borderRadius: 12, border: '1.5px solid #e0d7f7', marginTop: 4 }} />
          </label>
          <button type="submit" style={{ background: 'linear-gradient(90deg, #2cb67d 0%, #7f5af0 100%)', color: '#fff', fontWeight: 700, fontSize: 18, borderRadius: 12, padding: '12px 0', border: 'none', marginTop: 12, cursor: 'pointer' }}>Save Changes</button>
        </form>
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <button style={{ background: '#fff', color: '#7f5af0', border: '2px solid #7f5af0', borderRadius: 12, padding: '10px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer', marginRight: 16 }}>Sign in with Google</button>
          <button style={{ background: '#fff', color: '#2cb67d', border: '2px solid #2cb67d', borderRadius: 12, padding: '10px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Sign in with LinkedIn</button>
        </div>
      </div>
    </>
  );
};

export default Profile;
