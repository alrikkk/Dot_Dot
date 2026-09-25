'use client';

import React, { useRef, useState } from 'react';
import { copyToClipboard } from '@/lib/qr/export.js';

export default function QRPreview({
    qrDataUrl,
    payload,
    validation,
    isGenerating,
    activeType,
    customization,
}) {
    const cardRef = useRef(null);
    const [copied, setCopied] = useState(false);

    const handleCopyPayload = async () => {
        if (!payload) return;
        const ok = await copyToClipboard(payload);
        if (ok) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Subtle pointer tilt effect
    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = -(y / rect.height) * 10;
        const rotateY = (x / rect.width) * 10;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    };

    return (
        <div className="qr-studio__panel qr-preview-panel">
            <div className="qr-studio__panel-header" style={{ width: '100%' }}>
                <span className="qr-studio__panel-title">
                    <span className="qr-studio__panel-step">2</span>
                    <span>Live Preview</span>
                </span>
            </div>

            {/* Interactive Preview Canvas / Image Container */}
            <div
                ref={cardRef}
                className={`qr-preview-card ${!validation.isValid ? 'is-invalid' : ''}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    backgroundColor: customization.bgColor,
                }}
            >
                {/* Finder pattern accent marks */}
                <div className="qr-preview__corner qr-preview__corner--tl" />
                <div className="qr-preview__corner qr-preview__corner--tr" />
                <div className="qr-preview__corner qr-preview__corner--bl" />
                <div className="qr-preview__corner qr-preview__corner--br" />

                {/* Scanning laser line sweep */}
                <div className="qr-scan-line" />

                {qrDataUrl ? (
                    <img
                        src={qrDataUrl}
                        alt={`QR code for ${activeType}`}
                        className="qr-preview-img"
                    />
                ) : (
                    <div style={{ color: 'rgba(0,0,0,0.4)', fontSize: '0.9rem', fontWeight: 700 }}>
                        Enter valid input to generate mark
                    </div>
                )}
            </div>

            {/* Payload Inspector */}
            <div className="qr-payload-inspector">
                <div className="qr-payload-inspector__header">
                    <span>Encoded Payload</span>
                    <button
                        type="button"
                        className="qr-payload-inspector__copy"
                        onClick={handleCopyPayload}
                        disabled={!payload}
                    >
                        {copied ? 'COPIED ✓' : 'COPY'}
                    </button>
                </div>
                <div className="qr-payload-inspector__code" title={payload}>
                    {payload || 'No payload'}
                </div>
            </div>
        </div>
    );
}
