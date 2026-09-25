'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(InertiaPlugin, ScrollTrigger);

export default function MotionCards() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Inertia on cards
            const cards = document.querySelectorAll('.motion-card__card');
            cards.forEach((card) => {
                let lastX = 0;
                let lastY = 0;
                let speedX = 0;
                let speedY = 0;

                const startRotation = gsap.getProperty(card, 'rotation');
                const startX = gsap.getProperty(card, 'x');
                const startY = gsap.getProperty(card, 'y');

                const onMove = (e) => {
                    speedX = e.clientX - lastX;
                    speedY = e.clientY - lastY;
                    lastX = e.clientX;
                    lastY = e.clientY;
                };

                const onEnter = (e) => {
                    speedX = 0;
                    speedY = 0;
                    lastX = e.clientX;
                    lastY = e.clientY;
                };

                const onLeave = () => {
                    gsap.to(card, {
                        inertia: {
                            x: { velocity: speedX * 20, end: startX },
                            y: { velocity: speedY * 20, end: startY },
                            rotation: { velocity: speedX * 1.5, end: startRotation },
                        },
                    });
                };

                card.addEventListener('mousemove', onMove);
                card.addEventListener('mouseenter', onEnter);
                card.addEventListener('mouseleave', onLeave);
            });

            // Inertia on floating labels
            const labels = document.querySelectorAll('.motion-card__floating-label');
            labels.forEach((label) => {
                let lastX = 0;
                let lastY = 0;
                let speedX = 0;
                let speedY = 0;

                const startRotation = gsap.getProperty(label, 'rotation');
                const startX = gsap.getProperty(label, 'x');
                const startY = gsap.getProperty(label, 'y');

                const onMove = (e) => {
                    speedX = e.clientX - lastX;
                    speedY = e.clientY - lastY;
                    lastX = e.clientX;
                    lastY = e.clientY;
                };

                const onEnter = (e) => {
                    speedX = 0;
                    speedY = 0;
                    lastX = e.clientX;
                    lastY = e.clientY;
                };

                const onLeave = () => {
                    gsap.to(label, {
                        inertia: {
                            x: { velocity: speedX * 25, end: startX },
                            y: { velocity: speedY * 25, end: startY },
                            rotation: { velocity: speedX * 2, end: startRotation },
                        },
                    });
                };

                label.addEventListener('mousemove', onMove);
                label.addEventListener('mouseenter', onEnter);
                label.addEventListener('mouseleave', onLeave);
            });

            // Entry Animations: Underline Draw
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
            });

            const path = document.querySelector('.motion-card__underline-path');
            if (path) {
                const length = path.getTotalLength();
                gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
                tl.to(path, {
                    strokeDashoffset: 0,
                    duration: 1.2,
                    ease: 'power2.out',
                }, 0.2);
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="motion-card-section" id="principles">
            {/* ─── Part 1: Heading ─── */}
            <div className="motion-card__heading">
                <h2 className="motion-card__title">built for the</h2>
                <p className="motion-card__subtitle">
                    physical world.
                    <span className="motion-card__sticker motion-card__sticker--top">
                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: 'var(--color-vermilion)',
                            color: '#fff',
                            fontWeight: 900,
                            fontSize: '0.75rem',
                            padding: '4px 10px',
                            borderRadius: '999px',
                            boxShadow: '2px 2px 0px #000'
                        }}>
                            ● ● TACTILE
                        </span>
                    </span>
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 634 28" fill="none" className="motion-card__underline-svg">
                    <path
                        className="motion-card__underline-path"
                        d="M2 26C41.0237 23.1556 79.9927 19.9419 118.634 15.5521C169.106 9.98633 227.314 2.42393 275.206 2C280.46 2.57436 264.768 4.99488 262.462 5.55556C257.837 6.43078 252.529 7.47009 247.317 8.59146C239.594 10.3556 212.496 15.8393 226.932 19.8051C239.594 22.6359 263.663 21.9521 280.978 21.3504C314.817 19.9829 349.311 16.7419 383.204 14.7863C465.931 9.5077 549.191 10.547 632 14.1436"
                        stroke="var(--color-dark)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* ─── Part 2: Interactive Fling Cards Area ─── */}
            <div className="motion-card__cards-area">
                <div className="motion-card__blob">
                    <svg viewBox="0 0 580 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="motion-card__blob-svg">
                        <path d="M120 40C240 -20 480 10 540 140C600 270 520 420 400 470C280 520 80 480 30 360C-20 240 0 100 120 40Z" fill="var(--color-lightblue)" opacity="0.4" />
                    </svg>
                </div>

                {/* 4 Bespoke Editorial QR Cards */}
                <div ref={containerRef} className="motion-card__cards">
                    {/* Card 1: Create */}
                    <div className="motion-card__card motion-card__card--1">
                        <div className="motion-card__card-image" style={{ background: '#0e0e11', color: '#fff', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left', borderRadius: '20px', border: '2px solid #000' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--color-vermilion)', fontWeight: 800 }}>01 / CREATE</span>
                                <span style={{ fontSize: '1.2rem' }}>● ●</span>
                            </div>
                            <div style={{ margin: 'auto 0' }}>
                                <h3 style={{ fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, letterSpacing: '-0.04em' }}>
                                    HIGH DENSITY
                                </h3>
                                <p style={{ fontSize: '0.88rem', opacity: 0.7, marginTop: '0.5rem' }}>
                                    Optimized payload encoding. Minimal noise, razor-sharp modules.
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '6px' }}>
                                <span style={{ width: '8px', height: '8px', background: 'var(--color-vermilion)', borderRadius: '2px' }} />
                                <span style={{ width: '8px', height: '8px', background: '#fff', borderRadius: '2px' }} />
                                <span style={{ width: '8px', height: '8px', background: 'var(--color-cobalt)', borderRadius: '2px' }} />
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Customize */}
                    <div className="motion-card__card motion-card__card--2">
                        <div className="motion-card__card-image" style={{ background: 'var(--color-vermilion)', color: '#fff', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left', borderRadius: '20px', border: '2px solid #000' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#000', fontWeight: 900 }}>02 / SHAPE</span>
                                <span style={{ fontSize: '1.2rem' }}>■ ■</span>
                            </div>
                            <div style={{ margin: 'auto 0' }}>
                                <h3 style={{ fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, letterSpacing: '-0.04em', color: '#000' }}>
                                    CUSTOM PALETTE
                                </h3>
                                <p style={{ fontSize: '0.88rem', color: 'rgba(0,0,0,0.8)', marginTop: '0.5rem', fontWeight: 600 }}>
                                    Tailored inks, curated papers, adjustable quiet zones.
                                </p>
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', background: '#000', color: '#fff', padding: '3px 8px', borderRadius: '6px', width: 'fit-content' }}>
                                OPTICAL CONTRAST
                            </span>
                        </div>
                    </div>

                    {/* Card 3: Scan */}
                    <div className="motion-card__card motion-card__card--3">
                        <div className="motion-card__card-image" style={{ background: '#f4eee2', color: '#121214', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left', borderRadius: '20px', border: '2px solid #000' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--color-cobalt)', fontWeight: 800 }}>03 / SCAN</span>
                                <span style={{ fontSize: '1.2rem' }}>⊕</span>
                            </div>
                            <div style={{ margin: 'auto 0' }}>
                                <h3 style={{ fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, letterSpacing: '-0.04em' }}>
                                    ERROR RECOVERY
                                </h3>
                                <p style={{ fontSize: '0.88rem', opacity: 0.75, marginTop: '0.5rem' }}>
                                    L, M, Q, H Reed-Solomon resilience. Tested for physical wear and texture.
                                </p>
                            </div>
                            <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 800 }}>
                                L7% • M15% • Q25% • H30%
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Export */}
                    <div className="motion-card__card motion-card__card--4">
                        <div className="motion-card__card-image" style={{ background: 'var(--color-cobalt)', color: '#fff', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left', borderRadius: '20px', border: '2px solid #000' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--color-lime)', fontWeight: 800 }}>04 / EXPORT</span>
                                <span style={{ fontSize: '1.2rem' }}>↓</span>
                            </div>
                            <div style={{ margin: 'auto 0' }}>
                                <h3 style={{ fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, letterSpacing: '-0.04em' }}>
                                    VECTOR PURE
                                </h3>
                                <p style={{ fontSize: '0.88rem', opacity: 0.85, marginTop: '0.5rem' }}>
                                    Scalable SVG & high-res raster PNG. Production-ready for billboard or print.
                                </p>
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', background: 'var(--color-lime)', color: '#000', padding: '4px 8px', borderRadius: '6px', width: 'fit-content' }}>
                                INSTANT DOWNLOAD
                            </span>
                        </div>
                    </div>
                </div>

                {/* Floating Inertia Labels */}
                <div ref={containerRef} className="motion-card__floating-labels">
                    <div className="motion-card__floating-label motion-card__floating-label--pink">
                        <p className="motion-card__floating-text">scannable everywhere</p>
                    </div>
                    <div className="motion-card__floating-label motion-card__floating-label--orange">
                        <p className="motion-card__floating-text">zero junk trackers</p>
                    </div>
                    <div className="motion-card__floating-label motion-card__floating-label--red">
                        <p className="motion-card__floating-text">pure vector svg</p>
                    </div>
                </div>
            </div>

            {/* ─── Part 3: Bottom Narrative ─── */}
            <div className="motion-card__footer-text">
                <p className="motion-card__description">
                    Every code generated in DOT DOT. runs entirely inside your client browser.
                    We don’t redirect your traffic through third-party servers.
                    We don’t inject cookies. Your mark connects your audience directly to your destination.
                </p>
            </div>
        </section>
    );
}
