import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  Children,
} from "react";
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
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [stageRect, setStageRect] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

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

  const updateStageRect = useCallback(() => {
    if (!stageRef.current) {
      setStageRect(null);
      return;
    }
    const rect = stageRef.current.getBoundingClientRect();
    setStageRect({
      left: rect.left,
      top: rect.top,
      width: rect.width || 1,
      height: rect.height || 1,
    });
  }, []);

  useEffect(() => {
    updateStageRect();
  }, [updateStageRect, index]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    updateStageRect();
    window.addEventListener("resize", updateStageRect);
    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && stageRef.current) {
      observer = new ResizeObserver(() => updateStageRect());
      observer.observe(stageRef.current);
    }
    return () => {
      window.removeEventListener("resize", updateStageRect);
      observer?.disconnect();
    };
  }, [updateStageRect]);

  useEffect(() => {
    if (!laserEnabled) {
      onLaserMove?.(null);
    }
  }, [laserEnabled, onLaserMove]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!laserEnabled) {
      return;
    }
    const rect =
      stageRef.current?.getBoundingClientRect() ??
      (stageRect
        ? {
            left: stageRect.left,
            top: stageRect.top,
            width: stageRect.width,
            height: stageRect.height,
          }
        : null);
    if (!rect || !rect.width || !rect.height) {
      return;
    }
    const next = {
      x: Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1),
      y: Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1),
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
    if (!laserPosition || !stageRect) {
      return null;
    }
    return {
      x: stageRect.left + laserPosition.x * stageRect.width,
      y: stageRect.top + laserPosition.y * stageRect.height,
    };
  }, [laserPosition, stageRect]);

  const hideCursor = laserEnabled && pixelPosition;

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
        <div ref={stageRef} className="mx-auto max-w-[1100px] h-full">
          {Children.toArray(children)[index]}
        </div>
      </div>

      {/* Progress (top-right subtle) */}
      <div className="fixed top-4 right-4 p-2 text-xs text-[var(--muted)] select-none">
        <span className="font-semibold text-[var(--fg)]">{index + 1}</span>
        <span className="mx-1">/</span>
        <span>{total + 1}</span>
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
        showSpeakerOverlay={showSpeakerOverlay}
        onToggleSpeakerOverlay={onToggleSpeakerOverlay}
      />
    </section>
  );
}
