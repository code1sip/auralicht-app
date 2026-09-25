import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Globe,
  FileText,
  Lock,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function MobileContact({ onOpenLegal, onOpenAdmin }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '18px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', color: 'var(--primary-deep)', marginBottom: '4px' }}>
          Kontakt & Praxis
        </h2>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
          Praxis für Humanenergetik & Kinesiologie in Salzburg
        </p>
      </div>

      {/* Main Contact Card */}
      <div className="mobile-welcome-card" style={{ background: '#2C3E2D', color: '#FFFFFF', padding: '22px 18px', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '6px' }}>
          Canan Kalman
        </h3>
        <p style={{ fontSize: '0.82rem', color: '#C8D8C2', lineHeight: 1.5, marginBottom: '18px' }}>
          Termine werden nach vorheriger telefonischer oder schriftlicher Vereinbarung vergeben.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MapPin size={16} style={{ color: '#E5C378' }} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#A8BC9F', textTransform: 'uppercase' }}>Standort</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>Salzburg & Umgebung, Österreich</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Phone size={16} style={{ color: '#E5C378' }} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#A8BC9F', textTransform: 'uppercase' }}>Telefon</div>
              <a href="tel:+436600000000" style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FFFFFF', textDecoration: 'none' }}>
                +43 660 000 0000
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mail size={16} style={{ color: '#E5C378' }} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#A8BC9F', textTransform: 'uppercase' }}>E-Mail</div>
              <a href="mailto:kontakt@auralicht.at" style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FFFFFF', textDecoration: 'none' }}>
                kontakt@auralicht.at
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={16} style={{ color: '#E5C378' }} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#A8BC9F', textTransform: 'uppercase' }}>Öffnungszeiten</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>Mo – Sa nach Vereinbarung</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          <a
            href="https://wa.me/436600000000?text=Hallo%20Frau%20Kalman,%20ich%20interessiere%20mich%20f%C3%BCr%20einen%20Termin%20bei%20Auralicht."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
            style={{ width: '100%', textDecoration: 'none', padding: '12px', fontSize: '0.9rem' }}
          >
            <MessageCircle size={18} />
            <span>WhatsApp Nachricht senden</span>
          </a>
        </div>
      </div>

      {/* Language Switcher Setting */}
      <div className="quiz-step-card" style={{ padding: '14px 16px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', fontWeight: 600, color: 'var(--primary-deep)', marginBottom: '10px' }}>
          <Globe size={18} style={{ color: 'var(--sage)' }} />
          <span>Sprache wählen / Select language</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { code: 'de', label: '🇩🇪 Deutsch' },
            { code: 'en', label: '🇬🇧 English' },
            { code: 'fr', label: '🇫🇷 Français' }
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

      {/* Legal & Impressum */}
      <div className="quiz-step-card" style={{ marginBottom: '16px', padding: '14px 16px' }}>
        <div
          onClick={onOpenLegal}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={18} style={{ color: 'var(--sage)' }} />
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary-deep)' }}>
                Impressum & Datenschutz (DSGVO)
              </div>
              <div style={{ fontSize: '0.74rem', color: '#888' }}>
                Rechtliche Angaben gemäß § 5 ECG & WKO
              </div>
            </div>
          </div>
          <ChevronRight size={18} style={{ color: '#AAA' }} />
        </div>
      </div>

      {/* Discreet Subtle Footer Link for Admin (NOT an in-your-face button!) */}
      <div style={{ textAlign: 'center', padding: '16px 0 24px', borderTop: '1px solid var(--border-light)' }}>
        <p style={{ fontSize: '0.74rem', color: '#999', margin: '0 0 6px' }}>
          © {new Date().getFullYear()} Auralicht • Canan Kalman
        </p>
        <button
          onClick={onOpenAdmin}
          style={{
            background: 'none',
            border: 'none',
            color: '#BBB',
            fontSize: '0.7rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 8px'
          }}
        >
          <Lock size={11} />
          <span>Interner Login</span>
        </button>
      </div>
    </div>
  );
}
