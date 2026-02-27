import React from "react";
import { motion } from "framer-motion";
import type { DeckComponentProps, SlideMeta } from "../../types";

/* ── shared style tokens ─────────────────────────────────────────────── */

const gradientTitle =
  "text-5xl font-bold bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent pb-1";
const surface =
  "surface rounded-2xl border border-white/5 bg-white/5 px-6 py-5 shadow-lg shadow-black/20";
const mutedText = "text-sm text-[var(--muted)] leading-relaxed";

/* ── motion helpers ──────────────────────────────────────────────────── */

type MotionBlockProps = {
  delay?: number;
  className?: string;
  children?: React.ReactNode;
};

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

/* ── slide metadata ──────────────────────────────────────────────────── */

export const synergyAIModeSlides: SlideMeta[] = [
  {
    id: "title",
    transition: "fade",
    speakerNotes: [
      "Open by framing the engagement: Presight partnered with Microsoft ISE to bring conversational AI into their Synergy analytics platform.",
      "This presentation walks through six iterations of AI Mode — from initial agentic infrastructure to a polished, streaming, multi-agent chat experience.",
      "Emphasise the dual-track nature: every version covers both backend (Java/Spring) and frontend (React/MobX) work in parallel.",
    ],
  },
  {
    id: "engagement-scope",
    transition: "fade",
    speakerNotes: [
      "Set the scene: Presight came to Microsoft ISE with a clear ask — bring AI into Synergy.",
      "Synergy is their existing analytics platform; users wanted a conversational 'chat with your data' experience.",
      "Two key deliverables: an agentic loop wired into their task execution framework, and tool-based data analysis through long-running background tasks.",
      "Emphasise we were building on top of their existing infrastructure, not replacing it.",
    ],
  },
  {
    id: "v1",
    transition: "slide",
    speakerNotes: [
      "V1 is the foundation — both backend and frontend built from scratch in parallel.",
      "Backend: four architectural layers — LLM Provider abstraction, annotation-driven tool framework (@ToolService + @Tool), advisor middleware chain (memory, logging, metrics), and a ReAct agent loop at the top.",
      "Six tools give the agent its capabilities: data search, code generation, data profiling, schema introspection, summarisation, and a clarification tool.",
      "Frontend: flat message store with computed turn grouping — messages append to an array, a computed property groups by turnId into structured turns.",
      "Each turn renders as: user message, collapsible thinking section (reasoning + tool calls + results), then the final assistant answer.",
      "Sub-agent support via recursive task subscriptions — isSubAgent flag prevents child answers from leaking into the main chat.",
      "Optimistic UI: user messages appear instantly with sending state, confirmed when the server echoes back with a turnId.",
    ],
  },
  {
    id: "v2",
    transition: "slide",
    speakerNotes: [
      "V2 is the maturity pass — V1 got it working, V2 gets it right.",
      "Backend: async summarisation handles long conversations, shared knowledge bridges agent context boundaries, retry with exponential backoff for LLM resilience, typed self-describing tool results, hardened search defaults, and a new conversation management API.",
      "Frontend: conversations become persistent first-class entities. processMessageUpdate() extracted to serve both streaming and history replay.",
      "New ChatList dropdown with inline rename, suggested follow-up questions as clickable pills, auto-generated conversation titles, stateless agentType check replacing mutable isSubAgent flag.",
      "Turn structure gains outerMessages — profiles and search results visible in the main chat area, not just inside thinking.",
    ],
  },
  {
    id: "v3",
    transition: "slide",
    speakerNotes: [
      "V3 has three themes: real-time streaming, chart generation, and framework consolidation.",
      "Backend streaming: agent loop streams LLM tokens as they arrive. OpenAI provider rebuilt for per-token delivery (was 500ms batched). New StreamResult type captures content + reasoning + tool calls. Structured resultRefs link charts to pre-computed data.",
      "Chart tool: ChartGenerationTool calls a second LLM with the TypeScript widget spec, produces IWidgetConfig with resultRef to pre-computed data.",
      "Framework maturity: all tools migrated to @ToolMethod/@ToolParam annotations. MemoryAdvisor deleted — ContextAdvisor absorbs history, summary, and shared knowledge. ConversationMessageService merged into ConversationService. LlmHelper deleted — AiClient used directly. Token observability added per-call.",
      "Frontend streaming: messages arrive as deltas with resultId — chat store appends chunks via resultId lookup. MobX reactivity via array item replacement. Reasoning tokens stream into thinking section in real time.",
      "Inline chart rendering: ChatChartWidget creates widget stores from backend widgetConfig + resultRef. outerMessages array replaces single assistantMessage slot for multi-response turns.",
    ],
  },
  {
    id: "v4",
    transition: "slide",
    speakerNotes: [
      "V4 expands what the agent can do and how results reach the user.",
      "Backend: SurfaceResultTool is the paradigm shift — results no longer auto-display, the agent explicitly surfaces them. ProfileSetTool adds full CRUD, CdsTool adds set operations, ProgressTool provides real-time updates.",
      "Async profile search with CompletableFuture.allOf() and 30-second timeout. Five new result types with BaseResultRef hierarchy.",
      "Frontend: SchemaCard renders schema details inline (two-column layout). surfaceExistingResult() creates surfaced duplicates in outerMessages.",
      "Redesigned thinking section: unified dark cards with status icons replacing colored backgrounds. Processing state with animated progress bar and auto-expanding thinking section.",
    ],
  },
  {
    id: "v5",
    transition: "slide",
    speakerNotes: [
      "V5 is a hardening and polish pass across the full stack.",
      "Backend: tool display names for human-readable progress, race condition fix (database-backed result retrieval), sub-agent result filtering, new message tracking to prevent stale ResultSurface, tuned retry config (10 attempts, 500ms start).",
      "Frontend UX: pill-shaped input with three-state adaptive button (Stop/Send/Mic), task cancellation with four reason types, profile set cards with expandable rows, Cmd+Shift+D debug mode with metadata badges.",
      "Frontend architecture rewrite: processMessageUpdate becomes a flat loop with agent-aware routing, onTaskFinished reloads full history from server (server as source of truth), surfacedToOuter/surfacedToInner replaces boolean surfaced flag, single-pass turn grouping.",
    ],
  },
  {
    id: "v6",
    transition: "slide",
    speakerNotes: [
      "V6 is about reliability and conversation management.",
      "Backend: cooperative cancellation via AtomicBoolean through 4 layers (task executor → agent loop → AI client → streaming consumers), checked before/after each LLM and tool call. Sub-tasks tracked and cancelled on parent cancellation.",
      "Redis Pub/Sub replaced by Redis Streams — XADD with MAXLEN, XREADGROUP with consumer groups. At-least-once delivery replaces fire-and-forget.",
      "Conversation pin and delete with REST endpoints, DB migration, cache invalidation, and audit logging.",
      "Frontend: ChatHistoryDialog side panel replaces dropdown — pinned 'Important' section, chronological 'Recent' section, search, relative timestamps, right-click context menus.",
      "Redesigned toolbar with icon buttons. Context menu supports pin/unpin, rename, delete with confirmation modals.",
    ],
  },
  {
    id: "summary",
    transition: "fade",
    speakerNotes: [
      "Recap the journey: six versions, from a working prototype to a fully-featured AI experience inside Synergy.",
      "Backend arc: LLM provider abstraction → annotation-driven tools → streaming → cooperative cancellation → Redis Streams. Each layer built on the last.",
      "Frontend arc: flat message store → persistent conversations → streaming deltas → agent-controlled surfacing → full conversation management.",
      "Key takeaway: iterative delivery with tight backend–frontend pairing at every stage — no big-bang releases.",
    ],
  },
];

