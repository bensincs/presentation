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
      "This presentation walks through six iterations of AI Mode — from initial agentic infrastructure to a production-grade, streaming, multi-agent chat experience.",
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
    id: "v1-architecture",
    transition: "slide",
    speakerNotes: [
      "This slide covers the first iteration of AI Mode — the backend, PR #2230, roughly 11k lines across 131 files.",
      "Walk through the layers bottom-up: LLM Provider abstraction at the base, then a Spring-native annotation-driven tool framework, an advisor middleware chain for cross-cutting concerns, and the ReAct agent loop at the top.",
      "The tool framework is the biggest piece — @ToolService classes with @Tool methods auto-register and generate JSON schemas.",
      "The advisor chain handles memory, logging, and metrics as middleware — inspired by Spring AI's pattern but built in-house for tighter control.",
      "Six concrete tools give the agent its capabilities: data search, code generation, data profiling, schema introspection, summarisation, and a clarification tool.",
    ],
  },
  {
    id: "v1-frontend",
    transition: "slide",
    speakerNotes: [
      "This is the frontend half of V1 — PR #3566, ~1.6k lines across 9 files.",
      "The key design decision: flat message store with computed turn grouping. Messages append into a simple array, then a computed property groups them by turnId into structured turns.",
      "Each turn renders as: user message, collapsible 'thinking' section (reasoning + tool calls + results), then the final assistant answer.",
      "Sub-agent support is handled by recursive task subscriptions — when the backend sends an agent_handoff event, the frontend subscribes to that child task's updates in real time.",
      "The isSubAgent flag prevents sub-agent final answers from leaking into the main chat — they appear as tool results in the collapsible section instead.",
      "Optimistic UI: user messages appear instantly with a sending state, then get confirmed when the server echoes back with a turnId.",
      "954 lines of unit tests cover the store logic exhaustively — tool messages, sub-agent workflows, streaming updates, edge cases.",
    ],
  },
  {
    id: "v2-backend",
    transition: "slide",
    speakerNotes: [
      "V2 is the maturity pass — V1 got it working, V2 gets it right. ~4.1k additions across 71 files.",
      "Long conversations no longer break: async summarisation kicks in when the context window fills up, and summarised messages are excluded precisely by ID.",
      "Shared knowledge extracts key facts at the conversation level, bridging the context separation between agents — each agent has its own context via agentType, and shared knowledge connects them without breaking that boundary.",
      "LLM failures no longer crash the conversation: retry with exponential backoff handles rate limits and transient errors automatically.",
      "The agent can now read its own results: structured data and profiles are returned as typed objects with readable content, not opaque blobs.",
      "Search was hardened: 5-year default lookback, bounded result limits, and proper error messages back to the LLM so it can adapt.",
      "New conversation management API: list, load, rename conversations, plus async title generation and suggested follow-up questions.",
    ],
  },
  {
    id: "v2-frontend",
    transition: "slide",
    speakerNotes: [
      "V2 frontend — ~735 additions across 13 files. The big shift: conversations become persistent, first-class entities.",
      "The core refactor: message processing logic extracted from the inline streaming handler into a shared processMessageUpdate() method that serves both real-time streaming and history replay.",
      "New ChatList component — a dropdown conversation switcher with inline rename. Replaces the old simple 'new chat' button.",
      "Suggested questions arrive via the backend's post-completion metadata task and render as clickable pills above the input — auto-sends on click.",
      "Auto-generated conversation titles — after the main response completes, a background task generates a 3-6 word title.",
      "Sub-agent detection simplified: mutable isSubAgent flag replaced with a stateless agentType check per message.",
      "Turn structure gains outerMessages — profiles and search results visible in the main chat area, not just inside the collapsible thinking section.",
    ],
  },
  {
    id: "v3-backend-streaming",
    transition: "slide",
    speakerNotes: [
      "V3 backend part one — the features users can feel. ~4.5k additions across 63 files.",
      "Real-time streaming: the agent loop now streams LLM tokens as they arrive instead of waiting for the full response. A StreamingUpdateHelper manages stable result IDs so the frontend can accumulate chunks without duplication.",
      "The provider layer was rebuilt to support this — OpenAI streaming now forwards content per-token instead of batching on a 500ms timer. Tool calls are accumulated progressively during streaming too, with argument strings concatenated as deltas arrive.",
      "New StreamResult type replaces the old String return from generateStream() — captures content, reasoning, and accumulated tool calls in one object.",
      "Chart tool: the agent can now generate interactive visualizations. A 774-line ChartGenerationTool calls a second LLM with the full TypeScript widget interface spec, and the LLM produces a complete IWidgetConfig. The result payload includes a resultRef pointing to pre-computed query data.",
      "Result data was improved to support this — results now include YAML-formatted metadata with columns, operation IDs, and data sampling when results are too large for the LLM context window (capped at ~3.5KB).",
    ],
  },
  {
    id: "v3-backend-framework",
    transition: "slide",
    speakerNotes: [
      "V3 backend part two — framework maturity. This is the cleanup and consolidation pass.",
      "Tool framework migration: every tool moved from enum-based dispatch to annotation-based. @ToolService classes with @Tool methods now use @ToolMethod and @ToolParam annotations. Boilerplate dropped dramatically — AskTool went from 72 to 30 lines.",
      "The annotation framework itself was improved: @ToolParam now supports array constraints (minItems, maxItems, itemDescription), ToolParameterResolver handles generic types properly (fixing a LinkedHashMap-to-DTO cast bug), and tools can return List<Result> directly.",
      "Advisor consolidation: MemoryAdvisor was deleted entirely (~430 lines). Its responsibilities were absorbed — ContextAdvisor now handles history loading, summary injection, AND shared knowledge injection. SharedKnowledgeAdvisor was simplified to only trigger extraction, no longer injecting into prompts.",
      "Service consolidation: ConversationMessageService was deleted, all message CRUD merged into ConversationService with batch operations and proper cache invalidation.",
      "Legacy cleanup: LlmHelper and LlmParams deleted (~380 lines). All callers now use AiClient directly with new convenience methods like chatWithHistory() and chatWithHistoryAndArtifacts().",
      "New TokenLoggingAdvisor tracks input/output token counts across all LLM calls.",
    ],
  },
  {
    id: "v3-frontend",
    transition: "slide",
    speakerNotes: [
      "V3 frontend — ~400 additions across 22 files. Two headline features: streaming deltas and inline chart rendering.",
      "Streaming: messages now arrive as deltas with a resultId. The chat store looks up existing messages by resultId — if found and delta is true, it appends the chunk. MobX reactivity is triggered by replacing array items (spread into new objects) rather than mutating in place.",
      "Both reasoning tokens and assistant content stream in real-time. A chunkCount tracker on each message enables a debug indicator in the UI.",
      "Chart rendering: when the backend sends a widget result, the chat store builds a full IWidgetConfig, and a new ChatChartWidget component creates a widget store that auto-fetches data via the resultRef. All existing chart types are supported — bar, line, pie, scatter, heatmap, radar, wordcloud.",
      "Turn structure was restructured: the single assistantMessage slot was replaced by outerMessages array, so a turn can now contain multiple assistant responses — e.g., a text answer followed by a chart. TurnMessage.tsx was updated accordingly.",
      "Every chart widget store got defensive .filter(Boolean) guards and empty-field checks for the async fetch window where fields aren't populated yet.",
      "The 941-line test file was deleted because the internal structure changed significantly — streaming deltas, resultId-based lookup, assistantMessage removal all invalidated the existing tests.",
    ],
  },
  {
    id: "v4-backend-capabilities",
    transition: "slide",
    speakerNotes: [
      "V4 backend part two — new platform capabilities that expand what the agent can do.",
      "SurfaceResultTool (89 lines) — paradigm shift: results are no longer auto-displayed. The agent must explicitly call surfaceResultTool to show a result in chat, with optional title and description. This gives the agent control over what the user sees.",
      "ProfileSetTool (361 lines) — full CRUD for profile sets with 7 methods: create, create from schema results, create from search results, list, details, contents, delete.",
      "CdsTool (179 lines) — cross-data-set operations: union, intersection, difference, symmetric difference on profile sets. Both preview and execute modes.",
      "ProgressTool (33 lines) — lightweight tool for real-time progress updates during long operations.",
      "Profile search went async — sync loop replaced with CompletableFuture.allOf() and a 30-second timeout with cancellation. Results now return as List<Result> with YAML content including sampling when >10 profiles.",
      "Five new result types: ResultProfileSet, ResultSchemaDetails, ResultSurface, ResultProgressMessage, ResultOperationPreview. BaseResultRef hierarchy introduced for flexible result referencing.",
    ],
  },
  {
    id: "v4-frontend",
    transition: "slide",
    speakerNotes: [
      "V4 frontend — ~468 additions across 20 files. Three main themes: schema introspection, result surfacing, and a redesigned thinking section.",
      "SchemaCard component (94 lines) — renders schema details inline in chat with a two-column layout: metadata (columns, time fields, table reference) on the left, scrollable field list on the right.",
      "Result surfacing: new surfaceExistingResult() method finds a message by resultId and creates a surfaced duplicate in outerMessages. The surfaced flag controls whether results appear in the thinking section or the main chat area.",
      "Redesigned reasoning and tool messages: replaced the colored backgrounds (blue for reasoning, purple for tool calls, green for results) with unified dark cards. Status icons show clock-circle (orange) for in-progress and check-square (green) for completed. First line rendered as bold title, rest expandable.",
      "Processing state: TurnMessage gets isProcessing prop — shows 'Processing this request may take a moment' label and an animated progress bar. Thinking section auto-shows during processing.",
      "Progress message handler: new result type 'progress_message' rendered as assistant messages in the chat flow.",
    ],
  },
  {
    id: "v5-backend",
    transition: "slide",
    speakerNotes: [
      "V5 backend — ~410 additions across 35 files. A polish and hardening pass focused on reliability and UX details.",
      "Tool display names: every @ToolMethod now carries a displayName annotation — 'Searching profiles', 'Creating chart', etc. A registry lookup feeds these into the frontend so users see human-readable progress instead of method names.",
      "Race condition fix: results were being read from in-memory PipelineContext, but context cleanup could race with result retrieval. Now results are fetched from the database via TaskOperationResultService — no more timing issues.",
      "Sub-agent result filtering: filterSubAgentResults() returns only ResultSurface objects plus the last assistant message. Prevents intermediate execution details from leaking to the parent agent context.",
      "New message tracking: initialMessageCount is captured before the chat session starts — only messages added AFTER that point are returned to the caller. Prevents old ResultSurface from reappearing when sub-agents are invoked.",
      "Retry config tuned: maxAttempts 4→10, initialInterval 2000→500ms, multiplier 2.0→1.5, maxInterval 10000→5000ms. More attempts with a faster start and gentler backoff curve.",
      "Legacy cleanup: messageWindow + summaryPrompt removed from ChatRequest and all Step classes. AgentMetadata and ResultReference classes deleted.",
    ],
  },
  {
    id: "v5-frontend-ux",
    transition: "slide",
    speakerNotes: [
      "V5 frontend part one — the user-facing changes. ~885 additions across 17 files total (split across two slides).",
      "Pill-shaped chat input: the input field goes from rectangular to rounded-full with a three-state adaptive button — Stop (during processing), Send (when there's text), and Mic (empty). Custom SVG icons replace the old Ant Design icons.",
      "Task cancellation: cancelCurrentTask() method supports four reason types — user_initiated, new_prompt, navigation, timeout. Stop button in ChatInput triggers it, and cleanup() fires on unmount to prevent orphaned tasks.",
      "Profile set cards: ProfileSetCard (44 lines) and ProfileSetList (28 lines) render profile set results inline. Click opens the profile set in the case workspace via a registerProfileSet callback.",
      "Debug mode: Cmd+Shift+D toggles coloured metadata badges on every message — role, agent type, resultId, toolCallId, turnId, surfaced direction. Invaluable for debugging the message pipeline.",
    ],
  },
  {
    id: "v5-frontend-architecture",
    transition: "slide",
    speakerNotes: [
      "V5 frontend part two — the architectural rewrites under the hood.",
      "processMessageUpdate major rewrite: the old nested switch/if structure becomes a flat loop over results. Agent-aware routing via an isChatAgent flag, and a chatAgentSurfaceToolCalls Set tracks which agent made surface calls. Tool results are paired with their widget messages in a unified streaming pattern.",
      "onTaskFinished rewrite: instead of processing results inline, the handler now reloads the full chat history from the server. currentReply and currentReplyProgress observables are deleted — the server is the source of truth.",
      "Surfacing model: the old boolean 'surfaced' flag is replaced by surfacedToOuter and surfacedToInner. Chat agent surfaces go to outer (main chat), sub-agent surfaces go to inner (thinking section). This gives precise control over where results appear.",
      "chatTurns simplified: single-pass grouping replaces the old multi-pass sort. No more role-priority sorting, no messageToTurnId map. Simpler and faster.",
      "New message infrastructure: profile_set message role, plus new IChatMessage fields — toolCallId, profileSets, surfacedToOuter, surfacedToInner, agentType.",
      "Removed: ReplyProgress component, currentReply/currentReplyProgress observables, surfaceExistingResult() method (inlined into the new flow).",
    ],
  },
  {
    id: "v6-backend",
    transition: "slide",
    speakerNotes: [
      "V6 backend — ~530 additions across 16 files. Two big reliability themes plus a conversation management feature.",
      "Cooperative cancellation: an AtomicBoolean cancelled signal threads through four layers — OperationLlmAgentFunction wraps execution in a CompletableFuture with 10-minute timeout, ChatRequest carries the flag to LLMAgentHelper, AiClientRequest passes it to DefaultAiClient, and streaming consumers are wrapped to throw CancellationException on next token.",
      "The agent loop checks cancellation before each LLM call, before each tool call, and after each tool call. Sub-task IDs are tracked and cancelled on parent cancellation — no orphaned tasks.",
      "Redis Pub/Sub replaced by Redis Streams for task dispatch. XADD with MAXLEN trimming on the producer side, XREADGROUP with consumer groups on the consumer side. Messages are persisted, load-balanced across instances, and acknowledged only after successful processing.",
      "The old TaskQueuedListener (180 lines, fire-and-forget Pub/Sub) was deleted and replaced by TaskQueuedStreamConsumer (196 lines, at-least-once delivery).",
      "Conversation pin and delete: new REST endpoints, a pinned boolean column with migration, togglePin service method with cache invalidation, and audit logging for both operations.",
    ],
  },
  {
    id: "v6-frontend",
    transition: "slide",
    speakerNotes: [
      "V6 frontend — ~600 additions across 17 files. The chat UI gets a full conversation management overhaul.",
      "Chat History panel: the old ChatList dropdown (122 lines) is replaced by a ChatHistoryDialog side panel (348 lines). Split into pinned 'Important' and 'Recent' sections, with search filtering, relative timestamps, and right-click context menus.",
      "Context menu: ChatContextMenu component with pin/unpin, rename, and delete actions. Rename and delete go through confirmation modals.",
      "Redesigned toolbar: the dropdown-based chat list is gone. New icon buttons for New Chat, Chat History toggle, and Close — all with custom SVG icons and themed hover states.",
      "The chat layout shifted from inline to overlay — an absolute-positioned panel with a side-by-side history drawer, double-bordered with rounded corners.",
      "Microphone error handling improved: proper error messages for missing devices, failed access permissions, and empty transcriptions. WaveSurfer wrapper throws on destroyed instances and missing audio devices.",
    ],
  },
  {
    id: "summary",
    transition: "fade",
    speakerNotes: [
      "Recap the journey: six versions, from a working prototype to a production-grade AI experience inside Synergy.",
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
        cancellation to a production-grade "chat with your data" product.
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

function V1ArchitectureSlide() {
  const layers = [
    {
      label: "LLM Provider",
      color: "cyan",
      detail: "Vendor-abstracted LLM interface with provider registry — OpenAI implementation behind a clean strategy pattern",
    },
    {
      label: "Tool Framework",
      color: "sky",
      detail:
        "Annotation-driven tool system — @ToolService classes with @Tool methods auto-register, generate JSON schemas, and resolve parameters at runtime",
    },
    {
      label: "Advisor Chain",
      color: "blue",
      detail:
        "Middleware pipeline for cross-cutting concerns — conversation memory, logging, and metrics as composable advisors",
    },
    {
      label: "Agent Loop",
      color: "slate",
      detail:
        "ReAct-style loop: send messages + tools to LLM, execute tool calls, append results, repeat until the model returns a final answer",
    },
  ];

  const tools = [
    { name: "SearchTool", desc: "Semantic + keyword search over workspace data" },
    { name: "CodegenTool", desc: "Generates SQL, Python, and chart code via existing Synergy flows" },
    { name: "DcTool", desc: "Data connection introspection — schemas, sample data, column metadata" },
    { name: "ProfileTool", desc: "Statistical profiling of data columns" },
    { name: "SummarizeTool", desc: "LLM-powered summarisation of query results" },
    { name: "AskTool", desc: "Pauses the loop to ask the user a clarifying question" },
  ];

  const colorMap: Record<string, string> = {
    cyan: "border-cyan-400/20 bg-cyan-500/10 text-cyan-300",
    sky: "border-sky-400/20 bg-sky-500/10 text-sky-300",
    blue: "border-blue-400/20 bg-blue-500/10 text-blue-300",
    slate: "border-slate-400/20 bg-slate-500/10 text-slate-300",
  };

  return (
    <div className="h-full px-8 py-6 flex flex-col justify-center">
      <FadeInUp className="mb-5 text-center">
        <h2 className={gradientTitle}>V1 Backend — Agentic Infrastructure</h2>
        <p className="text-base text-[var(--muted)] mt-2">
          ~11k lines across 131 files — a full agentic AI infrastructure layered into Synergy's Java/Spring backend
        </p>
      </FadeInUp>

      <div className="grid gap-5 lg:grid-cols-2 max-w-6xl mx-auto">
        {/* Left column: architecture layers */}
        <div className="space-y-3">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: "easeOut" }}
              className={`rounded-xl border px-4 py-3 ${colorMap[layer.color]}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wide opacity-70">
                  Layer {i + 1}
                </span>
                <span className="font-semibold text-white text-sm">
                  {layer.label}
                </span>
              </div>
              <p className="text-xs text-white/55 leading-relaxed">
                {layer.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Right column: concrete tools */}
        <ScalePop delay={0.35} className={`${surface} space-y-3`}>
          <div className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-1">
            Agent Tools
          </div>
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.07 }}
              className="flex items-start gap-3"
            >
              <code className="shrink-0 rounded-lg bg-sky-500/20 px-2 py-0.5 text-xs text-sky-200 font-mono">
                {tool.name}
              </code>
              <span className="text-xs text-white/55 leading-relaxed">
                {tool.desc}
              </span>
            </motion.div>
          ))}
        </ScalePop>
      </div>
    </div>
  );
}

function V1FrontendSlide() {
  const turnDiagram = `┌──────────────────────────────────┐
│  User Message                    │
├──────────────────────────────────┤
│  ▶ Show thinking (4)             │
│  ┃ Reasoning...                  │
│  ┃ Calling searchTool...         │
│  ┃ Found 12 records              │
│  ┃ Calling profileTool...        │
├──────────────────────────────────┤
│  Assistant Message (final)       │
└──────────────────────────────────┘`;

  const patterns = [
    {
      label: "Flat Store, Computed Turns",
      detail:
        "Messages append to a flat array — simple writes. A computed property groups by turnId into structured turns on read.",
    },
    {
      label: "Recursive Sub-Agent Subscriptions",
      detail:
        "On agent_handoff events, the frontend subscribes to the child task's updates. An isSubAgent flag prevents sub-agent answers leaking into the main chat.",
    },
    {
      label: "Optimistic User Messages",
      detail:
        "User message appears instantly with sending: true, then gets confirmed in-place when the server echoes back with a turnId.",
    },
    {
      label: "Collapsible Thinking",
      detail:
        "Reasoning, tool calls, and tool results are hidden behind a toggle — clean chat with inspectable agent work.",
    },
  ];

  return (
    <div className="h-full px-8 py-6 flex flex-col justify-center">
      <FadeInUp className="mb-5 text-center">
        <h2 className={gradientTitle}>V1 Frontend — Turn-Based Chat UI</h2>
        <p className="text-base text-[var(--muted)] mt-2">
          ~1.6k lines across 9 files — agentic chat experience with real-time
          streaming and sub-agent support
        </p>
      </FadeInUp>

      <div className="grid gap-5 lg:grid-cols-2 max-w-6xl mx-auto">
        {/* Left column: turn structure diagram */}
        <ScalePop delay={0.2} className={`${surface}`}>
          <div className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-3">
            Turn Structure
          </div>
          <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-sky-200/90 overflow-auto whitespace-pre">
            {turnDiagram}
          </pre>
          <p className="text-xs text-white/30 mt-3 text-center">
            Each turn groups a user question + agent work + final answer
          </p>
        </ScalePop>

        {/* Right column: design patterns */}
        <div className="space-y-3">
          {patterns.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.25 + i * 0.1,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="rounded-xl border border-cyan-400/20 bg-cyan-500/8 px-4 py-3"
            >
              <div className="font-semibold text-cyan-200 text-sm mb-1">
                {p.label}
              </div>
              <p className="text-xs text-white/55 leading-relaxed">
                {p.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function V2BackendSlide() {
  const evolutions = [
    { v1: "Fixed context window", v2: "Async summarisation" },
    { v1: "Isolated agent contexts", v2: "Conversation-level shared knowledge" },
    { v1: "Fail on LLM error", v2: "Retry with exponential backoff" },
    { v1: "Opaque tool results", v2: "Typed, self-describing results" },
    { v1: "Unbounded search", v2: "Hardened search with defaults" },
    { v1: "Ephemeral chats", v2: "Conversation management API" },
  ];

  const capabilities = [
    {
      label: "Long Conversation Support",
      detail:
        "Async summarisation kicks in when the context window fills up — conversations no longer break after extended use",
      color: "cyan",
    },
    {
      label: "Conversation-Level Shared Knowledge",
      detail:
        "Key facts extracted at the conversation level, bridging context separation between agents without breaking their individual boundaries",
      color: "sky",
    },
    {
      label: "Resilient LLM Calls",
      detail:
        "Automatic retry with exponential backoff for rate limits and transient failures — errors no longer crash the conversation",
      color: "blue",
    },
    {
      label: "Self-Describing Results",
      detail:
        "Structured data and profiles returned as typed, readable content — the agent can reason about its own query results",
      color: "cyan",
    },
    {
      label: "Hardened Search",
      detail:
        "5-year default lookback, bounded result limits, and clear error messages so the agent can adapt when queries fail",
      color: "sky",
    },
    {
      label: "Conversation Management API",
      detail:
        "List, load, and rename conversations — plus async title generation and suggested follow-up questions",
      color: "blue",
    },
  ];

  const colorMap: Record<string, string> = {
    cyan: "border-cyan-400/20 bg-cyan-500/8",
    sky: "border-sky-400/20 bg-sky-500/8",
    blue: "border-blue-400/20 bg-blue-500/8",
  };

  return (
    <div className="h-full px-8 py-6 flex flex-col justify-center">
      <FadeInUp className="mb-4 text-center">
        <h2 className={gradientTitle}>V2 Backend — Getting It Right</h2>
        <p className="text-base text-[var(--muted)] mt-2">
          ~4.1k lines across 71 files — from working prototype to production-ready agent
        </p>
      </FadeInUp>

      {/* V1 → V2 evolution comparison */}
      <FadeInUp delay={0.15} className="mb-4 max-w-5xl mx-auto w-full">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {evolutions.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 + i * 0.06 }}
              className="text-xs text-white/30"
            >
              <span className="line-through text-white/30">{e.v1}</span>
              <span className="mx-1.5 text-sky-400">→</span>
              <span className="text-sky-200">{e.v2}</span>
            </motion.div>
          ))}
        </div>
      </FadeInUp>

      <div className="grid gap-4 lg:grid-cols-2 max-w-5xl mx-auto">
        {capabilities.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2 + i * 0.08,
              duration: 0.5,
              ease: "easeOut",
            }}
            className={`rounded-xl border px-4 py-3 ${colorMap[c.color]}`}
          >
            <div className="font-semibold text-white text-sm mb-1">
              {c.label}
            </div>
            <p className="text-xs text-white/55 leading-relaxed">{c.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function V2FrontendSlide() {
  const coreRefactor = {
    label: "Shared Message Processing",
    detail:
      "processMessageUpdate() extracted from the inline streaming handler — serves both real-time streaming and history replay with identical logic",
  };

  const features = [
    {
      label: "Persistent Conversations",
      detail:
        "Conversations become first-class entities — list, load, switch, and rename through a new ChatList dropdown",
      color: "cyan",
    },
    {
      label: "Suggested Questions",
      detail:
        "Backend generates follow-up questions as a post-completion metadata task — rendered as clickable pills that auto-send",
      color: "sky",
    },
    {
      label: "Auto-Generated Titles",
      detail:
        "After the main response completes, a background task generates a 3–6 word conversation title",
      color: "blue",
    },
    {
      label: "Simplified Sub-Agent Detection",
      detail:
        "Mutable isSubAgent flag replaced with a stateless agentType check per message — cleaner, no shared state",
      color: "sky",
    },
    {
      label: "Outer Messages in Turns",
      detail:
        "Profiles and search results surface in the main chat area, not buried inside the collapsible thinking section",
      color: "blue",
    },
  ];

  const colorMap: Record<string, string> = {
    cyan: "border-cyan-400/20 bg-cyan-500/8",
    sky: "border-sky-400/20 bg-sky-500/8",
    blue: "border-blue-400/20 bg-blue-500/8",
  };

  return (
    <div className="h-full px-8 py-6 flex flex-col justify-center">
      <FadeInUp className="mb-4 text-center">
        <h2 className={gradientTitle}>V2 Frontend — Persistent Conversations</h2>
        <p className="text-base text-[var(--muted)] mt-2">
          ~735 lines across 13 files — conversations become first-class, replayable entities
        </p>
      </FadeInUp>

      {/* Core refactor callout */}
      <FadeInUp delay={0.15} className="mb-4 max-w-5xl mx-auto w-full">
        <div className="rounded-xl border border-sky-400/25 bg-sky-500/10 px-5 py-3 text-center">
          <div className="text-sm font-semibold text-sky-200 mb-1">
            {coreRefactor.label}
          </div>
          <p className="text-xs text-white/55 leading-relaxed max-w-2xl mx-auto">
            {coreRefactor.detail}
          </p>
        </div>
      </FadeInUp>

      <div className="grid gap-4 lg:grid-cols-3 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: "easeOut" }}
            className={`rounded-xl border px-4 py-3 ${colorMap[f.color]}`}
          >
            <div className="font-semibold text-white text-sm mb-1">{f.label}</div>
            <p className="text-xs text-white/55 leading-relaxed">{f.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function V3BackendStreamingSlide() {
  const evolutions = [
    { v2: "Buffered full responses", v3: "Per-token streaming" },
    { v2: "500ms batched forwarding", v3: "Immediate token delivery" },
    { v2: "String return from LLM", v3: "StreamResult (content + reasoning + tool calls)" },
    { v2: "Static result display", v3: "Chart generation tool" },
  ];

  const features = [
    {
      label: "Real-Time Token Streaming",
      detail:
        "Agent loop streams LLM tokens as they arrive — StreamingUpdateHelper manages stable resultIds so the frontend accumulates chunks without duplication",
      color: "cyan",
    },
    {
      label: "Provider-Level Streaming Overhaul",
      detail:
        "OpenAI streaming forwards content per-token instead of batching on a 500ms timer. Tool calls accumulated progressively with argument strings concatenated as deltas arrive",
      color: "sky",
    },
    {
      label: "Chart Generation Tool",
      detail:
        "774-line ChartGenerationTool calls a second LLM with the full TypeScript widget interface spec — produces a complete IWidgetConfig with a resultRef pointing to pre-computed query data",
      color: "blue",
    },
    {
      label: "Structured Result References",
      detail:
        "Results include YAML-formatted metadata with columns, operation IDs, and data sampling when results exceed ~3.5KB — gives the LLM structured context without blowing up the window",
      color: "cyan",
    },
  ];

  const colorMap: Record<string, string> = {
    cyan: "border-cyan-400/20 bg-cyan-500/8",
    sky: "border-sky-400/20 bg-sky-500/8",
    blue: "border-blue-400/20 bg-blue-500/8",
  };

  return (
    <div className="h-full px-8 py-6 flex flex-col justify-center">
      <FadeInUp className="mb-4 text-center">
        <h2 className={gradientTitle}>V3 Backend — Streaming &amp; Charts</h2>
        <p className="text-base text-[var(--muted)] mt-2">
          ~4.5k lines across 63 files — real-time streaming and interactive visualisations
        </p>
      </FadeInUp>

      {/* V2 → V3 evolution strip */}
      <FadeInUp delay={0.15} className="mb-4 max-w-5xl mx-auto w-full">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {evolutions.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 + i * 0.06 }}
              className="text-xs text-white/30"
            >
              <span className="line-through text-white/30">{e.v2}</span>
              <span className="mx-1.5 text-sky-400">&rarr;</span>
              <span className="text-sky-200">{e.v3}</span>
            </motion.div>
          ))}
        </div>
      </FadeInUp>

      <div className="grid gap-4 lg:grid-cols-2 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: "easeOut" }}
            className={`rounded-xl border px-4 py-3 ${colorMap[f.color]}`}
          >
            <div className="font-semibold text-white text-sm mb-1">{f.label}</div>
            <p className="text-xs text-white/55 leading-relaxed">{f.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function V3BackendFrameworkSlide() {
  const consolidations = [
    { name: "MemoryAdvisor", detail: "~430 lines → absorbed into ContextAdvisor (history + summary + shared knowledge)" },
    { name: "ConversationMessageService", detail: "All message CRUD merged into ConversationService with batch ops" },
    { name: "LlmHelper + LlmParams", detail: "~380 lines deleted — callers use AiClient directly with chatWithHistory()" },
  ];

  const improvements = [
    {
      label: "Annotation-Based Tools",
      detail:
        "@ToolMethod and @ToolParam annotations replace enum-based dispatch — AskTool went from 72 to 30 lines. Boilerplate dropped dramatically across all tools",
      color: "cyan",
    },
    {
      label: "Richer Tool Schemas",
      detail:
        "@ToolParam supports array constraints (minItems, maxItems, itemDescription), generic type resolution fixed, and tools can return List<Result> directly",
      color: "sky",
    },
    {
      label: "Unified Context Building",
      detail:
        "ContextAdvisor now handles history loading, summary injection, AND shared knowledge injection. SharedKnowledgeAdvisor simplified to extraction-only",
      color: "blue",
    },
    {
      label: "Token Observability",
      detail:
        "New TokenLoggingAdvisor tracks input/output token counts across all LLM calls — first step toward cost tracking and optimisation",
      color: "cyan",
    },
  ];

  const colorMap: Record<string, string> = {
    cyan: "border-cyan-400/20 bg-cyan-500/8",
    sky: "border-sky-400/20 bg-sky-500/8",
    blue: "border-blue-400/20 bg-blue-500/8",
  };

  return (
    <div className="h-full px-8 py-6 flex flex-col justify-center">
      <FadeInUp className="mb-4 text-center">
        <h2 className={gradientTitle}>V3 Backend — Framework Maturity</h2>
        <p className="text-base text-[var(--muted)] mt-2">
          Tool migration, advisor consolidation, and legacy cleanup
        </p>
      </FadeInUp>

      {/* Consolidation strip */}
      <FadeInUp delay={0.15} className="mb-4 max-w-5xl mx-auto w-full">
        <div className="space-y-2">
          {consolidations.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="rounded-lg border border-slate-400/20 bg-slate-500/8 px-4 py-2 flex items-start gap-3"
            >
              <span className="shrink-0 text-xs font-semibold text-slate-300 uppercase tracking-wide mt-0.5">Deleted</span>
              <div>
                <span className="text-sm font-semibold text-white/80">{c.name}</span>
                <span className="text-xs text-white/30 ml-2">{c.detail}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </FadeInUp>

      <div className="grid gap-4 lg:grid-cols-2 max-w-5xl mx-auto">
        {improvements.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: "easeOut" }}
            className={`rounded-xl border px-4 py-3 ${colorMap[f.color]}`}
          >
            <div className="font-semibold text-white text-sm mb-1">{f.label}</div>
            <p className="text-xs text-white/55 leading-relaxed">{f.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function V3FrontendSlide() {
  const features = [
    {
      label: "Streaming Delta Protocol",
      detail:
        "Messages arrive with resultId + delta flag — existing messages found by resultId get chunks appended. Array items replaced (not mutated) to trigger MobX reactivity",
      color: "cyan",
    },
    {
      label: "Inline Chart Rendering",
      detail:
        "ChatChartWidget creates a widget store from the backend's widgetConfig + resultRef, auto-fetches pre-computed data, and renders any chart type inline",
      color: "sky",
    },
    {
      label: "Multi-Message Turns",
      detail:
        "Single assistantMessage slot replaced by outerMessages array — a turn can now hold a text response followed by a chart, or multiple responses",
      color: "blue",
    },
    {
      label: "Streaming Reasoning",
      detail:
        "Reasoning tokens stream in real-time alongside content — both use the same resultId-based delta protocol with independent accumulation",
      color: "cyan",
    },
  ];

  const colorMap: Record<string, string> = {
    cyan: "border-cyan-400/20 bg-cyan-500/8",
    sky: "border-sky-400/20 bg-sky-500/8",
    blue: "border-blue-400/20 bg-blue-500/8",
  };

  return (
    <div className="h-full px-8 py-6 flex flex-col justify-center">
      <FadeInUp className="mb-4 text-center">
        <h2 className={gradientTitle}>V3 Frontend — Streaming &amp; Charts</h2>
        <p className="text-base text-[var(--muted)] mt-2">
          ~400 lines across 22 files — real-time token streaming and interactive visualisations in chat
        </p>
      </FadeInUp>

      {/* Streaming pipeline callout */}
      <FadeInUp delay={0.15} className="mb-4 max-w-5xl mx-auto w-full">
        <div className="rounded-xl border border-sky-400/25 bg-sky-500/10 px-5 py-3 text-center">
          <div className="text-sm font-semibold text-sky-200 mb-1">
            End-to-End Streaming Pipeline
          </div>
          <p className="text-xs text-white/55 leading-relaxed max-w-3xl mx-auto">
            Backend streams per-token → WebSocket delivers deltas → chat store appends by resultId → UI re-renders incrementally
          </p>
        </div>
      </FadeInUp>

      <div className="grid gap-4 lg:grid-cols-2 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.08, duration: 0.5, ease: "easeOut" }}
            className={`rounded-xl border px-4 py-3 ${colorMap[f.color]}`}
          >
            <div className="font-semibold text-white text-sm mb-1">{f.label}</div>
            <p className="text-xs text-white/55 leading-relaxed">{f.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function V4BackendCapabilitiesSlide() {
  const newTools = [
    { name: "SurfaceResultTool", lines: "89", purpose: "Explicit result surfacing with title & description" },
    { name: "ProfileSetTool", lines: "361", purpose: "Full CRUD for profile sets (7 methods)" },
    { name: "CdsTool", lines: "179", purpose: "Set operations: union, intersection, difference" },
    { name: "ProgressTool", lines: "33", purpose: "Real-time progress updates during long operations" },
  ];

  const features = [
    {
      label: "Explicit Result Surfacing",
      detail:
        "Results no longer auto-display — the agent decides what the user sees by calling surfaceResultTool with optional title and description",
      color: "sky",
    },
    {
      label: "Async Profile Search",
      detail:
        "Synchronous loop replaced with CompletableFuture.allOf() — parallel execution with 30-second timeout and cancellation support",
      color: "blue",
    },
    {
      label: "Rich Result Type Hierarchy",
      detail:
        "5 new result types (ProfileSet, SchemaDetails, Surface, ProgressMessage, OperationPreview) with BaseResultRef base class for flexible referencing",
      color: "cyan",
    },
  ];

  const colorMap: Record<string, string> = {
    cyan: "border-cyan-400/20 bg-cyan-500/8",
    sky: "border-sky-400/20 bg-sky-500/8",
    blue: "border-blue-400/20 bg-blue-500/8",
  };

  return (
    <div className="h-full px-8 py-6 flex flex-col justify-center">
      <FadeInUp className="mb-4 text-center">
        <h2 className={gradientTitle}>V4 Backend — New Capabilities</h2>
        <p className="text-base text-[var(--muted)] mt-2">
          Four new tools expand what the agent can do — and control how results reach the user
        </p>
      </FadeInUp>

      {/* New tools strip */}
      <FadeInUp delay={0.15} className="mb-4 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {newTools.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="rounded-lg border border-teal-400/20 bg-teal-500/8 px-3 py-2 text-center"
            >
              <div className="text-xs font-semibold text-teal-200">{t.name}</div>
              <div className="text-[10px] text-white/40 mt-0.5">{t.lines} lines</div>
              <div className="text-[10px] text-white/30 mt-1">{t.purpose}</div>
            </motion.div>
          ))}
        </div>
      </FadeInUp>

      <div className="grid gap-4 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.08, duration: 0.5, ease: "easeOut" }}
            className={`rounded-xl border px-4 py-3 ${colorMap[f.color]}`}
          >
            <div className="font-semibold text-white text-sm mb-1">{f.label}</div>
            <p className="text-xs text-white/55 leading-relaxed">{f.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function V4FrontendSlide() {
  const features = [
    {
      label: "Schema Introspection Cards",
      detail:
        "New SchemaCard component renders schema details inline — two-column layout with metadata on the left and a scrollable field list on the right",
      color: "cyan",
    },
    {
      label: "Explicit Result Surfacing",
      detail:
        "surfaceExistingResult() finds messages by resultId and creates surfaced duplicates — the surfaced flag controls whether results appear in thinking or the main chat",
      color: "sky",
    },
    {
      label: "Redesigned Thinking Section",
      detail:
        "Unified dark cards replace colored backgrounds — status icons (clock for in-progress, check for completed) with bold title line and expandable content",
      color: "blue",
    },
    {
      label: "Processing State & Progress",
      detail:
        "TurnMessage shows a 'Processing...' label and animated progress bar while the agent works — thinking section auto-expands during processing",
      color: "cyan",
    },
  ];

  const colorMap: Record<string, string> = {
    cyan: "border-cyan-400/20 bg-cyan-500/8",
    sky: "border-sky-400/20 bg-sky-500/8",
    blue: "border-blue-400/20 bg-blue-500/8",
  };

  return (
    <div className="h-full px-8 py-6 flex flex-col justify-center">
      <FadeInUp className="mb-4 text-center">
        <h2 className={gradientTitle}>V4 Frontend — Surfacing &amp; Polish</h2>
        <p className="text-base text-[var(--muted)] mt-2">
          ~468 lines across 20 files — the agent controls what the user sees
        </p>
      </FadeInUp>

      {/* Paradigm shift callout */}
      <FadeInUp delay={0.15} className="mb-4 max-w-5xl mx-auto w-full">
        <div className="rounded-xl border border-sky-400/25 bg-sky-500/10 px-5 py-3 text-center">
          <div className="text-sm font-semibold text-sky-200 mb-1">
            From Auto-Display to Agent-Controlled Surfacing
          </div>
          <p className="text-xs text-white/55 leading-relaxed max-w-3xl mx-auto">
            Results live in the thinking section by default — only explicitly surfaced results appear in the main chat, giving the agent full control over the user experience
          </p>
        </div>
      </FadeInUp>

      <div className="grid gap-4 lg:grid-cols-2 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.08, duration: 0.5, ease: "easeOut" }}
            className={`rounded-xl border px-4 py-3 ${colorMap[f.color]}`}
          >
            <div className="font-semibold text-white text-sm mb-1">{f.label}</div>
            <p className="text-xs text-white/55 leading-relaxed">{f.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function V5BackendSlide() {
  const evolutions = [
    { v4: "Method names in UI", v5: "Human-readable display names" },
    { v4: "In-memory result reads", v5: "Database-backed retrieval" },
    { v4: "Full sub-agent context leaks", v5: "Filtered result passback" },
    { v4: "4 retries, 2s start", v5: "10 retries, 500ms start" },
  ];


  const features = [
    {
      label: "Tool Display Names",
      detail:
        "Every @ToolMethod gains a displayName annotation — 'Searching profiles', 'Creating chart'. A registry lookup feeds human-readable names to the frontend for live progress",
      color: "cyan",
    },
    {
      label: "Race Condition Fix",
      detail:
        "Results now retrieved from the database (TaskOperationResultService) instead of in-memory PipelineContext — eliminates timing issues with context cleanup",
      color: "sky",
    },
    {
      label: "Sub-Agent Result Filtering",
      detail:
        "filterSubAgentResults() returns only ResultSurface objects + last assistant message — intermediate execution details no longer leak to the parent agent",
      color: "blue",
    },
    {
      label: "New Message Tracking",
      detail:
        "initialMessageCount captured before chat session — only NEW messages returned to the caller, preventing old ResultSurface from reappearing in sub-agent calls",
      color: "cyan",
    },
  ];

  const colorMap: Record<string, string> = {
    cyan: "border-cyan-400/20 bg-cyan-500/8",
    sky: "border-sky-400/20 bg-sky-500/8",
    blue: "border-blue-400/20 bg-blue-500/8",
  };

  return (
    <div className="h-full px-8 py-6 flex flex-col justify-center">
      <FadeInUp className="mb-4 text-center">
        <h2 className={gradientTitle}>V5 Backend — Hardening &amp; Polish</h2>
        <p className="text-base text-[var(--muted)] mt-2">
          ~410 lines across 35 files — reliability, UX polish, and clean sub-agent boundaries
        </p>
      </FadeInUp>

      {/* V4 → V5 evolution strip */}
      <FadeInUp delay={0.15} className="mb-3 max-w-5xl mx-auto w-full">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {evolutions.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 + i * 0.06 }}
              className="text-xs text-white/30"
            >
              <span className="line-through text-white/30">{e.v4}</span>
              <span className="mx-1.5 text-sky-400">&rarr;</span>
              <span className="text-sky-200">{e.v5}</span>
            </motion.div>
          ))}
        </div>
      </FadeInUp>


      <div className="grid gap-4 lg:grid-cols-2 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.08, duration: 0.5, ease: "easeOut" }}
            className={`rounded-xl border px-4 py-3 ${colorMap[f.color]}`}
          >
            <div className="font-semibold text-white text-sm mb-1">{f.label}</div>
            <p className="text-xs text-white/55 leading-relaxed">{f.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function V5FrontendUXSlide() {
  const features = [
    {
      label: "Pill-Shaped Chat Input",
      detail:
        "Rounded-full input field with a three-state adaptive button: Stop (processing), Send (has text), Mic (empty). Custom SVG icons replace Ant Design components",
      color: "cyan",
    },
    {
      label: "Task Cancellation",
      detail:
        "cancelCurrentTask() with four reason types — user_initiated, new_prompt, navigation, timeout. Stop button in input, cleanup() on unmount prevents orphaned tasks",
      color: "sky",
    },
    {
      label: "Profile Set Cards",
      detail:
        "ProfileSetCard + ProfileSetList render profile sets inline in chat. Click opens the profile set in the case workspace via registerProfileSet callback",
      color: "blue",
    },
    {
      label: "Debug Mode",
      detail:
        "Cmd+Shift+D toggles coloured metadata badges on every message — role, agent type, resultId, toolCallId, turnId, surfaced direction",
      color: "cyan",
    },
  ];

  const colorMap: Record<string, string> = {
    cyan: "border-cyan-400/20 bg-cyan-500/8",
    sky: "border-sky-400/20 bg-sky-500/8",
    blue: "border-blue-400/20 bg-blue-500/8",
  };

  return (
    <div className="h-full px-8 py-6 flex flex-col justify-center">
      <FadeInUp className="mb-4 text-center">
        <h2 className={gradientTitle}>V5 Frontend — UX &amp; Interaction</h2>
        <p className="text-base text-[var(--muted)] mt-2">
          ~885 lines across 17 files — refined input experience, cancellation, and developer tooling
        </p>
      </FadeInUp>

      {/* Input state callout */}
      <FadeInUp delay={0.15} className="mb-4 max-w-5xl mx-auto w-full">
        <div className="rounded-xl border border-sky-400/25 bg-sky-500/10 px-5 py-3">
          <div className="flex items-center justify-center gap-8">
            {[
              { state: "Empty", icon: "Mic", desc: "Voice input" },
              { state: "Typing", icon: "Send", desc: "Submit prompt" },
              { state: "Processing", icon: "Stop", desc: "Cancel task" },
            ].map((s, i) => (
              <motion.div
                key={s.state}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-sm font-semibold text-sky-200">{s.icon}</div>
                <div className="text-[10px] text-white/40 mt-0.5">{s.state}</div>
                <div className="text-[10px] text-white/30">{s.desc}</div>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-white/30 text-center mt-2">
            Adaptive input button — three states, one control
          </p>
        </div>
      </FadeInUp>

      <div className="grid gap-4 lg:grid-cols-2 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: "easeOut" }}
            className={`rounded-xl border px-4 py-3 ${colorMap[f.color]}`}
          >
            <div className="font-semibold text-white text-sm mb-1">{f.label}</div>
            <p className="text-xs text-white/55 leading-relaxed">{f.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function V5FrontendArchitectureSlide() {
  const evolutions = [
    { v4: "Nested switch/if processing", v5: "Flat loop with agent-aware routing" },
    { v4: "Inline result processing on finish", v5: "Reload full history from server" },
    { v4: "Boolean surfaced flag", v5: "surfacedToOuter / surfacedToInner" },
    { v4: "Multi-pass turn sorting", v5: "Single-pass grouping" },
  ];


  const features = [
    {
      label: "processMessageUpdate Rewrite",
      detail:
        "Flat loop over results with agent-aware routing (isChatAgent flag). chatAgentSurfaceToolCalls Set tracks surface calls, paired tool_result + widget messages in a unified streaming pattern",
      color: "cyan",
    },
    {
      label: "Server as Source of Truth",
      detail:
        "onTaskFinished reloads full chat history from the server instead of processing results inline — currentReply and currentReplyProgress observables deleted entirely",
      color: "sky",
    },
    {
      label: "Directional Surfacing Model",
      detail:
        "surfacedToOuter (chat agent → main chat) and surfacedToInner (sub-agent → thinking section) replace the old boolean — precise control over where each result appears",
      color: "blue",
    },
    {
      label: "Simplified Turn Grouping",
      detail:
        "chatTurns becomes single-pass grouping — no role-priority sorting, no messageToTurnId map. New profile_set message role and fields: toolCallId, profileSets, agentType",
      color: "cyan",
    },
  ];

  const colorMap: Record<string, string> = {
    cyan: "border-cyan-400/20 bg-cyan-500/8",
    sky: "border-sky-400/20 bg-sky-500/8",
    blue: "border-blue-400/20 bg-blue-500/8",
  };

  return (
    <div className="h-full px-8 py-6 flex flex-col justify-center">
      <FadeInUp className="mb-4 text-center">
        <h2 className={gradientTitle}>V5 Frontend — Architecture Rewrite</h2>
        <p className="text-base text-[var(--muted)] mt-2">
          Message processing, surfacing model, and turn grouping rebuilt from scratch
        </p>
      </FadeInUp>

      {/* V4 → V5 evolution strip */}
      <FadeInUp delay={0.15} className="mb-3 max-w-5xl mx-auto w-full">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {evolutions.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 + i * 0.06 }}
              className="text-xs text-white/30"
            >
              <span className="line-through text-white/30">{e.v4}</span>
              <span className="mx-1.5 text-sky-400">&rarr;</span>
              <span className="text-sky-200">{e.v5}</span>
            </motion.div>
          ))}
        </div>
      </FadeInUp>

      <div className="grid gap-4 lg:grid-cols-2 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.08, duration: 0.5, ease: "easeOut" }}
            className={`rounded-xl border px-4 py-3 ${colorMap[f.color]}`}
          >
            <div className="font-semibold text-white text-sm mb-1">{f.label}</div>
            <p className="text-xs text-white/55 leading-relaxed">{f.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function V6BackendSlide() {
  const evolutions = [
    { v5: "No cancellation support", v6: "Cooperative cancellation through 4 layers" },
    { v5: "Redis Pub/Sub (fire-and-forget)", v6: "Redis Streams (at-least-once delivery)" },
    { v5: "Ephemeral task notifications", v6: "Persistent, load-balanced dispatch" },
  ];

  const features = [
    {
      label: "Cooperative Cancellation Framework",
      detail:
        "AtomicBoolean signal threads from task executor → agent loop → AI client → streaming consumers. Checks before each LLM call, before/after each tool call. Sub-tasks tracked and cancelled on parent cancellation",
      color: "cyan",
    },
    {
      label: "Streaming Cancellation",
      detail:
        "Content and reasoning consumers wrapped to throw CancellationException on next token. 10-minute CompletableFuture timeout as safety net. CancellationException is non-retryable — returns immediately",
      color: "sky",
    },
    {
      label: "Conversation Pin & Delete",
      detail:
        "New REST endpoints with audit logging — toggle pin state and delete conversations. Pinned column with DB migration, cache invalidation on toggle",
      color: "cyan",
    },
  ];

  const colorMap: Record<string, string> = {
    cyan: "border-cyan-400/20 bg-cyan-500/8",
    sky: "border-sky-400/20 bg-sky-500/8",
    blue: "border-blue-400/20 bg-blue-500/8",
  };

  return (
    <div className="h-full px-8 py-6 flex flex-col justify-center">
      <FadeInUp className="mb-4 text-center">
        <h2 className={gradientTitle}>V6 Backend — Cancellation &amp; Reliability</h2>
        <p className="text-base text-[var(--muted)] mt-2">
          ~530 lines across 16 files — cooperative cancellation, durable task dispatch, and conversation management
        </p>
      </FadeInUp>

      {/* V5 → V6 evolution strip */}
      <FadeInUp delay={0.15} className="mb-4 max-w-5xl mx-auto w-full">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {evolutions.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 + i * 0.06 }}
              className="text-xs text-white/30"
            >
              <span className="line-through text-white/30">{e.v5}</span>
              <span className="mx-1.5 text-sky-400">&rarr;</span>
              <span className="text-sky-200">{e.v6}</span>
            </motion.div>
          ))}
        </div>
      </FadeInUp>

      <div className="grid gap-4 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: "easeOut" }}
            className={`rounded-xl border px-4 py-3 ${colorMap[f.color]}`}
          >
            <div className="font-semibold text-white text-sm mb-1">{f.label}</div>
            <p className="text-xs text-white/55 leading-relaxed">{f.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function V6FrontendSlide() {
  const features = [
    {
      label: "Chat History Panel",
      detail:
        "348-line ChatHistoryDialog replaces the 122-line dropdown. Side panel with search, pinned 'Important' section and chronological 'Recent' section, relative timestamps, and right-click context menus",
      color: "cyan",
    },
    {
      label: "Conversation Management",
      detail:
        "Context menu with pin/unpin, rename, and delete — each with confirmation modals. Delete removes from list and starts new chat if active. Pin toggles via backend API",
      color: "sky",
    },
    {
      label: "Redesigned Toolbar",
      detail:
        "Dropdown-based chat list replaced by icon buttons — New Chat, Chat History toggle, and Close. Custom SVG icons with themed hover states and active indicators",
      color: "blue",
    },
  ];

  const colorMap: Record<string, string> = {
    cyan: "border-cyan-400/20 bg-cyan-500/8",
    sky: "border-sky-400/20 bg-sky-500/8",
    blue: "border-blue-400/20 bg-blue-500/8",
  };

  return (
    <div className="h-full px-8 py-6 flex flex-col justify-center">
      <FadeInUp className="mb-4 text-center">
        <h2 className={gradientTitle}>V6 Frontend — Chat History &amp; Management</h2>
        <p className="text-base text-[var(--muted)] mt-2">
          ~600 lines across 17 files — full conversation management overhaul
        </p>
      </FadeInUp>

      {/* Paradigm callout */}
      <FadeInUp delay={0.15} className="mb-4 max-w-5xl mx-auto w-full">
        <div className="rounded-xl border border-sky-400/25 bg-sky-500/10 px-5 py-3 text-center">
          <div className="text-sm font-semibold text-sky-200 mb-1">
            From Dropdown to Side Panel
          </div>
          <p className="text-xs text-white/55 leading-relaxed max-w-3xl mx-auto">
            Conversation switching moves from a compact dropdown to a persistent, searchable history panel
            with pinned conversations and right-click context menus
          </p>
        </div>
      </FadeInUp>

      <div className="grid gap-4 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.08, duration: 0.5, ease: "easeOut" }}
            className={`rounded-xl border px-4 py-3 ${colorMap[f.color]}`}
          >
            <div className="font-semibold text-white text-sm mb-1">{f.label}</div>
            <p className="text-xs text-white/55 leading-relaxed">{f.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SummarySlide() {
  const tracks = [
    {
      title: "Backend Journey",
      milestones: [
        { version: "V1", label: "Agentic infrastructure + tool framework" },
        { version: "V2", label: "Summarisation, shared knowledge, resilience" },
        { version: "V3", label: "Per-token streaming + chart generation" },
        { version: "V4", label: "Agent-controlled surfacing + new tools" },
        { version: "V5", label: "Display names, race fixes, sub-agent filtering" },
        { version: "V6", label: "Cooperative cancellation + Redis Streams" },
      ],
      gradient: "from-cyan-400 to-sky-500",
    },
    {
      title: "Frontend Journey",
      milestones: [
        { version: "V1", label: "Turn-based chat with sub-agent support" },
        { version: "V2", label: "Persistent conversations + history replay" },
        { version: "V3", label: "Streaming deltas + inline chart rendering" },
        { version: "V4", label: "Schema cards + result surfacing redesign" },
        { version: "V5", label: "Cancellation, debug mode, architecture rewrite" },
        { version: "V6", label: "Chat history panel + conversation management" },
      ],
      gradient: "from-sky-400 to-blue-500",
    },
  ];

  return (
    <div className="h-full px-8 py-6 flex flex-col justify-center">
      <FadeInUp className="mb-6 text-center">
        <h2 className={gradientTitle}>Summary</h2>
        <p className="text-lg text-[var(--muted)] mt-3 max-w-3xl mx-auto">
          Six versions — from working prototype to production-grade AI
          experience
        </p>
      </FadeInUp>

      <div className="grid gap-6 lg:grid-cols-2 max-w-6xl mx-auto">
        {tracks.map((track, trackIdx) => (
          <ScalePop
            key={track.title}
            delay={0.2 + trackIdx * 0.12}
            className={`${surface} space-y-3`}
          >
            <h3
              className={`text-lg font-bold bg-gradient-to-r ${track.gradient} bg-clip-text text-transparent`}
            >
              {track.title}
            </h3>
            <div className="space-y-2">
              {track.milestones.map((m, i) => (
                <motion.div
                  key={m.version}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + trackIdx * 0.12 + i * 0.06 }}
                  className="flex items-start gap-3"
                >
                  <span className="shrink-0 rounded-md bg-sky-500/20 px-2 py-0.5 text-xs font-semibold text-sky-300">
                    {m.version}
                  </span>
                  <span className="text-xs text-white/55 leading-relaxed">
                    {m.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </ScalePop>
        ))}
      </div>

      <FadeInUp delay={0.7} className="mt-6 max-w-3xl mx-auto text-center">
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
  "v1-architecture": <V1ArchitectureSlide />,
  "v1-frontend": <V1FrontendSlide />,
  "v2-backend": <V2BackendSlide />,
  "v2-frontend": <V2FrontendSlide />,
  "v3-backend-streaming": <V3BackendStreamingSlide />,
  "v3-backend-framework": <V3BackendFrameworkSlide />,
  "v3-frontend": <V3FrontendSlide />,
  "v4-backend-capabilities": <V4BackendCapabilitiesSlide />,
  "v4-frontend": <V4FrontendSlide />,
  "v5-backend": <V5BackendSlide />,
  "v5-frontend-ux": <V5FrontendUXSlide />,
  "v5-frontend-architecture": <V5FrontendArchitectureSlide />,
  "v6-backend": <V6BackendSlide />,
  "v6-frontend": <V6FrontendSlide />,
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
