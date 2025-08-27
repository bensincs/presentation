import SampleDeck from "./sample/SampleDeck";
import ConceptToCockpitDeck, {
  conceptToCockpitSlides,
} from "./concept-to-cockpit/ConceptToCockpitDeck";
import MedicineDeliveryDeck, {
  medicineDeliverySlides,
} from "./medicine-delivery/MedicineDeliveryDeck";
import type { PresentationEntry, SlideMeta } from "../types";

const sampleSlides: SlideMeta[] = [
  { id: "intro", transition: "fade" },
  { id: "title", transition: "up" },
];

const presentations: PresentationEntry[] = [
  {
    id: "sample",
    title: "Ben Presentation",
    subtitle: "Copy this to start a new one",
    slides: sampleSlides,
    component: SampleDeck,
  },
  {
    id: "concept-to-cockpit",
    title: "ConceptToCockpit",
    subtitle: "Hyper Velocity Engineering in Aviation",
    slides: conceptToCockpitSlides,
    component: ConceptToCockpitDeck,
  },
  {
    id: "medicine-delivery",
    title: "Medicine Delivery POC",
    subtitle: "HVE Reference Implementation (Azure + Spring Boot)",
    slides: medicineDeliverySlides,
    component: MedicineDeliveryDeck,
  },
];

export default presentations;
