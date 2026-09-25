import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    thema: '',
    nachricht: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'offline_saved' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

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
        throw new Error(errorData.error || 'Fehler beim Senden');
      }

      setStatus('success');
      setFormData({ vorname: '', nachname: '', email: '', telefon: '', thema: '', nachricht: '' });
    } catch (err) {
      console.warn('Network issue / Backend offline. Saving to local queue:', err);
      try {
        const queue = JSON.parse(localStorage.getItem('auralicht_offline_inquiries') || '[]');
        queue.push({
          ...formData,
          id: Date.now(),
          created_at: new Date().toISOString(),
          status: 'new'
        });
        localStorage.setItem('auralicht_offline_inquiries', JSON.stringify(queue));
        setStatus('offline_saved');
        setFormData({ vorname: '', nachname: '', email: '', telefon: '', thema: '', nachricht: '' });
      } catch (storageErr) {
        setStatus('error');
        setErrorMessage('Fehler beim Absenden. Bitte überprüfen Sie Ihre Verbindung.');
      }
    }
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      <section className="section section-sand text-center" style={{ padding: '60px 0 40px' }}>
        <div className="container">
          <span className="section-badge">{t('contact_badge')}</span>
          <h1 className="section-title">{t('contact_title')}</h1>
          <p className="section-subtitle mx-auto">{t('contact_subtitle')}</p>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <div className="contact-section-grid">
            {/* Contact Info Sidebar */}
            <div className="contact-info-card">
              <h3 style={{ fontSize: '1.45rem', marginBottom: '8px' }}>
                {t('contact_info_title')}
              </h3>
              <p style={{ color: '#D2DEC9', fontSize: '0.94rem', lineHeight: 1.65 }}>
                Ich nehme mir ausreichend Zeit für jede Klientin und jeden Klienten. Termine vergebe ich ausschließlich nach vorheriger Vereinbarung.
              </p>

              <div className="info-item">
                <div className="info-icon"><MapPin size={20} /></div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>Standort</div>
                  <div style={{ color: '#D2DEC9', fontSize: '0.88rem' }}>{t('contact_location')}</div>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><Phone size={20} /></div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>Telefon</div>
                  <div style={{ color: '#D2DEC9', fontSize: '0.88rem' }}>
                    <a href="tel:+436600000000" style={{ color: '#FFFFFF' }}>{t('contact_phone')}</a>
                  </div>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><Mail size={20} /></div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>E-Mail</div>
                  <div style={{ color: '#D2DEC9', fontSize: '0.88rem' }}>
                    <a href="mailto:kontakt@auralicht.at" style={{ color: '#FFFFFF' }}>{t('contact_email')}</a>
                  </div>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><Clock size={20} /></div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>Öffnungszeiten</div>
                  <div style={{ color: '#D2DEC9', fontSize: '0.88rem' }}>{t('contact_hours')}</div>
                </div>
              </div>

              <div style={{ marginTop: '36px', paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                <a
                  href="https://wa.me/436600000000?text=Hallo%20Frau%20Kalman,%20ich%20interessiere%20mich%20f%C3%BCr%20einen%20Termin%20bei%20Auralicht."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ width: '100%', gap: '8px', background: 'rgba(255,255,255,0.1)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  <MessageCircle size={18} />
                  <span>Direkt über WhatsApp schreiben</span>
                </a>
              </div>
            </div>

            {/* Main Booking Form */}
            <div className="booking-form-card">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', color: 'var(--primary-deep)' }}>
                Terminanfrage senden
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '28px' }}>
                Füllen Sie einfach das Formular aus. Ich melde mich verlässlich innerhalb von 24 Stunden bei Ihnen.
              </p>

              {status === 'success' && (
                <div className="form-success-alert" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircle size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '4px' }}>{t('form_success_title')}</strong>
                    <span>{t('form_success_desc')}</span>
                  </div>
                </div>
              )}

              {status === 'offline_saved' && (
                <div className="form-success-alert" style={{ background: '#FFF9E6', borderColor: '#F5DC9A', color: '#976A08', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircle size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '4px' }}>Anfrage lokal gespeichert!</strong>
                    <span>{t('form_offline_notice')}</span>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="form-error-alert" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
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
                      placeholder="z.B. Martin"
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
                      placeholder="z.B. Huber"
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
                      placeholder="martin.huber@beispiel.at"
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
                      placeholder="+43 664 1234567"
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
                    />
                  </div>
                </div>

                <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
                    <ShieldCheck size={16} />
                    <span>Ihre Daten werden streng vertraulich behandelt (DSGVO).</span>
                  </div>

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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
