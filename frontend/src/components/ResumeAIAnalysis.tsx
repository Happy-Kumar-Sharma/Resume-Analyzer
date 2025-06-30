import React, { useState } from 'react';


interface ResumeAIAnalysisProps {
  initialResume?: any;
  onAnalysisComplete?: (result: any) => void;
  hideHeading?: boolean;
  onBack?: () => void;
}

const ResumeAIAnalysis: React.FC<ResumeAIAnalysisProps> = ({ initialResume, onAnalysisComplete, hideHeading, onBack }) => {
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
        setError('Puter.js is not loaded. Please check your internet connection and reload the page.');
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
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 0 }}>
      {!hideHeading && <h2>AI Resume & JD Analysis</h2>}
      <textarea
        placeholder="Paste resume JSON here (from extraction step)"
        value={resume ? JSON.stringify(resume, null, 2) : ''}
        onChange={e => {
          try {
            setResume(JSON.parse(e.target.value));
          } catch {
            setResume(null);
          }
        }}
        rows={8}
        style={{ width: '100%', marginBottom: 12 }}
        disabled={!!initialResume}
      />
      <textarea
        placeholder="Paste job description here"
        value={jd}
        onChange={e => setJD(e.target.value)}
        rows={6}
        style={{ width: '100%', marginBottom: 12 }}
      />
      <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
        {/* Back button for step 2, only show if hideHeading is true (i.e., in step 2) */}
        {hideHeading && (
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
