import React from "react";
import { motion } from "framer-motion";
import type { DeckComponentProps, SlideMeta } from "../../types";

export const trafficManagerSlides: SlideMeta[] = [
  { id: "title", transition: "fade" },
  { id: "overview", transition: "slide" },
  { id: "project-structure", transition: "slide" },
  { id: "infrastructure-architecture", transition: "slide" },
  { id: "environments", transition: "slide" },
  { id: "ml-workspace", transition: "slide" },
  { id: "compute-clusters", transition: "slide" },
  { id: "experiments-vs-workflows", transition: "slide" },
  { id: "makefile-automation", transition: "slide" },
  { id: "dev-environment", transition: "slide" },
  { id: "security-networking", transition: "slide" },
  { id: "deployment-flow", transition: "slide" },
  { id: "cost-optimization", transition: "slide" },
  { id: "troubleshooting", transition: "slide" },
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
        transition={{ duration: 0.75 }}
      >
        Traffic Manager
      </motion.h1>
      <FadeIn
        delay={0.45}
        className="text-2xl font-light text-[var(--muted)] max-w-3xl mt-6"
      >
        Azure ML powered Intelligent Traffic & Computer Vision Platform – infra,
        ML workspace, experimentation & secure delivery.
      </FadeIn>
      <FadeIn
        delay={0.75}
        className="flex gap-3 flex-wrap justify-center mt-10"
      >
        {[
          "Azure ML",
          "Terraform",
          "Private Networking",
          "Experiments",
          "Compute Clusters",
          "Dev Container",
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
            <li>• Provide reproducible Azure ML workspace & base networking</li>
            <li>• Enable rapid CV experimentation (e.g. license plate OCR)</li>
            <li>• Standardize environment, dataset & pipeline registration</li>
            <li>• Codify security + cost governance from day zero</li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className="surface p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-accent2 mb-3">
            Core Value
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Unified infra + ML project patterns</li>
            <li>• Clear separation: base ↔ ML workspace ↔ experimentation</li>
            <li>• Tool-backed Make targets reduce onboarding friction</li>
            <li>• Private, secure data movement via VPN + private endpoints</li>
          </ul>
        </FadeIn>
      </div>
    </div>
  );
}

function ProjectStructureSlide() {
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
            Key Areas
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>
              • <strong>infra/</strong> – Terraform (base & ml_workspace)
            </li>
            <li>
              • <strong>infra/scripts/</strong> – Backend & SP automation
            </li>
            <li>
              • <strong>pyaml/</strong> – Azure ML Python SDK project
            </li>
            <li>
              • <strong>.hve/plans</strong> – Implementation & change summaries
            </li>
            <li>
              • <strong>pyaml/src/experiments</strong> – Notebooks & prototyping
            </li>
            <li>
              • <strong>pyaml/src/workflows</strong> – Production pipelines
            </li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-blue-300 mb-3">
            Conventions
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• ADR templates drive architectural decisions</li>
            <li>• Cookiecutter for experiment scaffolding</li>
            <li>• Makefile as single automation surface</li>
            <li>• Separation: research (experiments) → promoted (workflows)</li>
            <li>• TF remote state w/ per component backends</li>
          </ul>
        </FadeIn>
      </div>
    </div>
  );
}

