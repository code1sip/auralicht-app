import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Feather,
  Activity,
  Compass,
  Sparkles,
  Brain,
  GraduationCap,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function Methods({ openInquiryModal }) {
  const { t } = useLanguage();

  const methods = [
    {
      id: 'cranio',
      icon: <Feather size={32} />,
      title: t('m1_title'),
      desc: t('m1_desc'),
      tag: t('m1_tag'),
      benefits: [
        'Tiefenentspannung für das vegetative Nervensystem',
        'Linderung bei Stress, innerer Unruhe und Schlafschwierigkeiten',
        'Sanfte Begleitung bei Kopf- und Nackenverspannungen'
      ],
      color: '#7BA8A0'
    },
    {
      id: 'kinesiology',
      icon: <Activity size={32} />,
      title: t('m2_title'),
      desc: t('m2_desc'),
      tag: t('m2_tag'),
      benefits: [
        'Aufspüren unbewusster Stressoren und Blockaden',
        'Aktivierung der körpereigenen Selbstregulation',
        'Stärkung des inneren Energiehaushalts'
      ],
      color: '#8B9A7B'
    },
    {
      id: 'spine',
      icon: <Compass size={32} />,
      title: t('m3_title'),
      desc: t('m3_desc'),
      tag: t('m3_tag'),
      benefits: [
        'Sanfte Harmonisierung der Wirbelsäulen- und Gelenksenergien',
        'Unterstützung bei Haltungsschwächen und Verspannungen',
        'Mehr Aufrichtung und Leichtigkeit im Bewegungsapparat'
      ],
      color: '#D4AF37'
    },
    {
      id: 'scars',
      icon: <Sparkles size={32} />,
      title: t('m4_title'),
      desc: t('m4_desc'),
      tag: t('m4_tag'),
      benefits: [
        'Auflösung von Störfeldern im Meridianverlauf',
        'Verbesserung des Gewebegefühls rund um alte Narben',
        'Wiederherstellung des ungestörten Energieflusses'
      ],
      color: '#C29B38'
    },
    {
      id: 'hypno',
      icon: <Brain size={32} />,
      title: t('m5_title'),
      desc: t('m5_desc'),
      tag: t('m5_tag'),
      benefits: [
        'Lösung hinderlicher Gedanken- und Verhaltensmuster',
        'Stärkung von Selbstvertrauen und mentaler Gelassenheit',
        'Zielorientierte Vorbereitung auf Lebensveränderungen'
      ],
      color: '#658B79'
    },
    {
      id: 'learning',
      icon: <GraduationCap size={32} />,
      title: t('m6_title'),
      desc: t('m6_desc'),
      tag: t('m6_tag'),
      benefits: [
        'Pädagogische Unterstützung bei Legasthenie & Dyskalkulie',
        'Abbau von Prüfungs- und Lernstress',
        'Entfaltung individueller Lernfreude und Konzentration'
      ],
      color: '#507567'
    }
  ];

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Page Header */}
      <section className="section section-sand text-center" style={{ padding: '60px 0 40px' }}>
        <div className="container">
          <span className="section-badge">{t('methods_badge')}</span>
          <h1 className="section-title">{t('methods_title')}</h1>
          <p className="section-subtitle mx-auto">{t('methods_intro')}</p>
        </div>
      </section>

      {/* Methods Detail Grid */}
      <section className="section section-cream">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {methods.map((method, index) => (
              <div
                key={method.id}
                className="glass-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '32px',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                    <div
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--sage-ultra-light)',
                        color: method.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {method.icon}
                    </div>
                    <div>
                      <span className="method-tag" style={{ margin: 0 }}>{method.tag}</span>
                      <h2 style={{ fontSize: '1.45rem', marginTop: '4px' }}>{method.title}</h2>
                    </div>
                  </div>
                  <p style={{ fontSize: '1rem', lineHeight: 1.75, marginBottom: '20px' }}>
                    {method.desc}
                  </p>
                  <button className="btn btn-primary" onClick={openInquiryModal}>
                    <span>Termin für {method.title} anfragen</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div
                  style={{
                    background: '#FFFFFF',
                    padding: '28px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '14px', color: 'var(--primary-deep)' }}>
                    Wirkung & typische Einsatzbereiche:
                  </h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {method.benefits.map((b, bIdx) => (
                      <li key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.94rem' }}>
                        <CheckCircle2 size={18} style={{ color: 'var(--sage)', flexShrink: 0, marginTop: '2px' }} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
