'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import BrandLogo from './BrandLogo';

function initWiggle(element, intensity = 4) {
    const target = element.querySelector('[data-wiggle-target]') || element;
    gsap.set(target, { transformOrigin: 'center center' });
    let tween;
    const onEnter = () => {
        tween = gsap.to(target, { rotation: intensity, duration: 0.17, repeat: -1, yoyo: true, ease: 'steps(1)' });
    };
    const onLeave = () => {
        if (tween) {
            tween.kill();
            gsap.to(target, { rotation: 0, duration: 0.3, ease: 'power2.out' });
        }
    };
    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    return () => {
        element.removeEventListener('mouseenter', onEnter);
        element.removeEventListener('mouseleave', onLeave);
    };
}

export default function Navbar() {
    const [studioOpen, setStudioOpen] = useState(false);

    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        const studioSection = document.querySelector('#studio');
        const footerEl = document.querySelector('.main-footer');

        // Continuous scroll-linked transition: #F5F1EA (hero) -> #3A3835 (cream section)
        const updateNavbarColor = () => {
            if (!navbar) return;
            const studioRect = studioSection ? studioSection.getBoundingClientRect() : null;
            const footerRect = footerEl ? footerEl.getBoundingClientRect() : null;
            const navbarHeight = navbar.offsetHeight || 75;

            // Transition window as cream studio section boundary approaches and crosses under the navbar
            const startY = navbarHeight + 160;
            const endY = navbarHeight;

            let progress = 0; // 0 = dark hero (light #F5F1EA), 1 = cream section (warm charcoal #3A3835)

            if (studioRect) {
                if (studioRect.top >= startY) {
                    progress = 0;
                } else if (studioRect.top <= endY) {
                    progress = 1;
                } else {
                    progress = (startY - studioRect.top) / (startY - endY);
                }
            }

            // Dark footer transition back to light text
            if (footerRect) {
                const footerStartY = navbarHeight + 160;
                const footerEndY = navbarHeight;
                if (footerRect.top < footerStartY) {
                    const footerProgress = Math.min(1, Math.max(0, (footerStartY - footerRect.top) / (footerStartY - footerEndY)));
                    progress = Math.max(0, progress * (1 - footerProgress));
                }
            }

            // Interpolate RGB: #F5F1EA (245, 241, 234) -> #3A3835 (58, 56, 53)
            const r = Math.round(245 + (58 - 245) * progress);
            const g = Math.round(241 + (56 - 241) * progress);
            const b = Math.round(234 + (53 - 234) * progress);

            navbar.style.setProperty('--nav-link-color', `rgb(${r}, ${g}, ${b})`);

            if (progress > 0.5) {
                navbar.classList.add('on-light');
                navbar.classList.remove('on-dark');
            } else {
                navbar.classList.add('on-dark');
                navbar.classList.remove('on-light');
            }
        };

        window.addEventListener('scroll', updateNavbarColor, { passive: true });
        updateNavbarColor();

        let lenisUnsub;
        if (window.__lenis) {
            window.__lenis.on('scroll', updateNavbarColor);
            lenisUnsub = () => window.__lenis.off('scroll', updateNavbarColor);
        }

        // Logo wiggle
        const cleanups = [];
        const logoTarget = document.querySelector('.navbar-brand-link');
        if (logoTarget) cleanups.push(initWiggle(logoTarget, 4));

        // Popout overlay logic
        const overlay = document.querySelector('.nav-overlay');
        const showOverlay = () => {
            if (overlay) {
                gsap.set(overlay, { visibility: 'visible' });
                gsap.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' });
            }
        };
        const hideOverlay = () => {
            if (overlay) {
                gsap.to(overlay, {
                    opacity: 0,
                    duration: 0.25,
                    ease: 'power2.in',
                    onComplete: () => gsap.set(overlay, { visibility: 'hidden' })
                });
            }
        };

        // ─── Left Popout (Studio Types) ───
        const navLeft = document.querySelector('.nav-left');
        const leftBox = document.querySelector('.nav-work-box');
        const leftIcon = document.querySelector('.nav-bar__work-blob-svg');
        const logoText = document.querySelector('.logo-work-text');
        const logoContainer = document.querySelector('.logo-work-container');

        if (navLeft && leftBox && leftIcon) {
            const leftInner = leftBox.querySelector('.nav-popout-inner');
            const items = leftInner ? Array.from(leftInner.children) : [];

            gsap.set(leftBox, { visibility: 'visible', scale: 1, opacity: 1 });
            const boxRect = leftBox.getBoundingClientRect();
            const iconRect = leftIcon.getBoundingClientRect();
            const originX = (iconRect.left + iconRect.width / 2) - boxRect.left;
            const originY = (iconRect.top + iconRect.height / 2) - boxRect.top;

            gsap.set(leftBox, {
                visibility: 'hidden',
                scale: 0,
                opacity: 0,
                transformOrigin: `${originX}px ${originY}px`
            });
            gsap.set(items, { y: 10, opacity: 0 });

            const onEnterLeft = () => {
                setStudioOpen(true);
                if (leftIcon) leftIcon.classList.add('is-studio-open');
                if (logoText) logoText.classList.add('is-studio-open');
                if (logoContainer) logoContainer.classList.add('is-studio-open');
                gsap.killTweensOf([leftBox, items, leftIcon]);
                showOverlay();
                gsap.to(leftIcon, { rotation: '+=180', duration: 0.5, ease: 'power2.inOut' });
                gsap.set(leftBox, { visibility: 'visible' });
                gsap.fromTo(leftBox,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.6, ease: 'expo.out' }
                );
                gsap.to(items, { y: 0, opacity: 1, duration: 0.35, stagger: 0.05, ease: 'power3.out', delay: 0.1 });
            };

            const onLeaveLeft = () => {
                setStudioOpen(false);
                if (leftIcon) leftIcon.classList.remove('is-studio-open');
                if (logoText) logoText.classList.remove('is-studio-open');
                if (logoContainer) logoContainer.classList.remove('is-studio-open');
                gsap.killTweensOf([leftBox, items, leftIcon]);
                hideOverlay();
                gsap.to(leftIcon, { rotation: 0, duration: 0.4, ease: 'power2.out' });
                gsap.to(items, { y: 8, opacity: 0, duration: 0.15, ease: 'power2.in' });
                gsap.to(leftBox, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.25,
                    ease: 'expo.in',
                    onComplete: () => gsap.set(leftBox, { visibility: 'hidden' })
                });
            };

            navLeft.addEventListener('mouseenter', onEnterLeft);
            navLeft.addEventListener('mouseleave', onLeaveLeft);
            cleanups.push(() => {
                navLeft.removeEventListener('mouseenter', onEnterLeft);
                navLeft.removeEventListener('mouseleave', onLeaveLeft);
            });

            if (overlay) {
                overlay.addEventListener('click', onLeaveLeft);
                cleanups.push(() => overlay.removeEventListener('click', onLeaveLeft));
            }
        }

        return () => {
            window.removeEventListener('scroll', updateNavbarColor);
            if (lenisUnsub) lenisUnsub();
            cleanups.forEach((fn) => fn && fn());
        };
    }, []);

    const handleSelectType = (typeName) => {
        window.dispatchEvent(new CustomEvent('dotdot:select-type', { detail: { type: typeName } }));
    };

    const handleBrandClick = (e) => {
        if (e && (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)) {
            return;
        }
        if (e) e.preventDefault();
        window.dispatchEvent(new CustomEvent('dotdot:paint-transition-top'));
    };

    return (
        <>
            <div className="nav-overlay" />
            <nav className="navbar" role="navigation" aria-label="Main Navigation">
                {/* Left: Quick Studio Menu */}
                <div className="nav-left">
                    <div className="nav-hover-trigger">
                        <div
                            className={`logo-work-container ${studioOpen ? 'is-studio-open' : ''}`}
                            aria-hidden={studioOpen}
                        >
                            <svg
                                className={`nav-bar__work-blob-svg ${studioOpen ? 'is-studio-open' : ''}`}
                                viewBox="0 0 60 55"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden={studioOpen}
                            >
                                <rect x="2" y="2" width="56" height="51" rx="14" stroke="currentColor" strokeWidth="2.5" />
                                <rect x="12" y="12" width="12" height="12" rx="3" fill="var(--color-vermilion)" />
                                <rect x="36" y="12" width="12" height="12" rx="3" fill="currentColor" />
                                <rect x="12" y="32" width="12" height="12" rx="3" fill="currentColor" />
                                <rect x="36" y="32" width="12" height="12" rx="3" fill="var(--color-cobalt)" />
                            </svg>
                            <span
                                className={`logo-work-text ${studioOpen ? 'is-studio-open' : ''}`}
                                aria-hidden={studioOpen}
                            >
                                studio
                            </span>
                        </div>

                        {/* Quick Type Popout Box */}
                        <div className="nav-popout nav-work-box">
                            <div className="nav-popout-inner">
                                <div className="nav-studio-header">
                                    <div className="nav-studio-title">STUDIO</div>
                                    <p className="nav-studio-desc">Pick a format and start creating.</p>
                                </div>
                                <div className="nav-work-subheader">
                                    QUICK TYPE SELECTION
                                </div>
                                {[
                                    {
                                        id: 'URL',
                                        badge: 'WEB',
                                        title: 'Website / URL',
                                        desc: 'Links to a webpage or destination.',
                                        badgeClass: 'badge-web',
                                    },
                                    {
                                        id: 'TEXT',
                                        badge: 'NOTE',
                                        title: 'Plain Text Note',
                                        desc: 'Encode a short message or text.',
                                        badgeClass: 'badge-note',
                                    },
                                    {
                                        id: 'EMAIL',
                                        badge: 'MAIL',
                                        title: 'Pre-filled Mailto',
                                        desc: 'Open an email with details already filled in.',
                                        badgeClass: 'badge-mail',
                                    },
                                    {
                                        id: 'PHONE',
                                        badge: 'DIAL',
                                        title: 'Direct Telephone',
                                        desc: 'Create a QR that opens a phone call.',
                                        badgeClass: 'badge-dial',
                                    },
                                    {
                                        id: 'WIFI',
                                        badge: 'WIFI',
                                        title: 'Wi-Fi Credentials',
                                        desc: 'Share a Wi-Fi network without typing the password.',
                                        badgeClass: 'badge-wifi',
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.id}
                                        className="nav-work-item"
                                        onClick={() => handleSelectType(item.id)}
                                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSelectType(item.id)}
                                        role="button"
                                        tabIndex={0}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <span className={`nav-work-badge ${item.badgeClass}`}>{item.badge}</span>
                                        <div className="nav-work-item__text">
                                            <h4 className="nav-work-title">{item.title}</h4>
                                            <p className="nav-work-micro-desc">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                                <a href="#studio" className="nav-work-btn">
                                    <span className="nav-work-btn__text">Open Full Studio →</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center: BrandLogo with localized cream/off-white backing */}
                <div className="nav-center">
                    <a
                        href="#hero"
                        className="navbar-brand-link navbar-brand-badge"
                        style={{ textDecoration: 'none' }}
                        title="DOT DOT. — Home"
                        onClick={handleBrandClick}
                    >
                        <BrandLogo size="md" />
                    </a>
                </div>

                {/* Right: Section Links + CTA */}
                <div className="nav-right">
                    <div className="nav-links-desktop">
                        <a href="#studio" className="nav-link-item">CREATE</a>
                        <a href="#types" className="nav-link-item">TYPES</a>
                        <a href="#customize" className="nav-link-item">CUSTOMIZE</a>
                        <a href="#showcase" className="nav-link-item">SHOWCASE</a>
                        <a href="#studio" className="nav-cta-btn">
                            <span>CREATE QR →</span>
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
}
