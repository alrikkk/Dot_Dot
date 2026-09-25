'use client';

import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { gsap } from 'gsap';

const HeroVideoCard = forwardRef(function HeroVideoCard({ isOpen, onClose }, ref) {
    const cardRef = useRef(null);
    const videoRef = useRef(null);
    const isAnimatingRef = useRef(false);
    const hasBeenDraggedRef = useRef(false);
    const posRef = useRef({ x: 0, y: 0 });
    const qrOriginRef = useRef({ x: 0, y: 0 });
    const isDraggingRef = useRef(false);
    const dragStartRef = useRef({ pointerX: 0, pointerY: 0, posX: 0, posY: 0 });
    const [isGrabbing, setIsGrabbing] = useState(false);

    // Close animation handler
    const handleClose = useCallback(() => {
        if (isAnimatingRef.current) return;
        const card = cardRef.current;
        const video = videoRef.current;
        const isReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Pause video immediately
        if (video) {
            video.pause();
        }

        if (card) {
            isAnimatingRef.current = true;
            if (isReducedMotion) {
                gsap.to(card, {
                    opacity: 0,
                    duration: 0.15,
                    onComplete: () => {
                        if (video) video.currentTime = 0;
                        isAnimatingRef.current = false;
                        onClose();
                    },
                });
            } else {
                // If dragged away, retract cleanly at current position.
                // If still at origin, retract back toward QR.
                const targetX = hasBeenDraggedRef.current ? posRef.current.x : qrOriginRef.current.x;
                const targetY = hasBeenDraggedRef.current ? posRef.current.y : qrOriginRef.current.y;

                gsap.to(card, {
                    x: targetX,
                    y: targetY,
                    scale: 0.15,
                    opacity: 0,
                    rotation: hasBeenDraggedRef.current ? 3 : 6,
                    duration: 0.32,
                    ease: 'power2.in',
                    onComplete: () => {
                        if (video) video.currentTime = 0;
                        isAnimatingRef.current = false;
                        onClose();
                    },
                });
            }
        } else {
            if (video) video.currentTime = 0;
            onClose();
        }
    }, [onClose]);

    // Expose close method to parent for QR toggle
    useImperativeHandle(ref, () => ({
        close: handleClose,
    }));

    // Opening animation & positioning near QR
    useEffect(() => {
        if (!isOpen) return;

        const card = cardRef.current;
        const video = videoRef.current;
        const isReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        hasBeenDraggedRef.current = false;

        // Calculate QR position in current viewport coordinates
        const qrEl = document.querySelector('.hero-qr-frame');
        const qrRect = qrEl ? qrEl.getBoundingClientRect() : null;

        const winW = window.innerWidth;
        const winH = window.innerHeight;
        const cardW = Math.min(winW - 24, winW > 768 ? 400 : 360);
        const cardH = 265;

        let initX = 20;
        let initY = 80;
        let qrCenterX = winW / 2;
        let qrCenterY = winH / 2;

        if (qrRect) {
            qrCenterX = qrRect.left + qrRect.width / 2;
            qrCenterY = qrRect.top + qrRect.height / 2;

            if (winW > 860) {
                // Desktop: Place beside QR
                initX = qrRect.right + 24;
                initY = qrRect.top + (qrRect.height - cardH) / 2;
                if (initX + cardW > winW - 20) {
                    initX = Math.max(20, qrRect.left - cardW - 24);
                }
            } else {
                // Mobile/Tablet: Centered near QR
                initX = (winW - cardW) / 2;
                initY = qrRect.bottom + 20;
                if (initY + cardH > winH - 20) {
                    initY = Math.max(20, winH - cardH - 24);
                }
            }
        } else {
            initX = (winW - cardW) / 2;
            initY = winH > 600 ? 120 : 40;
        }

        // Clamp inside viewport
        initX = Math.max(12, Math.min(winW - cardW - 12, initX));
        initY = Math.max(12, Math.min(winH - cardH - 12, initY));

        posRef.current = { x: initX, y: initY };
        qrOriginRef.current = {
            x: qrCenterX - cardW / 2,
            y: qrCenterY - cardH / 2,
        };

        if (card) {
            isAnimatingRef.current = true;
            if (isReducedMotion) {
                gsap.set(card, { x: initX, y: initY });
                gsap.fromTo(card, { opacity: 0 }, { opacity: 1, duration: 0.2, onComplete: () => { isAnimatingRef.current = false; } });
            } else {
                gsap.fromTo(
                    card,
                    {
                        x: qrOriginRef.current.x,
                        y: qrOriginRef.current.y,
                        scale: 0.15,
                        opacity: 0,
                        rotation: 6,
                    },
                    {
                        x: initX,
                        y: initY,
                        scale: 1,
                        opacity: 1,
                        rotation: -1.5,
                        duration: 0.48,
                        ease: 'back.out(1.25)',
                        onComplete: () => {
                            isAnimatingRef.current = false;
                        },
                    }
                );
            }
        }

        // Autoplay muted when opened
        if (video) {
            video.currentTime = 0;
            video.play().catch(() => {});
        }
    }, [isOpen]);

    // Handle drag pointer events
    const handlePointerDown = (e) => {
        // Do not drag if interacting with controls or buttons
        if (e.target.closest('button, video, a, input, select, textarea')) {
            return;
        }

        e.preventDefault();
        const card = cardRef.current;
        if (!card || isAnimatingRef.current) return;

        isDraggingRef.current = true;
        hasBeenDraggedRef.current = true;
        setIsGrabbing(true);

        card.setPointerCapture(e.pointerId);

        dragStartRef.current = {
            pointerX: e.clientX,
            pointerY: e.clientY,
            posX: posRef.current.x,
            posY: posRef.current.y,
        };

        // Subtle physical lift response
        gsap.to(card, {
            scale: 1.03,
            duration: 0.15,
            ease: 'power1.out',
        });
    };

    const handlePointerMove = (e) => {
        if (!isDraggingRef.current) return;

        const card = cardRef.current;
        if (!card) return;

        const dx = e.clientX - dragStartRef.current.pointerX;
        const dy = e.clientY - dragStartRef.current.pointerY;

        let nextX = dragStartRef.current.posX + dx;
        let nextY = dragStartRef.current.posY + dy;

        // Viewport boundaries: Keep bubble fully accessible within screen
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        const cardW = card.offsetWidth || 380;
        const cardH = card.offsetHeight || 260;

        const minX = 8;
        const maxX = Math.max(8, winW - cardW - 8);
        const minY = 8;
        const maxY = Math.max(8, winH - cardH - 8);

        nextX = Math.max(minX, Math.min(maxX, nextX));
        nextY = Math.max(minY, Math.min(maxY, nextY));

        posRef.current = { x: nextX, y: nextY };

        // Subtle dynamic tilt based on horizontal drag movement
        const tilt = Math.max(-6, Math.min(6, (dx * 0.08) - 1.5));

        gsap.set(card, {
            x: nextX,
            y: nextY,
            rotation: tilt,
        });
    };

    const handlePointerUp = (e) => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;
        setIsGrabbing(false);

        const card = cardRef.current;
        if (card) {
            try {
                card.releasePointerCapture(e.pointerId);
            } catch {
                // Ignore if pointer capture already released
            }

            // Smooth physical settling
            gsap.to(card, {
                scale: 1,
                rotation: -1.5,
                duration: 0.35,
                ease: 'elastic.out(1, 0.5)',
            });
        }
    };

    // Keep bubble inside viewport if window resizes
    useEffect(() => {
        if (!isOpen) return;

        const handleResize = () => {
            const card = cardRef.current;
            if (!card) return;

            const winW = window.innerWidth;
            const winH = window.innerHeight;
            const cardW = card.offsetWidth || 380;
            const cardH = card.offsetHeight || 260;

            let curX = posRef.current.x;
            let curY = posRef.current.y;

            curX = Math.max(8, Math.min(winW - cardW - 8, curX));
            curY = Math.max(8, Math.min(winH - cardH - 8, curY));

            posRef.current = { x: curX, y: curY };
            gsap.set(card, { x: curX, y: curY });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen]);

    // Keyboard Escape to close
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleClose]);

    if (!isOpen) return null;

    return (
        <div className="hero-video-container" aria-live="polite">
            {/* Draggable Red-Circle Video Bubble Card */}
            <div
                className={`hero-video-card ${isGrabbing ? 'is-grabbing' : ''}`}
                ref={cardRef}
                role="dialog"
                aria-modal="true"
                aria-label="DOT DOT. Walkthrough Video Bubble"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            >
                {/* Tactile Editorial Header & Drag Handle */}
                <div className="hero-video-topbar">
                    <div className="hero-video-label">
                        <span className="hero-video-dot" aria-hidden="true" />
                        <span className="hero-video-title">WALKTHROUGH</span>
                        {/* Grip indicator */}
                        <span className="hero-video-drag-hint" aria-hidden="true">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <circle cx="2.5" cy="2.5" r="1" fill="currentColor" opacity="0.4" />
                                <circle cx="7.5" cy="2.5" r="1" fill="currentColor" opacity="0.4" />
                                <circle cx="2.5" cy="5" r="1" fill="currentColor" opacity="0.4" />
                                <circle cx="7.5" cy="5" r="1" fill="currentColor" opacity="0.4" />
                                <circle cx="2.5" cy="7.5" r="1" fill="currentColor" opacity="0.4" />
                                <circle cx="7.5" cy="7.5" r="1" fill="currentColor" opacity="0.4" />
                            </svg>
                        </span>
                    </div>
                    <button
                        type="button"
                        className="hero-video-close-btn"
                        onClick={handleClose}
                        aria-label="Close walkthrough video"
                    >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M1 1L11 11M1 11L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* 16:9 Video Canvas */}
                <div className="hero-video-screen">
                    <video
                        ref={videoRef}
                        src="/videos/dot-dot-demo.mp4"
                        controls
                        muted
                        playsInline
                        preload="none"
                        className="hero-video-el"
                    />
                </div>
            </div>
        </div>
    );
});

export default HeroVideoCard;
