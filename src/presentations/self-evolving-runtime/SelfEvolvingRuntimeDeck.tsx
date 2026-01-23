import React from "react";
import { motion } from "framer-motion";
import type { DeckComponentProps, SlideMeta } from "../../types";

const gradientTitle =
  "text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent pb-1";
const surface =
  "surface rounded-2xl border border-white/5 bg-white/5 px-6 py-5 shadow-lg shadow-black/20";
const mutedText = "text-sm text-[var(--muted)] leading-relaxed";
const pill =
  "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/70";

export const selfEvolvingRuntimeSlides: SlideMeta[] = [
  {
    id: "title",
    transition: "fade",
    speakerNotes: [
      "Open by framing the problem: agents either have too many tools or ephemeral code.",
      "Introduce the core idea: agents that remember and reuse their own code.",
      "Set expectations: two patterns — vector search for tools and persistent capabilities.",
    ],
  },
  {
    id: "problem-tools",
    transition: "slide",
    speakerNotes: [
      "Too many tools leads to decision paralysis — agents struggle with 50+ tools.",
      "Performance degrades as context becomes overloaded.",
      "Common workaround is giving agents minimal toolsets, but that limits capability.",
    ],
  },
  {
    id: "problem-coding",
    transition: "slide",
    speakerNotes: [
      "Coding agents write ephemeral code — same task, different code each run.",
      "What should be deterministic becomes probabilistic.",
      "No learning between sessions — agents start from scratch every time.",
    ],
  },
  {
    id: "core-idea",
    transition: "scale",
    speakerNotes: [
      "The key insight: what if agents could remember and reuse their own code?",
      "Instead of generate-execute-discard, we want find-or-generate-then-reuse.",
      "Compiled code stored permanently, retrievable via vector similarity.",
    ],
  },
  {
    id: "solution",
    transition: "slide",
    speakerNotes: [
      "A capability is working code the agent wrote, compiled to WASM.",
      "Stored with metadata and embeddings for retrieval.",
      "WASM provides portability and sandboxing.",
    ],
  },
  {
    id: "architecture",
    transition: "slide",
    speakerNotes: [
      "Walk through the architecture: task comes in, embed it, vector search for capabilities.",
      "Agent loop sees task plus top-k relevant capabilities.",
      "Two choices: run existing capability or mutate to create new one.",
    ],
  },
  {
    id: "pattern1-intro",
    transition: "slide",
    speakerNotes: [
      "Pattern 1: Vector search for tool selection.",
      "Dumping all tools into context doesn't scale.",
      "Solution: RAG for tools, not documents — embed task, find nearest capabilities.",
    ],
  },
  {
    id: "pattern1-how",
    transition: "slide",
    speakerNotes: [
      "Walk through the flow: embed task, cosine similarity search, return top-k.",
      "Agent only sees 2 relevant tools instead of 50.",
      "Focused choices instead of decision paralysis.",
    ],
  },
  {
    id: "pattern1-code",
    transition: "slide",
    speakerNotes: [
      "Show the capability index implementation.",
      "Simple HashMap of id to embedding vectors.",
      "Score all capabilities, sort by similarity, return top-k.",
    ],
  },
  {
    id: "pattern1-benefits",
    transition: "slide",
    speakerNotes: [
      "Compare before and after: O(n) context vs O(1) fixed k.",
      "Automatic retrieval replaces manual tool curation.",
      "Decision paralysis eliminated with focused choices.",
    ],
  },
  {
    id: "pattern2-intro",
    transition: "slide",
    speakerNotes: [
      "Pattern 2: Persistent code as capabilities.",
      "Agent-written code is typically ephemeral — that's the problem.",
      "Solution: treat working code as a first-class artifact.",
    ],
  },
  {
    id: "pattern2-lifecycle",
    transition: "slide",
    speakerNotes: [
      "Show the capability lifecycle: new task, check if exists, run or mutate.",
      "If capability exists, execute WASM deterministically.",
      "If not, LLM writes code, compile to WASM, store and index.",
    ],
  },
  {
    id: "pattern2-structure",
    transition: "slide",
    speakerNotes: [
      "What's in a capability: id, summary for embedding, binary path.",
      "Summary is human-readable, used for vector search.",
      "Binary is the compiled WASM executable.",
    ],
  },
  {
    id: "pattern2-wasm",
    transition: "slide",
    speakerNotes: [
      "Show WASM execution: load module, set up sandboxed I/O, run deterministically.",
      "Input via stdin, output via stdout — clean JSON interface.",
      "Same input always produces same output.",
    ],
  },
  {
    id: "pattern2-why-wasm",
    transition: "slide",
    speakerNotes: [
      "Why WASM: sandboxed, deterministic, portable, fast, language-agnostic.",
      "Capabilities can't escape their box — security by default.",
      "Runs anywhere Wasmtime runs.",
    ],
  },
  {
    id: "pattern2-mutation",
    transition: "slide",
    speakerNotes: [
      "Walk through mutation flow when no capability exists.",
      "Copy parent capability, LLM modifies code, compile, store, reload index.",
      "Agent can immediately use the new capability.",
    ],
  },
  {
    id: "agent-loop",
    transition: "slide",
    speakerNotes: [
      "Show the agent loop: build context with only relevant capabilities.",
      "Agent must use run_capability or mutate_capability.",
      "Loop until final answer.",
    ],
  },
  {
    id: "two-tools",
    transition: "scale",
    speakerNotes: [
      "Key insight: agent only needs two tools — run and mutate.",
      "Everything else is encoded in capabilities.",
      "No explicit search, API, or DB tools — they're all capabilities.",
    ],
  },
  {
    id: "example-run",
    transition: "slide",
    speakerNotes: [
      "Walk through example: What's John's salary?",
      "Embed, search, find capability, run WASM, return answer.",
      "Fully deterministic — same task tomorrow produces identical path.",
    ],
  },
  {
    id: "example-mutate",
    transition: "slide",
    speakerNotes: [
      "Walk through mutation example: salary in GBP instead of USD.",
      "Find closest capability, try it, doesn't work, mutate to add conversion.",
      "Tomorrow the new capability is already available.",
    ],
  },
  {
    id: "what-enables",
    transition: "slide",
    speakerNotes: [
      "Short-term: deterministic execution, reduced LLM calls, better tool selection.",
      "Long-term: agents accumulate skills, organizational knowledge in capabilities.",
      "Less hallucination — execute stored code, don't guess.",
    ],
  },
  {
    id: "summary",
    transition: "fade",
    speakerNotes: [
      "Recap pattern 1: vector search for tool selection, RAG for tools.",
      "Recap pattern 2: persistent code as WASM capabilities.",
      "Deterministic reuse beats probabilistic regeneration.",
    ],
  },
  {
    id: "vision",
    transition: "scale",
    speakerNotes: [
      "The vision: agents that learn skills through experience.",
      "Code reuse instead of hallucination.",
      "Skill accumulation over long horizons.",
    ],
  },
  {
    id: "links",
    transition: "slide",
    speakerNotes: [
      "Point to the GitHub repository.",
      "Stack: Rust + Wasmtime, Azure OpenAI for embeddings, WASM for execution.",
      "Encourage folks to explore and contribute.",
    ],
  },
  {
    id: "questions",
    transition: "fade",
    speakerNotes: [
      "Open the floor for questions.",
      "Recap: vector search for tools, persistent WASM capabilities.",
      "Learning agents that accumulate skills over time.",
    ],
  },
];

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
        className="text-[clamp(36px,6vw,72px)] font-extrabold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent leading-tight"
        initial={{ opacity: 0, scale: 0.88, y: -24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Self-Evolving Agent Runtime
      </motion.h1>
      <FadeInUp
        delay={0.25}
        className="text-2xl text-[var(--muted)] max-w-3xl tracking-tight mt-4"
      >
        Learning, Deterministic Agents via Persistent Capabilities
      </FadeInUp>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {["WASM", "Vector Search", "Capabilities", "Deterministic"].map(
          (tag, index) => (
            <motion.span
              key={tag}
              className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/80"
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
        Two patterns that let agents accumulate skills over time: vector search
        for intelligent tool selection, and persistent WASM capabilities for
        deterministic code reuse.
      </FadeInUp>
    </div>
  );
}

function ProblemToolsSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>The Problem with Tool-Heavy Agents</h2>
      </FadeInUp>
      <ScalePop
        delay={0.2}
        className={`${surface} max-w-3xl mx-auto space-y-6`}
      >
        <div className="text-2xl font-bold text-rose-400 text-center">
          Too many tools → decision paralysis
        </div>
        <ul className="space-y-4">
          {[
            "Agents struggle to choose correctly when given 50+ tools",
            "Performance degrades as context becomes overloaded",
            "Common workaround: give agents minimal toolsets",
          ].map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={`${mutedText} flex items-start gap-3`}
            >
              <span className="text-rose-400">•</span>
              {item}
            </motion.li>
          ))}
        </ul>
      </ScalePop>
    </div>
  );
}

function ProblemCodingSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>The Problem with Coding Agents</h2>
      </FadeInUp>
      <ScalePop
        delay={0.2}
        className={`${surface} max-w-3xl mx-auto space-y-6`}
      >
        <div className="text-2xl font-bold text-rose-400 text-center">
          Ephemeral code → probabilistic behavior
        </div>
        <ul className="space-y-4">
          {[
            "Agents write code on-the-fly to solve tasks",
            "Same task → different code each run",
            "What should be deterministic becomes a dice roll",
            "No learning between sessions",
          ].map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={`${mutedText} flex items-start gap-3`}
            >
              <span className="text-rose-400">•</span>
              {item}
            </motion.li>
          ))}
        </ul>
      </ScalePop>
    </div>
  );
}

function CoreIdeaSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center items-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>The Core Idea</h2>
      </FadeInUp>
      <ScalePop delay={0.2} className={`${surface} max-w-4xl space-y-6`}>
        <blockquote className="text-xl text-emerald-300 font-medium text-center border-l-4 border-emerald-400 pl-4">
          What if agents could remember and reuse their own code?
        </blockquote>
        <div className="grid gap-4 md:grid-cols-2 mt-6">
          <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-4">
            <div className="font-semibold text-rose-200 mb-2">
              Instead of...
            </div>
            <pre className="text-xs font-mono text-white/70">
              {`Task → LLM generates code → execute → discard`}
            </pre>
          </div>
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4">
            <div className="font-semibold text-emerald-200 mb-2">We want...</div>
            <pre className="text-xs font-mono text-white/70 whitespace-pre-wrap">
              {`Task → find existing capability → execute
      ↓ (if none exists)
      LLM generates → compile → store → reuse forever`}
            </pre>
          </div>
        </div>
      </ScalePop>
    </div>
  );
}

function SolutionSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>The Solution: Persistent Capabilities</h2>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
        <SlideInLeft delay={0.2} className={`${surface} space-y-4`}>
          <div className="text-lg font-semibold text-white">
            A <span className="text-emerald-400">capability</span> is:
          </div>
          <ul className="space-y-3">
            {[
              "Working code the agent wrote",
              "Compiled to WASM for portability + sandboxing",
              "Stored with metadata + embeddings",
              "Retrievable via vector similarity search",
            ].map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className={`${mutedText} flex items-start gap-2`}
              >
                <span className="text-emerald-400">✓</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </SlideInLeft>
        <SlideInRight delay={0.3} className={`${surface}`}>
          <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-sm font-mono text-teal-200/90 overflow-auto">
            {`capabilities/
  get_employee_profile/
    meta.json          ← summary for retrieval
    get_employee_profile.wasm   ← executable`}
          </pre>
        </SlideInRight>
      </div>
    </div>
  );
}

function ArchitectureSlide() {
  const diagram = `┌────────────────────────────────────────────────────────────┐
│                      User Task                             │
└─────────────────────────┬──────────────────────────────────┘
                          ▼
┌────────────────────────────────────────────────────────────┐
│              Embed task → Vector Search                    │
│              Find nearest capabilities                     │
└─────────────────────────┬──────────────────────────────────┘
                          ▼
┌────────────────────────────────────────────────────────────┐
│                     Agent Loop                             │
│  • Sees task + top-k relevant capabilities                 │
│  • Decides: run_capability OR mutate_capability            │
└─────────────┬──────────────────────────────┬───────────────┘
              │                              │
              ▼                              ▼
┌─────────────────────────┐    ┌─────────────────────────────┐
│    run_capability       │    │    mutate_capability        │
│    Execute WASM         │    │    Generate + compile       │
│    Deterministic!       │    │    Store new capability     │
└─────────────────────────┘    └─────────────────────────────┘`;

  return (
    <div className="h-full p-8 flex flex-col justify-center items-center">
      <FadeInUp className="mb-6 text-center">
        <h2 className={gradientTitle}>Architecture Overview</h2>
      </FadeInUp>
      <ScalePop delay={0.2} className={`${surface} max-w-4xl`}>
        <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-emerald-200/90 overflow-auto whitespace-pre">
          {diagram}
        </pre>
      </ScalePop>
    </div>
  );
}

