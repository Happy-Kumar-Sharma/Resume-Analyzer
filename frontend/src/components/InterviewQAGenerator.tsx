import React, { useState } from 'react';
import { exportQAToPDF, exportQAToDOCX } from './qaExportUtils';

interface InterviewQAGeneratorProps {
  resume: any;
  jd: string;
  qa: any[];
  setQA: (qa: any[]) => void;
}

const InterviewQAGenerator: React.FC<InterviewQAGeneratorProps> = ({ resume, jd, qa, setQA }) => {
  console.log('DEBUG: InterviewQAGenerator rendered', { resume, jd, qa });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setQA([]);
    try {
      console.log('DEBUG: handleGenerate called', { resume, jd });
      if (!resume || !jd) {
        setError('Resume or Job Description is empty.');
        setLoading(false);
        return;
      }
      if (!(window as any).puter || !(window as any).puter.ai) {
        setError('Puter.js is not loaded. Please check your internet connection and reload the page.');
        setLoading(false);
        return;
      }
      const prompt = `Given the following resume and job description, generate a list of 15 likely interview questions the candidate might be asked, and provide a suggested answer for each. If resume is related to a developer then suggest 10 more technical questions and their best answer as per resume that should be prepared for the interview as per JD separately. Return as a JSON array of objects with 'question' and 'answer' fields.\n\nResume: ${JSON.stringify(resume)}\n\nJob Description: ${jd}`;
      console.log('DEBUG: Sending prompt to Puter.js', prompt);
      const result = await (window as any).puter.ai.chat(prompt, { model: 'gpt-4o' });
      console.log('DEBUG: Puter.js result', result);
      let aiContent = result?.result?.message?.content || result?.message?.content || result;
      let parsed;
      if (typeof aiContent === 'string') {
        const jsonString = aiContent.replace(/```json|```/g, '').trim();
        try {
          parsed = JSON.parse(jsonString);
        } catch (err) {
          const match = jsonString.match(/\[.*\]/s);
          if (match) parsed = JSON.parse(match[0]);
          else {
            console.error('DEBUG: Could not parse AI response', aiContent);
            throw new Error('Could not parse AI response.');
          }
        }
      } else if (Array.isArray(aiContent)) {
        parsed = aiContent;
      } else {
        console.error('DEBUG: AI response is not a string or array', aiContent);
        throw new Error('AI response is not a string or array.');
      }
      setQA(parsed);
    } catch (e: any) {
      setError('Failed to generate interview Q&A. ' + (e?.message || ''));
      console.error('DEBUG: Error in handleGenerate', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ background: '#f0f4ff', borderRadius: 20, boxShadow: '0 2px 12px #7f5af022', padding: 32, marginTop: 32, width: '100%' }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#7f5af0', marginBottom: 16 }}>Step 4: Interview Q&A Generator</h2>
      <div style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>
        <b>Debug:</b> Resume: {resume ? 'present' : 'missing'} | JD: {jd ? 'present' : 'missing'}
      </div>
      <p style={{ color: '#555', marginBottom: 16 }}>Generate likely interview questions and suggested answers based on your resume and the job description.</p>
      <button className="cta-btn" 
        onClick={() => {
          console.log('DEBUG: Button clicked', { resume, jd, loading, disabled: loading || !resume || !jd });
          handleGenerate();
        }} 
        disabled={loading || !resume || !jd}
      >
        {loading ? 'Generating...' : 'Generate Interview Q&A'}
      </button>
      {error && <div style={{ color: '#f55', marginTop: 12 }}>Error: {error}</div>}
      {qa.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h3 style={{ color: '#2cb67d', fontWeight: 700, marginBottom: 12 }}>Sample Interview Questions & Answers</h3>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            {/* <button className="cta-btn" style={{ background: '#7f5af0', color: '#fff' }} onClick={() => exportQAToPDF(qa)}>
              Export to PDF
            </button> */}
            <button className="cta-btn" style={{ background: '#2cb67d', color: '#fff' }} onClick={() => exportQAToDOCX(qa)}>
              Export to DOCX
            </button>
          </div>
          <ol style={{ paddingLeft: 24 }}>
            {qa.map((item, idx) => (
              <li key={idx} style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 600, color: '#232046' }}>{item.question}</div>
                <div style={{ color: '#555', marginTop: 4 }}>{item.answer}</div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
};

export default InterviewQAGenerator;
