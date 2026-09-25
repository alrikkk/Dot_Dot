'use client';

import React from 'react';
import { ERROR_CORRECTION_LEVELS, COLOR_PRESETS } from '@/lib/qr/types.js';

export default function CustomizationPanel({
    customization,
    onChange,
    onExportPng,
    onExportSvg,
    isValid,
}) {
    const handleUpdate = (key, val) => {
        onChange({
            ...customization,
            [key]: val,
        });
    };

    return (
        <div className="qr-studio__panel" id="customize">
            <div className="qr-studio__panel-header">
                <span className="qr-studio__panel-title">
                    <span className="qr-studio__panel-step">3</span>
                    <span>Customize & Export</span>
                </span>
            </div>

            {/* Foreground Color */}
            <div className="qr-custom-section">
                <label className="qr-custom-label">
                    <span>Foreground Color</span>
                    <span style={{ fontFamily: 'monospace' }}>{customization.fgColor}</span>
                </label>
                <div className="qr-swatches">
                    {COLOR_PRESETS.FOREGROUND.map((preset) => (
                        <button
                            key={preset.value}
                            type="button"
                            className={`qr-swatch ${customization.fgColor === preset.value ? 'is-active' : ''}`}
                            style={{ backgroundColor: preset.value }}
                            onClick={() => handleUpdate('fgColor', preset.value)}
                            title={preset.label}
                        />
                    ))}
                    <div className="qr-color-input-wrap" title="Custom color picker">
                        <input
                            type="color"
                            value={customization.fgColor}
                            onChange={(e) => handleUpdate('fgColor', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Background Color */}
            <div className="qr-custom-section">
                <label className="qr-custom-label">
                    <span>Background Color</span>
                    <span style={{ fontFamily: 'monospace' }}>{customization.bgColor}</span>
                </label>
                <div className="qr-swatches">
                    {COLOR_PRESETS.BACKGROUND.map((preset) => (
                        <button
                            key={preset.value}
                            type="button"
                            className={`qr-swatch ${customization.bgColor === preset.value ? 'is-active' : ''}`}
                            style={{ backgroundColor: preset.value }}
                            onClick={() => handleUpdate('bgColor', preset.value)}
                            title={preset.label}
                        />
                    ))}
                    <div className="qr-color-input-wrap" title="Custom color picker">
                        <input
                            type="color"
                            value={customization.bgColor}
                            onChange={(e) => handleUpdate('bgColor', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Error Correction Level */}
            <div className="qr-custom-section">
                <label className="qr-custom-label">
                    <span>Error Correction</span>
                    <span>{customization.errorCorrectionLevel}</span>
                </label>
                <div className="qr-ec-tabs">
                    {ERROR_CORRECTION_LEVELS.map((lvl) => (
                        <button
                            key={lvl.id}
                            type="button"
                            className={`qr-ec-tab ${customization.errorCorrectionLevel === lvl.id ? 'is-active' : ''}`}
                            onClick={() => handleUpdate('errorCorrectionLevel', lvl.id)}
                            title={lvl.desc}
                        >
                            <span>{lvl.label}</span>
                            <span className="qr-ec-tab__name">{lvl.name.split(' ')[0]}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Quiet Zone Margin */}
            <div className="qr-custom-section">
                <label className="qr-custom-label">
                    <span>Quiet Zone Margin</span>
                    <span>{customization.margin} modules</span>
                </label>
                <div className="qr-slider-wrap">
                    <input
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        className="qr-slider"
                        value={customization.margin}
                        onChange={(e) => handleUpdate('margin', Number(e.target.value))}
                    />
                    <span className="qr-slider-val">{customization.margin}</span>
                </div>
            </div>

            {/* Real Export Actions */}
            <div className="qr-custom-section" style={{ marginTop: '0.5rem' }}>
                <label className="qr-custom-label">
                    <span>Export Scannable Mark</span>
                </label>
                <div className="qr-export-group">
                    <button
                        type="button"
                        className="qr-export-btn qr-export-btn--png"
                        onClick={onExportPng}
                        disabled={!isValid}
                    >
                        <span>PNG</span>
                        <span>↓</span>
                    </button>
                    <button
                        type="button"
                        className="qr-export-btn qr-export-btn--svg"
                        onClick={onExportSvg}
                        disabled={!isValid}
                    >
                        <span>SVG</span>
                        <span>↓</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
