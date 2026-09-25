// ─── lib/data.js — Static data for DOT DOT. QR Creation Studio ─────────────

// Marquee hallmark words and badges
export const MARQUEE_ITEMS = [
    { id: "DOT_DOT", label: "DOT DOT.", type: "brand" },
    { id: "VECTOR_SVG", label: "VECTOR SVG", type: "format" },
    { id: "CLIENT_SIDE", label: "CLIENT-SIDE", type: "tech" },
    { id: "ERROR_CORRECTION", label: "ERROR CORRECTION", type: "feature" },
    { id: "ZERO_TRACKERS", label: "ZERO TRACKERS", type: "privacy" },
    { id: "HIGH_DENSITY", label: "HIGH DENSITY", type: "spec" },
    { id: "REED_SOLOMON", label: "REED-SOLOMON", type: "math" },
    { id: "INSTANT_SCAN", label: "INSTANT SCAN", type: "speed" },
];

// Marquee background colors
export const colors = [
    "var(--color-green)",
    "var(--color-lightblue)",
    "var(--color-darkblue)",
    "var(--color-lightgreen)",
    "var(--color-orange)",
    "var(--color-maroon)",
    "var(--color-pink)",
];

// Footer social links
export const SOCIAL_ICONS = [
    {
        href: '#studio',
        label: 'Studio',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-wiggle-target="" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>'
    },
    {
        href: '#types',
        label: 'Types',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-wiggle-target="" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>'
    }
];

// Elastic Type cards data
export const CARDS_DATA = [
    {
        color: 'green',
        type: 'URL',
        sticker: 'camera',
        title: 'web & url',
        badge: 'HTTP/S',
        services: ['Standard Web Addresses', 'Portfolio Deep-Routing', 'Campaign Portals', 'Custom Scheme Links', 'Subdomain Anchors']
    },
    {
        color: 'darkblue',
        type: 'TEXT',
        sticker: 'phone',
        title: 'plain text',
        badge: 'RAW',
        services: ['Plain Multiline Notes', 'Cryptographic Public Keys', 'Code & Prompts', 'Unicode Support', 'Offline Handshakes']
    },
    {
        color: 'orange',
        type: 'EMAIL',
        sticker: 'smiley',
        title: 'email dispatch',
        badge: 'MAILTO',
        services: ['Pre-filled Subject Lines', 'Ready Body Templates', 'Direct Inbox Dispatch', 'RSVP Handlers', 'Client Inquiries']
    },
    {
        color: 'maroon',
        type: 'PHONE',
        sticker: 'hand',
        title: 'telephone',
        badge: 'TEL',
        services: ['Direct Touch-to-Call', 'International Format', 'Support Hotlines', 'Directory Contact Cards', 'Instant Dialing']
    },
    {
        color: 'pink',
        type: 'WIFI',
        sticker: 'heart',
        title: 'wi-fi network',
        badge: '802.11',
        services: ['WPA / WPA2 / WPA3', 'Legacy WEP Networks', 'Open Guest Access', 'Hidden SSID Escape', 'Zero-Typing Login']
    }
];

// ─── Wiggle Intensity Config ────────────────────────────────────────────────
export const WIGGLE_CONFIG = {
    logoDotDot: 4,
    socials: 5,
    jobHeading: 1,
    googleMap: 1,
    email: 1,
    whatsapp: 1,
};

// ─── Animation Configurations ─────────────────────────────────────────────
export const ANIMATION_CONFIG = {
    transitionScribble: {
        strokeWidthStart: "8%",
        strokeWidthMax: "31%",
        scale: 0.7,
        durationIn: 1.8,
        durationOut: 2.2
    }
};
