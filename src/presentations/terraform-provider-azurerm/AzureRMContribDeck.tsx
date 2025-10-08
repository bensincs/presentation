import React from "react";
import { motion } from "framer-motion";
import DeckDisclaimer from "../components/DeckDisclaimer";
import type { DeckComponentProps, SlideMeta } from "../../types";

const gradientTitle =
  "text-5xl font-bold bg-gradient-to-r from-sky-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent";

const surfaceCard =
  "surface rounded-2xl border border-white/5 bg-white/5 px-6 py-5 shadow-lg shadow-black/20";

const subtlePill =
  "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/70";

const mutedList = "space-y-2 text-sm text-[var(--muted)] leading-relaxed";

const highlightBadge = (label: string, tone: string) => (
  <span
    key={label}
    className={`inline-flex items-center gap-1 rounded-full border border-${tone}-400/40 bg-${tone}-500/15 px-3 py-1 text-xs font-semibold text-${tone}-100`}
  >
    {label}
  </span>
);

export const azurermContribSlides: SlideMeta[] = [
  {
    id: "title",
    transition: "fade",
    speakerNotes: [
      "Hey everyone -- thanks for joining this walk-through on contributing to the AzureRM provider. This session is about showing how attainable it is to land a resource, not just talking about it.",
      "AzureRM ships weekly and powers thousands of production Terraform runs, so even a single contribution has outsized impact. As we go, imagine which service your team needs and how quickly you could ship it.",
      "By the end you'll have a repeatable playbook: we will tour the architecture, prep your workstation, build a typed resource together, and close with how to keep momentum after this session.",
    ],
  },
  {
    id: "dev-experience",
    transition: "slide",
    speakerNotes: [
      "Walk through the ready-to-code experience: devcontainer, make targets, and the first validation loop.",
      "Call out that the container mirrors CI tooling so lint and tests behave identically anywhere.",
      "Remind folks to keep az login pointed at a safe subscription before running acceptance tests.",
    ],
  },
  {
    id: "why-contribute",
    transition: "slide",
    speakerNotes: [
      "Before we dive into code, I want to ground us in why contributions matter. When a service gap blocks infrastructure rollout, waiting on the official backlog can stall projects for months.",
      "By stepping in, you accelerate Azure adoption, harden infrastructure through better schema coverage, and build deep expertise with both Terraform Core and Azure APIs.",
      "Think of this as a three-part win: you unblock your own workloads, you help the community stay current with Azure releases, and you establish credibility with HashiCorp maintainers for future fast tracks.",
    ],
  },
  {
    id: "provider-architecture",
    transition: "fade",
    speakerNotes: [
      "Let us look under the hood so the pieces we touch later make sense. Terraform Core calls the provider, the provider uses service packages that wrap Azure SDK clients, and those clients talk to Azure REST APIs.",
      "Each typed resource bundles schema definitions, helpers that map Terraform state into Azure models, and CRUD methods that keep operations idempotent.",
      "When the API responds, the provider flattens the payload back into Terraform state, surfaces helpful diagnostics if something goes wrong, and keeps plans honest.",
    ],
  },
  {
    id: "tooling-setup",
    transition: "slide",
    speakerNotes: [
      "Success starts with a clean workstation, so install Go, Node, and the helper binaries from docs/building-the-provider.md before you write a single line.",
      "Authenticate with the Azure subscription you will use for acceptance tests -- an isolated subscription or resource group keeps cleanup simple and avoids production surprises.",
      "Run the provided scripts or the devcontainer to pull in pre-commit hooks, and confirm that make test passes to catch environment issues before they derail development.",
    ],
  },
  {
    id: "issue-triage",
    transition: "slide",
    speakerNotes: [
      "With tooling ready, pause before coding and coordinate with maintainers. Scan GitHub issues tagged help-wanted or service labels, and read recent discussions to avoid duplicating work.",
      "Create or update a decision log in the issue describing the API version, regional or SKU assumptions, and any design questions you have.",
      "That early context invites fast feedback from maintainers and sets shared expectations so your pull request feels like a planned delivery instead of a surprise.",
    ],
  },
  {
    id: "resource-schema",
    transition: "slide",
    speakerNotes: [
      "Here is the live file: internal/services/machinelearning/machine_learning_workspace_resource.go. The resourceMachineLearningWorkspace function is the exact shape we follow.",
      "The Schema map layers commonschema helpers, Azure ID validators, and ForceNew flags—identifiers and location first, then everything from identities to networking.",
      "Getting this block correct sets the contract for CRUD and docs; lean on shared helpers and keep parity with the Azure API surface.",
    ],
  },
  {
    id: "resource-crud",
    transition: "slide",
    speakerNotes: [
      "Create for the workspace decodes config, builds the ID with workspaces.NewWorkspaceID, guards with response.WasNotFound, then calls CreateOrUpdateThenPoll.",
      "Update starts from the existing payload, toggles only changed fields—identity, networking, tags—and reuses CreateOrUpdateThenPoll so long-running operations are covered.",
      "Delete shows the clean pattern: honor purge feature flags, call client.Delete, then wait on future.Poller.PollUntilDone so Terraform stays synchronized.",
    ],
  },
  {
    id: "resource-registration",
    transition: "slide",
    speakerNotes: [
      "The same package exposes a Registration struct that returns resourceMachineLearningWorkspace()—that is what the provider enumerates.",
      "Wire that registration into internal/provider/services.go next to the other services so the provider instantiates the workspace resource.",
      "Close the loop with the usual trio: acceptance tests, docs, and changelog entries shipped alongside this workspace example.",
    ],
  },
  {
    id: "testing",
    transition: "slide",
    speakerNotes: [
      "Testing is your safety net. Start with go test ./... to exercise helper logic quickly, and use table-driven tests for expanders and validators to capture edge cases.",
      "When it is time for acceptance tests, run targeted make acctests commands with a narrow -run filter to keep runtime and cost under control, and tag resources for easy cleanup.",
      "Remember that TF_ACC should only be set while those acceptance tests run; keeping it unset during unit tests prevents accidental provisioning.",
    ],
  },
  {
    id: "documentation",
    transition: "slide",
    speakerNotes: [
      "Documentation and changelog entries are non-negotiable because they tell users how to adopt your feature. Populate website/docs/r/<resource>.html.markdown with example usage, argument guidance, defaults, and Azure quirks.",
      "Run make website before you push so you catch formatting errors locally; treat the doc as the contract that lets someone use the resource without reading the code.",
      "Update CHANGELOG.md under ## Unreleased with a concise enhancement entry that names the resource, describes the capability, and links to the issue so release notes stay authoritative.",
    ],
  },
  {
    id: "qa",
    transition: "fade",
    speakerNotes: [
      "That brings us to Q&A and next steps -- think about the service you want to enable and what is standing between you and opening that pull request.",
      "We can triage an issue together, walk through test setup, or review a doc outline; nothing is off limits.",
      "When you are ready, grab an issue, draft your plan, loop in the maintainers, and come back to demo what you shipped -- your future self and the community will thank you.",
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
        className="text-[clamp(44px,8.2vw,96px)] font-extrabold bg-gradient-to-r from-sky-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        Contributing to Terraform AzureRM
      </motion.h1>
      <FadeIn delay={0.35} className="text-2xl text-[var(--muted)] max-w-3xl">
        How to add the features Azure teams need, collaborate with HashiCorp
        maintainers, and ship confidently.
      </FadeIn>
      <FadeIn
        delay={0.5}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        {[
          "HashiCorp Provider",
          "Azure REST APIs",
          "Go 1.22",
          "Terraform Plugin SDK",
          "Acceptance Testing",
        ].map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/80"
          >
            {item}
          </span>
        ))}
      </FadeIn>
      <FadeIn
        delay={0.65}
        className="mt-12 max-w-2xl text-sm text-[var(--muted)]"
      >
        AzureRM is one of the busiest Terraform providers on the planet. Every
        disciplined contribution keeps infrastructure teams unblocked, so thank
        you for jumping in and bringing the next resource to life.
      </FadeIn>
    </div>
  );
}

