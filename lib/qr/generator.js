// ─── lib/qr/generator.js — Client-Side QR Generation via QRCode Engine ──────
import QRCode from 'qrcode';

/**
 * Generates PNG data URL from payload
 */
export async function generateQrDataUrl(payload, options = {}) {
    if (!payload) return '';
    const {
        errorCorrectionLevel = 'M',
        margin = 2,
        color = { dark: '#0a0a0a', light: '#faf8f5' },
        width = 512,
    } = options;

    try {
        return await QRCode.toDataURL(payload, {
            errorCorrectionLevel,
            margin,
            color,
            width,
        });
    } catch (err) {
        console.error('QR DataURL generation error:', err);
        throw err;
    }
}

/**
 * Generates pure SVG markup string from payload
 */
export async function generateQrSvg(payload, options = {}) {
    if (!payload) return '';
    const {
        errorCorrectionLevel = 'M',
        margin = 2,
        color = { dark: '#0a0a0a', light: '#faf8f5' },
        width = 512,
    } = options;

    try {
        return await QRCode.toString(payload, {
            type: 'svg',
            errorCorrectionLevel,
            margin,
            color,
            width,
        });
    } catch (err) {
        console.error('QR SVG generation error:', err);
        throw err;
    }
}

/**
 * Extracts raw module matrix for canvas/SVG interaction
 */
export function getQrMatrix(payload, options = {}) {
    if (!payload) return null;
    const { errorCorrectionLevel = 'M' } = options;
    try {
        return QRCode.create(payload, { errorCorrectionLevel });
    } catch (err) {
        console.error('QR matrix creation error:', err);
        return null;
    }
}
