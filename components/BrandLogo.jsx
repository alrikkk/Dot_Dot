'use client';

import React from 'react';

/**
 * BrandLogo — Reusable core brandmark for DOT DOT.
 * Features the two-dot QR module motif and editorial typography.
 */
export default function BrandLogo({
    className = '',
    size = 'md', // 'sm' | 'md' | 'lg' | 'giant' | 'footer'
    onClick,
    showWordmark = true,
}) {
    const sizeClasses = {
        sm: 'brand-logo--sm',
        md: 'brand-logo--md',
        lg: 'brand-logo--lg',
        giant: 'brand-logo--giant',
        footer: 'brand-logo--footer',
    };

    return (
        <span
            className={`brand-logo ${sizeClasses[size] || 'brand-logo--md'} ${className}`}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick(e) : undefined}
            aria-label="DOT DOT."
        >
            <span className="brand-logo__dots" aria-hidden="true" data-wiggle-target="true">
                <span className="brand-logo__dot brand-logo__dot--first" />
                <span className="brand-logo__dot brand-logo__dot--second" />
            </span>
            {showWordmark && (
                <span className="brand-logo__text">
                    <span className="brand-logo__word brand-logo__word--first">DOT</span>
                    <span className="brand-logo__word brand-logo__word--second">
                        DOT<span className="brand-logo__period">.</span>
                    </span>
                </span>
            )}
        </span>
    );
}
