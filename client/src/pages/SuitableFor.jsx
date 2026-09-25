import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Activity, Feather, Brain, Compass, Check, ArrowRight } from 'lucide-react';

export default function SuitableFor({ openInquiryModal }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    {
      id: 'physical',
      icon: <Activity size={28} />,
      title: t('s1_title'),
      desc: t('s1_desc'),
      points: [
        'Chronische Nacken- und Schulterverspannungen',
        'Spannungsgefühle im gesamten Rücken und der Wirbelsäule',
        'Einschränkungen der Beweglichkeit nach Überlastungen',
        'Begleitende Unterstützung nach Abklärung durch Ärzte'
      ]
    },
    {
      id: 'mental',
      icon: <Feather size={28} />,
      title: t('s2_title'),
      desc: t('s2_desc'),
      points: [
        'Chronische Erschöpfungszustände und Burnout-Prävention',
        'Ständiges Gedankenkreisen und Unfähigkeit abzuschalten',
        'Überlastung durch berufliche oder familiäre Anforderungen',
        'Bedürfnis nach tiefem Loslassen und innerer Ruhe'
      ]
    },
    {
      id: 'emotional',
      icon: <Brain size={28} />,
      title: t('s3_title'),
      desc: t('s3_desc'),
      points: [
        'Innere Unruhe, Nervosität und emotionale Achterbahn',
        'Schlafprobleme und unruhiger Nachtschlaf',
        'Energetische Dysbalancen im Chakra- und Meridiansystem',
        'Unterstützung bei der emotionalen Selbstregulation'
      ]
    },
    {
      id: 'orientation',
      icon: <Compass size={28} />,
      title: t('s4_title'),
      desc: t('s4_desc'),
      points: [
        'Entscheidungskrisen und Suche nach neuer Klarheit',
        'Lösen alter, hinderlicher Glaubensmuster',
        'Stärkung der eigenen Ressourcen und Intuition',
        'Achtsame Begleitung bei Neubeginn und Veränderungen'
      ]
    }
  ];

  const filteredCategories = activeTab === 'all'
    ? categories
    : categories.filter((c) => c.id === activeTab);

  return (
    <div style={{ paddingTop: '80px' }}>
      <section className="section section-sand text-center" style={{ padding: '60px 0 40px' }}>
        <div className="container">
          <span className="section-badge">{t('suitable_badge')}</span>
          <h1 className="section-title">{t('suitable_title')}</h1>
          <p className="section-subtitle mx-auto">{t('suitable_desc')}</p>

          {/* Filter Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
            <button
              className={`filter-pill ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              Alle Anliegen
            </button>
            <button
              className={`filter-pill ${activeTab === 'physical' ? 'active' : ''}`}
              onClick={() => setActiveTab('physical')}
            >
              Körper & Bewegung
            </button>
            <button
              className={`filter-pill ${activeTab === 'mental' ? 'active' : ''}`}
              onClick={() => setActiveTab('mental')}
            >
              Stress & Erschöpfung
            </button>
            <button
              className={`filter-pill ${activeTab === 'emotional' ? 'active' : ''}`}
              onClick={() => setActiveTab('emotional')}
            >
              Innere Unruhe & Schlaf
            </button>
            <button
              className={`filter-pill ${activeTab === 'orientation' ? 'active' : ''}`}
              onClick={() => setActiveTab('orientation')}
            >
              Neuausrichtung
            </button>
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
            {filteredCategories.map((cat) => (
              <div key={cat.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ color: 'var(--accent-gold)', marginBottom: '16px' }}>
                    {cat.icon}
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '12px', color: 'var(--primary-deep)' }}>
                    {cat.title}
                  </h3>
                  <p style={{ fontSize: '0.96rem', marginBottom: '20px', lineHeight: 1.65 }}>
                    {cat.desc}
                  </p>

                  <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Typische Anzeichen:
                    </h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {cat.points.map((p, pIdx) => (
                        <li key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem' }}>
                          <Check size={16} style={{ color: 'var(--sage)', flexShrink: 0, marginTop: '3px' }} />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button className="btn btn-primary" onClick={openInquiryModal} style={{ width: '100%', fontSize: '0.9rem' }}>
                  <span>Dazu Ersttermin anfragen</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
