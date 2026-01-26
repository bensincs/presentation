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
      "Open by framing the problem: multi-agent coordination is fundamentally about shared state, dynamic routing, and control.",
      "Preview the three patterns: selective memory, dynamic facilitation, deterministic moderation.",
      "Set expectations: these are architectural primitives, not framework-specific solutions.",
    ],
  },
  {
    id: "three-challenges",
    transition: "slide",
    speakerNotes: [
      "Context overload: agents drown in irrelevant information.",
      "Static routing: conversations can't adapt to what agents actually need.",
      "Uncontrolled output: without enforcement, agents talk over each other.",
    ],
  },
  {
    id: "challenge-1-problem",
    transition: "slide",
    speakerNotes: [
      "Challenge 1: Context Overload.",
      "When you hand off whole context or let an orchestrator decide, agents get overwhelmed.",
      "The calling agent doesn't understand what's relevant to each specialist.",
    ],
  },
  {
    id: "challenge-1-insight",
    transition: "scale",
    speakerNotes: [
      "Insight: Let agents choose what to remember.",
      "Shared state is visible to all, but memory is personal.",
      "Agents filter what they keep, not what they see.",
    ],
  },
  {
    id: "challenge-2-problem",
    transition: "slide",
    speakerNotes: [
      "Challenge 2: Static Routing.",
      "Hardcoded routing can't adapt when agent capabilities change.",
      "Conversations evolve—routing needs to respond dynamically.",
    ],
  },
  {
    id: "challenge-2-insight",
    transition: "scale",
    speakerNotes: [
      "Insight: Agents register their interests.",
      "A facilitator routes tasks based on current registrations.",
      "Agents can join, leave, or change interests at runtime.",
    ],
  },
  {
    id: "challenge-3-problem",
    transition: "slide",
    speakerNotes: [
      "Challenge 3: Output Chaos.",
      "Without enforcement, agents talk over each other or flood the conversation.",
      "Prompt-based control is just suggestions—not rules.",
    ],
  },
  {
    id: "challenge-3-insight",
    transition: "scale",
    speakerNotes: [
      "Insight: Enforce moderation with code, not prompts.",
      "Express rules as data: who can speak, how often, what types.",
      "A gateway enforces these rules deterministically.",
    ],
  },
  {
    id: "three-patterns",
    transition: "slide",
    speakerNotes: [
      "Pattern 1: Selective Memory—agents curate their own context from shared state.",
      "Pattern 2: Dynamic Facilitation—agents register interest, facilitator routes accordingly.",
      "Pattern 3: Deterministic Moderation—enforce turn-taking and limits with code, not prompts.",
    ],
  },
  {
    id: "selective-memory",
    transition: "slide",
    speakerNotes: [
      "Shared state is the single source of truth—all events, all context.",
      "Each agent decides what to remember based on its domain expertise.",
      "This is pull-based: agents subscribe to relevance, not topics.",
    ],
  },
  {
    id: "selective-memory-how",
    transition: "slide",
    speakerNotes: [
      "Implementation: agents see the full stream but filter on content.",
      "Memory is agent-local—each agent builds its own working context.",
      "The shared state never changes; only agent memories differ.",
    ],
  },
  {
    id: "selective-memory-impl",
    transition: "slide",
    speakerNotes: [
      "In Agent Ops Room: shared state lives on MQTT public topic.",
      "Each agent has a MessageHistory with configurable max messages.",
      "Agents subscribe to public, store what matters in local memory.",
    ],
  },
  {
    id: "dynamic-facilitation",
    transition: "slide",
    speakerNotes: [
      "Agents register their capabilities and interests with a facilitator.",
      "The facilitator dynamically routes tasks based on current registrations.",
      "This enables runtime adaptation—agents can join, leave, or change interests.",
    ],
  },
  {
    id: "facilitation-flow",
    transition: "slide",
    speakerNotes: [
      "Walk through the flow: agent registers interest, task arrives, facilitator matches.",
      "Multiple agents can express interest—facilitator decides or delegates.",
      "The room metaphor: agents raise their hand, facilitator calls on them.",
    ],
  },
  {
    id: "dynamic-facilitation-impl",
    transition: "slide",
    speakerNotes: [
      "Agents send heartbeats with description fields.",
      "Facilitator uses AgentRegistry to track who's available.",
      "LLM gets dynamic tool list: assign_to_{agent_id} for each active agent.",
    ],
  },
  {
    id: "deterministic-moderation",
    transition: "slide",
    speakerNotes: [
      "Moderation rules are expressed as data: who can speak, how often, what types.",
      "A gateway process enforces these rules—no AI, pure logic.",
      "Violations are rejected and logged, not silently ignored.",
    ],
  },
  {
    id: "moderation-gateway",
    transition: "slide",
    speakerNotes: [
      "The gateway sits between agents and the shared channel.",
      "Every message is validated against current permissions.",
      "This is infrastructure-level control, not application-level hints.",
    ],
  },
  {
    id: "deterministic-moderation-impl",
    transition: "slide",
    speakerNotes: [
      "Agents publish to public_candidates, never directly to public.",
      "Gateway validates: mic grant, message type, count, expiration.",
      "MicGrantTracker is pure Rust—no LLM, deterministic validation.",
    ],
  },
  {
    id: "patterns-together",
    transition: "slide",
    speakerNotes: [
      "These three patterns compose: shared state + facilitation + moderation.",
      "Agents remember what matters, get routed dynamically, speak when permitted.",
      "The result is coordinated multi-agent behavior without central orchestration.",
    ],
  },
  {
    id: "why-matters",
    transition: "slide",
    speakerNotes: [
      "Selective memory prevents context overload.",
      "Dynamic facilitation enables adaptive routing.",
      "Deterministic moderation ensures controlled output.",
    ],
  },
  {
    id: "mental-model",
    transition: "scale",
    speakerNotes: [
      "Mental model: a meeting room with a whiteboard, a facilitator, and speaking rules.",
      "Everyone can see the whiteboard (shared state), take their own notes (selective memory).",
      "The facilitator calls on people (dynamic routing), enforces time limits (moderation).",
    ],
  },
  {
    id: "prototype",
    transition: "slide",
    speakerNotes: [
      "Agent Ops Room implements all three patterns.",
      "Built with Rust and MQTT for performance and reliability.",
      "Open source—explore the code and contribute.",
    ],
  },
  {
    id: "questions",
    transition: "fade",
    speakerNotes: [
      "Recap: Selective Memory, Dynamic Facilitation, Deterministic Moderation.",
      "These are infrastructure patterns, not framework features.",
      "Architecture over prompts—code you can trust.",
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
          "Selective Memory",
          "Dynamic Facilitation",
          "Deterministic Moderation",
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
        Three architectural patterns that let agents curate their own context,
        enable adaptive task routing, and enforce conversation control through
        code—not prompts.
      </FadeInUp>
    </div>
  );
}

