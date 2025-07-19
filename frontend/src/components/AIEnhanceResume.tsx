import React, { useState } from 'react';

interface Props {
  resumeData: any;
}

const AIEnhanceResume: React.FC<Props> = ({ resumeData }) => {
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEnhance = async () => {
    setLoading(true);
    setError(null);
    setAiResult(null);
    try {
      if (!(window as any).puter || !(window as any).puter.ai) {
        setError('AI bot is not loaded. Please check your internet connection and reload the page.');
        setLoading(false);
        return;
      }
      const prompt = `You are an expert resume coach. Analyze the following resume sections and provide actionable, specific suggestions to improve the summary, skills, experience, and education. Return your suggestions as a clear, readable list.\n\nResume Data: ${JSON.stringify(resumeData)}`;
      const result = await (window as any).puter.ai.chat(prompt, { model: 'gpt-4o' });
      let aiContent = result?.result?.message?.content || result?.message?.content || result;
      setAiResult(typeof aiContent === 'string' ? aiContent : JSON.stringify(aiContent));
    } catch (e: any) {
      setError(e?.message || 'AI enhancement failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ margin: '32px 0', background: '#fffbe6', borderRadius: 20, boxShadow: '0 2px 12px rgba(255,215,64,0.07)', padding: 32 }}>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: '#f5a524', marginBottom: 16 }}>AI-Powered Resume Enhancement</h3>
      <p style={{ color: '#888', marginBottom: 16 }}>Get instant, actionable suggestions to improve your resume sections. Powered by GPT.</p>
      <button className="cta-btn" style={{ background: '#7f5af0', color: '#fff', marginBottom: 20 }} onClick={handleEnhance} disabled={loading}>
        {loading ? 'Enhancing...' : 'Enhance with AI'}
      </button>
      {aiResult && (
        <div style={{ background: '#f6fff7', borderRadius: 16, padding: 20, marginTop: 16, whiteSpace: 'pre-line', color: '#232046', fontSize: 16, boxShadow: '0 2px 8px rgba(44,182,125,0.07)' }}>
          <strong>AI Suggestions:</strong>
          <div style={{ marginTop: 8 }}>{aiResult}</div>
        </div>
      )}
      {error && <div style={{ color: '#f55', marginTop: 12 }}>{error}</div>}
    </section>
  );
};

export default AIEnhanceResume;
