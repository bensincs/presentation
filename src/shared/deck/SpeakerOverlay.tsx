import { useMemo } from "react";

type Props = {
  visible: boolean;
  slideId: string;
  entryTitle: string;
  notes?: string | string[];
  onClose: () => void;
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

export default function SpeakerOverlay({
  visible,
  slideId,
  entryTitle,
  notes,
  onClose,
}: Props) {
  const items = useMemo(() => buildNotes(notes), [notes]);

  if (!visible) {
    return null;
  }

  return (
    <aside
      className="fixed bottom-24 right-4 z-40 w-[min(440px,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-slate-950/85 p-5 shadow-2xl backdrop-blur-sm text-sm"
      role="dialog"
      aria-label="Speaker notes"
      aria-modal="false"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wide text-white/60">
            {entryTitle}
          </div>
          <div className="text-base font-semibold text-white">
            Speaker Notes — {slideId || "intro"}
          </div>
        </div>
        <button
          type="button"
          className="rounded-md border border-white/15 px-2 py-1 text-xs font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      {items.length > 0 ? (
        <ul className="space-y-2 text-[var(--muted)]">
          {items.map((item, idx) => (
            <li key={idx} className="leading-snug">
              • {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[var(--muted)]">
          No speaker notes for this slide yet. Add <code>speakerNotes</code> to
          the slide metadata to populate this panel.
        </p>
      )}
    </aside>
  );
}
