'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MARQUEE_ITEMS, colors } from '@/lib/data';
import { getMarqueeCardIllustration } from './MarqueeCardIllustrations';

function buildMarqueeTracks(isMobile) {
    const tracks = [[], []];
    for (let t = 0; t < 2; t++) {
        const items = MARQUEE_ITEMS.map((item, i) => ({
            ...item,
            color: colors[(i + t * 3) % colors.length],
        }));
        // Duplicate for seamless endless marquee scroll
        tracks[t] = isMobile ? items : [...items, ...items, ...items];
    }
    return tracks;
}

export default function DoubleMarquee() {
    const [tracks, setTracks] = useState([[], []]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const mobile = window.matchMedia('(max-width: 768px)').matches;
        setTracks(buildMarqueeTracks(mobile));

        const marqueeTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.Double-marquee',
                start: 'top 70%',
                toggleActions: 'play none none reverse',
            },
        });

        marqueeTl
            .to('.marquee-underline', { scaleX: 1, opacity: 1, duration: 1, ease: 'power2.out' })
            .to('.marquee-left .marquee-blob-container', { scale: 1, opacity: 1, rotation: -4, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.5');

        return () => {
            ScrollTrigger.getAll().forEach((t) => {
                if (t.vars.trigger === '.Double-marquee') t.kill();
            });
        };
    }, []);

    return (
        <>
            {/* Left: Editorial Statement */}
            <div className="marquee-left">
                <div className="marquee-text-container">
                    <div className="marquee-headline-wrapper">
                        <h2 style={{ textTransform: 'uppercase', letterSpacing: '-0.04em' }}>
                            built to <span className="text-with">endure.</span>
                        </h2>
                        <svg xmlns="http://www.w3.org/2000/svg" className="marquee-underline" viewBox="0 0 132 5" fill="none">
                            <path d="M1 2.08377C44.3458 3.90451 87.9791 5.71442 131 1" stroke="var(--color-vermilion)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    {/* Middle: Interactive Black DOT DOT Graphic */}
                    <div className="marquee-blob-container">
                        <div className="marquee-stamp-card">
                            <span style={{ fontSize: '2.5rem', fontWeight: 900 }}>● ●</span>
                        </div>
                    </div>

                    {/* Bottom: Supporting Body Copy */}
                    <p className="marquee-description">
                        No redirect links that expire. No third-party servers tracking your scans. Just pure, mathematical payload matrices.
                    </p>
                </div>
            </div>

            {/* Right: Two kinetic opposing tracks */}
            <div className="marquee-right">
                {tracks.map((trackItems, colIndex) => (
                    <div key={colIndex} className="marquee-column">
                        <div className="marquee-track">
                            {trackItems.map((item, i) => (
                                <div
                                    key={i}
                                    className="marquee-item"
                                    style={{
                                        backgroundColor: item.color,
                                    }}
                                >
                                    {getMarqueeCardIllustration(item.id)}
                                    <span className="marquee-item-label">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
