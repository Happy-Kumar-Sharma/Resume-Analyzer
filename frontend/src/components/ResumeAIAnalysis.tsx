import React, { useState } from 'react';


interface ResumeAIAnalysisProps {
  initialResume?: any;
  onAnalysisComplete?: (result: any) => void;
  hideHeading?: boolean;
  onBack?: () => void;
  onJDChange?: (jd: string) => void;
}

const ResumeAIAnalysis: React.FC<ResumeAIAnalysisProps> = ({ initialResume, onAnalysisComplete, hideHeading, onBack, onJDChange }) => {
  const [resume, setResume] = useState<any>(initialResume || null);
  const [jd, setJD] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      // Use Puter.js directly in the browser for AI analysis
      if (!(window as any).puter || !(window as any).puter.ai) {
        setError('AI bot is not loaded. Please check your internet connection and reload the page.');
        setLoading(false);
        return;
      }

      // 1. Parse resume (if not already parsed)
      let parsedResume = resume;
      if (typeof resume === 'string') {
        try {
          parsedResume = JSON.parse(resume);
        } catch {
          setError('Resume JSON is invalid.');
          setLoading(false);
          return;
        }
      }

      // 2. Build a prompt for unified resume + JD analysis
      const prompt = `Given the following resume data and job description, perform the following:\n\n- Calculate a similarity score (0-100) between the resume and the job description.\n- List matched keywords (skills/technologies).\n- List missing skills.\n- Suggest improvements for the resume to better match the job description.\n- Recommend relevant courses (as an array of strings).\n- Recommend 3 job titles and companies (with a match score 0-100 and a link if possible) that fit this candidate.\n\nReturn a JSON object with keys: similarity_score, matched_keywords (array), missing_skills (array), suggestions (array), courses (array), recommendations (array of objects with job_title, company, match_score, link).\n\nResume: ${JSON.stringify(parsedResume)}\n\nJob Description: ${jd}`;

      const result = await (window as any).puter.ai.chat(prompt, { model: 'gpt-4o' });
      let aiContent = result?.result?.message?.content || result?.message?.content || result;
      let parsed;
      if (typeof aiContent === 'string') {
        // Remove code block markers if present
        const jsonString = aiContent.replace(/```json|```/g, '').trim();
        try {
          parsed = JSON.parse(jsonString);
        } catch {
          // Fallback: try to extract JSON from string
          const match = jsonString.match(/\{[\s\S]*\}/);
          if (match) parsed = JSON.parse(match[0]);
          else throw new Error('Could not parse AI response.');
        }
      } else if (typeof aiContent === 'object') {
        parsed = aiContent;
      } else {
        throw new Error('AI response is not a string or object.');
      }
      setResult(parsed);
      if (onAnalysisComplete) {
        onAnalysisComplete(parsed);
      }
    } catch (e) {
      setError('AI analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '100%', margin: '0 auto', padding: 0 }}>
      {!hideHeading && <h2>AI Resume & JD Analysis</h2>}
      <label style={{ display: 'block', width: '100%', marginBottom: 12, maxWidth: '100%' }}>
        <span style={{ display: 'block', fontWeight: 600, marginBottom: 6, color: '#7f5af0' }}>Resume JSON (from extraction step)</span>
        <textarea
          placeholder="Paste resume JSON here..."
          value={resume ? JSON.stringify(resume, null, 2) : ''}
          onChange={e => {
            try {
              setResume(JSON.parse(e.target.value));
            } catch {
              setResume(null);
            }
          }}
          rows={8}
          style={{
            width: '100vw',
            maxWidth: '100%',
            minWidth: '100%',
            borderRadius: 12,
            border: '1.5px solid #d1c4e9',
            background: '#f3e8ff',
            padding: 14,
            fontSize: 15,
            color: '#333',
            fontFamily: 'Fira Mono, monospace',
            marginBottom: 0,
            boxShadow: '0 2px 8px rgba(127,90,240,0.04)',
            transition: 'border 0.2s',
            outline: 'none',
            resize: 'vertical',
          }}
          disabled={!!initialResume}
        />
      </label>
      <label style={{ display: 'block', width: '100%', marginBottom: 12, maxWidth: '100%' }}>
        <span style={{ display: 'block', fontWeight: 600, marginBottom: 6, color: '#2cb67d' }}>Job Description</span>
        <textarea
          placeholder="Paste job description here..."
          value={jd}
          onChange={e => {
            setJD(e.target.value);
            if (typeof onJDChange === 'function') onJDChange(e.target.value);
          }}
          rows={6}
          style={{
            width: '100vw',
            maxWidth: '100%',
            minWidth: '100%',
            borderRadius: 12,
            border: '1.5px solid #b2f2dd',
            background: '#e6fff7',
            padding: 14,
            fontSize: 15,
            color: '#333',
            fontFamily: 'inherit',
            marginBottom: 0,
            boxShadow: '0 2px 8px rgba(44,182,125,0.04)',
            transition: 'border 0.2s',
            outline: 'none',
            resize: 'vertical',
          }}
        />
      </label>
      <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
        {/* Only show Back button if NOT hideHeading (i.e., not in stepper/flow) */}
        {!hideHeading && (
          <button className="cta-btn" style={{ background: '#e0d7f7', color: '#232046' }} onClick={onBack}>
            Back
          </button>
        )}
        <button className="cta-btn" onClick={handleAnalyze} disabled={loading || !resume || !jd}>
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </div>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {result && (
        <div style={{ marginTop: 24 }}>
          <h3>AI Analysis Result</h3>
          <div><b>Similarity Score:</b> {result.similarity_score}</div>
          <div><b>Matched Keywords:</b> {result.matched_keywords?.join(', ')}</div>
          <div><b>Missing Skills:</b> {result.missing_skills?.join(', ')}</div>
          <div><b>Suggestions:</b>
            <ul>{result.suggestions?.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
          </div>
          <div><b>Recommended Courses:</b>
            <ul>{result.courses?.map((c: string, i: number) => <li key={i}>{c}</li>)}</ul>
          </div>
          <div><b>Job Recommendations:</b>
            <ul>
              {result.recommendations?.map((job: any, i: number) => (
                <li key={i}>
                  <b>{job.job_title}</b> at {job.company} (Score: {job.match_score}) {job.link && <a href={job.link} target="_blank" rel="noopener noreferrer">[Link]</a>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAIAnalysis;
