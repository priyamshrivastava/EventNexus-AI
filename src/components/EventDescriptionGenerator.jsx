import React, { useState } from 'react';

const EventDescriptionGenerator = () => {
  const [title, setTitle] = useState('');
  const [bulletPoints, setBulletPoints] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  const handleGenerate = async () => {
    if (!bulletPoints) return;
    setLoading(true);
    setSaveStatus('');
    try {
      const response = await fetch('http://localhost:8080/api/events/generate-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bulletPoints }),
      });
      const data = await response.json();
      if (data.description) {
        setDescription(data.description);
      } else {
        alert("Failed to generate description");
      }
    } catch (error) {
      console.error("Error calling API:", error);
      alert("Error generating description");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title || !description) {
      alert("Please provide both a title and description to save.");
      return;
    }
    setSaveStatus('Saving...');
    try {
      const response = await fetch('http://localhost:8080/api/events/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      if (response.ok) {
        setSaveStatus('Event saved successfully!');
        setTitle('');
        setBulletPoints('');
        setDescription('');
      } else {
        setSaveStatus('Failed to save event.');
      }
    } catch (error) {
      console.error("Error saving event:", error);
      setSaveStatus('Error saving event.');
    }
  };

  return (
    <div className="generator-card">
      <h2>Generate Event Copy</h2>
      
      <div className="input-group">
        <label>Event Title</label>
        <input 
          type="text" 
          placeholder="e.g. Annual Tech Conference 2024" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
      </div>

      <div className="input-group">
        <label>Raw Bullet Points</label>
        <textarea 
          rows="4" 
          placeholder="e.g. Needs to mention free lunch, keynote at 10am..." 
          value={bulletPoints} 
          onChange={(e) => setBulletPoints(e.target.value)} 
        />
      </div>

      <button className="btn" onClick={handleGenerate} disabled={loading || !bulletPoints}>
        {loading ? 'Generating...' : 'Generate Copy'}
      </button>

      {description && (
        <>
          <div className="input-group">
            <label>AI Generated Description (Editable)</label>
            <textarea 
              rows="8" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />
          </div>
          
          <button className="btn btn-success" onClick={handleSave}>
            Save to Database
          </button>
        </>
      )}

      {saveStatus && (
        <div className={`message ${saveStatus.includes('success') ? 'success' : ''}`}>
          {saveStatus}
        </div>
      )}
    </div>
  );
};

export default EventDescriptionGenerator;