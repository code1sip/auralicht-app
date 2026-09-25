import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, HeartHandshake, Shield, Compass, ArrowRight } from 'lucide-react';

export default function Approach({ openInquiryModal }) {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      title: t('step1_title'),
      desc: t('step1_desc'),
      detail: 'In einem ruhigen Gespräch klären wir Ihr aktuelles Anliegen, Ihre körperlichen Empfindungen und was Sie sich von der Sitzung erhoffen.'
    },
    {
      num: '02',
      title: t('step2_title'),
      desc: t('step2_desc'),
      detail: 'Mit dem kinesiologischen Muskeltest als feinem körpereigenen Biofeedback ermitteln wir, wo energetische Blockaden sitzen.'
    },
    {
      num: '03',
      title: t('step3_title'),
      desc: t('step3_desc'),
      detail: 'Achtsame Berührungen und sanfte Craniosakral-Impulse regen die körpereigene Selbstregulation an und lassen Anspannungen weichen.'
    },
    {
      num: '04',
      title: t('step4_title'),
      desc: t('step4_desc'),
      detail: 'Einige Minuten Nachruhe ermöglichen die tiefe Verankerung der energetischen Harmonie. Sie erhalten wertvolle Impulse für zuhause.'
    }
  ];

  return (
    <div style={{ paddingTop: '80px' }}>
      <section className="section section-sand text-center" style={{ padding: '60px 0 40px' }}>
        <div className="container">
          <span className="section-badge">{t('approach_badge')}</span>
          <h1 className="section-title">{t('approach_title')}</h1>
          <p className="section-subtitle mx-auto">
            Sanft, achtsam und auf Augenhöhe – so begleite ich Sie auf Ihrem Weg zu neuer Energie und Balance.
          </p>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <div className="steps-grid">
            {steps.map((s, idx) => (
              <div key={idx} className="step-card glass-card">
                <div className="step-number">{s.num}</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--primary-deep)' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '14px', lineHeight: 1.6 }}>
                  {s.desc}
                </p>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-subtle)', lineHeight: 1.6 }}>
                  {s.detail}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '56px',
              padding: '36px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--primary-deep)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px'
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '8px' }}>
                Haben Sie Fragen zum Ablauf?
              </h3>
              <p style={{ color: '#D4DEC9', fontSize: '0.96rem' }}>
                Ich beantworte Ihre Fragen gerne vorab telefonisch oder schriftlich.
              </p>
            </div>
            <button className="btn btn-gold" onClick={openInquiryModal}>
              <span>Termin unverbindlich anfragen</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
