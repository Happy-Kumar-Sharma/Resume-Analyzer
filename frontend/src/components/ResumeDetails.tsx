
import React from 'react';

interface ResumeDetailsProps {
  data: any;
}

const iconStyle = {
  width: 28,
  height: 28,
  marginRight: 12,
  color: '#7f5af0',
  flexShrink: 0,
};

const cardStyle = {
  background: 'linear-gradient(120deg, #f0f4ff 0%, #fbeaff 100%)',
  borderRadius: 20,
  boxShadow: '0 2px 12px rgba(127,90,240,0.07)',
  padding: 24,
  marginBottom: 18,
  display: 'flex',
  alignItems: 'center',
  animation: 'fadeInUp 0.7s',
};

const ResumeDetails: React.FC<ResumeDetailsProps> = ({ data }) => {
  if (!data) return null;
  return (
    <section style={{ margin: '32px 0 0 0' }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: '#7f5af0', marginBottom: 24, letterSpacing: '-1px', textAlign: 'center' }}>
        <span role="img" aria-label="resume">📄</span> Resume Details
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={cardStyle as React.CSSProperties}>
          <svg style={iconStyle as React.CSSProperties} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#7f5af0" opacity="0.08"/><path d="M12 12c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="#7f5af0"/></svg>
          <div><strong>Name:</strong> {data.name || '-'}</div>
        </div>
        <div style={cardStyle as React.CSSProperties}>
          <svg style={iconStyle as React.CSSProperties} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#2cb67d" opacity="0.08"/><path d="M21 8V7l-3 2.29V7c0-1.1-.9-2-2-2H8C6.9 5 6 5.9 6 7v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-3.29L21 17v-1l-3-2.29V17c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v3.29L21 8z" fill="#2cb67d"/></svg>
          <div><strong>Email:</strong> {data.email || '-'}</div>
        </div>
        <div style={cardStyle as React.CSSProperties}>
          <svg style={iconStyle as React.CSSProperties} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#f5a524" opacity="0.08"/><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.12.45 2.33.68 3.48.68.55 0 1 .45 1 1V20c0 1.1-.9 2-2 2C6.48 22 2 17.52 2 12c0-1.1.9-2 2-2h3c.55 0 1 .45 1 1 0 1.15.23 2.36.68 3.48.13.32.04.7-.21 1.11l-2.2 2.2z" fill="#f5a524"/></svg>
          <div><strong>Phone:</strong> {data.phone || '-'}</div>
        </div>
        <div style={cardStyle as React.CSSProperties}>
          <svg style={iconStyle as React.CSSProperties} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#7f5af0" opacity="0.08"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="#7f5af0"/></svg>
          <div><strong>Skills:</strong> {data.skills && data.skills.length ? data.skills.join(', ') : '-'}</div>
        </div>
        <div style={cardStyle as React.CSSProperties}>
          <svg style={iconStyle as React.CSSProperties} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#2cb67d" opacity="0.08"/><path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1-9h2v2h-2zm0 4h2v2h-2z" fill="#2cb67d"/></svg>
          <div><strong>Education:</strong> {data.education && data.education.length ? data.education.join(', ') : '-'}</div>
        </div>
        <div style={cardStyle as React.CSSProperties}>
          <svg style={iconStyle as React.CSSProperties} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#f5a524" opacity="0.08"/><path d="M17 10.5V7c0-1.1-.9-2-2-2H9C7.9 5 7 5.9 7 7v3.5c0 2.5 2.5 4.5 5 4.5s5-2 5-4.5zM12 17c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z" fill="#f5a524"/></svg>
          <div><strong>Experience:</strong> {data.experience && data.experience.length ? data.experience.join(', ') : '-'}</div>
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop {
          0% { transform: scale(0.7); }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </section>
  );
};

export default ResumeDetails;
