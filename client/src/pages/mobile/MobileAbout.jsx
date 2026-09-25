import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Award,
  CheckCircle2,
  MapPin,
  Shield,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Heart,
  Calendar
} from 'lucide-react';

export default function MobileAbout({ onBookAppointment }) {
  const { t } = useLanguage();
  const [showDiplomas, setShowDiplomas] = useState(false);

  const qualifications = [
    { title: 'Diplomierte Humanenergetikerin', desc: 'Ganzheitliche Energiearbeit & Blockadenlösung' },
    { title: 'Diplomierte Kinesiologin', desc: 'Touch for Health & kinesiologischer Muskeltest' },
    { title: 'Zertifizierter Mentalcoach', desc: 'Ressourcenaktivierung & mentale Stärke' },
    { title: 'Zertifizierter Hypnose Coach', desc: 'Tiefenentspannung & Lösung innerer Blockaden' },
    { title: 'In Ausbildung: Psychologische Beraterin', desc: 'Lebens- und Sozialberatung' },
    { title: 'In Ausbildung: Legasthenie- & Dyskalkulietrainerin', desc: 'Pädagogische Lernbegleitung' }
  ];

  return (
    <div>
      {/* 1. Practitioner Header Card */}
      <div className="mobile-welcome-card" style={{ background: '#FFFFFF', color: 'var(--text-main)', border: '1px solid var(--border-light)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', padding: '24px 18px', textAlign: 'center' }}>
        <img
          src="/assets/images/canan-portrait-i.png"
          alt="Canan Kalman"
          style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px', border: '3px solid var(--sage-soft)', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}
        />
        <h2 style={{ fontSize: '1.45rem', color: 'var(--primary-deep)', marginBottom: '4px' }}>
          Canan Kalman
        </h2>
        <div style={{ fontSize: '0.82rem', color: 'var(--sage)', fontWeight: 600, marginBottom: '14px' }}>
          Dipl. Humanenergetikerin & Kinesiologin
        </div>

        <div style={{ background: 'var(--sage-ultra-light)', borderLeft: '3px solid var(--sage)', padding: '12px 16px', borderRadius: '8px', textAlign: 'left', marginBottom: '16px' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--primary-deep)', fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>
            „Vertraue deinem Gefühl – dein Körper kennt den Weg zu innerer Balance und Leichtigkeit.“
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.74rem', background: '#F4F1EA', color: 'var(--primary)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>
            📍 Salzburg, Österreich
          </span>
          <span style={{ fontSize: '0.74rem', background: '#EAF7EE', color: '#1E6631', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>
            ✓ WKO Verifiziert
          </span>
        </div>
      </div>

      {/* 2. Meine Geschichte & Hintergrund */}
      <div className="quiz-step-card" style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-deep)', marginBottom: '12px' }}>
          Meine Geschichte
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.7, marginBottom: '12px' }}>
          Ich begleite Menschen auf ihrem persönlichen Weg zu mehr innerer Balance, Klarheit und Wohlbefinden. Schon seit vielen Jahren nehme ich Menschen auf einer feinen, intuitiven Ebene wahr und unterstütze sie bei der Entfaltung ihrer körpereigenen Selbstheilungskräfte.
        </p>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '12px' }}>
          Meine berufliche Laufbahn begann 2009 als Dolmetscherin und Übersetzerin. Seit 2012 bin ich als gerichtlich beeidete Dolmetscherin regelmäßig für Gerichte, Behörden sowie medizinische und psychologische Einrichtungen tätig – unter anderem am Landesgericht Salzburg und am Bezirksgericht Salzburg.
        </p>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
          Seit 2022 führe ich meine energetische Praxis in Salzburg. Diese fundierte Lebenserfahrung ermöglicht mir ein besonders tiefes Verständnis, Feingefühl und höchste Diskretion im Umgang mit Klientinnen und Klienten.
        </p>
      </div>

      {/* 3. Qualifikationen & Ausbildungen */}
      <div className="quiz-step-card" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Award size={20} style={{ color: 'var(--primary)' }} />
          <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-deep)', margin: 0 }}>
            Qualifikationen & Diplome
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {qualifications.map((q, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 0', borderBottom: idx < qualifications.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--sage)', flexShrink: 0, marginTop: '3px' }} />
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-deep)' }}>
                  {q.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {q.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Certificates Accordion */}
        <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
          <button
            onClick={() => setShowDiplomas(!showDiplomas)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              fontSize: '0.86rem',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '6px 0'
            }}
          >
            <span>{showDiplomas ? 'Zertifikate verbergen' : 'Original-Zertifikate ansehen'}</span>
            {showDiplomas ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showDiplomas && (
            <div style={{ marginTop: '12px' }}>
              <img
                src="/assets/images/diplomas-screenshot.jpg"
                alt="Diplome und Zertifikate"
                style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--border-light)', display: 'block' }}
              />
            </div>
          )}
        </div>
      </div>

      {/* 4. Der Praxisraum in Salzburg */}
      <div className="quiz-step-card" style={{ marginBottom: '22px' }}>
        <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-deep)', marginBottom: '10px' }}>
          Der Praxisraum in Salzburg
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
          Ein geschützter, harmonischer Ort für Ihre Regeneration und Ruhe.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
          <div style={{ borderRadius: '12px', overflow: 'hidden', height: '110px' }}>
            <img
              src="/assets/images/hero-wellness-room.jpg"
              alt="Praxisraum"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ borderRadius: '12px', overflow: 'hidden', height: '110px' }}>
            <img
              src="/assets/images/canan-office.jpg"
              alt="Beratungsbereich"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={onBookAppointment}
          style={{ width: '100%', padding: '12px', fontSize: '0.9rem' }}
        >
          <Calendar size={16} />
          <span>Ersttermin bei Canan anfragen</span>
        </button>
      </div>
    </div>
  );
}
