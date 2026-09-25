// ─── lib/qr/types.js — Supported QR Types & Settings for DOT DOT. ─────────────

export const QR_TYPES = {
    URL: 'URL',
    TEXT: 'TEXT',
    EMAIL: 'EMAIL',
    PHONE: 'PHONE',
    WIFI: 'WIFI',
};

export const QR_TYPE_CONFIGS = [
    {
        id: QR_TYPES.URL,
        label: 'URL',
        shortDesc: 'Web link, portfolio, or landing page',
        defaultValues: {
            url: 'https://dot-dot-iota.vercel.app/',
        },
    },
    {
        id: QR_TYPES.TEXT,
        label: 'TEXT',
        shortDesc: 'Plain note, message, or cryptic snippet',
        defaultValues: {
            text: 'DOT DOT. Make it scannable.',
        },
    },
    {
        id: QR_TYPES.EMAIL,
        label: 'EMAIL',
        shortDesc: 'Direct email dispatch with pre-filled subject',
        defaultValues: {
            email: 'studio@dotdot.design',
            subject: 'Project Inquiry via DOT DOT.',
            body: 'Hello DOT DOT team, I would like to create custom scannable marks for our brand.',
        },
    },
    {
        id: QR_TYPES.PHONE,
        label: 'PHONE',
        shortDesc: 'Direct dial telephone number',
        defaultValues: {
            phone: '+1 (555) 234-5678',
        },
    },
    {
        id: QR_TYPES.WIFI,
        label: 'WI-FI',
        shortDesc: 'Zero-friction network credentials',
        defaultValues: {
            ssid: 'DOT_DOT_STUDIO',
            password: 'makeitscannable',
            encryption: 'WPA',
            hidden: false,
        },
    },
];

export const ERROR_CORRECTION_LEVELS = [
    { id: 'L', label: 'L', name: 'Low (~7%)', desc: 'Minimal redundancy, sharpest module density' },
    { id: 'M', label: 'M', name: 'Medium (~15%)', desc: 'Balanced resilience, standard default' },
    { id: 'Q', label: 'Q', name: 'Quartile (~25%)', desc: 'Enhanced error recovery for textured surfaces' },
    { id: 'H', label: 'H', name: 'High (~30%)', desc: 'Maximum resilience against tears or marks' },
];

export const COLOR_PRESETS = {
    FOREGROUND: [
        { label: 'Deep Ink', value: '#0a0a0a' },
        { label: 'Vermilion', value: '#ff3b19' },
        { label: 'Cobalt', value: '#1532f0' },
        { label: 'Forest', value: '#0e5f3c' },
        { label: 'Warm Maroon', value: '#8a2347' },
    ],
    BACKGROUND: [
        { label: 'Warm Paper', value: '#faf8f5' },
        { label: 'Pure White', value: '#ffffff' },
        { label: 'Cream', value: '#f1ebd9' },
        { label: 'Muted Sky', value: '#e2ebfc' },
        { label: 'Acid Lime', value: '#e8f9b8' },
    ],
};
