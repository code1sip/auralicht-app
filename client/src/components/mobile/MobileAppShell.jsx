import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Home,
  Feather,
  User,
  Calendar,
  MapPin,
  Wifi,
  Battery,
  MessageCircle,
  Smartphone,
  Maximize2,
  Minimize2
} from 'lucide-react';

export default function MobileAppShell({
  activeTab,
  setActiveTab,
  children
}) {
  const { lang, setLang, t } = useLanguage();
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hrs}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'home', label: 'Home', icon: <Home size={19} /> },
    { id: 'methods', label: 'Methoden', icon: <Feather size={19} /> },
    { id: 'about', label: 'Über Mich', icon: <User size={19} /> },
    { id: 'booking', label: 'Buchen', icon: <Calendar size={19} /> },
    { id: 'contact', label: 'Kontakt', icon: <MapPin size={19} /> }
  ];

  return (
    <div className={`mobile-simulator-wrapper ${fullscreenMode ? 'fullscreen-mode' : ''}`}>
      {/* Simulator Switcher (Visible on desktop screen) */}
      <div className="simulator-toggle-bar">
        <button
          className={`sim-toggle-btn ${!fullscreenMode ? 'active' : ''}`}
          onClick={() => setFullscreenMode(false)}
        >
          <Smartphone size={15} />
          <span>iPhone 16 Pro Frame</span>
        </button>
        <button
          className={`sim-toggle-btn ${fullscreenMode ? 'active' : ''}`}
          onClick={() => setFullscreenMode(true)}
        >
          {fullscreenMode ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          <span>Full Width</span>
        </button>
      </div>

      {/* Mobile Device Frame */}
      <div className="mobile-device-frame">
        {/* iOS Status Bar with Dynamic Island */}
        <div className="mobile-status-bar">
          <span>{currentTime}</span>

          <div className="dynamic-island">
            <div className="island-camera" />
            <div className="island-sensor" />
          </div>

          <div className="status-bar-icons">
            <Wifi size={14} />
            <Battery size={15} />
          </div>
        </div>

        {/* Mobile Top App Bar */}
        <header className="mobile-app-header">
          <div
            className="mobile-brand-pill"
            onClick={() => setActiveTab('about')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src="/assets/images/canan-portrait-i.png"
              alt="Canan Kalman"
              className="mobile-avatar"
            />
            <div>
              <div className="mobile-header-title">Auralicht</div>
              <div className="mobile-location-tag">
                <MapPin size={11} />
                <span>Salzburg, AT</span>
              </div>
            </div>
          </div>

          <div className="mobile-header-actions">
            {/* Quick Lang Switch */}
            <div className="lang-switcher" style={{ padding: '2px' }}>
              {['de', 'en', 'fr'].map((l) => (
                <button
                  key={l}
                  className={`lang-btn ${lang === l ? 'active' : ''}`}
                  onClick={() => setLang(l)}
                  style={{ padding: '3px 7px', fontSize: '0.7rem' }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Direct WhatsApp Action */}
            <a
              href="https://wa.me/436600000000"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#EAF7EE',
                color: '#27AE60',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
              }}
              title="WhatsApp"
            >
              <MessageCircle size={17} />
            </a>
          </div>
        </header>

        {/* Scrollable Screen Content */}
        <main className="mobile-screen-content">
          {children}
        </main>

        {/* Fixed Bottom Navigation Bar (5 Tabs) */}
        <nav className="mobile-bottom-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`mobile-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="tab-icon-box">{tab.icon}</div>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* iOS Home Indicator Bar */}
        <div className="home-indicator-bar" />
      </div>
    </div>
  );
}
