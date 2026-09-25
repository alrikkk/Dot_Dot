import './globals.css';

export const metadata = {
    title: 'DOT DOT. — Make it scannable.',
    description: 'DOT DOT. is an interactive QR creation studio. Craft high-density, vector-pure scannable marks directly in your browser with zero data trackers.',
    icons: {
        icon: '/favicon.svg',
    },
    openGraph: {
        title: 'DOT DOT. — Make it scannable.',
        description: 'Interactive QR creation studio. Client-side, vector-pure, physical-grade scannable marks.',
        siteName: 'DOT DOT.',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
