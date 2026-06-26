import React from 'react'
import EventDescriptionGenerator from './components/EventDescriptionGenerator'
import './index.css'

function App() {
  return (
    <div className="app-container">
      <h1>SmartEvent AI</h1>
      <p>AI-Powered Event Management Platform</p>
      <EventDescriptionGenerator />
    </div>
  )
}

export default App