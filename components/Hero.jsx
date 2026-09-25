'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import BrandLogo from './BrandLogo';
import HeroVideoCard from './HeroVideoCard';
import { generateQrDataUrl } from '@/lib/qr/generator.js';

export default function Hero() {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const qrObjectRef = useRef(null);

    const heroVideoRef = useRef(null);
    const [heroQrUrl, setHeroQrUrl] = useState('');
    const [isScanning, setIsScanning] = useState(true);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const handleQrToggle = () => {
        if (isVideoOpen) {
            heroVideoRef.current?.close();
        } else {
            setIsVideoOpen(true);
        }
    };

    // Generate real, valid scannable QR for hero
    useEffect(() => {
        let isMounted = true;
        generateQrDataUrl('https://www.youtube.com/watch?v=4Gm736MpMwQ&t=433s', {
            errorCorrectionLevel: 'H',
            margin: 1,
            color: { dark: '#ffffff', light: '#0e0e11' },
            width: 512,
        }).then((url) => {
            if (isMounted) setHeroQrUrl(url);
        });
        return () => { isMounted = false; };
    }, []);

    // Synchronize headline split-color gradient with physical scroll boundary
    useEffect(() => {
        const titleEl = titleRef.current;
        if (!titleEl) return;

        const updateSplit = () => {
            const scrollY = window.scrollY || window.pageYOffset || 0;
            // The black/cream boundary crosses the hero headline as user scrolls from 10px to 280px
            const startScroll = 10;
            const endScroll = 280;
            const progress = Math.min(1, Math.max(0, (scrollY - startScroll) / (endScroll - startScroll)));
            // Split percent goes from 100% (all white) down to 0% (all soft charcoal #3A3835)
            const splitPercent = (1 - progress) * 100;
            titleEl.style.setProperty('--split-percent', `${splitPercent.toFixed(2)}%`);
        };

        window.addEventListener('scroll', updateSplit, { passive: true });
        updateSplit();

        let lenisUnsub;
        if (window.__lenis) {
            window.__lenis.on('scroll', updateSplit);
            lenisUnsub = () => window.__lenis.off('scroll', updateSplit);
        }

        return () => {
            window.removeEventListener('scroll', updateSplit);
            if (lenisUnsub) lenisUnsub();
        };
    }, []);

    // 3D perspective tilt on the central QR object based on cursor position
    const handleHeroMouseMove = (e) => {
        const qrEl = qrObjectRef.current;
        if (!qrEl) return;
        const rect = heroRef.current.getBoundingClientRect();
        const xPercent = (e.clientX - rect.left) / rect.width - 0.5;
        const yPercent = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(qrEl, {
            rotationY: xPercent * 18,
            rotationX: -yPercent * 18,
            x: xPercent * 25,
            y: yPercent * 25,
            duration: 0.8,
            ease: 'power2.out',
        });
    };

    const handleHeroMouseLeave = () => {
        const qrEl = qrObjectRef.current;
        if (!qrEl) return;
        gsap.to(qrEl, {
            rotationY: 0,
            rotationX: 0,
            x: 0,
            y: 0,
            duration: 1.2,
            ease: 'elastic.out(1, 0.4)',
        });
    };

    const scrollToStudio = (e) => {
        e.preventDefault();
        const target = document.getElementById('studio');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToTypes = (e) => {
        e.preventDefault();
        const target = document.getElementById('types');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            className="dotdot-hero"
            ref={heroRef}
            onMouseMove={handleHeroMouseMove}
            onMouseLeave={handleHeroMouseLeave}
            id="hero"
        >


            {/* Geometric Dot Grid Background */}
            <div className="hero-grid-bg" aria-hidden="true">
                <div className="hero-grid-dots" />
            </div>

            {/* Interactive 3D Central QR Object */}
            <div className="hero-centerpiece" ref={qrObjectRef}>
                <div
                    className="hero-qr-frame"
                    onClick={handleQrToggle}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleQrToggle()}
                    aria-label="Click to toggle walkthrough video"
                    title="Click to toggle walkthrough video"
                >
                    {/* Finder pattern markers */}
                    <div className="hero-finder hero-finder--tl" />
                    <div className="hero-finder hero-finder--tr" />
                    <div className="hero-finder hero-finder--bl" />

                    {/* Scanning Laser Line */}
                    {isScanning && <div className="hero-laser-line" />}

                    {/* Scannable QR Image */}
                    {heroQrUrl ? (
                        <img
                            src={heroQrUrl}
                            alt="DOT DOT. Scannable Prototype QR"
                            className="hero-qr-img"
                        />
                    ) : (
                        <div className="hero-qr-fallback" />
                    )}

                    {/* Central Brand Badge on QR */}
                    <div className="hero-qr-badge">
                        <BrandLogo size="sm" showWordmark={false} />
                    </div>
                </div>
            </div>

            {/* Playful Video Walkthrough Card */}
            <HeroVideoCard
                ref={heroVideoRef}
                isOpen={isVideoOpen}
                onClose={() => setIsVideoOpen(false)}
            />

            {/* Bottom Gradient Fade */}
            <div className="dotdot-hero__fade" />

            {/* Giant Display Headline */}
            <div className="home-header__title hero-title-wrapper">
                <h1 className="dotdot-hero__title" ref={titleRef}>
                    <span className="dotdot-hero__word">DOT </span>
                    <span className="dotdot-hero__word">DOT. </span>
                    <div style={{ flexBasis: '100%', height: 0 }} />
                    <span className="dotdot-hero__word is--relative">
                        <span>MAKE </span>
                    </span>
                    <span className="dotdot-hero__word">IT </span>
                    <span className="dotdot-hero__word is--relative">
                        <em>SCANNABLE.</em>
                        {/* Handcrafted animated underline SVG */}
                        <svg
                            className="home-header__title-line-svg"
                            viewBox="0 0 450 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M3 14C120 4 330 4 447 11"
                                stroke="var(--color-vermilion)"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                        </svg>
                    </span>
                </h1>
            </div>

            {/* Bottom Action CTAs */}
            <div className="hero-cta-container">
                <a
                    href="#studio"
                    onClick={scrollToStudio}
                    className="hero-cta-btn hero-cta-btn--primary"
                >
                    <span>CREATE QR →</span>
                </a>
                <a
                    href="#types"
                    onClick={scrollToTypes}
                    className="hero-cta-btn hero-cta-btn--secondary"
                >
                    <span>EXPLORE TYPES ↓</span>
                </a>
            </div>

            {/* Bottom Left Controls: Laser sweep toggle & Fullscreen */}
            <div className="dotdot-hero__controls hero-bottom-controls" onClick={(e) => e.stopPropagation()}>
                <button
                    type="button"
                    className="dotdot-hero__btn"
                    onClick={() => setIsScanning(!isScanning)}
                    aria-label={isScanning ? 'Pause Laser' : 'Start Laser'}
                    title="Toggle laser sweep"
                >
                    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" strokeDasharray={isScanning ? 'none' : '3 3'} />
                        <circle cx="12" cy="12" r="3" fill="currentColor" />
                    </svg>
                </button>
            </div>
        </section>
    );
}
