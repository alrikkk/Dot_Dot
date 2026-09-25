'use client';

import React from 'react';
import { QR_TYPES, QR_TYPE_CONFIGS } from '@/lib/qr/types.js';

export default function TypeSelector({ activeType, onSelectType }) {
    return (
        <div className="qr-type-nav" role="tablist" aria-label="QR Code Type">
            {QR_TYPE_CONFIGS.map((config) => {
                const isActive = activeType === config.id;
                return (
                    <button
                        key={config.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`qr-type-btn ${isActive ? 'is-active' : ''}`}
                        onClick={() => onSelectType(config.id)}
                    >
                        <span className="qr-type-btn__indicator" aria-hidden="true" />
                        <span>{config.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
