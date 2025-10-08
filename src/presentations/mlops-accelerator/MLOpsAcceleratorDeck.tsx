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
    id: "online-endpoints",
    transition: "slide",
    speakerNotes: [
      "Highlight that the repo includes an example online endpoint deployment under mlops/azureml/example_online_endpoint.",
      "Explain the artefacts: env.yaml, endpoint.yaml, deployment.yaml—together they capture environment, endpoint configuration, and deployment spec.",
      "Call out that teams can copy these files, adjust compute/traffic settings, and run the same az ml workflows to publish real-time inference endpoints.",
    ],
  },
  {
    id: "security-policy",
    transition: "up",
    speakerNotes: [
      "Walk through the security posture powering this accelerator: private networking, managed identity, encryption at rest and in transit.",
      "Explain the dual scanning strategy—Trivy + Checkov—covering Terraform, Docker, and GitHub workflows with merge blocking for critical findings.",
      "Share how developers integrate scans locally (./scripts/security-scan.sh) and how CI/CD surfaces SARIF results in GitHub.",
      "Note compliance alignment (Azure Security Benchmark, WAF, NIST CSF) and the importance of documenting exceptions in .trivyignore or .checkov.yml.",
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
  {
    id: "qa",
    transition: "fade",
    speakerNotes: [
      "Invite the audience to ask about anything from the accelerator: infrastructure, security, developer workflow, CI/CD.",
      "Offer to walk through specific YAMLs, scripts, or deployment steps live.",
      "Share follow-up channels: GitHub repo issues, internal chat, office hours.",
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

type MotionBlockProps = {
  delay?: number;
  className?: string;
  children?: React.ReactNode;
};

const SlideInLeft: React.FC<MotionBlockProps> = ({
  delay = 0,
  className,
  children,
}) => (
  <motion.div
    initial={{ opacity: 0, x: -48 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: "easeOut", delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const SlideInRight: React.FC<MotionBlockProps> = ({
  delay = 0,
  className,
  children,
}) => (
  <motion.div
    initial={{ opacity: 0, x: 48 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: "easeOut", delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const ScalePop: React.FC<MotionBlockProps> = ({
  delay = 0,
  className,
  children,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.88, rotate: -2 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ duration: 0.5, ease: "backOut", delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const FadeInUp: React.FC<MotionBlockProps> = ({
  delay = 0,
  className,
  children,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, ease: "easeOut", delay }}
    className={className}
  >
    {children}
  </motion.div>
);

function TitleSlide() {
  const stats = [
    { label: "Idea → MVP", value: "6 hours", tone: "amber" },
    { label: "Automation authored", value: "2,400+ LOC", tone: "rose" },
    { label: "Manual edits", value: "< 12 commits", tone: "indigo" },
  ];

  return (
    <div className="h-full flex flex-col justify-center items-center text-center p-8">
      <motion.h1
        className="text-[clamp(44px,8vw,96px)] font-extrabold bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, scale: 0.88, y: -24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        MLOps Accelerator
      </motion.h1>
      <FadeInUp
        delay={0.25}
        className="text-2xl text-[var(--muted)] max-w-3xl tracking-tight"
      >
        Reproducible development environments and guardrailed workflows that
        take models from experiment to production-ready Azure ML pipelines.
      </FadeInUp>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {[
          "Hyper Velocity Engineering",
          "Azure ML",
          "Dev Containers",
          "CI/CD",
        ].map((tag, index) => (
          <motion.span
            key={tag}
            className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/80"
            initial={{ opacity: 0, scale: 0.6, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.35 + index * 0.08, duration: 0.4 }}
          >
            {tag}
          </motion.span>
        ))}
      </div>
      <FadeInUp
        delay={0.55}
        className="mt-10 max-w-3xl text-sm text-[var(--muted)] leading-relaxed"
      >
        Build once, run anywhere: Conda specs synchronized with Dev Containers,
        automation that provisions workspaces on-demand, and CI/CD that keeps
        pipelines aligned with production-ready infrastructure.
      </FadeInUp>
      <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
        {stats.map((stat, index) => (
          <ScalePop
            key={stat.label}
            delay={0.65 + index * 0.08}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--muted)]"
          >
            <div className={`text-${stat.tone}-100 text-xs uppercase`}>
              {stat.label}
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </ScalePop>
        ))}
      </div>
    </div>
  );
}

function DevExperienceSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>Developer Experience</h2>
      </FadeInUp>
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
        ].map((card, index) =>
          index % 2 === 0 ? (
            <SlideInLeft
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
            </SlideInLeft>
          ) : (
            <SlideInRight
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
            </SlideInRight>
          )
        )}
      </div>
      <FadeInUp delay={0.6} className="mt-8 text-center text-xs text-white/70">
        Clone the repo, run the Makefile, open the container—onboarding down to
        minutes.
      </FadeInUp>
    </div>
  );
}

function InfrastructureOverviewSlide() {
  const cards = [
    {
      icon: "🛡️",
      title: "Base Infrastructure",
      description: "Locked-down landing zone that every workspace inherits.",
      bullets: [
        "Hub VNet with segmented data, compute, and management subnets.",
        "VPN gateway + Azure Firewall with private DNS zones.",
        "Private endpoints for storage, Key Vault, and container registry.",
      ],
    },
    {
      icon: "🧪",
      title: "Workspace Infrastructure",
      description:
        "Train, Test, Serve environments deployed three times for lifecycle control.",
      bullets: [
        "Azure ML workspaces with linked storage, key vault, and app insights.",
        "Private CPU & GPU compute clusters managed centrally.",
        "Network-isolated datastores, feature stores, and endpoint deployments.",
      ],
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-10 text-center">
        <h2 className={gradientTitle}>Secure Landing Zone & Workspaces</h2>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-2">
        {cards.map((card, index) => (
          <ScalePop
            key={card.title}
            delay={0.18 + index * 0.12}
            className={`${surface} space-y-4`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{card.icon}</span>
              <div>
                <span className={pill}>{card.title}</span>
                <p className="mt-2 text-sm text-white/80">{card.description}</p>
              </div>
            </div>
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className={`${mutedText} space-y-2 text-sm`}
            >
              {card.bullets.map((point) => (
                <motion.li
                  key={point}
                  variants={{
                    hidden: { opacity: 0, x: -14 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  • {point}
                </motion.li>
              ))}
            </motion.ul>
          </ScalePop>
        ))}
      </div>
      <FadeInUp
        delay={0.5}
        className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 text-sm text-[var(--muted)]"
      >
        <div className="text-xs uppercase tracking-wide text-white/70 mb-3">
          Architecture Flow
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
          className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          {[
            { label: "Dev Workstation", tone: "amber" },
            { label: "Makefile Automations", tone: "rose" },
            { label: "VPN Gateway", tone: "violet" },
            { label: "Base VNet", tone: "sky" },
            { label: "AML Workspaces", tone: "emerald" },
          ].map((node, idx, arr) => (
            <React.Fragment key={node.label}>
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
                className={`rounded-full border border-${node.tone}-400/40 bg-${node.tone}-500/15 px-4 py-2 text-xs font-semibold text-${node.tone}-100`}
              >
                {node.label}
              </motion.div>
              {idx < arr.length - 1 && (
                <motion.span
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="hidden md:block text-white/60"
                >
                  ➔
                </motion.span>
              )}
            </React.Fragment>
          ))}
        </motion.div>
        <p className="mt-4 text-xs text-white/70">
          Automation lands developers inside the private network, routes traffic
          through the VPN gateway, and brokers secure access to AML workspaces
          and their private resources.
        </p>
      </FadeInUp>
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
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>Infrastructure Automation</h2>
      </FadeInUp>
      <ScalePop
        delay={0.2}
        className={`${surface} mb-8 text-sm text-[var(--muted)] leading-relaxed`}
      >
        The automation fabric treats every change as code: PRs light up
        disposable infrastructure, merges refresh staging, and a guarded
        approval button promotes production. No snowflake environments, no
        guesswork.
      </ScalePop>
      <div className="grid gap-6 lg:grid-cols-2">
        {flows.map((flow, index) => (
          <ScalePop
            key={flow.title}
            delay={0.2 + index * 0.12}
            className={`${surface} flex flex-col gap-5 hover:border-white/20 transition-colors`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{flow.icon}</span>
              <div>
                <span className={pill}>{flow.title}</span>
                <p className={`${mutedText} mt-2`}>{flow.summary}</p>
              </div>
            </div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06 } },
              }}
              className="flex flex-wrap items-center gap-2"
            >
              {flow.steps.map((step, stepIndex) => (
                <motion.div
                  key={step.label}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className={`inline-flex items-center gap-1 rounded-full border border-${step.tone}-400/40 bg-${step.tone}-500/15 px-3 py-1 text-xs font-semibold text-${step.tone}-100`}
                >
                  {step.label}
                  {stepIndex < flow.steps.length - 1 && (
                    <span className="text-white/60">➔</span>
                  )}
                </motion.div>
              ))}
            </motion.div>
            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className={`${mutedText} text-xs space-y-2`}
            >
              {flow.details.map((detail) => (
                <li key={detail}>• {detail}</li>
              ))}
            </motion.ul>
          </ScalePop>
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
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>Data Science Folder Blueprint</h2>
      </FadeInUp>
      <ScalePop
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

          {structure.map((node, index) => (
            <SlideInLeft
              key={node.folder}
              delay={0.25 + index * 0.08}
              className="relative pl-8 pb-8 last:pb-0"
            >
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
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.06 } },
                    }}
                    className="mt-3 flex flex-wrap gap-2"
                  >
                    {node.chips.map((chip) => (
                      <motion.span
                        key={chip}
                        variants={{
                          hidden: { opacity: 0, y: 6 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/70"
                      >
                        {chip}
                      </motion.span>
                    ))}
                  </motion.div>
                  <motion.ul
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.35 }}
                    className={`${mutedText} mt-3 space-y-2 text-sm`}
                  >
                    {node.details.map((detail) => (
                      <li key={detail}>• {detail}</li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </SlideInLeft>
          ))}
        </div>
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70">
          Promotion path: when an experiment hardens, code graduates into{" "}
          <code>src/</code>, environment deltas land in{" "}
          <code>environments/</code>, and CI/CD pipelines pick up the changes
          automatically.
        </div>
      </ScalePop>
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
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>Experiments as Decision Records</h2>
      </FadeInUp>
      <FadeInUp
        delay={0.2}
        className="mx-auto max-w-4xl text-center text-sm text-[var(--muted)]"
      >
        Experiments live beside production code, acting as lightweight decision
        records. Each folder captures the hypothesis, code, data slices, and a
        markdown log so future readers understand what shipped—and why.
      </FadeInUp>
      <div className="mt-8 flex flex-col gap-6 lg:flex-row">
        <SlideInLeft delay={0.3} className={`${surface} flex-1 space-y-4`}>
          <span className={pill}>Folder Layout</span>
          <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-white/80 overflow-auto">
            {folderTree}
          </pre>
        </SlideInLeft>
        <SlideInRight delay={0.35} className={`${surface} flex-1 space-y-4`}>
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
        </SlideInRight>
      </div>
      <ScalePop delay={0.5} className={`${surface} mt-6 space-y-4`}>
        <span className={pill}>Markdown Snapshot</span>
        <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-white/80 overflow-auto">
          {markdownSample}
        </pre>
        <p className={`${mutedText} text-sm`}>
          Markdown summaries double as decision logs—link to notebooks, call out
          data slices, and state clearly whether the experiment should move
          forward.
        </p>
      </ScalePop>
    </div>
  );
}

function MLOpsFoldersSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>MLOps Pipelines</h2>
      </FadeInUp>
      <ScalePop delay={0.2} className={`${surface} space-y-4`}>
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
      </ScalePop>
    </div>
  );
}

function OnlineEndpointSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>Online Endpoint Blueprint</h2>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
        <SlideInLeft delay={0.25} className={`${surface} space-y-4`}>
          <span className={pill}>Folder Layout</span>
          <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-white/80 overflow-auto">
            {`mlops/azureml/
└── example_online_endpoint/
    ├── env.yaml
    ├── endpoint.yaml
    └── deployment.yaml`}
          </pre>
          <ul className={`${mutedText} space-y-2 text-sm`}>
            <li>• `env.yaml`: runtime packages for the scoring container.</li>
            <li>• `endpoint.yaml`: endpoint name, auth mode, traffic rules.</li>
            <li>
              • `deployment.yaml`: SKU, instance count, model + code config.
            </li>
          </ul>
        </SlideInLeft>
        <SlideInRight delay={0.32} className={`${surface} space-y-4`}>
          <span className={pill}>Deploy It</span>
          <ul className={`${mutedText} space-y-2 text-sm`}>
            <li>
              • `az ml online-endpoint create -f
              mlops/azureml/example_online_endpoint/endpoint.yaml`
            </li>
            <li>
              • `az ml online-deployment create -f
              mlops/azureml/example_online_endpoint/deployment.yaml
              --all-traffic`
            </li>
            <li>
              • Swap in your environment/model paths, commit, and let CI/CD
              mirror the deployment.
            </li>
          </ul>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70">
            The pattern matches the training pipelines: versioned YAML + CLI =
            reproducible infrastructure. Copy the folder to bootstrap new
            real-time endpoints fast.
          </div>
        </SlideInRight>
      </div>
    </div>
  );
}

function SecurityPolicySlide() {
  const workflowYaml = [
    "# .github/workflows/security.yml",
    "jobs:",
    "  trivy-security-scan:",
    "    runs-on: ubuntu-latest",
    "    steps:",
    "      - uses: aquasecurity/trivy-action@v0.33.1",
    "        with:",
    '          scan-type: "config"',
    '          format: "sarif"',
    '          severity: "MEDIUM,HIGH,CRITICAL"',
    "          exit-code: 1",
    "",
    "  checkov-security-scan:",
    "    runs-on: ubuntu-latest",
    "    steps:",
    "      - uses: bridgecrewio/checkov-action@master",
    "        with:",
    "          framework: terraform,dockerfile,github_actions",
    "          output_format: sarif,cli",
  ].join("\n");

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>🛡️ Security</h2>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-2">
        <SlideInLeft delay={0.2} className={`${surface} space-y-4`}>
          <div className="flex items-center gap-2">
            <span className="text-xl">🏗️</span>
            <span className="text-sm font-semibold uppercase tracking-wide text-white/80">
              Architecture Security Features
            </span>
          </div>
          <ul className={`${mutedText} space-y-2 text-sm`}>
            <li>
              • Private Endpoints: All Azure ML services use private endpoints.
            </li>
            <li>
              • Network Isolation: Hub-and-spoke architecture with subnet
              segmentation.
            </li>
            <li>
              • VPN Gateway: Secure site-to-site connectivity into the workspace
              VNets.
            </li>
            <li>
              • NSGs: Least-privilege network security group rules on every
              subnet.
            </li>
            <li>
              • Managed Identity: No secrets—Azure AD-backed identities
              everywhere.
            </li>
            <li>
              • Encryption: HTTPS/TLS in transit, customer-managed keys at rest.
            </li>
          </ul>
        </SlideInLeft>
        <SlideInRight delay={0.3} className={`${surface} space-y-4`}>
          <div className="flex items-center gap-2">
            <span className="text-xl">🔍</span>
            <span className="text-sm font-semibold uppercase tracking-wide text-white/80">
              Dual Security Scanner Approach
            </span>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-white/80 space-y-2">
            <div className="font-semibold text-white">🐛 Trivy Scanner</div>
            <ul className="space-y-1.5">
              <li>
                • Terraform, Docker, GitHub Actions vulnerability scanning.
              </li>
              <li>• CVE database integration, SARIF artifact output.</li>
              <li>• Blocks PRs with HIGH/CRITICAL findings.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-white/80 space-y-2">
            <div className="font-semibold text-white">✅ Checkov Scanner</div>
            <ul className="space-y-1.5">
              <li>
                • 450+ security + compliance checks across Terraform, Docker,
                GitHub Actions.
              </li>
              <li>
                • Azure-specific IaC policies, policy-as-code enforcement.
              </li>
              <li>• Ensures infrastructure meets governance baselines.</li>
            </ul>
          </div>
        </SlideInRight>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr,1fr] mt-6">
        <SlideInLeft delay={0.35} className={`${surface} space-y-4`}>
          <div className="flex items-center gap-2">
            <span className="text-xl">💻</span>
            <span className="text-sm font-semibold uppercase tracking-wide text-white/80">
              Developer Workflow Integration
            </span>
          </div>
          <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-white/80 overflow-auto">
            {`# Comprehensive security scan
./scripts/security-scan.sh

# Fast scan for changed files only
./scripts/security-scan.sh --changed-only

# Tool-specific scans
./scripts/security-scan.sh --trivy-only
./scripts/security-scan.sh --checkov-only`}
          </pre>
          <p className={`${mutedText} text-xs`}>
            Run the full scan before PRs, use `--changed-only` while iterating,
            and document justified exceptions in `.trivyignore` or
            `.checkov.yml`.
          </p>
        </SlideInLeft>
        <SlideInRight delay={0.4} className={`${surface} space-y-4`}>
          <div className="flex items-center gap-2">
            <span className="text-xl">🚀</span>
            <span className="text-sm font-semibold uppercase tracking-wide text-white/80">
              CI/CD Security Pipeline
            </span>
          </div>
          <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-white/80 overflow-auto">
            {workflowYaml}
          </pre>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70">
            Automated GitHub Actions pipeline runs Trivy and Checkov in
            parallel, publishes SARIF to the Security tab, and blocks merges on
            CRITICAL/HIGH issues.
          </div>
        </SlideInRight>
      </div>
      <ScalePop delay={0.5} className={`${surface} mt-6 space-y-4`}>
        <div className="flex items-center gap-2">
          <span className="text-xl">🚨</span>
          <span className="text-sm font-semibold uppercase tracking-wide text-white/80">
            Security Enforcement & Feedback
          </span>
        </div>
        <ul className={`${mutedText} space-y-2 text-sm`}>
          <li>
            • PR Blocking: CRITICAL/HIGH findings block merges until resolved;
            MEDIUM/LOW provide remediation guidance.
          </li>
          <li>
            • Automatic Comments: Security summary posted on PRs with key issues
            and next steps.
          </li>
          <li>
            • Reporting: SARIF artifacts in GitHub Security tab; compliance
            scoring + trend analysis for audits.
          </li>
          <li>
            • Configuration Management: `.checkov.yml`, `trivy.yaml`,
            `.trivyignore` track policies and approved exceptions.
          </li>
        </ul>
      </ScalePop>
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
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>CI/CD Keeps Models Fresh</h2>
      </FadeInUp>
      <ScalePop
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
            <ScalePop
              key={step.title}
              delay={0.28 + index * 0.1}
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
              <motion.ul
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.35 }}
                className={`${mutedText} text-xs space-y-2`}
              >
                {step.highlights.map((highlight) => (
                  <li key={highlight}>• {highlight}</li>
                ))}
              </motion.ul>
            </ScalePop>
          ))}
        </div>
      </ScalePop>
      <SlideInRight delay={0.55} className={`${surface} mt-6 space-y-4`}>
        <span className={pill}>Example GitHub Workflow</span>
        <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-white/80 overflow-auto">
          {workflowYaml}
        </pre>
        <p className={`${mutedText} text-xs`}>
          Built from reusable workflow call steps—swap in different YAML files
          (datasets, envs, pipelines) to automate other AML scenarios with the
          same pattern.
        </p>
      </SlideInRight>
    </div>
  );
}

function QASlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-10 max-w-5xl"
      >
        <h2 className="text-[clamp(44px,7vw,80px)] font-extrabold bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-500 bg-clip-text text-transparent">
          Q&A · What's Next?
        </h2>
        <FadeInUp delay={0.15} className="text-lg text-[var(--muted)]">
          Ask about infrastructure design, security posture, developer workflow,
          or anything else you need to take this accelerator into production.
        </FadeInUp>
        <FadeInUp delay={0.45} className="text-sm text-white/70">
          Follow-ups: GitHub repo issues · #mlops-accelerator channel · Office
          hours every Friday
        </FadeInUp>
      </motion.div>
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
  "online-endpoints": <OnlineEndpointSlide />,
  "security-policy": <SecurityPolicySlide />,
  "cicd-automation": <CicdAutomationSlide />,
  qa: <QASlide />,
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
