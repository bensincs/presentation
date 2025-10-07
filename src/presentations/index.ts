import AzureRMContribDeck, {
  azurermContribSlides,
} from "./terraform-provider-azurerm/AzureRMContribDeck";
import HVEMcpDeck, { hveMcpSlides } from "./hve-mcp/HVEMcpDeck";
import type { PresentationEntry } from "../types";

const presentations: PresentationEntry[] = [
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
