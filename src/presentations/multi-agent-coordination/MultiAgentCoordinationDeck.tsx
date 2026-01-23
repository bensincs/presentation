import React from "react";
import { motion } from "framer-motion";
import type { DeckComponentProps, SlideMeta } from "../../types";

const gradientTitle =
  "text-5xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-500 bg-clip-text text-transparent pb-1";
const surface =
  "surface rounded-2xl border border-white/5 bg-white/5 px-6 py-5 shadow-lg shadow-black/20";
const mutedText = "text-sm text-[var(--muted)] leading-relaxed";
const pill =
  "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/70";

export const multiAgentCoordinationSlides: SlideMeta[] = [
  {
    id: "title",
    transition: "fade",
    speakerNotes: [
      "Open by framing the problem: multi-agent systems are powerful but coordination is hard.",
      "Mention that we'll cover three patterns that go beyond common approaches like handoffs and hierarchies.",
      "Set expectations: these are architectural patterns, not framework-specific solutions.",
    ],
  },
  {
    id: "the-problem",
    transition: "slide",
    speakerNotes: [
      "Explain that in multi-agent systems, someone has to decide what context each agent gets.",
      "Walk through common approaches: handoffs (whole context), agents-as-tools (orchestrator decides), custom pro-code (works if you're in one framework).",
      "The key issue: the calling agent often doesn't understand what's relevant to each specialist.",
    ],
  },
  {
    id: "three-challenges",
    transition: "slide",
    speakerNotes: [
      "Framework lock-in: agents built in different frameworks can't easily communicate.",
      "Deployment silos: agents across on-prem, Kubernetes, and serverless struggle to coordinate.",
      "Human illegibility: internal agent chatter quickly becomes noise that humans can't follow.",
    ],
  },
  {
    id: "the-insight",
    transition: "scale",
    speakerNotes: [
      "The key insight: flip from push to pull model.",
      "Instead of orchestrators pushing context, agents subscribe to what they care about.",
      "This makes relevance decided by the agent, not an orchestrator that doesn't understand domains.",
    ],
  },
  {
    id: "three-patterns",
    transition: "slide",
    speakerNotes: [
      "Introduce the three patterns we'll cover in detail.",
      "Pub/Sub for context selection, protocol-based coordination, and mic grants for moderation.",
      "These work together to create a complete coordination infrastructure.",
    ],
  },
  {
    id: "pubsub-pattern",
    transition: "slide",
    speakerNotes: [
      "First pattern: Pub/Sub for context selection.",
      "All events come to a shared inbox — agents decide based on content what to ignore.",
      "Example: payroll agent sees all messages but only acts on compensation-related content.",
    ],
  },
  {
    id: "pubsub-why",
    transition: "slide",
    speakerNotes: [
      "Why this works: domain experts (agents) know better what they need than generalist orchestrators.",
      "Push model requires orchestrator to understand all domains; pull model decouples this.",
      "Adding new agents is simple: just subscribe to relevant topics.",
    ],
  },
  {
    id: "protocol-pattern",
    transition: "slide",
    speakerNotes: [
      "Second pattern: protocol-based coordination.",
      "The schema is the contract, not the framework.",
      "This enables agents built with LangChain to talk to AutoGen, CrewAI, or custom code.",
    ],
  },
  {
    id: "protocol-schema",
    transition: "slide",
    speakerNotes: [
      "Show what the message schema looks like in practice.",
      "Discuss transport options: MQTT, NATS, Redis pub/sub, UDP multicast.",
      "The framework becomes an implementation detail.",
    ],
  },
  {
    id: "mic-grants-problem",
    transition: "up",
    speakerNotes: [
      "Third pattern: mic grants for moderation.",
      "Prompt-based control ('please only respond when asked') is easily ignored.",
      "Prompt engineering is not a control plane.",
    ],
  },
  {
    id: "mic-grants-structure",
    transition: "slide",
    speakerNotes: [
      "What mic grants look like: explicit, time-boxed, enforceable permissions.",
      "Specifies which agent can speak, for which task, allowed message types, limits, expiry.",
      "This is architectural enforcement, not trust-based.",
    ],
  },
  {
    id: "mic-grants-gateway",
    transition: "slide",
    speakerNotes: [
      "The gateway is deterministic code, no AI involved.",
      "Checks valid grant, allowed type, under limit, not expired.",
      "Agents cannot bypass the gateway—enforced by topic ACLs, not trust.",
    ],
  },
  {
    id: "mic-grants-comparison",
    transition: "slide",
    speakerNotes: [
      "Compare prompt discipline vs architectural enforcement.",
      "Trust the code, not the model.",
      "Failures are loud and logged, not silent.",
    ],
  },
  {
    id: "why-matters",
    transition: "slide",
    speakerNotes: [
      "Summarize why these patterns matter for production multi-agent systems.",
      "Clear ownership, observable conversations, gateway-enforced moderation.",
      "Protocol-based interoperability, location-independent coordination.",
    ],
  },
  {
    id: "mental-model",
    transition: "scale",
    speakerNotes: [
      "The mental model: ChatOps for AI agents with enforced moderation and humans in the loop.",
      "Agents act like a team, humans stay in control, infrastructure enforces the rules.",
    ],
  },
  {
    id: "prototype",
    transition: "slide",
    speakerNotes: [
      "Point to the Agent Ops Room prototype on GitHub.",
      "Built with Rust and MQTT, demonstrates all three patterns.",
      "Encourage folks to explore and contribute.",
    ],
  },
  {
    id: "questions",
    transition: "fade",
    speakerNotes: [
      "Open the floor for questions.",
      "Recap the three patterns one more time.",
      "Architecture over prompts is the key takeaway.",
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
  return (
    <div className="h-full flex flex-col justify-center items-center text-center p-8">
      <motion.h1
        className="text-[clamp(36px,6vw,72px)] font-extrabold bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-500 bg-clip-text text-transparent leading-tight"
        initial={{ opacity: 0, scale: 0.88, y: -24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Coordination Patterns for Multi-Agent Systems
      </motion.h1>
      <FadeInUp
        delay={0.25}
        className="text-2xl text-[var(--muted)] max-w-3xl tracking-tight mt-4"
      >
        Beyond Handoffs, Hierarchies, and Agent-as-Tool
      </FadeInUp>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {[
          "Pub/Sub",
          "Protocol-Based",
          "Mic Grants",
          "Architecture > Prompts",
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
        Three architectural patterns that give agents autonomy over context
        selection, enable framework-agnostic communication, and enforce
        moderation through deterministic code—not prompts.
      </FadeInUp>
    </div>
  );
}

function TheProblemSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>The Problem</h2>
        <p className="text-xl text-[var(--muted)] mt-2">
          Who Decides What Context Each Agent Gets?
        </p>
      </FadeInUp>
      <ScalePop
        delay={0.2}
        className={`${surface} max-w-4xl mx-auto space-y-6`}
      >
        <p className="text-lg text-white/90">
          In multi-agent systems,{" "}
          <span className="text-cyan-400 font-semibold">
            someone has to decide what context each agent receives
          </span>
          .
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: "🔀",
              title: "Handoffs",
              desc: "Whole context handed off to the next agent",
            },
            {
              icon: "🔧",
              title: "Agents-as-Tools",
              desc: "Orchestrating agent decides what context to give each sub-agent",
            },
            {
              icon: "💻",
              title: "Custom Pro-Code",
              desc: "Write around it in code — works if you're in one framework",
            },
          ].map((approach, i) => (
            <FadeInUp
              key={approach.title}
              delay={0.3 + i * 0.1}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <span className="text-2xl">{approach.icon}</span>
              <div className="mt-2 font-semibold text-white">
                {approach.title}
              </div>
              <p className={mutedText}>{approach.desc}</p>
            </FadeInUp>
          ))}
        </div>
        <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-4 mt-4">
          <span className="text-lg">⚠️</span>
          <span className="ml-2 text-rose-200 font-medium">
            The Issue: The calling agent or orchestrator often{" "}
            <strong>doesn't understand what's relevant</strong> to each
            specialist.
          </span>
        </div>
      </ScalePop>
    </div>
  );
}

function ThreeChallengesSlide() {
  const challenges = [
    {
      icon: "🔒",
      title: "Framework Lock-in",
      impact:
        "Agents built in different frameworks can't easily talk to each other",
      color: "amber",
    },
    {
      icon: "🏗️",
      title: "Deployment Silos",
      impact:
        "Agents across on-prem, Kubernetes, and serverless struggle to coordinate",
      color: "violet",
    },
    {
      icon: "👁️",
      title: "Human Illegibility",
      impact: "Internal agent chatter quickly becomes unreadable noise",
      color: "rose",
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>Three Compounding Challenges</h2>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
        {challenges.map((challenge, index) => (
          <ScalePop
            key={challenge.title}
            delay={0.2 + index * 0.12}
            className={`${surface} space-y-4`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{challenge.icon}</span>
              <span className="text-lg font-semibold text-white">
                {challenge.title}
              </span>
            </div>
            <p className={mutedText}>{challenge.impact}</p>
          </ScalePop>
        ))}
      </div>
      <FadeInUp delay={0.6} className="mt-8 text-center text-white/70 text-sm">
        These aren't just technical inconveniences — they limit what multi-agent
        systems can do.
      </FadeInUp>
    </div>
  );
}

function TheInsightSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>The Insight</h2>
        <p className="text-xl text-[var(--muted)] mt-2">Flip the Model</p>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
        <SlideInLeft delay={0.2} className={`${surface} space-y-4`}>
          <span className={pill}>Traditional Approach</span>
          <ul className={`${mutedText} space-y-3`}>
            <li className="flex items-start gap-2">
              <span className="text-rose-400">✗</span>
              Context <strong>pushed</strong> to agents
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400">✗</span>
              Framework-specific APIs
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400">✗</span>
              Tight coupling to orchestrator
            </li>
          </ul>
        </SlideInLeft>
        <SlideInRight
          delay={0.3}
          className={`${surface} space-y-4 border-cyan-400/30 bg-cyan-500/5`}
        >
          <span className={pill}>Alternative</span>
          <ul className={`${mutedText} space-y-3`}>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">✓</span>
              Agents <strong>subscribe</strong> to context they care about
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">✓</span>
              Shared protocol-based communication
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">✓</span>
              Broadcast mechanism works across any deployment
            </li>
          </ul>
        </SlideInRight>
      </div>
      <ScalePop delay={0.5} className="mt-8 text-center">
        <div className="inline-block rounded-xl border border-violet-400/40 bg-violet-500/15 px-6 py-3">
          <span className="text-lg font-semibold text-violet-200">
            Relevance is decided by the agent, not an orchestrator.
          </span>
        </div>
      </ScalePop>
    </div>
  );
}

function ThreePatternsSlide() {
  const patterns = [
    {
      num: "1",
      title: "Pub/Sub for Context Selection",
      icon: "📬",
      color: "cyan",
    },
    {
      num: "2",
      title: "Protocol-Based Coordination",
      icon: "🔌",
      color: "violet",
    },
    {
      num: "3",
      title: "Mic Grants for Moderation",
      icon: "🎤",
      color: "fuchsia",
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center items-center">
      <FadeInUp className="mb-10 text-center">
        <h2 className={gradientTitle}>Three Patterns</h2>
        <p className="text-xl text-[var(--muted)] mt-2">
          Solving Multi-Agent Coordination
        </p>
      </FadeInUp>
      <div className="grid gap-6 md:grid-cols-3 max-w-5xl">
        {patterns.map((pattern, index) => (
          <ScalePop
            key={pattern.title}
            delay={0.2 + index * 0.15}
            className={`${surface} text-center space-y-4 hover:border-white/20 transition-colors`}
          >
            <div className="text-4xl">{pattern.icon}</div>
            <div className="text-3xl font-bold text-white/30">
              {pattern.num}
            </div>
            <div className="text-lg font-semibold text-white">
              {pattern.title}
            </div>
          </ScalePop>
        ))}
      </div>
    </div>
  );
}

function PubSubPatternSlide() {
  const diagram = `                    ┌─────────────────────┐
                    │   Message Bus       │
                    │                     │
                    │  📧 All events      │
                    │     broadcast to    │
                    │     shared inbox    │
                    └─────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
     ┌──────────┐    ┌──────────┐    ┌──────────┐
     │ Payroll  │    │ Calendar │    │  Legal   │
     │  Agent   │    │  Agent   │    │  Agent   │
     │          │    │          │    │          │
     │ ignores: │    │ ignores: │    │ ignores: │
     │ non-comp │    │ non-cal  │    │ non-legal│
     └──────────┘    └──────────┘    └──────────┘`;

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-6 text-center">
        <span className={pill}>Pattern 1</span>
        <h2 className={`${gradientTitle} mt-2`}>
          Pub/Sub for Context Selection
        </h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          Let Agents Choose Their Own Context
        </p>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-2 max-w-6xl mx-auto">
        <SlideInLeft delay={0.2} className={`${surface} space-y-4`}>
          <div className="space-y-4">
            <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-4">
              <div className="font-semibold text-rose-200 mb-2">
                The Problem
              </div>
              <p className={mutedText}>
                Orchestrators push context to agents, but they often don't know
                what each specialist needs.
              </p>
            </div>
            <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4">
              <div className="font-semibold text-emerald-200 mb-2">
                The Pattern
              </div>
              <p className={mutedText}>
                All events come to a <strong>shared inbox</strong>. Each agent
                decides based on content what to act on and what to ignore.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <span className="text-sm text-white/60">Example:</span>
            <p className={`${mutedText} mt-1`}>
              A payroll agent sees all messages but only acts on
              compensation-related content, ignoring calendar updates entirely.
            </p>
          </div>
        </SlideInLeft>
        <SlideInRight delay={0.3} className={`${surface}`}>
          <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-cyan-200/90 overflow-auto whitespace-pre">
            {diagram}
          </pre>
        </SlideInRight>
      </div>
    </div>
  );
}

function PubSubWhySlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <span className={pill}>Pattern 1</span>
        <h2 className={`${gradientTitle} mt-2`}>Why It Works</h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          Decentralized Relevance Decisions
        </p>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
        <SlideInLeft delay={0.2} className={`${surface} space-y-4`}>
          <span className={pill}>Push Model</span>
          <ul className={`${mutedText} space-y-3`}>
            <li className="flex items-start gap-2">
              <span className="text-rose-400">✗</span>
              Orchestrator decides what's relevant
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400">✗</span>
              Orchestrator must understand all domains
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400">✗</span>
              Adding agents = updating orchestrator
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400">✗</span>
              Single point of failure
            </li>
          </ul>
        </SlideInLeft>
        <SlideInRight
          delay={0.3}
          className={`${surface} space-y-4 border-emerald-400/30 bg-emerald-500/5`}
        >
          <span className={pill}>Pull Model</span>
          <ul className={`${mutedText} space-y-3`}>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">✓</span>
              Agent decides what's relevant
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">✓</span>
              Each agent only knows its domain
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">✓</span>
              Adding agents = just subscribe
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">✓</span>
              Decoupled and resilient
            </li>
          </ul>
        </SlideInRight>
      </div>
      <ScalePop delay={0.5} className="mt-8 text-center">
        <div className="inline-block rounded-xl border border-cyan-400/40 bg-cyan-500/15 px-6 py-3">
          <span className="text-lg font-semibold text-cyan-200">
            Key insight: Domain experts (agents) are better at knowing what they
            need than a generalist orchestrator.
          </span>
        </div>
      </ScalePop>
    </div>
  );
}