function InfrastructureArchitectureSlide() {
  const columns = [
    {
      title: "Base Layer",
      color: "indigo",
      pts: [
        "VNet, subnets, NSGs",
        "VPN gateway & DNS",
        "Naming (CAF)",
        "Remote state backend",
      ],
    },
    {
      title: "ML Workspace Layer",
      color: "fuchsia",
      pts: [
        "Workspace w/ private endpoints",
        "Compute clusters (CPU/GPU)",
        "Outputs & variables modules",
        "Multiple env support",
      ],
    },
    {
      title: "Automation",
      color: "pink",
      pts: [
        "init-backend script",
        "Service principal federation",
        "Make targets for apply",
        "Planned GH Actions deploy",
      ],
    },
  ];
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
          Infrastructure Architecture
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((c, i) => (
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
        Flow: init-backend → base apply → ml_workspace apply → ML
        experimentation & pipelines.
      </FadeIn>
    </div>
  );
}

function EnvironmentsSlide() {
  const envs = [
    {
      name: "Development",
      color: "emerald",
      pts: [
        "Smaller VM sizes",
        "Faster iteration",
        "Relaxed controls",
        "State: dev tfstate",
      ],
    },
    {
      name: "Staging",
      color: "teal",
      pts: [
        "Prod-like config",
        "Security parity",
        "Pre-release validation",
        "State: stage tfstate",
      ],
    },
    {
      name: "Production",
      color: "lime",
      pts: [
        "Max security",
        "Scaling clusters",
        "Cost governance",
        "State: prod tfstate",
      ],
    },
  ];
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
          Environments
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {envs.map((e, i) => (
          <FadeIn
            key={e.name}
            delay={0.2 + i * 0.15}
            className={`surface p-6 rounded-xl border-l-4 border-${e.color}-500`}
          >
            <h3 className={`text-lg font-semibold text-${e.color}-300 mb-3`}>
              {e.name}
            </h3>
            <ul className="text-xs text-[var(--muted)] space-y-1">
              {e.pts.map((p) => (
                <li key={p}>• {p}</li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function MLWorkspaceSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          ML Workspace Layer
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn delay={0.2} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-yellow-300 mb-3">
            Configuration
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Variables for environment, workspace type, clusters</li>
            <li>• Outputs expose IDs for pipelines & tooling</li>
            <li>• Multi-cluster CPU/GPU definitions</li>
            <li>• Terraform version & provider pinning</li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-orange-300 mb-3">
            Lifecycle
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Base must exist before workspace apply</li>
            <li>• Remote state ensures dependency ordering</li>
            <li>• Planned GH Actions to orchestrate promos</li>
            <li>• Private endpoints enforce network isolation</li>
          </ul>
        </FadeIn>
      </div>
    </div>
  );
}

function ComputeClustersSlide() {
  const groups = [
    {
      title: "Configuration Keys",
      color: "rose",
      pts: ["vm_size", "vm_priority", "max_nodes / min_nodes", "idle_duration"],
    },
    {
      title: "Profiles",
      color: "purple",
      pts: [
        "Training (CPU + GPU)",
        "Testing (LowPriority)",
        "Serving (scales quicker)",
        "PR (small ephemeral)",
      ],
    },
    {
      title: "Best Practices",
      color: "pink",
      pts: [
        "Scale to zero when idle",
        "GPU sizing validated",
        "Spot for non-critical",
        "SSH disabled by default",
      ],
    },
  ];
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
          Compute Clusters
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {groups.map((g, i) => (
          <FadeIn
            key={g.title}
            delay={0.2 + i * 0.15}
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
        Multi-cluster evolution replaces legacy single-cluster variable set.
      </FadeIn>
    </div>
  );
}

function ExperimentsVsWorkflowsSlide() {
  const cols = [
    {
      title: "Experiments",
      color: "emerald",
      pts: [
        "Prototype & research",
        "Notebook + lightweight code",
        "Template scaffolding",
        "Documented hypotheses",
      ],
    },
    {
      title: "Workflows",
      color: "teal",
      pts: [
        "Promoted artifacts",
        "Production pipelines",
        "Service wrappers reused",
        "Test & lint enforced",
      ],
    },
    {
      title: "Promotion Path",
      color: "cyan",
      pts: [
        "Experiment validated",
        "Create PR",
        "Refactor to workflow",
        "Add ADR if architectural",
      ],
    },
  ];
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Experiments → Workflows
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cols.map((c, i) => (
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
    </div>
  );
}

function MakefileAutomationSlide() {
  const groups = [
    {
      title: "Core Targets",
      color: "yellow",
      pts: ["install", "setup", "lint / lint-pyaml-fix", "test"],
    },
    {
      title: "Azure ML Ops",
      color: "orange",
      pts: [
        "register-environment",
        "register-example-dataset",
        "run-pipeline",
        "create-compute",
      ],
    },
    {
      title: "Developer Productivity",
      color: "amber",
      pts: [
        "create-experiment",
        "list-compute",
        "start/stop-compute",
        "generate-conda-yml",
      ],
    },
  ];
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
          Makefile Automation
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {groups.map((g, i) => (
          <FadeIn
            key={g.title}
            delay={0.2 + i * 0.15}
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
        Single automation surface reduces cognitive overhead & ensures
        repeatability.
      </FadeIn>
    </div>
  );
}

function DevEnvironmentSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
          Developer Environment
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn delay={0.2} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-green-300 mb-3">
            Dev Container
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Reopen in container: consistent toolchain</li>
            <li>• uv dependency management</li>
            <li>• Pre-configured Azure CLI context</li>
            <li>• Hooks: pre-commit & pre-push quality gates</li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-teal-300 mb-3">
            Local Workflow
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Login: az login (tenant selection)</li>
            <li>• VPN download + connect via make targets</li>
            <li>• Register environment + dataset</li>
            <li>• Run pipeline or experiment notebook</li>
          </ul>
        </FadeIn>
      </div>
    </div>
  );
}

function SecurityNetworkingSlide() {
  const cols = [
    {
      title: "Isolation",
      color: "red",
      pts: [
        "Private endpoints",
        "VNet segmentation",
        "NSG traffic control",
        "No public ML exposure",
      ],
    },
    {
      title: "Access",
      color: "rose",
      pts: [
        "VPN gateway for secure ingress",
        "Managed identities",
        "RBAC principle of least privilege",
        "Federated SP for CI",
      ],
    },
    {
      title: "Governance",
      color: "orange",
      pts: [
        "ADR process",
        "State locking",
        "Scripted backend creation",
        "Audit via plans",
      ],
    },
  ];
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          Security & Networking
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cols.map((c, i) => (
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
    </div>
  );
}

function DeploymentFlowSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
          Deployment Flow
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            step: "1",
            title: "Init Backend",
            color: "sky",
            desc: "Create storage & state container",
          },
          {
            step: "2",
            title: "Base Apply",
            color: "cyan",
            desc: "Network, DNS, VPN, RG",
          },
          {
            step: "3",
            title: "ML Workspace",
            color: "blue",
            desc: "Workspace + compute clusters",
          },
          {
            step: "4",
            title: "ML Ops",
            color: "indigo",
            desc: "Register env/dataset & run pipelines",
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
        delay={0.8}
        className="mt-8 surface p-4 rounded-xl text-center text-sm text-[var(--muted)]"
      >
        GitHub Actions workflow (planned) will codify end‑to‑end promotion with
        federated creds.
      </FadeIn>
    </div>
  );
}

function CostOptimizationSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
          Cost Optimization
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn delay={0.2} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-purple-300 mb-3">
            Strategies
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Scale to zero clusters (idle_duration)</li>
            <li>• LowPriority for non-critical test compute</li>
            <li>• Smaller dev VM sizes by default</li>
            <li>• Scripted teardown paths (future)</li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className="surface p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-violet-300 mb-3">
            Governance
          </h3>
          <ul className="text-sm text-[var(--muted)] space-y-2">
            <li>• Variable-driven sizing per env</li>
            <li>• Separation of prod vs dev state backends</li>
            <li>• ADRs for impactful scaling changes</li>
            <li>• Future: cost dashboards & alerts</li>
          </ul>
        </FadeIn>
      </div>
    </div>
  );
}

function TroubleshootingSlide() {
  const issues = [
    {
      title: "Terraform auth errors",
      color: "red",
      fix: "az login & correct subscription selection",
    },
    {
      title: "State locking",
      color: "rose",
      fix: "Wait or force-unlock with ID",
    },
    {
      title: "Private endpoint DNS",
      color: "orange",
      fix: "Verify DNS zone & resolver linkage",
    },
    {
      title: "VPN connection",
      color: "amber",
      fix: "Download profile & ensure AAD permissions",
    },
  ];
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
          Troubleshooting
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {issues.map((i, idx) => (
          <FadeIn
            key={i.title}
            delay={0.2 + idx * 0.12}
            className={`surface p-5 rounded-xl border-l-4 border-${i.color}-500`}
          >
            <h3 className={`text-sm font-semibold text-${i.color}-300 mb-2`}>
              {i.title}
            </h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {i.fix}
            </p>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function RoadmapSlide() {
  const items = [
    "GitHub Actions infra pipelines",
    "Automated cost monitoring dashboards",
    "Experiment → workflow promotion tooling",
    "Model registry + evaluation reports",
    "Security posture scanning (IaC lint)",
  ];
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
          Roadmap
        </h2>
      </FadeIn>
      <FadeIn className="surface p-8 rounded-xl max-w-4xl mx-auto">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[var(--muted)]">
          {items.map((it, i) => (
            <li
              key={it}
              className="surface px-4 py-3 rounded border border-white/5"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              • {it}
            </li>
          ))}
        </ul>
      </FadeIn>
    </div>
  );
}

function QASlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
      <motion.h2
        className="text-[clamp(42px,7vw,80px)] font-extrabold bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent mb-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Questions?
      </motion.h2>
      <FadeIn
        delay={0.4}
        className="max-w-3xl text-[var(--muted)] leading-relaxed text-lg"
      >
        Happy to dive deeper into infrastructure modules, ML environment
        promotion, notebook-to-workflow lifecycle or governance strategy.
      </FadeIn>
    </div>
  );
}

const slideMap: Record<string, React.ReactNode> = {
  title: <TitleSlide />,
  overview: <OverviewSlide />,
  "project-structure": <ProjectStructureSlide />,
  "infrastructure-architecture": <InfrastructureArchitectureSlide />,
  environments: <EnvironmentsSlide />,
  "ml-workspace": <MLWorkspaceSlide />,
  "compute-clusters": <ComputeClustersSlide />,
  "experiments-vs-workflows": <ExperimentsVsWorkflowsSlide />,
  "makefile-automation": <MakefileAutomationSlide />,
  "dev-environment": <DevEnvironmentSlide />,
  "security-networking": <SecurityNetworkingSlide />,
  "deployment-flow": <DeploymentFlowSlide />,
  "cost-optimization": <CostOptimizationSlide />,
  troubleshooting: <TroubleshootingSlide />,
  roadmap: <RoadmapSlide />,
  qa: <QASlide />,
};

const TrafficManagerDeck: React.FC<DeckComponentProps> = ({ slide }) => {
  return <>{slideMap[slide.id]}</>;
};

export default TrafficManagerDeck;
