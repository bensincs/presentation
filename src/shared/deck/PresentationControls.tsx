type Props = {
  index: number;
  total: number;
  onPrev?: () => void;
  onNext?: () => void;
};

export default function PresentationControls({
  index,
  total,
  onPrev,
  onNext,
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
      </div>
    </div>
  );
}
