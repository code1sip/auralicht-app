import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getApiBaseUrl } from '../../config/api';
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';

export default function MobileBooking({ preselectedMethod }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    thema: preselectedMethod || 'Kraniosakrale Balance',
    tageszeit: 'Vormittags (09:00 - 12:00)',
    nachricht: ''
  });

  useEffect(() => {
    if (preselectedMethod) {
      setFormData((prev) => ({ ...prev, thema: preselectedMethod }));
    }
  }, [preselectedMethod]);

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'offline_saved' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const payload = {
      ...formData,
      nachricht: `Bevorzugte Tageszeit: ${formData.tageszeit}\n${formData.nachricht || 'Terminanfrage über Mobile App'}`
    };

    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Fehler beim Senden');
      }

      setStatus('success');
    } catch (err) {
      console.warn('Backend unavailable, saving offline in Mobile App:', err);
      try {
        const queue = JSON.parse(localStorage.getItem('auralicht_offline_inquiries') || '[]');
        queue.push({
          ...payload,
          id: Date.now(),
          created_at: new Date().toISOString(),
          status: 'new'
        });
        localStorage.setItem('auralicht_offline_inquiries', JSON.stringify(queue));
        setStatus('offline_saved');
      } catch (storageErr) {
        setStatus('error');
        setErrorMsg('Fehler beim Speichern. Bitte versuchen Sie es erneut.');
      }
    }
  };

  if (status === 'success' || status === 'offline_saved') {
    return (
      <div style={{ textAlign: 'center', padding: '30px 10px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#E6F4EA', color: '#1E6631', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <CheckCircle2 size={36} />
        </div>

        <h3 style={{ fontSize: '1.45rem', color: 'var(--primary-deep)', marginBottom: '8px' }}>
          {status === 'offline_saved' ? 'Anfrage lokal gespeichert!' : 'Terminanfrage eingegangen!'}
        </h3>

        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
          {status === 'offline_saved'
            ? 'Hinweis: Ihre Anfrage wurde auf Ihrem Gerät gesichert und wird synchronisiert, sobald wieder Verbindung besteht.'
            : 'Vielen Dank, Frau Kalman wird sich innerhalb von 24 Stunden persönlich bei Ihnen melden, um den Wunschtermin zu bestätigen.'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <a
            href={`https://wa.me/436600000000?text=Hallo%20Frau%20Kalman,%20ich%20habe%20gerade%20eine%20Terminanfrage%20f%C3%BCr%20${encodeURIComponent(formData.thema)}%20gesendet.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ width: '100%', textDecoration: 'none', padding: '12px' }}
          >
            <MessageCircle size={17} />
            <span>Jetzt auf WhatsApp nachfragen</span>
          </a>

          <button
            className="btn btn-secondary"
            onClick={() => {
              setStatus('idle');
              setFormData({
                vorname: '',
                nachname: '',
                email: '',
                telefon: '',
                thema: 'Kraniosakrale Balance',
                tageszeit: 'Vormittags (09:00 - 12:00)',
                nachricht: ''
              });
            }}
            style={{ width: '100%', padding: '12px' }}
          >
            Neue Anfrage starten
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: '18px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', color: 'var(--primary-deep)', marginBottom: '4px' }}>
          Termin vereinbaren
        </h2>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
          Wählen Sie Ihre Wunschbehandlung in meiner Praxis in Salzburg.
        </p>
      </div>

      {status === 'error' && (
        <div className="form-error-alert" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <AlertCircle size={18} />
          <span>{errorMsg || 'Bitte überprüfen Sie Ihre Eingaben.'}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Method Picker */}
        <div className="quiz-step-card" style={{ marginBottom: '14px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-deep)', display: 'block', marginBottom: '8px' }}>
            1. Gewünschte Methode
          </label>
          <select
            name="thema"
            value={formData.thema}
            onChange={handleChange}
            required
            className="form-select"
            style={{ fontSize: '0.9rem' }}
          >
            <option value="Kraniosakrale Balance">Kraniosakrale Balance</option>
            <option value="Kinesiologie & Muskeltest">Kinesiologie & Muskeltest</option>
            <option value="Wirbelsäulen- & Gelenksbalance">Wirbelsäulen- & Gelenksbalance</option>
            <option value="Energetische Narbenentstörung">Energetische Narbenentstörung</option>
            <option value="Hypnose & Mentalcoaching">Hypnose & Mentalcoaching</option>
            <option value="Lernbegleitung & Fokus">Lernbegleitung & Fokus</option>
            <option value="Allgemeine Erstberatung">Allgemeine Erstberatung</option>
          </select>
        </div>

        {/* Time Preference */}
        <div className="quiz-step-card" style={{ marginBottom: '14px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-deep)', display: 'block', marginBottom: '8px' }}>
            2. Bevorzugte Tageszeit
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {['Vormittags (09:00 - 12:00)', 'Nachmittags (14:00 - 18:00)'].map((time) => (
              <button
                key={time}
                type="button"
                className={`quiz-option-btn ${formData.tageszeit === time ? 'selected' : ''}`}
                onClick={() => setFormData((prev) => ({ ...prev, tageszeit: time }))}
                style={{ margin: 0, padding: '10px', fontSize: '0.78rem', justifyContent: 'center' }}
              >
                {time.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Contact Info Card */}
        <div className="quiz-step-card" style={{ marginBottom: '18px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-deep)', display: 'block', marginBottom: '12px' }}>
            3. Ihre Kontaktdaten
          </label>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="text"
              name="vorname"
              value={formData.vorname}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Vorname *"
              style={{ fontSize: '0.88rem' }}
            />
            <input
              type="text"
              name="nachname"
              value={formData.nachname}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Nachname *"
              style={{ fontSize: '0.88rem' }}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="E-Mail-Adresse *"
              style={{ fontSize: '0.88rem' }}
            />
            <input
              type="tel"
              name="telefon"
              value={formData.telefon}
              onChange={handleChange}
              className="form-input"
              placeholder="Telefonnummer (optional)"
              style={{ fontSize: '0.88rem' }}
            />
            <textarea
              name="nachricht"
              value={formData.nachricht}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Besondere Wünsche oder Notizen..."
              rows={2}
              style={{ fontSize: '0.88rem', minHeight: '70px' }}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === 'loading'}
          style={{ width: '100%', padding: '14px', fontSize: '0.95rem' }}
        >
          {status === 'loading' ? (
            <span>Wird gesendet...</span>
          ) : (
            <>
              <Send size={16} />
              <span>Verbindliche Anfrage absenden</span>
            </>
          )}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.74rem', color: '#888', marginTop: '14px' }}>
          <ShieldCheck size={14} />
          <span>Ihre Daten sind durch die DSGVO geschützt.</span>
        </div>
      </form>
    </div>
  );
}
