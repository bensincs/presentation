import React from "react";
import { motion } from "framer-motion";
import DeckDisclaimer from "../components/DeckDisclaimer";
import type { DeckComponentProps, SlideMeta } from "../../types";

const gradientTitle =
  "text-5xl font-bold bg-gradient-to-r from-lime-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent";
const surface =
  "surface rounded-2xl border border-white/5 bg-white/5 px-6 py-5 shadow-lg shadow-black/20";
const mutedText = "text-sm text-[var(--muted)] leading-relaxed";
const pill =
  "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/70";

export const hveMcpSlides: SlideMeta[] = [
  {
    id: "title",
    transition: "fade",
    speakerNotes: [
      "Welcome the audience and introduce the story: using Hyper Velocity Engineering (HVE) to ship an MCP server in hours, not weeks.",
      "Explain the punchline: we handed the MCP SDK to the HVE automation and asked it to build an Azure ML MCP server end-to-end.",
      "Set expectations: this deck walks through mindset, automation scaffolding, architecture, tooling, testing, and the resulting developer experience.",
      "Invite folks to treat this as a playbook for their own MCP experiments with Azure or other clouds.",
    ],
  },
  {
    id: "hve-principles",
    transition: "slide",
    speakerNotes: [
      "Anchor everyone in Hyper Velocity Engineering—how we define it and how it translates to this project.",
      "Highlight the three principles: spec-first, automation-first, evidence-backed.",
      "Call out the tactical accelerators we used: reusable scaffolds, AI pair programming, infrastructure templates.",
      "Segway to the problem statement slide—why we needed an Azure Machine Learning MCP server in the first place.",
    ],
  },
  {
    id: "problem-statement",
    transition: "slide",
    speakerNotes: [
      "Explain the initial friction: MCP ecosystem lacked a reference server for Azure ML actions.",
      "Mention stakeholders: data scientists, platform engineers, AI agents needing secure access to Azure ML.",
      "Describe the constraint: limited time, so we leaned on HVE automation to generate most of the server.",
      "Set the scene for the solution overview showing what the server delivers.",
    ],
  },
  {
    id: "solution-overview",
    transition: "slide",
    speakerNotes: [
      "Summarize the outcome: GitHub repo with a fully functioning MCP server bridging Azure ML APIs.",
      "Highlight the artifacts generated: schema, handlers, Azure credential plumbing, telemetry hooks.",
      "Mention the minimal human input: “Here is the MCP SDK—build me a server for Azure ML.”",
      "Invite the audience to notice the combination of auto-generated and curated code on the next slides.",
    ],
  },
  {
    id: "automation-pipeline",
    transition: "slide",
    speakerNotes: [
      "Walk through the HVE pipeline: spec capture, AI pair generation, verification loops, packaging.",
      "Call out each stage—Prompt Engine, Scaffold Builder, Test Harness, Documentation Generator.",
      "Emphasize feedback loops: failing tests or lint reroute to the prompt engine automatically.",
      "Reassure attendees that humans still provide oversight via checkpoints noted in the diagram.",
    ],
  },
  {
    id: "repo-structure",
    transition: "slide",
    speakerNotes: [
      "Tour the repository produced by the automation.",
      "Explain each folder: server/handlers, azure/clients, tests/, docs/, infra/.",
      "Point out quickstart scripts enabling one-command setup and local runs.",
      "Mention the README callout—it narrates how the automation built the project, aiding future contributors.",
    ],
  },
  {
    id: "server-architecture",
    transition: "slide",
    speakerNotes: [
      "Dive into the runtime architecture: MCP server core, Azure ML client layer, observability.",
      "Highlight that the server exposes tools for dataset listing, job submission, endpoint invocation.",
      "Explain credential options—managed identity, service principal, developer login.",
      "Call attention to resilience: retries, timeouts, structured logging plug-ins.",
    ],
  },
  {
    id: "ai-collaboration",
    transition: "slide",
    speakerNotes: [
      "Share the AI pair programming workflow: prompts, generated patches, review criteria.",
      "Note the time savings—80% of scaffolding shipped via AI suggestions guided by our HVE prompts.",
      "Explain human guardrails: lint, unit tests, manual review of Azure-specific behaviors.",
      "Encourage teams to capture prompt/response transcripts—they become living documentation.",
    ],
  },
  {
    id: "testing-validation",
    transition: "slide",
    speakerNotes: [
      "Detail the automated test strategy: unit tests for handlers, contract tests against Azure ML, smoke tests for tool registration.",
      "Mention sandbox resources used to avoid impacting production workspaces.",
      "Highlight the evidence bundle produced—CI artifacts, sample transcripts, latency measurements.",
      "Underscore that evidence-first is core to HVE; shipping fast must still prove safety and reliability.",
    ],
  },
  {
    id: "developer-experience",
    transition: "slide",
    speakerNotes: [
      "Show the developer workflow: clone repo, run make bootstrap, launch MCP server, connect via Claude or other clients.",
      "Note the generated companion docs: tool reference, env configuration, troubleshooting FAQ.",
      "Explain that the automation even authored demo conversations so teams can validate end-to-end quickly.",
      "Share qualitative impact: new contributors onboard in under an hour thanks to scripted DX.",
    ],
  },
  {
    id: "learnings",
    transition: "slide",
    speakerNotes: [
      "Reflect on lessons learned: prompts need precise guardrails, Azure ML SDK nuance still requires human review.",
      "Call out what worked well: scaffolding reuse, pipeline modularity, evidence bundling.",
      "Be candid about pain points: rate limits, SDK gaps, prompting iteration for auth flows.",
      "Position these learnings as inputs for improving the HVE automation stack.",
    ],
  },
  {
    id: "roadmap",
    transition: "slide",
    speakerNotes: [
      "Outline near-term enhancements: expand tool coverage, add cost telemetry, support Azure ML workspaces at scale.",
      "Describe longer-term plans: multi-cloud MCP abstraction, pluggable policies, automation as a service.",
      "Invite collaborators to open issues or PRs—link to GitHub repo tasks.",
      "Set expectation that the HVE automation will continue iterating on this server weekly.",
    ],
  },
  {
    id: "qa",
    transition: "fade",
    speakerNotes: [
      "Encourage discussion: what would attendees automate next using HVE? Which MCP integrations would help their teams?",
      "Offer to walk through scripts or prompt templates live if requested.",
      "Share follow-up channels: GitHub issues, internal Teams/Slack, HVE office hours.",
      "Close by reiterating the mantra: ship fast, prove it works, document the runway for others.",
    ],
  },
];

