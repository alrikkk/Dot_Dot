'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrandLogo from './BrandLogo';

export default function Footer() {
    const footerRef = useRef(null);
    const wordmarkWrapRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const footerEl = footerRef.current;
        const wordmarkWrap = wordmarkWrapRef.current;
        if (!footerEl || !wordmarkWrap) return;

        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const canHover = !window.matchMedia('(hover: none)').matches && window.innerWidth >= 768;

        const ctx = gsap.context(() => {
            // ─── 1. Scroll-Triggered Entrance ─────────────────────────────
            gsap.fromTo(
                '.footer-top',
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: footerEl,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Giant Wordmark Entrance (Reveals and settles; stops once settled)
            gsap.fromTo(
                '.footer-big-text',
                { opacity: 0, y: 35 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: isReducedMotion ? 'power1.out' : 'power2.out',
                    scrollTrigger: {
                        trigger: '.footer-wordmark-wrap',
                        start: 'top 92%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // 4 QR-inspired Objects Entrance with subtle stagger
            const qrObjects = wordmarkWrap.querySelectorAll('[data-qr-obj]');
            const defaultRotations = [-8, 6, -10, 8];

            if (!isReducedMotion) {
                gsap.set(qrObjects, { scale: 0, opacity: 0 });
                gsap.to(qrObjects, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.7,
                    ease: 'back.out(1.6)',
                    stagger: 0.08,
                    scrollTrigger: {
                        trigger: '.footer-wordmark-wrap',
                        start: 'top 88%',
                        toggleActions: 'play none none reverse',
                    },
                });
            } else {
                gsap.set(qrObjects, { scale: 1, opacity: 1 });
            }

            // ─── 2. Cursor Proximity Repulsion on QR Objects ──────────────
            if (canHover && !isReducedMotion) {
                const handleMouseMove = (e) => {
                    const wrapRect = wordmarkWrap.getBoundingClientRect();
                    const mouseX = e.clientX;
                    const mouseY = e.clientY;

                    // Active buffer area around wordmark
                    const buffer = 120;
                    if (
                        mouseX < wrapRect.left - buffer ||
                        mouseX > wrapRect.right + buffer ||
                        mouseY < wrapRect.top - buffer ||
                        mouseY > wrapRect.bottom + buffer
                    ) {
                        qrObjects.forEach((el, idx) => {
                            gsap.to(el, {
                                x: 0,
                                y: 0,
                                rotation: defaultRotations[idx % defaultRotations.length],
                                duration: 0.8,
                                ease: 'power3.out',
                                overwrite: 'auto',
                            });
                        });
                        return;
                    }

                    qrObjects.forEach((el, idx) => {
                        const rect = el.getBoundingClientRect();
                        const objCenterX = rect.left + rect.width / 2;
                        const objCenterY = rect.top + rect.height / 2;

                        const deltaX = objCenterX - mouseX;
                        const deltaY = objCenterY - mouseY;
                        const distance = Math.hypot(deltaX, deltaY);

                        const threshold = 170; // Proximity push radius
                        if (distance < threshold) {
                            const factor = 1 - distance / threshold;
                            const repelStrength = 38 * factor;
                            const angle = Math.atan2(deltaY, deltaX);
                            const pushX = Math.cos(angle) * repelStrength;
                            const pushY = Math.sin(angle) * repelStrength;
                            const pushRot = defaultRotations[idx % defaultRotations.length] + (deltaX > 0 ? 10 : -10) * factor;

                            gsap.to(el, {
                                x: pushX,
                                y: pushY,
                                rotation: pushRot,
                                duration: 0.45,
                                ease: 'power2.out',
                                overwrite: 'auto',
                            });
                        } else {
                            gsap.to(el, {
                                x: 0,
                                y: 0,
                                rotation: defaultRotations[idx % defaultRotations.length],
                                duration: 0.7,
                                ease: 'power3.out',
                                overwrite: 'auto',
                            });
                        }
                    });
                };

                const handleMouseLeaveWrap = () => {
                    qrObjects.forEach((el, idx) => {
                        gsap.to(el, {
                            x: 0,
                            y: 0,
                            rotation: defaultRotations[idx % defaultRotations.length],
                            duration: 0.9,
                            ease: 'elastic.out(1, 0.4)',
                            overwrite: 'auto',
                        });
                    });
                };

                window.addEventListener('mousemove', handleMouseMove, { passive: true });
                wordmarkWrap.addEventListener('mouseleave', handleMouseLeaveWrap);

                // ─── 3. QR Scan Line Connection ───────────────────────────
                let isScanning = false;
                const scanLine = wordmarkWrap.querySelector('.footer-scan-line');

                const triggerScan = () => {
                    if (isScanning || !scanLine) return;
                    isScanning = true;

                    gsap.timeline({
                        onComplete: () => {
                            isScanning = false;
                        },
                    })
                        .set(scanLine, { top: '8%', opacity: 0 })
                        .to(scanLine, { opacity: 0.85, duration: 0.15, ease: 'power1.out' })
                        .to(scanLine, { top: '88%', duration: 0.75, ease: 'power2.inOut' })
                        .to(scanLine, { opacity: 0, duration: 0.25, ease: 'power1.in' });
                };

                wordmarkWrap.addEventListener('mouseenter', triggerScan);

                // ─── 4. Wordmark Subtle Elastic Response ───────────────────
                const words = wordmarkWrap.querySelectorAll('.brand-logo__word, .brand-logo__dots');
                const wordCleanups = [];

                words.forEach((word) => {
                    const onEnter = () => {
                        const isFirst = word.classList.contains('brand-logo__word--first');
                        gsap.to(word, {
                            y: -4,
                            rotation: isFirst ? -0.6 : 0.6,
                            duration: 0.35,
                            ease: 'power2.out',
                            overwrite: 'auto',
                        });
                    };
                    const onLeave = () => {
                        gsap.to(word, {
                            y: 0,
                            rotation: 0,
                            duration: 0.6,
                            ease: 'back.out(2)',
                            overwrite: 'auto',
                        });
                    };
                    word.addEventListener('mouseenter', onEnter);
                    word.addEventListener('mouseleave', onLeave);
                    wordCleanups.push(() => {
                        word.removeEventListener('mouseenter', onEnter);
                        word.removeEventListener('mouseleave', onLeave);
                    });
                });

                // ─── 5. Signature Period Micro-Interaction ────────────────
                const period = wordmarkWrap.querySelector('.brand-logo__period');
                let periodCleanup = null;

                if (period) {
                    const onPeriodEnter = () => {
                        gsap.to(period, {
                            scale: 1.35,
                            y: -5,
                            color: 'var(--color-vermilion)',
                            duration: 0.2,
                            ease: 'back.out(2.5)',
                            overwrite: 'auto',
                        });
                    };
                    const onPeriodLeave = () => {
                        gsap.to(period, {
                            scale: 1,
                            y: 0,
                            color: 'inherit',
                            duration: 0.65,
                            ease: 'elastic.out(1.2, 0.35)',
                            overwrite: 'auto',
                        });
                    };
                    period.addEventListener('mouseenter', onPeriodEnter);
                    period.addEventListener('mouseleave', onPeriodLeave);
                    periodCleanup = () => {
                        period.removeEventListener('mouseenter', onPeriodEnter);
                        period.removeEventListener('mouseleave', onPeriodLeave);
                    };
                }

                // Register event listeners cleanup in context
                return () => {
                    window.removeEventListener('mousemove', handleMouseMove);
                    wordmarkWrap.removeEventListener('mouseleave', handleMouseLeaveWrap);
                    wordmarkWrap.removeEventListener('mouseenter', triggerScan);
                    wordCleanups.forEach((fn) => fn());
                    if (periodCleanup) periodCleanup();
                };
            }
        }, footerEl);

        return () => ctx.revert();
    }, []);

    const scrollToTop = (e) => {
        if (e && (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)) {
            return;
        }
        if (e) e.preventDefault();
        window.dispatchEvent(new CustomEvent('dotdot:paint-transition-top'));
    };

    return (
        <footer className="main-footer" ref={footerRef}>
            <div className="footer-inner">
                {/* 3-Column Editorial Grid */}
                <div className="footer-top">
                    {/* Left: Privacy / Integrity */}
                    <div className="footer-column footer-column--privacy">
                        <span className="footer-badge">privacy / integrity</span>
                        <h3 className="footer-heading">
                            100% client-side.<br />
                            Your QR data stays in the browser.
                        </h3>
                    </div>

                    {/* Middle: Navigation */}
                    <div className="footer-column footer-column--nav">
                        <span className="footer-badge">navigation</span>
                        <nav className="footer-nav-list" aria-label="Footer Navigation">
                            <a href="#studio" className="footer-nav-link">→ Create QR</a>
                            <a href="#types" className="footer-nav-link">→ Supported Types</a>
                            <a href="#principles" className="footer-nav-link">→ Customize</a>
                            <a href="#showcase" className="footer-nav-link">→ Showcase</a>
                        </nav>
                    </div>

                    {/* Right: Studio & Return to Top */}
                    <div className="footer-column footer-column--studio">
                        <span className="footer-badge">dot dot / studio</span>
                        <div className="footer-studio-info">
                            <a href="mailto:studio@dotdot.design" className="footer-email">
                                studio@dotdot.design
                            </a>
                        </div>
                        <a href="#hero" onClick={scrollToTop} className="footer-return-top" aria-label="Return to top">
                            RETURN TO TOP ↑
                        </a>
                    </div>
                </div>

                {/* Giant DOT DOT. Interactive Wordmark Area */}
                <div className="footer-bottom">
                    <div className="footer-wordmark-wrap" ref={wordmarkWrapRef}>
                        {/* Optical Laser Scan Line */}
                        <div className="footer-scan-line" aria-hidden="true" />

                        {/* 4 QR-Inspired Geometric Objects */}
                        {/* 1. Finder Corner Bracket */}
                        <div
                            className="footer-qr-obj qr-obj--finder"
                            data-qr-obj
                            aria-hidden="true"
                            title="QR Finder Pattern Bracket"
                        >
                            <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                                <rect x="2" y="2" width="38" height="38" rx="8" stroke="#f5f5f0" strokeWidth="2.5" />
                                <rect x="9" y="9" width="24" height="24" rx="4" fill="#0d0d10" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                                <rect x="15" y="15" width="12" height="12" rx="3" fill="var(--color-vermilion)" />
                            </svg>
                        </div>

                        {/* 2. Module Cluster */}
                        <div
                            className="footer-qr-obj qr-obj--cluster"
                            data-qr-obj
                            aria-hidden="true"
                            title="QR Module Matrix Cluster"
                        >
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                <rect x="2" y="2" width="14" height="14" rx="3" fill="#f5f5f0" />
                                <rect x="20" y="2" width="14" height="14" rx="3" fill="#f5f5f0" opacity="0.6" />
                                <rect x="2" y="20" width="14" height="14" rx="3" fill="var(--color-vermilion)" />
                                <rect x="20" y="20" width="14" height="14" rx="3" fill="#f5f5f0" opacity="0.25" />
                            </svg>
                        </div>

                        {/* 3. Dual Bit Motif */}
                        <div
                            className="footer-qr-obj qr-obj--dots"
                            data-qr-obj
                            aria-hidden="true"
                            title="Dual Bit Module"
                        >
                            <span className="qr-chip qr-chip--cream" />
                            <span className="qr-chip qr-chip--orange" />
                        </div>

                        {/* 4. Optical Reticle */}
                        <div
                            className="footer-qr-obj qr-obj--reticle"
                            data-qr-obj
                            aria-hidden="true"
                            title="Optical Alignment Reticle"
                        >
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#f5f5f0" strokeWidth="2">
                                <path d="M2 10V2H10" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M24 2H32V10" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M32 24V32H24" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10 32H2V24" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="17" cy="17" r="2.5" fill="var(--color-vermilion)" stroke="none" />
                            </svg>
                        </div>

                        {/* Giant Real HTML Wordmark */}
                        <div className="footer-big-text">
                            <BrandLogo size="footer" onClick={scrollToTop} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