function DevExperienceSlide() {
  const cards = [
    {
      title: "Dev Container",
      tone: "sky",
      points: [
        "Preloads Go, Terraform CLI, tfplugindocs, and az CLI.",
        "Matches CI tooling so lint/test output is identical everywhere.",
        "Ideal for local Docker or GitHub Codespaces sessions.",
      ],
    },
    {
      title: "Make Targets",
      tone: "emerald",
      points: [
        "`make tools` installs helper binaries; `make vendor` syncs modules.",
        "`make lint test` mirrors CI checks before you push a branch.",
        "`make fmt` and pre-commit hooks keep the repo tidy automatically.",
      ],
    },
    {
      title: "Quick Validation",
      tone: "violet",
      points: [
        "Run `go test ./...` with TF_ACC unset for fast feedback loops.",
        "Use `task docs` or `make website` to preview provider docs locally.",
        "Authenticate az CLI against a disposable subscription ahead of TF_ACC runs.",
      ],
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Developer Experience Setup</h2>
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-3">
        {cards.map((card, index) => (
          <FadeIn
            key={card.title}
            delay={0.2 + index * 0.12}
            className={`${surfaceCard} border-${card.tone}-400/30 bg-${card.tone}-500/10`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-white">
                {card.title}
              </span>
              <span className={`text-xs uppercase text-${card.tone}-100`}>
                Ready Day 1
              </span>
            </div>
            <ul className={mutedList}>
              {card.points.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.55} className="mt-8 text-center text-xs text-white/70">
        Get the basics locked, then focus your energy on shipping the resource—not fighting your workstation.
      </FadeIn>
    </div>
  );
}

function WhyContributeSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-10 text-center">
        <h2 className={gradientTitle}>Why Your Contribution Matters</h2>
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "HashiCorp Promise",
              tone: "sky",
              bullets: [
                "Provider charter: keep pace with every Azure GA resource.",
                "Community PRs help HashiCorp honour that commitment across rapid Azure releases.",
              ],
            },
            {
              title: "Accelerate Microsoft & Partners",
              tone: "emerald",
              bullets: [
                "ISE teams unblock feature rollouts without hand-crafted azapi modules.",
                "Partners and customers adopt your fix the moment the weekly release ships.",
              ],
            },
            {
              title: "Grow as an Engineer",
              tone: "amber",
              bullets: [
                "Learn Go in production—start with GoByExample for bite-sized patterns.",
                "Feel the rigor of real releases: lint, unit tests, acceptance tests. No shortcuts.",
                "Deep dive into Azure REST contracts and the Terraform Plugin SDK internals.",
              ],
            },
            {
              title: "Earn Long-Term Trust",
              tone: "violet",
              bullets: [
                "Consistent contributors get fast-track reviews and merge times.",
                "Each PR removes hand-rolled azapi hacks from our codebase.",
                "Your name appears in release notes consumed by thousands of IaC pipelines.",
              ],
            },
          ].map((card, index) => (
            <FadeIn
              key={card.title}
              delay={0.2 + index * 0.1}
              className={`${surfaceCard} border-${card.tone}-400/30 bg-${card.tone}-500/10`}
            >
              <h3 className={`text-lg font-semibold text-${card.tone}-100`}>
                {card.title}
              </h3>
              <ul className={mutedList}>
                {card.bullets.map((bullet) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.5} className={`${surfaceCard} flex flex-col gap-4`}>
          <span className={subtlePill}>Impact Snapshot</span>
          <div className="text-sm text-[var(--muted)] space-y-3">
            <p>
              HashiCorp publishes AzureRM weekly—your merged PR propagates to
              Microsoft engineering and partner tenants almost immediately.
            </p>
            <p>
              Reliable contributions build a “merge credit score”; reviewers
              recognise disciplined engineers who never skip tests or lint.
            </p>
            <p className="text-xs text-white/70">
              Bonus inspiration: GoByExample.com is opened in 4/5 new
              contributor tabs—drop the link in chat for anyone who wants a
              refresher.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

function ProviderArchitectureSlide() {
  const flowNodes = [
    {
      label: "Terraform Core",
      tone: "sky",
      bullet: [
        "Parses configuration & plans desired vs current state",
        "Negotiates schema with provider over gRPC",
      ],
    },
    {
      label: "AzureRM Provider",
      tone: "emerald",
      bullet: [
        "Translates Terraform plan into Azure SDK operations",
        "Applies schema validations, plan modifiers, diagnostics",
      ],
    },
    {
      label: "Azure SDK for Go",
      tone: "violet",
      bullet: [
        "Handles authentication, retries, long-running operations",
        "Returns typed responses for flattening back into state",
      ],
    },
    {
      label: "Azure Resource Manager",
      tone: "indigo",
      bullet: [
        "Applies infrastructure changes across subscriptions & RGs",
        "Emits activity logs consumed for diagnostics",
      ],
    },
  ];

  const anatomy = [
    {
      title: "Schema Layer",
      tone: "sky",
      detail:
        "Defines arguments, defaults, validations, state upgraders. Lives in resource_*.go",
    },
    {
      title: "Expansion / Flattening",
      tone: "emerald",
      detail:
        "Marshals Terraform schema into Azure requests and back into state objects",
    },
    {
      title: "CRUD Handlers",
      tone: "violet",
      detail:
        "Invoke Azure SDK clients, manage async pollers, enforce timeouts & retries",
    },
    {
      title: "Diagnostics & Feature Flags",
      tone: "indigo",
      detail:
        "Surface actionable errors, warnings, preview toggles (internal/features)",
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Provider Architecture at a Glance</h2>
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-2">
        <FadeIn delay={0.2} className={`${surfaceCard} space-y-5`}>
          <span className={subtlePill}>Execution Flow</span>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 p-5">
            <div className="ml-10 flex flex-col gap-6">
              {flowNodes.map((node, index) => (
                <div key={node.label} className="relative">
                  <div
                    className={`absolute -left-12 flex h-8 w-8 items-center justify-center rounded-full border border-${node.tone}-400/60 bg-${node.tone}-500/20 text-xs font-semibold text-${node.tone}-100`}
                  >
                    {index + 1}
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div
                      className={`text-sm font-semibold text-${node.tone}-100`}
                    >
                      {node.label}
                    </div>
                    <ul className="mt-2 space-y-1.5 text-xs text-[var(--muted)]">
                      {node.bullet.map((line) => (
                        <li key={line}>• {line}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs text-white/60">
            Terraform core and the provider communicate over the Terraform
            plugin protocol; the provider handles Azure-specific heavy lifting.
          </div>
        </FadeIn>
        <FadeIn delay={0.35} className={`${surfaceCard} space-y-4`}>
          <span className={subtlePill}>Code Anatomy</span>
          <div className="grid gap-4">
            {anatomy.map((section, index) => (
              <div
                key={section.title}
                className={`rounded-2xl border border-${section.tone}-400/40 bg-${section.tone}-500/12 px-4 py-3`}
              >
                <div
                  className={`text-sm font-semibold text-${section.tone}-100`}
                >
                  {index + 1}. {section.title}
                </div>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  {section.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70">
            Tip: Keep helpers reusable—shared packages in{" "}
            <code>internal/services</code> cut down on copy/paste and make
            reviews faster.
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

function ToolingSetupSlide() {
  const steps = [
    {
      title: "Install prerequisites",
      detail: "Go 1.22+, Terraform CLI ≥1.8, Azure CLI, make, jq, GNU tar.",
    },
    {
      title: "Clone & bootstrap",
      detail:
        "git clone repo, run make tools vendor to install linters and vendor dependencies.",
    },
    {
      title: "Configure credentials",
      detail:
        "Export ARM_* env vars (subscription, tenant, client ID/secret) and set storage account for state if needed.",
    },
    {
      title: "Validate setup",
      detail:
        "make fmt lint test to ensure formatter, lint rules, and unit tests all pass locally.",
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Tooling & Environment</h2>
      </FadeIn>
      <div className={`${surfaceCard} space-y-6`}>
        <div className="flex flex-wrap gap-2">
          {["Go", "Terraform", "Azure CLI", "Make", "Pre-commit"].map((tag) =>
            highlightBadge(tag, "sky")
          )}
        </div>
        <div className="grid gap-4 text-sm text-[var(--muted)] md:grid-cols-2">
          {steps.map((step, index) => (
            <FadeIn
              key={step.title}
              delay={0.2 + index * 0.08}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs font-semibold text-white/80">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {step.title}
                  </h3>
                  <p>{step.detail}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-100">
          Fast path: use devcontainer in <code>.devcontainer</code> to get a
          pre-baked environment with Go, Terraform, and Azure CLI ready to go.
        </div>
      </div>
    </div>
  );
}

function IssueTriageSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Finding & Shaping Work</h2>
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-2">
        <FadeIn delay={0.2} className={`${surfaceCard} space-y-3`}>
          <span className={subtlePill}>Work Discovery</span>
          <ul className={mutedList}>
            <li>
              • Filter issues by <code>help-wanted</code>, service labels (e.g.,
              <code>service/network</code>), or <code>good first issue</code>.
            </li>
            <li>
              • Scan Discussions for design proposals or release blockers
              needing help.
            </li>
            <li>
              • Track Azure service announcements to anticipate resource gaps.
            </li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.32} className={`${surfaceCard} space-y-3`}>
          <span className={subtlePill}>Decision Log</span>
          <ul className={mutedList}>
            <li>• Document API versions and endpoints you plan to target.</li>
            <li>• Note supported SKUs, regions, or preview toggles.</li>
            <li>• Outline schema proposal (required vs optional fields).</li>
            <li>• Share acceptance test strategy to confirm feasibility.</li>
          </ul>
          <div className="text-xs text-white/70">
            Add this context in the issue before coding—maintainers often
            respond within a day with guidance or references.
          </div>
        </FadeIn>
        <FadeIn
          delay={0.5}
          className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-4"
        >
          <img
            src="/images/azurerm-issues.png"
            alt="Open issues filtered in hashicorp/terraform-provider-azurerm"
          />
          <p className="mt-3 text-xs text-white/70">
            Screenshot: filter by label + help wanted before you claim an issue
            so the community knows it’s in progress.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}

function ResourceSchemaSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Define Model & Schema</h2>
        <p className="mt-3 text-sm text-[var(--muted)] max-w-3xl mx-auto">
          AzureRM’s machine learning workspace resource shows the full schema
          pattern—helpers, validation, and nested blocks all in one place.
        </p>
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <FadeIn delay={0.2} className={`${surfaceCard} space-y-3`}>
          <span className={subtlePill}>File Scaffold</span>
          <ul className={mutedList}>
            <li>
              • Real file:{" "}
              <code>
                internal/services/machinelearning/machine_learning_workspace_resource.go
              </code>
              .
            </li>
            <li>
              • <code>resourceMachineLearningWorkspace</code> returns the{" "}
              <code>*pluginsdk.Resource</code> with CRUD hooks.
            </li>
            <li>
              • Schema entries use shared helpers like{" "}
              <code>commonschema.Location()</code>,{" "}
              <code>commonschema.ResourceGroupName()</code>, and Azure ID
              validators.
            </li>
            <li>
              • Group fields by API contract—identifiers, identity, encryption,
              networking, then miscellaneous toggles.
            </li>
            <li>
              • Nested blocks (identity, managed_network, serverless_compute)
              keep their own schema maps for readability.
            </li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className={`${surfaceCard} space-y-4`}>
          <span className={subtlePill}>Schema & Model</span>
          <pre className="overflow-auto rounded-xl bg-slate-950/75 p-4 text-xs text-[var(--muted)]">
            {`func resourceMachineLearningWorkspace() *pluginsdk.Resource {
  return &pluginsdk.Resource{
    Create: resourceMachineLearningWorkspaceCreate,
    Read:   resourceMachineLearningWorkspaceRead,
    Update: resourceMachineLearningWorkspaceUpdate,
    Delete: resourceMachineLearningWorkspaceDelete,

    Importer: pluginsdk.ImporterValidatingResourceId(func(id string) error {
      _, err := workspaces.ParseWorkspaceID(id)
      return err
    }),

    Timeouts: &pluginsdk.ResourceTimeout{...},

    Schema: map[string]*pluginsdk.Schema{
      "name": {
        Type:         pluginsdk.TypeString,
        Required:     true,
        ForceNew:     true,
        ValidateFunc: validate.WorkspaceName,
      },
      "location":            commonschema.Location(),
      "resource_group_name": commonschema.ResourceGroupName(),
      "application_insights_id": {
        Type:         pluginsdk.TypeString,
        Required:     true,
        ForceNew:     true,
        ValidateFunc: components.ValidateComponentID,
        DiffSuppressFunc: suppress.CaseDifference,
      },
      ...
      "serverless_compute": {
        Type:     pluginsdk.TypeList,
        Optional: true,
        MaxItems: 1,
        Elem: &pluginsdk.Resource{
          Schema: map[string]*pluginsdk.Schema{
            "subnet_id": {
              Type:         pluginsdk.TypeString,
              Optional:     true,
              ValidateFunc: commonids.ValidateSubnetID,
            },
            "public_ip_enabled": {
              Type:     pluginsdk.TypeBool,
              Optional: true,
              Default:  false,
            },
          },
        },
      },
      "tags": commonschema.Tags(),
    },
  }
}
`}
          </pre>
          <div className="text-xs text-white/70">
            Run <code>go fmt ./...</code> before committing so CI passes the Go
            formatting checks.
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

function ResourceCRUDSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Implement CRUD Methods</h2>
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <FadeIn delay={0.2} className={`${surfaceCard} space-y-3`}>
          <span className={subtlePill}>Execution Flow</span>
          <ul className={mutedList}>
            <li>
              • Create: decode config, build the ID with{" "}
              <code>workspaces.NewWorkspaceID</code>, guard with{" "}
              <code>response.WasNotFound</code>, then call{" "}
              <code>CreateOrUpdateThenPoll</code>.
            </li>
            <li>
              • Update: start from the fetched payload, toggle deltas (identity,
              network, tags) and reuse <code>CreateOrUpdateThenPoll</code>.
            </li>
            <li>
              • Read: parse the ID, fetch the workspace, normalize fields like
              location, then push state with <code>d.Set(...)</code>.
            </li>
            <li>
              • Delete: honor purge feature flags and block on{" "}
              <code>future.Poller.PollUntilDone</code>.
            </li>
          </ul>
          <div className="text-xs text-white/70">
            Return <code>sdk.ResourceFunc</code> with generous timeouts so users
            can override them in Terraform configuration.
          </div>
        </FadeIn>
        <FadeIn delay={0.35} className={`${surfaceCard} space-y-4`}>
          <span className={subtlePill}>Lifecycle Excerpts</span>
          <pre className="overflow-auto rounded-xl bg-slate-950/75 p-4 text-xs text-[var(--muted)]">
            {`func resourceMachineLearningWorkspaceCreate(d *pluginsdk.ResourceData, meta interface{}) error {
  client := meta.(*clients.Client).MachineLearning.Workspaces
  subscriptionId := meta.(*clients.Client).Account.SubscriptionId
  ctx, cancel := timeouts.ForCreate(meta.(*clients.Client).StopContext, d)
  defer cancel()

  id := workspaces.NewWorkspaceID(subscriptionId, d.Get("resource_group_name").(string), d.Get("name").(string))

  existing, err := client.Get(ctx, id)
  if err != nil {
    if !response.WasNotFound(existing.HttpResponse) {
      return fmt.Errorf("checking for presence of existing %s: %+v", id, err)
    }
  }
  if !response.WasNotFound(existing.HttpResponse) {
    return tf.ImportAsExistsError("azurerm_machine_learning_workspace", id.ID())
  }

  expandedIdentity, err := expandMachineLearningWorkspaceIdentity(d.Get("identity").([]interface{}))
  ...
  if err := client.CreateOrUpdateThenPoll(ctx, id, workspace); err != nil {
    return fmt.Errorf("creating %s: %+v", id, err)
  }

  d.SetId(id.ID())
  return resourceMachineLearningWorkspaceRead(d, meta)
}

func resourceMachineLearningWorkspaceRead(d *pluginsdk.ResourceData, meta interface{}) error {
  client := meta.(*clients.Client).MachineLearning.Workspaces
  ctx, cancel := timeouts.ForRead(meta.(*clients.Client).StopContext, d)
  defer cancel()

  id, err := workspaces.ParseWorkspaceID(d.Id())
  if err != nil {
    return err
  }

  resp, err := client.Get(ctx, *id)
  if err != nil {
    if response.WasNotFound(resp.HttpResponse) {
      d.SetId("")
      return nil
    }
    return fmt.Errorf("retrieving %s: %+v", id, err)
  }

  d.Set("name", id.WorkspaceName)
  d.Set("resource_group_name", id.ResourceGroupName)
  ...
  return tags.FlattenAndSet(d, model.Tags)
}
`}
          </pre>
          <pre className="overflow-auto rounded-xl bg-slate-950/75 p-4 text-xs text-[var(--muted)] text-wrap">
            {`func resourceMachineLearningWorkspaceUpdate(d *pluginsdk.ResourceData, meta interface{}) error {
  client := meta.(*clients.Client).MachineLearning.Workspaces
  ctx, cancel := timeouts.ForUpdate(meta.(*clients.Client).StopContext, d)
  defer cancel()

  id, err := workspaces.ParseWorkspaceID(d.Id())
  if err != nil {
    return err
  }

  existing, err := client.Get(ctx, *id)
  if err != nil {
    return fmt.Errorf("retrieving %s: %+v", id, err)
  }

  payload := existing.Model
  ...
  if d.HasChange("serverless_compute") {
    serverlessCompute := expandMachineLearningWorkspaceServerlessCompute(d.Get("serverless_compute").([]interface{}))
    ...
    payload.Properties.ServerlessComputeSettings = serverlessCompute
  }

  if err := client.CreateOrUpdateThenPoll(ctx, *id, *payload); err != nil {
    return fmt.Errorf("updating %s: %+v", id, err)
  }

  d.SetId(id.ID())
  return resourceMachineLearningWorkspaceRead(d, meta)
}

func resourceMachineLearningWorkspaceDelete(d *pluginsdk.ResourceData, meta interface{}) error {
  client := meta.(*clients.Client).MachineLearning.Workspaces
  ctx, cancel := timeouts.ForDelete(meta.(*clients.Client).StopContext, d)
  defer cancel()

  id, err := workspaces.ParseWorkspaceID(d.Id())
  if err != nil {
    return fmt.Errorf("parsing Machine Learning Workspace ID %q: %+v", d.Id(), err)
  }

  options := workspaces.DefaultDeleteOperationOptions()
  if meta.(*clients.Client).Features.MachineLearning.PurgeSoftDeletedWorkspaceOnDestroy {
    options = workspaces.DeleteOperationOptions{
      ForceToPurge: pointer.To(true),
    }
  }

  future, err := client.Delete(ctx, *id, options)
  if err != nil {
    return fmt.Errorf("deleting Machine Learning Workspace %q (Resource Group %q): %+v", id.WorkspaceName, id.ResourceGroupName, err)
  }

  if err := future.Poller.PollUntilDone(ctx); err != nil {
    return fmt.Errorf("waiting for deletion of Machine Learning Workspace %q (Resource Group %q): %+v", id.WorkspaceName, id.ResourceGroupName, err)
  }

  return nil
}
`}
          </pre>
          <div className="text-xs text-white/70">
            Add a custom poller when the SDK lacks DeleteThenPoll; otherwise
            this pattern covers most ARM services.
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

function ResourceRegistrationSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Register the Resource</h2>
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-[1fr,1fr]">
        <FadeIn delay={0.2} className={`${surfaceCard} space-y-4`}>
          <span className={subtlePill}>Service Package Registration</span>
          <pre className="overflow-auto rounded-xl bg-slate-950/75 p-4 text-xs text-[var(--muted)]">
            {`// internal/services/machinelearning/registration.go
var _ sdk.TypedServiceRegistration = Registration{}

type Registration struct{}

func (Registration) Name() string {
  return "MachineLearning"
}

func (Registration) Resources() []sdk.Resource {
  return []sdk.Resource{
    resourceMachineLearningWorkspace(),
    // ...
  }
}

func (Registration) DataSources() []sdk.DataSource {
  return []sdk.DataSource{}
}

func (Registration) WebsiteCategories() []string {
  return []string{"Machine Learning"}
}
`}
          </pre>
          <div className="text-xs text-white/70">
            Keep data sources and website categories aligned with existing
            entries so the docs build picks them up.
          </div>
        </FadeIn>
        <FadeIn delay={0.35} className={`${surfaceCard} space-y-3`}>
          <span className={subtlePill}>Provider Wiring & PR Exit</span>
          <ul className={mutedList}>
            <li>
              • Ensure the registration is listed in{" "}
              <code>internal/provider/services.go</code> so the provider loads
              it.
            </li>
            <li>
              • Commit acceptance tests (e.g.,
              <code>machine_learning_workspace_resource_test.go</code>) covering
              basic, complete, requires-import, and update scenarios.
            </li>
            <li>
              • Update <code>website/docs/r/</code> with the new resource doc
              and add a changelog entry.
            </li>
            <li>
              • PR checklist: acctest output, API version, docs + changelog
              linked in the description.
            </li>
          </ul>
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-100">
            Run{" "}
            <code>
              make acctests SERVICE='machinelearning'
              TESTARGS='-run=TestAccMachineLearningWorkspace_'
            </code>{" "}
            once registration compiles to prove the flow end-to-end.
          </div>
          <pre className="overflow-auto rounded-xl bg-slate-950/75 p-4 text-xs text-[var(--muted)]">
            {`// internal/provider/services.go
func (p *Provider) typedServiceRegistrations() []sdk.TypedServiceRegistration {
  return []sdk.TypedServiceRegistration{
    machinelearning.Registration{},
    // ...other services
  }
}
`}
          </pre>
        </FadeIn>
      </div>
    </div>
  );
}

function TestingSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Testing Strategy</h2>
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-2">
        <FadeIn delay={0.2} className={`${surfaceCard} space-y-3`}>
          <span className={subtlePill}>Unit & Integration</span>
          <ul className={mutedList}>
            <li>
              • <code>go test ./...</code> should pass before pushing.
            </li>
            <li>
              • Use table-driven tests for helper functions (flatten/expand,
              validation).
            </li>
            <li>
              • Mock Azure responses sparingly—prefer real acceptance coverage.
            </li>
          </ul>
          <div className="rounded-xl border border-sky-400/30 bg-sky-500/10 px-4 py-3 text-xs text-sky-100">
            Add <code>TF_ACC=1</code> only when running acceptance tests to
            avoid accidental resource creation.
          </div>
        </FadeIn>
        <FadeIn delay={0.35} className={`${surfaceCard} space-y-3`}>
          <span className={subtlePill}>Acceptance Tests</span>
          <ul className={mutedList}>
            <li>
              • Run targeted:{" "}
              <code>
                make acctests SERVICE=keyvault TESTARGS='-run
                TestAccKeyVaultVault_basic'
              </code>
              .
            </li>
            <li>
              • Tag resources (e.g., <code>environment=tf-acceptance</code>) for
              easy cleanup.
            </li>
            <li>• Capture output or screenshot to attach in PR.</li>
            <li>• Tear down promptly—use cheaper SKUs/off-peak hours.</li>
          </ul>
        </FadeIn>
      </div>
    </div>
  );
}

function DocumentationSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Docs & Changelog Matter</h2>
        <p className="mt-3 text-sm text-[var(--muted)] max-w-3xl mx-auto">
          Every resource ships with docs and a changelog note—without them users
          can’t discover the feature and maintainers can’t publish a release.
        </p>
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-[1fr,1fr]">
        <FadeIn delay={0.2} className={`${surfaceCard} space-y-4`}>
          <span className={subtlePill}>Ship the Docs</span>
          <ul className={mutedList}>
            <li>
              • Add <code>website/docs/r/&lt;resource&gt;.html.markdown</code>{" "}
              with example usage, arguments, and attributes.
            </li>
            <li>
              • Mention defaults, timeouts, and any Azure quirks users must know
              before deploying.
            </li>
            <li>
              • Build locally with <code>make website</code> to catch formatting
              issues before review.
            </li>
          </ul>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70">
            Documentation is the contract users read—if it’s missing, the
            feature might as well not exist.
          </div>
        </FadeIn>
        <FadeIn delay={0.35} className={`${surfaceCard} space-y-4`}>
          <span className={subtlePill}>Log the Change</span>
          <ul className={mutedList}>
            <li>
              • Update <code>CHANGELOG.md</code> under{" "}
              <code>## Unreleased</code> in the Enhancements section.
            </li>
            <li>
              • Use concise language: include resource name, new capability, and
              issue link.
            </li>
            <li>
              • Releases are built from this file—missing entries delay delivery
              to Terraform users.
            </li>
          </ul>
          <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-100">
            Maintainers routinely pause reviews until docs + changelog land—save
            a back-and-forth by doing it up front.
          </div>
        </FadeIn>
      </div>
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
          <h2 className="text-6xl font-extrabold bg-gradient-to-r from-sky-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Q&A / Next Steps
          </h2>
          <p className="text-lg text-[var(--muted)]">
            Pick an issue, draft your plan, and start coding!
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-1 text-left text-sm text-[var(--muted)]">
          <div className="surface rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold text-white/80 mb-2">
              Conversation Starters
            </h3>
            <ul className="space-y-1.5">
              <li>• Need help scoping your first issue?</li>
              <li>• Unsure how to run acceptance tests safely?</li>
              <li>• Curious about Azure API versioning best practices?</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const slideMap: Record<string, React.ReactNode> = {
  title: <TitleSlide />,
  "dev-experience": <DevExperienceSlide />,
  "why-contribute": <WhyContributeSlide />,
  "provider-architecture": <ProviderArchitectureSlide />,
  "tooling-setup": <ToolingSetupSlide />,
  "issue-triage": <IssueTriageSlide />,
  "resource-schema": <ResourceSchemaSlide />,
  "resource-crud": <ResourceCRUDSlide />,
  "resource-registration": <ResourceRegistrationSlide />,
  testing: <TestingSlide />,
  documentation: <DocumentationSlide />,
  qa: <QASlide />,
};

export default function AzureRMContribDeck({ slide }: DeckComponentProps) {
  const content = slideMap[slide.id] ?? (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold">{slide.id}</h2>
        <p className="mt-2 text-[var(--muted)]">
          Slide content coming soon—would love your contribution!
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
