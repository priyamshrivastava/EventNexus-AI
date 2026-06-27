import React, { useState, useEffect } from 'react';

const API_BASE_URL = "https://smartevent-backend.onrender.com";

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  
  // Login State
  const [identifier, setIdentifier] = useState(''); // Email or Username
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup State
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // OTP State
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpSuccessMsg, setOtpSuccessMsg] = useState('');
  
  // Global State
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Password Validation
  const [pwdCriteria, setPwdCriteria] = useState({
    length: false,
    number: false,
    special: false
  });

  useEffect(() => {
    setPwdCriteria({
      length: password.length >= 8 && password.length <= 16,
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  }, [password]);

  const isPasswordValid = pwdCriteria.length && pwdCriteria.number && pwdCriteria.special;

  const handleSendOtp = async () => {
    if (!email) {
      setError('Please enter an email first.');
      return;
    }
    setIsSendingOtp(true);
    setError('');
    setOtpSuccessMsg('');
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      
      if (res.ok) {
        setOtpSent(true);
        setOtpSuccessMsg(data.message || 'OTP sent to your email box successfully!');
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Server unreachable. Make sure backend is running.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return;
    setError('');
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      
      if (data.verified) {
        setOtpVerified(true);
        setOtpSuccessMsg('');
      } else {
        setError('Invalid OTP code. Please check your email again.');
      }
    } catch (err) {
      setError('Server unreachable.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      setError('Please verify your email with OTP first.');
      return;
    }
    if (!isPasswordValid) {
      setError('Please meet all password criteria.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password })
      });
      const data = await res.json();

      if (res.ok) {
        setIsLogin(true);
        setError('');
        alert('Account created successfully! You can now log in.');
        
        // Reset signup state
        setEmail(''); setUsername(''); setPassword('');
        setOtp(''); setOtpSent(false); setOtpVerified(false);
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('Server unreachable.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password: loginPassword })
      });
      const data = await res.json();

      if (res.ok) {
        onLogin({ username: data.username, email: data.email, password: loginPassword });
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Server unreachable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass" style={{ maxWidth: '450px' }}>
        <h2>{isLogin ? 'Welcome Back' : 'Join Nexus'}</h2>
        <p>{isLogin ? 'Enter your credentials to access the AI core.' : 'Secure protocol: Live Email OTP verification required.'}</p>
        
        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.8rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>{error}</div>}
        {otpSuccessMsg && <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', padding: '0.8rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>{otpSuccessMsg}</div>}

        {isLogin ? (
          <form onSubmit={handleLogin}>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Email or Username" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
            <input 
              type="password" 
              className="input-field" 
              placeholder="Password" 
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary" disabled={loading || !identifier || !loginPassword}>
              {loading ? <span className="loading-spinner"></span> : 'INITIALIZE LOGIN'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            
            {/* Email & OTP Section */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input 
                type="email" 
                className="input-field" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => {setEmail(e.target.value); setOtpSent(false); setOtpVerified(false); setOtpSuccessMsg('');}}
                disabled={otpVerified}
                style={{ marginBottom: 0, flexGrow: 1 }}
                required
              />
              {!otpVerified && (
                <button type="button" className="btn-secondary" onClick={handleSendOtp} disabled={isSendingOtp || !email} style={{ whiteSpace: 'nowrap', padding: '0 1rem' }}>
                  {isSendingOtp ? 'Sending...' : (otpSent ? 'Resend' : 'Send OTP')}
                </button>
              )}
            </div>

            {otpSent && !otpVerified && (
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Enter 6-digit OTP from your Email" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  style={{ marginBottom: 0, background: 'rgba(0,0,0,0.5)', flexGrow: 1, textAlign: 'center', letterSpacing: '4px', fontSize: '1.2rem', fontWeight: 'bold' }}
                />
                <button type="button" className="btn-primary" onClick={handleVerifyOtp} style={{ width: 'auto', padding: '0 1.5rem' }}>
                  Verify
                </button>
              </div>
            )}

            {otpVerified && <div style={{ color: '#4ade80', fontSize: '0.9rem', marginBottom: '1rem', textAlign: 'left', fontWeight: 'bold' }}>✓ Email successfully verified!</div>}

            <input 
              type="text" 
              className="input-field" 
              placeholder="Choose Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!otpVerified}
              required
            />

            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                className="input-field" 
                placeholder="Create Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!otpVerified}
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '1rem', top: '1rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 'bold' }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {/* Password Criteria Checklist */}
            {password && (
              <div style={{ textAlign: 'left', fontSize: '0.85rem', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ color: pwdCriteria.length ? '#4ade80' : 'var(--text-muted)' }}>
                  {pwdCriteria.length ? '✓' : '○'} 8-16 characters
                </div>
                <div style={{ color: pwdCriteria.number ? '#4ade80' : 'var(--text-muted)' }}>
                  {pwdCriteria.number ? '✓' : '○'} At least 1 number
                </div>
                <div style={{ color: pwdCriteria.special ? '#4ade80' : 'var(--text-muted)' }}>
                  {pwdCriteria.special ? '✓' : '○'} At least 1 special character (!@#$...)
                </div>
              </div>
            )}

            <button type="submit" className="btn-primary" disabled={loading || !otpVerified || !username || !isPasswordValid}>
              {loading ? <span className="loading-spinner"></span> : 'CREATE PROTOCOL'}
            </button>
          </form>
        )}

        <div className="auth-switch">
          {isLogin ? "Don't have access? " : "Already initialized? "}
          <span onClick={() => { setIsLogin(!isLogin); setError(''); setOtpSuccessMsg(''); }}>
            {isLogin ? 'Request Access' : 'Login Here'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Auth;