import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Sparkles, Calendar, Shield } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, openInquiryModal }) {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t('nav_home') },
    { id: 'about', label: t('nav_about') },
    { id: 'methods', label: t('nav_methods') },
    { id: 'suitable', label: t('nav_suitable') },
    { id: 'approach', label: t('nav_approach') },
    { id: 'testimonials', label: t('nav_testimonials') },
    { id: 'contact', label: t('nav_contact') },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          {/* Brand Logo & Name */}
          <div
            className="nav-brand"
            onClick={() => handleNavClick('home')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src="./logo2.webp"
              alt="Auralicht Logo"
              className="nav-logo-img"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="nav-brand-text">
              <span className="nav-brand-title">Auralicht</span>
              <span className="nav-brand-sub">{t('brand_sub')}</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav>
            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                    style={{ background: 'none', border: 'none', font: 'inherit' }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions: Lang Picker + Book Appointment CTA */}
          <div className="nav-actions">
            {/* Language Switcher */}
            <div className="lang-switcher" title="Sprache wählen / Select language">
              {['de', 'en', 'fr'].map((l) => (
                <button
                  key={l}
                  className={`lang-btn ${lang === l ? 'active' : ''}`}
                  onClick={() => setLang(l)}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Quick Booking Button */}
            <button
              className="btn btn-primary"
              onClick={openInquiryModal}
              style={{ padding: '9px 20px', fontSize: '0.88rem' }}
            >
              <Calendar size={15} />
              <span>{t('nav_book')}</span>
            </button>

            {/* Mobile Toggle Button */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Menü öffnen"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Drawer Panel */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="nav-brand">
            <img src="./logo2.webp" alt="Auralicht" style={{ height: '34px', borderRadius: '4px' }} />
            <span className="nav-brand-title" style={{ fontSize: '1.2rem' }}>Auralicht</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary-deep)' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile Language Selector */}
        <div style={{ marginBottom: '24px' }}>
          <div className="lang-switcher" style={{ width: '100%', justifyContent: 'space-around' }}>
            {['de', 'en', 'fr'].map((l) => (
              <button
                key={l}
                className={`lang-btn ${lang === l ? 'active' : ''}`}
                onClick={() => setLang(l)}
                style={{ flex: 1, padding: '7px' }}
              >
                {l === 'de' ? '🇩🇪 Deutsch' : l === 'en' ? '🇬🇧 English' : '🇫🇷 Français'}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Nav Links */}
        <ul className="drawer-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`drawer-link ${activePage === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  font: 'inherit',
                  textAlign: 'left',
                  cursor: 'pointer',
                  width: '100%',
                  color: activePage === item.id ? 'var(--sage)' : 'var(--primary-deep)'
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handleNavClick('legal')}
              style={{
                background: 'none',
                border: 'none',
                font: 'inherit',
                textAlign: 'left',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                fontSize: '0.95rem'
              }}
            >
              {t('nav_legal')}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavClick('admin')}
              style={{
                background: 'none',
                border: 'none',
                font: 'inherit',
                textAlign: 'left',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Shield size={16} />
              {t('nav_admin')} Portal
            </button>
          </li>
        </ul>

        {/* Drawer Footer CTA */}
        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
          <button
            className="btn btn-primary"
            onClick={() => {
              setMobileMenuOpen(false);
              openInquiryModal();
            }}
            style={{ width: '100%' }}
          >
            <Calendar size={18} />
            <span>{t('nav_book')}</span>
          </button>
        </div>
      </div>
    </>
  );
}
