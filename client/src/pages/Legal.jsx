import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, AlertTriangle } from 'lucide-react';

export default function Legal() {
  const { t } = useLanguage();

  return (
    <div style={{ paddingTop: '80px' }}>
      <section className="section section-sand text-center" style={{ padding: '60px 0 40px' }}>
        <div className="container container-narrow">
          <span className="section-badge">Rechtliche Hinweise</span>
          <h1 className="section-title">{t('legal_title')}</h1>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container container-narrow">
          {/* Important Medical Disclaimer Alert */}
          <div
            style={{
              background: '#FFF8E8',
              border: '1.5px solid #F6C96B',
              borderRadius: 'var(--radius-md)',
              padding: '24px 28px',
              marginBottom: '40px',
              display: 'flex',
              gap: '16px'
            }}
          >
            <AlertTriangle size={24} style={{ color: '#B7791F', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#8C5B00', marginBottom: '8px' }}>
                {t('legal_disclaimer_title')}
              </h3>
              <p style={{ fontSize: '0.94rem', color: '#5C4410', lineHeight: 1.65 }}>
                {t('legal_disclaimer')} Die Begleitung durch Humanenergetik, Kinesiologie und Mentaltraining dient der Wiederherstellung und Harmonisierung der körpereigenen Energiefelder und stellt keine Heilbehandlung im Sinne des Ärztegesetzes dar. Die Wirkungsweise und der Erfolg sind naturwissenschaftlich nicht belegt.
              </p>
            </div>
          </div>

          {/* Impressum */}
          <div className="glass-card" style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '18px', color: 'var(--primary-deep)' }}>
              {t('legal_impressum_title')}
            </h2>

            <div style={{ lineHeight: 1.8, fontSize: '0.96rem', color: 'var(--text-main)' }}>
              <p><strong>{t('legal_owner')}</strong></p>
              <p>Auralicht – Praxis für Humanenergetik & Kinesiologie</p>
              <p>Salzburg & Umgebung, Österreich</p>
              <p>E-Mail: <a href="mailto:kontakt@auralicht.at" style={{ color: 'var(--primary)' }}>kontakt@auralicht.at</a></p>
              <p>Telefon: +43 660 000 0000</p>
              <br />
              <p><strong>Unternehmensgegenstand & Gewerberecht:</strong></p>
              <p>{t('legal_trade')}</p>
              <p>{t('legal_authority')}</p>
              <p>Gewerbeordnung: <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>www.ris.bka.gv.at</a></p>
            </div>
          </div>

          {/* Datenschutz */}
          <div className="glass-card">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '18px', color: 'var(--primary-deep)' }}>
              Datenschutzerklärung (DSGVO)
            </h2>

            <div style={{ lineHeight: 1.8, fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              <p style={{ marginBottom: '14px' }}>
                Der Schutz Ihrer persönlichen Daten ist mir ein besonderes Anliegen. Ich verarbeite Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003).
              </p>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-deep)', marginTop: '16px', marginBottom: '8px' }}>
                Kontakt mit mir
              </h3>
              <p style={{ marginBottom: '14px' }}>
                Wenn Sie per Formular auf der Website oder per E-Mail Kontakt mit mir aufnehmen, werden Ihre angegebenen Daten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen sechs Monate bei mir gespeichert. Diese Daten gebe ich nicht ohne Ihre Einwilligung weiter.
              </p>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-deep)', marginTop: '16px', marginBottom: '8px' }}>
                Ihre Rechte
              </h3>
              <p>
                Ihnen stehen bezüglich Ihrer bei mir gespeicherten Daten grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt, können Sie sich an die Datenschutzbehörde wenden.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
