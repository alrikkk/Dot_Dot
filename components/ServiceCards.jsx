'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CARDS_DATA } from '@/lib/data';

export default function ServiceCards() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animate underline SVG paths on scroll
        gsap.to('.title-underline-svg path', {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.3,
            scrollTrigger: {
                trigger: '.service-cards-wrapper',
                start: 'top 70%',
                toggleActions: 'play none none reverse',
            },
        });

        initCardAnimations();
    }, []);

    const handleCardClick = (type) => {
        window.dispatchEvent(new CustomEvent('dotdot:select-type', { detail: { type } }));
    };

    return (
        <section id="types">
            {/* ─── Heading ─── */}
            <div className="title-container">
                <h2 className="main-title">
                    supported <span className="italic-text">types:</span>
                </h2>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="160"
                    viewBox="0 0 159 17"
                    fill="none"
                    className="title-underline-svg"
                >
                    <path
                        d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M30.2672 15.9461C64.1899 12.8158 98.2663 11.3583 132.33 11.5735"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* ─── Elastic Type Cards ─── */}
            <div className="cards-wrapper" id="cards-wrapper">
                {CARDS_DATA.map((card) => (
                    <div
                        key={card.color}
                        className={`card card-${card.color}`}
                        onClick={() => handleCardClick(card.type)}
                        style={{ cursor: 'pointer' }}
                        title={`Click to create ${card.type} QR`}
                    >
                        <div className="card-badge-top" style={{ position: 'absolute', top: '18px', right: '20px', fontFamily: 'monospace', fontWeight: 900, fontSize: '0.75rem', opacity: 0.6 }}>
                            {card.badge}
                        </div>
                        <h3 className="card-title">{card.title}</h3>
                        <svg
                            width="100%"
                            height="10"
                            className="card-divider-svg"
                            aria-hidden="true"
                        >
                            <use href="#card-divider" />
                        </svg>
                        <ul className="card-list">
                            {card.services.map((service) => (
                                <li key={service}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="13"
                                        height="16"
                                        className="services-card__bullet-svg"
                                        aria-hidden="true"
                                    >
                                        <use href="#bullet-icon" />
                                    </svg>
                                    {service}
                                </li>
                            ))}
                        </ul>
                        <div style={{ marginTop: 'auto', paddingTop: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.1)', fontSize: '0.78rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            <span>Create {card.type}</span>
                            <span>→</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function initCardAnimations() {
    const cards = gsap.utils.toArray('.card');
    if (!cards.length) return;

    const originalData = [
        { rotation: 4 },
        { rotation: -5 },
        { rotation: 5 },
        { rotation: -8 },
        { rotation: 5 },
    ];

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (!isMobile) {
        cards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                const hoverGap = 120;
                const clusterGap = 150;
                const cardWidth = 320;
                const hoveredLeft = cards[index].offsetLeft;
                const leftCards = [];
                const rightCards = [];

                cards.forEach((otherCard, otherIndex) => {
                    if (otherIndex < index) leftCards.push({ card: otherCard, index: otherIndex });
                    else if (otherIndex > index) rightCards.push({ card: otherCard, index: otherIndex });
                });

                const currentTop = cards[index].offsetTop;
                const targetCommonTop = 50;
                const moveY = targetCommonTop - currentTop;

                gsap.to(cards[index], {
                    x: 0,
                    y: moveY,
                    rotation: 0,
                    scale: 1.08,
                    duration: 0.9,
                    ease: 'elastic.out(1, 0.5)',
                    overwrite: true,
                });

                if (rightCards.length) {
                    const clusterStart = hoveredLeft + cardWidth + hoverGap;
                    rightCards.forEach((item, i) => {
                        const targetAbsLeft = clusterStart + i * clusterGap;
                        const targetX = Math.max(targetAbsLeft - item.card.offsetLeft, 10);
                        const angleRad = originalData[item.index].rotation * (Math.PI / 180);
                        const targetY = targetX * Math.tan(angleRad);
                        gsap.to(item.card, {
                            x: targetX,
                            y: targetY,
                            rotation: originalData[item.index].rotation,
                            scale: 1,
                            duration: 1.0,
                            ease: 'elastic.out(1, 0.5)',
                            overwrite: true,
                        });
                    });
                }

                if (leftCards.length) {
                    leftCards.reverse();
                    const clusterStart = hoveredLeft - hoverGap - cardWidth;
                    leftCards.forEach((item, i) => {
                        const targetAbsLeft = clusterStart - i * clusterGap;
                        const targetX = Math.min(targetAbsLeft - item.card.offsetLeft, -10);
                        const angleRad = originalData[item.index].rotation * (Math.PI / 180);
                        const targetY = targetX * Math.tan(angleRad);
                        gsap.to(item.card, {
                            x: targetX,
                            y: targetY,
                            rotation: originalData[item.index].rotation,
                            scale: 1,
                            duration: 1.0,
                            ease: 'elastic.out(1, 0.5)',
                            overwrite: true,
                        });
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                cards.forEach((c, i) => {
                    gsap.to(c, {
                        x: 0,
                        y: 0,
                        scale: 1,
                        rotation: originalData[i].rotation,
                        duration: 1.0,
                        ease: 'elastic.out(1, 0.5)',
                        overwrite: true,
                        zIndex: i + 1,
                        delay: 0.08,
                    });
                });
            });
        });
    } else {
        // Mobile: Stacked card scroll reveal
        const cardsWrapper = document.querySelector('.cards-wrapper');
        const scrollPerCard = window.innerHeight * 0.8;
        const navH = 60;
        const mobileRotations = [-6, 4, -8, 5, -3];

        cards.forEach((card, i) => {
            gsap.set(card, {
                position: 'absolute',
                left: '50%',
                top: '0',
                xPercent: -50,
                y: i === 0 ? 0 : window.innerHeight * 1.1,
                rotation: mobileRotations[i % mobileRotations.length],
                zIndex: i + 1,
                transformOrigin: 'center center',
            });
        });

        const wrapperH = window.innerHeight * 0.7 + scrollPerCard * (cards.length - 1);
        gsap.set(cardsWrapper, { height: wrapperH });

        ScrollTrigger.create({
            trigger: cardsWrapper,
            start: `top ${navH}px`,
            end: `+=${scrollPerCard * (cards.length - 1)}`,
            pin: true,
            pinSpacing: true,
            id: 'mobile-cards-pin',
        });

        cards.forEach((card, i) => {
            if (i === 0) return;
            gsap.fromTo(
                card,
                { y: window.innerHeight * 1.1 },
                {
                    y: 0,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: cardsWrapper,
                        start: `top+=${(i - 1) * scrollPerCard} ${navH}px`,
                        end: `top+=${i * scrollPerCard} ${navH}px`,
                        scrub: 0.4,
                    },
                }
            );
        });
    }
}
