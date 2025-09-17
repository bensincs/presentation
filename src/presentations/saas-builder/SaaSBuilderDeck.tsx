import React from "react";
import { motion } from "framer-motion";
import type { DeckComponentProps, SlideMeta } from "../../types";

export const saasBuilderSlides: SlideMeta[] = [
  { id: "title", transition: "fade" },
  { id: "purpose", transition: "slide" },
  { id: "architecture", transition: "slide" },
  { id: "folder-structure", transition: "slide" },
  { id: "developer-experience", transition: "slide" },
  { id: "database-migrations", transition: "slide" },
  { id: "marketplace-flow", transition: "slide" },
  { id: "billing-metering", transition: "slide" },
  { id: "telemetry-360", transition: "slide" },
  { id: "infrastructure-cicd", transition: "slide" },
  { id: "makefile-automation", transition: "slide" },
  { id: "future-roadmap", transition: "slide" },
  { id: "qa", transition: "fade" },
];

type FadeInProps = {
  delay?: number;
  className?: string;
  children?: React.ReactNode;
};
const FadeIn: React.FC<FadeInProps> = ({ delay = 0, className, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
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
        className="text-[clamp(42px,8vw,90px)] font-extrabold bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        SaaS Builder
      </motion.h1>
      <FadeIn
        delay={0.4}
        className="text-2xl font-light text-[var(--muted)] max-w-3xl mt-6"
      >
        Internal developer monorepo accelerating Azure Marketplace offer
        creation, billing integration & operational telemetry.
      </FadeIn>
      <FadeIn
        delay={0.75}
        className="flex gap-3 flex-wrap justify-center mt-10"
      >
        {[
          "Azure Marketplace",
          "Billing & Metering",
          "Telemetry 360",
          "Dev Containers",
          "Infra as Code",
          "Test Automation",
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

function PurposeSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-10">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
          Project Purpose
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn delay={0.2} className="surface p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-accent mb-3">
            Why It Exists
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2 leading-relaxed">
            <li>
              • Drastically reduce time-to-list for SaaS in Azure Marketplace
            </li>
            <li>
              • Provide opinionated scaffolding for offers, billing + customer
              lifecycle
            </li>
            <li>• Enable repeatable, observable & secure delivery patterns</li>
            <li>
              • Consolidate engineering surfaces (infra, backend, UI, demo app,
              telemetry)
            </li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className="surface p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-accent2 mb-3">
            Guiding Principles
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>
              • <strong>Modular:</strong> Services & infra components separable
            </li>
            <li>
              • <strong>Automated:</strong> Pipelines enforce quality &
              consistency
            </li>
            <li>
              • <strong>Observable:</strong> Unified telemetry & 360 dashboards
            </li>
            <li>
              • <strong>Extensible:</strong> ADR-driven evolution & templates
            </li>
          </ul>
        </FadeIn>
      </div>
    </div>
  );
}

function ArchitectureSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          High-Level Architecture
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Presentation & UX",
            color: "blue",
            pts: [
              "Vite + React frontend",
              "Marketplace onboarding flows",
              "Offer & plan configuration",
              "OIDC auth flows",
            ],
          },
          {
            title: "Application Layer",
            color: "emerald",
            pts: [
              "FastAPI backend services",
              "Biller & background job",
              "Schema-driven API generation",
              "OpenAPI typed clients",
            ],
          },
          {
            title: "Platform & Ops",
            color: "purple",
            pts: [
              "Terraform infra",
              "Azure managed Postgres",
              "Telemetry pipeline",
              "GitHub Actions CD",
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
        Flow: Subscriber → Marketplace → Offer Landing → Account + Subscription
        Activation → Billing + Telemetry → Fabric Dashboards
      </FadeIn>
    </div>
  );
}

function FolderStructureSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-6">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Repository Layout
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn delay={0.2} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-cyan-300 mb-3">
            Key Directories
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>
              • <strong>services/backend</strong> – FastAPI apps & shared
              modules
            </li>
            <li>
              • <strong>services/frontend</strong> – Marketplace UX (Mantine)
            </li>
            <li>
              • <strong>infra</strong> – Terraform (network, Postgres, apps)
            </li>
            <li>
              • <strong>bootstrap</strong> – Federated creds & backend setup
              scripts
            </li>
            <li>
              • <strong>utils/demo_saas_app</strong> – Example product & webhook
              demo
            </li>
            <li>
              • <strong>docs/ADR</strong> – Architecture Decision Records
            </li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-blue-300 mb-3">
            Conventions
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• ADR cadence drives evolution</li>
            <li>• Clear separation: infra vs app vs demo</li>
            <li>• Makefile as single automation surface</li>
            <li>• Environment overrides via tfvars & settings</li>
            <li>• Generated frontend types from backend schema</li>
          </ul>
        </FadeIn>
      </div>
    </div>
  );
}

function DeveloperExperienceSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          Developer Experience
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Dev Container",
            color: "emerald",
            pts: [
              "Pinned toolchain",
              "Terraform + tflint",
              "uv + Node + corepack",
              "Consistent onboarding",
            ],
          },
          {
            title: "Local Run Modes",
            color: "teal",
            pts: [
              "Full stack debug launch",
              "Frontend hot reload",
              "FastAPI reload",
              "Demo SaaS product",
            ],
          },
          {
            title: "Quality Gates",
            color: "green",
            pts: [
              "Lint (ESLint + tflint + flake8 style)",
              "Type check & tests",
              "Pre-commit automation",
              "Generated API clients",
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
        Quickstart: clone → reopen in container → make install → choose debugger
        profile.
      </FadeIn>
    </div>
  );
}

function DatabaseMigrationsSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Database Migrations
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn delay={0.2} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-yellow-300 mb-3">
            Architecture
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Alembic migrations executed at service startup</li>
            <li>• Distributed lock ensures single runner across replicas</li>
            <li>• Versioned, auditable change history</li>
            <li>• Multi-env support (dev / cloud)</li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-orange-300 mb-3">
            Commands
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs text-[var(--muted)]">
            {[
              "make migrate",
              "make migrate-status",
              'make migrate-create MESSAGE="Add table"',
              "make migrate-downgrade",
            ].map((c) => (
              <div
                key={c}
                className="surface p-2 rounded bg-gray-800/40 font-mono"
              >
                {c}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[var(--muted)]">
            Automatic strategy prevents redundant executions & race conditions.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}

function MarketplaceFlowSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
          Marketplace Flow
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            step: "1",
            title: "Subscribe",
            color: "pink",
            desc: "End user subscribes in Azure Marketplace",
          },
          {
            step: "2",
            title: "Landing",
            color: "rose",
            desc: "Redirect to offer landing page & account registration",
          },
          {
            step: "3",
            title: "Activate",
            color: "fuchsia",
            desc: "Subscription activation & billing scope association",
          },
          {
            step: "4",
            title: "Use Product",
            color: "violet",
            desc: "Access SaaS product & emit telemetry / usage",
          },
        ].map((s, i) => (
          <FadeIn
            key={s.step}
            delay={0.2 + i * 0.12}
            className={`surface p-5 rounded-xl border-l-4 border-${s.color}-500 text-center`}
          >
            <div className={`text-${s.color}-300 font-bold text-xl mb-2`}>
              Step {s.step}
            </div>
            <h3 className="font-semibold text-white mb-1">{s.title}</h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {s.desc}
            </p>
          </FadeIn>
        ))}
      </div>
      <FadeIn
        delay={0.75}
        className="mt-8 surface p-4 rounded-xl text-center text-sm text-[var(--muted)]"
      >
        Sequence diagrams (HLD) define subscriber & internal activation flows.
      </FadeIn>
    </div>
  );
}

function BillingMeteringSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          Billing & Metering
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn delay={0.2} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-red-300 mb-3">
            Components
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Biller API + usage event endpoints</li>
            <li>• Background job (aggregation / scheduling)</li>
            <li>• Example Billing Event UI (OpenAPI-driven)</li>
            <li>• Demo SaaS product sending usage & webhooks</li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-orange-300 mb-3">
            Flow & Validation
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Usage event schema generation from OpenAPI</li>
            <li>• Example JSON payload synthesis helpers</li>
            <li>• Meter dimension & plan configuration timeline</li>
            <li>• Future: reconciliation & anomaly detection</li>
          </ul>
        </FadeIn>
      </div>
      <FadeIn
        delay={0.65}
        className="mt-8 surface p-4 rounded-xl text-center text-xs text-[var(--muted)]"
      >
        ADR: OTLP as telemetry → billing conversion substrate.
      </FadeIn>
    </div>
  );
}

function Telemetry360Slide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent">
          360° Telemetry
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Collection",
            color: "cyan",
            pts: [
              "App logs & metrics",
              "Usage events",
              "Marketplace lifecycle events",
            ],
          },
          {
            title: "Processing",
            color: "teal",
            pts: [
              "Log Analytics Workspace",
              "Fabric ingestion",
              "Queryable datasets",
              "Dashboard modeling",
            ],
          },
          {
            title: "Insights",
            color: "sky",
            pts: [
              "Offer adoption",
              "Org creation rate",
              "API call patterns",
              "Billing event quality",
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
        Fabric dashboards surface real-time operational & business KPIs.
      </FadeIn>
    </div>
  );
}

function InfrastructureCicdSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Infrastructure & CI/CD
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Terraform",
            color: "indigo",
            pts: [
              "Env tfvars",
              "Postgres + networking",
              "Containerized services",
              "Key value outputs",
            ],
          },
          {
            title: "Bootstrap",
            color: "violet",
            pts: [
              "Federated creds",
              "Terraform backend state",
              "Identity setup scripts",
              "Provider registration",
            ],
          },
          {
            title: "Pipeline Jobs",
            color: "purple",
            pts: [
              "Semantic versioning",
              "Environment resolution",
              "Build & push images",
              "Post-deploy tests",
            ],
          },
          {
            title: "Deployment",
            color: "fuchsia",
            pts: [
              "Reusable workflows",
              "Secrets via Key Vault (concept)",
              "Future progressive rollout",
              "Evidence artifacts",
            ],
          },
        ].map((c, i) => (
          <FadeIn
            key={c.title}
            delay={0.2 + i * 0.12}
            className={`surface p-5 rounded-xl border-l-4 border-${c.color}-500`}
          >
            <h3 className={`text-sm font-semibold text-${c.color}-300 mb-2`}>
              {c.title}
            </h3>
            <ul className="text-[10px] text-[var(--muted)] space-y-1">
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
        Workflow order: generate_semver → identify_environment →
        build_and_push_services → deploy_application_infra →
        post_deploy_integration_tests.
      </FadeIn>
    </div>
  );
}

function MakefileAutomationSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">
          Makefile Automation
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn delay={0.2} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-lime-300 mb-3">
            Core Commands
          </h3>
          <div className="grid grid-cols-2 gap-3 text-[11px] text-[var(--muted)] font-mono">
            {[
              "make help",
              "make install",
              "make lint",
              "make test",
              "make gen-frontend-types",
              "make demo-app",
              "make migrate-status",
              "make migrate-create MESSAGE=...",
            ].map((c) => (
              <div key={c} className="surface p-2 rounded bg-gray-800/40">
                {c}
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.35} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-green-300 mb-3">
            DX Impact
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Single entrypoint reduces cognitive overhead</li>
            <li>• Consistent local vs CI behaviors</li>
            <li>• Encourages frequent lint/testing cycles</li>
            <li>
              • Accelerates onboarding (
              <span className="font-mono">make install</span>)
            </li>
          </ul>
        </FadeIn>
      </div>
      <FadeIn
        delay={0.65}
        className="mt-8 surface p-4 rounded-xl text-center text-xs text-[var(--muted)]"
      >
        Future: task graph + caching optimizations & performance profiling
        targets.
      </FadeIn>
    </div>
  );
}

function FutureRoadmapSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
          Future Roadmap
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Platform Evolution",
            color: "sky",
            pts: [
              "Multi-offer orchestration",
              "Service Bus events",
              "Feature flag service",
            ],
          },
          {
            title: "Quality & Ops",
            color: "indigo",
            pts: [
              "Contract & chaos tests",
              "Perf thresholds gating",
              "Automated evidence bundles",
            ],
          },
          {
            title: "Monetization & Insights",
            color: "blue",
            pts: [
              "Advanced usage analytics",
              "Anomaly billing detection",
              "Embedded customer dashboards",
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
        North Star: production-grade accelerator for rapid, compliant SaaS
        marketplace launches.
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
            Architecture, billing, telemetry, extensibility—let&apos;s dive
            deeper.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Adoption",
              pts: [
                "How to apply to existing products?",
                "Migration from accelerator?",
                "Custom marketplace flows?",
              ],
            },
            {
              title: "Billing",
              pts: [
                "Multi-dimension strategies",
                "Usage reconciliation",
                "Pricing model experiments",
              ],
            },
            {
              title: "Telemetry",
              pts: [
                "Fabric scaling patterns",
                "Real-time anomaly alerts",
                "Customer-facing metrics",
              ],
            },
            {
              title: "Security & Ops",
              pts: [
                "Secret management patterns",
                "RBAC expansion",
                "Hardening pipeline stages",
              ],
            },
          ].map((c) => (
            <div key={c.title} className="surface p-5 rounded-xl text-left">
              <h4 className="font-semibold mb-2 text-accent">{c.title}</h4>
              <ul className="text-xs text-[var(--muted)] space-y-1">
                {c.pts.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-sm text-[var(--muted)]">
          Repository: Presight-AI / saas-builder
        </div>
      </motion.div>
    </div>
  );
}

export default function SaaSBuilderDeck({ slide }: DeckComponentProps) {
  const components: Record<string, JSX.Element> = {
    title: <TitleSlide />,
    purpose: <PurposeSlide />,
    architecture: <ArchitectureSlide />,
    "folder-structure": <FolderStructureSlide />,
    "developer-experience": <DeveloperExperienceSlide />,
    "database-migrations": <DatabaseMigrationsSlide />,
    "marketplace-flow": <MarketplaceFlowSlide />,
    "billing-metering": <BillingMeteringSlide />,
    "telemetry-360": <Telemetry360Slide />,
    "infrastructure-cicd": <InfrastructureCicdSlide />,
    "makefile-automation": <MakefileAutomationSlide />,
    "future-roadmap": <FutureRoadmapSlide />,
    qa: <QASlide />,
  };
  return (
    components[slide.id] || (
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
