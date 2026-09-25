import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Award,
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
  Globe,
  Lock,
  ChevronRight,
  FileText,
  Heart,
  ExternalLink
} from 'lucide-react';

export default function MobileProfile({ onOpenAdmin, onOpenLegal }) {
  const { lang, setLang, t } = useLanguage();
  const [showDiplomas, setShowDiplomas] = useState(false);

  return (
    <div>
      {/* Profile Header Card */}
      <div className="mobile-welcome-card" style={{ background: '#FFFFFF', color: 'var(--text-main)', border: '1px solid var(--border-light)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', padding: '22px 18px', textAlign: 'center' }}>
        <img
          src="/assets/images/canan-portrait-i.png"
          alt="Canan Kalman"
          style={{ width: '84px', height: '84px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px', border: '3px solid var(--sage-soft)' }}
        />
        <h2 style={{ fontSize: '1.35rem', color: 'var(--primary-deep)', marginBottom: '4px' }}>
          Canan Kalman
        </h2>
        <div style={{ fontSize: '0.78rem', color: 'var(--sage)', fontWeight: 600, marginBottom: '12px' }}>
          Dipl. Humanenergetikerin & Kinesiologin
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.55, fontStyle: 'italic', margin: '0 0 16px' }}>
          {t('about_quote')}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.72rem', background: 'var(--sage-ultra-light)', color: 'var(--primary)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>
            Salzburg, Österreich
          </span>
          <span style={{ fontSize: '0.72rem', background: '#FEF3D6', color: '#B7791F', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>
            WKO Verifiziert
          </span>
        </div>
      </div>

      {/* Language Switcher Setting */}
      <div className="quiz-step-card" style={{ padding: '14px 16px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', fontWeight: 600, color: 'var(--primary-deep)' }}>
            <Globe size={18} style={{ color: 'var(--sage)' }} />
            <span>Sprache / Language</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { code: 'de', label: '🇩🇪 DE' },
            { code: 'en', label: '🇬🇧 EN' },
            { code: 'fr', label: '🇫🇷 FR' }
          ].map((l) => (
            <button
              key={l.code}
              className={`filter-pill ${lang === l.code ? 'active' : ''}`}
              onClick={() => setLang(l.code)}
              style={{ flex: 1, padding: '7px 4px', fontSize: '0.76rem', justifyContent: 'center' }}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Diplomas & Certifications */}
      <div className="quiz-step-card" style={{ marginBottom: '14px' }}>
        <div
          onClick={() => setShowDiplomas(!showDiplomas)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={20} style={{ color: 'var(--accent-gold)' }} />
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--primary-deep)' }}>
                Ausbildungen & Diplome
              </div>
              <div style={{ fontSize: '0.74rem', color: '#888' }}>
                Zertifikate und Nachweise einsehen
              </div>
            </div>
          </div>
          <ChevronRight size={18} style={{ color: '#AAA', transform: showDiplomas ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
        </div>

        {showDiplomas && (
          <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--border-light)' }}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: 'var(--text-main)', marginBottom: '14px' }}>
              <li>✦ Diplomierte Humanenergetikerin</li>
              <li>✦ Diplomierte Kinesiologin (Touch for Health)</li>
              <li>✦ Zertifizierter Mentalcoach & Hypnose Coach</li>
              <li>✦ In Ausbildung: Lebens- & Sozialberaterin</li>
              <li>✦ In Ausbildung: Legasthenie- & Dyskalkulietrainerin</li>
            </ul>
            <img
              src="/assets/images/diplomas-screenshot.jpg"
              alt="Diplome"
              style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--border-light)', display: 'block' }}
            />
          </div>
        )}
      </div>

      {/* Practice Room Gallery */}
      <div className="quiz-step-card" style={{ marginBottom: '14px' }}>
        <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-deep)', marginBottom: '10px' }}>
          Der Praxisraum in Salzburg
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <img
            src="/assets/images/hero-wellness-room.jpg"
            alt="Praxisraum"
            style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '10px' }}
          />
          <img
            src="/assets/images/canan-office.jpg"
            alt="Beratung"
            style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '10px' }}
          />
        </div>
      </div>

      {/* Legal & Impressum */}
      <div className="quiz-step-card" style={{ marginBottom: '14px', padding: '12px 16px' }}>
        <div
          onClick={onOpenLegal}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={18} style={{ color: 'var(--sage)' }} />
            <span style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--primary-deep)' }}>
              Impressum & Datenschutz (DSGVO)
            </span>
          </div>
          <ChevronRight size={18} style={{ color: '#AAA' }} />
        </div>
      </div>

      {/* Admin Portal Shortcut */}
      <div className="quiz-step-card" style={{ marginBottom: '24px', padding: '12px 16px' }}>
        <div
          onClick={onOpenAdmin}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lock size={18} style={{ color: '#C0392B' }} />
            <span style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--primary-deep)' }}>
              Admin Portal (Anfragen verwalten)
            </span>
          </div>
          <ChevronRight size={18} style={{ color: '#AAA' }} />
        </div>
      </div>
    </div>
  );
}