function ProtocolPatternSlide() {
  const diagram = `┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  LangChain  │     │   AutoGen   │     │    Rust     │
│    Agent    │     │    Agent    │     │   Agent     │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       │    Shared Message Schema              │
       │                   │                   │
       └───────────────────┴───────────────────┘
                           │
                    ┌──────▼──────┐
                    │  Transport  │
                    │ MQTT / NATS │
                    │ Redis / UDP │
                    └─────────────┘`;

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-6 text-center">
        <span className={pill}>Pattern 2</span>
        <h2 className={`${gradientTitle} mt-2`}>Protocol-Based Coordination</h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          The Schema is the Contract, Not the Framework
        </p>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-2 max-w-6xl mx-auto">
        <SlideInLeft delay={0.2} className={`${surface} space-y-4`}>
          <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-4">
            <div className="font-semibold text-rose-200 mb-2">The Problem</div>
            <p className={mutedText}>
              Agents built with LangChain can't talk to agents built with
              AutoGen, CrewAI, or custom code.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4">
            <div className="font-semibold text-emerald-200 mb-2">
              The Pattern
            </div>
            <p className={mutedText}>
              Define a <strong>shared message schema</strong> over a{" "}
              <strong>broadcast transport</strong>.
            </p>
          </div>
          <div className="rounded-xl border border-violet-400/30 bg-violet-500/10 p-4">
            <span className="text-lg font-semibold text-violet-200">
              The schema is the contract. The framework becomes an
              implementation detail.
            </span>
          </div>
        </SlideInLeft>
        <SlideInRight delay={0.3} className={`${surface}`}>
          <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-violet-200/90 overflow-auto whitespace-pre">
            {diagram}
          </pre>
        </SlideInRight>
      </div>
    </div>
  );
}

