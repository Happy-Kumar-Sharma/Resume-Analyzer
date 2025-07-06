import React, { useState } from 'react';

import ResumeUpload from './components/ResumeUpload';
import ResumeDetails from './components/ResumeDetails';
import AIEnhanceResume from './components/AIEnhanceResume';
import ResumeAIAnalysis from './components/ResumeAIAnalysis';
import InterviewQAGenerator from './components/InterviewQAGenerator';
import { matchJD, getSuggestions, recommendJobs } from './api/resumeApi';
import { Link } from 'react-router-dom';




const HeaderNav = () => (
  <nav style={{
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0px',
    background: 'linear-gradient(120deg, #7f5af0 0%, #2cb67d 100%)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 12px rgba(127,90,240,0.07)'
  }}>
    <span style={{ fontWeight: 800, fontSize: 28, color: '#fff', letterSpacing: '-1px', padding: '6px 18px' }}>AI Resume Analyzer</span>
    <div style={{ display: 'flex', gap: 16 }}>
      {/* <a href="#analyze" className="cta-btn" style={{ background: '#7f5af0', color: '#fff', fontWeight: 700, fontSize: 16, borderRadius: 16, padding: '10px 28px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(127,90,240,0.10)', transition: 'background 0.2s' }}>
        Analyze My Resume
      </a> */}
      <Link to="/dashboard" style={{ color: '#fff', background: 'rgba(44,182,125,0.95)', fontWeight: 700, fontSize: 16, borderRadius: 16, padding: '10px 28px', textDecoration: 'none', display: 'inline-block', boxShadow: '0 2px 8px rgba(44,182,125,0.10)', transition: 'background 0.2s', marginLeft: 8 }}>
        Go to Dashboard & Analytics
      </Link>
    </div>
  </nav>
);

