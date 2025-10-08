import { useEffect, useMemo, useRef, useState, Children } from "react";
import type { PropsWithChildren } from "react";
import PresentationControls from "./PresentationControls";

type Props = PropsWithChildren<{
  title: string;
  index: number;
  total: number;
  onPrev?: () => void;
  onNext?: () => void;
  showSpeakerOverlay?: boolean;
  onToggleSpeakerOverlay?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  laserEnabled?: boolean;
  laserPosition?: { x: number; y: number } | null;
  onLaserMove?: (position: { x: number; y: number } | null) => void;
  onToggleLaser?: () => void;
}>;

export default function Deck({
  title,
  index,
  total,
  children,
  onPrev,
  onNext,
  showSpeakerOverlay,
  onToggleSpeakerOverlay,
  onKeyDown,
  laserEnabled = false,
  laserPosition,
  onLaserMove,
  onToggleLaser,
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [viewport, setViewport] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  }));

  useEffect(() => {
    hostRef.current?.focus();
  }, []);

  const handleKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) {
      return;
    }
    if (event.key === "ArrowRight" || event.key === " ") onNext?.();
    if (event.key === "ArrowLeft") onPrev?.();
    if (event.key.toLowerCase() === "n") onToggleSpeakerOverlay?.();
    if (event.key === "Escape") window.location.href = "/";
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!laserEnabled) {
      onLaserMove?.(null);
    }
  }, [laserEnabled, onLaserMove]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!laserEnabled) {
      return;
    }
    const width =
      viewport.width || (typeof window !== "undefined" ? window.innerWidth : 0);
    const height =
      viewport.height ||
      (typeof window !== "undefined" ? window.innerHeight : 0);
    if (!width || !height) {
      return;
    }
    const centerX = width / 2;
    const centerY = height / 2;
    const next = {
      x: Math.min(Math.max((event.clientX - centerX) / centerX, -1), 1),
      y: Math.min(Math.max((event.clientY - centerY) / centerY, -1), 1),
    };
    onLaserMove?.(next);
  };

  const handlePointerLeave = () => {
    if (!laserEnabled) {
      return;
    }
    onLaserMove?.(null);
  };

  const pixelPosition = useMemo(() => {
    if (!laserPosition) {
      return null;
    }
    const width =
      viewport.width || (typeof window !== "undefined" ? window.innerWidth : 0);
    const height =
      viewport.height ||
      (typeof window !== "undefined" ? window.innerHeight : 0);
    if (!width || !height) {
      return null;
    }
    const centerX = width / 2;
    const centerY = height / 2;
    return {
      x: centerX + laserPosition.x * centerX,
      y: centerY + laserPosition.y * centerY,
    };
  }, [laserPosition, viewport.height, viewport.width]);

  const hideCursor = laserEnabled && pixelPosition;
  const pointerLabel = laserEnabled ? "#1" : "Off";

  return (
    <section
      ref={hostRef}
      tabIndex={0}
      onKeyDown={handleKey}
      onMouseDown={() => hostRef.current?.focus()}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="w-full h-full outline-none"
      aria-roledescription="deck"
      aria-label={title}
      aria-live="polite"
      style={hideCursor ? { cursor: "none" } : undefined}
    >
      {pixelPosition ? (
        <div className="pointer-events-none fixed inset-0 z-[60]">
          <div
            className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/90 shadow-[0_0_12px_rgba(244,63,94,0.7)]"
            style={{
              left: `${pixelPosition.x}px`,
              top: `${pixelPosition.y}px`,
            }}
          />
          <div
            className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-rose-400/40"
            style={{
              left: `${pixelPosition.x}px`,
              top: `${pixelPosition.y}px`,
            }}
          />
        </div>
      ) : null}
      <div className="w-full h-full">
        {/* Stage area */}
        <div className="mx-auto max-w-[1100px] h-full">
          {Children.toArray(children)[index]}
        </div>
      </div>

      {/* Progress + controls (top-right) */}
      <div className="fixed top-4 right-4 flex items-center gap-2 rounded-md bg-black/30 px-3 py-2 text-xs text-white/80 shadow-lg shadow-black/30 backdrop-blur">
        <div className="select-none">
          <span className="font-semibold text-white">{index + 1}</span>
          <span className="mx-1 text-white/50">/</span>
          <span>{total + 1}</span>
        </div>
        {onToggleLaser ? (
          <button
            type="button"
            onClick={onToggleLaser}
            className={`inline-flex items-center gap-1 rounded px-2 py-1 font-semibold transition ${
              laserEnabled
                ? "bg-rose-500/90 text-white shadow-inner shadow-rose-400/70"
                : "border border-white/20 bg-black/10 text-white/80 hover:border-white/40 hover:text-white"
            }`}
            aria-pressed={laserEnabled}
            aria-label="Toggle laser pointer"
          >
            <span className="text-[10px] uppercase tracking-wide">
              Pointer
            </span>
            <span className="text-[11px]">{pointerLabel}</span>
          </button>
        ) : null}
        {onToggleSpeakerOverlay ? (
          <button
            type="button"
            onClick={onToggleSpeakerOverlay}
            className={`inline-flex items-center gap-1 rounded px-2 py-1 font-semibold transition ${
              showSpeakerOverlay
                ? "bg-white/20 text-white shadow-inner shadow-white/30"
                : "border border-white/20 bg-black/10 text-white/80 hover:border-white/40 hover:text-white"
            }`}
            aria-pressed={showSpeakerOverlay}
            aria-label="Toggle speaker notes"
          >
            <span className="text-[10px] uppercase tracking-wide">Notes</span>
            <span className="text-[11px]">
              {showSpeakerOverlay ? "On" : "Off"}
            </span>
          </button>
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => (window.location.href = "/")}
        className="group fixed top-4 left-4 p-2 rounded-md text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--surface)]/60 transition-colors"
        aria-label="Exit presentation"
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          aria-hidden="true"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
      <PresentationControls
        index={index}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      />
    </section>
  );
}