function ProtocolSchemaSlide() {
  const schema = `{
  "id": "msg_123",
  "type": "result",
  "from": { "kind": "agent", "id": "payroll-agent" },
  "ts": 1734530000,
  "payload": {
    "task_id": "task_42",
    "message_type": "finding",
    "content": { "text": "Salary data retrieved" }
  }
}`;

  const transports = [
    { name: "MQTT", desc: "lightweight, widely supported" },
    { name: "NATS", desc: "cloud-native, high performance" },
    { name: "Redis pub/sub", desc: "if you're already using Redis" },
    { name: "UDP multicast", desc: "for local networks" },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-6 text-center">
        <span className={pill}>Pattern 2</span>
        <h2 className={`${gradientTitle} mt-2`}>Message Schema Example</h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          What Agents Actually Exchange
        </p>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
        <SlideInLeft delay={0.2} className={`${surface}`}>
          <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-sm font-mono text-emerald-200/90 overflow-auto">
            {schema}
          </pre>
        </SlideInLeft>
        <SlideInRight delay={0.3} className={`${surface} space-y-4`}>
          <span className={pill}>Transport Options</span>
          <ul className="space-y-3">
            {transports.map((t, i) => (
              <motion.li
                key={t.name}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                  {t.name}
                </span>
                <span className={mutedText}>{t.desc}</span>
              </motion.li>
            ))}
          </ul>
          <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4 mt-4">
            <span className="text-cyan-200 font-medium">
              Mix frameworks freely: The protocol doesn't care how agents are
              built.
            </span>
          </div>
        </SlideInRight>
      </div>
    </div>
  );
}

