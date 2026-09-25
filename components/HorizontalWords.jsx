'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../app/styles/horizontal-words.css';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalWords() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = sectionRef.current;
            const textRef = container.querySelector('.horizontal-words__relative');
            const letters = container.querySelectorAll('.letter');
            const stickers = container.querySelectorAll('.horizontal-mark');

            const entranceDistance = window.innerHeight;
            const pinnedDistance = 2200;

            const scrollTween = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top bottom',
                    end: () => `+=${entranceDistance + pinnedDistance}`,
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });

            scrollTween
                .fromTo(textRef, {
                    x: window.innerWidth,
                }, {
                    x: window.innerWidth * 0.45,
                    ease: 'none',
                    duration: entranceDistance,
                })
                .to(textRef, {
                    x: () => -(textRef.scrollWidth - window.innerWidth * 0.45),
                    ease: 'none',
                    duration: pinnedDistance,
                });

            ScrollTrigger.create({
                trigger: container,
                start: 'top top',
                end: () => `+=${pinnedDistance}`,
                pin: true,
                pinSpacing: true,
                invalidateOnRefresh: true,
            });

            // Random kinetic bounce on each individual letter
            letters.forEach((letter) => {
                gsap.from(letter, {
                    yPercent: (Math.random() - 0.5) * 450,
                    rotation: (Math.random() - 0.5) * 50,
                    ease: 'elastic.out(1.2, 1)',
                    scrollTrigger: {
                        trigger: letter,
                        containerAnimation: scrollTween,
                        start: 'left 92%',
                        end: 'left 50%',
                        scrub: 0.5,
                    },
                });
            });

            // Kinetic bounce on geometric marks
            stickers.forEach((sticker) => {
                gsap.from(sticker, {
                    scale: 0,
                    yPercent: (Math.random() - 0.5) * 350,
                    rotation: (Math.random() - 0.5) * 90,
                    ease: 'elastic.out(1.2, 1)',
                    scrollTrigger: {
                        trigger: sticker,
                        containerAnimation: scrollTween,
                        start: 'left 92%',
                        end: 'left 50%',
                        scrub: 0.5,
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const headline = "Every mark has a destination.";
    const words = headline.split(' ');

    return (
        <section ref={sectionRef} className="horizontal-words-section content-section" id="showcase">
            <div className="horizontal-words__relative">
                <div className="horizontal-words__sticker-svg">
                    {/* SVG Arrow / Trail */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 386 127" fill="none" className="horizontal-words__arrow-svg">
                        <path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5" stroke="var(--color-vermilion)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97" stroke="var(--color-vermilion)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    {/* Geometric Marks / Motifs */}
                    <div className="horizontal-mark horizontal-words__sticker-watch" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-dark)', border: '2px solid var(--color-vermilion)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: '#fff', fontWeight: 900, fontSize: '0.8rem' }}>● ●</span>
                        </div>
                    </div>

                    <div className="horizontal-mark horizontal-words__sticker-cursor" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--color-cobalt)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.75rem', letterSpacing: '0.04em' }}>
                            QR.
                        </div>
                    </div>

                    <div className="horizontal-mark horizontal-words__sticker-phone" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--color-lime)', border: '2px solid var(--color-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '1.2rem' }}>⊕</span>
                        </div>
                    </div>

                    <h2 className="display horizontal-words__h2" aria-label={headline}>
                        {words.map((word, wordIdx) => (
                            <span key={wordIdx} style={{ display: 'inline-block', marginRight: '0.35em' }}>
                                {word.split('').map((char, charIdx) => (
                                    <span
                                        key={charIdx}
                                        className="letter"
                                        aria-hidden="true"
                                        style={{ position: 'relative', display: 'inline-block' }}
                                    >
                                        {char}
                                    </span>
                                ))}
                            </span>
                        ))}
                    </h2>
                </div>
            </div>

            <div className="horizontal-words__bottom-text">
                <p className="horizontal-words__bottom-text-l">
                    From spatial packaging to editorial identity, <em>DOT DOT.</em> turns<br />
                    every grid into an interactive gateway. Fast, client-side, precision-tuned.
                </p>
            </div>
        </section>
    );
}
