import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Feather,
  Activity,
  Compass,
  Sparkles,
  Brain,
  GraduationCap,
  ChevronRight,
  CheckCircle2,
  Calendar,
  X
} from 'lucide-react';

export default function MobileMethods({ onBookMethod }) {
  const { t } = useLanguage();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [filter, setFilter] = useState('all');

  const methods = [
    {
      id: 'cranio',
      category: 'body',
      title: t('m1_title'),
      desc: t('m1_desc'),
      tag: t('m1_tag'),
      icon: <Feather size={26} />,
      color: '#7BA8A0',
      duration: '60 - 75 Min.',
      benefits: [
        'Tiefenentspannung für das vegetative Nervensystem',
        'Linderung bei Stress & chronischer Unruhe',
        'Sanfte Begleitung bei Kopf- & Nackenverspannungen'
      ]
    },
    {
      id: 'kinesiology',
      category: 'body',
      title: t('m2_title'),
      desc: t('m2_desc'),
      tag: t('m2_tag'),
      icon: <Activity size={26} />,
      color: '#8B9A7B',
      duration: '60 Min.',
      benefits: [
        'Aufspüren unbewusster Stressoren via Muskeltest',
        'Aktivierung der körpereigenen Selbstregulation',
        'Harmonisierung des energetischen Gleichgewichts'
      ]
    },
    {
      id: 'spine',
      category: 'body',
      title: t('m3_title'),
      desc: t('m3_desc'),
      tag: t('m3_tag'),
      icon: <Compass size={26} />,
      color: '#D4AF37',
      duration: '60 Min.',
      benefits: [
        'Sanfte Harmonisierung der Wirbelsäulenenergien',
        'Mehr Aufrichtung & Beweglichkeit',
        'Unterstützung bei Schulter- & Rückenbelastungen'
      ]
    },
    {
      id: 'scars',
      category: 'energy',
      title: t('m4_title'),
      desc: t('m4_desc'),
      tag: t('m4_tag'),
      icon: <Sparkles size={26} />,
      color: '#C29B38',
      duration: '45 - 60 Min.',
      benefits: [
        'Lösung von Störfeldern in den Meridianen',
        'Verbesserung des Gewebegefühls rund um Narben',
        'Wiederherstellung des freien Energieflusses'
      ]
    },
    {
      id: 'hypno',
      category: 'mind',
      title: t('m5_title'),
      desc: t('m5_desc'),
      tag: t('m5_tag'),
      icon: <Brain size={26} />,
      color: '#658B79',
      duration: '60 - 90 Min.',
      benefits: [
        'Lösung hinderlicher Gedankenmuster',
        'Stärkung von Selbstvertrauen & Gelassenheit',
        'Nachhaltige Ressourcenaktivierung'
      ]
    },
    {
      id: 'learning',
      category: 'mind',
      title: t('m6_title'),
      desc: t('m6_desc'),
      tag: t('m6_tag'),
      icon: <GraduationCap size={26} />,
      color: '#507567',
      duration: '50 Min.',
      benefits: [
        'Pädagogische Begleitung bei Legasthenie & Dyskalkulie',
        'Abbau von Prüfungs- und Schulstress',
        'Entfaltung individueller Lernfreude'
      ]
    }
  ];

  const filtered = filter === 'all'
    ? methods
    : methods.filter((m) => m.category === filter);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '18px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', color: 'var(--primary-deep)', marginBottom: '4px' }}>
          Ganzheitliche Methoden
        </h2>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
          Individuell abgestimmte sanfte Techniken für Ihr Wohlbefinden.
        </p>
      </div>

      {/* Filter Row */}
      <div className="mobile-stories-row">
        <button
          className={`story-pill ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Alle Methoden
        </button>
        <button
          className={`story-pill ${filter === 'body' ? 'active' : ''}`}
          onClick={() => setFilter('body')}
        >
          Körper & Balance
        </button>
        <button
          className={`story-pill ${filter === 'mind' ? 'active' : ''}`}
          onClick={() => setFilter('mind')}
        >
          Mental & Coaching
        </button>
        <button
          className={`story-pill ${filter === 'energy' ? 'active' : ''}`}
          onClick={() => setFilter('energy')}
        >
          Energiefluss
        </button>
      </div>

      {/* Touch Cards List */}
      <div>
        {filtered.map((m) => (
          <div
            key={m.id}
            className="mobile-touch-card"
            onClick={() => setSelectedMethod(m)}
          >
            <div className="touch-card-icon" style={{ color: m.color }}>
              {m.icon}
            </div>
            <div className="touch-card-info">
              <div className="touch-card-title">{m.title}</div>
              <div className="touch-card-desc">{m.desc}</div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className="touch-card-tag">{m.tag}</span>
                <span style={{ fontSize: '0.7rem', color: '#888', marginTop: '6px' }}>⏱ {m.duration}</span>
              </div>
            </div>
            <ChevronRight size={18} style={{ color: '#CCC' }} />
          </div>
        ))}
      </div>

      {/* Slide-Up Bottom Sheet Detail */}
      <div
        className={`bottom-sheet-overlay ${selectedMethod ? 'open' : ''}`}
        onClick={() => setSelectedMethod(null)}
      />

      <div className={`bottom-sheet-panel ${selectedMethod ? 'open' : ''}`}>
        <div className="sheet-handle" />

        {selectedMethod && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span className="touch-card-tag" style={{ margin: 0, fontSize: '0.78rem' }}>
                {selectedMethod.tag}
              </span>
              <button
                onClick={() => setSelectedMethod(null)}
                style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-deep)', marginBottom: '8px' }}>
              {selectedMethod.title}
            </h3>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
              {selectedMethod.desc}
            </p>

            <div style={{ background: '#F8F6F1', padding: '16px', borderRadius: '16px', marginBottom: '22px' }}>
              <h4 style={{ fontSize: '0.86rem', color: 'var(--primary-deep)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Typische Wirkungsbereiche:
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedMethod.benefits.map((b, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--text-main)' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--sage)', flexShrink: 0 }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {
                const methodTitle = selectedMethod.title;
                setSelectedMethod(null);
                onBookMethod(methodTitle);
              }}
              style={{ width: '100%', padding: '14px', fontSize: '0.95rem' }}
            >
              <Calendar size={17} />
              <span>Dazu Termin buchen</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
