import { useCallback, useEffect, useRef, useState } from "react";
import type { SetStateAction } from "react";

type Params = {
  deckId?: string;
  total: number;
  defaultIndex?: number;
};

type BroadcastPayload = {
  type: "deck-index";
  index: number;
};

const STORAGE_KEY_PREFIX = "deck:index:";

export default function useSyncedSlideIndex({
  deckId,
  total,
  defaultIndex = 0,
}: Params) {
  const [stateIndex, setStateIndex] = useState(defaultIndex);
  const channelRef = useRef<BroadcastChannel | null>(null);

  const clamp = useCallback(
    (value: number) => {
      const maxIndex = Math.max(total, 0);
      return Math.min(Math.max(value, 0), maxIndex);
    },
    [total]
  );

  useEffect(() => {
    setStateIndex((prev) => {
      const next = clamp(prev);
      return prev === next ? prev : next;
    });
  }, [clamp]);

  const setSyncedIndex = useCallback(
    (value: SetStateAction<number>) => {
      if (typeof value === "function") {
        setStateIndex((prev) => {
          const next = clamp((value as (current: number) => number)(prev));
          return prev === next ? prev : next;
        });
      } else {
        setStateIndex((prev) => {
          const next = clamp(value);
          return prev === next ? prev : next;
        });
      }
    },
    [clamp]
  );

  const applyIncomingIndex = useCallback(
    (incoming: number) => {
      setStateIndex((prev) => {
        const next = clamp(incoming);
        return prev === next ? prev : next;
      });
    },
    [clamp]
  );

  useEffect(() => {
    if (!deckId) {
      setStateIndex(defaultIndex);
    }
  }, [deckId, defaultIndex]);

  useEffect(() => {
    if (!deckId || typeof window === "undefined") {
      return;
    }

    const storageKey = `${STORAGE_KEY_PREFIX}${deckId}`;

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== storageKey || event.storageArea !== window.localStorage) {
        return;
      }
      if (event.newValue == null) {
        return;
      }
      const parsed = Number(event.newValue);
      if (Number.isNaN(parsed)) {
        return;
      }
      applyIncomingIndex(parsed);
    };

    window.addEventListener("storage", handleStorage);

    const handleMessage = (event: MessageEvent<BroadcastPayload>) => {
      if (!event.data || event.data.type !== "deck-index") {
        return;
      }
      if (typeof event.data.index !== "number") {
        return;
      }
      applyIncomingIndex(event.data.index);
    };

    let channel: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== "undefined") {
      channel = new BroadcastChannel(`deck-sync:${deckId}`);
      channel.addEventListener("message", handleMessage);
      channelRef.current = channel;
    } else {
      channelRef.current = null;
    }

    try {
      const storedValue = window.localStorage.getItem(storageKey);
      if (storedValue !== null) {
        const parsed = Number(storedValue);
        if (!Number.isNaN(parsed)) {
          applyIncomingIndex(parsed);
        }
      } else if (defaultIndex !== 0) {
        applyIncomingIndex(defaultIndex);
      }
    } catch {
      // Ignore storage access failures (private mode, etc.)
    }

    return () => {
      window.removeEventListener("storage", handleStorage);
      if (channel) {
        channel.removeEventListener("message", handleMessage);
        channel.close();
        if (channelRef.current === channel) {
          channelRef.current = null;
        }
      }
    };
  }, [deckId, defaultIndex, applyIncomingIndex]);

  useEffect(() => {
    if (!deckId || typeof window === "undefined") {
      return;
    }

    const storageKey = `${STORAGE_KEY_PREFIX}${deckId}`;
    const next = clamp(stateIndex);

    try {
      window.localStorage.setItem(storageKey, String(next));
    } catch {
      // Silent failure if storage is unavailable.
    }

    try {
      channelRef.current?.postMessage({ type: "deck-index", index: next });
    } catch {
      channelRef.current = null;
    }
  }, [deckId, stateIndex, clamp]);

  return { index: stateIndex, setIndex: setSyncedIndex };
}
