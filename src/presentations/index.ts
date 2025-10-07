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
import AzureRMContribDeck, {
  azurermContribSlides,
} from "./terraform-provider-azurerm/AzureRMContribDeck";
import type { PresentationEntry } from "../types";

const presentations: PresentationEntry[] = [
  {
    id: "azurerm-contribution",
    title: "Contributing to Terraform AzureRM",
    subtitle: "Hands-on guide for adding features to hashicorp/terraform-provider-azurerm",
    author: "Ben Sinclair",
    state: "WIP",
    subjects: ["Infrastructure", "Azure", "Terraform"],
    slides: azurermContribSlides,
    component: AzureRMContribDeck,
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
