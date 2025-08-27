import React from "react";
import { motion } from "framer-motion";
import type { DeckComponentProps } from "../../types";
import type { SlideMeta } from "../../types";

// Ordered slide metadata exported for the router
export const medicineDeliverySlides: SlideMeta[] = [
  { id: "title", transition: "fade" },
  { id: "overview", transition: "slide" },
  { id: "architecture", transition: "slide" },
  { id: "infrastructure", transition: "slide" },
  { id: "backend-stack", transition: "slide" },
  { id: "features", transition: "slide" },
  { id: "cicd", transition: "slide" },
  { id: "qa-automation", transition: "slide" },
  { id: "security", transition: "slide" },
  { id: "dev-workflow", transition: "slide" },
  { id: "future", transition: "slide" },
  { id: "qa", transition: "fade" },
];

// Utility animation wrappers
type FadeInProps = {
  delay?: number;
  className?: string;
  children?: React.ReactNode;
};
const FadeIn: React.FC<FadeInProps> = ({ delay = 0, className, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// Title Slide
function TitleSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8">
      <motion.h1
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="text-[clamp(40px,8vw,84px)] font-extrabold bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent"
      >
        Medicine Delivery POC
      </motion.h1>
      <FadeIn
        delay={0.4}
        className="text-2xl text-[var(--muted)] font-light max-w-3xl mt-6"
      >
        Hyper Velocity Engineering reference implementation for secure, testable
        & observable healthcare delivery services on Azure
      </FadeIn>
      <FadeIn delay={0.7} className="flex gap-3 flex-wrap justify-center mt-10">
        {[
          "Terraform IaC",
          "Spring Boot",
          "PostgreSQL",
          "Copilot + HVE",
          "QA Automation",
          "App Sec",
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
        September 2025 • Core 42 / Microsoft Collaboration
      </FadeIn>
    </div>
  );
}

// Overview
function OverviewSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-10">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
          Project Overview
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn delay={0.2} className="surface p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-3 text-accent">Purpose</h3>
          <p className="text-[var(--muted)] leading-relaxed text-sm md:text-base">
            Provide an end‑to‑end pattern for medicine delivery workflows:
            prescription ingestion (Malaffi mock), medication catalog, ordering,
            and operational visibility – built to showcase speed, quality gates
            & traceability under Hyper Velocity Engineering.
          </p>
          <ul className="mt-4 text-sm space-y-1 text-[var(--muted)]">
            <li>• Accelerate regulated domain prototyping</li>
            <li>• Embed compliance, security & quality from day 0</li>
            <li>• Enable AI-assisted developer workflows (Copilot config)</li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className="surface p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-3 text-accent2">
            Domains & Streams
          </h3>
          <ul className="text-sm space-y-2 text-[var(--muted)]">
            <li>
              <strong>Backend API:</strong> Spring Boot microservice(s)
            </li>
            <li>
              <strong>Malaffi Service:</strong> External prescription
              integration example
            </li>
            <li>
              <strong>Infrastructure:</strong> Terraform Azure baseline
              (network, db, container apps, ACR, logging)
            </li>
            <li>
              <strong>QA Automation:</strong> API, mobile (Appium), performance
              (k6), security (OWASP ZAP)
            </li>
            <li>
              <strong>Dev Experience:</strong> Copilot custom instructions &
              prompts
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
      <FadeIn className="mb-10 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          High-Level Architecture
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Edge / Clients",
            points: [
              "Mobile app (future)",
              "API consumers",
              "Automation test clients",
            ],
            color: "blue",
          },
          {
            title: "Application Layer",
            points: [
              "Medication Delivery API",
              "Malaffi mock service",
              "Auth & validation",
              "Business rules",
            ],
            color: "emerald",
          },
          {
            title: "Platform & Ops",
            points: [
              "Azure Container Apps",
              "PostgreSQL (managed)",
              "ACR + Key Vault (conceptual)",
              "Observability & CI",
            ],
            color: "purple",
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
            <ul className="text-sm space-y-1 text-[var(--muted)]">
              {c.points.map((p) => (
                <li key={p}>• {p}</li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
      <FadeIn
        delay={0.7}
        className="mt-10 surface p-4 rounded-xl text-center text-sm text-[var(--muted)]"
      >
        Flow: Client → API Gateway (future) → Spring Boot services → PostgreSQL
        • Logs + Metrics → Quality Gates → Evidence
      </FadeIn>
    </div>
  );
}

function InfrastructureSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Infrastructure as Code
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn delay={0.15} className="surface p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-cyan-300 mb-3">
            Terraform Modules
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• VNet & Subnets (network isolation)</li>
            <li>• Azure Container Apps environment + app</li>
            <li>• PostgreSQL Flexible Server</li>
            <li>• Azure Container Registry</li>
            <li>• Log Analytics workspace</li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.3} className="surface p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-cyan-300 mb-3">
            Deployment Workflow
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Validate → Plan → Apply pipeline stages</li>
            <li>• Environment tfvars (dev / staging / prod)</li>
            <li>• Naming convention: project-env-type</li>
            <li>• Scripted deploy & backend service rollout</li>
            <li>• Output summary (URLs, connection info)</li>
          </ul>
        </FadeIn>
      </div>
      <FadeIn
        delay={0.55}
        className="mt-8 surface p-4 rounded-xl text-sm text-[var(--muted)]"
      >
        Security Features: Private networking • RBAC / least privilege • SSL
        enforced DB • Image verification • Central logging
      </FadeIn>
    </div>
  );
}

function BackendStackSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          Backend Stack
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Core Tech",
            color: "green",
            items: [
              "Java 21",
              "Spring Boot",
              "Maven build",
              "Flyway migrations",
            ],
          },
          {
            title: "Data Layer",
            color: "emerald",
            items: [
              "PostgreSQL",
              "H2 (tests)",
              "Migration versioning",
              "Connection pooling",
            ],
          },
          {
            title: "Observability",
            color: "lime",
            items: [
              "Actuator endpoints",
              "Health + metrics",
              "Structured logs",
              "Future: tracing",
            ],
          },
        ].map((c, i) => (
          <FadeIn
            key={c.title}
            delay={0.2 + i * 0.12}
            className={`surface p-6 rounded-xl border-l-4 border-${c.color}-500`}
          >
            <h3 className={`text-lg font-semibold text-${c.color}-300 mb-3`}>
              {c.title}
            </h3>
            <ul className="text-sm text-[var(--muted)] space-y-1">
              {c.items.map((it) => (
                <li key={it}>• {it}</li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
      <FadeIn
        delay={0.65}
        className="mt-8 surface p-4 rounded-xl text-center text-sm text-[var(--muted)]"
      >
        Access Points (dev): /swagger-ui.html • /actuator/health • Auth (basic
        creds) for protected operations
      </FadeIn>
    </div>
  );
}

function FeaturesSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Key Backend Features
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn delay={0.2} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-yellow-300 mb-3">
            Functional
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Medication & pharmacy management endpoints</li>
            <li>• Order lifecycle foundation (extensible)</li>
            <li>• External prescription ingestion pattern</li>
            <li>• Structured API with OpenAPI docs</li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-orange-300 mb-3">
            Quality & Testing
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Unit + integration tests (Testcontainers)</li>
            <li>• JaCoCo coverage gating (≥80% target)</li>
            <li>• API tests (Playwright Python)</li>
            <li>• Mobile UI skeleton (Appium) & perf tests (k6)</li>
          </ul>
        </FadeIn>
      </div>
      <FadeIn
        delay={0.6}
        className="mt-8 surface p-4 rounded-xl text-sm text-[var(--muted)] text-center"
      >
        Security scanning: CodeQL & dependency scanning integrated into pipeline
      </FadeIn>
    </div>
  );
}

function CicdSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
          CI/CD Pipeline
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            step: "Build & Test",
            color: "pink",
            pts: [
              "Compile + unit tests",
              "Integration tests",
              "Coverage report",
            ],
          },
          {
            step: "Security",
            color: "rose",
            pts: ["CodeQL", "OWASP dep scan", "Quality gates"],
          },
          {
            step: "Artifacts",
            color: "fuchsia",
            pts: [
              "Versioned JARs",
              "Reports retention",
              "Evidence bundle (future)",
            ],
          },
          {
            step: "Deploy (Future)",
            color: "violet",
            pts: [
              "Staged envs",
              "Auto infra drift check",
              "Progressive rollout",
            ],
          },
        ].map((b, i) => (
          <FadeIn
            key={b.step}
            delay={0.2 + i * 0.12}
            className={`surface p-5 rounded-xl border-l-4 border-${b.color}-500`}
          >
            <h3 className={`font-semibold text-${b.color}-300 mb-2`}>
              {b.step}
            </h3>
            <ul className="text-xs text-[var(--muted)] space-y-1">
              {b.pts.map((p) => (
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
        Local script mirrors pipeline for fast feedback; future enhancements:
        performance gates, SonarQube, staged deploy automation.
      </FadeIn>
    </div>
  );
}

function QaAutomationSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          QA Automation Stack
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FadeIn delay={0.2} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-indigo-300 mb-3">
            Test Layers
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Unit & integration (Java)</li>
            <li>
              • API tests (Playwright Python) – auth, prescriptions, smoke
            </li>
            <li>• Mobile UI (Appium) baseline structure</li>
            <li>• Performance (k6) simple & advanced scenarios</li>
            <li>• Security (OWASP ZAP API scan)</li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-purple-300 mb-3">
            Pipeline Value
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Fast feedback loops</li>
            <li>• Evidence artifacts: reports, coverage, scan outputs</li>
            <li>• Extensible folder conventions (spikes, adrs, docs)</li>
            <li>• Clear next-step tasks (roadmap markers)</li>
            <li>• On-ramp for new test contributors</li>
          </ul>
        </FadeIn>
      </div>
      <FadeIn
        delay={0.6}
        className="mt-8 surface p-4 rounded-xl text-center text-sm text-[var(--muted)]"
      >
        Quality gates evolve with maturity: start simple → add depth (perf
        thresholds, risk-based security suites).
      </FadeIn>
    </div>
  );
}

function SecuritySlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          Security & Compliance
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Shift-Left",
            color: "red",
            pts: [
              "CodeQL static analysis",
              "Dependency vulnerability scanning",
              "Fail-fast quality gates",
            ],
          },
          {
            title: "Platform",
            color: "orange",
            pts: [
              "Private networking",
              "Image tag verification",
              "Configurable secrets management",
            ],
          },
          {
            title: "Data & Ops",
            color: "amber",
            pts: [
              "SSL DB enforcement",
              "Health & metrics endpoints",
              "Future: RBAC & audit event store",
            ],
          },
        ].map((s, i) => (
          <FadeIn
            key={s.title}
            delay={0.2 + i * 0.14}
            className={`surface p-6 rounded-xl border-l-4 border-${s.color}-500`}
          >
            <h3 className={`text-lg font-semibold text-${s.color}-300 mb-3`}>
              {s.title}
            </h3>
            <ul className="text-xs text-[var(--muted)] space-y-1">
              {s.pts.map((p) => (
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
        Roadmap: SAST + DAST consolidation • Secrets scanning • Policy as code •
        Compliance evidence bundling.
      </FadeIn>
    </div>
  );
}

function DevWorkflowSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
          Dev Workflow & HVE
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn delay={0.2} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-teal-300 mb-3">
            Copilot & Prompts
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Central instructions guide consistent AI output</li>
            <li>• Task‑specific prompt files accelerate routine ops</li>
            <li>• Encourages documentation + testing first mindset</li>
            <li>• Reduces onboarding friction for new engineers</li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-emerald-300 mb-3">
            Engineering Principles
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Small, auditable increments</li>
            <li>• Evidence-producing pipelines</li>
            <li>• Explicit architecture & decision records (ADRs)</li>
            <li>• Consistent naming & folder heuristics</li>
          </ul>
        </FadeIn>
      </div>
      <FadeIn
        delay={0.6}
        className="mt-8 surface p-4 rounded-xl text-center text-sm text-[var(--muted)]"
      >
        Outcome: Faster delivery without sacrificing traceability, safety, or
        reproducibility.
      </FadeIn>
    </div>
  );
}

function FutureSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
          Future Enhancements
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Platform",
            color: "sky",
            items: [
              "Multi-service expansion",
              "Async messaging (Service Bus)",
              "Central API gateway",
            ],
          },
          {
            title: "Quality",
            color: "indigo",
            items: [
              "Perf thresholds gating",
              "Contract testing",
              "Chaos & resilience tests",
            ],
          },
          {
            title: "Compliance",
            color: "blue",
            items: [
              "Evidence bundle generation",
              "Policy as code (OPA)",
              "Automated drift remediation",
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
              {c.items.map((it) => (
                <li key={it}>• {it}</li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
      <FadeIn
        delay={0.65}
        className="mt-8 surface p-4 rounded-xl text-center text-sm text-[var(--muted)]"
      >
        Strategic direction: evolve from POC baseline → production-grade
        reference blueprint.
      </FadeIn>
    </div>
  );
}

function QASlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-10"
      >
        <div>
          <h2 className="text-6xl font-extrabold bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
            Q & A
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Exploring patterns, accelerating delivery, sustaining quality. Ask
            away.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {[
            {
              title: "Adoption",
              pts: [
                "How to tailor to your org?",
                "Migration path from legacy?",
                "Team skill uplift?",
              ],
            },
            {
              title: "Scale & Ops",
              pts: [
                "Multi-region approach?",
                "Secret & key strategy?",
                "Cost optimization levers?",
              ],
            },
            {
              title: "Quality",
              pts: [
                "What is evidence bundling?",
                "Expanding test matrix?",
                "Coverage evolution?",
              ],
            },
            {
              title: "Security",
              pts: [
                "Integrating threat modeling?",
                "Runtime hardening roadmap?",
                "Policy enforcement layers?",
              ],
            },
          ].map((b) => (
            <div key={b.title} className="surface p-4 rounded-xl text-left">
              <h4 className="font-semibold mb-2 text-accent">{b.title}</h4>
              <ul className="text-xs text-[var(--muted)] space-y-1">
                {b.pts.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-sm text-[var(--muted)]">
          Repository: microsoft / C42-Medicine-Delivery-POC
        </div>
      </motion.div>
    </div>
  );
}

// Main Deck Component
export default function MedicineDeliveryDeck({ slide }: DeckComponentProps) {
  const slides: Record<string, JSX.Element> = {
    title: <TitleSlide />,
    overview: <OverviewSlide />,
    architecture: <ArchitectureSlide />,
    infrastructure: <InfrastructureSlide />,
    "backend-stack": <BackendStackSlide />,
    features: <FeaturesSlide />,
    cicd: <CicdSlide />,
    "qa-automation": <QaAutomationSlide />,
    security: <SecuritySlide />,
    "dev-workflow": <DevWorkflowSlide />,
    future: <FutureSlide />,
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
