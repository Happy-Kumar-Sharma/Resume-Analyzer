
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Cell } from 'recharts';

const COLORS = ['#7f5af0', '#2cb67d', '#f5a524', '#e0d7f7', '#fbeaff', '#f6fff7', '#fffbe6'];

interface SkillBarChartProps {
  analytics: any;
  loading: boolean;
}

const SkillBarChart: React.FC<SkillBarChartProps> = ({ analytics, loading }) => {
  const skillData = analytics && analytics.top_skills
    ? analytics.top_skills.map((s: any) => ({ name: s[0], value: s[1] }))
    : [];

  return (
    <section style={{ margin: '40px 0 0 0', background: '#fff', borderRadius: 20, boxShadow: '0 2px 12px rgba(127,90,240,0.07)', padding: 32 }}>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: '#f5a524', marginBottom: 16 }}>Skill Frequency (Bar Chart)</h3>
      {loading ? (
        <div style={{ color: '#888', fontWeight: 600 }}>Loading chart...</div>
      ) : skillData.length > 0 ? (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={skillData} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 13 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#7f5af0">
              {skillData.map((_: any, idx: number) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div style={{ color: '#f55', fontWeight: 600 }}>No skill data found.</div>
      )}
    </section>
  );
};

export default SkillBarChart;