/* ── slides ───────────────────────────────────────────────────────────── */

function TitleSlide() {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center p-8">
      <motion.h1
        className="text-[clamp(36px,6vw,72px)] font-extrabold bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent leading-tight"
        initial={{ opacity: 0, scale: 0.88, y: -24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Synergy AI Mode
      </motion.h1>
      <FadeInUp
        delay={0.25}
        className="text-2xl text-[var(--muted)] max-w-3xl tracking-tight mt-4"
      >
        Building a Conversational AI Experience for the Synergy Analytics
        Platform
      </FadeInUp>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {["Presight", "Microsoft ISE", "Agentic AI", "Streaming", "Multi-Agent"].map(
          (tag, index) => (
            <motion.span
              key={tag}
              className="rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/80"
              initial={{ opacity: 0, scale: 0.6, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.35 + index * 0.08, duration: 0.4 }}
            >
              {tag}
            </motion.span>
          )
        )}
      </div>
      <FadeInUp
        delay={0.55}
        className="mt-10 max-w-3xl text-sm text-[var(--muted)] leading-relaxed"
      >
        Six iterations of an agentic chat experience — from initial
        infrastructure through streaming, tool frameworks, and cooperative
        cancellation to a full-featured "chat with your data" experience.
      </FadeInUp>
    </div>
  );
}

function EngagementScopeSlide() {
  const deliverables = [
    {
      label: "Agentic Loop",
      detail:
        "Build an agentic conversation loop into Synergy, leveraging their existing task execution framework",
    },
    {
      label: "Tool-Based Data Analysis",
      detail:
        "Allow the agent to perform data analysis operations through tools that trigger long-running background tasks on their framework",
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-6 text-center">
        <h2 className={gradientTitle}>Engagement Scope</h2>
        <p className="text-lg text-[var(--muted)] mt-3 max-w-3xl mx-auto">
          Introduce an <strong className="text-white/80">AI Mode</strong> to
          Synergy — a "chat with your data" experience powered by an agentic
          backend
        </p>
      </FadeInUp>

      <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto mt-4">
        {deliverables.map((d, i) => (
          <ScalePop
            key={d.label}
            delay={0.25 + i * 0.15}
            className={`${surface} space-y-3`}
          >
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-sky-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-300">
                {i + 1}
              </span>
              <span className="text-lg font-semibold text-white">
                {d.label}
              </span>
            </div>
            <p className={mutedText}>{d.detail}</p>
          </ScalePop>
        ))}
      </div>

      <FadeInUp delay={0.55} className="mt-8 max-w-3xl mx-auto text-center">
        <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-5 py-3">
          <p className="text-sm text-cyan-200">
            Built on top of Synergy's existing task execution framework —
            extending, not replacing
          </p>
        </div>
      </FadeInUp>
    </div>
  );
}

function V1Slide() {
  const items = [
    { tag: "BE", label: "LLM Provider Abstraction", detail: "Vendor-abstracted interface with provider registry — OpenAI behind a clean strategy pattern" },
    { tag: "BE", label: "Annotation-Driven Tool Framework", detail: "@ToolService classes with @Tool methods auto-register, generate JSON schemas, and resolve parameters at runtime" },
    { tag: "BE", label: "Advisor Middleware Chain", detail: "Composable pipeline for conversation memory, logging, and metrics as cross-cutting concerns" },
    { tag: "BE", label: "ReAct Agent Loop", detail: "Send messages + tools to LLM, execute tool calls, append results, repeat until final answer" },
    { tag: "FE", label: "Flat Store, Computed Turns", detail: "Messages append to a flat array — a computed property groups by turnId into structured turns on read" },
    { tag: "FE", label: "Recursive Sub-Agent Subscriptions", detail: "On agent_handoff, subscribe to child task updates. isSubAgent flag prevents answers leaking into main chat" },
    { tag: "FE", label: "Optimistic User Messages", detail: "Messages appear instantly with sending state, confirmed when the server echoes back with a turnId" },
    { tag: "FE", label: "Collapsible Thinking", detail: "Reasoning, tool calls, and results hidden behind a toggle — clean chat with inspectable agent work" },
  ];

  const tools = [
    { name: "SearchTool", desc: "Semantic + keyword search over workspace data" },
    { name: "CodegenTool", desc: "Generate code from natural language" },
    { name: "DcTool", desc: "Data profiling & column statistics" },
    { name: "ProfileTool", desc: "Schema introspection for datasets" },
    { name: "SummarizeTool", desc: "Summarise long results for context" },
    { name: "AskTool", desc: "Clarify ambiguous user requests" },
  ];

  return (
    <div className="h-full px-8 py-4 flex flex-col justify-center">
      <FadeInUp className="mb-3 text-center">
        <h2 className={gradientTitle}>V1 — Agentic Foundation</h2>
        <p className="text-base text-[var(--muted)] mt-1">
          Full agentic infrastructure layered into Synergy's Java/Spring backend with a turn-based React chat UI
        </p>
      </FadeInUp>

      {/* Turn Structure */}
      <FadeInUp delay={0.1} className="max-w-6xl mx-auto mb-2 w-full text-center">
        <div className="text-[10px] font-semibold uppercase tracking-wide text-sky-400 mb-1.5">Turn Structure</div>
        <div className="flex items-center justify-center gap-1.5 text-[10px]">
          {[
            { label: "User message", color: "text-white/60" },
            { label: "Thinking", color: "text-white/40" },
            { label: "Tool calls", color: "text-cyan-300/60" },
            { label: "Answer", color: "text-sky-300/70" },
          ].map((step, i, arr) => (
            <span key={step.label} className="flex items-center gap-1.5">
              <span className={`rounded-md border border-white/10 bg-white/5 px-2 py-0.5 ${step.color}`}>{step.label}</span>
              {i < arr.length - 1 && <span className="text-white/20">→</span>}
            </span>
          ))}
        </div>
      </FadeInUp>

      {/* Tools */}
      <FadeInUp delay={0.15} className="max-w-6xl mx-auto mb-3 w-full text-center">
        <div className="text-[10px] font-semibold uppercase tracking-wide text-cyan-400 mb-1.5">6 Tools</div>
        <div className="flex flex-wrap justify-center gap-1.5">
          {tools.map((t) => (
            <span key={t.name} className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 border border-cyan-400/15 px-2.5 py-1">
              <code className="text-[10px] text-cyan-200 font-mono">{t.name}</code>
              <span className="text-[9px] text-white/30">{t.desc}</span>
            </span>
          ))}
        </div>
      </FadeInUp>

      <div className="grid gap-1.5 lg:grid-cols-2 max-w-6xl mx-auto">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05, duration: 0.45, ease: "easeOut" }}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2"
          >
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${item.tag === "BE" ? "bg-cyan-500/20 text-cyan-300" : "bg-sky-500/20 text-sky-300"}`}>{item.tag}</span>
              <span className="font-semibold text-white text-sm">{item.label}</span>
            </div>
            <p className="text-xs text-white/55 leading-relaxed">{item.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function V2Slide() {
  const evolutions = [
    { before: "Fixed context window", after: "Async summarisation" },
    { before: "Isolated agent contexts", after: "Shared knowledge" },
    { before: "Fail on LLM error", after: "Retry with backoff" },
    { before: "Ephemeral chats", after: "Persistent conversations" },
  ];

  const items = [
    { tag: "BE", label: "Long Conversation Support", detail: "Async summarisation when context window fills — conversations no longer break after extended use" },
    { tag: "BE", label: "Shared Knowledge", detail: "Key facts extracted at conversation level, bridging context separation between agents" },
    { tag: "BE", label: "Resilient LLM Calls", detail: "Retry with exponential backoff for rate limits and transient failures" },
    { tag: "BE", label: "Self-Describing Results", detail: "Tool results carry their own type metadata — consumers render without switch statements" },
    { tag: "BE", label: "Hardened Search", detail: "Default filters, null-safe parsing, and graceful fallbacks for empty or malformed results" },
    { tag: "BE", label: "Conversation Management API", detail: "REST endpoints for create, list, rename, and delete conversations with persistent history" },
    { tag: "FE", label: "Shared Message Processing", detail: "processMessageUpdate() serves both real-time streaming and history replay with identical logic" },
    { tag: "FE", label: "Conversation Management", detail: "ChatList dropdown with inline rename and auto-generated titles" },
    { tag: "FE", label: "Suggested Questions", detail: "Clickable follow-up pills generated after each answer — one-tap continuation of the conversation" },
    { tag: "FE", label: "Outer Messages in Turns", detail: "Profiles and search results surface in the main chat area, not buried inside thinking" },
    { tag: "FE", label: "Stateless Sub-Agent Detection", detail: "agentType check replaces mutable isSubAgent flag — no state to reset, no stale flags" },
  ];

  return (
    <div className="h-full px-8 py-4 flex flex-col justify-center">
      <FadeInUp className="mb-2 text-center">
        <h2 className={gradientTitle}>V2 — Getting It Right</h2>
        <p className="text-base text-[var(--muted)] mt-1">
          From working prototype to robust, well-structured agent with persistent conversations
        </p>
      </FadeInUp>

      {/* Evolution strip */}
      <FadeInUp delay={0.1} className="mb-3 max-w-5xl mx-auto w-full">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
          {evolutions.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="text-xs text-white/30"
            >
              <span className="line-through text-white/30">{e.before}</span>
              <span className="mx-1.5 text-sky-400">&rarr;</span>
              <span className="text-sky-200">{e.after}</span>
            </motion.div>
          ))}
        </div>
      </FadeInUp>

      <div className="grid gap-1.5 lg:grid-cols-2 max-w-6xl mx-auto">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.04, duration: 0.45, ease: "easeOut" }}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2"
          >
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${item.tag === "BE" ? "bg-cyan-500/20 text-cyan-300" : "bg-sky-500/20 text-sky-300"}`}>{item.tag}</span>
              <span className="font-semibold text-white text-sm">{item.label}</span>
            </div>
            <p className="text-xs text-white/55 leading-relaxed">{item.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function V3Slide() {
  const evolutions = [
    { before: "Buffered full responses", after: "Per-token streaming" },
    { before: "Enum-based tool dispatch", after: "Annotation-based tools" },
    { before: "Static result display", after: "Chart generation tool" },
    { before: "Separate advisors", after: "Unified ContextAdvisor" },
  ];

  const items = [
    { tag: "BE", label: "Real-Time Token Streaming", detail: "Agent loop streams tokens as they arrive — StreamingUpdateHelper manages stable resultIds for chunk accumulation" },
    { tag: "BE", label: "Provider-Level Streaming Overhaul", detail: "OpenAI provider rebuilt for per-token delivery (was 500ms batched). New StreamResult type captures content + reasoning + tool calls" },
    { tag: "BE", label: "Chart Generation Tool", detail: "Calls a second LLM with the TypeScript widget spec, produces IWidgetConfig with resultRef to pre-computed data" },
    { tag: "BE", label: "Structured Result References", detail: "resultRef links chart widgets to pre-computed datasets — decouples visualisation from data fetching" },
    { tag: "BE", label: "Richer Tool Schemas", detail: "@ToolMethod/@ToolParam annotations replace enums — JSON schemas auto-generated, parameter validation at runtime" },
    { tag: "BE", label: "Token Observability", detail: "Per-call token counts tracked through the advisor chain — visibility into LLM usage and cost" },
    { tag: "FE", label: "Streaming Delta Protocol", detail: "Messages arrive with resultId + delta flag — existing messages found by resultId get chunks appended via MobX-reactive replacement" },
    { tag: "FE", label: "Streaming Reasoning", detail: "Reasoning tokens stream into the thinking section in real time — visible thought process as the agent works" },
    { tag: "FE", label: "Inline Chart Rendering", detail: "ChatChartWidget creates widget stores from widgetConfig + resultRef, auto-fetches data, renders any chart type inline" },
    { tag: "FE", label: "Multi-Message Turns", detail: "outerMessages array replaces single assistantMessage slot — turns can hold text + chart or multiple responses" },
  ];

  const consolidation = [
    { name: "MemoryAdvisor", note: "absorbed into ContextAdvisor" },
    { name: "ConversationMessageService", note: "merged into ConversationService" },
    { name: "LlmHelper", note: "replaced by direct AiClient usage" },
  ];

  return (
    <div className="h-full px-8 py-4 flex flex-col justify-center">
      <FadeInUp className="mb-2 text-center">
        <h2 className={gradientTitle}>V3 — Streaming, Charts &amp; Consolidation</h2>
        <p className="text-base text-[var(--muted)] mt-1">
          Real-time token streaming, interactive visualisations, and framework maturity
        </p>
      </FadeInUp>

      {/* Evolution strip */}
      <FadeInUp delay={0.1} className="mb-2 max-w-5xl mx-auto w-full">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
          {evolutions.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="text-xs text-white/30"
            >
              <span className="line-through text-white/30">{e.before}</span>
              <span className="mx-1.5 text-sky-400">&rarr;</span>
              <span className="text-sky-200">{e.after}</span>
            </motion.div>
          ))}
        </div>
      </FadeInUp>

      {/* Pipeline callout */}
      <FadeInUp delay={0.15} className="mb-2 max-w-5xl mx-auto w-full">
        <div className="rounded-xl border border-sky-400/25 bg-sky-500/10 px-5 py-2 text-center">
          <p className="text-xs text-white/55 leading-relaxed">
            Backend streams per-token &rarr; WebSocket delivers deltas &rarr; chat store appends by resultId &rarr; UI re-renders incrementally
          </p>
        </div>
      </FadeInUp>

      <div className="grid gap-1.5 lg:grid-cols-2 max-w-6xl mx-auto">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.04, duration: 0.45, ease: "easeOut" }}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-1.5"
          >
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${item.tag === "BE" ? "bg-cyan-500/20 text-cyan-300" : "bg-sky-500/20 text-sky-300"}`}>{item.tag}</span>
              <span className="font-semibold text-white text-sm">{item.label}</span>
            </div>
            <p className="text-[11px] text-white/55 leading-relaxed">{item.detail}</p>
          </motion.div>
        ))}
      </div>

      {/* Consolidation strip */}
      <FadeInUp delay={0.6} className="mt-2 flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
        {consolidation.map((c) => (
          <div key={c.name} className="rounded-md bg-red-500/10 border border-red-400/20 px-2 py-0.5">
            <span className="text-[10px] text-red-300/70 line-through font-mono">{c.name}</span>
            <span className="text-[9px] text-white/30 ml-1">{c.note}</span>
          </div>
        ))}
      </FadeInUp>
    </div>
  );
}

function V4Slide() {
  const newTools = [
    { name: "SurfaceResultTool", purpose: "Explicit result surfacing" },
    { name: "ProfileSetTool", purpose: "Full CRUD (7 methods)" },
    { name: "CdsTool", purpose: "Set operations on profiles" },
    { name: "ProgressTool", purpose: "Real-time progress" },
  ];

  const items = [
    { tag: "BE", label: "Agent-Controlled Surfacing", detail: "Results no longer auto-display — the agent explicitly calls surfaceResultTool to show results with optional title and description" },
    { tag: "BE", label: "Rich Result Type Hierarchy", detail: "Five new result types (Profile, Schema, Chart, DataSet, Summary) with BaseResultRef hierarchy and polymorphic serialisation" },
    { tag: "BE", label: "Async Profile Search", detail: "CompletableFuture.allOf() with 30-second timeout replaces sync loop — parallel searches across data sources" },
    { tag: "FE", label: "Schema Introspection Cards", detail: "SchemaCard renders schema details inline — two-column layout with metadata and a scrollable field list" },
    { tag: "FE", label: "Explicit Result Surfacing", detail: "surfaceExistingResult() creates cloned entries in outerMessages — agent controls what the user sees in the main chat" },
    { tag: "FE", label: "Processing State & Progress", detail: "Animated progress bar with real-time tool status. Thinking section auto-expands during processing, collapses on completion" },
    { tag: "FE", label: "Redesigned Thinking Section", detail: "Unified dark cards with status icons replace colored backgrounds — consistent visual language across tool types" },
  ];

  return (
    <div className="h-full px-8 py-4 flex flex-col justify-center">
      <FadeInUp className="mb-2 text-center">
        <h2 className={gradientTitle}>V4 — New Capabilities &amp; Surfacing</h2>
        <p className="text-base text-[var(--muted)] mt-1">
          Four new tools expand the agent's abilities — and it controls how results reach the user
        </p>
      </FadeInUp>

      {/* New tools strip */}
      <FadeInUp delay={0.1} className="mb-3 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {newTools.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              className="rounded-lg border border-teal-400/20 bg-teal-500/8 px-3 py-1.5 text-center"
            >
              <div className="text-xs font-semibold text-teal-200">{t.name}</div>
              <div className="text-[10px] text-white/30 mt-0.5">{t.purpose}</div>
            </motion.div>
          ))}
        </div>
      </FadeInUp>

      {/* Paradigm callout */}
      <FadeInUp delay={0.2} className="mb-3 max-w-5xl mx-auto w-full">
        <div className="rounded-xl border border-sky-400/25 bg-sky-500/10 px-5 py-2 text-center">
          <p className="text-xs text-white/55 leading-relaxed">
            Results live in the thinking section by default — only explicitly surfaced results appear in the main chat
          </p>
        </div>
      </FadeInUp>

      <div className="grid gap-1.5 lg:grid-cols-2 max-w-6xl mx-auto">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.05, duration: 0.45, ease: "easeOut" }}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2"
          >
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${item.tag === "BE" ? "bg-cyan-500/20 text-cyan-300" : "bg-sky-500/20 text-sky-300"}`}>{item.tag}</span>
              <span className="font-semibold text-white text-sm">{item.label}</span>
            </div>
            <p className="text-xs text-white/55 leading-relaxed">{item.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function V5Slide() {
  const evolutions = [
    { before: "Method names in UI", after: "Display names" },
    { before: "In-memory result reads", after: "Database-backed" },
    { before: "Boolean surfaced flag", after: "surfacedToOuter/Inner" },
    { before: "Multi-pass turn sorting", after: "Single-pass grouping" },
  ];

  const items = [
    { tag: "BE", label: "Tool Display Names", detail: "Every @ToolMethod gains a displayName — human-readable progress instead of method names" },
    { tag: "BE", label: "Race Condition Fix", detail: "Results from database (TaskOperationResultService) instead of in-memory PipelineContext — no timing issues" },
    { tag: "BE", label: "Sub-Agent Result Filtering", detail: "filterSubAgentResults() returns only ResultSurface + last assistant message — no context leaks" },
    { tag: "BE", label: "New Message Tracking", detail: "Prevents stale ResultSurface — only results from the current turn are eligible for surfacing" },
    { tag: "FE", label: "Pill-Shaped Input", detail: "Three-state adaptive button: Stop (during processing), Send (with text), Mic (empty input)" },
    { tag: "FE", label: "Task Cancellation", detail: "cancelCurrentTask() with four reason types (user, timeout, error, system) prevents orphaned tasks" },
    { tag: "FE", label: "Profile Set Cards", detail: "Rich cards for profile set results — expandable rows with metadata, inline actions, and count badges" },
    { tag: "FE", label: "Debug Mode", detail: "Cmd+Shift+D toggles metadata badges on messages — turnId, resultId, message type, and timestamps visible" },
    { tag: "FE", label: "Architecture Rewrite", detail: "processMessageUpdate becomes flat loop with agent-aware routing. onTaskFinished reloads from server — server as source of truth" },
    { tag: "FE", label: "Directional Surfacing", detail: "surfacedToOuter (main chat) and surfacedToInner (thinking) replace boolean flag. Single-pass turn grouping" },
  ];

  return (
    <div className="h-full px-8 py-4 flex flex-col justify-center">
      <FadeInUp className="mb-2 text-center">
        <h2 className={gradientTitle}>V5 — Hardening &amp; Architecture Rewrite</h2>
        <p className="text-base text-[var(--muted)] mt-1">
          Reliability fixes, UX polish, and a ground-up frontend architecture rebuild
        </p>
      </FadeInUp>

      {/* Evolution strip */}
      <FadeInUp delay={0.1} className="mb-3 max-w-5xl mx-auto w-full">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
          {evolutions.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="text-xs text-white/30"
            >
              <span className="line-through text-white/30">{e.before}</span>
              <span className="mx-1.5 text-sky-400">&rarr;</span>
              <span className="text-sky-200">{e.after}</span>
            </motion.div>
          ))}
        </div>
      </FadeInUp>

      <div className="grid gap-1.5 lg:grid-cols-2 max-w-6xl mx-auto">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.04, duration: 0.45, ease: "easeOut" }}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-1.5"
          >
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${item.tag === "BE" ? "bg-cyan-500/20 text-cyan-300" : "bg-sky-500/20 text-sky-300"}`}>{item.tag}</span>
              <span className="font-semibold text-white text-sm">{item.label}</span>
            </div>
            <p className="text-[11px] text-white/55 leading-relaxed">{item.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function V6Slide() {
  const evolutions = [
    { before: "No cancellation", after: "Cooperative cancellation (4 layers)" },
    { before: "Redis Pub/Sub", after: "Redis Streams (at-least-once)" },
    { before: "Dropdown chat list", after: "Searchable history panel" },
  ];

  const items = [
    { tag: "BE", label: "Cooperative Cancellation", detail: "AtomicBoolean signal threads from task executor through agent loop, AI client, to streaming consumers. Sub-tasks tracked and cancelled on parent cancellation" },
    { tag: "BE", label: "Streaming Cancellation", detail: "Cancellation checked before and after each LLM call and tool execution — mid-stream abort with clean resource cleanup" },
    { tag: "BE", label: "Redis Streams", detail: "XADD with MAXLEN, XREADGROUP with consumer groups — persistent, load-balanced, at-least-once delivery replaces fire-and-forget Pub/Sub" },
    { tag: "BE", label: "Conversation Pin & Delete", detail: "REST endpoints with audit logging, DB migration, cache invalidation on pin toggle" },
    { tag: "FE", label: "Chat History Panel", detail: "ChatHistoryDialog side panel with pinned 'Important' section, chronological 'Recent', search, and relative timestamps" },
    { tag: "FE", label: "Conversation Management", detail: "Right-click context menus with pin/unpin, rename, and delete — each with confirmation modals" },
    { tag: "FE", label: "Redesigned Toolbar", detail: "Dropdown replaced by icon buttons — New Chat, Chat History toggle, and Close with themed hover states" },
  ];

  return (
    <div className="h-full px-8 py-4 flex flex-col justify-center">
      <FadeInUp className="mb-2 text-center">
        <h2 className={gradientTitle}>V6 — Cancellation &amp; Chat Management</h2>
        <p className="text-base text-[var(--muted)] mt-1">
          Cooperative cancellation, durable task dispatch, and a full conversation management overhaul
        </p>
      </FadeInUp>

      {/* Evolution strip */}
      <FadeInUp delay={0.1} className="mb-2 max-w-5xl mx-auto w-full">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
          {evolutions.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="text-xs text-white/30"
            >
              <span className="line-through text-white/30">{e.before}</span>
              <span className="mx-1.5 text-sky-400">&rarr;</span>
              <span className="text-sky-200">{e.after}</span>
            </motion.div>
          ))}
        </div>
      </FadeInUp>

      {/* Paradigm callout: Dropdown → Side Panel */}
      <FadeInUp delay={0.15} className="mb-3 max-w-5xl mx-auto w-full">
        <div className="rounded-xl border border-sky-400/25 bg-sky-500/10 px-5 py-2 text-center">
          <p className="text-xs text-white/55 leading-relaxed">
            From dropdown to side panel — conversation history becomes a persistent, searchable workspace rather than a transient menu
          </p>
        </div>
      </FadeInUp>

      <div className="grid gap-1.5 lg:grid-cols-2 max-w-6xl mx-auto">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05, duration: 0.45, ease: "easeOut" }}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2"
          >
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${item.tag === "BE" ? "bg-cyan-500/20 text-cyan-300" : "bg-sky-500/20 text-sky-300"}`}>{item.tag}</span>
              <span className="font-semibold text-white text-sm">{item.label}</span>
            </div>
            <p className="text-xs text-white/55 leading-relaxed">{item.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SummarySlide() {
  const versions: { version: string; title: string; items: { tag: "BE" | "FE"; text: string }[] }[] = [
    {
      version: "V1",
      title: "Agentic Foundation",
      items: [
        { tag: "BE", text: "LLM provider abstraction" },
        { tag: "BE", text: "Annotation-driven tool framework" },
        { tag: "BE", text: "Advisor chain & ReAct agent loop" },
        { tag: "BE", text: "6 tools" },
        { tag: "FE", text: "Turn-based chat UI" },
        { tag: "FE", text: "Flat store with computed turns" },
        { tag: "FE", text: "Sub-agent subscriptions" },
        { tag: "FE", text: "Optimistic messages & collapsible thinking" },
      ],
    },
    {
      version: "V2",
      title: "Getting It Right",
      items: [
        { tag: "BE", text: "Async summarisation & shared knowledge" },
        { tag: "BE", text: "Retry with backoff" },
        { tag: "BE", text: "Self-describing results & hardened search" },
        { tag: "BE", text: "Conversation management API" },
        { tag: "FE", text: "Persistent conversations" },
        { tag: "FE", text: "Shared message processing" },
        { tag: "FE", text: "Suggested questions & outer messages" },
        { tag: "FE", text: "Stateless sub-agent detection" },
      ],
    },
    {
      version: "V3",
      title: "Streaming, Charts & Consolidation",
      items: [
        { tag: "BE", text: "Per-token streaming & provider overhaul" },
        { tag: "BE", text: "Chart generation" },
        { tag: "BE", text: "Structured result references & richer tool schemas" },
        { tag: "BE", text: "Token observability" },
        { tag: "FE", text: "Streaming delta protocol & reasoning" },
        { tag: "FE", text: "Inline chart rendering" },
        { tag: "FE", text: "Multi-message turns" },
      ],
    },
    {
      version: "V4",
      title: "New Capabilities & Surfacing",
      items: [
        { tag: "BE", text: "SurfaceResultTool, ProfileSetTool, CdsTool, ProgressTool" },
        { tag: "BE", text: "Rich result type hierarchy" },
        { tag: "BE", text: "Async profile search" },
        { tag: "FE", text: "Schema cards & explicit result surfacing" },
        { tag: "FE", text: "Processing state & progress" },
        { tag: "FE", text: "Redesigned thinking section" },
      ],
    },
    {
      version: "V5",
      title: "Hardening & Architecture Rewrite",
      items: [
        { tag: "BE", text: "Tool display names & race condition fix" },
        { tag: "BE", text: "Sub-agent result filtering" },
        { tag: "BE", text: "New message tracking" },
        { tag: "FE", text: "Pill-shaped input & task cancellation" },
        { tag: "FE", text: "Profile set cards & debug mode" },
        { tag: "FE", text: "Architecture rewrite & directional surfacing" },
      ],
    },
    {
      version: "V6",
      title: "Cancellation & Chat Management",
      items: [
        { tag: "BE", text: "Cooperative cancellation (4 layers)" },
        { tag: "BE", text: "Streaming cancellation & Redis Streams" },
        { tag: "BE", text: "Conversation pin & delete" },
        { tag: "FE", text: "Chat history side panel" },
        { tag: "FE", text: "Context menus & redesigned toolbar" },
      ],
    },
  ];

  return (
    <div className="h-full px-8 py-5 flex flex-col justify-center">
      <FadeInUp className="mb-5 text-center">
        <h2 className={gradientTitle}>Summary</h2>
        <p className="text-lg text-[var(--muted)] mt-2 max-w-3xl mx-auto">
          Six versions — from working prototype to full-featured AI experience
        </p>
      </FadeInUp>

      <div className="grid gap-3 lg:grid-cols-2 max-w-6xl mx-auto">
        {versions.map((v, i) => (
          <motion.div
            key={v.version}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: "easeOut" }}
            className={`${surface} py-3 px-4`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="shrink-0 rounded-md bg-sky-500/20 px-2 py-0.5 text-xs font-bold text-sky-300">
                {v.version}
              </span>
              <span className="text-sm font-semibold text-white">{v.title}</span>
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {v.items.map((item, j) => (
                <span key={j} className="inline-flex items-center gap-1 text-[11px] text-white/50 leading-relaxed">
                  <span
                    className={`shrink-0 rounded px-1 py-px text-[9px] font-bold uppercase leading-none ${
                      item.tag === "BE"
                        ? "bg-cyan-500/20 text-cyan-300"
                        : "bg-sky-500/20 text-sky-300"
                    }`}
                  >
                    {item.tag}
                  </span>
                  {item.text}
                  {j < v.items.length - 1 && <span className="text-white/20 ml-0.5">·</span>}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <FadeInUp delay={0.7} className="mt-4 max-w-3xl mx-auto text-center">
        <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-5 py-3">
          <p className="text-sm text-cyan-200">
            Iterative delivery with tight backend–frontend pairing at every
            stage — no big-bang releases
          </p>
        </div>
      </FadeInUp>
    </div>
  );
}

/* ── slide map & deck component ──────────────────────────────────────── */

const slideMap: Record<string, React.ReactNode> = {
  "title": <TitleSlide />,
  "engagement-scope": <EngagementScopeSlide />,
  "v1": <V1Slide />,
  "v2": <V2Slide />,
  "v3": <V3Slide />,
  "v4": <V4Slide />,
  "v5": <V5Slide />,
  "v6": <V6Slide />,
  "summary": <SummarySlide />,
};

export default function SynergyAIModeDeck({ slide }: DeckComponentProps) {
  const content = slideMap[slide.id] ?? (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold">{slide.id}</h2>
        <p className="mt-2 text-[var(--muted)]">Slide content coming soon</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-hidden">{content}</div>
    </div>
  );
}
