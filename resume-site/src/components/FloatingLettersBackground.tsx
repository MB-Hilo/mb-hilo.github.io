'use client';
import { useEffect, useRef, useState } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
}

interface Cloud {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  opacity: number;
}

const FloatingLettersBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const cloudsRef = useRef<Cloud[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const [manualHour, setManualHour] = useState<number | null>(null);
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
  const [scrollY, setScrollY] = useState(0);

  const getTimeOfDay = (hour?: number) => {
    const currentHour = hour ?? new Date().getHours();
    
    if (currentHour >= 5 && currentHour < 7) return 'sunrise';
    if (currentHour >= 7 && currentHour < 17) return 'day';
    if (currentHour >= 17 && currentHour < 19) return 'sunset';
    if (currentHour >= 19 && currentHour < 21) return 'dusk';
    if (currentHour >= 21 && currentHour < 23) return 'twilight';
    return 'night';
  };

  const getTimeLabel = (hour: number) => {
    const timeOfDay = getTimeOfDay(hour);
    return `${hour.toString().padStart(2, '0')}:00 - ${timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}`;
  };

  const getGradientColors = (timeOfDay: string) => {
    switch (timeOfDay) {
      case 'sunrise':
        // Cold night blue → faint purple → warm pink → orange → yellow glow near horizon
        return ['#0B1D51', '#3D2C8D', '#FF5E78', '#FF914D', '#FFD580'];

      case 'day':
        // Deep blue overhead → lighter sky blue → very pale blue → soft white haze → slight yellow tinge
        return ['#1E3A8A', '#2563EB', '#60A5FA', '#E0F6FF', '#FFFACD'];

      case 'sunset':
        // Deep blue sky above → magenta/purple band → intense red/orange → peachy glow → golden yellow at horizon
        return ['#1E3A5F', '#8B5CF6', '#FF4500', '#FF9E80', '#FFD580'];

      case 'dusk':
        // Blue fading into purple → lavender → pale pinkish band near horizon
        return ['#0D1B2A', '#1B263B', '#4B0082', '#9370DB', '#FFC1CC'];

      case 'twilight':
        // Dark navy → indigo → soft slate → faint periwinkle → pale starlight gray near horizon
        return ['#000814', '#001D3D', '#191970', '#6A5ACD', '#B0C4DE'];

      case 'night':
        // Almost black → deep navy → midnight blue → faint dark slate → subtle gray haze near horizon
        return ['#000000', '#0C1821', '#1B263B', '#2F2F4F', '#4A5568'];

      default:
        return ['#1E3A8A', '#2563EB', '#60A5FA', '#E0F6FF', '#FFFACD'];
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const createStars = () => {
      // Only create stars if they don't exist
      if (starsRef.current.length > 0) return;
      
      const stars: Star[] = [];
      const numStars = 100;

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height + 1000), // Extended range for parallax
          size: Math.random() * 2 + 0.5,
          brightness: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01
        });
      }

      starsRef.current = stars;
    };

    const createClouds = () => {
      // Only create clouds if they don't exist
      if (cloudsRef.current.length > 0) return;
      
      const clouds: Cloud[] = [];
      const numClouds = 8;

      for (let i = 0; i < numClouds; i++) {
        clouds.push({
          x: Math.random() * (canvas.width + 200) - 100,
          y: Math.random() * (canvas.height + 500), // Extended range for parallax
          width: Math.random() * 150 + 80,
          height: Math.random() * 40 + 30,
          speed: Math.random() * 0.2 + 0.1,
          opacity: Math.random() * 0.3 + 0.1
        });
      }

      cloudsRef.current = clouds;
    };

    const drawGradient = (timeOfDay: string) => {
      const colors = getGradientColors(timeOfDay);
      let gradient: CanvasGradient;

      // Parallax offset based on scroll (gradient moves slower than scroll)
      const parallaxOffset = scrollY * 0.3;

      if (gradientType === 'radial') {
        // Radial gradient from center-top to edges with parallax
        const centerX = canvas.width / 2;
        const centerY = (canvas.height * 0.3) - parallaxOffset;
        const radius = Math.max(canvas.width, canvas.height) * 0.8;
        gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      } else {
        // Linear gradient with parallax offset
        const startY = -parallaxOffset;
        const endY = canvas.height - parallaxOffset;
        gradient = ctx.createLinearGradient(0, startY, 0, endY);
      }
      
      // Concentrate color changes in bottom 3rd (67% to 100%)
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(0.4, colors[1]);
      gradient.addColorStop(0.67, colors[2]);
      gradient.addColorStop(0.8, colors[3]);
      gradient.addColorStop(1, colors[4]);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawStars = (timeOfDay: string) => {
      if (timeOfDay === 'night' || timeOfDay === 'twilight' || timeOfDay === 'dusk') {
        const time = Date.now() * 0.001;
        
        starsRef.current.forEach(star => {
          const twinkle = Math.sin(time * star.twinkleSpeed) * 0.3 + 0.7;
          const alpha = star.brightness * twinkle;
          
          let opacity = 1;
          if (timeOfDay === 'dusk') opacity = 0.6;
          if (timeOfDay === 'twilight') opacity = 0.8;

          // Parallax effect for stars (slower movement)
          const parallaxStarY = star.y - (scrollY * 0.1);

          // Only draw stars that are visible on screen
          if (parallaxStarY > -50 && parallaxStarY < canvas.height + 50) {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * opacity})`;
            ctx.beginPath();
            ctx.arc(star.x, parallaxStarY, star.size, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }
    };

    const drawCloud = (cloud: Cloud) => {
      // Parallax effect for clouds (medium movement)
      const parallaxCloudY = cloud.y - (scrollY * 0.2);
      
      // Only draw clouds that are visible on screen
      if (parallaxCloudY > -cloud.height - 50 && parallaxCloudY < canvas.height + 50) {
        ctx.fillStyle = `rgba(255, 255, 255, ${cloud.opacity})`;
        
        const circles = 5;
        for (let i = 0; i < circles; i++) {
          const offsetX = (i / circles) * cloud.width;
          const offsetY = Math.sin(i * 0.5) * cloud.height * 0.2;
          const radius = cloud.height * (0.5 + Math.sin(i * 0.8) * 0.3);
          
          ctx.beginPath();
          ctx.arc(cloud.x + offsetX, parallaxCloudY + offsetY, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const drawClouds = (timeOfDay: string) => {
      if (timeOfDay === 'day' || timeOfDay === 'sunrise' || timeOfDay === 'sunset') {
        cloudsRef.current.forEach(cloud => {
          // Only update horizontal movement, not vertical position
          cloud.x += cloud.speed;
          
          // Wrap around horizontally only
          if (cloud.x > canvas.width + 200) {
            cloud.x = -cloud.width - 100;
          }

          drawCloud(cloud);
        });
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      const timeOfDay = getTimeOfDay(manualHour ?? undefined);
      
      drawGradient(timeOfDay);
      drawStars(timeOfDay);
      drawClouds(timeOfDay);

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      updateCanvasSize();
      // Don't recreate stars and clouds on resize, they maintain their positions
      if (starsRef.current.length === 0) createStars();
      if (cloudsRef.current.length === 0) createClouds();
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    updateCanvasSize();
    createStars();
    createClouds();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [manualHour, gradientType, scrollY]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 hidden md:block"
      />
      
      {/* Time Control Slider */}
      <div className="fixed bottom-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200 print:hidden">
        <div className="text-xs text-gray-600 mb-2 font-medium">
          {manualHour !== null ? getTimeLabel(manualHour) : 'Auto - ' + getTimeLabel(new Date().getHours())}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">🌅</span>
          <input
            type="range"
            min="0"
            max="23"
            value={manualHour ?? new Date().getHours()}
            onChange={(e) => setManualHour(parseInt(e.target.value))}
            className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-xs text-gray-500">🌙</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <button
            onClick={() => setManualHour(null)}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            Reset to current time
          </button>
          <button
            onClick={() => setGradientType(gradientType === 'linear' ? 'radial' : 'linear')}
            className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded transition-colors"
          >
            {gradientType === 'linear' ? '📐 Linear' : '⭕ Radial'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </>
  );
};

export default FloatingLettersBackground;
