import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, RotateCcw } from 'lucide-react';

const getImageStyle = (is360Mode, zoomed, tilt, dragStart) => {
  if (is360Mode) {
    return {
      transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      transition: dragStart ? 'none' : 'transform 0.15s ease-out',
    };
  }
  if (zoomed) {
    return { transform: 'scale(1.55)', cursor: 'zoom-out', transition: 'transform 0.4s ease' };
  }
  return { transform: 'scale(1)', cursor: 'zoom-in', transition: 'transform 0.4s ease' };
};

export const ProductGallery = ({ gallery, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [is360Mode, setIs360Mode] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState(null);
  const containerRef = useRef(null);

  const currentMedia = gallery[currentIndex];
  const isImage = currentMedia.type === 'image';

  const goNext = () => { setCurrentIndex((p) => (p + 1) % gallery.length); setZoomed(false); };
  const goPrev = () => { setCurrentIndex((p) => (p - 1 + gallery.length) % gallery.length); setZoomed(false); };

  const handleMouseMove = (e) => {
    if (!is360Mode || !isImage || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -18, y: x * 18 });
  };

  const handleDragMove = (e) => {
    if (!is360Mode || dragStart === null) return;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const delta = clientX - dragStart.x;
    const steps = Math.round(delta / 60);
    const newIdx = ((dragStart.index - steps) % gallery.length + gallery.length) % gallery.length;
    if (newIdx !== currentIndex) setCurrentIndex(newIdx);
  };

  const handlePointerMove = (e) => {
    handleMouseMove(e);
    handleDragMove(e);
  };

  const handleDragStart = (e) => {
    if (!is360Mode) return;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    setDragStart({ x: clientX, index: currentIndex });
  };

  const handleDragEnd = () => setDragStart(null);

  const toggle360 = () => {
    setIs360Mode((v) => !v);
    setTilt({ x: 0, y: 0 });
    setZoomed(false);
  };

  const handleImageClick = () => {
    if (!is360Mode) setZoomed((z) => !z);
  };

  const imageStyle = getImageStyle(is360Mode, zoomed, tilt, dragStart);

  return (
    <div className="relative bg-gradient-deep flex flex-col items-center justify-center p-6 lg:p-10 select-none">
      {/* 360° toggle */}
      <div className="absolute top-6 left-6 z-20">
        <button
          data-testid="toggle-360-btn"
          onClick={toggle360}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-light tracking-widest uppercase border transition-all duration-300 ${
            is360Mode
              ? 'bg-primary text-primary-foreground border-primary shadow-gold-glow'
              : 'bg-card/80 text-foreground/60 border-primary/20 hover:border-primary/50 hover:text-foreground'
          }`}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          360°
        </button>
      </div>

      {/* Main viewer */}
      <div
        ref={containerRef}
        className={`relative w-full flex-1 flex items-center justify-center overflow-hidden ${
          is360Mode && isImage ? 'cursor-grab active:cursor-grabbing' : ''
        }`}
        onMouseMove={handlePointerMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handlePointerMove}
        onTouchEnd={handleDragEnd}
      >
        {currentMedia.type === 'video' ? (
          <video
            src={currentMedia.url}
            className="max-w-full max-h-full object-contain"
            controls
            autoPlay
            loop
            muted
          />
        ) : (
          <div className="relative" style={imageStyle} onClick={handleImageClick}>
            <img
              src={currentMedia.url}
              alt={productName}
              className="max-w-full max-h-[65vh] object-contain"
              draggable={false}
            />
            {!is360Mode && !zoomed && (
              <div className="absolute bottom-2 right-2 h-7 w-7 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20 flex items-center justify-center pointer-events-none">
                <ZoomIn className="h-3.5 w-3.5 text-primary" />
              </div>
            )}
          </div>
        )}

        {/* 360° drag hint */}
        {is360Mode && isImage && !dragStart && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-full text-xs text-foreground/60 font-light tracking-wide pointer-events-none">
            ← Ziehen zum Drehen →
          </div>
        )}

        {/* Navigation arrows */}
        {gallery.length > 1 && !is360Mode && !zoomed && (
          <>
            <button
              onClick={goPrev}
              data-testid="gallery-prev-btn"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-card/90 backdrop-blur-sm border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 z-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goNext}
              data-testid="gallery-next-btn"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-card/90 backdrop-blur-sm border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 z-10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {gallery.length > 1 && (
        <div className="flex gap-2 mt-4 flex-shrink-0">
          {gallery.map((media, idx) => (
            <button
              key={media.url}
              onClick={() => { setCurrentIndex(idx); setZoomed(false); }}
              data-testid={`gallery-thumb-${idx}`}
              className={`h-14 w-14 rounded-lg overflow-hidden border-2 transition-all duration-300 relative flex-shrink-0 ${
                idx === currentIndex
                  ? 'border-primary shadow-gold-glow'
                  : 'border-primary/20 hover:border-primary/50'
              }`}
            >
              {media.type === 'video' ? (
                <>
                  <video src={media.url} className="w-full h-full object-cover" muted />
                  <div className="absolute inset-0 flex items-center justify-center bg-background/30">
                    <div className="w-5 h-5 rounded-full bg-primary/80 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3 2v12l10-6z" />
                      </svg>
                    </div>
                  </div>
                </>
              ) : (
                <img src={media.url} alt={`Ansicht ${idx + 1}`} className="w-full h-full object-cover" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
