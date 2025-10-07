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
      "Set the tone: this is a contributor-centric walkthrough—less theory, more hands-on workflow.",
      "Remind the audience AzureRM is HashiCorp’s fastest-moving provider with weekly releases.",
      "Point to the stats row as proof of impact: contributions land quickly and ship to millions of Terraform runs.",
      "Preview what is ahead: architecture tour, tooling setup, implementation playbook, PR etiquette, and community support.",
    ],
  },
  {
    id: "why-contribute",
    transition: "slide",
    speakerNotes: [
      "Frame the three pillars: velocity, reliability, reputation.",
      "Mention that Infra teams often wait on features—community PRs can shorten that gap dramatically.",
      "Call attention to the impact metrics on the right, encouraging attendees to imagine their service going GA faster.",
      "Transition by noting we’ll now peek under the hood to understand how the provider is structured.",
    ],
  },
  {
    id: "provider-architecture",
    transition: "fade",
    speakerNotes: [
      "Use the diagram to explain flow: Terraform Core -> Provider -> Azure SDK -> Azure APIs.",
      "Highlight the dual layers: schema/CRUD definitions, and service-specific packages with helpers.",
      "Explain that idempotence is achieved by flattening Azure responses back into Terraform state.",
      "Stress the importance of diagnostics—rich errors make Terraform workflows human-friendly.",
    ],
  },
  {
    id: "repo-overview",
    transition: "slide",
    speakerNotes: [
      "Surface the major directories and what work happens there.",
      "Encourage bookmarking CONTRIBUTING.md and website docs for quick reference.",
      "Call out the automation folder: scripts used in CI will also help locally.",
      "Invite attendees to spend 10 minutes exploring the repo after this session—it shortens ramp-up time.",
    ],
  },
  {
    id: "tooling-setup",
    transition: "slide",
    speakerNotes: [
      "Walk step-by-step through prerequisites; emphasize Azure credentials with sufficient rights.",
      "Encourage using isolated subscriptions/resource groups to keep Terraform state clean.",
      "Mention pre-commit hooks keep formatting and linting consistent with maintainers’ expectations.",
      "Reassure contributors the tooling script handles most installs—less yak shaving.",
    ],
  },
  {
    id: "issue-triage",
    transition: "slide",
    speakerNotes: [
      "Explain the importance of aligning with maintainers before coding—avoid duplicating work.",
      "Run through discovery habits: read recent discussions, check if Azure API already supports the feature.",
      "Call out the decision log section for recording assumptions and API quirks.",
      "Promote the idea of tiny design notes in the linked issue; reviewers love context.",
    ],
  },
  {
    id: "implementing",
    transition: "slide",
    speakerNotes: [
      "Break down the resource template in the code snippet: schema, CRUD, helper usage.",
      "Encourage reusing existing expand/flatten utilities—less custom code, fewer bugs.",
      "Point at the callouts on validation, timeouts, and partial state—they’re common review comments.",
      "Remind everyone to cover importers early; it’s cheaper to build with import support from the start.",
    ],
  },
  {
    id: "testing",
    transition: "slide",
    speakerNotes: [
      "Stress running go test before acceptance tests—fast feedback on helper logic.",
      "Explain how to scope acceptance tests narrowly using TESTARGS to save time and cost.",
      "Mention logging: TF_LOG=DEBUG can help trace Azure API calls when diagnosing issues.",
      "Reinforce the checklist: tag resources for cleanup, note quotas, handle retries.",
    ],
  },
  {
    id: "documentation",
    transition: "slide",
    speakerNotes: [
      "Docs ship with the code; users depend on website docs to understand arguments.",
      "Describe the doc skeleton shown; encourage using consistent tone and structure.",
      "Remind them to update examples folder when adding complex features.",
      "Highlight the changelog callout—maintainers may block PRs missing this entry.",
    ],
  },
  {
    id: "pull-request",
    transition: "slide",
    speakerNotes: [
      "Use the checklist to walk through PR readiness—tests, docs, changelog, lint.",
      "Explain that screenshots/log snippets in the PR description build reviewer confidence.",
      "Point out maintainers value small, focused PRs with clear test instructions.",
      "Mention review cadence: respond within a couple of business days to keep momentum.",
    ],
  },
  {
    id: "community",
    transition: "slide",
    speakerNotes: [
      "Encourage joining Slack and community calls—the best place to ask nuanced questions.",
      "Mention following release notes helps anticipate upcoming work (deprecations, new services).",
      "Promote knowledge sharing: blog posts or internal docs boost team adoption of Terraform.",
      "Invite attendees to mentor new contributors once they land their first PR—grow the ecosystem.",
    ],
  },
  {
    id: "qa",
    transition: "fade",
    speakerNotes: [
      "Open the floor; prompt with seed questions if the audience hesitates.",
      "Offer to do a live issue triage or PR review if time permits.",
      "Point to follow-up resources with QR code/links for self-serve learning.",
      "Close by celebrating first contributions—they matter to thousands of Terraform users.",
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
              title: "Accelerate Azure Adoption",
              tone: "sky",
              bullets: [
                "Ship missing GA features weeks faster than official roadmap",
                "Unlock internal teams blocked on Terraform parity",
              ],
            },
            {
              title: "Harden Infrastructure",
              tone: "emerald",
              bullets: [
                "Fix perpetual diffs by improving schema/state mapping",
                "Expand regional & SKU support for mission-critical services",
              ],
            },
            {
              title: "Grow Expertise",
              tone: "violet",
              bullets: [
                "Deepen knowledge of Azure REST + Terraform Plugin SDK",
                "Earn trust with HashiCorp maintainers for future fast-tracks",
              ],
            },
            {
              title: "Amplify Community",
              tone: "amber",
              bullets: [
                "Document learnings to support other platform teams",
                "Shape roadmap by opening issues & design discussions",
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
              Every merged PR ships in the next weekly release and is consumed
              by thousands of pipelines within days.
            </p>
            <p>
              Contributors gain visibility with Azure service teams eager to see
              their APIs lit up in Terraform.
            </p>
            <p className="text-xs text-white/70">
              Bonus: first-time contributors are often invited to HashiCorp
              community spotlights—great for your professional profile.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

function ProviderArchitectureSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Provider Architecture at a Glance</h2>
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-2">
        <FadeIn delay={0.2} className={`${surfaceCard} space-y-4`}>
          <span className={subtlePill}>Execution Flow</span>
          <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-[var(--muted)]">
            <div className="grid gap-3">
              {[
                {
                  label: "Terraform Core",
                  detail: "Plans desired state & diff",
                },
                {
                  label: "AzureRM Provider",
                  detail: "Translates schema into Azure SDK requests",
                },
                {
                  label: "Azure SDK for Go",
                  detail: "Handles auth, retries, long-running operations",
                },
                {
                  label: "Azure Resource Manager",
                  detail:
                    "Applies configuration to subscriptions/resource groups",
                },
              ].map((node, index) => (
                <div key={node.label} className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full border border-white/15 bg-white/5 text-xs font-semibold text-white/80 flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {node.label}
                    </div>
                    <div>{node.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.35} className={`${surfaceCard} space-y-4`}>
          <span className={subtlePill}>Code Anatomy</span>
          <ul className={mutedList}>
            <li>
              • <strong>Schema</strong>: Defines arguments, computed fields,
              validations, defaults.
            </li>
            <li>
              • <strong>Expand</strong>/<strong>Flatten</strong>: Convert
              between Terraform schema structs and Azure API payloads.
            </li>
            <li>
              • <strong>CRUD Handlers</strong>: Create/Read/Update/Delete with
              Azure SDK, including pollers for async operations.
            </li>
            <li>
              • <strong>Diagnostics</strong>: User-friendly error messages,
              warnings, partial state handling.
            </li>
            <li>
              • <strong>Feature Flags</strong>: Toggle preview resources via
              <code>internal/features</code>.
            </li>
          </ul>
          <div className="text-xs text-white/70">
            Tip: Keep functions small and composable—maintainers prefer reusable
            helpers over copy/paste.
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

function RepoOverviewSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Repository Field Guide</h2>
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Provider Core",
            tone: "sky",
            items: [
              "<code>provider.go</code> → authentication, Azure client init",
              "<code>config/</code> → environment & feature flags",
              "<code>resource_*.go</code> → top-level CRUD entrypoints",
            ],
          },
          {
            title: "Service Packages",
            tone: "emerald",
            items: [
              "<code>internal/services/network</code> → VNets, firewalls, WAN",
              "<code>internal/services/containers</code> → AKS, container apps",
              "<code>internal/services/appplatform</code> → Spring Apps, Functions",
            ],
          },
          {
            title: "Docs & Automation",
            tone: "violet",
            items: [
              "<code>website/docs/</code> → provider documentation",
              "<code>.github/workflows/</code> → linting & testing pipelines",
              "<code>scripts/</code> → tooling for docs, changelog, releases",
            ],
          },
        ].map((column, index) => (
          <FadeIn
            key={column.title}
            delay={0.2 + index * 0.1}
            className={`${surfaceCard} border-${column.tone}-400/30 bg-${column.tone}-500/10`}
          >
            <h3 className={`text-lg font-semibold text-${column.tone}-100`}>
              {column.title}
            </h3>
            <ul className="space-y-2 text-sm text-[var(--muted)] leading-relaxed">
              {column.items.map((item) => (
                <li
                  key={item}
                  dangerouslySetInnerHTML={{ __html: `• ${item}` }}
                />
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.6} className="mt-6 text-center text-xs text-white/70">
        Pro tip: run <code>go list ./...</code> to explore package boundaries
        and dependency graph.
      </FadeIn>
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
      </div>
    </div>
  );
}

function ImplementingSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Implementation Patterns</h2>
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <FadeIn delay={0.2} className={`${surfaceCard} space-y-4`}>
          <span className={subtlePill}>Resource Blueprint</span>
          <pre className="overflow-auto rounded-xl bg-slate-950/75 p-4 text-xs text-[var(--muted)]">
            {`func resourceFoo() *pluginsdk.Resource {
  return &pluginsdk.Resource{
    Schema: schemaFoo(),
    Create: resourceFooCreate,
    Read:   resourceFooRead,
    Update: resourceFooUpdate,
    Delete: resourceFooDelete,
    CustomizeDiff: addPlanValidation,
    Timeouts: &pluginsdk.ResourceTimeout{
      Create: pluginsdk.DefaultTimeout(1 * time.Hour),
    },
  }
}`}
          </pre>
          <div className="text-xs text-white/70">
            Keep helpers in <code>internal/services/&lt;service&gt;</code>;
            avoid inline logic for large blocks.
          </div>
        </FadeIn>
        <FadeIn delay={0.35} className={`${surfaceCard} space-y-4`}>
          <span className={subtlePill}>Reviewer Checklist</span>
          <ul className={mutedList}>
            <li>
              • Validation: lengths, casing, allowed values, mutual exclusivity.
            </li>
            <li>• Timeout + retry for long-running operations.</li>
            <li>
              • Importer: implement{" "}
              <code>Importer: pluginsdk.ImporterValidatingResourceId()</code>.
            </li>
            <li>
              • Partial state: guard against failures after create but before
              read.
            </li>
            <li>
              • Expand/flatten parity: ensure set + read path produce identical
              models.
            </li>
          </ul>
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
        <h2 className={gradientTitle}>Documentation & Changelog</h2>
      </FadeIn>
      <div className={`${surfaceCard} space-y-5`}>
        <div className="grid gap-6 md:grid-cols-2">
          <FadeIn delay={0.2} className="space-y-3">
            <span className={subtlePill}>Docs Template</span>
            <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4 text-xs text-[var(--muted)]">
              {`---
subcategory: ""
layout: azurerm
page_title: "azurerm_resource"
description: "Manages ..."
---

# Example Usage
resource "azurerm_resource" "example" {
  name = "example"
}

# Argument Reference
- \`name\` (Required) ...

# Attributes Reference
- \`id\` - ...
`}
            </div>
          </FadeIn>
          <FadeIn delay={0.35} className="space-y-3">
            <span className={subtlePill}>Changelog Etiquette</span>
            <ul className={mutedList}>
              <li>
                • Append under <code>## Unreleased</code> → Enhancement or Bug
                Fix.
              </li>
              <li>• Include resource/data source names and issue numbers.</li>
              <li>• Keep entry concise; details belong in PR description.</li>
            </ul>
            <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-100">
              Missing docs or changelog is the #1 reason PRs get
              blocked—double-check before requesting review.
            </div>
          </FadeIn>
        </div>
        <div className="text-xs text-white/70">
          Run <code>make docs</code> and <code>make website</code> locally to
          confirm formatting before pushing updates.
        </div>
      </div>
    </div>
  );
}

function PullRequestSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Pull Request Checklist</h2>
      </FadeIn>
      <div className="grid gap-6 lg:grid-cols-[1fr,0.8fr]">
        <FadeIn delay={0.2} className={`${surfaceCard} space-y-3`}>
          <ul className={mutedList}>
            <li>
              ✅ Tests passing: <code>make fmt lint test</code> and targeted
              acceptance runs.
            </li>
            <li>✅ Docs updated + changelog entry added.</li>
            <li>
              ✅ PR description includes: issue link, Azure API version, test
              evidence, breaking change call-outs.
            </li>
            <li>
              ✅ DCO sign-off if your org requires it (
              <code>git commit -s</code>).
            </li>
            <li>✅ Mention feature flag if resource is preview-only.</li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className={`${surfaceCard} space-y-3`}>
          <span className={subtlePill}>Reviewer Expectations</span>
          <ul className={mutedList}>
            <li>• Small, focused PRs merge faster than mega-features.</li>
            <li>
              • Be responsive; reviewers appreciate follow-up within 2 business
              days.
            </li>
            <li>
              • Ready to iterate—maintainers may ask for additional tests or
              schema tweaks.
            </li>
            <li>
              • Celebrate! Share the release note once merged to highlight
              impact.
            </li>
          </ul>
        </FadeIn>
      </div>
    </div>
  );
}

function CommunitySlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeIn className="mb-8 text-center">
        <h2 className={gradientTitle}>Stay Connected</h2>
      </FadeIn>
      <div className="grid gap-6 md:grid-cols-2">
        <FadeIn delay={0.2} className={`${surfaceCard} space-y-3`}>
          <span className={subtlePill}>Support Channels</span>
          <ul className={mutedList}>
            <li>
              • HashiCorp Community Forum → tag with{" "}
              <code>terraform-provider-azurerm</code>.
            </li>
            <li>
              • Slack → #terraform-providers, #terraform-azurerm for async help.
            </li>
            <li>
              • Office hours → regular maintainer Q&A sessions (check repo
              README).
            </li>
            <li>• Azure REST API changelog → track breaking changes early.</li>
          </ul>
        </FadeIn>
        <FadeIn delay={0.35} className={`${surfaceCard} space-y-3`}>
          <span className={subtlePill}>Give Back</span>
          <ul className={mutedList}>
            <li>• Share your setup via blog posts or internal tech talks.</li>
            <li>• Pair with new contributors to review first PRs.</li>
            <li>• Keep an eye on release notes to celebrate shipped work.</li>
            <li>• Propose features via discussions to influence roadmap.</li>
          </ul>
          <div className="text-xs text-white/70">
            The provider thrives when contributors mentor others—your experience
            today becomes someone else’s fast track tomorrow.
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
            Pick an issue, draft your plan, and let the maintainers help you
            ship it. What’s standing between you and your first PR?
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 text-left text-sm text-[var(--muted)]">
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
          <div className="surface rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold text-white/80 mb-2">
              Takeaway Links
            </h3>
            <ul className="space-y-1.5">
              <li>• CONTRIBUTING.md & issue templates</li>
              <li>• Example PRs with great test evidence</li>
              <li>• Release notes & roadmap discussions</li>
            </ul>
          </div>
        </div>
        <div className="text-xs text-white/60">
          Stay in touch: GitHub @hashicorp/terraform-provider-azurerm · Slack
          #terraform-azurerm · Office hours calendar in README
        </div>
      </motion.div>
    </div>
  );
}

const slideMap: Record<string, React.ReactNode> = {
  title: <TitleSlide />,
  "why-contribute": <WhyContributeSlide />,
  "provider-architecture": <ProviderArchitectureSlide />,
  "repo-overview": <RepoOverviewSlide />,
  "tooling-setup": <ToolingSetupSlide />,
  "issue-triage": <IssueTriageSlide />,
  implementing: <ImplementingSlide />,
  testing: <TestingSlide />,
  documentation: <DocumentationSlide />,
  "pull-request": <PullRequestSlide />,
  community: <CommunitySlide />,
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
