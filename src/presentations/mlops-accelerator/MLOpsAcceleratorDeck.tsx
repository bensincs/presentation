import React from "react";
import { motion } from "framer-motion";
import DeckDisclaimer from "../components/DeckDisclaimer";
import type { DeckComponentProps, SlideMeta } from "../../types";

const gradientTitle =
  "text-5xl font-bold bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-500 bg-clip-text text-transparent pb-1";
const surface =
  "surface rounded-2xl border border-white/5 bg-white/5 px-6 py-5 shadow-lg shadow-black/20";
const mutedText = "text-sm text-[var(--muted)] leading-relaxed";
const pill =
  "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/70";

export const mlopsAcceleratorSlides: SlideMeta[] = [
  {
    id: "title",
    transition: "fade",
    speakerNotes: [
      "Open with the promise of the accelerator: fastest path for data scientists to get productive on Azure ML with managed tooling.",
      "Explain that development happens in reproducible Conda environments and Dev Containers so local and remote runs behave the same.",
      "Call out the Makefile: one command to build or refresh every Conda env; minimal cognitive load for contributors.",
    ],
  },
  {
    id: "dev-experience",
    transition: "slide",
    speakerNotes: [
      "Show the developer experience: reproducible Conda envs, devcontainers, and Makefile automation.",
      "Highlight that the same environment definition powers local notebooks and AML pipelines.",
      "Emphasize the frictionless onboarding—clone the repo, run make, open the container.",
    ],
  },
  {
    id: "infrastructure-overview",
    transition: "slide",
    speakerNotes: [
      "Describe the base landing zone: virtual network, VPN gateway, private endpoints, private DNS — everything locked down for data science workloads.",
      "Emphasize that the workspace layer is triplicated (train/test/serve) with role-based access so data scientists can only reach the train workspace.",
      "Mention that CPU/GPU compute targets stay private and centrally managed for cost efficiency and compliance.",
    ],
  },
  {
    id: "infra-ci-cd",
    transition: "slide",
    speakerNotes: [
      "Walk through pull request validation: base infrastructure stands up a disposable environment so changes can be smoke-tested.",
      "Point out the matching workflow for AML workspace updates — contributors get a temporary workspace to run real pipelines.",
      "Close with the promotion flow: merge to main deploys staging, manual approval pushes production base and all three workspaces.",
    ],
  },
  {
    id: "data-science-folder",
    transition: "slide",
    speakerNotes: [
      "Introduce the repository layout so teams know where to contribute experiments versus production code.",
      "Highlight that src/ is production-grade pipeline code with tests, environments/ holds vetted Conda specs, and experiments/ captures iterative work with findings.",
      "Reinforce that the same Conda tooling powers local runs and pipeline executions to avoid drift.",
    ],
  },
  {
    id: "experiments",
    transition: "slide",
    speakerNotes: [
      "Clarify that experiments live beside the main data science folder, acting as decision records for data scientists.",
      "Note they run against the shared train workspace using identical Conda environments, so evidence translates directly to production pipelines.",
      "Explain that each experiment bundles runnable code and markdown summaries to document outcomes and recommendations.",
    ],
  },
  {
    id: "mlops-folders",
    transition: "slide",
    speakerNotes: [
      "Outline how the MLOps folder mirrors AML capabilities: discrete pipelines to register datasets, register environments, and run composite pipelines.",
      "Explain that pipelines promote the same src code and environment definitions managed by the data science team.",
      "Mention the local run story — az ml CLI or the VS Code extension can execute the same steps before CI/CD picks them up.",
    ],
  },
  {
    id: "cicd-automation",
    transition: "fade",
    speakerNotes: [
      "Show that each AML pipeline has an accompanying CI/CD workflow so merges to main automatically retrain or redeploy as needed.",
      "Call out the safety net: automation keeps model training repeatable and frees engineers from manual triggering.",
      "Invite the audience to think about layering approvals or alerts on top for regulated workloads.",
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
    <div className="h-full flex flex-col justify-center items-center text-center p-8">
      <motion.h1
        className="text-[clamp(44px,8vw,96px)] font-extrabold bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        MLOps Accelerator
      </motion.h1>
      <FadeIn delay={0.3} className="text-2xl text-[var(--muted)] max-w-3xl">
        Reproducible development environments and guardrailed workflows that
        take models from experiment to production-ready Azure ML pipelines.
      </FadeIn>
      <FadeIn
        delay={0.45}
        className="mt-12 max-w-3xl text-sm text-[var(--muted)] leading-relaxed"
      >
        Build once, run anywhere: Conda specs synchronized with Dev Containers,
        automation that provisions workspaces on-demand, and CI/CD that keeps
        pipelines aligned with production-ready infrastructure.
      </FadeIn>
    </div>
  );
}

function DevExperienceSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Developer Experience</h2>
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Conda Environments",
            points: [
              "Versioned YAML specs for CPU and GPU workflows.",
              "Identical dependencies for notebooks, scripts, and pipelines.",
              "Refresh everything with a single `make` target when requirements change.",
            ],
          },
          {
            title: "Dev Containers",
            points: [
              "Codespaces-ready container mirrors Conda envs.",
              "Provides consistent tooling across laptops and VMs.",
              "Shell prompts, linters, and extensions preconfigured.",
            ],
          },
          {
            title: "Makefile Automation",
            points: [
              "Automates preparing Conda environments with a single command.",
              "Handles the VPN gateway connection into the private virtual network.",
            ],
          },
        ].map((card, index) => (
          <FadeIn
            key={card.title}
            delay={0.2 + index * 0.12}
            className={`${surface} space-y-3`}
          >
            <span className="text-lg font-semibold text-white">
              {card.title}
            </span>
            <ul className={`${mutedText} space-y-2`}>
              {card.points.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.6} className="mt-8 text-center text-xs text-white/70">
        Clone the repo, run the Makefile, open the container—onboarding down to
        minutes.
      </FadeIn>
    </div>
  );
}

function InfrastructureOverviewSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-10 text-center">
        <h2 className={gradientTitle}>Secure Landing Zone & Workspaces</h2>
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-2">
        <FadeIn delay={0.2} className={`${surface} space-y-4`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <span className={pill}>Base Infrastructure</span>
              <p className="mt-2 text-sm text-white/80">
                Locked-down landing zone that every workspace inherits.
              </p>
            </div>
          </div>
          <div className="grid gap-3 [grid-auto-rows:1fr]">
            <div className="rounded-xl border border-white/10 bg-white/10 p-4 flex flex-col">
              <div className="text-xs uppercase text-white/70 tracking-wide">
                Resources
              </div>
              <ul className={`${mutedText} mt-2 space-y-2`}>
                <li>
                  • Hub VNet with segmented data, compute, and management
                  subnets.
                </li>
                <li>• VPN gateway + Azure Firewall with private DNS zones.</li>
                <li>
                  • Private endpoints for storage, Key Vault, and container
                  registry.
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/10 p-4 flex flex-col">
              <div className="text-xs uppercase text-white/70 tracking-wide">
                Purpose
              </div>
              <p className={`${mutedText} mt-2 leading-relaxed flex-1`}>
                Provides the security envelope—network isolation, identity
                guardrails, and shared services that every data science workload
                relies on.
              </p>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.35} className={`${surface} space-y-4`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧪</span>
            <div>
              <span className={pill}>Workspace Infrastructure</span>
              <p className="mt-2 text-sm text-white/80">
                Train, Test, Serve environments deployed three times for
                lifecycle control.
              </p>
            </div>
          </div>
          <div className="grid gap-3 [grid-auto-rows:1fr]">
            <div className="rounded-xl border border-white/10 bg-white/10 p-4 flex flex-col">
              <div className="text-xs uppercase text-white/70 tracking-wide">
                Resources
              </div>
              <ul className={`${mutedText} mt-2 space-y-2`}>
                <li>
                  • Azure ML workspace with linked storage, key vault, and app
                  insights.
                </li>
                <li>• Private CPU & GPU compute clusters managed centrally.</li>
                <li>
                  • Network-isolated datastores, feature stores, and endpoint
                  deployments.
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/10 p-4 flex flex-col">
              <div className="text-xs uppercase text-white/70 tracking-wide">
                Purpose
              </div>
              <p className={`${mutedText} mt-2 leading-relaxed flex-1`}>
                Keeps experimentation and production cleanly separated while
                sharing curated compute and data services—data scientists touch
                Train, platform team owns Test/Serve.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
      <FadeIn
        delay={0.55}
        className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 text-sm text-[var(--muted)]"
      >
        <div className="text-xs uppercase tracking-wide text-white/70 mb-3">
          Architecture Flow
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {[
            { label: "Dev Workstation", tone: "amber" },
            { label: "Makefile Automations", tone: "rose" },
            { label: "VPN Gateway", tone: "violet" },
            { label: "Base VNet", tone: "sky" },
            { label: "AML Workspaces", tone: "emerald" },
          ].map((node, index, array) => (
            <React.Fragment key={node.label}>
              <div
                className={`rounded-full border border-${node.tone}-400/40 bg-${node.tone}-500/15 px-4 py-2 text-xs font-semibold text-${node.tone}-100`}
              >
                {node.label}
              </div>
              {index < array.length - 1 && (
                <span className="hidden md:block text-white/50">➔</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="mt-4 text-xs text-white/70">
          Automation lands developers inside the private network, routes traffic
          through the VPN gateway, and brokers secure access to AML workspaces
          and their private resources.
        </p>
      </FadeIn>
    </div>
  );
}

function InfraCiCdSlide() {
  const flows = [
    {
      title: "PR: Base Infrastructure",
      icon: "🛠️",
      summary:
        "Spin up a temporary network stack to verify VNet, security, and shared services changes before merge.",
      steps: [
        { label: "PR Opened", tone: "amber" },
        { label: "IaC Pipeline", tone: "sky" },
        { label: "Ephemeral Base Stack", tone: "emerald" },
        { label: "Security Smoke Tests", tone: "violet" },
      ],
      details: [
        "Validates routing, firewall policies, and private DNS wiring.",
        "Destroys the stack automatically after reviewers sign off.",
      ],
    },
    {
      title: "PR: Workspace Infrastructure",
      icon: "🧪",
      summary:
        "Provision an isolated AML workspace so authors can run real pipelines with their changes.",
      steps: [
        { label: "PR Opened", tone: "rose" },
        { label: "AML Pipeline", tone: "sky" },
        { label: "Personal Workspace", tone: "emerald" },
        { label: "Pipeline Dry Run", tone: "violet" },
      ],
      details: [
        "Data scientists test pipelines or endpoints without impacting shared environments.",
        "Auto-cleanup keeps costs in check once validation succeeds.",
      ],
    },
    {
      title: "Merge to Main → Staging",
      icon: "🚀",
      summary:
        "Every successful merge deploys staging copies of the base stack and all three AML workspaces.",
      steps: [
        { label: "Merge", tone: "amber" },
        { label: "Staging Base", tone: "sky" },
        { label: "Train/Test/Serve", tone: "emerald" },
        { label: "Smoke Alerts", tone: "violet" },
      ],
      details: [
        "Keeps staging in lockstep with main so teams always have a current rehearsal environment.",
        "Observability hooks fire alerts if infra or AML deployments drift.",
      ],
    },
    {
      title: "Manual Approval → Production",
      icon: "✅",
      summary:
        "Leads trigger production promotion when governance says go—base stack plus train/test/serve in one go.",
      steps: [
        { label: "Approval", tone: "rose" },
        { label: "Prod Base", tone: "sky" },
        { label: "Prod Train/Test/Serve", tone: "emerald" },
        { label: "Go-Live Notify", tone: "violet" },
      ],
      details: [
        "Ensures regulated workloads keep human checkpoints before customer impact.",
        "Broadcasts deployment status to Teams/Slack with run artifacts attached.",
      ],
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Infrastructure Automation</h2>
      </FadeIn>
      <FadeIn
        delay={0.2}
        className={`${surface} mb-8 text-sm text-[var(--muted)] leading-relaxed`}
      >
        The automation fabric treats every change as code: PRs light up
        disposable infrastructure, merges refresh staging, and a guarded
        approval button promotes production. No snowflake environments, no
        guesswork.
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-2">
        {flows.map((flow, index) => (
          <FadeIn
            key={flow.title}
            delay={0.2 + index * 0.12}
            className={`${surface} flex flex-col gap-4`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{flow.icon}</span>
              <div>
                <span className={pill}>{flow.title}</span>
                <p className={`${mutedText} mt-2`}>{flow.summary}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {flow.steps.map((step, stepIndex) => (
                <React.Fragment key={step.label}>
                  <div
                    className={`rounded-full border border-${step.tone}-400/40 bg-${step.tone}-500/15 px-3 py-1 text-xs font-semibold text-${step.tone}-100`}
                  >
                    {step.label}
                  </div>
                  {stepIndex < flow.steps.length - 1 && (
                    <span className="text-white/50">➔</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <ul className={`${mutedText} text-xs space-y-2`}>
              {flow.details.map((detail) => (
                <li key={detail}>• {detail}</li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function DataScienceFolderSlide() {
  const structure = [
    {
      folder: "src/",
      icon: "🧱",
      label: "Python Modules",
      blurb:
        "Core Python source files plus shared utilities consumed by AML pipelines.",
      chips: ["train.py", "score.py", "common/"],
      details: [
        "Contains the production-ready .py modules that pipelines import directly.",
        "common/ holds shared helpers, feature transformers, and IO adapters.",
        "Pipelines reference these modules; orchestration definitions live elsewhere.",
      ],
    },
    {
      folder: "tests/",
      icon: "🧪",
      label: "Verification",
      blurb: "Separated test suites validating the code in src/.",
      chips: ["unit/", "integration/", "conftest.py"],
      details: [
        "Lives alongside the data-science folder to keep runtime dependencies isolated.",
        "Covers everything from helper utilities to notebook conversion scripts.",
        "CI/CD pipelines run these tests before any AML job promotion.",
      ],
    },
    {
      folder: "environments/",
      icon: "🧪",
      label: "Conda Definitions",
      blurb:
        "Authoritative YAML specs consumable by Miniconda locally or deployed into AML.",
      chips: ["cpu.yml", "gpu.yml"],
      details: [
        "Makefile targets call out to standard Conda commands to build or update envs.",
        "Same YAML can be attached to AML jobs for guaranteed parity with local runs.",
        "Keep only environment files here—no notebooks or scripts to avoid confusion.",
      ],
    },
    {
      folder: "experiments/",
      icon: "🗒️",
      label: "Research Tracks",
      blurb: "Living decision records for exploratory work.",
      chips: ["2024-07-ltv/", "2024-08-demand/", "README.md"],
      details: [
        "Notebooks + scripts that run against the train workspace.",
        "Markdown findings capture hypotheses, evidence, next steps.",
        "Graduated artefacts promote into src/ after review and hardening.",
      ],
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Data Science Folder Blueprint</h2>
      </FadeIn>
      <FadeIn
        delay={0.2}
        className={`${surface} bg-gradient-to-br from-white/10 via-white/5 to-transparent`}
      >
        <div className="flex items-center gap-3 border-b border-white/10 pb-5">
          <span className="text-3xl">📂</span>
          <div>
            <div className="text-sm uppercase tracking-wide text-white/70">
              data-science/
            </div>
            <p className="text-sm text-[var(--muted)]">
              One folder, three personas: production engineers, environment
              curators, and exploratory researchers all collaborating without
              stepping on each other.
            </p>
          </div>
        </div>
        <div className="relative mt-6 pl-8">
          <div className="absolute left-8 top-3 bottom-3 border-l border-white/15" />

          {structure.map((node, index) => {
            const isLast = index === structure.length - 1;
            return (
              <div key={node.folder} className="relative pl-8 pb-8 last:pb-0">
                <div className="absolute left-0 top-3 w-6 border-b border-white/15" />
                <div className="flex items-start gap-3">
                  <span className="text-xl">{node.icon}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-base font-semibold text-white">
                        {node.folder}
                      </span>
                      <span className="text-xs uppercase text-white/60">
                        {node.label}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      {node.blurb}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {node.chips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/70"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                    <ul className={`${mutedText} mt-3 space-y-2 text-sm`}>
                      {node.details.map((detail) => (
                        <li key={detail}>• {detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70">
          Promotion path: when an experiment hardens, code graduates into{" "}
          <code>src/</code>, environment deltas land in{" "}
          <code>environments/</code>, and CI/CD pipelines pick up the changes
          automatically.
        </div>
      </FadeIn>
    </div>
  );
}

function ExperimentsSlide() {
  const folderTree = [
    "experiments/",
    "├── README.md",
    "├── 2024-08-demand-forecast/",
    "│   ├── notebook.ipynb",
    "│   ├── env.yml",
    "│   └── findings.md",
    "└── 2024-07-ltv-uplift/",
    "    ├── feature_checks.py",
    "    └── findings.md",
  ].join("\n");

  const markdownSample = [
    "# Findings – Demand Forecast",
    "",
    "- **Hypothesis:** Prophet with holiday regressors will beat ARIMA on WAPE.",
    "- **Runs:** notebooks/run_2024-08-15.ipynb (train workspace).",
    "- **Result:** WAPE 7.2% vs control 7.9%; passes acceptance threshold.",
    "- **Next:** Promote pipeline code into src/forecast and schedule retraining.",
  ].join("\n");

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Experiments as Decision Records</h2>
      </FadeIn>
      <FadeIn
        delay={0.2}
        className="mx-auto max-w-4xl text-center text-sm text-[var(--muted)]"
      >
        Experiments live beside production code, acting as lightweight decision
        records. Each folder captures the hypothesis, code, data slices, and a
        markdown log so future readers understand what shipped—and why.
      </FadeIn>
      <FadeIn delay={0.3} className="mt-8 flex flex-col gap-6 lg:flex-row">
        <div className={`${surface} flex-1 space-y-4`}>
          <span className={pill}>Folder Layout</span>
          <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-white/80 overflow-auto">
            {folderTree}
          </pre>
        </div>
        <div className={`${surface} flex-1 space-y-4`}>
          <span className={pill}>Purpose</span>
          <ul className={`${mutedText} space-y-2 text-sm`}>
            <li>
              • One folder per active investigation with owner + date in the
              name.
            </li>
            <li>
              • Bundle runnable artifacts, environment snapshot, and findings.
            </li>
            <li>
              • Safe playground for data scientists to iterate without
              production rigor.
            </li>
            <li>
              • Version-controlled record of decisions, evidence, and promotion
              readiness.
            </li>
          </ul>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70">
            Treat experiments/ like a lab notebook—tidy, searchable, and
            decision-oriented.
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={0.5} className={`${surface} mt-6 space-y-4`}>
        <span className={pill}>Markdown Snapshot</span>
        <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-white/80 overflow-auto">
          {markdownSample}
        </pre>
        <p className={`${mutedText} text-sm`}>
          Markdown summaries double as decision logs—link to notebooks, call out
          data slices, and state clearly whether the experiment should move
          forward.
        </p>
      </FadeIn>
    </div>
  );
}

function MLOpsFoldersSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>MLOps Pipelines</h2>
      </FadeIn>
      <FadeIn delay={0.2} className={`${surface} space-y-4`}>
        <span className={pill}>Folder Layout</span>
        <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-white/80 overflow-auto">{`mlops/
└── azureml/
    ├── example_train/
    │   ├── env.yaml
    │   ├── data.yaml
    │   └── train.yaml
    └── example_online_endpoint/
        ├── env.yaml
        ├── endpoint.yaml
        └── deployment.yaml`}</pre>
        <ul className={`${mutedText} space-y-2`}>
          <li>
            • Ready-to-run templates showing both az ml client usage and
            MLflow-driven workflows.
          </li>
          <li>
            • Each example bundles environment, data registration, and
            pipeline/job definitions.
          </li>
          <li>
            • Extend these blueprints to roll out new datasets, training runs,
            and endpoints consistently.
          </li>
        </ul>
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70">
          Follow the naming conventions (example_train, example_online_endpoint)
          to spin up new pipeline variants without copying boilerplate from
          scratch.
        </div>
      </FadeIn>
    </div>
  );
}

function CicdAutomationSlide() {
  const workflowYaml = [
    "name: deploy-model-training-pipeline",
    "",
    "on:",
    "  workflow_dispatch:",
    "",
    "jobs:",
    "  get-config:",
    "    uses: ./.github/workflows/get-config.yml",
    "",
    "  register-environment:",
    "    needs: get-config",
    "    uses: ./.github/workflows/register-environment.yml",
    "    with:",
    "      resource_group: ${{ needs.get-config.outputs.resource_group }}",
    "      workspace_name: ${{ needs.get-config.outputs.aml_workspace }}",
    "      environment_file: mlops/azureml/train_yolo/env.yml",
    "    secrets:",
    "      AZURE_CLIENT_ID: ${{ secrets.AZURE_CLIENT_ID }}",
    "      AZURE_TENANT_ID: ${{ secrets.AZURE_TENANT_ID }}",
    "      AZURE_SUBSCRIPTION_ID: ${{ secrets.AZURE_SUBSCRIPTION_ID }}",
    "",
    "  register-dataset:",
    "    needs: get-config",
    "    uses: ./.github/workflows/register-dataset.yml",
    "    with:",
    "      resource_group: ${{ needs.get-config.outputs.resource_group }}",
    "      workspace_name: ${{ needs.get-config.outputs.aml_workspace }}",
    "      name: taxi-data",
    "      data_file: mlops/azureml/train/data.yml",
    "    secrets:",
    "      AZURE_CLIENT_ID: ${{ secrets.AZURE_CLIENT_ID }}",
    "      AZURE_TENANT_ID: ${{ secrets.AZURE_TENANT_ID }}",
    "      AZURE_SUBSCRIPTION_ID: ${{ secrets.AZURE_SUBSCRIPTION_ID }}",
    "",
    "  run-pipeline:",
    "    needs: [get-config, register-environment, register-dataset]",
    "    uses: ./.github/workflows/run-pipeline.yml",
    "    with:",
    "      resource_group: ${{ needs.get-config.outputs.resource_group }}",
    "      workspace_name: ${{ needs.get-config.outputs.aml_workspace }}",
    "      parameters-file: mlops/azureml/train/pipeline.yml",
    "      job-name: test",
    "    secrets:",
    "      AZURE_CLIENT_ID: ${{ secrets.AZURE_CLIENT_ID }}",
    "      AZURE_TENANT_ID: ${{ secrets.AZURE_TENANT_ID }}",
    "      AZURE_SUBSCRIPTION_ID: ${{ secrets.AZURE_SUBSCRIPTION_ID }}",
  ].join("\n");

  const steps = [
    {
      title: "Dispatch",
      icon: "🚦",
      description:
        "Workflow dispatch or PR trigger kicks off a full train pipeline run.",
      highlights: [
        "Pulls workspace config so every job targets the right aml workspace.",
      ],
    },
    {
      title: "Register Environment",
      icon: "🌿",
      description:
        "Keeps Conda/AML environments aligned with the repo YAML files.",
      highlights: [
        "Uses mlops/azureml/*/env.yml definitions.",
        "Ensures training CI/CD uses the exact environments reviewed by data scientists.",
      ],
    },
    {
      title: "Register Data",
      icon: "📦",
      description:
        "Refreshes datasets before jobs run so pipelines pull the approved data snapshot.",
      highlights: [
        "Data YAML files describe source, version, and mount targets.",
        "Avoids stale or manual dataset registration when code changes.",
      ],
    },
    {
      title: "Run Pipeline",
      icon: "🧬",
      description:
        "Executes the AML pipeline with parameters straight from versioned YAML.",
      highlights: [
        "Uses reusable run-pipeline workflow wiring.",
        "Captures job name, parameters, and artifacts for downstream promotion.",
      ],
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>CI/CD Keeps Models Fresh</h2>
      </FadeIn>
      <FadeIn
        delay={0.2}
        className={`${surface} space-y-4 bg-gradient-to-br from-white/10 via-white/5 to-transparent`}
      >
        <span className={pill}>Workflow Blueprint</span>
        <p className={mutedText}>
          GitHub Actions orchestrates everything: pull configuration, register
          environments, register datasets, and launch AML pipelines. No manual
          clicks, no drift between code and cloud.
        </p>
        <div className="grid gap-6 lg:grid-cols-2">
          {steps.map((step, index) => (
            <FadeIn
              key={step.title}
              delay={0.25 + index * 0.08}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{step.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {step.title}
                  </div>
                  <p className={`${mutedText} text-xs`}>{step.description}</p>
                </div>
              </div>
              <ul className={`${mutedText} text-xs space-y-2`}>
                {step.highlights.map((highlight) => (
                  <li key={highlight}>• {highlight}</li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </FadeIn>
      <FadeIn delay={0.45} className={`${surface} mt-6 space-y-4`}>
        <span className={pill}>Example GitHub Workflow</span>
        <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-white/80 overflow-auto">
          {workflowYaml}
        </pre>
        <p className={`${mutedText} text-xs`}>
          Built from reusable workflow call steps—swap in different YAML files
          (datasets, envs, pipelines) to automate other AML scenarios with the
          same pattern.
        </p>
      </FadeIn>
    </div>
  );
}

const slideMap: Record<string, React.ReactNode> = {
  title: <TitleSlide />,
  "dev-experience": <DevExperienceSlide />,
  "infrastructure-overview": <InfrastructureOverviewSlide />,
  "infra-ci-cd": <InfraCiCdSlide />,
  "data-science-folder": <DataScienceFolderSlide />,
  experiments: <ExperimentsSlide />,
  "mlops-folders": <MLOpsFoldersSlide />,
  "cicd-automation": <CicdAutomationSlide />,
};

export default function MLOpsAcceleratorDeck({ slide }: DeckComponentProps) {
  const content = slideMap[slide.id] ?? (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold">{slide.id}</h2>
        <p className="mt-2 text-[var(--muted)]">
          Slide content coming soon — contributions welcome!
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-hidden">{content}</div>
    </div>
  );
}
