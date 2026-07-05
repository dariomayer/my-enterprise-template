import { useState, useEffect } from 'react';

interface CookieConsentProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

const COOKIE_CONSENT_KEY = 'cookie-consent-accepted';

/**
 * Modular, opt-in Cookie Consent banner component.
 * Shows a GDPR-compliant banner at the bottom of the page until the user
 * explicitly accepts or declines cookies. The preference is persisted
 * in localStorage.
 */
export function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored === null) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setVisible(false);
    onAccept?.();
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'false');
    setVisible(false);
    onDecline?.();
  };

  if (!visible) return null;

  return (
    <div
      id="cookie-consent-banner"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card p-4 shadow-lg"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          Utilizziamo cookie per migliorare la tua esperienza. Puoi accettare o rifiutare i cookie
          non essenziali.
        </p>
        <div className="flex gap-2">
          <button
            id="cookie-decline-btn"
            onClick={handleDecline}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Rifiuta
          </button>
          <button
            id="cookie-accept-btn"
            onClick={handleAccept}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}
