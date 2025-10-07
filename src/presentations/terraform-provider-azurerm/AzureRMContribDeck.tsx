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
      "Now we start the hands-on portion with a typed resource example for a resource group. Create internal/services/resource/resource_group_example_resource.go and declare the empty struct that will satisfy sdk.Resource.",
      "Mirror the Terraform schema in a Go model with tfschema tags, order arguments with identifier pieces first, then location, then required and optional fields.",
      "Expose Arguments, Attributes, ModelObject, ResourceType, and IDValidationFunc -- once those compile we have the skeleton that Terraform will interrogate for schema and ID rules.",
    ],
  },
  {
    id: "resource-crud",
    transition: "slide",
    speakerNotes: [
      "With the schema locked in, wire up the lifecycle. In Create, decode the config, build the ID with resources.NewResourceGroupID, check for an existing resource to avoid adoption, and call CreateOrUpdate before setting the ID in state.",
      "Read parses the ID from state, fetches the resource, normalizes fields like location, and encodes the model back so plans stay accurate. Update mirrors Create but reuses the existing ID and only touches fields that changed.",
      "Delete leans on DeleteThenPoll to handle Azure long-running operations; when the SDK lacks that helper, drop in a custom poller, but this pattern covers most ARM endpoints.",
    ],
  },
  {
    id: "resource-registration",
    transition: "slide",
    speakerNotes: [
      "Once the resource compiles, register it with the service package. Implement the Registration struct so it satisfies sdk.TypedServiceRegistration, return the new resource in Resources, and add the registration to internal/provider/services.go.",
      "Ship acceptance tests alongside the code covering basic, complete, requires-import, and update scenarios, so reviewers see end-to-end proof.",
      "Finish by updating the website docs, adding a changelog entry under Unreleased, and capturing test evidence; that trifecta keeps releases unblocked and gives maintainers confidence to merge.",
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
        className="mt-12 grid gap-4 text-left sm:grid-cols-3"
      >
        {[
          { label: "Merged PRs", value: "6.4k+", tone: "sky" },
          { label: "Resources", value: "430+", tone: "emerald" },
          { label: "Releases", value: "weekly", tone: "violet" },
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
          Typed resources start with a Go struct, a Terraform model, and schema
          functions that wire configuration into the SDK.
        </p>
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <FadeIn delay={0.2} className={`${surfaceCard} space-y-3`}>
          <span className={subtlePill}>File Scaffold</span>
          <ul className={mutedList}>
            <li>
              • Create{" "}
              <code>
                internal/services/resource/resource_group_example_resource.go
              </code>{" "}
              and declare the empty struct.
            </li>
            <li>
              • Model struct mirrors schema fields using <code>tfschema</code>{" "}
              tags.
            </li>
            <li>
              • Order arguments: ID parts → <code>location</code> → required →
              optional.
            </li>
            <li>
              • Use shared helpers (e.g., <code>commonschema.Location()</code>)
              to match other resources.
            </li>
            <li>
              • Let the compiler drive the todo list—implement each{" "}
              <code>sdk.Resource</code> method as Go complains about it.
            </li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className={`${surfaceCard} space-y-4`}>
          <span className={subtlePill}>Schema & Model</span>
          <pre className="overflow-auto rounded-xl bg-slate-950/75 p-4 text-xs text-[var(--muted)]">
            {`type ResourceGroupExampleResource struct{}

type ResourceGroupExampleResourceModel struct {
  Name     string            \`tfschema:"name"\`
  Location string            \`tfschema:"location"\`
  Tags     map[string]string \`tfschema:"tags"\`
}

func (ResourceGroupExampleResource) Arguments() map[string]*pluginsdk.Schema {
  return map[string]*pluginsdk.Schema{
    "name": {
      Type:         pluginsdk.TypeString,
      Required:     true,
      ValidateFunc: validation.StringIsNotEmpty,
    },
    "location": commonschema.Location(),
    "tags":     commonschema.Tags(),
  }
}

func (ResourceGroupExampleResource) Attributes() map[string]*pluginsdk.Schema {
  return map[string]*pluginsdk.Schema{}
}

func (ResourceGroupExampleResource) ModelObject() interface{} {
  return &ResourceGroupExampleResourceModel{}
}

func (ResourceGroupExampleResource) ResourceType() string {
  return "azurerm_resource_group_example"
}

func (ResourceGroupExampleResource) IDValidationFunc() pluginsdk.SchemaValidateFunc {
  return resources.ValidateResourceGroupID
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
              • Create: decode config, build ID via{" "}
              <code>resources.NewResourceGroupID</code>, guard with{" "}
              <code>ResourceRequiresImport</code>, then create.
            </li>
            <li>
              • Update: parse ID, decode config, patch only changed fields (tags
              in this case) using <code>CreateOrUpdate</code>.
            </li>
            <li>
              • Read: parse the ID, fetch with <code>client.Get</code>,
              normalize fields, then <code>metadata.Encode</code>.
            </li>
            <li>
              • Delete: <code>DeleteThenPoll</code> handles long-running Azure
              deletes safely.
            </li>
          </ul>
          <div className="text-xs text-white/70">
            Return <code>sdk.ResourceFunc</code> with generous timeouts so users
            can override them in Terraform configuration.
          </div>
        </FadeIn>
        <FadeIn delay={0.35} className={`${surfaceCard} space-y-4`}>
          <span className={subtlePill}>Create & Read Highlights</span>
          <pre className="overflow-auto rounded-xl bg-slate-950/75 p-4 text-xs text-[var(--muted)]">
            {`func (r ResourceGroupExampleResource) Create() sdk.ResourceFunc {
  return sdk.ResourceFunc{
    Timeout: 30 * time.Minute,
    Func: func(ctx context.Context, metadata sdk.ResourceMetaData) error {
      client := metadata.Client.Resource.GroupsClient
      var config ResourceGroupExampleResourceModel
      if err := metadata.Decode(&config); err != nil {
        return fmt.Errorf("decoding: %+v", err)
      }
      id := resources.NewResourceGroupID(
        metadata.Client.Account.SubscriptionId,
        config.Name,
      )

      existing, err := client.Get(ctx, id)
      if err != nil && !response.WasNotFound(existing.HttpResponse) {
        return fmt.Errorf("checking %s: %+v", id, err)
      }
      if !response.WasNotFound(existing.HttpResponse) {
        return metadata.ResourceRequiresImport(r.ResourceType(), id)
      }

      param := resources.Group{
        Location: pointer.To(location.Normalize(config.Location)),
        Tags:     pointer.To(config.Tags),
      }
      if _, err := client.CreateOrUpdate(ctx, id, param); err != nil {
        return fmt.Errorf("creating %s: %+v", id, err)
      }

      metadata.SetID(id)
      return nil
    },
  }
}

func (ResourceGroupExampleResource) Read() sdk.ResourceFunc {
  return sdk.ResourceFunc{
    Timeout: 5 * time.Minute,
    Func: func(ctx context.Context, metadata sdk.ResourceMetaData) error {
      client := metadata.Client.Resource.GroupsClient
      id, err := resources.ParseResourceGroupID(metadata.ResourceData.Id())
      if err != nil {
        return err
      }

      resp, err := client.Get(ctx, *id)
      if err != nil {
        if response.WasNotFound(resp.HttpResponse) {
          return metadata.MarkAsGone(id)
        }
        return fmt.Errorf("retrieving %s: %+v", id, err)
      }

      state := ResourceGroupExampleResourceModel{
        Name: id.ResourceGroupName,
      }
      if model := resp.Model; model != nil {
        state.Location = location.NormalizeNilable(model.Location)
        state.Tags = pointer.From(model.Tags)
      }
      return metadata.Encode(&state)
    },
  }
}`}
          </pre>
          <pre className="overflow-auto rounded-xl bg-slate-950/75 p-4 text-xs text-[var(--muted)]">
            {`func (r ResourceGroupExampleResource) Update() sdk.ResourceFunc {
  return sdk.ResourceFunc{
    Timeout: 30 * time.Minute,
    Func: func(ctx context.Context, metadata sdk.ResourceMetaData) error {
      client := metadata.Client.Resource.GroupsClient

      id, err := resources.ParseResourceGroupID(metadata.ResourceData.Id())
      if err != nil {
        return err
      }

      var config ResourceGroupExampleResourceModel
      if err := metadata.Decode(&config); err != nil {
        return fmt.Errorf("decoding: %+v", err)
      }

      param := resources.Group{
        Location: pointer.To(location.Normalize(config.Location)),
        Tags:     pointer.To(config.Tags),
      }
      if _, err := client.CreateOrUpdate(ctx, *id, param); err != nil {
        return fmt.Errorf("updating %s: %+v", *id, err)
      }
      return nil
    },
  }
}

func (ResourceGroupExampleResource) Delete() sdk.ResourceFunc {
  return sdk.ResourceFunc{
    Timeout: 30 * time.Minute,
    Func: func(ctx context.Context, metadata sdk.ResourceMetaData) error {
      client := metadata.Client.Resource.GroupsClient
      id, err := resources.ParseResourceGroupID(metadata.ResourceData.Id())
      if err != nil {
        return err
      }
      if err := client.DeleteThenPoll(
        ctx,
        *id,
        resources.DefaultDeleteOperationOptions(),
      ); err != nil {
        return fmt.Errorf("deleting %s: %+v", *id, err)
      }
      return nil
    },
  }
}`}
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
            {`var _ sdk.TypedServiceRegistration = Registration{}

type Registration struct{}

func (Registration) Name() string {
  return "Resource"
}

func (Registration) Resources() []sdk.Resource {
  return []sdk.Resource{
    ResourceGroupExampleResource{},
  }
}

func (Registration) DataSources() []sdk.DataSource {
  return []sdk.DataSource{}
}

func (Registration) WebsiteCategories() []string {
  return []string{"Resource"}
}`}
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
              <code>resource_group_example_resource_test.go</code>) covering
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
              make acctests SERVICE='resource'
              TESTARGS='-run=TestAccResourceGroupExample_'
            </code>{" "}
            once registration compiles to prove the flow end-to-end.
          </div>
          <pre className="overflow-auto rounded-xl bg-slate-950/75 p-4 text-xs text-[var(--muted)]">
            {`// internal/provider/services.go
func (p *Provider) typedServiceRegistrations() []sdk.TypedServiceRegistration {
  return []sdk.TypedServiceRegistration{
    resource.Registration{},
    // ...other services
  }
}`}
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
