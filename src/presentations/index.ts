import ConceptToCockpitDeck, {
  conceptToCockpitSlides,
} from "./concept-to-cockpit/ConceptToCockpitDeck";
import EngagementLaunchpadDeck, {
  engagementLaunchpadSlides,
} from "./engagement-launchpad/EngagementLaunchpadDeck";
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
    id: "engagement-launchpad",
    title: "Engagement Launchpad",
    subtitle: "Signal-first lifecycle activation playbook",
    author: "Ben Sinclair",
    state: "WIP",
    subjects: ["Present"],
    slides: engagementLaunchpadSlides,
    component: EngagementLaunchpadDeck,
  },
  {
    id: "concept-to-cockpit",
    title: "ConceptToCockpit",
    subtitle: "Hyper Velocity Engineering in Aviation",
    author: "Ben Sinclair",
    state: "Archived",
    subjects: ["Present"],
    slides: conceptToCockpitSlides,
    component: ConceptToCockpitDeck,
  },
  {
    id: "medicine-delivery",
    title: "Medicine Delivery POC",
    subtitle: "HVE Reference Implementation (Azure + Spring Boot)",
    author: "Ben Sinclair",
    state: "Archived",
    subjects: ["Present"],
    slides: medicineDeliverySlides,
    component: MedicineDeliveryDeck,
  },
  {
    id: "saas-builder",
    title: "SaaS Builder",
    subtitle: "Azure Marketplace Acceleration Monorepo",
    author: "Ben Sinclair",
    state: "Archived",
    subjects: ["Present"],
    slides: saasBuilderSlides,
    component: SaaSBuilderDeck,
  },
  {
    id: "realtime-voice",
    title: "Digital Human (Realtime Voice)",
    subtitle: "Azure OpenAI Realtime Voice Assistant",
    author: "Ben Sinclair",
    state: "Archived",
    subjects: ["Present"],
    slides: realtimeVoiceSlides,
    component: RealtimeVoiceDeck,
  },
  {
    id: "traffic-manager",
    title: "Traffic Manager",
    subtitle: "Azure ML Infrastructure & Experimentation Platform",
    author: "Ben Sinclair",
    state: "Archived",
    subjects: ["Present"],
    slides: trafficManagerSlides,
    component: TrafficManagerDeck,
  },
];

export default presentations;
