import React, { useState, useEffect } from 'react'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import './index.css'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('smartevent_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = (userData) => {
    localStorage.setItem('smartevent_user', JSON.stringify(userData))
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('smartevent_user')
    setUser(null)
  }

  return (
    <div className="app-container">
      {user ? (
        <>
          <nav className="navbar glass">
            <div className="nav-brand">⚡ SMART<span style={{color: 'var(--primary)'}}>EVENT</span> NEXUS</div>
            <div className="nav-user">
              <span style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>{user.username}</span>
              <button className="nav-btn" onClick={handleLogout}>DISCONNECT</button>
            </div>
          </nav>
          <Dashboard user={user} />
        </>
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App