import AzureRMContribDeck, {
  azurermContribSlides,
} from "./terraform-provider-azurerm/AzureRMContribDeck";
import HVEMcpDeck, { hveMcpSlides } from "./hve-mcp/HVEMcpDeck";
import MLOpsAcceleratorDeck, {
  mlopsAcceleratorSlides,
} from "./mlops-accelerator/MLOpsAcceleratorDeck";
import MultiAgentCoordinationDeck, {
  multiAgentCoordinationSlides,
} from "./multi-agent-coordination/MultiAgentCoordinationDeck";
import SelfEvolvingRuntimeDeck, {
  selfEvolvingRuntimeSlides,
} from "./self-evolving-runtime/SelfEvolvingRuntimeDeck";
import type { PresentationEntry } from "../types";

const presentations: PresentationEntry[] = [
  {
    id: "self-evolving-runtime",
    title: "Self-Evolving Agent Runtime",
    subtitle: "Learning, Deterministic Agents via Persistent Capabilities",
    author: "Ben Sinclair",
    state: "Ready",
    subjects: ["Agents", "WASM", "Vector Search"],
    slides: selfEvolvingRuntimeSlides,
    component: SelfEvolvingRuntimeDeck,
  },
  {
    id: "multi-agent-coordination",
    title: "Coordination Patterns for Multi-Agent Systems",
    subtitle: "Beyond Handoffs, Hierarchies, and Agent-as-Tool",
    author: "Ben Sinclair",
    state: "Ready",
    subjects: ["Multi-Agent", "Pub/Sub", "Architecture"],
    slides: multiAgentCoordinationSlides,
    component: MultiAgentCoordinationDeck,
  },
  {
    id: "mlops-accelerator",
    title: "MLOps Accelerator",
    subtitle:
      "From reproducible Conda workstations to automated Azure ML pipelines",
    author: "Ben Sinclair",
    state: "Ready",
    subjects: ["Azure ML", "MLOps", "Automation"],
    slides: mlopsAcceleratorSlides,
    component: MLOpsAcceleratorDeck,
  },
  {
    id: "hve-mcp-server",
    title: "HVE-ing an MCP Server",
    subtitle: "Five-hour Hyper Velocity Engineering build for Azure ML MCP",
    author: "Ben Sinclair",
    state: "WIP",
    subjects: ["Hyper Velocity Engineering", "Azure", "MCP"],
    slides: hveMcpSlides,
    component: HVEMcpDeck,
  },
  {
    id: "azurerm-contribution",
    title: "Contributing to Terraform AzureRM",
    subtitle:
      "Hands-on guide for adding features to hashicorp/terraform-provider-azurerm",
    author: "Ben Sinclair",
    state: "WIP",
    subjects: ["Infrastructure", "Azure", "Terraform"],
    slides: azurermContribSlides,
    component: AzureRMContribDeck,
  },
];

export default presentations;
