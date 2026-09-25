'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function CursorBubble() {
    useEffect(() => {
        // Disable on touch devices
        if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
            return;
        }

        const cursorBubble = document.querySelector('.cursor-bubble');
        if (!cursorBubble) return;

        const xTo = gsap.quickTo(cursorBubble, 'x', { duration: 0.5, ease: 'power3' });
        const yTo = gsap.quickTo(cursorBubble, 'y', { duration: 0.5, ease: 'power3' });

        let isHovering = false;
        gsap.set(cursorBubble, { rotation: -30 });

        const onMouseMove = (e) => {
            xTo(e.clientX + 14);
            yTo(e.clientY - 42);
        };

        const onMouseOver = (e) => {
            // Disappear over native text inputs and controls
            if (e.target.closest('input, textarea, select, .qr-color-input-wrap')) {
                gsap.to(cursorBubble, { opacity: 0, scale: 0, duration: 0.2 });
                isHovering = false;
                return;
            }

            const scanTarget = e.target.closest('.qr-preview-card, .hero-qr-frame');
            const dragTarget = e.target.closest('.motion-card__card, .motion-card__floating-label');
            const logoTarget = e.target.closest('.brand-logo, .navbar-brand-link');
            const clickTarget = e.target.closest('button, a, .card, .qr-type-btn, .qr-swatch, .qr-ec-tab, .single-social, .footer-whatsapp, .footer-email');

            if (scanTarget) {
                cursorBubble.textContent = 'SCAN ME';
                cursorBubble.style.backgroundColor = 'var(--color-vermilion)';
                cursorBubble.style.color = '#fff';
                triggerBubble();
            } else if (dragTarget) {
                cursorBubble.textContent = 'DRAG';
                cursorBubble.style.backgroundColor = 'var(--color-cobalt)';
                cursorBubble.style.color = '#fff';
                triggerBubble();
            } else if (logoTarget) {
                cursorBubble.textContent = 'TOP';
                cursorBubble.style.backgroundColor = 'var(--color-lime)';
                cursorBubble.style.color = '#000';
                triggerBubble();
            } else if (clickTarget) {
                cursorBubble.textContent = 'CLICK';
                cursorBubble.style.backgroundColor = 'var(--color-pink)';
                cursorBubble.style.color = '#000';
                triggerBubble();
            } else if (isHovering) {
                hideBubble();
            }
        };

        const triggerBubble = () => {
            if (!isHovering) {
                isHovering = true;
                gsap.killTweensOf(cursorBubble, 'opacity,scale,rotation');
                gsap.to(cursorBubble, {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 1.2,
                    delay: 0.05,
                    ease: 'elastic.out(1, 0.4)',
                });
            }
        };

        const hideBubble = () => {
            if (isHovering) {
                isHovering = false;
                gsap.killTweensOf(cursorBubble, 'opacity,scale,rotation');
                gsap.to(cursorBubble, {
                    opacity: 0,
                    scale: 0,
                    rotation: -30,
                    duration: 0.25,
                    ease: 'sine.inOut',
                });
            }
        };

        const onMouseLeave = () => {
            hideBubble();
        };

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseleave', onMouseLeave);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    return <div className="cursor-bubble">CLICK</div>;
}
