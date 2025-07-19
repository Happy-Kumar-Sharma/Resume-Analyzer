
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface SkillRadarChartProps {
  analytics: any;
  loading: boolean;
}

const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ analytics, loading }) => {
  const skillData = analytics && analytics.top_skills
    ? analytics.top_skills.map((s: any) => ({ skill: s[0], value: s[1] }))
    : [];

  return (
    <section style={{ margin: '40px 0 0 0', background: '#fff', borderRadius: 20, boxShadow: '0 2px 12px rgba(127,90,240,0.07)', padding: 32 }}>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: '#2cb67d', marginBottom: 16 }}>Skill Distribution (Radar Chart)</h3>
      {loading ? (
        <div style={{ color: '#888', fontWeight: 600 }}>Loading chart...</div>
      ) : skillData.length > 0 ? (
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart cx="50%" cy="50%" outerRadius={110} data={skillData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" tick={{ fontSize: 13 }} />
            <PolarRadiusAxis angle={30} domain={[0, Math.max(...skillData.map((s: any) => s.value), 1)]} />
            <Radar name="Skill Frequency" dataKey="value" stroke="#7f5af0" fill="#7f5af0" fillOpacity={0.5} />
            <Tooltip />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      ) : (
        <div style={{ color: '#f55', fontWeight: 600 }}>No skill data found.</div>
      )}
    </section>
  );
};

export default SkillRadarChart;
