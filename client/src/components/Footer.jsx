import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Clock, Shield, Heart } from 'lucide-react';

export default function Footer({ setActivePage, openInquiryModal }) {
  const { t } = useLanguage();

  const handleNavClick = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand & Philosophy */}
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <img
                src="/logo2.webp"
                alt="Auralicht"
                style={{ height: '40px', borderRadius: '4px', filter: 'brightness(1.1)' }}
              />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#FFFFFF', fontWeight: 700 }}>
                Auralicht
              </span>
            </div>
            <p style={{ color: '#A9B8A4', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '20px' }}>
              Sanfte Energiearbeit zur Förderung des tiefen Wohlbefindens und zur Unterstützung bei Verspannungen sowie eingeschränkter Beweglichkeit im Raum Salzburg.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#C8A951', fontSize: '0.85rem' }}>
              <Heart size={16} />
              <span>Achtsam • Ganzheitlich • Individuell</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-col">
            <h4>{t('nav_home')}</h4>
            <ul className="footer-links">
              <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>{t('nav_about')}</a></li>
              <li><a href="#methods" onClick={(e) => { e.preventDefault(); handleNavClick('methods'); }}>{t('nav_methods')}</a></li>
              <li><a href="#suitable" onClick={(e) => { e.preventDefault(); handleNavClick('suitable'); }}>{t('nav_suitable')}</a></li>
              <li><a href="#approach" onClick={(e) => { e.preventDefault(); handleNavClick('approach'); }}>{t('nav_approach')}</a></li>
              <li><a href="#testimonials" onClick={(e) => { e.preventDefault(); handleNavClick('testimonials'); }}>{t('nav_testimonials')}</a></li>
            </ul>
          </div>

          {/* Col 3: Practice Contact */}
          <div className="footer-col">
            <h4>{t('contact_info_title')}</h4>
            <ul className="footer-links">
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} style={{ color: '#8B9A7B', flexShrink: 0 }} />
                <span>Salzburg & Umgebung, Österreich</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} style={{ color: '#8B9A7B', flexShrink: 0 }} />
                <a href="mailto:kontakt@auralicht.at">kontakt@auralicht.at</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={16} style={{ color: '#8B9A7B', flexShrink: 0 }} />
                <span>Termine nach Vereinbarung</span>
              </li>
              <li style={{ marginTop: '10px' }}>
                <button
                  className="btn btn-primary"
                  onClick={openInquiryModal}
                  style={{ padding: '8px 16px', fontSize: '0.84rem' }}
                >
                  {t('nav_book')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Rechtliches & Portal */}
          <div className="footer-col">
            <h4>{t('nav_legal')}</h4>
            <ul className="footer-links">
              <li>
                <a href="#legal" onClick={(e) => { e.preventDefault(); handleNavClick('legal'); }}>
                  Impressum (§ 5 ECG)
                </a>
              </li>
              <li>
                <a href="#legal" onClick={(e) => { e.preventDefault(); handleNavClick('legal'); }}>
                  Datenschutzerklärung (DSGVO)
                </a>
              </li>
              <li>
                <a href="#legal" onClick={(e) => { e.preventDefault(); handleNavClick('legal'); }}>
                  Rechtlicher Hinweis
                </a>
              </li>
              <li style={{ marginTop: '14px' }}>
                <button
                  onClick={() => handleNavClick('admin')}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#C8D8C0',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Shield size={14} />
                  <span>{t('nav_admin')} Login</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Auralicht • Canan Kalman. Alle Rechte vorbehalten.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ fontSize: '0.8rem', color: '#7E917A' }}>
              Humanenergetik • WKO Salzburg
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
