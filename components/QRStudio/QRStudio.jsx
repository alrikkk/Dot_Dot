'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { QR_TYPES, QR_TYPE_CONFIGS } from '@/lib/qr/types.js';
import { buildQrPayload } from '@/lib/qr/payloads.js';
import { validateQrInputs } from '@/lib/qr/validation.js';
import { generateQrDataUrl, generateQrSvg } from '@/lib/qr/generator.js';
import { downloadPng, downloadSvg } from '@/lib/qr/export.js';

import TypeSelector from './TypeSelector';
import TypeForms from './TypeForms';
import QRPreview from './QRPreview';
import CustomizationPanel from './CustomizationPanel';

export default function QRStudio() {
    const [activeType, setActiveType] = useState(QR_TYPES.URL);

    // Form values keyed by type
    const [formsState, setFormsState] = useState(() => {
        const initial = {};
        QR_TYPE_CONFIGS.forEach((c) => {
            initial[c.id] = { ...c.defaultValues };
        });
        return initial;
    });

    // Customization state
    const [customization, setCustomization] = useState({
        fgColor: '#0a0a0a',
        bgColor: '#faf8f5',
        errorCorrectionLevel: 'M',
        margin: 2,
        width: 512,
    });

    const [qrDataUrl, setQrDataUrl] = useState('');
    const [qrSvgString, setQrSvgString] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const currentFormValues = formsState[activeType] || {};
    const payload = buildQrPayload(activeType, currentFormValues);
    const validation = validateQrInputs(activeType, currentFormValues);

    // Re-generate QR when payload or customization changes
    const updateQr = useCallback(async () => {
        if (!validation.isValid || !payload) {
            setQrDataUrl('');
            setQrSvgString('');
            return;
        }

        setIsGenerating(true);
        try {
            const options = {
                errorCorrectionLevel: customization.errorCorrectionLevel,
                margin: customization.margin,
                color: {
                    dark: customization.fgColor,
                    light: customization.bgColor,
                },
                width: customization.width,
            };

            const [dataUrl, svg] = await Promise.all([
                generateQrDataUrl(payload, options),
                generateQrSvg(payload, options),
            ]);

            setQrDataUrl(dataUrl);
            setQrSvgString(svg);
        } catch (err) {
            console.error('Failed to render QR:', err);
        } finally {
            setIsGenerating(false);
        }
    }, [payload, validation.isValid, customization]);

    useEffect(() => {
        updateQr();
    }, [updateQr]);

    // Handle global custom event from ElasticCards or Navbar
    useEffect(() => {
        const handleTypeEvent = (e) => {
            if (e.detail && e.detail.type) {
                setActiveType(e.detail.type);
                const studioEl = document.getElementById('studio');
                if (studioEl) {
                    studioEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        window.addEventListener('dotdot:select-type', handleTypeEvent);
        return () => window.removeEventListener('dotdot:select-type', handleTypeEvent);
    }, []);

    const handleFormValuesChange = (newValues) => {
        setFormsState((prev) => ({
            ...prev,
            [activeType]: newValues,
        }));
    };

    const handleExportPng = () => {
        if (!qrDataUrl) return;
        const filename = `dotdot-${activeType.toLowerCase()}-qr.png`;
        downloadPng(qrDataUrl, filename);
    };

    const handleExportSvg = () => {
        if (!qrSvgString) return;
        const filename = `dotdot-${activeType.toLowerCase()}-qr.svg`;
        downloadSvg(qrSvgString, filename);
    };

    return (
        <section className="qr-studio-section" id="studio">
            {/* Header */}
            <div className="qr-studio__header">
                <h2 className="qr-studio__title">
                    Make It <span style={{ color: 'var(--color-vermilion)' }}>Scannable.</span>
                </h2>
                <p className="qr-studio__subtitle">
                    Craft high-density, vector-pure QR marks directly in your browser.
                    Zero telemetry. Zero third-party trackers. Instant client-side generation.
                </p>
            </div>

            {/* 3-Column Studio Grid */}
            <div className="qr-studio__grid">
                {/* Column 1: Type Selection & Inputs */}
                <div className="qr-studio__panel">
                    <div className="qr-studio__panel-header">
                        <span className="qr-studio__panel-title">
                            <span className="qr-studio__panel-step">1</span>
                            <span>Payload & Type</span>
                        </span>
                    </div>

                    <TypeSelector
                        activeType={activeType}
                        onSelectType={setActiveType}
                    />

                    <TypeForms
                        activeType={activeType}
                        values={currentFormValues}
                        onChange={handleFormValuesChange}
                    />
                </div>

                {/* Column 2: Live QR Centerpiece */}
                <QRPreview
                    qrDataUrl={qrDataUrl}
                    payload={payload}
                    validation={validation}
                    isGenerating={isGenerating}
                    activeType={activeType}
                    customization={customization}
                />

                {/* Column 3: Customization & Export */}
                <CustomizationPanel
                    customization={customization}
                    onChange={setCustomization}
                    onExportPng={handleExportPng}
                    onExportSvg={handleExportSvg}
                    isValid={validation.isValid}
                />
            </div>
        </section>
    );
}
