'use client';

import React from 'react';

/**
 * Handcrafted original SVG illustrations for Gridmark right-side marquee cards.
 * Art directed specifically around optical QR mechanics, print marks,
 * and physical-world graphic design. Zero emojis, zero stock icons.
 */

export function ZeroTrackersIllustration() {
    return (
        <svg
            className="marquee-card-illustration illustration-zero-trackers"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {/* Local offline perimeter ring */}
            <circle
                cx="26"
                cy="26"
                r="18"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeDasharray="6 3.5"
            />
            {/* Direct offline node core */}
            <circle cx="26" cy="26" r="7.5" fill="currentColor" />
            <circle cx="26" cy="26" r="3" fill="#fff" />
            {/* Vermilion local circuit accent */}
            <circle cx="38" cy="16" r="3.5" fill="var(--color-vermilion)" />
            {/* Discrete no-telemetry barrier */}
            <line
                x1="12"
                y1="40"
                x2="40"
                y2="12"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function HighDensityIllustration() {
    return (
        <svg
            className="marquee-card-illustration illustration-high-density"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {/* Outer matrix frame */}
            <rect x="4" y="4" width="44" height="44" rx="6" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" opacity="0.4" />
            {/* Micro QR linocut modules with tactile roundness */}
            <rect x="9" y="9" width="9" height="9" rx="2" fill="currentColor" />
            <rect x="22" y="9" width="8" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
            <rect x="34" y="9" width="9" height="9" rx="2" fill="currentColor" />

            <rect x="9" y="22" width="8" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
            <rect x="21" y="21" width="10" height="10" rx="2.5" fill="var(--color-vermilion)" />
            <rect x="35" y="22" width="8" height="8" rx="2" fill="currentColor" />

            <rect x="9" y="34" width="9" height="9" rx="2" fill="currentColor" />
            <rect x="22" y="35" width="8" height="8" rx="2" fill="currentColor" />
            <rect x="34" y="34" width="9" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
    );
}

export function DotDotIllustration() {
    return (
        <svg
            className="marquee-card-illustration illustration-dot-dot"
            viewBox="0 0 64 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {/* Two oversized iconic tactile dots */}
            <circle cx="18" cy="27" r="12" fill="currentColor" />
            <circle cx="46" cy="27" r="12" fill="var(--color-vermilion)" />
            {/* Editorial geometric crop tick / registration angle */}
            <path
                d="M26 10L32 6L38 10"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <line x1="32" y1="6" x2="32" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export function VectorSvgIllustration() {
    return (
        <svg
            className="marquee-card-illustration illustration-vector-svg"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {/* Clean bezier path transforming from corner module */}
            <path
                d="M10 40V18C10 13.58 13.58 10 18 10H40"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
            />
            {/* Tangent guide handle line */}
            <line x1="6" y1="18" x2="30" y2="18" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.5" />
            {/* Precision vector anchor point nodes */}
            <rect x="8" y="16" width="4.5" height="4.5" rx="0.5" fill="#fff" stroke="currentColor" strokeWidth="1.6" />
            <rect x="38" y="8" width="4.5" height="4.5" rx="0.5" fill="#fff" stroke="var(--color-vermilion)" strokeWidth="1.6" />
            {/* Bezier tangent control dot */}
            <circle cx="30" cy="18" r="2.5" fill="var(--color-vermilion)" />
            <line x1="18" y1="10" x2="18" y2="2" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.5" />
            <circle cx="18" cy="2" r="2.5" fill="currentColor" />
        </svg>
    );
}

export function ReedSolomonIllustration() {
    return (
        <svg
            className="marquee-card-illustration illustration-reed-solomon"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {/* Two solid aligned modules */}
            <rect x="8" y="10" width="13" height="13" rx="2.5" fill="currentColor" />
            <rect x="27" y="10" width="13" height="13" rx="2.5" fill="currentColor" />
            {/* Staggered / offset imperfect module being mathematically corrected */}
            <rect
                x="18"
                y="29"
                width="13"
                height="13"
                rx="2.5"
                fill="none"
                stroke="var(--color-vermilion)"
                strokeWidth="2.2"
                strokeDasharray="3.5 2"
            />
            {/* Curving error correction realignment trajectory */}
            <path
                d="M33 36C40 36 43 31 43 25L43 23"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M39 26L43 22L47 26"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function ClientSideIllustration() {
    return (
        <svg
            className="marquee-card-illustration illustration-client-side"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {/* Local offline silicon boundary */}
            <rect x="13" y="13" width="26" height="26" rx="5" fill="none" stroke="currentColor" strokeWidth="2.4" />
            {/* Micro pin leads */}
            <line x1="8" y1="20" x2="13" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="8" y1="32" x2="13" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="39" y1="20" x2="44" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="39" y1="32" x2="44" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="8" x2="20" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="32" y1="8" x2="32" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="39" x2="20" y2="44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="32" y1="39" x2="32" y2="44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* Internal scannable data bit */}
            <rect x="21" y="21" width="10" height="10" rx="2" fill="var(--color-vermilion)" />
        </svg>
    );
}

export function ErrorCorrectionIllustration() {
    return (
        <svg
            className="marquee-card-illustration illustration-error-correction"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {/* Concentric resilience target rings */}
            <circle cx="26" cy="26" r="17" stroke="currentColor" strokeWidth="2.2" strokeDasharray="7 4" />
            <circle cx="26" cy="26" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
            {/* Crosshair alignment ticks */}
            <path d="M26 4V11M26 41V48M4 26H11M41 26H48" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            {/* Center optical core */}
            <rect x="22.5" y="22.5" width="7" height="7" rx="1.5" fill="var(--color-vermilion)" />
        </svg>
    );
}

export function InstantScanIllustration() {
    return (
        <svg
            className="marquee-card-illustration illustration-instant-scan"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {/* Finder bracket */}
            <path d="M12 30V14H30" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            {/* High-speed optical laser arrow */}
            <line x1="6" y1="26" x2="42" y2="26" stroke="var(--color-vermilion)" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M34 19L43 26L34 33" fill="none" stroke="var(--color-vermilion)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function getMarqueeCardIllustration(id) {
    switch (id) {
        case 'ZERO_TRACKERS':
            return <ZeroTrackersIllustration />;
        case 'HIGH_DENSITY':
            return <HighDensityIllustration />;
        case 'DOT_DOT':
            return <DotDotIllustration />;
        case 'VECTOR_SVG':
            return <VectorSvgIllustration />;
        case 'REED_SOLOMON':
            return <ReedSolomonIllustration />;
        case 'CLIENT_SIDE':
            return <ClientSideIllustration />;
        case 'ERROR_CORRECTION':
            return <ErrorCorrectionIllustration />;
        case 'INSTANT_SCAN':
            return <InstantScanIllustration />;
        default:
            return null;
    }
}
