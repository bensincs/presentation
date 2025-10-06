type Props = {
  index: number;
  total: number;
  onPrev?: () => void;
  onNext?: () => void;
  showSpeakerOverlay?: boolean;
  onToggleSpeakerOverlay?: () => void;
};

export default function PresentationControls({
  index,
  total,
  onPrev,
  onNext,
  showSpeakerOverlay,
  onToggleSpeakerOverlay,
}: Props) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
      <div className="surface flex items-center gap-1.5 px-2 py-1.5 backdrop-blur">
        <button
          type="button"
          className="rounded px-2.5 py-1 font-semibold border border-[var(--line)] bg-black/20 hover:bg-black/30"
          onClick={onPrev}
          aria-label="Previous slide"
        >
          ←
        </button>
        <div className="select-none tabular-nums text-xs text-[var(--muted)]">
          {index + 1} / {total + 1}
        </div>
        <button
          type="button"
          className="rounded px-2.5 py-1 font-semibold border border-[var(--line)] bg-black/20 hover:bg-black/30"
          onClick={onNext}
          aria-label="Next slide"
        >
          →
        </button>
        {onToggleSpeakerOverlay ? (
          <button
            type="button"
            onClick={onToggleSpeakerOverlay}
            className={`rounded px-2.5 py-1 font-semibold border transition ${
              showSpeakerOverlay
                ? "border-white/40 bg-white/25 text-white shadow-lg"
                : "border-white/15 bg-black/15 text-white/80 hover:border-white/30 hover:text-white"
            }`}
            aria-pressed={showSpeakerOverlay}
            aria-label="Toggle speaker notes"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center">
              {showSpeakerOverlay ? (
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" />
                  <path d="M19 11a7 7 0 0 1-14 0" />
                  <path d="M12 19v2" />
                </svg>
              )}
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