function Challenge1ProblemSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <span className={pill}>Challenge 1</span>
        <h2 className={`${gradientTitle} mt-2`}>Context Overload</h2>
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
          . Common approaches each have limitations:
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: "🔀",
              title: "Handoffs",
              desc: "Whole context handed off to the next agent—doesn't scale",
            },
            {
              icon: "🔧",
              title: "Agents-as-Tools",
              desc: "Orchestrator decides what context to give each sub-agent",
            },
            {
              icon: "💻",
              title: "Custom Pro-Code",
              desc: "Works if you're in one framework, but creates lock-in",
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
          <span className="text-lg">🧠</span>
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

function Challenge1InsightSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center items-center text-center">
      <FadeInUp className="mb-6">
        <span className={pill}>Challenge 1 → Insight</span>
      </FadeInUp>
      <ScalePop delay={0.2} className="max-w-3xl">
        <h2 className="text-4xl font-bold text-white leading-tight">
          What if agents could{" "}
          <span className="text-cyan-400">see everything</span> but{" "}
          <span className="text-cyan-400">choose what to remember</span>?
        </h2>
      </ScalePop>
      <FadeInUp delay={0.4} className="mt-8">
        <p className="text-xl text-[var(--muted)]">
          Don't filter what agents see—let them filter what they keep.
        </p>
      </FadeInUp>
      <ScalePop delay={0.6} className="mt-12">
        <div className="inline-block rounded-xl border border-cyan-400/40 bg-cyan-500/15 px-8 py-4">
          <span className="text-2xl font-semibold text-cyan-200">
            → Selective Memory
          </span>
        </div>
      </ScalePop>
    </div>
  );
}

function Challenge2ProblemSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <span className={pill}>Challenge 2</span>
        <h2 className={`${gradientTitle} mt-2`}>Static Routing</h2>
        <p className="text-xl text-[var(--muted)] mt-2">
          Conversations Evolve, But Routing Doesn't
        </p>
      </FadeInUp>
      <ScalePop
        delay={0.2}
        className={`${surface} max-w-4xl mx-auto space-y-6`}
      >
        <p className="text-lg text-white/90">
          Traditional multi-agent systems use{" "}
          <span className="text-violet-400 font-semibold">
            hardcoded routing logic
          </span>{" "}
          that can't adapt:
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: "🔒",
              title: "Fixed Roles",
              desc: "Agents are assigned tasks at design time, not runtime",
            },
            {
              icon: "📋",
              title: "Static Rules",
              desc: "'If finance question → route to finance agent'",
            },
            {
              icon: "🚫",
              title: "No Adaptation",
              desc: "Can't respond when capabilities change or agents join/leave",
            },
          ].map((issue, i) => (
            <FadeInUp
              key={issue.title}
              delay={0.3 + i * 0.1}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <span className="text-2xl">{issue.icon}</span>
              <div className="mt-2 font-semibold text-white">{issue.title}</div>
              <p className={mutedText}>{issue.desc}</p>
            </FadeInUp>
          ))}
        </div>
        <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-4 mt-4">
          <span className="text-lg">🎯</span>
          <span className="ml-2 text-rose-200 font-medium">
            The Issue: Routing needs to{" "}
            <strong>respond to what agents can actually do right now</strong>,
            not what was coded months ago.
          </span>
        </div>
      </ScalePop>
    </div>
  );
}

