'use client';

import { CSSProperties, useEffect, useState } from 'react';

const skyImage = "url('/images/parallax-sky-clouds.png')";
const valleyImage = "url('/images/parallax-valley.png')";

const layerStyle = (scrollY: number, speed: number, extraScale = 1): CSSProperties => ({
  transform: `translate3d(0, ${scrollY * speed}px, 0) scale(${extraScale})`,
});

const FloatingLettersBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReducedMotion(motionQuery.matches);

    updateMotionPreference();
    motionQuery.addEventListener('change', updateMotionPreference);

    return () => motionQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setScrollY(0);
      return;
    }

    let frame = 0;
    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrollY(window.scrollY));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden bg-[#f7efd9] pointer-events-none print:hidden"
    >
      <div
        className="absolute -inset-x-8 top-[-30%] h-[160%] opacity-95 will-change-transform"
        style={{
          transformOrigin: 'top center',
          ...layerStyle(scrollY, -0.035, 1),
        }}
      >
        <div
          className="h-[40%] bg-cover bg-center"
          style={{
            backgroundImage: skyImage,
            maskImage: 'linear-gradient(to bottom, black 0%, black 78%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 78%, transparent 100%)',
          }}
        />
        <div
          className="mt-[-7%] h-[67%] bg-cover bg-top opacity-95"
          style={{ backgroundImage: valleyImage }}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[10%] bg-gradient-to-b from-white/0 to-white" />
    </div>
  );
};

export default FloatingLettersBackground;
