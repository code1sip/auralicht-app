import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Calendar,
  MessageCircle,
  Phone,
  ArrowRight,
  Star,
  Activity,
  Feather,
  Brain,
  Compass,
  ChevronRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  User,
  Heart
} from 'lucide-react';

export default function MobileHome({ setActiveTab, onSelectMethod }) {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState(null);

  const featuredMethods = [
    {
      id: 'cranio',
      title: t('m1_title'),
      desc: t('m1_desc'),
      tag: t('m1_tag'),
      icon: <Feather size={22} />,
      color: '#7BA8A0'
    },
    {
      id: 'kinesiology',
      title: t('m2_title'),
      desc: t('m2_desc'),
      tag: t('m2_tag'),
      icon: <Activity size={22} />,
      color: '#8B9A7B'
    },
    {
      id: 'spine',
      title: t('m3_title'),
      desc: t('m3_desc'),
      tag: t('m3_tag'),
      icon: <Compass size={22} />,
      color: '#D4AF37'
    },
    {
      id: 'hypno',
      title: t('m5_title'),
      desc: t('m5_desc'),
      tag: t('m5_tag'),
      icon: <Brain size={22} />,
      color: '#658B79'
    }
  ];

  return (
    <div>
      {/* 1. Welcome Card (Clean Natural Holistic Style) */}
      <div className="mobile-welcome-card">
        <div className="mobile-greeting-badge">
          <Heart size={13} style={{ color: '#E5C378' }} />
          <span>Salzburg • Humanenergetik</span>
        </div>
        <h2 className="mobile-hero-title">
          Mehr Leichtigkeit & Beweglichkeit
        </h2>
        <p className="mobile-hero-sub">
          Sanfte Energiearbeit für deinen Körper & Geist. Begleitung bei Verspannungen, Blockaden und Überlastung.
        </p>

        <button
          className="btn btn-gold"
          onClick={() => setActiveTab('booking')}
          style={{ width: '100%', padding: '12px', fontSize: '0.9rem' }}
        >
          <Calendar size={16} />
          <span>Wohlfühltermin vereinbaren</span>
        </button>
      </div>

      {/* 2. Quick Action Pills */}
      <div className="mobile-action-bar">
        <div className="action-pill-btn" onClick={() => setActiveTab('methods')}>
          <div className="action-pill-icon" style={{ background: '#2C3E2D' }}>
            <Feather size={18} />
          </div>
          <span style={{ fontSize: '0.74rem', fontWeight: 600 }}>Methoden</span>
        </div>

        <div className="action-pill-btn" onClick={() => setActiveTab('about')}>
          <div className="action-pill-icon" style={{ background: '#8B9A7B' }}>
            <User size={18} />
          </div>
          <span style={{ fontSize: '0.74rem', fontWeight: 600 }}>Über Canan</span>
        </div>

        <a
          href="https://wa.me/436600000000?text=Hallo%20Frau%20Kalman,%20ich%20interessiere%20mich%20f%C3%BCr%20einen%20Termin%20bei%20Auralicht."
          target="_blank"
          rel="noopener noreferrer"
          className="action-pill-btn"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div className="action-pill-icon" style={{ background: '#25D366' }}>
            <MessageCircle size={18} />
          </div>
          <span style={{ fontSize: '0.74rem', fontWeight: 600 }}>WhatsApp</span>
        </a>

        <a
          href="tel:+436600000000"
          className="action-pill-btn"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div className="action-pill-icon" style={{ background: '#3D533E' }}>
            <Phone size={18} />
          </div>
          <span style={{ fontSize: '0.74rem', fontWeight: 600 }}>Anrufen</span>
        </a>
      </div>

      {/* 3. Practitioner Spotlight Card (Takes directly to "Über Mich" tab) */}
      <div className="mobile-practitioner-card" onClick={() => setActiveTab('about')}>
        <div className="practitioner-photo-frame">
          <img
            src="./assets/images/canan-portrait-i.png"
            alt="Canan Kalman"
            className="practitioner-photo"
          />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <span style={{ fontWeight: 700, fontSize: '0.96rem', color: 'var(--primary-deep)' }}>
              Canan Kalman
            </span>
            <ShieldCheck size={16} style={{ color: 'var(--sage)' }} />
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--sage)', fontWeight: 600, marginBottom: '6px' }}>
            Dipl. Humanenergetikerin & Kinesiologin
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: 0 }}>
            „Dein Körper kennt den Weg zu innerer Balance.“
          </p>
          <div style={{ fontSize: '0.74rem', color: 'var(--primary)', fontWeight: 600, marginTop: '6px' }}>
            Mehr über mich & Qualifikationen →
          </div>
        </div>
        <ChevronRight size={18} style={{ color: '#AAA' }} />
      </div>

      {/* 4. Featured Methods Section */}
      <div className="mobile-section-header">
        <h3 className="mobile-section-title">Behandlungsschwerpunkte</h3>
        <button className="mobile-section-link" onClick={() => setActiveTab('methods')}>
          Alle Methoden →
        </button>
      </div>

      <div style={{ marginBottom: '24px' }}>
        {featuredMethods.map((m) => (
          <div
            key={m.id}
            className="mobile-touch-card"
            onClick={() => {
              if (onSelectMethod) onSelectMethod(m);
              else setActiveTab('methods');
            }}
          >
            <div className="touch-card-icon" style={{ color: m.color }}>
              {m.icon}
            </div>
            <div className="touch-card-info">
              <div className="touch-card-title">{m.title}</div>
              <div className="touch-card-desc">{m.desc}</div>
              <span className="touch-card-tag">{m.tag}</span>
            </div>
            <ChevronRight size={18} style={{ color: '#CCC' }} />
          </div>
        ))}
      </div>

      {/* 5. Client Testimonials */}
      <div className="mobile-section-header">
        <h3 className="mobile-section-title">Erfahrungen von Klienten</h3>
      </div>

      <div className="mobile-welcome-card" style={{ background: '#FFFFFF', color: 'var(--text-main)', border: '1px solid var(--border-light)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', padding: '18px' }}>
        <div style={{ display: 'flex', gap: '4px', color: '#C29B38', marginBottom: '10px' }}>
          {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="#C29B38" />)}
        </div>
        <p style={{ fontSize: '0.88rem', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '12px', color: 'var(--primary-deep)' }}>
          {t('t1_text')}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
          <span style={{ fontWeight: 700, color: 'var(--primary-deep)' }}>{t('t1_author')}</span>
          <span style={{ color: 'var(--sage)', background: 'var(--sage-soft)', padding: '2px 8px', borderRadius: '4px' }}>
            {t('t1_topic')}
          </span>
        </div>
      </div>

      {/* 6. Quick FAQ Accordion */}
      <div className="mobile-section-header" style={{ marginTop: '22px' }}>
        <h3 className="mobile-section-title">Häufige Fragen</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[
          { q: t('faq1_q'), a: t('faq1_a') },
          { q: t('faq2_q'), a: t('faq2_a') },
          { q: t('faq3_q'), a: t('faq3_a') }
        ].map((faq, idx) => (
          <div key={idx} style={{ background: '#FFFFFF', borderRadius: '14px', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
            <button
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              style={{
                width: '100%',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'none',
                border: 'none',
                fontSize: '0.86rem',
                fontWeight: 600,
                color: 'var(--primary-deep)',
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              <span>{faq.q}</span>
              {openFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {openFaq === idx && (
              <div style={{ padding: '0 16px 14px', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