const Hero = () => (
  <section className="hero" style={{ width: '100%', padding: '48px 0 0 0', background: 'linear-gradient(120deg, #7f5af0 0%, #2cb67d 100%)', minHeight: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
    <div style={{ marginBottom: 18 }}>
      <img src="/resume-analyzer.png" alt="Resume Analyzer Logo" style={{ width: 80, height: 80, borderRadius: 18, boxShadow: '0 4px 24px #7f5af033', marginBottom: 10 }} />
    </div>
    <h1 className="hero-title" style={{ color: '#fff', fontSize: 40, fontWeight: 800, marginBottom: 12, textAlign: 'center', letterSpacing: '-1px' }}>AI-Powered Resume Analyzer</h1>
    <p className="hero-subtitle" style={{ color: '#fff', fontSize: 20, fontWeight: 500, marginBottom: 28, maxWidth: 600, textAlign: 'center' }}>
      Get instant, AI-driven resume analysis, actionable suggestions, and job matches. Elevate your career with a world-class resume.
    </p>
  </section>
);


const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [resumeData, setResumeData] = useState<any>(null);
  const [jd, setJd] = useState('');
  const [matchResult, setMatchResult] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [qaResult, setQaResult] = useState<any[]>([]);


  const handleResumeParsed = (data: any) => {
    setResumeData(data);
    setMatchResult(null);
    setSuggestions(null);
    setJobs([]);
    setStep(2);
  };


  const handleAnalyze = async () => {
    if (!resumeData || !jd) return;
    const match = await matchJD(resumeData, jd);
    setMatchResult(match);
    const sugg = await getSuggestions(resumeData, jd);
    setSuggestions(sugg);
    const jobList = await recommendJobs(resumeData);
    setJobs(jobList);
    setStep(3);
  };

  return (
    <>
      <HeaderNav />
      <Hero />
      <main className="main-card" id="analyze">
        {/* Stepper Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: resumeData ? '#2cb67d' : '#e0e0e0', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, boxShadow: resumeData ? '0 2px 8px #2cb67d33' : 'none', transition: 'all 0.2s' }}>1</div>
            <div style={{ width: 40, height: 2, background: resumeData ? '#2cb67d' : '#e0e0e0', transition: 'all 0.2s' }} />
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: resumeData ? '#7f5af0' : '#e0e0e0', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, boxShadow: matchResult ? '0 2px 8px #7f5af033' : 'none', transition: 'all 0.2s' }}>2</div>
            <div style={{ width: 40, height: 2, background: matchResult ? '#7f5af0' : '#e0e0e0', transition: 'all 0.2s' }} />
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: matchResult ? '#f5a524' : '#e0e0e0', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, boxShadow: jobs.length > 0 ? '0 2px 8px #f5a52433' : 'none', transition: 'all 0.2s' }}>3</div>
            <div style={{ width: 40, height: 2, background: step === 4 ? '#7f5af0' : '#e0e0e0', transition: 'all 0.2s' }} />
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: step === 4 ? '#7f5af0' : '#e0e0e0', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, boxShadow: step === 4 ? '0 2px 8px #7f5af033' : 'none', transition: 'all 0.2s' }}>4</div>
          </div>
        </div>

        {/* Step 1: Upload Resume */}
        {step === 1 && (
          <div style={{ background: '#f0f4ff', borderRadius: 24, padding: 0, boxShadow: '0 2px 12px rgba(127,90,240,0.07)', width: '100%', minHeight: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeInUp 0.7s' }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#7f5af0', marginBottom: 16 }}>Step 1: Upload Resume (PDF/DOCX)</h2>
            <ResumeUpload onParsed={handleResumeParsed} />
            <button className="cta-btn" style={{ marginTop: 16 }} onClick={() => setStep(2)} disabled={!resumeData}>Next</button>
          </div>
        )}

        {/* Step 2: Resume Details & JD */}
        {step === 2 && resumeData && (
          <div style={{ background: '#f6fff7', borderRadius: 24, padding: 32, boxShadow: '0 2px 12px rgba(44,182,125,0.07)', width: '100%', minHeight: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeInUp 0.7s' }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#2cb67d', marginBottom: 16 }}>Step 2: Resume Details & Paste Job Description</h2>
            <ResumeDetails data={resumeData} />
            <AIEnhanceResume resumeData={resumeData} />
            {/* Unified AI Resume & JD Analysis */}
            <div style={{ width: '100%', marginTop: 24 }}>
              <ResumeAIAnalysis
                initialResume={resumeData}
                onAnalysisComplete={setMatchResult}
                hideHeading
                onBack={() => setStep(1)}
                onJDChange={setJd}
              />
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
              <button className="cta-btn" style={{ background: '#e0d7f7', color: '#232046' }} onClick={() => setStep(1)}>Back</button>
              <button className="cta-btn" style={{ background: '#7f5af0', color: '#fff' }} onClick={() => setStep(3)} disabled={!matchResult}>Next</button>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && matchResult && (
          <div style={{ background: '#fffbe6', borderRadius: 24, padding: 32, boxShadow: '0 2px 12px rgba(255,215,64,0.07)', width: '100%', minHeight: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeInUp 0.7s' }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f5a524', marginBottom: 16 }}>Step 3: Results & Recommendations</h2>
            <div style={{ marginTop: 8, background: '#f0f4ff', borderRadius: 16, padding: 20, width: '100%' }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2cb67d', marginBottom: 8 }}>AI Analysis Result</h3>
              <p><span style={{ fontWeight: 600 }}>Similarity Score:</span> {matchResult.similarity_score}</p>
              <p><span style={{ fontWeight: 600 }}>Matched Keywords:</span> {matchResult.matched_keywords?.join(', ')}</p>
              <p><span style={{ fontWeight: 600 }}>Missing Skills:</span> {matchResult.missing_skills?.join(', ')}</p>
              <h4 style={{ fontWeight: 600, marginTop: 12 }}>Suggestions</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 12 }}>
                {matchResult.suggestions?.map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
              <h4 style={{ fontWeight: 600, marginTop: 12 }}>Recommended Courses</h4>
              <ul style={{ paddingLeft: 24 }}>
                {matchResult.courses?.map((c: string, i: number) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
              <h4 style={{ fontWeight: 600, marginTop: 12 }}>Job Recommendations</h4>
              <ul style={{ paddingLeft: 24 }}>
                {matchResult.recommendations?.map((job: any, i: number) => (
                  <li key={i} style={{ marginBottom: 12 }}>
                    <strong>{job.job_title}</strong> at {job.company} (Score: {job.match_score}){' '}
                    {job.link && <a href={job.link} target="_blank" rel="noopener noreferrer" style={{ color: '#7f5af0', textDecoration: 'underline' }}>[Link]</a>}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
              <button className="cta-btn" style={{ background: '#e0d7f7', color: '#232046' }} onClick={() => setStep(2)}>Back</button>
              <button className="cta-btn" style={{ background: '#7f5af0', color: '#fff' }} onClick={() => setStep(4)}>Next</button>
              <button className="cta-btn" onClick={() => setStep(1)}>Start Over</button>
            </div>
          </div>
        )}

        {/* Step 4: Interview Q&A Generator */}
        {step === 4 && resumeData && (matchResult || jd) && (
          <div style={{ width: '100%' }}>
            <InterviewQAGenerator
              resume={resumeData}
              jd={matchResult?.job_description || jd || ''}
              qa={qaResult}
              setQA={setQaResult}
            />
            <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
              <button className="cta-btn" style={{ background: '#e0d7f7', color: '#232046' }} onClick={() => setStep(3)}>Back to Results</button>
              <button className="cta-btn" onClick={() => setStep(1)}>Start Over</button>
            </div>
          </div>
        )}


        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </main>
      {/* Testimonials Section */}
      <section style={{ margin: '40px 0 0 0', padding: '0 0 32px 0', borderBottom: '1px solid #f0f0f0', width: '100%', maxWidth: 900 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#2cb67d', marginBottom: 16, textAlign: 'center' }}>What Our Users Say</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
          <div style={{ background: '#f0f4ff', borderRadius: 20, padding: 20, maxWidth: 260, boxShadow: '0 2px 8px rgba(127,90,240,0.07)' }}>
            <p style={{ fontStyle: 'italic', marginBottom: 8 }}>&ldquo;I landed 3 interviews after updating my resume with the AI suggestions!&rdquo;</p>
            <span style={{ fontWeight: 600 }}>— Priya S., Data Scientist</span>
          </div>
          <div style={{ background: '#f6fff7', borderRadius: 20, padding: 20, maxWidth: 260, boxShadow: '0 2px 8px rgba(44,182,125,0.07)' }}>
            <p style={{ fontStyle: 'italic', marginBottom: 8 }}>&ldquo;The job recommendations were spot on. Highly recommended!&rdquo;</p>
            <span style={{ fontWeight: 600 }}>— Rahul M., Backend Engineer</span>
          </div>
          <div style={{ background: '#fffbe6', borderRadius: 20, padding: 20, maxWidth: 260, boxShadow: '0 2px 8px rgba(255,215,64,0.07)' }}>
            <p style={{ fontStyle: 'italic', marginBottom: 8 }}>&ldquo;Super easy to use and the UI feels like a real startup!&rdquo;</p>
            <span style={{ fontWeight: 600 }}>— Anjali T., Product Manager</span>
          </div>
        </div>
      </section>
      {/* Trust Badges Section */}
      <section style={{ margin: '48px 0 0 0', textAlign: 'center', width: '100%' }}>
        <h3 style={{ fontWeight: 700, color: '#7f5af0', marginBottom: 16 }}>Trusted by professionals from</h3>
        <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" style={{ height: 32, opacity: 0.7 }} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Google_Logo.svg" alt="Google" style={{ height: 32, opacity: 0.7 }} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" style={{ height: 32, opacity: 0.7 }} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Amazon_Web_Services_Logo.svg" alt="AWS" style={{ height: 32, opacity: 0.7 }} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/LinkedIn_logo_initials.png" alt="LinkedIn" style={{ height: 32, opacity: 0.7 }} />
        </div>
      </section>
      {/* Footer */}
      <footer style={{ margin: '48px 0 0 0', textAlign: 'center', color: '#888', fontSize: 15, width: '100%' }}>
        <div style={{ marginBottom: 8 }}>
          &copy; {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.
        </div>
        <div>
          <a href="#" style={{ color: '#7f5af0', textDecoration: 'underline', marginRight: 16 }}>Privacy Policy</a>
          <a href="#" style={{ color: '#7f5af0', textDecoration: 'underline' }}>Contact</a>
        </div>

      </footer>
    </>
  );
}

export default App;