function Pattern1IntroSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <span className={pill}>Pattern 1</span>
        <h2 className={`${gradientTitle} mt-2`}>
          Vector Search for Tool Selection
        </h2>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
        <SlideInLeft delay={0.2} className={`${surface} space-y-4`}>
          <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-4">
            <div className="font-semibold text-rose-200 mb-2">The Problem</div>
            <p className={mutedText}>
              Dumping all tools into context doesn't scale.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4">
            <div className="font-semibold text-emerald-200 mb-2">
              The Solution
            </div>
            <p className={mutedText}>
              <strong>RAG for tools, not documents.</strong>
            </p>
          </div>
        </SlideInLeft>
        <SlideInRight delay={0.3} className={`${surface}`}>
          <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-teal-200/90 overflow-auto">
            {`// Embed the task
let query_embedding = embedder.embed(task)?;

// Find nearest capabilities via cosine similarity  
let nearest = index.nearest(&query_embedding, k);

// Only surface top-k to the agent`}
          </pre>
        </SlideInRight>
      </div>
    </div>
  );
}

function Pattern1HowSlide() {
  const diagram = `Task: "Get John's salary details"
                    │
                    ▼
            ┌───────────────┐
            │  Embed Task   │
            └───────┬───────┘
                    ▼
     ┌──────────────────────────────┐
     │  Cosine Similarity Search    │
     │  against capability index    │
     └──────────────┬───────────────┘
                    ▼
┌─────────────────────────────────────────────────┐
│  Top 2 Results:                                 │
│   • get_salary_details (0.89)                   │
│   • get_employee_profile (0.76)                 │
└─────────────────────────────────────────────────┘`;

  return (
    <div className="h-full p-8 flex flex-col justify-center items-center">
      <FadeInUp className="mb-6 text-center">
        <span className={pill}>Pattern 1</span>
        <h2 className={`${gradientTitle} mt-2`}>How It Works</h2>
      </FadeInUp>
      <ScalePop delay={0.2} className={`${surface} max-w-3xl`}>
        <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-sm font-mono text-cyan-200/90 overflow-auto whitespace-pre">
          {diagram}
        </pre>
        <p className={`${mutedText} mt-4 text-center`}>
          Agent only sees <strong>2 relevant tools</strong>, not 50.
        </p>
      </ScalePop>
    </div>
  );
}

function Pattern1CodeSlide() {
  const code = `pub struct CapabilityIndex {
    dim: usize,
    embeddings: HashMap<String, Vec<f32>>,  // id → embedding
}

impl CapabilityIndex {
    pub fn nearest_for_task(&self, task: &str, embedder: &E, k: usize) 
        -> Vec<(String, f32)> 
    {
        let query_emb = embedder.embed(task)?;
        
        // Score all capabilities
        let mut scored: Vec<_> = self.embeddings.iter()
            .map(|(id, emb)| (id, cosine_similarity(&query_emb, emb)))
            .collect();
        
        // Return top-k
        scored.sort_by(|a, b| b.1.cmp(&a.1));
        scored.truncate(k);
        scored
    }
}`;

  return (
    <div className="h-full p-8 flex flex-col justify-center items-center">
      <FadeInUp className="mb-6 text-center">
        <span className={pill}>Pattern 1</span>
        <h2 className={`${gradientTitle} mt-2`}>The Capability Index</h2>
      </FadeInUp>
      <ScalePop delay={0.2} className={`${surface} max-w-4xl`}>
        <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-teal-200/90 overflow-auto">
          {code}
        </pre>
      </ScalePop>
    </div>
  );
}

