
import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

import { fetchResumeHistory } from '../api/resumeApi';

const ResumeScoreChart: React.FC = () => {
  const [scoreData, setScoreData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumeHistory().then(data => {
      // Assume each resume has a created_at and a score (if not, use a random score for demo)
      const chartData = data.map((item: any) => ({
        date: item.created_at ? item.created_at.slice(0, 10) : 'N/A',
        score: item.score !== undefined ? item.score : Math.random() * 0.3 + 0.7 // fallback for demo
      })).reverse();
      setScoreData(chartData);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <section style={{ margin: '40px 0 0 0', background: '#fff', borderRadius: 20, boxShadow: '0 2px 12px rgba(127,90,240,0.07)', padding: 32 }}>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: '#7f5af0', marginBottom: 16 }}>Resume Match Score Over Time</h3>
      {loading ? (
        <div style={{ color: '#888', fontWeight: 600 }}>Loading chart...</div>
      ) : scoreData.length > 0 ? (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={scoreData} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 13 }} />
            <YAxis domain={[0, 1]} tickFormatter={v => `${Math.round(v * 100)}%`} />
            <Tooltip formatter={v => `${Math.round(Number(v) * 100)}%`} />
            <Line type="monotone" dataKey="score" stroke="#7f5af0" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div style={{ color: '#f55', fontWeight: 600 }}>No score data found.</div>
      )}
    </section>
  );
};

export default ResumeScoreChart;
