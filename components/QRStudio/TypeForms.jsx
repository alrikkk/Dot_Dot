'use client';

import React, { useState } from 'react';
import { QR_TYPES } from '@/lib/qr/types.js';

export default function TypeForms({ activeType, values, onChange }) {
    const [showWifiPassword, setShowWifiPassword] = useState(false);

    const handleFieldChange = (field, val) => {
        onChange({
            ...values,
            [field]: val,
        });
    };

    switch (activeType) {
        case QR_TYPES.URL:
            return (
                <div className="qr-form">
                    <div className="qr-field">
                        <label className="qr-field__label" htmlFor="qr-url-input">
                            <span>Destination URL</span>
                        </label>
                        <input
                            id="qr-url-input"
                            type="url"
                            className="qr-input"
                            placeholder="https://example.com"
                            value={values.url || ''}
                            onChange={(e) => handleFieldChange('url', e.target.value)}
                            autoComplete="off"
                            autoCapitalize="none"
                        />
                    </div>
                </div>
            );

        case QR_TYPES.TEXT: {
            const currentText = values.text || '';
            return (
                <div className="qr-form">
                    <div className="qr-field">
                        <label className="qr-field__label" htmlFor="qr-text-input">
                            <span>Plain Text / Note</span>
                            <span className="qr-field__counter">{currentText.length} chars</span>
                        </label>
                        <textarea
                            id="qr-text-input"
                            className="qr-textarea"
                            placeholder="Enter any text, code snippet, or message..."
                            value={currentText}
                            onChange={(e) => handleFieldChange('text', e.target.value)}
                            rows={4}
                        />
                    </div>
                </div>
            );
        }

        case QR_TYPES.EMAIL:
            return (
                <div className="qr-form">
                    <div className="qr-field">
                        <label className="qr-field__label" htmlFor="qr-email-addr">
                            <span>Recipient Email</span>
                        </label>
                        <input
                            id="qr-email-addr"
                            type="email"
                            className="qr-input"
                            placeholder="name@domain.com"
                            value={values.email || ''}
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                            autoComplete="off"
                        />
                    </div>
                    <div className="qr-field">
                        <label className="qr-field__label" htmlFor="qr-email-subject">
                            <span>Subject (Optional)</span>
                        </label>
                        <input
                            id="qr-email-subject"
                            type="text"
                            className="qr-input"
                            placeholder="Project Inquiry"
                            value={values.subject || ''}
                            onChange={(e) => handleFieldChange('subject', e.target.value)}
                        />
                    </div>
                    <div className="qr-field">
                        <label className="qr-field__label" htmlFor="qr-email-body">
                            <span>Message Body (Optional)</span>
                        </label>
                        <textarea
                            id="qr-email-body"
                            className="qr-textarea"
                            placeholder="Hello, I'd like to get in touch..."
                            value={values.body || ''}
                            onChange={(e) => handleFieldChange('body', e.target.value)}
                            rows={3}
                        />
                    </div>
                </div>
            );

        case QR_TYPES.PHONE:
            return (
                <div className="qr-form">
                    <div className="qr-field">
                        <label className="qr-field__label" htmlFor="qr-phone-input">
                            <span>Telephone Number</span>
                        </label>
                        <input
                            id="qr-phone-input"
                            type="tel"
                            className="qr-input"
                            placeholder="+1 (555) 000-0000"
                            value={values.phone || ''}
                            onChange={(e) => handleFieldChange('phone', e.target.value)}
                        />
                    </div>
                </div>
            );

        case QR_TYPES.WIFI:
            return (
                <div className="qr-form">
                    <div className="qr-field">
                        <label className="qr-field__label" htmlFor="qr-wifi-ssid">
                            <span>Network SSID</span>
                        </label>
                        <input
                            id="qr-wifi-ssid"
                            type="text"
                            className="qr-input"
                            placeholder="Home_WiFi"
                            value={values.ssid || ''}
                            onChange={(e) => handleFieldChange('ssid', e.target.value)}
                        />
                    </div>

                    <div className="qr-field">
                        <label className="qr-field__label" htmlFor="qr-wifi-enc">
                            <span>Security Type</span>
                        </label>
                        <select
                            id="qr-wifi-enc"
                            className="qr-select"
                            value={values.encryption || 'WPA'}
                            onChange={(e) => handleFieldChange('encryption', e.target.value)}
                        >
                            <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
                            <option value="WEP">WEP (Legacy)</option>
                            <option value="NONE">None (Open Network)</option>
                        </select>
                    </div>

                    {values.encryption !== 'NONE' && (
                        <div className="qr-field">
                            <label className="qr-field__label" htmlFor="qr-wifi-pass">
                                <span>Network Password</span>
                            </label>
                            <div className="qr-field-row">
                                <input
                                    id="qr-wifi-pass"
                                    type={showWifiPassword ? 'text' : 'password'}
                                    className="qr-input"
                                    placeholder="Enter network password"
                                    value={values.password || ''}
                                    onChange={(e) => handleFieldChange('password', e.target.value)}
                                    autoComplete="off"
                                />
                                <button
                                    type="button"
                                    className="qr-icon-toggle"
                                    onClick={() => setShowWifiPassword(!showWifiPassword)}
                                    title={showWifiPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showWifiPassword ? 'HIDE' : 'SHOW'}
                                </button>
                            </div>
                        </div>
                    )}

                    <label className="qr-checkbox-wrap">
                        <input
                            type="checkbox"
                            checked={Boolean(values.hidden)}
                            onChange={(e) => handleFieldChange('hidden', e.target.checked)}
                        />
                        <span>Hidden Network SSID</span>
                    </label>
                </div>
            );

        default:
            return null;
    }
}
