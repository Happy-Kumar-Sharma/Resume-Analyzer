
import React, { useEffect, useState } from 'react';
import { fetchResumeHistory } from '../api/resumeApi';


const ResumeHistory: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumeHistory().then(data => {
      setHistory(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <section style={{ marginTop: 32 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#7f5af0', marginBottom: 16 }}>Resume Analysis History</h2>
      {loading ? (
        <div style={{ color: '#888', fontWeight: 600 }}>Loading history...</div>
      ) : history.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {history.map((item, idx) => (
            <div key={idx} style={{ background: '#f0f4ff', borderRadius: 16, padding: 20, boxShadow: '0 2px 8px rgba(127,90,240,0.07)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontWeight: 600, fontSize: 17 }}>{item.name || 'Resume'} <span style={{ color: '#888', fontWeight: 400, fontSize: 15 }}>({item.created_at ? item.created_at.slice(0, 10) : ''})</span></div>
              <div>Email: <span style={{ color: '#2cb67d', fontWeight: 700 }}>{item.email}</span></div>
              <div>Skills: <span style={{ color: '#2cb67d' }}>{item.skills}</span></div>
              <div>Education: <span style={{ color: '#7f5af0' }}>{item.education}</span></div>
              <div>Experience: <span style={{ color: '#f5a524' }}>{item.experience}</span></div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ color: '#f55', fontWeight: 600 }}>No resume history found.</div>
      )}
    </section>
  );
};

export default ResumeHistory;
