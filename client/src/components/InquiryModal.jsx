import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, CheckCircle, Calendar, Send, AlertCircle } from 'lucide-react';

export default function InquiryModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    thema: '',
    nachricht: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error' | 'offline_saved'
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Server error');
      }

      setStatus('success');
    } catch (err) {
      console.warn('Network/Backend unreachable, storing inquiry offline:', err);
      // Fallback: Store offline in localStorage for APK / offline mode
      try {
        const offlineQueue = JSON.parse(localStorage.getItem('auralicht_offline_inquiries') || '[]');
        offlineQueue.push({
          ...formData,
          id: Date.now(),
          created_at: new Date().toISOString(),
          status: 'new'
        });
        localStorage.setItem('auralicht_offline_inquiries', JSON.stringify(offlineQueue));
        setStatus('offline_saved');
      } catch (storageErr) {
        setStatus('error');
        setErrorMessage('Fehler beim Speichern. Bitte versuchen Sie es erneut.');
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Schließen">
          <X size={24} />
        </button>

        {status === 'success' || status === 'offline_saved' ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle size={56} style={{ color: '#27AE60', margin: '0 auto 18px' }} />
            <h3 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>{t('form_success_title')}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.6 }}>
              {status === 'offline_saved' ? t('form_offline_notice') : t('form_success_desc')}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setStatus('idle');
                  setFormData({ vorname: '', nachname: '', email: '', telefon: '', thema: '', nachricht: '' });
                  onClose();
                }}
              >
                Schließen
              </button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '24px' }}>
              <span className="section-badge">{t('nav_book')}</span>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-deep)', marginTop: '6px' }}>
                {t('contact_title')}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                {t('contact_subtitle')}
              </p>
            </div>

            {status === 'error' && (
              <div className="form-error-alert" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={18} />
                <span>{errorMessage || 'Bitte überprüfen Sie Ihre Eingaben.'}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">{t('form_firstname')}</label>
                  <input
                    type="text"
                    name="vorname"
                    value={formData.vorname}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="z.B. Anna"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('form_lastname')}</label>
                  <input
                    type="text"
                    name="nachname"
                    value={formData.nachname}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="z.B. Gruber"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('form_email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="anna.gruber@beispiel.at"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('form_phone')}</label>
                  <input
                    type="tel"
                    name="telefon"
                    value={formData.telefon}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="+43 660 ..."
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">{t('form_topic')}</label>
                  <select
                    name="thema"
                    value={formData.thema}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="">{t('form_topic_placeholder')}</option>
                    <option value="Kraniosakrale Balance">{t('form_topic_cranio')}</option>
                    <option value="Kinesiologie & Muskeltest">{t('form_topic_kinesiology')}</option>
                    <option value="Verspannungen & Bewegungsapparat">{t('form_topic_movement')}</option>
                    <option value="Mental- & Hypnosecoaching">{t('form_topic_coaching')}</option>
                    <option value="Allgemeine Anfrage">{t('form_topic_general')}</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">{t('form_message')}</label>
                  <textarea
                    name="nachricht"
                    value={formData.nachricht}
                    onChange={handleChange}
                    required
                    className="form-textarea"
                    placeholder={t('form_message_placeholder')}
                    rows={4}
                  />
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <span>{t('form_submitting')}</span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>{t('form_submit')}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