function Pattern1BenefitsSlide() {
  const rows = [
    { before: "Agent sees ALL tools", after: "Agent sees top-k relevant" },
    { before: "O(n) context growth", after: "O(1) context (fixed k)" },
    { before: "Decision paralysis", after: "Focused choices" },
    { before: "Manual tool curation", after: "Automatic retrieval" },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <span className={pill}>Pattern 1</span>
        <h2 className={`${gradientTitle} mt-2`}>Benefits</h2>
      </FadeInUp>
      <ScalePop
        delay={0.2}
        className={`${surface} max-w-4xl mx-auto overflow-x-auto`}
      >
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-3 px-4 text-rose-300 font-semibold">Before</th>
              <th className="py-3 px-4 text-emerald-300 font-semibold">After</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={row.before}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="border-b border-white/5"
              >
                <td className={`py-3 px-4 ${mutedText}`}>{row.before}</td>
                <td className={`py-3 px-4 ${mutedText}`}>{row.after}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </ScalePop>
    </div>
  );
}

function Pattern2IntroSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <span className={pill}>Pattern 2</span>
        <h2 className={`${gradientTitle} mt-2`}>
          Persistent Code as Capabilities
        </h2>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
        <SlideInLeft delay={0.2} className={`${surface} space-y-4`}>
          <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-4">
            <div className="font-semibold text-rose-200 mb-2">The Problem</div>
            <p className={mutedText}>Agent-written code is ephemeral.</p>
          </div>
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4">
            <div className="font-semibold text-emerald-200 mb-2">
              The Solution
            </div>
            <p className={mutedText}>
              <strong>Treat working code as a first-class artifact.</strong>
            </p>
          </div>
        </SlideInLeft>
        <SlideInRight delay={0.3} className={`${surface}`}>
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              {["Code that works", "↓", "Compile to WASM", "↓", "Store", "↓", "Reuse"].map(
                (step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className={
                      step === "↓"
                        ? "text-emerald-400"
                        : "text-white/80 font-medium"
                    }
                  >
                    {step}
                  </motion.div>
                )
              )}
            </div>
          </div>
        </SlideInRight>
      </div>
    </div>
  );
}

function Pattern2LifecycleSlide() {
  const diagram = `                    ┌─────────────────┐
                    │   New Task      │
                    └────────┬────────┘
                             ▼
                    ┌─────────────────┐
             ┌──────│ Capability      │──────┐
             │  YES │ exists?         │  NO  │
             │      └─────────────────┘      │
             ▼                               ▼
    ┌─────────────────┐            ┌─────────────────┐
    │ run_capability  │            │mutate_capability│
    │ Execute WASM    │            │ LLM writes code │
    │ Deterministic   │            │ Compile to WASM │
    └─────────────────┘            │ Store + Index   │
                                   └────────┬────────┘
                                            │
                                            ▼
                                   Available next time!`;

  return (
    <div className="h-full p-8 flex flex-col justify-center items-center">
      <FadeInUp className="mb-6 text-center">
        <span className={pill}>Pattern 2</span>
        <h2 className={`${gradientTitle} mt-2`}>Capability Lifecycle</h2>
      </FadeInUp>
      <ScalePop delay={0.2} className={`${surface} max-w-3xl`}>
        <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-teal-200/90 overflow-auto whitespace-pre">
          {diagram}
        </pre>
      </ScalePop>
    </div>
  );
}

function Pattern2StructureSlide() {
  const schema = `// meta.json
{
  "id": "get_employee_profile",
  "summary": "Returns basic employee profile information 
              including name, email, department, job title, 
              and employee ID.",
  "binary": "get_employee_profile.wasm"
}`;

  const fields = [
    { field: "id", desc: "Unique identifier" },
    { field: "summary", desc: "Human-readable, used for embedding" },
    { field: "binary", desc: "WASM executable" },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-6 text-center">
        <span className={pill}>Pattern 2</span>
        <h2 className={`${gradientTitle} mt-2`}>What's a Capability?</h2>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
        <SlideInLeft delay={0.2} className={`${surface}`}>
          <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-sm font-mono text-emerald-200/90 overflow-auto">
            {schema}
          </pre>
        </SlideInLeft>
        <SlideInRight delay={0.3} className={`${surface} space-y-4`}>
          {fields.map((f, i) => (
            <motion.div
              key={f.field}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <code className="rounded-lg bg-teal-500/20 px-2 py-1 text-sm text-teal-200">
                {f.field}
              </code>
              <span className={mutedText}>{f.desc}</span>
            </motion.div>
          ))}
        </SlideInRight>
      </div>
    </div>
  );
}

