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
import type { PresentationEntry } from "../types";

const presentations: PresentationEntry[] = [
  {
    id: "concept-to-cockpit",
    title: "ConceptToCockpit",
    subtitle: "Hyper Velocity Engineering in Aviation",
    author: "Ben Sinclair",
    aiOnly: false,
    slides: conceptToCockpitSlides,
    doNotUse: true,
    component: ConceptToCockpitDeck,
  },
  {
    id: "medicine-delivery",
    title: "Medicine Delivery POC",
    subtitle: "HVE Reference Implementation (Azure + Spring Boot)",
    author: "Ben Sinclair",
    slides: medicineDeliverySlides,
    doNotUse: true,
    component: MedicineDeliveryDeck,
  },
  {
    id: "saas-builder",
    title: "SaaS Builder",
    subtitle: "Azure Marketplace Acceleration Monorepo",
    author: "Ben Sinclair",
    slides: saasBuilderSlides,
    doNotUse: true,
    component: SaaSBuilderDeck,
  },
  {
    id: "realtime-voice",
    title: "Digital Human (Realtime Voice)",
    subtitle: "Azure OpenAI Realtime Voice Assistant",
    author: "Ben Sinclair",
    slides: realtimeVoiceSlides,
    doNotUse: true,
    component: RealtimeVoiceDeck,
  },
  {
    id: "traffic-manager",
    title: "Traffic Manager",
    subtitle: "Azure ML Infrastructure & Experimentation Platform",
    author: "Ben Sinclair",
    slides: trafficManagerSlides,
    doNotUse: true,
    component: TrafficManagerDeck,
  },
];

export default presentations;
