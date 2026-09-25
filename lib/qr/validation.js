import { QR_TYPES } from './types.js';

export function validateQrInputs(type, values) {
    if (!values) {
        return { isValid: false, statusText: 'CHECK INPUT', message: 'No input provided' };
    }

    switch (type) {
        case QR_TYPES.URL: {
            const raw = (values.url || '').trim();
            if (!raw) {
                return { isValid: false, statusText: 'CHECK INPUT', message: 'Enter a website address' };
            }
            try {
                // If protocol missing, normalize to test validity
                const testUrl = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;
                const parsed = new URL(testUrl);
                if (!parsed.hostname || !parsed.hostname.includes('.')) {
                    return { isValid: false, statusText: 'CHECK INPUT', message: 'Enter a valid domain name' };
                }
                return { isValid: true, statusText: 'READY', message: 'Valid web address' };
            } catch {
                return { isValid: false, statusText: 'CHECK INPUT', message: 'Invalid URL format' };
            }
        }

        case QR_TYPES.TEXT: {
            const text = (values.text || '').trim();
            if (!text) {
                return { isValid: false, statusText: 'CHECK INPUT', message: 'Enter your message or note' };
            }
            return { isValid: true, statusText: 'READY', message: `${text.length} characters ready` };
        }

        case QR_TYPES.EMAIL: {
            const email = (values.email || '').trim();
            if (!email) {
                return { isValid: false, statusText: 'CHECK INPUT', message: 'Enter an email address' };
            }
            // Basic RFC email check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return { isValid: false, statusText: 'CHECK INPUT', message: 'Enter a valid email address' };
            }
            return { isValid: true, statusText: 'READY', message: 'Mailto payload ready' };
        }

        case QR_TYPES.PHONE: {
            const phone = (values.phone || '').trim();
            if (!phone) {
                return { isValid: false, statusText: 'CHECK INPUT', message: 'Enter a phone number' };
            }
            // Must contain at least 5 digits
            const digits = phone.replace(/\D/g, '');
            if (digits.length < 5) {
                return { isValid: false, statusText: 'CHECK INPUT', message: 'Phone number too short' };
            }
            return { isValid: true, statusText: 'READY', message: 'Telephone payload ready' };
        }

        case QR_TYPES.WIFI: {
            const ssid = (values.ssid || '').trim();
            if (!ssid) {
                return { isValid: false, statusText: 'CHECK INPUT', message: 'Enter network name (SSID)' };
            }
            const enc = values.encryption || 'WPA';
            const pass = values.password || '';
            if (enc !== 'NONE' && pass.length < 8 && enc === 'WPA') {
                return { isValid: false, statusText: 'CHECK INPUT', message: 'WPA password requires at least 8 characters' };
            }
            return { isValid: true, statusText: 'READY', message: 'Wi-Fi network ready' };
        }

        default:
            return { isValid: false, statusText: 'CHECK INPUT', message: 'Select a QR type' };
    }
}
