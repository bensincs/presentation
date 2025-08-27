import { useEffect, useRef, Children } from "react";
import type { PropsWithChildren } from "react";
import PresentationControls from "./PresentationControls";

type Props = PropsWithChildren<{
  title: string;
  index: number;
  total: number;
  onPrev?: () => void;
  onNext?: () => void;
}>;

export default function Deck({
  title,
  index,
  total,
  children,
  onPrev,
  onNext,
}: Props) {
  const hostRef = useRef(null);

  useEffect(() => {
    (hostRef.current as HTMLDivElement | null)?.focus();
  }, []);

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === " ") onNext?.();
    if (e.key === "ArrowLeft") onPrev?.();
    if (e.key === "Escape") window.location.href = "/";
  };

  return (
    <section
      ref={hostRef}
      tabIndex={0}
      onKeyDown={handleKey}
      onMouseDown={() => (hostRef.current as HTMLDivElement | null)?.focus()}
      className="w-full h-full outline-none"
      aria-roledescription="deck"
      aria-label={title}
      aria-live="polite"
    >
      <div className="w-full h-full">
        {/* Stage area */}
        <div className="mx-auto max-w-[1100px] h-full">
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
      />
    </section>
  );
}
