import React, { useState } from 'react';

const Dashboard = ({ user }) => {
  const [title, setTitle] = useState('');
  const [bulletPoints, setBulletPoints] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  const suggestions = [
    "TECH CONFERENCE 2025",
    "CYBERPUNK UNDERGROUND RAVE",
    "CORPORATE FOUNDERS MIXER"
  ];

  const handleGenerate = async () => {
    if (!bulletPoints) return;
    setLoading(true);
    setSaveStatus('');
    try {
      const response = await fetch('http://localhost:8080/api/events/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bulletPoints }),
      });
      
      const data = await response.json();
      if (data.description) {
        setDescription(data.description);
      } else {
        alert("Generation failed sequence.");
      }
    } catch (error) {
      console.error(error);
      alert("Neural link severed. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title || !description) return;
    try {
      const response = await fetch('http://localhost:8080/api/events/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      if (response.ok) {
        setSaveStatus('Data committed to mainframe.');
        setTimeout(() => setSaveStatus(''), 3000);
      }
    } catch (error) {
      setSaveStatus('Failed to write to database.');
    }
  };

  return (
    <div className="dashboard">
      
      {/* New Beautiful Welcome Banner */}
      <div className="welcome-banner glass">
        <img 
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop" 
          alt="Abstract Tech" 
          className="banner-img"
        />
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <h1>WELCOME TO NEXUS, <span style={{color: 'var(--primary)'}}>{user?.username || 'GUEST'}</span>.</h1>
          <p>
            You are securely authenticated. Utilize the Neural Content Matrix below to input raw data points 
            and extract production-ready marketing copy instantly.
          </p>
        </div>
      </div>

      <div className="generator-layout">
        
        {/* INPUT PANEL */}
        <div className="panel glass">
          <div className="panel-header">
            <h3>📝 INPUT PARAMETERS</h3>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Event Title</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. CYBERSEC SUMMIT 2025" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Raw Data Points</label>
            </div>
            <textarea 
              className="input-field" 
              placeholder="- Keynote at 10 AM by Elon Musk&#10;- Free VR headset for attendees&#10;- Cyberpunk dress code"
              value={bulletPoints}
              onChange={(e) => setBulletPoints(e.target.value)}
            />
            
            <div className="ai-suggestions" style={{ marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', alignSelf: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>AI Prompts:</span>
              {suggestions.map((sug, i) => (
                <div key={i} className="suggestion-chip" onClick={() => setTitle(sug)}>
                  {sug}
                </div>
              ))}
            </div>
          </div>

          <button className="btn-primary" onClick={handleGenerate} disabled={loading || !bulletPoints}>
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <span className="loading-spinner"></span> SYNTHESIZING...
              </span>
            ) : '⚡ SYNTHESIZE COPY'}
          </button>
        </div>

        {/* OUTPUT PANEL */}
        <div className="panel glass">
          <div className="panel-header">
            <h3>✨ AI OUTPUT MATRIX</h3>
            {description && (
              <button className="btn-secondary" onClick={handleSave}>
                💾 COMMIT TO DB
              </button>
            )}
          </div>
          
          {description ? (
            <textarea 
              className="input-field" 
              style={{ flexGrow: 1, minHeight: '300px', backgroundColor: 'rgba(0,0,0,0.6)' }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            <div className="empty-state">
              <div style={{ fontSize: '3rem', marginBottom: '1rem', filter: 'drop-shadow(0 0 10px var(--primary-glow))' }}>🤖</div>
              <p style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Awaiting input parameters to generate content matrix.</p>
            </div>
          )}

          {saveStatus && (
            <div style={{ padding: '1rem', background: 'rgba(255, 42, 95, 0.1)', color: 'var(--primary)', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(255, 42, 95, 0.2)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', fontWeight: 'bold' }}>
              {saveStatus}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;