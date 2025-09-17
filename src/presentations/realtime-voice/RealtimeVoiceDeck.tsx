import React from "react";
import { motion } from "framer-motion";
import type { DeckComponentProps, SlideMeta } from "../../types";

export const realtimeVoiceSlides: SlideMeta[] = [
  { id: "title", transition: "fade" },
  { id: "overview", transition: "slide" },
  { id: "features", transition: "slide" },
  { id: "architecture", transition: "slide" },
  { id: "repo-structure", transition: "slide" },
  { id: "tech-stack", transition: "slide" },
  { id: "dev-environment", transition: "slide" },
  { id: "env-variables", transition: "slide" },
  { id: "ai-capabilities", transition: "slide" },
  { id: "deployment", transition: "slide" },
  { id: "infrastructure", transition: "slide" },
  { id: "security-auth", transition: "slide" },
  { id: "testing-troubleshooting", transition: "slide" },
  { id: "integration-customization", transition: "slide" },
  { id: "roadmap", transition: "slide" },
  { id: "qa", transition: "fade" },
];

type FadeInProps = {
  delay?: number;
  className?: string;
  children?: React.ReactNode;
};
const FadeIn: React.FC<FadeInProps> = ({ delay = 0, className, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

function TitleSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8">
      <motion.h1
        className="text-[clamp(42px,8vw,92px)] font-extrabold bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Digital Human
      </motion.h1>
      <FadeIn
        delay={0.45}
        className="text-2xl font-light text-[var(--muted)] max-w-3xl mt-6"
      >
        Real‑time Voice & Conversational AI Agent leveraging Azure OpenAI, RAG &
        streaming audio over websockets.
      </FadeIn>
      <FadeIn
        delay={0.75}
        className="flex gap-3 flex-wrap justify-center mt-10"
      >
        {[
          "Realtime Audio",
          "Azure OpenAI",
          "Function Calling",
          "RAG Search",
          "Azure Bicep",
          "FastAPI + React",
        ].map((t, i) => (
          <span
            key={t}
            className="surface rounded-full px-4 py-2 text-sm font-semibold animate-fade-in-up"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            {t}
          </span>
        ))}
      </FadeIn>
      <FadeIn delay={1} className="mt-10 text-sm text-[var(--muted)]">
        Presight AI • September 2025
      </FadeIn>
    </div>
  );
}

function OverviewSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
          Project Overview
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn delay={0.2} className="surface p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-accent mb-3">Purpose</h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Voice-based customer success / CRM agent</li>
            <li>• Natural conversation via Azure OpenAI Realtime</li>
            <li>• Fast deployment onto Azure Container Apps</li>
            <li>• Configurable prompt + multi-mode operation</li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className="surface p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-accent2 mb-3">
            Core Value
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Reduce human load for routine voice workflows</li>
            <li>• Integrate knowledge via RAG search index</li>
            <li>• Extend with external tools / APIs (function calls)</li>
            <li>• Provide transcripts & summaries for downstream systems</li>
          </ul>
        </FadeIn>
      </div>
    </div>
  );
}

