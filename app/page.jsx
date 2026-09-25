'use client';

import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import QRStudio from '@/components/QRStudio/QRStudio';
import HorizontalWords from '@/components/HorizontalWords';
import MotionCards from '@/components/MotionCards';
import ServiceCards from '@/components/ServiceCards';
import DoubleMarquee from '@/components/DoubleMarquee';
import Footer from '@/components/Footer';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';

export default function Home() {
    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />

            <header className="main-header">
                <Navbar />
                <Hero />
            </header>

            <QRStudio />

            <HorizontalWords />

            <main>
                <div className="content-section motion-cards-wrapper">
                    <MotionCards />
                </div>
                <div className="content-section service-cards-wrapper">
                    <ServiceCards />
                </div>
            </main>

            <section className="Double-marquee">
                <DoubleMarquee />
            </section>

            <footer className="main-footer">
                <Footer />
            </footer>

            <TransitionScribble />
        </>
    );
}
