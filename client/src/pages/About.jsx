import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, CheckCircle2, Heart, Shield, Sparkles, ArrowRight } from 'lucide-react';

export default function About({ openInquiryModal }) {
  const { t } = useLanguage();

  const qualifications = [
    t('about_q1'),
    t('about_q2'),
    t('about_q3'),
    t('about_q4'),
    t('about_q5')
  ];

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Page Header */}
      <section className="section section-sand text-center" style={{ padding: '60px 0 40px' }}>
        <div className="container">
          <span className="section-badge">{t('about_badge')}</span>
          <h1 className="section-title">{t('about_heading')}</h1>
          <p className="section-subtitle mx-auto">{t('about_role')}</p>
        </div>
      </section>

      {/* Main Content & Portrait */}
      <section className="section section-cream">
        <div className="container">
          <div className="about-grid">
            <div className="about-portrait-wrap text-center">
              <img
                src="/assets/images/canan-portrait-i.png"
                alt="Canan Kalman"
                className="about-portrait-img"
              />
              <div style={{ marginTop: '18px', color: 'var(--sage)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                Canan Kalman – Diplomierte Humanenergetikerin & Kinesiologin
              </div>
            </div>

            <div>
              <div className="about-quote-box">
                {t('about_quote')}
              </div>

              <h2 style={{ fontSize: '1.6rem', marginBottom: '16px', color: 'var(--primary-deep)' }}>
                Meine Geschichte & mein Weg
              </h2>

              <p style={{ marginBottom: '16px', lineHeight: 1.8 }}>
                Schon seit meiner Kindheit nehme ich Menschen auf einer feinen, intuitiven Ebene wahr. Diese Fähigkeit nutze ich heute, um gezielte energetische Impulse zu geben und Menschen in ihrer persönlichen Entwicklung sowie im Bereich des tiefen Wohlbefindens zu unterstützen.
              </p>

              <p style={{ marginBottom: '16px', lineHeight: 1.8 }}>
                Meine berufliche Laufbahn begann 2009 als Dolmetscherin und Übersetzerin. Seit 2012 bin ich als gerichtlich beeidete Dolmetscherin und Übersetzerin regelmäßig für Gerichte, Behörden sowie medizinische und psychologische Einrichtungen tätig (u.a. am Landesgericht Salzburg und am Bezirksgericht Salzburg).
              </p>

              <p style={{ marginBottom: '24px', lineHeight: 1.8 }}>
                Seit 2022 habe ich meine Tätigkeit als diplomierte Humanenergetikerin aufgenommen und begleite seither Menschen im Rahmen meiner energetischen und ganzheitlichen Arbeit mit Feingefühl, Respekt und höchster Diskretion.
              </p>

              <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={20} style={{ color: 'var(--accent-gold)' }} />
                  <span>{t('about_qualifications_title')}</span>
                </h3>
                <ul className="qualifications-list">
                  {qualifications.map((q, idx) => (
                    <li key={idx} className="qualification-item">
                      <CheckCircle2 size={18} className="qual-check" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diplomas & Certification Proof Gallery */}
      <section className="section section-sand">
        <div className="container">
          <div className="text-center">
            <span className="section-badge">Zertifizierte Kompetenz</span>
            <h2 className="section-title">Ausbildungen & Diplome</h2>
            <p className="section-subtitle mx-auto">
              Fundierte, zertifizierte Ausbildungen bilden das sichere Fundament für jede energetische Begleitung.
            </p>
          </div>

          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="diploma-gallery-card">
              <img
                src="/assets/images/diplomas-screenshot.jpg"
                alt="Diplome und Zertifikate von Canan Kalman"
                className="diploma-img"
              />
              <div style={{ padding: '20px 24px', background: '#FFFFFF', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Shield size={20} style={{ color: 'var(--sage)' }} />
                  <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--primary-deep)' }}>
                    Verifizierte Diplome & Zertifikate (Humanenergetik, Kinesiologie, Hypnose)
                  </span>
                </div>
                <button className="btn btn-primary" onClick={openInquiryModal} style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                  <span>Termin anfragen</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Room / Sanctuary */}
      <section className="section section-cream">
        <div className="container">
          <div className="text-center">
            <span className="section-badge">Praxis Salzburg</span>
            <h2 className="section-title">{t('about_praxis_title')}</h2>
            <p className="section-subtitle mx-auto">{t('about_praxis_desc')}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '36px' }}>
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <img
                src="/assets/images/hero-wellness-room.jpg"
                alt="Ruhiger Praxisraum Auralicht Salzburg"
                style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '18px 22px', background: '#FFFFFF' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>Harmonische Ruheoase</h4>
                <p style={{ fontSize: '0.88rem' }}>Ein warmer, geschützter Ort zum Loslassen und Regenerieren.</p>
              </div>
            </div>

            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <img
                src="/assets/images/canan-office.jpg"
                alt="Beratungsbereich Canan Kalman"
                style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '18px 22px', background: '#FFFFFF' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>Achtsamer Beratungsbereich</h4>
                <p style={{ fontSize: '0.88rem' }}>Raum für vertrauensvolle Gespräche und individuelle Abstimmung.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