type FadeInProps = {
  delay?: number;
  className?: string;
  children?: React.ReactNode;
};

const FadeIn: React.FC<FadeInProps> = ({ delay = 0, className, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

function TitleSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8">
      <motion.h1
        className="text-[clamp(44px,8vw,96px)] font-extrabold bg-gradient-to-r from-lime-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        HVE-ing an MCP Server
      </motion.h1>
      <FadeIn delay={0.35} className="max-w-3xl text-2xl text-[var(--muted)]">
        Hyper Velocity Engineering playbook for building the Azure Machine
        Learning MCP server with minimal human effort.
      </FadeIn>
      <FadeIn delay={0.5} className="mt-10 flex flex-wrap justify-center gap-3">
        {[
          "Hyper Velocity Engineering",
          "Model Context Protocol",
          "Azure Machine Learning",
          "AI Pair Programming",
        ].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/80"
          >
            {tag}
          </span>
        ))}
      </FadeIn>
      <FadeIn delay={0.65} className="mt-12 grid gap-4 text-left sm:grid-cols-3">
        {[
          { label: "Idea → MVP", value: "6 hours", tone: "lime" },
          { label: "Automation authored", value: "2,400+ LOC", tone: "sky" },
          { label: "Manual edits", value: "< 12 commits", tone: "indigo" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--muted)]"
          >
            <div className={`text-${stat.tone}-100 text-xs uppercase`}>
              {stat.label}
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </div>
        ))}
      </FadeIn>
    </div>
  );
}

function PrinciplesSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-10 text-center">
        <h2 className={gradientTitle}>Hyper Velocity Engineering Principles</h2>
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Spec-First",
            tone: "lime",
            points: [
              "Capture API surface, success criteria, and evidence needs before coding.",
              "Feed structured spec to the prompt engine so AI outputs stay on track.",
            ],
          },
          {
            title: "Automation-First",
            tone: "sky",
            points: [
              "Let scaffolds, generators, and pipelines do repetitive work.",
              "Codify guardrails (lint, auth checks) instead of manual review cycles.",
            ],
          },
          {
            title: "Evidence-Backed",
            tone: "indigo",
            points: [
              "Every release bundles tests, logs, latency metrics, and docs.",
              "Ship faster without sacrificing production readiness.",
            ],
          },
        ].map((card, index) => (
          <FadeIn
            key={card.title}
            delay={0.2 + index * 0.12}
            className={`${surface} border-${card.tone}-400/30 bg-${card.tone}-500/10`}
          >
            <h3 className={`text-lg font-semibold text-${card.tone}-100`}>
              {card.title}
            </h3>
            <ul className={`${mutedText} space-y-2`}>
              {card.points.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.55} className="mt-8 text-center text-xs text-white/70">
        These principles produced the Azure ML MCP server with only a handful of
        human touches.
      </FadeIn>
    </div>
  );
}

function ProblemStatementSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>The Gap We Needed to Close</h2>
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-2">
        <FadeIn delay={0.2} className={`${surface} space-y-3`}>
          <span className={pill}>Challenge</span>
          <ul className={`${mutedText} space-y-2`}>
            <li>
              • MCP ecosystem lacked a reference server that could drive Azure ML
              training jobs, deployments, and asset management.
            </li>
            <li>
              • Azure ML APIs are broad and opinionated—manual integration would
              take weeks.
            </li>
            <li>
              • AI agents needed secure, auditable access without handing them full
              portal permissions.
            </li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className={`${surface} space-y-3`}>
          <span className={pill}>Constraints</span>
          <ul className={`${mutedText} space-y-2`}>
            <li>
              • 48-hour delivery window to support an internal demo using Claude's
              MCP client.
            </li>
            <li>• Minimal human cycles—leaned heavily on HVE automation + AI pair.</li>
            <li>
              • Required solid evidence bundle to convince security reviewers it was
              safe.
            </li>
          </ul>
        </FadeIn>
      </div>
    </div>
  );
}

function SolutionOverviewSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Solution Snapshot</h2>
      </FadeIn>
      <div className={`${surface} space-y-5`}>
        <FadeIn delay={0.2}>
          <span className={pill}>Repo: bensincs/azure-machine-learning-mcp</span>
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-2">
          <FadeIn delay={0.3} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-xs text-[var(--muted)]">
{`Generated Artifacts
---------------
- MCP server bootstrap & runtime
- Azure ML tool handlers (datasets, jobs, endpoints)
- Credential + config layer with managed identity support
- Observability: structured logs, latency metrics, request tracing
- Developer docs, quickstart script, acceptance test harness
`}
          </FadeIn>
          <FadeIn delay={0.42} className={`${surface} space-y-3`}>
            <h3 className="text-sm font-semibold text-white/90">
              Minimal Prompt, Maximum Output
            </h3>
            <p className={mutedText}>
              Input to the automation: “Here is the MCP SDK—create an Azure
              Machine Learning MCP server that can list assets, run jobs, and
              deploy endpoints.”
            </p>
            <p className="text-xs text-white/70">
              HVE orchestrated the rest: scaffolding, code generation, test
              creation, docs, and release packaging.
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