function Challenge2InsightSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center items-center text-center">
      <FadeInUp className="mb-6">
        <span className={pill}>Challenge 2 → Insight</span>
      </FadeInUp>
      <ScalePop delay={0.2} className="max-w-3xl">
        <h2 className="text-4xl font-bold text-white leading-tight">
          What if agents could{" "}
          <span className="text-violet-400">raise their hand</span> and say{" "}
          <span className="text-violet-400">"I can help with that"</span>?
        </h2>
      </ScalePop>
      <FadeInUp delay={0.4} className="mt-8">
        <p className="text-xl text-[var(--muted)]">
          Don't hardcode routing—let agents register their interests dynamically.
        </p>
      </FadeInUp>
      <ScalePop delay={0.6} className="mt-12">
        <div className="inline-block rounded-xl border border-violet-400/40 bg-violet-500/15 px-8 py-4">
          <span className="text-2xl font-semibold text-violet-200">
            → Dynamic Facilitation
          </span>
        </div>
      </ScalePop>
    </div>
  );
}

function Challenge3ProblemSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <span className={pill}>Challenge 3</span>
        <h2 className={`${gradientTitle} mt-2`}>Output Chaos</h2>
        <p className="text-xl text-[var(--muted)] mt-2">
          Without Enforcement, Agents Talk Over Each Other
        </p>
      </FadeInUp>
      <ScalePop
        delay={0.2}
        className={`${surface} max-w-4xl mx-auto space-y-6`}
      >
        <p className="text-lg text-white/90">
          Prompt-based moderation{" "}
          <span className="text-fuchsia-400 font-semibold">
            is just suggestions
          </span>
          —agents can ignore it:
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              prompt: '"Please wait your turn"',
              issue: "No enforcement mechanism",
            },
            {
              prompt: '"Only respond when relevant"',
              issue: "Agent decides relevance",
            },
            {
              prompt: '"Limit your responses"',
              issue: "Suggestions, not rules",
            },
          ].map((p, i) => (
            <FadeInUp
              key={p.prompt}
              delay={0.3 + i * 0.1}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <code className="text-sm text-amber-200">{p.prompt}</code>
              <div className="mt-2 text-rose-400 font-medium text-sm">
                → {p.issue}
              </div>
            </FadeInUp>
          ))}
        </div>
        <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-4 mt-4">
          <span className="text-lg">🔊</span>
          <span className="ml-2 text-rose-200 font-medium">
            The Issue: Prompts are <strong>interpreted by AI</strong>. We need
            rules that <strong>code enforces</strong>.
          </span>
        </div>
      </ScalePop>
    </div>
  );
}

function Challenge3InsightSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center items-center text-center">
      <FadeInUp className="mb-6">
        <span className={pill}>Challenge 3 → Insight</span>
      </FadeInUp>
      <ScalePop delay={0.2} className="max-w-3xl">
        <h2 className="text-4xl font-bold text-white leading-tight">
          What if we{" "}
          <span className="text-fuchsia-400">stopped asking nicely</span> and{" "}
          <span className="text-fuchsia-400">enforced the rules with code</span>?
        </h2>
      </ScalePop>
      <FadeInUp delay={0.4} className="mt-8">
        <p className="text-xl text-[var(--muted)]">
          Don't suggest moderation in prompts—enforce it in infrastructure.
        </p>
      </FadeInUp>
      <ScalePop delay={0.6} className="mt-12">
        <div className="inline-block rounded-xl border border-fuchsia-400/40 bg-fuchsia-500/15 px-8 py-4">
          <span className="text-2xl font-semibold text-fuchsia-200">
            → Deterministic Moderation
          </span>
        </div>
      </ScalePop>
    </div>
  );
}