function MicGrantsProblemSlide() {
  const problems = [
    { prompt: '"Please only respond when asked"', issue: "easily ignored" },
    { prompt: '"Stay on topic"', issue: "agents can hallucinate" },
    { prompt: '"Wait your turn"', issue: "no enforcement mechanism" },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <span className={pill}>Pattern 3</span>
        <h2 className={`${gradientTitle} mt-2`}>Mic Grants for Moderation</h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          Moderation by Architecture, Not Prompt Discipline
        </p>
      </FadeInUp>
      <ScalePop
        delay={0.2}
        className={`${surface} max-w-3xl mx-auto space-y-6`}
      >
        <div className="text-lg text-white/90 font-semibold">
          The Problem with Prompt-Based Control
        </div>
        <div className="space-y-3">
          {problems.map((p, i) => (
            <motion.div
              key={p.prompt}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <code className="text-sm text-amber-200">{p.prompt}</code>
              <span className="text-rose-400 font-medium">→ {p.issue}</span>
            </motion.div>
          ))}
        </div>
        <div className="rounded-xl border border-rose-400/40 bg-rose-500/15 p-4 text-center">
          <span className="text-lg font-semibold text-rose-200">
            Prompt engineering is not a control plane.
          </span>
        </div>
      </ScalePop>
    </div>
  );
}

