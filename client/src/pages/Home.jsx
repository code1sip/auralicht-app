import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  MapPin,
  Check,
  ChevronDown,
  ChevronUp,
  Star,
  Activity,
  HeartHandshake,
  Compass,
  Feather,
  Brain,
  GraduationCap
} from 'lucide-react';

export default function Home({ setActivePage, openInquiryModal }) {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const methodsList = [
    {
      title: t('m1_title'),
      desc: t('m1_desc'),
      tag: t('m1_tag'),
      icon: <Feather size={26} />,
      color: '#7BA8A0'
    },
    {
      title: t('m2_title'),
      desc: t('m2_desc'),
      tag: t('m2_tag'),
      icon: <Activity size={26} />,
      color: '#8B9A7B'
    },
    {
      title: t('m3_title'),
      desc: t('m3_desc'),
      tag: t('m3_tag'),
      icon: <Compass size={26} />,
      color: '#D4AF37'
    },
    {
      title: t('m4_title'),
      desc: t('m4_desc'),
      tag: t('m4_tag'),
      icon: <Sparkles size={26} />,
      color: '#C29B38'
    },
    {
      title: t('m5_title'),
      desc: t('m5_desc'),
      tag: t('m5_tag'),
      icon: <Brain size={26} />,
      color: '#658B79'
    },
    {
      title: t('m6_title'),
      desc: t('m6_desc'),
      tag: t('m6_tag'),
      icon: <GraduationCap size={26} />,
      color: '#507567'
    }
  ];

  const faqs = [
    { q: t('faq1_q'), a: t('faq1_a') },
    { q: t('faq2_q'), a: t('faq2_a') },
    { q: t('faq3_q'), a: t('faq3_a') }
  ];

  return (
    <div>
      {/* ========================================================
          HERO SECTION
          ======================================================== */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              {/* Badge */}
              <div className="hero-badge">
                <Sparkles size={16} style={{ color: 'var(--sage)' }} />
                <span>{t('hero_badge')}</span>
              </div>

              {/* Title */}
              <h1 className="hero-title">
                {t('hero_title_1')}{' '}
                <span className="hero-title-gradient">{t('hero_title_2')}</span>
              </h1>

              {/* Subtitle */}
              <p className="hero-subtitle">
                {t('hero_subtitle')}
              </p>

              {/* CTA Buttons */}
              <div className="hero-cta-group">
                <button className="btn btn-primary" onClick={openInquiryModal}>
                  <span>{t('hero_cta')}</span>
                  <ArrowRight size={17} />
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setActivePage('methods');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>{t('hero_secondary_cta')}</span>
                </button>
              </div>

              {/* Stats Bar */}
              <div className="hero-stats-bar">
                <div className="stat-item">
                  <span className="stat-number">{t('hero_stat_1_num')}</span>
                  <span className="stat-label">{t('hero_stat_1_lbl')}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{t('hero_stat_2_num')}</span>
                  <span className="stat-label">{t('hero_stat_2_lbl')}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{t('hero_stat_3_num')}</span>
                  <span className="stat-label">{t('hero_stat_3_lbl')}</span>
                </div>
              </div>
            </div>

            {/* Hero Image with Elegant Frame */}
            <div className="hero-image-wrap">
              <div className="hero-img-container">
                <img
                  src="/assets/images/canan-hero.png"
                  alt="Canan Kalman – Humanenergetikerin Salzburg"
                  className="hero-img"
                  onError={(e) => {
                    e.target.src = '/assets/images/canan-portrait-i.png';
                  }}
                />
              </div>

              {/* Floating Certification Badge */}
              <div className="hero-floating-badge">
                <div className="badge-icon-box">
                  <Award size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--primary-deep)' }}>
                    Diplomierte Praxis
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--sage)' }}>
                    WKO Salzburg verifiziert
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SCHWERPUNKTE / METHODEN PREVIEW
          ======================================================== */}
      <section className="section section-sand">
        <div className="container">
          <div className="text-center">
            <span className="section-badge">{t('methods_badge')}</span>
            <h2 className="section-title">{t('methods_title')}</h2>
            <p className="section-subtitle mx-auto">{t('methods_intro')}</p>
          </div>

          <div className="methods-grid">
            {methodsList.map((m, index) => (
              <div key={index} className="glass-card method-card">
                <div>
                  <div className="method-icon-box">{m.icon}</div>
                  <span className="method-tag">{m.tag}</span>
                  <h3 className="method-title">{m.title}</h3>
                  <p className="method-desc">{m.desc}</p>
                </div>
                <div>
                  <button
                    className="btn btn-secondary"
                    style={{ width: '100%', fontSize: '0.88rem', padding: '10px' }}
                    onClick={openInquiryModal}
                  >
                    <span>Termin anfragen</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '48px' }}>
            <button
              className="btn btn-primary"
              onClick={() => {
                setActivePage('methods');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>Alle Methoden im Detail</span>
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          ABOUT PREVIEW SECTION
          ======================================================== */}
      <section className="section section-cream">
        <div className="container">
          <div className="about-grid">
            <div className="about-portrait-wrap text-center">
              <img
                src="/assets/images/canan-portrait-i.png"
                alt="Canan Kalman"
                className="about-portrait-img"
              />
            </div>

            <div>
              <span className="section-badge">{t('about_badge')}</span>
              <h2 className="section-title">{t('about_heading')}</h2>
              <div className="about-quote-box">
                {t('about_quote')}
              </div>
              <p style={{ marginBottom: '16px', lineHeight: 1.75 }}>
                {t('about_p1')}
              </p>
              <p style={{ marginBottom: '24px', lineHeight: 1.75 }}>
                {t('about_p2')}
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setActivePage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>Mehr über Canan erfahren</span>
                  <ArrowRight size={16} />
                </button>
                <button className="btn btn-secondary" onClick={openInquiryModal}>
                  <span>Erstgespräch anfragen</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FÜR WEN GEEIGNET PREVIEW
          ======================================================== */}
      <section className="section section-sand">
        <div className="container">
          <div className="text-center">
            <span className="section-badge">{t('suitable_badge')}</span>
            <h2 className="section-title">{t('suitable_title')}</h2>
            <p className="section-subtitle mx-auto">{t('suitable_desc')}</p>
          </div>

          <div className="suitable-grid">
            <div className="suitable-card">
              <div className="suitable-icon"><Activity size={32} /></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{t('s1_title')}</h3>
              <p style={{ fontSize: '0.94rem' }}>{t('s1_desc')}</p>
            </div>
            <div className="suitable-card">
              <div className="suitable-icon"><Feather size={32} /></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{t('s2_title')}</h3>
              <p style={{ fontSize: '0.94rem' }}>{t('s2_desc')}</p>
            </div>
            <div className="suitable-card">
              <div className="suitable-icon"><Brain size={32} /></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{t('s3_title')}</h3>
              <p style={{ fontSize: '0.94rem' }}>{t('s3_desc')}</p>
            </div>
            <div className="suitable-card">
              <div className="suitable-icon"><Compass size={32} /></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{t('s4_title')}</h3>
              <p style={{ fontSize: '0.94rem' }}>{t('s4_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          TESTIMONIALS SNIPPET
          ======================================================== */}
      <section className="section section-cream">
        <div className="container">
          <div className="text-center">
            <span className="section-badge">{t('testimonials_badge')}</span>
            <h2 className="section-title">{t('testimonials_title')}</h2>
          </div>

          <div className="testimonials-grid" style={{ marginTop: '40px' }}>
            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#C29B38" />)}
              </div>
              <p className="testimonial-text">{t('t1_text')}</p>
              <div className="testimonial-author-box">
                <span className="testimonial-author">{t('t1_author')}</span>
                <span className="testimonial-topic">{t('t1_topic')}</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#C29B38" />)}
              </div>
              <p className="testimonial-text">{t('t2_text')}</p>
              <div className="testimonial-author-box">
                <span className="testimonial-author">{t('t2_author')}</span>
                <span className="testimonial-topic">{t('t2_topic')}</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#C29B38" />)}
              </div>
              <p className="testimonial-text">{t('t3_text')}</p>
              <div className="testimonial-author-box">
                <span className="testimonial-author">{t('t3_author')}</span>
                <span className="testimonial-topic">{t('t3_topic')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FAQ ACCORDIONS
          ======================================================== */}
      <section className="section section-sand">
        <div className="container">
          <div className="text-center">
            <span className="section-badge">{t('faq_badge')}</span>
            <h2 className="section-title">{t('faq_title')}</h2>
          </div>

          <div className="faq-list" style={{ marginTop: '36px' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <button className="faq-question" onClick={() => toggleFaq(idx)}>
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openFaq === idx && (
                  <div className="faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          BOTTOM CTA BANNER
          ======================================================== */}
      <section className="section section-deep text-center">
        <div className="container container-narrow">
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', color: '#FFFFFF', marginBottom: '16px' }}>
            Bereit für mehr Leichtigkeit und Vitalität?
          </h2>
          <p style={{ color: '#D2DEC9', fontSize: '1.15rem', marginBottom: '36px', lineHeight: 1.7 }}>
            Vereinbaren Sie jetzt ein unverbindliches Erstgespräch in meiner Praxis in Salzburg. Ich freue mich darauf, Sie persönlich zu begleiten.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-gold" onClick={openInquiryModal}>
              <span>Jetzt Termin anfragen</span>
              <ArrowRight size={17} />
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setActivePage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>Kontaktinformationen</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
