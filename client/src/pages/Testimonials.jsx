import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Star, Quote, ArrowRight } from 'lucide-react';

export default function Testimonials({ openInquiryModal }) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');

  const testimonials = [
    {
      id: 1,
      quote: t('t1_text'),
      author: t('t1_author'),
      topic: t('t1_topic'),
      category: 'stress'
    },
    {
      id: 2,
      quote: t('t2_text'),
      author: t('t2_author'),
      topic: t('t2_topic'),
      category: 'movement'
    },
    {
      id: 3,
      quote: t('t3_text'),
      author: t('t3_author'),
      topic: t('t3_topic'),
      category: 'clarity'
    },
    {
      id: 4,
      quote: '„Nach einer langen Phase starker beruflicher Belastung hat mir Canans Begleitung geholfen, wieder bei mir selbst anzukommen. Die kinesiologische Sitzung war unglaublich aufschlussreich.“',
      author: 'Stefan M., 48 Jahre',
      topic: 'Burnout & Entlastung',
      category: 'stress'
    },
    {
      id: 5,
      quote: '„Ich hatte nach einer Operation an der Schulter monatelang das Gefühl, dass etwas blockiert ist. Die energetische Narbenentstörung hat sofort Erleichterung gebracht.“',
      author: 'Johanna T., 54 Jahre',
      topic: 'Narbenentstörung',
      category: 'movement'
    },
    {
      id: 6,
      quote: '„Frau Kalman strahlt eine tiefe Ruhe und Herzlichkeit aus. Schon beim Betreten der Praxis spürt man eine wohltuende Atmosphäre, in der man sich sofort fallen lassen kann.“',
      author: 'Claudia B., 36 Jahre',
      topic: 'Wohlbefinden & Ruhe',
      category: 'clarity'
    }
  ];

  const filtered = filter === 'all'
    ? testimonials
    : testimonials.filter((t) => t.category === filter);

  return (
    <div style={{ paddingTop: '80px' }}>
      <section className="section section-sand text-center" style={{ padding: '60px 0 40px' }}>
        <div className="container">
          <span className="section-badge">{t('testimonials_badge')}</span>
          <h1 className="section-title">{t('testimonials_title')}</h1>
          <p className="section-subtitle mx-auto">
            Authentische Einblicke von Menschen, die durch energetische Begleitung neue Leichtigkeit gefunden haben.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
            <button className={`filter-pill ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
              Alle Erfahrungen
            </button>
            <button className={`filter-pill ${filter === 'stress' ? 'active' : ''}`} onClick={() => setFilter('stress')}>
              Stress & Ruhe
            </button>
            <button className={`filter-pill ${filter === 'movement' ? 'active' : ''}`} onClick={() => setFilter('movement')}>
              Nacken & Beweglichkeit
            </button>
            <button className={`filter-pill ${filter === 'clarity' ? 'active' : ''}`} onClick={() => setFilter('clarity')}>
              Klarheit & Balance
            </button>
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <div className="testimonials-grid">
            {filtered.map((item) => (
              <div key={item.id} className="testimonial-card glass-card">
                <div>
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="#C29B38" />
                    ))}
                  </div>
                  <p className="testimonial-text">{item.quote}</p>
                </div>
                <div className="testimonial-author-box">
                  <span className="testimonial-author">{item.author}</span>
                  <span className="testimonial-topic">{item.topic}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '56px' }}>
            <button className="btn btn-primary" onClick={openInquiryModal}>
              <span>Jetzt eigenen Termin buchen</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
