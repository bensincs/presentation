export type SlideMeta = {
  id: string;
  transition?: "fade" | "slide" | "up" | "scale";
  className?: string;
};

export type DeckComponentProps = {
  slide: SlideMeta;
  idx?: number;
};

export type PresentationEntry = {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  aiOnly?: boolean;
  doNotUse?: boolean;
  slides: SlideMeta[];
  component: React.ComponentType<DeckComponentProps>;
};
