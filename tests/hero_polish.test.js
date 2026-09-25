import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('DoubleMarquee Headline and Contrast Fix', () => {
    const cssPath = path.resolve('app/styles/marquee.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // Confirm navigation clearance on Double-marquee section
    assert.ok(cssContent.includes('padding: 130px'));
    assert.ok(cssContent.includes('align-items: flex-start;'));

    // Confirm z-index separation and in-flow positioning
    assert.ok(cssContent.includes('z-index: 5;'));
    assert.ok(cssContent.includes('.marquee-blob-container'));
    assert.ok(cssContent.includes('.marquee-stamp-card'));

    // Confirm DoubleMarquee.jsx headline and in-flow layout sequence
    const marqueePath = path.resolve('components/DoubleMarquee.jsx');
    const marqueeContent = fs.readFileSync(marqueePath, 'utf8');
    assert.ok(marqueeContent.includes('built to <span className="text-with">endure.</span>'));
    assert.ok(marqueeContent.includes('marquee-headline-wrapper'));
    assert.ok(marqueeContent.includes('marquee-description'));
});

test('Marquee Cards Custom Illustrations and No Emojis', () => {
    const dataPath = path.resolve('lib/data.js');
    const dataContent = fs.readFileSync(dataPath, 'utf8');

    // Confirm no emojis in MARQUEE_ITEMS
    assert.ok(!dataContent.includes('🔒'));
    assert.ok(!dataContent.includes('📐'));
    assert.ok(!dataContent.includes('⚡'));
    assert.ok(!dataContent.includes('🔥'));
    assert.ok(!dataContent.includes('✨'));
    assert.ok(!dataContent.includes('🚀'));

    // Confirm all 8 illustration IDs are defined
    assert.ok(dataContent.includes('ZERO_TRACKERS'));
    assert.ok(dataContent.includes('HIGH_DENSITY'));
    assert.ok(dataContent.includes('DOT_DOT'));
    assert.ok(dataContent.includes('VECTOR_SVG'));
    assert.ok(dataContent.includes('REED_SOLOMON'));
    assert.ok(dataContent.includes('CLIENT_SIDE'));
    assert.ok(dataContent.includes('ERROR_CORRECTION'));
    assert.ok(dataContent.includes('INSTANT_SCAN'));

    // Confirm MarqueeCardIllustrations file exists and provides all components
    const illustPath = path.resolve('components/MarqueeCardIllustrations.jsx');
    const illustContent = fs.readFileSync(illustPath, 'utf8');
    assert.ok(illustContent.includes('ZeroTrackersIllustration'));
    assert.ok(illustContent.includes('HighDensityIllustration'));
    assert.ok(illustContent.includes('DotDotIllustration'));
    assert.ok(illustContent.includes('VectorSvgIllustration'));
    assert.ok(illustContent.includes('ReedSolomonIllustration'));
    assert.ok(illustContent.includes('ClientSideIllustration'));
    assert.ok(illustContent.includes('ErrorCorrectionIllustration'));
    assert.ok(illustContent.includes('InstantScanIllustration'));

    // Confirm hover interactions in marquee.css
    const cssPath = path.resolve('app/styles/marquee.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    assert.ok(cssContent.includes('.illustration-zero-trackers'));
    assert.ok(cssContent.includes('.illustration-high-density'));
    assert.ok(cssContent.includes('.illustration-dot-dot'));
    assert.ok(cssContent.includes('.illustration-vector-svg'));
    assert.ok(cssContent.includes('.illustration-reed-solomon'));
});
