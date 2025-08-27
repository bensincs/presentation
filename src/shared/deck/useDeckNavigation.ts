import { useCallback, useEffect } from "react";

type Params = {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  total: number;
};

export default function useDeckNavigation({ index, setIndex, total }: Params) {
  const goNext = useCallback(
    () => setIndex((i) => Math.min(i + 1, total)),
    [setIndex, total]
  );
  const goPrev = useCallback(
    () => setIndex((i) => Math.max(i - 1, 0)),
    [setIndex]
  );

  return { index, goNext, goPrev };
}
