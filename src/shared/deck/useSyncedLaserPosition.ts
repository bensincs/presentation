import { useCallback, useEffect, useRef, useState } from "react";

type Params = {
  deckId?: string;
};

type NormalizedPosition = {
  x: number;
  y: number;
};

type BroadcastPayload = {
  type: "laser-position";
  position: NormalizedPosition | null;
};

export default function useSyncedLaserPosition({ deckId }: Params) {
  const [position, setPositionState] = useState<NormalizedPosition | null>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);

  const clamp = useCallback((value: NormalizedPosition | null) => {
    if (!value) {
      return null;
    }
    return {
      x: Math.min(Math.max(value.x, 0), 1),
      y: Math.min(Math.max(value.y, 0), 1),
    };
  }, []);

  useEffect(() => {
    setPositionState(null);
  }, [deckId]);

  useEffect(() => {
    if (!deckId || typeof BroadcastChannel === "undefined") {
      if (channelRef.current) {
        channelRef.current.close();
        channelRef.current = null;
      }
      return;
    }

    const channel = new BroadcastChannel(`deck-laser:${deckId}`);
    channelRef.current = channel;

    const handleMessage = (event: MessageEvent<BroadcastPayload>) => {
      if (!event.data || event.data.type !== "laser-position") {
        return;
      }
      const incoming = event.data.position;
      setPositionState(incoming ? clamp(incoming) : null);
    };

    channel.addEventListener("message", handleMessage);

    return () => {
      channel.removeEventListener("message", handleMessage);
      channel.close();
      if (channelRef.current === channel) {
        channelRef.current = null;
      }
    };
  }, [deckId, clamp]);

  const setPosition = useCallback(
    (next: NormalizedPosition | null) => {
      const clamped = clamp(next);
      setPositionState(clamped);
      if (!deckId) {
        return;
      }
      try {
        channelRef.current?.postMessage({
          type: "laser-position",
          position: clamped,
        });
      } catch {
        channelRef.current = null;
      }
    },
    [deckId, clamp]
  );

  return {
    position,
    setPosition,
  };
}

