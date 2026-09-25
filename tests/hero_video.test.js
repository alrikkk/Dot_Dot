import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Hero QR Click Video Walkthrough Interaction and Drag System', () => {
    // 1. Confirm video asset is present locally in public/videos
    const videoPath = path.resolve('public/videos/dot-dot-demo.mp4');
    assert.ok(fs.existsSync(videoPath), 'Video file public/videos/dot-dot-demo.mp4 must exist');
    const stats = fs.statSync(videoPath);
    assert.ok(stats.size > 1000000, 'Video file must be non-empty and valid media');

    // 2. Confirm Hero.jsx has YouTube QR URL and toggle handling on hero-qr-frame
    const heroPath = path.resolve('components/Hero.jsx');
    const heroContent = fs.readFileSync(heroPath, 'utf8');

    assert.ok(heroContent.includes('import HeroVideoCard from \'./HeroVideoCard\';'));
    assert.ok(heroContent.includes('const [isVideoOpen, setIsVideoOpen] = useState(false);'));
    assert.ok(heroContent.includes('https://www.youtube.com/watch?v=4Gm736MpMwQ&t=433s'), 'Hero QR must encode the specified YouTube URL');
    assert.ok(heroContent.includes('handleQrToggle'), 'Hero QR frame must use handleQrToggle');
    assert.ok(heroContent.includes('heroVideoRef.current?.close()'), 'Hero QR frame must trigger close on heroVideoRef when open');
    assert.ok(heroContent.includes('<HeroVideoCard'));
    assert.ok(heroContent.includes('ref={heroVideoRef}'));

    // 3. Confirm HeroVideoCard has video element, controls, muted autoplay, drag handlers, and close handling
    const cardPath = path.resolve('components/HeroVideoCard.jsx');
    const cardContent = fs.readFileSync(cardPath, 'utf8');

    assert.ok(cardContent.includes('src="/videos/dot-dot-demo.mp4"'));
    assert.ok(cardContent.includes('controls'));
    assert.ok(cardContent.includes('muted'));
    assert.ok(cardContent.includes('playsInline'));
    assert.ok(cardContent.includes('preload="none"'), 'Video must use preload="none" for optimal initial load');
    assert.ok(cardContent.includes('video.pause();'));
    assert.ok(cardContent.includes('video.currentTime = 0;'));
    assert.ok(cardContent.includes("e.key === 'Escape'"));
    assert.ok(cardContent.includes('prefers-reduced-motion'));
    assert.ok(cardContent.includes('useImperativeHandle'));
    assert.ok(cardContent.includes('onPointerDown'));
    assert.ok(cardContent.includes('onPointerMove'));
    assert.ok(cardContent.includes('onPointerUp'));

    // 4. Confirm CSS styling exists and supports fixed floating and draggable bubble
    const cssPath = path.resolve('app/styles/hero-video.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    assert.ok(cssContent.includes('.hero-video-card'));
    assert.ok(cssContent.includes('.hero-video-screen'));
    assert.ok(cssContent.includes('.hero-video-close-btn'));
    assert.ok(cssContent.includes('cursor: grab;'));
    assert.ok(cssContent.includes('var(--color-vermilion)'));
});
