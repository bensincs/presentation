export type SlideMeta = {
  id: string;
  transition?: "fade" | "slide" | "up" | "scale";
  className?: string;
  speakerNotes?: string | string[];
};

export type DeckComponentProps = {
  slide: SlideMeta;
  idx?: number;
};

export type PresentationState = "WIP" | "In Review" | "Ready" | "Archived";

export type PresentationEntry = {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  state: PresentationState;
  subjects: string[];
  slides: SlideMeta[];
  component: React.ComponentType<DeckComponentProps>;
};
