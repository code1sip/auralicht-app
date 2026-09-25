import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Sparkles,
  Check,
  ArrowRight,
  RotateCcw,
  Activity,
  Feather,
  Brain,
  Calendar
} from 'lucide-react';

export default function MobileAssessment({ onCompleteRecommendation }) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const symptoms = [
    { id: 'neck', title: 'Verspannungen in Nacken & Schultern', icon: '💆‍♀️', method: 'Kraniosakrale Balance' },
    { id: 'spine', title: 'Eingeschränkte Beweglichkeit im Rücken', icon: '🦴', method: 'Wirbelsäulen- & Gelenksbalance' },
    { id: 'stress', title: 'Überlastung, Burnout & Erschöpfung', icon: '⚡', method: 'Kinesiologie & Muskeltest' },
    { id: 'sleep', title: 'Schlafschwierigkeiten & innere Unruhe', icon: '🌙', method: 'Kraniosakrale Balance' },
    { id: 'mind', title: 'Gedankenkreisen & Veränderungswunsch', icon: '🎯', method: 'Hypnose & Mentalcoaching' }
  ];

  const goals = [
    { id: 'ease', title: 'Mehr körperliche Leichtigkeit', icon: '🌿' },
    { id: 'calm', title: 'Tiefe innere Ruhe & Entspannung', icon: '🕊️' },
    { id: 'energy', title: 'Neue Kraft & Vitalität', icon: '✨' },
    { id: 'focus', title: 'Klarheit für wichtige Entscheidungen', icon: '🧭' }
  ];

  const handleSymptomSelect = (s) => {
    setSelectedSymptom(s);
    setStep(2);
  };

  const handleGoalSelect = (g) => {
    setSelectedGoal(g);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedSymptom(null);
    setSelectedGoal(null);
  };

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: '18px' }}>
        <div className="mobile-greeting-badge">
          <Sparkles size={14} style={{ color: '#E5C378' }} />
          <span>Interaktiver Wellness-Check</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', color: 'var(--primary-deep)', marginBottom: '4px' }}>
          Finde deine passende Methode
        </h2>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
          Beantworte 2 kurze Fragen für eine persönliche Empfehlung.
        </p>
      </div>

      {/* Progress Dots */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '22px' }}>
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            style={{
              flex: 1,
              height: '4px',
              borderRadius: '2px',
              background: step >= s ? 'var(--primary-deep)' : 'var(--border-light)',
              transition: 'background 0.3s ease'
            }}
          />
        ))}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="quiz-step-card">
          <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-deep)', marginBottom: '6px' }}>
            1. Was spürst du aktuell am stärksten?
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
            Wähle den Bereich, der dich am meisten belastet:
          </p>

          <div>
            {symptoms.map((item) => (
              <button
                key={item.id}
                className="quiz-option-btn"
                onClick={() => handleSymptomSelect(item)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.88rem' }}>{item.title}</span>
                </div>
                <ArrowRight size={16} style={{ color: '#AAA' }} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="quiz-step-card">
          <button
            onClick={() => setStep(1)}
            style={{ background: 'none', border: 'none', color: 'var(--sage)', fontSize: '0.8rem', cursor: 'pointer', marginBottom: '12px' }}
          >
            ← Zurück
          </button>

          <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-deep)', marginBottom: '6px' }}>
            2. Was wünschst du dir als Ergebnis?
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
            Dein persönliches Wohlfühlziel:
          </p>

          <div>
            {goals.map((item) => (
              <button
                key={item.id}
                className="quiz-option-btn"
                onClick={() => handleGoalSelect(item)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.88rem' }}>{item.title}</span>
                </div>
                <ArrowRight size={16} style={{ color: '#AAA' }} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: RESULT */}
      {step === 3 && (
        <div className="mobile-welcome-card" style={{ background: '#FFFFFF', color: 'var(--text-main)', border: '1.5px solid var(--sage-soft)', padding: '24px 20px', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--sage-soft)', color: 'var(--primary-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Sparkles size={28} />
          </div>

          <span className="touch-card-tag" style={{ margin: '0 auto 10px' }}>
            Deine persönliche Empfehlung
          </span>

          <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-deep)', marginBottom: '8px' }}>
            {selectedSymptom?.method}
          </h3>

          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '22px' }}>
            Passend zu deinem Anliegen <strong>„{selectedSymptom?.title}“</strong> und deinem Ziel <strong>„{selectedGoal?.title}“</strong> bietet diese Methode die sanfteste und wirksamste Unterstützung.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => onCompleteRecommendation(selectedSymptom?.method)}
            style={{ width: '100%', padding: '14px', fontSize: '0.94rem', marginBottom: '12px' }}
          >
            <Calendar size={17} />
            <span>Jetzt dafür Termin anfragen</span>
          </button>

          <button
            onClick={handleReset}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', margin: '0 auto' }}
          >
            <RotateCcw size={14} />
            <span>Quiz wiederholen</span>
          </button>
        </div>
      )}
    </div>
  );
}