function MicGrantsStructureSlide() {
  const schema = `{
  "type": "mic_grant",
  "payload": {
    "task_id": "task_42",
    "agent_id": "researcher",
    "max_messages": 3,
    "allowed_message_types": ["ack", "finding", "result"],
    "expires_at": 1734531200
  }
}`;

  const specs = [
    { label: "Which agent can speak", icon: "🎯" },
    { label: "For which task", icon: "📋" },
    { label: "What message types are allowed", icon: "📝" },
    { label: "How many messages", icon: "🔢" },
    { label: "When it expires", icon: "⏰" },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-6 text-center">
        <span className={pill}>Pattern 3</span>
        <h2 className={`${gradientTitle} mt-2`}>What Mic Grants Look Like</h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          Explicit, Time-Boxed, Enforceable Permissions
        </p>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
        <SlideInLeft delay={0.2} className={`${surface}`}>
          <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-sm font-mono text-fuchsia-200/90 overflow-auto">
            {schema}
          </pre>
        </SlideInLeft>
        <SlideInRight delay={0.3} className={`${surface} space-y-4`}>
          <span className={pill}>A mic grant specifies:</span>
          <ul className="space-y-3">
            {specs.map((s, i) => (
              <motion.li
                key={s.label}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
                className="flex items-center gap-3"
              >
                <span className="text-xl">{s.icon}</span>
                <span className={mutedText}>{s.label}</span>
              </motion.li>
            ))}
          </ul>
        </SlideInRight>
      </div>
    </div>
  );
}