function FeaturesSlide() {
  const featureGroups = [
    {
      title: "Conversation",
      color: "blue",
      items: [
        "Realtime streaming audio",
        "Low latency websocket channel",
        "Configurable assistant persona",
        "Multi-language support (translation scaffolding)",
      ],
    },
    {
      title: "Knowledge & RAG",
      color: "emerald",
      items: [
        "Azure AI Search index",
        "Document ingestion automation",
        "Sample PDF seeding",
        "Extensible retrieval pipeline",
      ],
    },
    {
      title: "AI Orchestration",
      color: "purple",
      items: [
        "Azure OpenAI Realtime model",
        "Function calling adapter",
        "Responsible AI filtering",
        "Tool abstraction layer",
      ],
    },
    {
      title: "Operations",
      color: "cyan",
      items: [
        "Bicep infrastructure modules",
        "Makefile automation",
        "Environment bootstrapping",
        "Dev tunnels for local ↔ cloud",
      ],
    },
  ];
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Key Features
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {featureGroups.map((g, i) => (
          <FadeIn
            key={g.title}
            delay={0.15 + i * 0.12}
            className={`surface p-6 rounded-xl border-l-4 border-${g.color}-500`}
          >
            <h3 className={`text-lg font-semibold text-${g.color}-300 mb-3`}>
              {g.title}
            </h3>
            <ul className="text-xs text-[var(--muted)] space-y-1">
              {g.items.map((it) => (
                <li key={it}>• {it}</li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function ArchitectureSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
          High-Level Architecture
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Client Layer",
            color: "indigo",
            pts: [
              "React (Vite) UI",
              "WebSocket audio stream",
              "Config fetch / runtime settings",
            ],
          },
          {
            title: "API Layer",
            color: "fuchsia",
            pts: [
              "FastAPI service",
              "Session + event routing",
              "Assistant tool orchestration",
              "OpenAI streaming bridge",
            ],
          },
          {
            title: "Platform",
            color: "pink",
            pts: [
              "Azure Container Apps",
              "Azure OpenAI + AI Search",
              "Blob storage (documents)",
              "Bicep infra modules",
            ],
          },
        ].map((c, i) => (
          <FadeIn
            key={c.title}
            delay={0.2 + i * 0.15}
            className={`surface p-6 rounded-xl border-l-4 border-${c.color}-500`}
          >
            <h3 className={`text-lg font-semibold text-${c.color}-300 mb-3`}>
              {c.title}
            </h3>
            <ul className="text-xs text-[var(--muted)] space-y-1">
              {c.pts.map((p) => (
                <li key={p}>• {p}</li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
      <FadeIn
        delay={0.75}
        className="mt-8 surface p-4 rounded-xl text-center text-sm text-[var(--muted)]"
      >
        Flow: Browser mic ↔ WebSocket ↔ FastAPI session engine ↔ OpenAI Realtime
        + RAG retrieval + tools → streamed responses.
      </FadeIn>
    </div>
  );
}

function RepoStructureSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-6">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Repository Structure
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn delay={0.2} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-cyan-300 mb-3">
            Key Directories
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>
              • <strong>app/</strong> – React frontend (Vite)
            </li>
            <li>
              • <strong>api/</strong> – FastAPI backend (routes, tools, agents)
            </li>
            <li>
              • <strong>infra/</strong> – Bicep templates & modules
            </li>
            <li>
              • <strong>scripts/</strong> – Deploy & dev env automation
            </li>
            <li>
              • <strong>docs/adr</strong> – Architecture decisions
            </li>
            <li>
              • <strong>Makefile</strong> – Command surface
            </li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-blue-300 mb-3">
            Conventions
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Clear layering (UI / API / Infra)</li>
            <li>• Tool abstraction for OpenAI function calls</li>
            <li>• Document ingestion automated via deploy scripts</li>
            <li>• Environment file auto-generated (`make devenv`)</li>
            <li>• ADRs guide platform evolution</li>
          </ul>
        </FadeIn>
      </div>
    </div>
  );
}

function TechStackSlide() {
  const columns = [
    {
      title: "Frontend",
      color: "emerald",
      items: [
        "React + Vite",
        "Tailwind (4.x)",
        "TypeScript",
        "WebSocket audio bridge",
      ],
    },
    {
      title: "Backend",
      color: "green",
      items: [
        "Python 3.13",
        "FastAPI",
        "Socket.IO events",
        "uv package manager",
      ],
    },
    {
      title: "AI & Data",
      color: "teal",
      items: [
        "Azure OpenAI Realtime",
        "Azure AI Search",
        "Blob Storage Docs",
        "Embedding models",
      ],
    },
    {
      title: "Platform",
      color: "lime",
      items: [
        "Azure Container Apps",
        "Bicep IaC",
        "GitHub Actions",
        "Makefile automation",
      ],
    },
  ];
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
          Technology Stack
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {columns.map((c, i) => (
          <FadeIn
            key={c.title}
            delay={0.2 + i * 0.12}
            className={`surface p-6 rounded-xl border-l-4 border-${c.color}-500`}
          >
            <h3 className={`text-lg font-semibold text-${c.color}-300 mb-3`}>
              {c.title}
            </h3>
            <ul className="text-xs text-[var(--muted)] space-y-1">
              {c.items.map((it) => (
                <li key={it}>• {it}</li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function DevEnvironmentSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Development Environment
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn delay={0.2} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-yellow-300 mb-3">
            Dev Env Deploy
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>
              • <span className="font-mono">make devenv</span> provisions
              AI/Search resources
            </li>
            <li>
              • Generates <span className="font-mono">.env</span> with endpoints
              & IDs
            </li>
            <li>• Seeds sample PDF & builds search index</li>
            <li>• Supports dev tunnels for remote callbacks</li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-orange-300 mb-3">
            Local Run
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>
              • Run API: <span className="font-mono">make run-api</span>
            </li>
            <li>
              • Check deps:{" "}
              <span className="font-mono">make check-dependencies</span>
            </li>
            <li>
              • Build/Deploy image:{" "}
              <span className="font-mono">make build-push-deploy-image</span>
            </li>
            <li>
              • CI lean env:{" "}
              <span className="font-mono">make api-restore-ci</span>
            </li>
          </ul>
        </FadeIn>
      </div>
    </div>
  );
}

function EnvVariablesSlide() {
  const vars = [
    "DIGITAL_HUMAN_API_PUBLIC_URL",
    "DIGITAL_HUMAN_API_OPENAI_ENDPOINT",
    "DIGITAL_HUMAN_API_OPENAI_API_MODEL_ID",
    "DIGITAL_HUMAN_API_SEARCH_ENDPOINT",
    "DIGITAL_HUMAN_API_SEARCH_INDEX",
    "DIGITAL_HUMAN_APP_CLIENT_ID",
    "DIGITAL_HUMAN_APP_BACKEND_SCOPE",
  ];
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
          Environment Variables
        </h2>
      </FadeIn>
      <FadeIn delay={0.25} className="surface p-6 rounded-xl max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold text-pink-300 mb-4">
          Critical Configuration
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs font-mono">
          {vars.map((v) => (
            <div key={v} className="surface p-2 rounded bg-gray-800/40">
              {v}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-[var(--muted)]">
          Auto-generated for dev environment; production uses secure parameters
          / secrets.
        </p>
      </FadeIn>
    </div>
  );
}

function AiCapabilitiesSlide() {
  const groups = [
    {
      title: "Realtime Model",
      color: "purple",
      pts: [
        "gpt-4o realtime preview",
        "Bidirectional low latency",
        "Audio + tokens multiplexed",
      ],
    },
    {
      title: "System Prompting",
      color: "violet",
      pts: [
        "Configurable assistant identity",
        "Persona & style controls",
        "Behavior guardrails",
      ],
    },
    {
      title: "Function Calling",
      color: "indigo",
      pts: [
        "Tool interface abstraction",
        "Dynamic enable/disable",
        "External API enrichment",
      ],
    },
    {
      title: "RAG",
      color: "fuchsia",
      pts: [
        "Azure AI Search index",
        "Embeddings (text-embedding-3-large)",
        "Automated ingestion script",
      ],
    },
  ];
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
          AI Capabilities
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {groups.map((g, i) => (
          <FadeIn
            key={g.title}
            delay={0.15 + i * 0.12}
            className={`surface p-6 rounded-xl border-l-4 border-${g.color}-500`}
          >
            <h3 className={`text-lg font-semibold text-${g.color}-300 mb-3`}>
              {g.title}
            </h3>
            <ul className="text-xs text-[var(--muted)] space-y-1">
              {g.pts.map((p) => (
                <li key={p}>• {p}</li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
      <FadeIn
        delay={0.75}
        className="mt-8 surface p-4 rounded-xl text-center text-sm text-[var(--muted)]"
      >
        Assistants pipeline: Prompt context + RAG docs + tool outputs → streamed
        conversational turns.
      </FadeIn>
    </div>
  );
}

function DeploymentSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
          Deployment Paths
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Local Dev",
            color: "teal",
            pts: [
              "make devenv",
              "Run API + UI locally",
              "Dev tunnel for public URL",
            ],
          },
          {
            title: "Manual Demo",
            color: "emerald",
            pts: [
              "make deploy ENV=demo",
              "Bicep subscription deployment",
              "Image build & push pipeline",
            ],
          },
          {
            title: "Workflow",
            color: "green",
            pts: [
              "GitHub Actions CD",
              "App registration federated credential",
              "AZURE_* secrets",
            ],
          },
        ].map((c, i) => (
          <FadeIn
            key={c.title}
            delay={0.2 + i * 0.15}
            className={`surface p-6 rounded-xl border-l-4 border-${c.color}-500`}
          >
            <h3 className={`text-lg font-semibold text-${c.color}-300 mb-3`}>
              {c.title}
            </h3>
            <ul className="text-xs text-[var(--muted)] space-y-1">
              {c.pts.map((p) => (
                <li key={p}>• {p}</li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
      <FadeIn
        delay={0.7}
        className="mt-8 surface p-4 rounded-xl text-center text-sm text-[var(--muted)]"
      >
        Image pipeline: build → push → deploy; ensure model quota & region
        alignment.
      </FadeIn>
    </div>
  );
}

function InfrastructureSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
          Infrastructure (Bicep)
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn delay={0.2} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-sky-300 mb-3">
            Core Modules
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Subscription-scoped main template</li>
            <li>• Dev & core modules (AI, Search, Storage)</li>
            <li>• Outputs consumed by deployment scripts</li>
            <li>• Region allow-list & model quota considerations</li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-indigo-300 mb-3">
            Customization
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Override CIDR blocks (hub/core address prefixes)</li>
            <li>• Discard hub if existing network present</li>
            <li>• Extend with private endpoints (prod hardening)</li>
            <li>• Parameterized model deployment names</li>
          </ul>
        </FadeIn>
      </div>
    </div>
  );
}

function SecurityAuthSlide() {
  const cols = [
    {
      title: "Identity",
      color: "rose",
      pts: [
        "Azure Entra App Reg (frontend & backend)",
        "Managed identity (container apps)",
        "Federated credential for CI",
      ],
    },
    {
      title: "RBAC Roles",
      color: "red",
      pts: [
        "Contributor",
        "RBAC Administrator",
        "AI Service user / Search data reader",
      ],
    },
    {
      title: "Auth Model",
      color: "pink",
      pts: [
        "RBAC-driven local CLI auth",
        "Scope-based API access",
        "Configurable scopes & audience",
      ],
    },
    {
      title: "Hardening (Next)",
      color: "fuchsia",
      pts: [
        "Private networking",
        "Key rotation automation",
        "Telemetry access controls",
      ],
    },
  ];
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
          Security & Auth
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cols.map((c, i) => (
          <FadeIn
            key={c.title}
            delay={0.15 + i * 0.12}
            className={`surface p-6 rounded-xl border-l-4 border-${c.color}-500`}
          >
            <h3 className={`text-lg font-semibold text-${c.color}-300 mb-3`}>
              {c.title}
            </h3>
            <ul className="text-xs text-[var(--muted)] space-y-1">
              {c.pts.map((p) => (
                <li key={p}>• {p}</li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function TestingTroubleshootingSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">
          Testing & Troubleshooting
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Commands",
            color: "lime",
            pts: ["make test", "make test-cov", "make test-ui"],
          },
          {
            title: "VS Code",
            color: "green",
            pts: [
              "Testing panel runners",
              "Debug config for API",
              "Breakpoints in async flows",
            ],
          },
          {
            title: "Common Issues",
            color: "emerald",
            pts: [
              "Quota / model region mismatch",
              "Soft-deleted resource purge",
              "Deployment failure: activity log",
            ],
          },
        ].map((c, i) => (
          <FadeIn
            key={c.title}
            delay={0.2 + i * 0.15}
            className={`surface p-6 rounded-xl border-l-4 border-${c.color}-500`}
          >
            <h3 className={`text-lg font-semibold text-${c.color}-300 mb-3`}>
              {c.title}
            </h3>
            <ul className="text-xs text-[var(--muted)] space-y-1">
              {c.pts.map((p) => (
                <li key={p}>• {p}</li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
      <FadeIn
        delay={0.7}
        className="mt-8 surface p-4 rounded-xl text-center text-sm text-[var(--muted)]"
      >
        Troubleshoot infra via subscription deployment history & activity logs;
        purge conflicts for reused names.
      </FadeIn>
    </div>
  );
}

function IntegrationCustomizationSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-400 to-gray-300 bg-clip-text text-transparent">
          Integration & Customization
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn delay={0.2} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-slate-300 mb-3">
            Networking
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Replace / remove hub network modules</li>
            <li>• Adjust CIDRs for enterprise landing zones</li>
            <li>• Introduce private endpoints (prod)</li>
            <li>• Extend logs to centralized SIEM</li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-300 mb-3">
            Extensibility
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Add domain tools (CRM, ticketing, news APIs)</li>
            <li>• Custom summarization or compliance filters</li>
            <li>• Replace embeddings model or indexing pipeline</li>
            <li>• Introduce conversation state persistence (DB)</li>
          </ul>
        </FadeIn>
      </div>
    </div>
  );
}

function RoadmapSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
          Future Roadmap
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Conversation",
            color: "cyan",
            pts: [
              "Dual-channel streaming (stereo)",
              "Emotion & sentiment tagging",
              "Dynamic latency adaptation",
            ],
          },
          {
            title: "Platform",
            color: "indigo",
            pts: [
              "Stateful session store",
              "Multi-tenant isolation layers",
              "Advanced metrics dashboards",
            ],
          },
          {
            title: "Compliance",
            color: "blue",
            pts: [
              "PII redaction hooks",
              "Content safety policy tuning",
              "Evidence bundle generation",
            ],
          },
        ].map((c, i) => (
          <FadeIn
            key={c.title}
            delay={0.2 + i * 0.15}
            className={`surface p-6 rounded-xl border-l-4 border-${c.color}-500`}
          >
            <h3 className={`text-lg font-semibold text-${c.color}-300 mb-3`}>
              {c.title}
            </h3>
            <ul className="text-xs text-[var(--muted)] space-y-1">
              {c.pts.map((p) => (
                <li key={p}>• {p}</li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
      <FadeIn
        delay={0.7}
        className="mt-8 surface p-4 rounded-xl text-center text-sm text-[var(--muted)]"
      >
        Goal: Production-grade voice assistant blueprint with hardened security
        + analytics.
      </FadeIn>
    </div>
  );
}

function QASlide() {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-10 max-w-5xl"
      >
        <div>
          <h2 className="text-6xl font-extrabold bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
            Q & A
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Realtime AI, infra, security, extensibility—let&apos;s explore.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Latency",
              pts: [
                "Optimizing audio packet size",
                "Edge caching of embeddings",
                "Adaptive streaming strategies",
              ],
            },
            {
              title: "Security",
              pts: [
                "Private endpoints rollout",
                "Key rotation cadence",
                "Session auth hardening",
              ],
            },
            {
              title: "RAG Quality",
              pts: [
                "Index refresh automation",
                "Chunking strategy tuning",
                "Re-ranking integration",
              ],
            },
            {
              title: "Expansion",
              pts: [
                "Multi-lingual voice output",
                "CRM action hooks",
                "User analytics overlay",
              ],
            },
          ].map((section) => (
            <div
              key={section.title}
              className="surface p-5 rounded-xl text-left"
            >
              <h4 className="font-semibold mb-2 text-accent">
                {section.title}
              </h4>
              <ul className="text-xs text-[var(--muted)] space-y-1">
                {section.pts.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-sm text-[var(--muted)]">
          Repository: Presight-AI / realtime-voice
        </div>
      </motion.div>
    </div>
  );
}

export default function RealtimeVoiceDeck({ slide }: DeckComponentProps) {
  const slides: Record<string, JSX.Element> = {
    title: <TitleSlide />,
    overview: <OverviewSlide />,
    features: <FeaturesSlide />,
    architecture: <ArchitectureSlide />,
    "repo-structure": <RepoStructureSlide />,
    "tech-stack": <TechStackSlide />,
    "dev-environment": <DevEnvironmentSlide />,
    "env-variables": <EnvVariablesSlide />,
    "ai-capabilities": <AiCapabilitiesSlide />,
    deployment: <DeploymentSlide />,
    infrastructure: <InfrastructureSlide />,
    "security-auth": <SecurityAuthSlide />,
    "testing-troubleshooting": <TestingTroubleshootingSlide />,
    "integration-customization": <IntegrationCustomizationSlide />,
    roadmap: <RoadmapSlide />,
    qa: <QASlide />,
  };
  return (
    slides[slide.id] || (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold">{slide.id}</h2>
          <p className="text-[var(--muted)] mt-2">
            Slide content not yet implemented.
          </p>
        </div>
      </div>
    )
  );
}
