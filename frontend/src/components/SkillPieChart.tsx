

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#7f5af0', '#2cb67d', '#f5a524', '#e0d7f7', '#fbeaff', '#f6fff7', '#fffbe6'];

interface SkillPieChartProps {
  analytics: any;
  loading: boolean;
}

const SkillPieChart: React.FC<SkillPieChartProps> = ({ analytics, loading }) => {
  const skillData = analytics && analytics.top_skills
    ? analytics.top_skills.map((s: any) => ({ name: s[0], value: s[1] }))
    : [];

  return (
    <section style={{ margin: '40px 0 0 0', background: '#fff', borderRadius: 20, boxShadow: '0 2px 12px rgba(127,90,240,0.07)', padding: 32 }}>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: '#2cb67d', marginBottom: 16 }}>Top Skills in Your Resumes</h3>
      {loading ? (
        <div style={{ color: '#888', fontWeight: 600 }}>Loading chart...</div>
      ) : skillData.length > 0 ? (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={skillData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#7f5af0"
              label={({ name, percent }) => `${name} (${Math.round(percent * 100)}%)`}
            >
              {skillData.map((_: any, idx: number) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div style={{ color: '#f55', fontWeight: 600 }}>No skill data found.</div>
      )}
    </section>
  );
};

export default SkillPieChart;
