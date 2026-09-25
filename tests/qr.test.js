import test from 'node:test';
import assert from 'node:assert/strict';
import { QR_TYPES } from '../lib/qr/types.js';
import { buildQrPayload, escapeWifiString, normalizeUrl } from '../lib/qr/payloads.js';
import { validateQrInputs } from '../lib/qr/validation.js';
import { generateQrDataUrl, generateQrSvg, getQrMatrix } from '../lib/qr/generator.js';

test('URL Payload & Validation', () => {
    assert.equal(normalizeUrl('example.com'), 'https://example.com');
    assert.equal(normalizeUrl('https://example.com'), 'https://example.com');

    const payload = buildQrPayload(QR_TYPES.URL, { url: 'https://google.com' });
    assert.equal(payload, 'https://google.com');

    const validResult = validateQrInputs(QR_TYPES.URL, { url: 'https://google.com' });
    assert.equal(validResult.isValid, true);
    assert.equal(validResult.statusText, 'READY');

    const invalidResult = validateQrInputs(QR_TYPES.URL, { url: '' });
    assert.equal(invalidResult.isValid, false);
    assert.equal(invalidResult.statusText, 'CHECK INPUT');
});

test('Plain Text Payload & Validation', () => {
    const payload = buildQrPayload(QR_TYPES.TEXT, { text: 'DOT DOT test' });
    assert.equal(payload, 'DOT DOT test');

    const validResult = validateQrInputs(QR_TYPES.TEXT, { text: 'DOT DOT test' });
    assert.equal(validResult.isValid, true);
    assert.equal(validResult.statusText, 'READY');

    const invalidResult = validateQrInputs(QR_TYPES.TEXT, { text: '' });
    assert.equal(invalidResult.isValid, false);
});

test('Email Payload & Validation', () => {
    const payload = buildQrPayload(QR_TYPES.EMAIL, {
        email: 'test@example.com',
        subject: 'Hello DOT DOT',
        body: 'Testing QR'
    });
    assert.match(payload, /^mailto:test@example\.com\?subject=Hello(%20|\+)DOT(%20|\+)DOT&body=Testing(%20|\+)QR$/);

    const validResult = validateQrInputs(QR_TYPES.EMAIL, { email: 'test@example.com' });
    assert.equal(validResult.isValid, true);

    const invalidResult = validateQrInputs(QR_TYPES.EMAIL, { email: 'invalid-email' });
    assert.equal(invalidResult.isValid, false);
});

test('Phone Payload & Validation', () => {
    const payload = buildQrPayload(QR_TYPES.PHONE, { phone: '+91 98765 43210' });
    assert.equal(payload, 'tel:+919876543210');

    const validResult = validateQrInputs(QR_TYPES.PHONE, { phone: '+91 98765 43210' });
    assert.equal(validResult.isValid, true);

    const invalidResult = validateQrInputs(QR_TYPES.PHONE, { phone: '12' });
    assert.equal(invalidResult.isValid, false);
});

test('Wi-Fi Payload, Escaping & Validation', () => {
    assert.equal(escapeWifiString('my;network:name'), 'my\\;network\\:name');

    const payload = buildQrPayload(QR_TYPES.WIFI, {
        ssid: 'DOT_DOT_TEST',
        password: 'DotDotTest123',
        encryption: 'WPA',
        hidden: false
    });
    assert.equal(payload, 'WIFI:T:WPA;S:DOT_DOT_TEST;P:DotDotTest123;H:false;;');

    const validResult = validateQrInputs(QR_TYPES.WIFI, {
        ssid: 'DOT_DOT_TEST',
        password: 'DotDotTest123',
        encryption: 'WPA'
    });
    assert.equal(validResult.isValid, true);

    const shortPass = validateQrInputs(QR_TYPES.WIFI, {
        ssid: 'DOT_DOT_TEST',
        password: 'short',
        encryption: 'WPA'
    });
    assert.equal(shortPass.isValid, false);
});

test('QR Generation Engine (PNG & SVG)', async () => {
    const payload = 'https://google.com';
    const dataUrl = await generateQrDataUrl(payload, { errorCorrectionLevel: 'M' });
    assert.match(dataUrl, /^data:image\/png;base64,/);

    const svg = await generateQrSvg(payload, { errorCorrectionLevel: 'H' });
    assert.match(svg, /<svg/);
    assert.match(svg, /<\/svg>/);

    const matrix = getQrMatrix(payload, { errorCorrectionLevel: 'Q' });
    assert.ok(matrix.modules);
    assert.ok(matrix.modules.size > 20);
});