function MicGrantsGatewaySlide() {
  const diagram = `Agent wants to speak
        │
        ▼
┌───────────────────┐
│   Staging Area    │  (candidates)
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│     GATEWAY       │  ← No AI, fully deterministic
│                   │
│  ✓ Valid grant?   │
│  ✓ Allowed type?  │
│  ✓ Under limit?   │
│  ✓ Not expired?   │
└────────┬──────────┘
         │
    ┌────┴────┐
    ▼         ▼
APPROVED   REJECTED
 (public)   (logged)`;

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-6 text-center">
        <span className={pill}>Pattern 3</span>
        <h2 className={`${gradientTitle} mt-2`}>Architectural Enforcement</h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          A Deterministic Gateway
        </p>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
        <SlideInLeft delay={0.2} className={`${surface}`}>
          <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-emerald-200/90 overflow-auto whitespace-pre">
            {diagram}
          </pre>
        </SlideInLeft>
        <SlideInRight delay={0.3} className={`${surface} space-y-4`}>
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4">
            <div className="font-semibold text-emerald-200 mb-2">
              Key Property
            </div>
            <p className={mutedText}>
              <strong>Agents cannot bypass the gateway.</strong> This is
              enforced by topic ACLs, not trust.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
            <div className="text-sm font-semibold text-white/80">
              The gateway checks:
            </div>
            <ul className={`${mutedText} space-y-1`}>
              <li>• Does the agent hold a valid grant?</li>
              <li>• Is this message type allowed?</li>
              <li>• Is the agent under its message limit?</li>
              <li>• Has the grant expired?</li>
            </ul>
          </div>
          <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4">
            <span className="text-cyan-200 font-medium">
              No AI, fully deterministic code.
            </span>
          </div>
        </SlideInRight>
      </div>
    </div>
  );
}