function AutomationPipelineSlide() {
  const stages = [
    {
      title: "Spec Capture",
      detail:
        "Prompt templates gather desired tools, auth flows, success metrics, and evidence requirements.",
      tone: "lime",
    },
    {
      title: "Scaffold Builder",
      detail:
        "Generators produce TypeScript project skeleton, config schema, CI workflow, Makefile.",
      tone: "sky",
    },
    {
      title: "AI Pairing Loop",
      detail:
        "Iterative prompts to Claude/GPT build handlers, clients, tests; failures auto-routed back with context.",
      tone: "indigo",
    },
    {
      title: "Verification & Docs",
      detail:
        "make check ensures lint + tests; doc generator summarizes endpoints, env vars, evidence artifacts.",
      tone: "violet",
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-10 text-center">
        <h2 className={gradientTitle}>Automation Pipeline</h2>
      </FadeIn>
      <div className="grid gap-6 md:grid-cols-2">
        {stages.map((stage, index) => (
          <FadeIn
            key={stage.title}
            delay={0.2 + index * 0.12}
            className={`${surface} border-${stage.tone}-400/30 bg-${stage.tone}-500/12`}
          >
            <h3 className={`text-lg font-semibold text-${stage.tone}-100`}>
              {stage.title}
            </h3>
            <p className={mutedText}>{stage.detail}</p>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function RepoStructureSlide() {
  const sections = [
    {
      title: "server/",
      detail: "MCP entrypoint, tool registration, main runtime loop.",
      tone: "lime",
    },
    {
      title: "azure/",
      detail: "Azure ML REST + SDK clients, auth helpers, type definitions.",
      tone: "sky",
    },
    {
      title: "tools/",
      detail: "Handlers for datasets, jobs, endpoints, workspace configuration.",
      tone: "indigo",
    },
    {
      title: "tests/",
      detail: "Unit + integration suites, fixture data, mocking utilities.",
      tone: "violet",
    },
    {
      title: "infra/",
      detail: "Devcontainer, make targets, optional Bicep templates for Azure resources.",
      tone: "emerald",
    },
    {
      title: "docs/",
      detail: "Quickstart, tool catalog, troubleshooting, prompt transcripts.",
      tone: "amber",
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Repository Walkthrough</h2>
      </FadeIn>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section, index) => (
          <FadeIn
            key={section.title}
            delay={0.2 + index * 0.08}
            className={`${surface} border-${section.tone}-400/25 bg-${section.tone}-500/12`}
          >
            <h3 className={`text-lg font-semibold text-${section.tone}-100`}>
              {section.title}
            </h3>
            <p className={mutedText}>{section.detail}</p>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function ServerArchitectureSlide() {
  const layers = [
    {
      title: "MCP Core",
      detail:
        "HTTP/JSON protocol handlers, session management, tool invocation pipeline, streaming responses.",
      tone: "sky",
    },
    {
      title: "Azure ML Client",
      detail:
        "REST SDK wrapper with strongly typed calls for workspaces, jobs, endpoints, model registry.",
      tone: "indigo",
    },
    {
      title: "Security Layer",
      detail:
        "Managed identity or service principal auth, scoped role assignments, request signing, audit logs.",
      tone: "emerald",
    },
    {
      title: "Observability",
      detail:
        "Structured logging, OpenTelemetry wiring, latency histograms, failure tagging for retries.",
      tone: "violet",
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Runtime Architecture</h2>
      </FadeIn>
      <div className="grid gap-6 md:grid-cols-2">
        {layers.map((layer, index) => (
          <FadeIn
            key={layer.title}
            delay={0.2 + index * 0.1}
            className={`${surface} border-${layer.tone}-400/30 bg-${layer.tone}-500/10`}
          >
            <h3 className={`text-lg font-semibold text-${layer.tone}-100`}>
              {layer.title}
            </h3>
            <p className={mutedText}>{layer.detail}</p>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function AiCollaborationSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>AI Collaboration Workflow</h2>
      </FadeIn>
      <div className={`${surface} space-y-5`}>
        <FadeIn delay={0.2}>
          <span className={pill}>Prompt → Generate → Verify → Iterate</span>
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-2">
          <FadeIn delay={0.3} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-xs text-[var(--muted)]">
{`Sample Prompt
-------------
"Using the MCP TypeScript SDK, create a tool handler that lists Azure ML endpoints.
Inputs: workspaceName, resourceGroupName. Output: array with name, deployment state, traffic."
`}
          </FadeIn>
          <FadeIn delay={0.42} className={`${surface} space-y-3`}>
            <h3 className="text-sm font-semibold text-white/80">
              Quality Gates
            </h3>
            <ul className={`${mutedText} space-y-2`}>
              <li>• gofmt + eslint via pre-commit</li>
              <li>• unit tests generated by the automation & human-curated edge cases</li>
              <li>• manual Azure ML dry runs to validate permissions and payloads</li>
            </ul>
            <p className="text-xs text-white/70">
              Failed gates automatically re-prompt the AI with context about the failure
              until the patch passes.
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

function TestingValidationSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Testing & Validation</h2>
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Unit & Contract Tests",
            detail:
              "Jest + ts-node tests cover tool handlers, schema validation, Azure ML client wrappers.",
            tone: "lime",
          },
          {
            title: "Azure Sandbox Runs",
            detail:
              "Automated workflow provisions temporary workspace, exercises list/run/deploy flows, deletes artifacts.",
            tone: "sky",
          },
          {
            title: "Evidence Bundle",
            detail:
              "CI captures logs, latency histograms, sample transcripts, and screenshot of Claude connecting successfully.",
            tone: "indigo",
          },
        ].map((card, index) => (
          <FadeIn
            key={card.title}
            delay={0.2 + index * 0.12}
            className={`${surface} border-${card.tone}-400/25 bg-${card.tone}-500/12`}
          >
            <h3 className={`text-lg font-semibold text-${card.tone}-100`}>
              {card.title}
            </h3>
            <p className={mutedText}>{card.detail}</p>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function DeveloperExperienceSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Developer Experience</h2>
      </FadeIn>
      <div className={`${surface} space-y-6`}>
        <div className="grid gap-6 md:grid-cols-2">
          <FadeIn delay={0.2} className="space-y-3">
            <span className={pill}>Quickstart Workflow</span>
            <ol className="list-decimal list-inside space-y-2 text-sm text-[var(--muted)]">
              <li>git clone github.com/bensincs/azure-machine-learning-mcp</li>
              <li>make bootstrap (installs deps, pre-commit, env template)</li>
              <li>az login & copy workspace credentials into .env</li>
              <li>npm run dev to launch MCP server locally</li>
              <li>Connect Claude Desktop → Add server → Run sample conversation</li>
            </ol>
          </FadeIn>
          <FadeIn delay={0.35} className="space-y-3">
            <span className={pill}>Support Artifacts</span>
            <ul className={`${mutedText} space-y-2`}>
              <li>• Tool catalog with arguments, sample responses, latency expectations.</li>
              <li>• Troubleshooting FAQ (auth errors, workspace RBAC, quota hits).</li>
              <li>• Demo scripts showing real-world scenarios (model deploy, batch job).</li>
              <li>• One-line cleanup script to remove sandbox resources safely.</li>
            </ul>
          </FadeIn>
        </div>
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-100">
          Onboarding outcome: new engineers connected the server to their Claude
          client in under 30 minutes using the auto-generated docs.
        </div>
      </div>
    </div>
  );
}

function LearningsSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Key Learnings</h2>
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-2">
        <FadeIn delay={0.2} className={`${surface} space-y-3`}>
          <span className={pill}>What Worked</span>
          <ul className={`${mutedText} space-y-2`}>
            <li>• Prompt scaffolding captured dependencies and coding standards up front.</li>
            <li>• Reusable automation modules (Makefile, CI, README) accelerated finish line.</li>
            <li>• Evidence-first mindset sped up security review—logs and tests were ready instantly.</li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className={`${surface} space-y-3`}>
          <span className={pill}>What We Tweaked</span>
          <ul className={`${mutedText} space-y-2`}>
            <li>• Azure auth flows needed manual review—AI struggled with conditional logic.</li>
            <li>• Rate limits forced batching requests; added exponential backoff and caching.</li>
            <li>• Prompt templates refined to reduce hallucinated SDK imports.</li>
          </ul>
        </FadeIn>
      </div>
      <FadeIn delay={0.55} className="mt-6 text-center text-xs text-white/70">
        Each iteration makes the HVE automation smarter—future MCP servers will
        ship even faster.
      </FadeIn>
    </div>
  );
}

function RoadmapSlide() {
  const items = [
    {
      title: "Near-Term",
      tone: "lime",
      bullets: [
        "Expand toolset: model registry insights, pipeline runs, lineage graph.",
        "Add cost guardrails & telemetry dashboards.",
        "Package as container image with optional Azure Functions hosting.",
      ],
    },
    {
      title: "Mid-Term",
      tone: "sky",
      bullets: [
        "Support multi-workspace & multi-tenant configurations.",
        "Introduce policy layer for RBAC and data access approvals.",
        "Integrate with DevOps pipelines for automated retraining triggers.",
      ],
    },
    {
      title: "Long-Term",
      tone: "indigo",
      bullets: [
        "Offer MCP server templates for other Azure services (Cognitive Search, Synapse).",
        "Expose automation as-a-service so teams can generate bespoke MCP servers on demand.",
        "Publish internal HVE prompt library for broader reuse.",
      ],
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Roadmap</h2>
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-3">
        {items.map((item, index) => (
          <FadeIn
            key={item.title}
            delay={0.2 + index * 0.12}
            className={`${surface} border-${item.tone}-400/25 bg-${item.tone}-500/10`}
          >
            <h3 className={`text-lg font-semibold text-${item.tone}-100`}>
              {item.title}
            </h3>
            <ul className={`${mutedText} space-y-2`}>
              {item.bullets.map((bullet) => (
                <li key={bullet}>• {bullet}</li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.6} className="mt-6 text-center text-xs text-white/70">
        Contributions welcome → github.com/bensincs/azure-machine-learning-mcp/issues
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
        className="max-w-4xl space-y-8"
      >
        <div className="space-y-4">
          <h2 className="text-6xl font-extrabold bg-gradient-to-r from-lime-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent">
            Q & A
          </h2>
          <p className="text-lg text-[var(--muted)]">
            Let’s explore next steps—what MCP integrations or HVE automations
            should we tackle together?
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 text-left text-sm text-[var(--muted)]">
          <div className="surface rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold text-white/80 mb-2">
              Discussion Hooks
            </h3>
            <ul className="space-y-1.5">
              <li>• Hardening the server for regulated data</li>
              <li>• Extending to other Azure services or clouds</li>
              <li>• Automating governance & cost controls</li>
            </ul>
          </div>
          <div className="surface rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold text-white/80 mb-2">
              Follow-up Links
            </h3>
            <ul className="space-y-1.5">
              <li>• GitHub repo & issues board</li>
              <li>• HVE prompt templates (internal wiki)</li>
              <li>• Office hours: Fridays @ 10am PT</li>
            </ul>
          </div>
        </div>
        <div className="text-xs text-white/60">
          Connect: GitHub @bensincs · Teams/Slack #hve · Docs & evidence bundle in repo
        </div>
      </motion.div>
    </div>
  );
}

const slideMap: Record<string, React.ReactNode> = {
  title: <TitleSlide />,
  "hve-principles": <PrinciplesSlide />,
  "problem-statement": <ProblemStatementSlide />,
  "solution-overview": <SolutionOverviewSlide />,
  "automation-pipeline": <AutomationPipelineSlide />,
  "repo-structure": <RepoStructureSlide />,
  "server-architecture": <ServerArchitectureSlide />,
  "ai-collaboration": <AiCollaborationSlide />,
  "testing-validation": <TestingValidationSlide />,
  "developer-experience": <DeveloperExperienceSlide />,
  learnings: <LearningsSlide />,
  roadmap: <RoadmapSlide />,
  qa: <QASlide />,
};

export default function HVEMcpDeck({ slide }: DeckComponentProps) {
  const content = slideMap[slide.id] ?? (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold">{slide.id}</h2>
        <p className="mt-2 text-[var(--muted)]">
          Slide content on deck—feel free to contribute an idea!
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex h-full flex-col">
      <DeckDisclaimer />
      <div className="flex-1 overflow-hidden">{content}</div>
    </div>
  );
}