function ThreeChallengesSlide() {
  const challenges = [
    {
      icon: "🧠",
      title: "Context Overload",
      impact:
        "Agents can't process everything—they need to choose what matters",
      color: "cyan",
    },
    {
      icon: "🎯",
      title: "Static Routing",
      impact:
        "Conversations evolve—routing needs to adapt to agent capabilities in real-time",
      color: "violet",
    },
    {
      icon: "🔊",
      title: "Output Chaos",
      impact:
        "Without enforcement, agents talk over each other or ignore instructions",
      color: "rose",
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>Three Core Challenges</h2>
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
        Each challenge requires a different architectural primitive to solve.
      </FadeInUp>
    </div>
  );
}

function ThreePatternsSlide() {
  const patterns = [
    {
      num: "1",
      title: "Selective Memory",
      subtitle: "Agents curate their own context",
      icon: "🧠",
      color: "cyan",
    },
    {
      num: "2",
      title: "Dynamic Facilitation",
      subtitle: "Interest-based routing",
      icon: "🎯",
      color: "violet",
    },
    {
      num: "3",
      title: "Deterministic Moderation",
      subtitle: "Code-enforced control",
      icon: "⚡",
      color: "fuchsia",
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center items-center">
      <FadeInUp className="mb-10 text-center">
        <h2 className={gradientTitle}>Three Patterns</h2>
        <p className="text-xl text-[var(--muted)] mt-2">
          Architectural Primitives for Multi-Agent Coordination
        </p>
      </FadeInUp>
      <div className="grid gap-6 md:grid-cols-3 max-w-5xl">
        {patterns.map((pattern, index) => (
          <ScalePop
            key={pattern.title}
            delay={0.2 + index * 0.15}
            className={`${surface} text-center space-y-3 hover:border-white/20 transition-colors`}
          >
            <div className="text-4xl">{pattern.icon}</div>
            <div className="text-3xl font-bold text-white/30">
              {pattern.num}
            </div>
            <div className="text-lg font-semibold text-white">
              {pattern.title}
            </div>
            <p className={mutedText}>{pattern.subtitle}</p>
          </ScalePop>
        ))}
      </div>
    </div>
  );
}

function SelectiveMemorySlide() {
  const diagram = `┌─────────────────────────────────────────┐
│           SHARED STATE                  │
│                                         │
│  📧 All events, messages, context       │
│     visible to every agent              │
│                                         │
└─────────────────────────────────────────┘
                    │
    ┌───────────────┼───────────────┐
    ▼               ▼               ▼
┌────────┐    ┌────────┐    ┌────────┐
│ Agent  │    │ Agent  │    │ Agent  │
│   A    │    │   B    │    │   C    │
│        │    │        │    │        │
│ 🧠     │    │ 🧠     │    │ 🧠     │
│ Remembers:  │ Remembers:  │ Remembers:
│ finance│    │ calendar│   │ legal  │
│ data   │    │ events  │   │ terms  │
└────────┘    └────────┘    └────────┘`;

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-6 text-center">
        <span className={pill}>Pattern 1</span>
        <h2 className={`${gradientTitle} mt-2`}>Selective Memory</h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          Agents Choose What to Remember from Shared State
        </p>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-2 max-w-6xl mx-auto">
        <SlideInLeft delay={0.2} className={`${surface} space-y-4`}>
          <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4">
            <div className="font-semibold text-cyan-200 mb-2">The Idea</div>
            <p className={mutedText}>
              <strong>Shared state</strong> is the single source of truth—all
              events, all messages, all context. Every agent can see everything.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4">
            <div className="font-semibold text-emerald-200 mb-2">
              The Pattern
            </div>
            <p className={mutedText}>
              Each agent decides <strong>what to remember</strong> based on its
              domain expertise. Memory is local to each agent.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <span className="text-sm text-white/60">Key difference:</span>
            <p className={`${mutedText} mt-1`}>
              State is shared; memory is personal. Agents don't filter what they
              see—they filter what they keep.
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

function SelectiveMemoryHowSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <span className={pill}>Pattern 1</span>
        <h2 className={`${gradientTitle} mt-2`}>How It Works</h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          Observe Everything, Remember What Matters
        </p>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
        <ScalePop delay={0.2} className={`${surface} space-y-4`}>
          <div className="text-3xl">👁️</div>
          <div className="font-semibold text-white">Full Visibility</div>
          <p className={mutedText}>
            Every agent sees the complete stream of events. Nothing is hidden or
            pre-filtered.
          </p>
        </ScalePop>
        <ScalePop delay={0.3} className={`${surface} space-y-4`}>
          <div className="text-3xl">🧠</div>
          <div className="font-semibold text-white">Local Memory</div>
          <p className={mutedText}>
            Each agent builds its own working context by choosing which events
            to internalize.
          </p>
        </ScalePop>
        <ScalePop delay={0.4} className={`${surface} space-y-4`}>
          <div className="text-3xl">🎯</div>
          <div className="font-semibold text-white">Domain Expertise</div>
          <p className={mutedText}>
            Agents know their domain best—they're the right ones to decide
            what's relevant.
          </p>
        </ScalePop>
      </div>
      <FadeInUp delay={0.5} className="mt-8 text-center">
        <div className="inline-block rounded-xl border border-cyan-400/40 bg-cyan-500/15 px-6 py-3">
          <span className="text-lg font-semibold text-cyan-200">
            The shared state never changes; only agent memories differ.
          </span>
        </div>
      </FadeInUp>
    </div>
  );
}

function SelectiveMemoryImplSlide() {
  const codeSnippet = `// Agent subscribes to shared state (MQTT)
let public_topic = topics::public(&room_id);
client.subscribe(&public_topic, QoS::AtLeastOnce).await?;

// Local memory per agent (configurable size)
let memory = Arc::new(Mutex::new(
    MessageHistory::new(config.max_memory_messages)
));

// Agent stores relevant messages
async fn handle_public_message(payload: &[u8], memory: &...) {
    if let Ok(envelope) = serde_json::from_slice(payload) {
        let mut mem = memory.lock().await;
        mem.add(envelope);  // Agent decides what to remember
    }
}

// Convert memory to LLM context
let context = memory.lock().await.to_chat_messages();`;

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-6 text-center">
        <span className={pill}>Pattern 1 Implementation</span>
        <h2 className={`${gradientTitle} mt-2`}>Agent Ops Room</h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          Shared State via MQTT + Local Memory per Agent
        </p>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-2 max-w-6xl mx-auto">
        <SlideInLeft delay={0.2} className={`${surface} space-y-4`}>
          <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4">
            <div className="font-semibold text-cyan-200 mb-2">Shared State</div>
            <p className={mutedText}>
              All messages flow through <code className="text-cyan-300">rooms/&#123;roomId&#125;/public</code>.
              Every agent subscribes and sees everything.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4">
            <div className="font-semibold text-emerald-200 mb-2">Local Memory</div>
            <p className={mutedText}>
              Each agent has a <code className="text-emerald-300">MessageHistory</code> with
              configurable <code className="text-emerald-300">max_memory_messages</code>.
              Agents decide what to store.
            </p>
          </div>
          <div className="rounded-xl border border-violet-400/30 bg-violet-500/10 p-4">
            <div className="font-semibold text-violet-200 mb-2">Context Building</div>
            <p className={mutedText}>
              <code className="text-violet-300">to_chat_messages()</code> converts
              local memory to LLM context. Each agent builds its own view.
            </p>
          </div>
        </SlideInLeft>
        <SlideInRight delay={0.3} className={`${surface}`}>
          <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-cyan-200/90 overflow-auto whitespace-pre">
            {codeSnippet}
          </pre>
        </SlideInRight>
      </div>
    </div>
  );
}

