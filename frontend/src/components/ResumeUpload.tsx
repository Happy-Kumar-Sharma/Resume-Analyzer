import React, { useState } from 'react';
import { uploadResume, saveResumeData } from '../api/resumeApi';

const ResumeUpload: React.FC<{ onParsed: (data: any) => void }> = ({ onParsed }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      // 1. Upload file to backend and get extracted text
      const res = await uploadResume(file);
      const text = res.text;
      if (!text || text.trim().length < 20) {
        setError('Could not extract text from file.');
        setLoading(false);
        return;
      }
      // 2. Use Puter.js to analyze the extracted text
      if (!(window as any).puter || !(window as any).puter.ai) {
        setError('Puter.js is not loaded. Please check your internet connection and reload the page.');
        setLoading(false);
        return;
      }
      const prompt = `Extract the following fields from this resume text and return as a JSON object with these keys: name, email, phone, skills (array), education (array), experience (array). Resume: ${text}`;
      const result = await (window as any).puter.ai.chat(prompt, { model: 'gpt-4o' });
      let parsed;
      let aiContent = result?.result?.message?.content || result?.message?.content || result;

      if (typeof aiContent === 'string') {
        // Remove code block markers if present
        const jsonString = aiContent.replace(/```json|```/g, '').trim();
        try {
          parsed = JSON.parse(jsonString);
        } catch (e) {
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
      // Save structured data to backend
      const savePayload = {
        name: parsed.name || '',
        email: Array.isArray(parsed.email) ? parsed.email[0] : (parsed.email || ''),
        phone: parsed.phone || '',
        skills: parsed.skills || [],
        education: parsed.education || [],
        experience: parsed.experience || [],
        filename: file.name
      };
      try {
        await saveResumeData(savePayload);
      } catch (e) {
        // Saving to backend failed, but still show parsed data
        console.error('Failed to save resume data:', e);
      }
      onParsed(parsed);
    } catch (err) {
      setError('Failed to parse resume. See console for details.');
      console.error('Resume upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 32 }}>
      <label style={{ width: '100%' }}>
        <span style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#6b21a8' }}>Upload Resume (PDF/DOCX)</span>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          style={{ width: '100%', fontSize: 15, color: '#333', border: '1.5px solid #d1c4e9', borderRadius: 12, background: '#f3e8ff', padding: 8, cursor: 'pointer' }}
        />
      </label>
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        style={{ marginTop: 12, padding: '12px 32px', background: 'linear-gradient(90deg, #6366f1 0%, #a21caf 100%)', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 18, boxShadow: '0 2px 8px rgba(80,40,120,0.10)', border: 'none', cursor: file && !loading ? 'pointer' : 'not-allowed', opacity: !file || loading ? 0.6 : 1, transition: 'all 0.2s' }}
      >
        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg style={{ animation: 'spin 1s linear infinite', height: 20, width: 20, color: '#fff' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            Uploading...
          </span>
        ) : 'Upload Resume'}
      </button>
      {error && <div style={{ color: '#b91c1c', fontSize: 14, marginTop: 4 }}>{error}</div>}
    </div>
  );
};

export default ResumeUpload;
