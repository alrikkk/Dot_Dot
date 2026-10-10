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

test('URL Scheme Allowlist & Validation Security', () => {
    assert.equal(normalizeUrl('example.com'), 'https://example.com');
    assert.equal(normalizeUrl('https://example.com/path'), 'https://example.com/path');
    assert.equal(normalizeUrl('http://example.com/path'), 'http://example.com/path');
    assert.equal(normalizeUrl('javascript://example.com/%0aalert(1)'), '');
    assert.equal(normalizeUrl('file:///etc/passwd'), '');
    assert.equal(normalizeUrl('ftp://ftp.example.com'), '');

    assert.equal(validateQrInputs(QR_TYPES.URL, { url: 'https://example.com' }).isValid, true);
    assert.equal(validateQrInputs(QR_TYPES.URL, { url: 'http://example.com' }).isValid, true);
    assert.equal(validateQrInputs(QR_TYPES.URL, { url: 'example.com' }).isValid, true);

    const jsUrl = validateQrInputs(QR_TYPES.URL, { url: 'javascript://example.com/%0aalert(1)' });
    assert.equal(jsUrl.isValid, false);
    assert.equal(jsUrl.message, 'Only http and https links are supported');

    const fileUrl = validateQrInputs(QR_TYPES.URL, { url: 'file:///etc/passwd' });
    assert.equal(fileUrl.isValid, false);
    assert.equal(fileUrl.message, 'Only http and https links are supported');

    const localhostUrl = validateQrInputs(QR_TYPES.URL, { url: 'http://localhost' });
    assert.equal(localhostUrl.isValid, false);
    assert.equal(localhostUrl.message, 'Enter a valid domain name');

    const emptyUrl = validateQrInputs(QR_TYPES.URL, { url: '' });
    assert.equal(emptyUrl.isValid, false);
    assert.equal(emptyUrl.message, 'Enter a website address');
});

test('Email Injection Prevention & Validation', () => {
    const validEmail = validateQrInputs(QR_TYPES.EMAIL, { email: 'name@example.com' });
    assert.equal(validEmail.isValid, true);

    const injectionEmails = [
        'a@b.com?bcc=x@y.com',
        'a@b.com&bcc=x@y.com',
        'a@b.com#anchor',
        'a@b.com%0a',
        'a b@c.com'
    ];
    for (const email of injectionEmails) {
        const res = validateQrInputs(QR_TYPES.EMAIL, { email });
        assert.equal(res.isValid, false);
        assert.equal(res.message, 'Enter a valid email address');
    }

    assert.equal(validateQrInputs(QR_TYPES.EMAIL, { email: ' a@b.com' }).isValid, true);
    assert.equal(validateQrInputs(QR_TYPES.EMAIL, { email: 'a@b.com ' }).isValid, true);

    const emptyEmail = validateQrInputs(QR_TYPES.EMAIL, { email: '' });
    assert.equal(emptyEmail.isValid, false);
    assert.equal(emptyEmail.message, 'Enter an email address');

    const spacesEmail = validateQrInputs(QR_TYPES.EMAIL, { email: '   ' });
    assert.equal(spacesEmail.isValid, false);
    assert.equal(spacesEmail.message, 'Enter an email address');

    assert.equal(buildQrPayload(QR_TYPES.EMAIL, { email: 'name@example.com' }), 'mailto:name@example.com');
    assert.equal(
        buildQrPayload(QR_TYPES.EMAIL, { email: 'name@example.com', subject: 'Hi', body: 'There' }),
        'mailto:name@example.com?subject=Hi&body=There'
    );
});