function DynamicFacilitationSlide() {
  const diagram = `┌─────────────────────────────────────────┐
│           FACILITATOR                   │
│                                         │
│  📋 Tracks interests & capabilities     │
│  🎯 Routes tasks dynamically            │
│  🔄 Adapts to changes in real-time      │
│                                         │
└─────────────────────────────────────────┘
         ▲               ▲               ▲
         │ register      │ register      │ register
         │ interest      │ interest      │ interest
    ┌────┴───┐     ┌────┴───┐     ┌────┴───┐
    │ Agent  │     │ Agent  │     │ Agent  │
    │   A    │     │   B    │     │   C    │
    │        │     │        │     │        │
    │ "I can │     │ "I can │     │ "I can │
    │ handle │     │ handle │     │ handle │
    │ finance"│    │ search"│     │ legal" │
    └────────┘     └────────┘     └────────┘`;

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-6 text-center">
        <span className={pill}>Pattern 2</span>
        <h2 className={`${gradientTitle} mt-2`}>Dynamic Facilitation</h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          Agents Register Interest, Facilitator Routes Dynamically
        </p>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-2 max-w-6xl mx-auto">
        <SlideInLeft delay={0.2} className={`${surface} space-y-4`}>
          <div className="rounded-xl border border-violet-400/30 bg-violet-500/10 p-4">
            <div className="font-semibold text-violet-200 mb-2">The Idea</div>
            <p className={mutedText}>
              Agents <strong>declare their capabilities and interests</strong>{" "}
              to a facilitator. Tasks are routed based on current registrations.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4">
            <div className="font-semibold text-emerald-200 mb-2">
              The Pattern
            </div>
            <p className={mutedText}>
              The facilitator acts as a <strong>matchmaker</strong>—it doesn't
              decide who's best, it knows who's available and interested.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <span className="text-sm text-white/60">Key benefit:</span>
            <p className={`${mutedText} mt-1`}>
              Agents can join, leave, or change interests at runtime. No code
              changes needed.
            </p>
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

function FacilitationFlowSlide() {
  const flow = [
    {
      step: "1",
      label: "Register",
      desc: "Agent declares: 'I handle legal queries'",
    },
    {
      step: "2",
      label: "Task Arrives",
      desc: "User asks about contract terms",
    },
    {
      step: "3",
      label: "Facilitate",
      desc: "Facilitator matches task to registered interest",
    },
    {
      step: "4",
      label: "Route",
      desc: "Task goes to the right agent dynamically",
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <span className={pill}>Pattern 2</span>
        <h2 className={`${gradientTitle} mt-2`}>The Flow</h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          Interest Registration → Task Matching → Dynamic Routing
        </p>
      </FadeInUp>
      <div className="grid gap-4 md:grid-cols-4 max-w-5xl mx-auto">
        {flow.map((item, i) => (
          <ScalePop
            key={item.step}
            delay={0.2 + i * 0.1}
            className={`${surface} text-center space-y-3`}
          >
            <div className="w-10 h-10 mx-auto rounded-full border border-violet-400/40 bg-violet-500/20 flex items-center justify-center text-lg font-bold text-violet-200">
              {item.step}
            </div>
            <div className="font-semibold text-white">{item.label}</div>
            <p className={mutedText}>{item.desc}</p>
          </ScalePop>
        ))}
      </div>
      <FadeInUp delay={0.6} className="mt-8 text-center">
        <div className="inline-block rounded-xl border border-violet-400/40 bg-violet-500/15 px-6 py-3">
          <span className="text-lg font-semibold text-violet-200">
            Think of it like a meeting room: agents raise their hand, the
            facilitator calls on them.
          </span>
        </div>
      </FadeInUp>
    </div>
  );
}

function DynamicFacilitationImplSlide() {
  const codeSnippet = `// Agents send heartbeats with capability descriptions
let payload = HeartbeatPayload {
    ts: now,
    description: Some(
        "HR Agent - searches employee records".to_string()
    ),
    can_accept_tasks: true,
};
// → rooms/{roomId}/agents/{agentId}/heartbeat

// Facilitator tracks active agents
pub struct AgentRegistry {
    agents: HashMap<String, AgentInfo>,  // id → info
    timeout_secs: u64,
}

// Dynamic tool creation from registrations
let tools: Vec<Tool> = available_agents.iter()
    .map(|(agent_id, description)| Tool {
        function: FunctionDefinition {
            name: format!("assign_to_{}", agent_id),
            description: desc,
            ...
        },
    }).collect();`;

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-6 text-center">
        <span className={pill}>Pattern 2 Implementation</span>
        <h2 className={`${gradientTitle} mt-2`}>Agent Ops Room</h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          Heartbeats + AgentRegistry + Dynamic Tools
        </p>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-2 max-w-6xl mx-auto">
        <SlideInLeft delay={0.2} className={`${surface} space-y-4`}>
          <div className="rounded-xl border border-violet-400/30 bg-violet-500/10 p-4">
            <div className="font-semibold text-violet-200 mb-2">Heartbeat Registration</div>
            <p className={mutedText}>
              Agents broadcast to <code className="text-violet-300">rooms/&#123;roomId&#125;/agents/&#123;agentId&#125;/heartbeat</code>.
              Includes <code className="text-violet-300">description</code> of capabilities.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4">
            <div className="font-semibold text-emerald-200 mb-2">AgentRegistry</div>
            <p className={mutedText}>
              Facilitator tracks active agents via heartbeats.
              <code className="text-emerald-300"> get_active_agents_with_descriptions()</code> returns
              who's available and what they do.
            </p>
          </div>
          <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4">
            <div className="font-semibold text-cyan-200 mb-2">Dynamic Tools</div>
            <p className={mutedText}>
              LLM gets tools like <code className="text-cyan-300">assign_to_hr_agent</code>.
              Tool list changes as agents join/leave.
            </p>
          </div>
        </SlideInLeft>
        <SlideInRight delay={0.3} className={`${surface}`}>
          <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-violet-200/90 overflow-auto whitespace-pre">
            {codeSnippet}
          </pre>
        </SlideInRight>
      </div>
    </div>
  );
}

function DeterministicModerationSlide() {
  const specs = [
    { label: "Who can speak", icon: "🎯", desc: "Explicit permission grants" },
    {
      label: "How many messages per turn",
      icon: "🔢",
      desc: "Enforced limits",
    },
    {
      label: "What types of messages allowed",
      icon: "📝",
      desc: "Type validation",
    },
    { label: "Cooldown between messages", icon: "⏱️", desc: "Rate limiting" },
    { label: "When permissions expire", icon: "⏰", desc: "Time-boxed grants" },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-6 text-center">
        <span className={pill}>Pattern 3</span>
        <h2 className={`${gradientTitle} mt-2`}>Rules as Data</h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          Moderation Rules That Code Can Enforce
        </p>
      </FadeInUp>
      <div className="max-w-4xl mx-auto">
        <ScalePop delay={0.2} className={`${surface} space-y-6`}>
          <div className="rounded-xl border border-fuchsia-400/30 bg-fuchsia-500/10 p-4">
            <div className="font-semibold text-fuchsia-200 mb-2">The Idea</div>
            <p className={mutedText}>
              Express moderation rules as <strong>structured data</strong> that
              deterministic code can enforce. No interpretation, no ambiguity.
            </p>
          </div>
          <div>
            <span className={pill}>Moderation rules specify:</span>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
              {specs.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{s.icon}</span>
                    <span className="font-semibold text-white text-sm">
                      {s.label}
                    </span>
                  </div>
                  <p className={mutedText}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScalePop>
      </div>
    </div>
  );
}

function ModerationGatewaySlide() {
  const diagram = `Agent wants to speak
        │
        ▼
┌───────────────────┐
│   GATEWAY         │  ← Pure code, no AI
│                   │
│  ✓ Has permission? │
│  ✓ Under limit?    │
│  ✓ Valid type?     │
│  ✓ Not on cooldown?│
│  ✓ Not expired?    │
└────────┬──────────┘
         │
    ┌────┴────┐
    ▼         ▼
ALLOWED    REJECTED
 (sent)    (logged)`;

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-6 text-center">
        <span className={pill}>Pattern 3</span>
        <h2 className={`${gradientTitle} mt-2`}>The Gateway</h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          Infrastructure-Level Enforcement
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
              <strong>The gateway is deterministic code.</strong> No AI, no
              interpretation—just rules and logic.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
            <div className="text-sm font-semibold text-white/80">
              Every message is validated:
            </div>
            <ul className={`${mutedText} space-y-1`}>
              <li>• Does the agent have permission to speak?</li>
              <li>• Is this message type allowed?</li>
              <li>• Has the agent hit its limit?</li>
              <li>• Is the cooldown period elapsed?</li>
            </ul>
          </div>
          <div className="rounded-xl border border-fuchsia-400/30 bg-fuchsia-500/10 p-4">
            <span className="text-fuchsia-200 font-medium">
              Rejections are logged, not silent. Violations are visible.
            </span>
          </div>
        </SlideInRight>
      </div>
    </div>
  );
}

function DeterministicModerationImplSlide() {
  const codeSnippet = `// Agents publish to candidates, NOT directly to public
let candidates_topic = topics::public_candidates(&room_id);
client.publish(candidates_topic, message).await;

// Gateway validates every message
pub fn validate(&mut self, agent_id, task_id, msg_type, ts)
    -> Result<(), ValidationError>
{
    let grant = self.grants.get(&(agent_id, task_id))
        .ok_or(ValidationError::NoMicGrant)?;

    if ts > grant.expires_at {
        return Err(ValidationError::MicGrantExpired);
    }
    if !grant.allowed_message_types.contains(&msg_type) {
        return Err(ValidationError::MessageTypeNotAllowed);
    }
    if grant.messages_sent >= grant.max_messages {
        return Err(ValidationError::MessageLimitExceeded);
    }
    grant.messages_sent += 1;
    Ok(())
}`;

  const topicFlow = `Agent → public_candidates → Gateway → public
                              ↓
                          validate()
                              ↓
                    ✓ Approved → republish
                    ✗ Rejected → log + reject`;

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-6 text-center">
        <span className={pill}>Pattern 3 Implementation</span>
        <h2 className={`${gradientTitle} mt-2`}>Agent Ops Room</h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          Gateway + MicGrantTracker + Topic-Based Enforcement
        </p>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-2 max-w-6xl mx-auto">
        <SlideInLeft delay={0.2} className={`${surface} space-y-4`}>
          <div className="rounded-xl border border-fuchsia-400/30 bg-fuchsia-500/10 p-4">
            <div className="font-semibold text-fuchsia-200 mb-2">Topic Architecture</div>
            <pre className="text-xs font-mono text-fuchsia-200/80 whitespace-pre overflow-auto">
              {topicFlow}
            </pre>
          </div>
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4">
            <div className="font-semibold text-emerald-200 mb-2">MicGrantTracker</div>
            <p className={mutedText}>
              Pure Rust struct. Tracks: <code className="text-emerald-300">task_id</code>,{" "}
              <code className="text-emerald-300">max_messages</code>,{" "}
              <code className="text-emerald-300">allowed_types</code>,{" "}
              <code className="text-emerald-300">expires_at</code>.
            </p>
          </div>
          <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-4">
            <div className="font-semibold text-rose-200 mb-2">Zero AI</div>
            <p className={mutedText}>
              Gateway is <strong>pure code</strong>. No LLM interpretation.
              Rules are data, enforcement is deterministic.
            </p>
          </div>
        </SlideInLeft>
        <SlideInRight delay={0.3} className={`${surface}`}>
          <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-fuchsia-200/90 overflow-auto whitespace-pre">
            {codeSnippet}
          </pre>
        </SlideInRight>
      </div>
    </div>
  );
}

function PatternTogetherSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>Patterns Working Together</h2>
        <p className="text-xl text-[var(--muted)] mt-2">
          Selective Memory + Dynamic Facilitation + Deterministic Moderation
        </p>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
        <ScalePop delay={0.2} className={`${surface} space-y-4`}>
          <div className="text-3xl">🧠</div>
          <div className="font-semibold text-cyan-300">Selective Memory</div>
          <p className={mutedText}>
            Agents see shared state, remember what matters to their domain.
          </p>
          <div className="text-xs text-white/50 mt-2">
            → Prevents context overload
          </div>
        </ScalePop>
        <ScalePop delay={0.3} className={`${surface} space-y-4`}>
          <div className="text-3xl">🎯</div>
          <div className="font-semibold text-violet-300">
            Dynamic Facilitation
          </div>
          <p className={mutedText}>
            Agents register interests, facilitator routes tasks dynamically.
          </p>
          <div className="text-xs text-white/50 mt-2">
            → Enables adaptive routing
          </div>
        </ScalePop>
        <ScalePop delay={0.4} className={`${surface} space-y-4`}>
          <div className="text-3xl">⚡</div>
          <div className="font-semibold text-fuchsia-300">
            Deterministic Moderation
          </div>
          <p className={mutedText}>
            Gateway enforces who speaks, when, and how much.
          </p>
          <div className="text-xs text-white/50 mt-2">
            → Ensures controlled output
          </div>
        </ScalePop>
      </div>
      <FadeInUp delay={0.5} className="mt-8 text-center">
        <div className="inline-block rounded-xl border border-white/20 bg-white/5 px-6 py-3">
          <span className="text-lg font-semibold text-white/90">
            The result: coordinated multi-agent behavior without central
            orchestration.
          </span>
        </div>
      </FadeInUp>
    </div>
  );
}

