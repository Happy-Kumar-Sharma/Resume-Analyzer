

import React from 'react';

interface Props {
  analytics: any;
  loading: boolean;
}

const DashboardAnalytics: React.FC<Props> = ({ analytics, loading }) => {
  return (
    <section style={{ margin: '32px 0' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#2cb67d', marginBottom: 16 }}>Your Analytics</h2>
      {loading ? (
        <div style={{ color: '#888', fontWeight: 600 }}>Loading analytics...</div>
      ) : analytics ? (
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          <div style={{ background: '#f0f4ff', borderRadius: 16, padding: 24, minWidth: 180, boxShadow: '0 2px 8px rgba(127,90,240,0.07)', textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#7f5af0' }}>{analytics.resume_count}</div>
            <div style={{ color: '#888', fontWeight: 600 }}>Resumes Analyzed</div>
          </div>
          <div style={{ background: '#fffbe6', borderRadius: 16, padding: 24, minWidth: 180, boxShadow: '0 2px 8px rgba(255,215,64,0.07)', textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#f5a524' }}>{analytics.top_skills && analytics.top_skills.length > 0 ? analytics.top_skills[0][0] : '-'}</div>
            <div style={{ color: '#888', fontWeight: 600 }}>Top Skill</div>
          </div>
          <div style={{ background: '#f6fff7', borderRadius: 16, padding: 24, minWidth: 180, boxShadow: '0 2px 8px rgba(44,182,125,0.07)', textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#2cb67d' }}>{analytics.top_skills && analytics.top_skills.length > 0 ? analytics.top_skills[0][1] : 0}</div>
            <div style={{ color: '#888', fontWeight: 600 }}>Top Skill Count</div>
          </div>
        </div>
      ) : (
        <div style={{ color: '#f55', fontWeight: 600 }}>No analytics data found.</div>
      )}
    </section>
  );
};

export default DashboardAnalytics;
