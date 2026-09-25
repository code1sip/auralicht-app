import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import MobileAppShell from './components/mobile/MobileAppShell';
import MobileHome from './pages/mobile/MobileHome';
import MobileMethods from './pages/mobile/MobileMethods';
import MobileAbout from './pages/mobile/MobileAbout';
import MobileBooking from './pages/mobile/MobileBooking';
import MobileContact from './pages/mobile/MobileContact';
import Legal from './pages/Legal';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import { ArrowLeft } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'methods' | 'about' | 'booking' | 'contact'
  const [selectedMethodForBooking, setSelectedMethodForBooking] = useState(null);
  const [viewingOverlay, setViewingOverlay] = useState(null); // null | 'legal' | 'admin'
  const [adminToken, setAdminToken] = useState(() => {
    return localStorage.getItem('auralicht_admin_token') || null;
  });

  const handleBookMethod = (methodTitle) => {
    setSelectedMethodForBooking(methodTitle);
    setActiveTab('booking');
  };

  // If viewing Admin portal
  if (viewingOverlay === 'admin') {
    return (
      <div style={{ position: 'relative', minHeight: '100vh', background: '#F4F1EA' }}>
        <button
          onClick={() => setViewingOverlay(null)}
          style={{
            position: 'fixed',
            top: '16px',
            right: '20px',
            zIndex: 1100,
            background: '#FFFFFF',
            border: '1px solid #DDD',
            borderRadius: 'var(--radius-full)',
            padding: '7px 16px',
            fontSize: '0.84rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <ArrowLeft size={16} />
          <span>Zurück zur Mobile App</span>
        </button>

        {adminToken ? (
          <AdminDashboard
            token={adminToken}
            onLogout={() => {
              localStorage.removeItem('auralicht_admin_token');
              setAdminToken(null);
            }}
          />
        ) : (
          <AdminLogin onLoginSuccess={(token) => setAdminToken(token)} />
        )}
      </div>
    );
  }

  return (
    <MobileAppShell
      activeTab={activeTab}
      setActiveTab={(tab) => {
        setViewingOverlay(null);
        setActiveTab(tab);
      }}
    >
      {viewingOverlay === 'legal' ? (
        <div>
          <button
            onClick={() => setViewingOverlay(null)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--sage)',
              fontSize: '0.86rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '16px'
            }}
          >
            <ArrowLeft size={16} />
            <span>Zurück</span>
          </button>
          <Legal />
        </div>
      ) : (
        <>
          {activeTab === 'home' && (
            <MobileHome
              setActiveTab={setActiveTab}
              onSelectMethod={(m) => handleBookMethod(m.title)}
            />
          )}

          {activeTab === 'methods' && (
            <MobileMethods onBookMethod={handleBookMethod} />
          )}

          {activeTab === 'about' && (
            <MobileAbout
              onBookAppointment={() => {
                setSelectedMethodForBooking('Erstberatung & Kennenlernen');
                setActiveTab('booking');
              }}
            />
          )}

          {activeTab === 'booking' && (
            <MobileBooking preselectedMethod={selectedMethodForBooking} />
          )}

          {activeTab === 'contact' && (
            <MobileContact
              onOpenLegal={() => setViewingOverlay('legal')}
              onOpenAdmin={() => setViewingOverlay('admin')}
            />
          )}
        </>
      )}
    </MobileAppShell>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