function WhyMattersSlide() {
  const rows = [
    {
      challenge: "Context overload",
      pattern: "Selective Memory",
      outcome: "Agents curate their own relevant context",
    },
    {
      challenge: "Static routing",
      pattern: "Dynamic Facilitation",
      outcome: "Tasks routed based on live interests",
    },
    {
      challenge: "Uncontrolled output",
      pattern: "Deterministic Moderation",
      outcome: "Code-enforced speaking rules",
    },
    {
      challenge: "Central bottleneck",
      pattern: "All three",
      outcome: "Decentralized, self-organizing coordination",
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>Why These Patterns Matter</h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          Solving Real Coordination Challenges
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
                Challenge
              </th>
              <th className="py-3 px-4 text-violet-300 font-semibold">
                Pattern
              </th>
              <th className="py-3 px-4 text-emerald-300 font-semibold">
                Outcome
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={row.challenge}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                className="border-b border-white/5"
              >
                <td className={`py-3 px-4 ${mutedText}`}>{row.challenge}</td>
                <td className={`py-3 px-4 ${mutedText}`}>{row.pattern}</td>
                <td className={`py-3 px-4 ${mutedText}`}>{row.outcome}</td>
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
          "A meeting room with a{" "}
          <span className="text-cyan-400">whiteboard</span>, a{" "}
          <span className="text-violet-400">facilitator</span>, and{" "}
          <span className="text-fuchsia-400">speaking rules</span>."
        </blockquote>
      </ScalePop>
      <div className="mt-10 grid gap-4 md:grid-cols-3 max-w-4xl">
        {[
          {
            icon: "📋",
            label: "Whiteboard",
            desc: "Shared state everyone can see",
            color: "cyan",
          },
          {
            icon: "🎯",
            label: "Facilitator",
            desc: "Routes based on who raises their hand",
            color: "violet",
          },
          {
            icon: "⏱️",
            label: "Speaking Rules",
            desc: "Enforced time limits and turn-taking",
            color: "fuchsia",
          },
        ].map((item, i) => (
          <FadeInUp
            key={item.label}
            delay={0.4 + i * 0.1}
            className="rounded-xl border border-white/10 bg-white/5 p-4 text-center"
          >
            <span className="text-3xl">{item.icon}</span>
            <div className={`font-semibold text-${item.color}-300 mt-2`}>
              {item.label}
            </div>
            <p className={`${mutedText} mt-1`}>{item.desc}</p>
          </FadeInUp>
        ))}
      </div>
      <FadeInUp delay={0.7} className="mt-8">
        <div className="inline-block rounded-xl border border-white/20 bg-white/5 px-6 py-3">
          <span className="text-white/80">
            Agents take notes, raise hands, and follow the rules—without a
            central brain.
          </span>
        </div>
      </FadeInUp>
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
│   1. Selective Memory                   │
│      Agents curate their own context    │
│                                         │
│   2. Dynamic Facilitation               │
│      Interest-based task routing        │
│                                         │
│   3. Deterministic Moderation           │
│      Code-enforced conversation control │
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
  "three-challenges": <ThreeChallengesSlide />,
  "challenge-1-problem": <Challenge1ProblemSlide />,
  "challenge-1-insight": <Challenge1InsightSlide />,
  "challenge-2-problem": <Challenge2ProblemSlide />,
  "challenge-2-insight": <Challenge2InsightSlide />,
  "challenge-3-problem": <Challenge3ProblemSlide />,
  "challenge-3-insight": <Challenge3InsightSlide />,
  "three-patterns": <ThreePatternsSlide />,
  "selective-memory": <SelectiveMemorySlide />,
  "selective-memory-how": <SelectiveMemoryHowSlide />,
  "selective-memory-impl": <SelectiveMemoryImplSlide />,
  "dynamic-facilitation": <DynamicFacilitationSlide />,
  "facilitation-flow": <FacilitationFlowSlide />,
  "dynamic-facilitation-impl": <DynamicFacilitationImplSlide />,
  "deterministic-moderation": <DeterministicModerationSlide />,
  "moderation-gateway": <ModerationGatewaySlide />,
  "deterministic-moderation-impl": <DeterministicModerationImplSlide />,
  "patterns-together": <PatternTogetherSlide />,
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