function MicGrantsComparisonSlide() {
  const rows = [
    { prompt: '"Please wait your turn"', arch: "Must hold valid mic grant" },
    {
      prompt: '"Only say relevant things"',
      arch: "Gateway checks message type",
    },
    { prompt: '"Don\'t flood the channel"', arch: "max_messages enforced" },
    { prompt: "Trust the model", arch: "Trust the code" },
    { prompt: "Fails silently", arch: "Fails loudly (rejection logged)" },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <span className={pill}>Pattern 3</span>
        <h2 className={`${gradientTitle} mt-2`}>
          Why Architectural Moderation Matters
        </h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          Prompt Discipline vs. Architectural Enforcement
        </p>
      </FadeInUp>
      <ScalePop
        delay={0.2}
        className={`${surface} max-w-4xl mx-auto overflow-x-auto`}
      >
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-3 px-4 text-rose-300 font-semibold">
                Prompt-Based
              </th>
              <th className="py-3 px-4 text-emerald-300 font-semibold">
                Architecture-Based
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={row.prompt}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="border-b border-white/5"
              >
                <td className={`py-3 px-4 ${mutedText}`}>{row.prompt}</td>
                <td className={`py-3 px-4 ${mutedText}`}>{row.arch}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </ScalePop>
      <FadeInUp delay={0.6} className="mt-6 text-center">
        <div className="inline-block rounded-xl border border-fuchsia-400/40 bg-fuchsia-500/15 px-6 py-3">
          <span className="text-lg font-semibold text-fuchsia-200">
            Key insight: Moderation should be deterministic code, not
            probabilistic prompts.
          </span>
        </div>
      </FadeInUp>
    </div>
  );
}

function WhyMattersSlide() {
  const rows = [
    {
      without: "Agents talk over each other",
      withP: "Clear ownership via task assignment",
    },
    {
      without: "Invisible reasoning",
      withP: "Observable, readable conversation",
    },
    { without: "Unsafe/noisy outputs", withP: "Gateway-enforced moderation" },
    { without: "Framework lock-in", withP: "Protocol-based interoperability" },
    {
      without: "Deployment coupling",
      withP: "Location-independent coordination",
    },
    {
      without: "Orchestrator bottleneck",
      withP: "Decentralized context selection",
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>Why These Patterns Matter</h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          Multi-Agent Systems Need Coordination Infrastructure
        </p>
      </FadeInUp>
      <ScalePop
        delay={0.2}
        className={`${surface} max-w-4xl mx-auto overflow-x-auto`}
      >
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-3 px-4 text-rose-300 font-semibold">Without</th>
              <th className="py-3 px-4 text-emerald-300 font-semibold">With</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={row.without}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                className="border-b border-white/5"
              >
                <td className={`py-3 px-4 ${mutedText}`}>{row.without}</td>
                <td className={`py-3 px-4 ${mutedText}`}>{row.withP}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </ScalePop>
    </div>
  );
}

function MentalModelSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center items-center text-center">
      <FadeInUp className="mb-8">
        <h2 className={gradientTitle}>The Mental Model</h2>
      </FadeInUp>
      <ScalePop delay={0.2} className={`${surface} max-w-3xl`}>
        <blockquote className="text-2xl text-white/90 font-medium leading-relaxed">
          "Think <span className="text-cyan-400">ChatOps for AI agents</span> —
          with enforced moderation and humans in the loop."
        </blockquote>
      </ScalePop>
      <div className="mt-10 grid gap-4 md:grid-cols-3 max-w-4xl">
        {[
          { icon: "🤖", text: "Agents act like a team" },
          { icon: "👤", text: "Humans stay in control" },
          { icon: "🏗️", text: "Infrastructure enforces the rules" },
        ].map((item, i) => (
          <FadeInUp
            key={item.text}
            delay={0.4 + i * 0.1}
            className="rounded-xl border border-white/10 bg-white/5 p-4 text-center"
          >
            <span className="text-3xl">{item.icon}</span>
            <p className={`${mutedText} mt-2`}>{item.text}</p>
          </FadeInUp>
        ))}
      </div>
    </div>
  );
}

function PrototypeSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center items-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>Prototype</h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          These patterns are demonstrated in:
        </p>
      </FadeInUp>
      <ScalePop delay={0.2} className={`${surface} max-w-2xl w-full space-y-6`}>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">Agent Ops Room</div>
          <p className={`${mutedText} mt-1`}>A working prototype</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { label: "GitHub", value: "bensincs/agent-ops-room", icon: "🔗" },
            { label: "Transport", value: "MQTT", icon: "📡" },
            { label: "Implementation", value: "Rust", icon: "🦀" },
            { label: "Status", value: "Working prototype", icon: "✅" },
          ].map((item, i) => (
            <FadeInUp
              key={item.label}
              delay={0.3 + i * 0.08}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center gap-2">
                <span>{item.icon}</span>
                <span className="text-sm text-white/60">{item.label}</span>
              </div>
              <div className="mt-1 font-semibold text-white">{item.value}</div>
            </FadeInUp>
          ))}
        </div>
        <div className="text-center text-sm text-white/60">
          All three patterns implemented and working
        </div>
      </ScalePop>
    </div>
  );
}

function QuestionsSlide() {
  const box = `┌─────────────────────────────────────────┐
│                                         │
│   Three Patterns for Multi-Agent        │
│   Coordination                          │
│                                         │
│   1. Pub/Sub for Context Selection      │
│   2. Protocol-Based Coordination        │
│   3. Mic Grants for Moderation          │
│                                         │
│   Architecture > Prompts                │
│                                         │
└─────────────────────────────────────────┘`;

  return (
    <div className="h-full p-8 flex flex-col justify-center items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-10 max-w-4xl"
      >
        <h2 className="text-[clamp(48px,8vw,96px)] font-extrabold bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
          Questions?
        </h2>
        <FadeInUp delay={0.3} className={`${surface}`}>
          <pre className="text-left text-sm font-mono text-white/80 overflow-auto whitespace-pre">
            {box}
          </pre>
        </FadeInUp>
      </motion.div>
    </div>
  );
}

const slideMap: Record<string, React.ReactNode> = {
  title: <TitleSlide />,
  "the-problem": <TheProblemSlide />,
  "three-challenges": <ThreeChallengesSlide />,
  "the-insight": <TheInsightSlide />,
  "three-patterns": <ThreePatternsSlide />,
  "pubsub-pattern": <PubSubPatternSlide />,
  "pubsub-why": <PubSubWhySlide />,
  "protocol-pattern": <ProtocolPatternSlide />,
  "protocol-schema": <ProtocolSchemaSlide />,
  "mic-grants-problem": <MicGrantsProblemSlide />,
  "mic-grants-structure": <MicGrantsStructureSlide />,
  "mic-grants-gateway": <MicGrantsGatewaySlide />,
  "mic-grants-comparison": <MicGrantsComparisonSlide />,
  "why-matters": <WhyMattersSlide />,
  "mental-model": <MentalModelSlide />,
  prototype: <PrototypeSlide />,
  questions: <QuestionsSlide />,
};

export default function MultiAgentCoordinationDeck({
  slide,
}: DeckComponentProps) {
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
