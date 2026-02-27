import { useCallback, useEffect, useMemo, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import presentations from "../presentations";
import Deck from "../shared/deck/Deck";
import Slide from "../shared/deck/Slide";
import useDeckNavigation from "../shared/deck/useDeckNavigation";
import useSyncedSlideIndex from "../shared/deck/useSyncedSlideIndex";
import useSyncedLaserPosition from "../shared/deck/useSyncedLaserPosition";
import SpeakerOverlay from "../shared/deck/SpeakerOverlay";
import type { PresentationEntry, SlideMeta } from "../types";

const SPEAKER_FONT_MIN = 0.85;
const SPEAKER_FONT_MAX = 1.6;
const SPEAKER_PANEL_MIN_WIDTH = 320;
const SPEAKER_PANEL_MAX_WIDTH = 720;
const SPEAKER_PANEL_MIN_HEIGHT = 220;
const SPEAKER_PANEL_MAX_HEIGHT = 620;
const SPEAKER_HORIZONTAL_PADDING = 64;
const SPEAKER_VERTICAL_PADDING = 160;

export default function DeckRunner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const entry = useMemo<PresentationEntry | undefined>(
    () => presentations.find((p) => p.id === id),
    [id]
  );

  const total = entry?.slides?.length ?? 0;
  const { index, setIndex } = useSyncedSlideIndex({
    deckId: entry?.id,
    total,
  });
  const { goNext, goPrev } = useDeckNavigation({ index, setIndex, total });
  const [showSpeakerOverlay, setShowSpeakerOverlay] = useState(false);
  const [speakerFontScale, setSpeakerFontScale] = useState(1);
  const [speakerPanelWidth, setSpeakerPanelWidth] = useState(420);
  const [speakerPanelHeight, setSpeakerPanelHeight] = useState(320);
  const [isSpeakerFullscreen, setIsSpeakerFullscreen] = useState(false);
  const [laserEnabled, setLaserEnabled] = useState(false);
  const { position: syncedLaserPosition, setPosition: setSyncedLaserPosition } =
    useSyncedLaserPosition({ deckId: entry?.id });
  const toggleLaser = useCallback(() => {
    setLaserEnabled((prev) => !prev);
  }, []);

  const activeSlideMeta = useMemo<SlideMeta | undefined>(() => {
    if (!entry) {
      return undefined;
    }
    if (index === 0) {
      return undefined;
    }
    return entry.slides?.[index - 1];
  }, [entry, index]);

  const toggleSpeakerOverlay = useCallback(() => {
    setShowSpeakerOverlay((prev) => {
      return !prev;
    });
  }, []);

  const toggleSpeakerFullscreen = () => {
    let wasOpen = false;
    setIsSpeakerFullscreen((prevFull) => {
      setShowSpeakerOverlay((prevOpen) => {
        wasOpen = prevOpen;
        return true;
      });
      return wasOpen ? !prevFull : true;
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const clampWidthToViewport = () => {
      setSpeakerPanelWidth((current) => {
        const maxAllowed = Math.max(
          SPEAKER_PANEL_MIN_WIDTH,
          window.innerWidth - SPEAKER_HORIZONTAL_PADDING
        );
        return Math.min(current, maxAllowed);
      });
      setSpeakerPanelHeight((current) => {
        const maxAllowed = Math.max(
          SPEAKER_PANEL_MIN_HEIGHT,
          window.innerHeight - SPEAKER_VERTICAL_PADDING
        );
        return Math.min(current, maxAllowed);
      });
    };

    clampWidthToViewport();
    window.addEventListener("resize", clampWidthToViewport);
    return () => window.removeEventListener("resize", clampWidthToViewport);
  }, []);

  const increaseSpeakerFont = () =>
    setSpeakerFontScale((value) =>
      Math.min(Number((value + 0.1).toFixed(2)), SPEAKER_FONT_MAX)
    );
  const decreaseSpeakerFont = () =>
    setSpeakerFontScale((value) =>
      Math.max(Number((value - 0.1).toFixed(2)), SPEAKER_FONT_MIN)
    );

  const canIncreaseFont = speakerFontScale < SPEAKER_FONT_MAX - 0.01;
  const canDecreaseFont = speakerFontScale > SPEAKER_FONT_MIN + 0.01;

  const clampPanelSize = (width: number, height: number) => {
    const maxWidth =
      typeof window === "undefined"
        ? SPEAKER_PANEL_MAX_WIDTH
        : Math.max(
            SPEAKER_PANEL_MIN_WIDTH,
            window.innerWidth - SPEAKER_HORIZONTAL_PADDING
          );
    const maxHeight =
      typeof window === "undefined"
        ? SPEAKER_PANEL_MAX_HEIGHT
        : Math.max(
            SPEAKER_PANEL_MIN_HEIGHT,
            window.innerHeight - SPEAKER_VERTICAL_PADDING
          );
    const clampedWidth = Math.min(
      Math.max(width, SPEAKER_PANEL_MIN_WIDTH),
      Math.min(SPEAKER_PANEL_MAX_WIDTH, maxWidth)
    );
    const clampedHeight = Math.min(
      Math.max(height, SPEAKER_PANEL_MIN_HEIGHT),
      Math.min(SPEAKER_PANEL_MAX_HEIGHT, maxHeight)
    );
    return { width: clampedWidth, height: clampedHeight };
  };

  const handleResizeSpeakerPanel = (width: number, height: number) => {
    if (isSpeakerFullscreen) {
      return;
    }
    const { width: nextWidth, height: nextHeight } = clampPanelSize(
      width,
      height
    );
    setSpeakerPanelWidth((prev) => (prev === nextWidth ? prev : nextWidth));
    setSpeakerPanelHeight((prev) => (prev === nextHeight ? prev : nextHeight));
  };

  const handleCloseSpeakerOverlay = useCallback(() => {
    setShowSpeakerOverlay(false);
  }, []);

  const handlePresentationKey = useCallback(
    (event: KeyboardEvent | ReactKeyboardEvent<HTMLDivElement>) => {
      const key = event.key;
      const lower = key.toLowerCase();
      const prevent = () => {
        event.preventDefault();
        event.stopPropagation();
      };

      if (key === "Escape") {
        if (showSpeakerOverlay) {
          prevent();
          handleCloseSpeakerOverlay();
          return;
        }
        prevent();
        window.location.href = "/";
        return;
      }

      if (key === "ArrowRight" || key === " ") {
        prevent();
        goNext();
        return;
      }

      if (key === "ArrowLeft") {
        prevent();
        goPrev();
        return;
      }

      if (lower === "n") {
        prevent();
        toggleSpeakerOverlay();
        return;
      }

      if (lower === "f") {
        prevent();
        toggleSpeakerFullscreen();
        return;
      }

      if (lower === "p") {
        prevent();
        toggleLaser();
        return;
      }
    },
    [
      goNext,
      goPrev,
      handleCloseSpeakerOverlay,
      showSpeakerOverlay,
      toggleSpeakerOverlay,
      toggleSpeakerFullscreen,
      toggleLaser,
    ]
  );

  useEffect(() => {
    if (!showSpeakerOverlay || !isSpeakerFullscreen) {
      return;
    }
    const handleKey = (event: KeyboardEvent) => {
      if (!showSpeakerOverlay || !isSpeakerFullscreen) {
        return;
      }
      handlePresentationKey(event);
    };
    window.addEventListener("keydown", handleKey, true);
    return () => window.removeEventListener("keydown", handleKey, true);
  }, [showSpeakerOverlay, isSpeakerFullscreen, handlePresentationKey]);

  const handleDeckKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      handlePresentationKey(event);
    },
    [handlePresentationKey]
  );

  const handleLaserMove = useCallback(
    (pos: { x: number; y: number } | null) => {
      setSyncedLaserPosition(pos);
    },
    [setSyncedLaserPosition]
  );

  useEffect(() => {
    if (!laserEnabled) {
      setSyncedLaserPosition(null);
    }
  }, [laserEnabled, setSyncedLaserPosition]);

  useEffect(() => {
    return () => {
      setSyncedLaserPosition(null);
    };
  }, [setSyncedLaserPosition]);

  if (!entry) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="surface p-6">
          <div className="font-bold text-xl mb-2">Not found</div>
          <p className="text-[var(--muted)] mb-4">
            No presentation with id "{id}".
          </p>
          <button
            className="px-3 py-1.5 rounded bg-accent text-white font-semibold"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  const SlideComponent = entry.component;

  return (
    <div className="h-full">
      {/* header+footer height roughly */}
      <Deck
        title={entry.title}
        index={index}
        total={total}
        onPrev={goPrev}
        onNext={goNext}
        showSpeakerOverlay={showSpeakerOverlay}
        onToggleSpeakerOverlay={toggleSpeakerOverlay}
        onKeyDown={handleDeckKeyDown}
        laserEnabled={laserEnabled}
        laserPosition={syncedLaserPosition}
        onLaserMove={handleLaserMove}
        onToggleLaser={toggleLaser}
      >
        <Slide>
          <div className="mx-auto max-w-5xl px-4 py-8">
            <div className="mb-3 text-sm text-[var(--muted)]">
              {entry.subtitle || "—"}
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight">
              {entry.title}
            </h2>
            <p className="mt-3 text-[var(--muted)]">
              Keyboard: ← → Space to navigate, "n" to toggle notes, f for
              fullscreen notes, "p" for laser pointer, Esc to exit presentation
            </p>
          </div>
        </Slide>
        {entry.slides?.map((s: SlideMeta, i: number) => (
          <Slide key={i} transition={s.transition} className={s.className}>
            <SlideComponent slide={s} idx={i} />
          </Slide>
        ))}
      </Deck>
      <SpeakerOverlay
        visible={showSpeakerOverlay}
        slideId={activeSlideMeta?.id ?? "intro"}
        entryTitle={entry.title}
        notes={activeSlideMeta?.speakerNotes}
        onClose={handleCloseSpeakerOverlay}
        fontScale={speakerFontScale}
        onIncreaseFont={increaseSpeakerFont}
        onDecreaseFont={decreaseSpeakerFont}
        canIncreaseFont={canIncreaseFont}
        canDecreaseFont={canDecreaseFont}
        panelWidth={speakerPanelWidth}
        panelHeight={speakerPanelHeight}
        onResize={handleResizeSpeakerPanel}
        isFullscreen={isSpeakerFullscreen}
        onToggleFullscreen={toggleSpeakerFullscreen}
      />
    </div>
  );
}
