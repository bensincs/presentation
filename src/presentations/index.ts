import SampleDeck from "./sample/SampleDeck";
import ConceptToCockpitDeck, {
  conceptToCockpitSlides,
} from "./concept-to-cockpit/ConceptToCockpitDeck";
import MedicineDeliveryDeck, {
  medicineDeliverySlides,
} from "./medicine-delivery/MedicineDeliveryDeck";
import SaaSBuilderDeck, {
  saasBuilderSlides,
} from "./saas-builder/SaaSBuilderDeck";
import RealtimeVoiceDeck, {
  realtimeVoiceSlides,
} from "./realtime-voice/RealtimeVoiceDeck";
import TrafficManagerDeck, {
  trafficManagerSlides,
} from "./traffic-manager/TrafficManagerDeck";
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
  {
    id: "saas-builder",
    title: "SaaS Builder",
    subtitle: "Azure Marketplace Acceleration Monorepo",
    slides: saasBuilderSlides,
    component: SaaSBuilderDeck,
  },
  {
    id: "realtime-voice",
    title: "Digital Human (Realtime Voice)",
    subtitle: "Azure OpenAI Realtime Voice Assistant",
    slides: realtimeVoiceSlides,
    component: RealtimeVoiceDeck,
  },
  {
    id: "traffic-manager",
    title: "Traffic Manager",
    subtitle: "Azure ML Infrastructure & Experimentation Platform",
    slides: trafficManagerSlides,
    component: TrafficManagerDeck,
  },
];

export default presentations;
