import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Studio Dropdown Visibility Classes and CSS', () => {
    const cssPath = path.resolve('app/styles/navbar.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // Confirm .is-studio-open rules hide both the logo-work-text and nav-bar__work-blob-svg
    assert.ok(cssContent.includes('.logo-work-text.is-studio-open'));
    assert.ok(cssContent.includes('.nav-bar__work-blob-svg.is-studio-open'));
    assert.ok(cssContent.includes('opacity: 0 !important;'));
    assert.ok(cssContent.includes('visibility: hidden !important;'));
    assert.ok(cssContent.includes('pointer-events: none !important;'));

    // Confirm transition exists for smooth synchronization
    assert.ok(cssContent.includes('transition: opacity 0.25s'));

    // Confirm Navbar.jsx connects studioOpen state
    const navbarPath = path.resolve('components/Navbar.jsx');
    const navbarContent = fs.readFileSync(navbarPath, 'utf8');

    assert.ok(navbarContent.includes('const [studioOpen, setStudioOpen] = useState(false);'));
    assert.ok(navbarContent.includes('setStudioOpen(true)'));
    assert.ok(navbarContent.includes('setStudioOpen(false)'));
    assert.ok(navbarContent.includes('${studioOpen ? \'is-studio-open\' : \'\'}'));
});

test('Brand Control Paint Transition to Top Interaction', () => {
    const navbarPath = path.resolve('components/Navbar.jsx');
    const navbarContent = fs.readFileSync(navbarPath, 'utf8');

    // Confirm Navbar brand link triggers the paint transition to top
    assert.ok(navbarContent.includes('const handleBrandClick = (e) => {'));
    assert.ok(navbarContent.includes("window.dispatchEvent(new CustomEvent('dotdot:paint-transition-top'));"));
    assert.ok(navbarContent.includes('onClick={handleBrandClick}'));

    // Confirm TransitionScribble handles both initial load and click-to-top paint transition
    const transitionPath = path.resolve('components/TransitionScribble.jsx');
    const transitionContent = fs.readFileSync(transitionPath, 'utf8');

    // Strict Mode / Initial Load guard
    assert.ok(transitionContent.includes('let hasPlayedEntrance = false;'));
    assert.ok(transitionContent.includes('if (!hasPlayedEntrance) {'));
    assert.ok(transitionContent.includes('hasPlayedEntrance = true;'));

    // Hidden instant reposition at durIn while paint covers viewport
    assert.ok(transitionContent.includes('activeLenis.scrollTo(0, { immediate: true })'));
    assert.ok(transitionContent.includes("window.scrollTo({ top: 0, behavior: 'instant' })"));

    // Event listener and brand link click listener
    assert.ok(transitionContent.includes("window.addEventListener('dotdot:paint-transition-top'"));
    assert.ok(transitionContent.includes("querySelectorAll('.navbar-brand-link, .brand-logo')"));

    // Confirm Footer also dispatches paint-transition-top on click
    const footerPath = path.resolve('components/Footer.jsx');
    const footerContent = fs.readFileSync(footerPath, 'utf8');
    assert.ok(footerContent.includes("window.dispatchEvent(new CustomEvent('dotdot:paint-transition-top'));"));
    assert.ok(!footerContent.includes("lenis.scrollTo(0, { duration: 1.5 })"));
});
