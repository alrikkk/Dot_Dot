import { QR_TYPES } from './types.js';

/**
 * Escapes special characters for Wi-Fi QR code strings
 * Special chars: \ ; , : "
 */
export function escapeWifiString(str = '') {
    return str.replace(/([\\;,:"'])/g, '\\$1');
}

/**
 * Normalizes URL strings (adds https:// if missing protocol)
 */
export function normalizeUrl(url = '') {
    const trimmed = url.trim();
    if (!trimmed) return '';
    if (/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//i.test(trimmed)) {
        return trimmed;
    }
    return `https://${trimmed}`;
}

/**
 * Builds payload string from type and fields
 */
export function buildQrPayload(type, values) {
    if (!values) return '';

    switch (type) {
        case QR_TYPES.URL: {
            const raw = values.url || '';
            return normalizeUrl(raw);
        }

        case QR_TYPES.TEXT: {
            return values.text || '';
        }

        case QR_TYPES.EMAIL: {
            const email = (values.email || '').trim();
            if (!email) return '';
            const params = [];
            if (values.subject) {
                params.push(`subject=${encodeURIComponent(values.subject)}`);
            }
            if (values.body) {
                params.push(`body=${encodeURIComponent(values.body)}`);
            }
            const query = params.length > 0 ? `?${params.join('&')}` : '';
            return `mailto:${email}${query}`;
        }

        case QR_TYPES.PHONE: {
            const rawPhone = (values.phone || '').trim();
            if (!rawPhone) return '';
            // Remove formatting spaces, parentheses, hyphens for tel: scheme, preserve leading +
            const cleanDigits = rawPhone.replace(/[^\d+]/g, '');
            return `tel:${cleanDigits || rawPhone}`;
        }

        case QR_TYPES.WIFI: {
            const ssid = escapeWifiString(values.ssid || '');
            const rawPassword = values.password || '';
            const password = escapeWifiString(rawPassword);
            const encryption = values.encryption || 'WPA';
            const hidden = Boolean(values.hidden);

            if (!ssid) return '';

            if (encryption === 'NONE') {
                return `WIFI:T:nopass;S:${ssid};;`;
            }

            return `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden ? 'true' : 'false'};;`;
        }

        default:
            return '';
    }
}
