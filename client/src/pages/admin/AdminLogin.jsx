import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Lock, User, AlertCircle, ArrowRight } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const { t } = useLanguage();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('auralicht2026');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Benutzername oder Passwort falsch.');
      }

      const data = await res.json();
      localStorage.setItem('auralicht_admin_token', data.token);
      onLoginSuccess(data.token);
    } catch (err) {
      // Fallback: If backend is offline but credentials match standard
      if (username === 'admin' && password === 'auralicht2026') {
        const dummyToken = 'offline-admin-token-' + Date.now();
        localStorage.setItem('auralicht_admin_token', dummyToken);
        onLoginSuccess(dummyToken);
      } else {
        setError('Benutzername oder Passwort falsch.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <img
            src="./logo2.webp"
            alt="Auralicht Logo"
            style={{ height: '46px', margin: '0 auto 12px' }}
          />
          <h2 style={{ fontSize: '1.45rem', color: 'var(--primary-deep)', marginBottom: '4px' }}>
            Auralicht Admin
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--sage)' }}>
            Anfragen & Termine verwalten
          </p>
        </div>

        {error && (
          <div className="form-error-alert" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label className="form-label">{t('admin_username')}</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-input"
                placeholder="admin"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label">{t('admin_password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px' }}
            disabled={loading}
          >
            {loading ? 'Anmelden...' : t('admin_login_btn')}
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
          Standard Login: <code>admin</code> / <code>auralicht2026</code>
        </div>
      </div>
    </div>
  );
}
