import { useMemo, useRef } from "react";
import type { CSSProperties } from "react";

type Props = {
  visible: boolean;
  slideId: string;
  entryTitle: string;
  notes?: string | string[];
  onClose: () => void;
  fontScale: number;
  onIncreaseFont: () => void;
  onDecreaseFont: () => void;
  canIncreaseFont: boolean;
  canDecreaseFont: boolean;
  panelWidth: number;
  panelHeight: number;
  onResize: (width: number, height: number) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
};

const buildNotes = (notes?: string | string[]) => {
  if (!notes) {
    return [];
  }
  if (Array.isArray(notes)) {
    return notes.map((item) => item.trim()).filter(Boolean);
  }
  return notes
    .split(/\r?\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
};

const controlButtonBase =
  "rounded-md border border-white/15 bg-white/5 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/80 transition hover:border-white/30 hover:text-white disabled:opacity-40 disabled:pointer-events-none";

export default function SpeakerOverlay({
  visible,
  slideId,
  entryTitle,
  notes,
  onClose,
  fontScale,
  onIncreaseFont,
  onDecreaseFont,
  canIncreaseFont,
  canDecreaseFont,
  panelWidth,
  panelHeight,
  onResize,
  isFullscreen,
  onToggleFullscreen,
}: Props) {
  const items = useMemo(() => buildNotes(notes), [notes]);
  const resizeState = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    width: number;
    height: number;
  } | null>(null);

  if (!visible) {
    return null;
  }

  const handleResizePointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (isFullscreen) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    resizeState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      width: panelWidth,
      height: panelHeight,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleResizePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const state = resizeState.current;
    if (!state || state.pointerId !== event.pointerId) {
      return;
    }
    const deltaX = event.clientX - state.startX;
    const deltaY = event.clientY - state.startY;
    const nextWidth = state.width - deltaX;
    const nextHeight = state.height - deltaY;
    onResize(nextWidth, nextHeight);
  };

  const finalizePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = resizeState.current;
    const target = event.currentTarget;
    if (!state || state.pointerId !== event.pointerId) {
      return;
    }
    resizeState.current = null;
    if (target.hasPointerCapture?.(event.pointerId)) {
      target.releasePointerCapture(event.pointerId);
    }
  };
  const handleResizePointerUp = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    finalizePointer(event);
  };
  const handleResizePointerCancel = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    finalizePointer(event);
  };

  const baseClass = isFullscreen
    ? "fixed inset-4 z-40 rounded-3xl border border-white/10 bg-slate-950/90 shadow-2xl backdrop-blur-sm flex flex-col overflow-hidden"
    : "fixed bottom-24 right-4 z-40 rounded-2xl border border-white/10 bg-slate-950/85 shadow-2xl backdrop-blur-sm flex flex-col overflow-hidden";

  const baseStyle: CSSProperties = isFullscreen
    ? {
        maxWidth: "calc(100vw - 2rem)",
        maxHeight: "calc(100vh - 2rem)",
      }
    : {
        width: `${panelWidth}px`,
        height: `${panelHeight}px`,
        maxWidth: "calc(100vw - 2rem)",
        maxHeight: "calc(100vh - 8rem)",
      };

  const contentStyle: CSSProperties = {
    fontSize: `${(fontScale * 0.95).toFixed(2)}rem`,
  };

  return (
    <aside
      className={baseClass}
      style={baseStyle}
      role="dialog"
      aria-label="Speaker notes"
      aria-modal="false"
    >
      {!isFullscreen ? (
        <div
          className="absolute -top-3 -left-3 h-5 w-5 cursor-nwse-resize rounded-lg border border-white/30 bg-white/20"
          onPointerDown={handleResizePointerDown}
          onPointerMove={handleResizePointerMove}
          onPointerUp={handleResizePointerUp}
          onPointerCancel={handleResizePointerCancel}
          aria-hidden="true"
        />
      ) : null}
      <div className="flex items-start justify-between gap-3 border-b border-white/5 px-5 pb-3 pt-5">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-wide text-white/60">
            {entryTitle}
          </div>
          <div className="text-base font-semibold text-white">
            Speaker Notes — {slideId || "intro"}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-1">
          <button
            type="button"
            onClick={onDecreaseFont}
            disabled={!canDecreaseFont}
            className={controlButtonBase}
            title="Decrease text size"
          >
            A-
          </button>
          <button
            type="button"
            onClick={onIncreaseFont}
            disabled={!canIncreaseFont}
            className={controlButtonBase}
            title="Increase text size"
          >
            A+
          </button>
          <span className="mx-1 h-4 w-px bg-white/10" aria-hidden="true" />
          <button
            type="button"
            onClick={onToggleFullscreen}
            className={`${controlButtonBase} ${
              isFullscreen ? "border-white/40 bg-white/20 text-white shadow-lg" : ""
            }`}
            aria-pressed={isFullscreen}
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? "Exit" : "Full"}
          </button>
          <button type="button" onClick={onClose} className={controlButtonBase}>
            Close
          </button>
        </div>
      </div>
      <div
        className="flex-1 overflow-y-auto px-5 py-4 text-[var(--muted)]"
        style={contentStyle}
      >
        {items.length > 0 ? (
          <ul className="space-y-2">
            {items.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                • {item}
              </li>
            ))}
          </ul>
        ) : (
          <p>
            No speaker notes for this slide yet. Add <code>speakerNotes</code>{" "}
            to the slide metadata to populate this panel.
          </p>
        )}
      </div>
    </aside>
  );
}
