export default function PremiumBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* 1. Vercel-style Blueprint Grid (Titik-titik presisi) */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', 
          backgroundSize: '32px 32px' 
        }}
      ></div>

      {/* 2. Linear-style Film Grain / Noise Overlay */}
      {/* SVG filter ini meng-generate noise statis secara hardware-accelerated */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] mix-blend-overlay">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      
      {/* Gradient Vignette untuk membuat tepi layar lebih gelap */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#030303_100%)] opacity-80"></div>
    </div>
  );
}

