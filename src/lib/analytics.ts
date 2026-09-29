const SESSION_KEY = 'veloradz_sid';

type EventType = 'page_view' | 'product_view' | 'checkout_start' | 'whatsapp_lead';

type TrackPayload = {
  page_path?: string;
  product_id?: string;
  product_name?: string;
};

function getApiUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL || 'https://api.confortdz.shop';
}

export function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';

  let sessionId = window.localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `sid_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    window.localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

function getUtmParams() {
  if (typeof window === 'undefined') {
    return { utm_source: undefined, utm_medium: undefined, utm_campaign: undefined, referrer: undefined };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    referrer: document.referrer || undefined,
  };
}

export async function trackEvent(eventType: EventType, payload: TrackPayload = {}) {
  if (typeof window === 'undefined') return;

  try {
    await fetch(`${getApiUrl()}/api/analytics/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: eventType,
        session_id: getSessionId(),
        page_path: payload.page_path || window.location.pathname,
        product_id: payload.product_id,
        product_name: payload.product_name,
        ...getUtmParams(),
      }),
      keepalive: true,
    });
  } catch {
    // Analytics should never block the store UX.
  }
}

export function getTrackingContext() {
  return {
    session_id: getSessionId(),
    ...getUtmParams(),
  };
}
