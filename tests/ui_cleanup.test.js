import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('UI Cleanup — Removal of Unnecessary Status Pills and Badges', () => {
    // 1. Confirm Hero / Studio header no longer has the Interactive Creation Studio badge
    const studioPath = path.resolve('components/QRStudio/QRStudio.jsx');
    const studioContent = fs.readFileSync(studioPath, 'utf8');

    assert.ok(!studioContent.includes('Interactive Creation Studio'));
    assert.ok(!studioContent.includes('qr-studio__badge'));

    // 2. Confirm Live Preview card header no longer has the READY status badge
    const previewPath = path.resolve('components/QRStudio/QRPreview.jsx');
    const previewContent = fs.readFileSync(previewPath, 'utf8');

    assert.ok(!previewContent.includes('qr-status-badge'));
    assert.ok(!previewContent.includes('validation.statusText'));

    // 3. Confirm functional validation is still preserved in QRPreview.jsx
    assert.ok(previewContent.includes('validation.isValid'));
    assert.ok(previewContent.includes('qrDataUrl'));
    assert.ok(previewContent.includes('handleCopyPayload'));
});

test('Footer Cleanup — Removal of Description, Copyright, and Technical Meta', () => {
    const footerPath = path.resolve('components/Footer.jsx');
    const footerContent = fs.readFileSync(footerPath, 'utf8');

    // 1. Confirm footer description paragraph is removed
    assert.ok(!footerContent.includes('Every pixel and matrix payload is encoded locally'));
    assert.ok(!footerContent.includes('footer-copy'));

    // 2. Confirm copyright line is removed
    assert.ok(!footerContent.includes('ALL RIGHTS RESERVED'));
    assert.ok(!footerContent.includes('footer-copyright'));

    // 3. Confirm technical footer label is removed
    assert.ok(!footerContent.includes('CLIENT-SIDE ENCODING'));
    assert.ok(!footerContent.includes('ZERO TELEMETRY'));
    assert.ok(!footerContent.includes('footer-meta'));
    assert.ok(!footerContent.includes('footer-bottom-row'));

    // 4. Confirm key elements and interactions are preserved
    assert.ok(footerContent.includes('100% client-side.'));
    assert.ok(footerContent.includes('Your QR data stays in the browser.'));
    assert.ok(footerContent.includes('RETURN TO TOP ↑'));
    assert.ok(footerContent.includes('footer-wordmark-wrap'));
    assert.ok(footerContent.includes('<BrandLogo size="footer" onClick={scrollToTop} />'));
});