function Pattern2WasmSlide() {
  const code = `pub fn run_capability(&self, cap: &CapabilityRecord, input: &str) 
    -> Result<String> 
{
    // Load WASM module
    let module = Module::from_file(&self.engine, &wasm_path)?;
    
    // Set up sandboxed I/O
    let wasi_ctx = WasiCtxBuilder::new()
        .stdin(input.as_bytes())
        .stdout(output_pipe)
        .build();
    
    // Run deterministically
    let start = instance.get_typed_func("_start")?;
    start.call(&mut store, ())?;
    
    // Return captured stdout (JSON)
    Ok(stdout)
}`;

  return (
    <div className="h-full p-8 flex flex-col justify-center items-center">
      <FadeInUp className="mb-6 text-center">
        <span className={pill}>Pattern 2</span>
        <h2 className={`${gradientTitle} mt-2`}>WASM Execution</h2>
      </FadeInUp>
      <ScalePop delay={0.2} className={`${surface} max-w-4xl`}>
        <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-cyan-200/90 overflow-auto">
          {code}
        </pre>
      </ScalePop>
    </div>
  );
}

function Pattern2WhyWasmSlide() {
  const rows = [
    { property: "Sandboxed", benefit: "Capabilities can't escape their box" },
    { property: "Deterministic", benefit: "Same input → same output, always" },
    { property: "Portable", benefit: "Runs anywhere Wasmtime runs" },
    { property: "Fast", benefit: "Near-native performance" },
    {
      property: "Language-agnostic",
      benefit: "Rust, Go, C, etc. → WASM",
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <span className={pill}>Pattern 2</span>
        <h2 className={`${gradientTitle} mt-2`}>Why WASM?</h2>
      </FadeInUp>
      <ScalePop
        delay={0.2}
        className={`${surface} max-w-4xl mx-auto overflow-x-auto`}
      >
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-3 px-4 text-teal-300 font-semibold">Property</th>
              <th className="py-3 px-4 text-emerald-300 font-semibold">
                Benefit
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={row.property}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="border-b border-white/5"
              >
                <td className="py-3 px-4 font-medium text-white/90">
                  {row.property}
                </td>
                <td className={`py-3 px-4 ${mutedText}`}>{row.benefit}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </ScalePop>
    </div>
  );
}

function Pattern2MutationSlide() {
  const steps = [
    "Agent calls mutate_capability(task, parent_id)",
    "Mutation agent copies parent capability",
    "LLM modifies code to match new task",
    "Compile to wasm32-wasip1",
    "Write meta.json + binary",
    "Reload index with new embedding",
    "Agent can immediately use the new capability",
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <span className={pill}>Pattern 2</span>
        <h2 className={`${gradientTitle} mt-2`}>The Mutation Flow</h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          When no capability exists...
        </p>
      </FadeInUp>
      <ScalePop delay={0.2} className={`${surface} max-w-2xl mx-auto`}>
        <div className="space-y-3">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="flex items-center gap-3"
            >
              <span className="rounded-full bg-teal-500/20 px-2 py-0.5 text-xs font-mono text-teal-300">
                {i + 1}
              </span>
              <span className={mutedText}>{step}</span>
            </motion.div>
          ))}
        </div>
      </ScalePop>
    </div>
  );
}

function AgentLoopSlide() {
  const code = `pub fn run_task(&mut self, task: &str) -> Result<String> {
    // Build context with only relevant capabilities
    let (caps_summary, _) = store.capabilities_summary_for_task(task, k)?;
    
    let system = format!(
        "You are an agent that MUST solve tasks using capabilities.\\n\\
         Use run_capability to execute an existing capability.\\n\\
         Use mutate_capability to create a new one if needed.\\n\\n\\
         Available capabilities:\\n{}", 
        caps_summary
    );

    loop {
        let response = llm.chat(messages, tools)?;
        
        match response {
            ToolCall("run_capability", args) => { /* Execute WASM */ }
            ToolCall("mutate_capability", args) => { /* Create new */ }
            FinalAnswer(content) => return Ok(content),
        }
    }
}`;

  return (
    <div className="h-full p-8 flex flex-col justify-center items-center">
      <FadeInUp className="mb-6 text-center">
        <h2 className={gradientTitle}>The Agent Loop</h2>
      </FadeInUp>
      <ScalePop delay={0.2} className={`${surface} max-w-4xl`}>
        <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-xs font-mono text-emerald-200/90 overflow-auto">
          {code}
        </pre>
      </ScalePop>
    </div>
  );
}

function TwoToolsSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center items-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>Key Insight: Only 2 Tools</h2>
      </FadeInUp>
      <ScalePop delay={0.2} className={`${surface} max-w-4xl space-y-6`}>
        <div className="text-center text-lg text-white/90">
          The agent only needs:
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-center">
            <code className="text-lg text-emerald-300">run_capability</code>
            <p className={`${mutedText} mt-2`}>Execute stored WASM</p>
          </div>
          <div className="rounded-xl border border-teal-400/30 bg-teal-500/10 p-4 text-center">
            <code className="text-lg text-teal-300">mutate_capability</code>
            <p className={`${mutedText} mt-2`}>Create new capability</p>
          </div>
        </div>
        <div className="text-center text-white/70">
          Everything else is <strong>encoded in capabilities</strong>.
        </div>
        <div className="grid gap-2 md:grid-cols-3 text-center">
          {[
            'No "search files" tool → search_files capability',
            'No "call API" tool → call_api capability',
            'No "query DB" tool → query_db capability',
          ].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-xs text-white/60"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </ScalePop>
    </div>
  );
}

function ExampleRunSlide() {
  const steps = [
    "Embed task",
    "Vector search finds: get_salary_details (0.91)",
    "Agent sees capability summary",
    'Agent calls run_capability("get_salary_details", {"name": "John"})',
    'WASM executes → returns {"salary": 85000, "currency": "USD"}',
    "Agent returns answer",
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>Example Scenario</h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          Task: "What's John's salary?"
        </p>
      </FadeInUp>
      <ScalePop delay={0.2} className={`${surface} max-w-3xl mx-auto space-y-4`}>
        {steps.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="flex items-center gap-3"
          >
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-mono text-emerald-300">
              {i + 1}
            </span>
            <span className={mutedText}>{step}</span>
          </motion.div>
        ))}
        <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4 mt-4 text-center">
          <span className="text-cyan-200 font-medium">
            Fully deterministic. Same task tomorrow → identical execution path.
          </span>
        </div>
      </ScalePop>
    </div>
  );
}

function ExampleMutateSlide() {
  const steps = [
    "Embed task",
    "Vector search finds: get_salary_details (0.87)",
    "Agent tries it, but it returns USD",
    'Agent calls mutate_capability("Return salary converted to specified currency", "get_salary_details")',
    "Mutation agent creates get_salary_with_conversion",
    'Agent calls run_capability("get_salary_with_conversion", {...})',
    "Returns answer",
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>Example Scenario: Mutation</h2>
        <p className="text-lg text-[var(--muted)] mt-2">
          Task: "What's John's salary in GBP?"
        </p>
      </FadeInUp>
      <ScalePop delay={0.2} className={`${surface} max-w-3xl mx-auto space-y-4`}>
        {steps.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="flex items-center gap-3"
          >
            <span className="rounded-full bg-teal-500/20 px-2 py-0.5 text-xs font-mono text-teal-300">
              {i + 1}
            </span>
            <span className={mutedText}>{step}</span>
          </motion.div>
        ))}
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 mt-4 text-center">
          <span className="text-emerald-200 font-medium">
            Tomorrow: get_salary_with_conversion is already available!
          </span>
        </div>
      </ScalePop>
    </div>
  );
}

function WhatEnablesSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>What This Enables</h2>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
        <SlideInLeft delay={0.2} className={`${surface} space-y-4`}>
          <span className={pill}>Short-term</span>
          <ul className="space-y-3">
            {[
              "Deterministic execution of solved problems",
              "Reduced LLM calls (reuse > regenerate)",
              "Better tool selection via similarity search",
            ].map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className={`${mutedText} flex items-start gap-2`}
              >
                <span className="text-emerald-400">•</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </SlideInLeft>
        <SlideInRight delay={0.3} className={`${surface} space-y-4`}>
          <span className={pill}>Long-term</span>
          <ul className="space-y-3">
            {[
              "Agents that accumulate skills over time",
              "Organizational knowledge encoded in capabilities",
              "Less hallucination (execute stored code, don't guess)",
            ].map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className={`${mutedText} flex items-start gap-2`}
              >
                <span className="text-teal-400">•</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </SlideInRight>
      </div>
    </div>
  );
}

function SummarySlide() {
  const patterns = [
    {
      num: "1",
      title: "Vector Search for Tool Selection",
      desc: "Embed tasks, match to capabilities, surface only relevant ones. RAG for tools, not documents.",
    },
    {
      num: "2",
      title: "Persistent Code as Capabilities",
      desc: "Working code is compiled to WASM and stored. Deterministic reuse beats probabilistic regeneration.",
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>Summary</h2>
      </FadeInUp>
      <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
        {patterns.map((pattern, index) => (
          <ScalePop
            key={pattern.title}
            delay={0.2 + index * 0.12}
            className={`${surface} space-y-4`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-white/30">
                {pattern.num}
              </span>
              <span className="text-lg font-semibold text-white">
                {pattern.title}
              </span>
            </div>
            <p className={mutedText}>{pattern.desc}</p>
          </ScalePop>
        ))}
      </div>
    </div>
  );
}

function VisionSlide() {
  const box = `┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Agents that learn skills through experience               │
│                                                             │
│   Code reuse instead of hallucination                       │
│                                                             │
│   Tooling discovery instead of manual registration          │
│                                                             │
│   Skill accumulation over long horizons                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘`;

  return (
    <div className="h-full p-8 flex flex-col justify-center items-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>The Vision</h2>
      </FadeInUp>
      <ScalePop delay={0.2} className={`${surface} max-w-3xl`}>
        <pre className="rounded-xl bg-black/40 px-4 py-3 text-left text-sm font-mono text-emerald-200/90 overflow-auto whitespace-pre">
          {box}
        </pre>
      </ScalePop>
    </div>
  );
}

function LinksSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center items-center">
      <FadeInUp className="mb-8 text-center">
        <h2 className={gradientTitle}>Links</h2>
      </FadeInUp>
      <ScalePop delay={0.2} className={`${surface} max-w-2xl w-full space-y-6`}>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm text-white/60">Repository</div>
          <div className="font-mono text-teal-300 mt-1">
            https://github.com/bensincs/self-evolving-agent-runtime
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold text-white mb-3">Stack:</div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { icon: "🦀", label: "Rust + Wasmtime" },
              { icon: "🤖", label: "Azure OpenAI / Foundry" },
              { icon: "📦", label: "WASM (wasm32-wasip1)" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"
              >
                <span className="text-2xl">{item.icon}</span>
                <div className={`${mutedText} mt-1`}>{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScalePop>
    </div>
  );
}

function QuestionsSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-10 max-w-4xl"
      >
        <h2 className="text-[clamp(48px,8vw,96px)] font-extrabold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
          Questions?
        </h2>
        <FadeInUp delay={0.3} className="text-lg text-[var(--muted)]">
          Self-evolving agents that accumulate skills through persistent WASM
          capabilities
        </FadeInUp>
      </motion.div>
    </div>
  );
}

const slideMap: Record<string, React.ReactNode> = {
  title: <TitleSlide />,
  "problem-tools": <ProblemToolsSlide />,
  "problem-coding": <ProblemCodingSlide />,
  "core-idea": <CoreIdeaSlide />,
  solution: <SolutionSlide />,
  architecture: <ArchitectureSlide />,
  "pattern1-intro": <Pattern1IntroSlide />,
  "pattern1-how": <Pattern1HowSlide />,
  "pattern1-code": <Pattern1CodeSlide />,
  "pattern1-benefits": <Pattern1BenefitsSlide />,
  "pattern2-intro": <Pattern2IntroSlide />,
  "pattern2-lifecycle": <Pattern2LifecycleSlide />,
  "pattern2-structure": <Pattern2StructureSlide />,
  "pattern2-wasm": <Pattern2WasmSlide />,
  "pattern2-why-wasm": <Pattern2WhyWasmSlide />,
  "pattern2-mutation": <Pattern2MutationSlide />,
  "agent-loop": <AgentLoopSlide />,
  "two-tools": <TwoToolsSlide />,
  "example-run": <ExampleRunSlide />,
  "example-mutate": <ExampleMutateSlide />,
  "what-enables": <WhatEnablesSlide />,
  summary: <SummarySlide />,
  vision: <VisionSlide />,
  links: <LinksSlide />,
  questions: <QuestionsSlide />,
};

export default function SelfEvolvingRuntimeDeck({ slide }: DeckComponentProps) {
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
