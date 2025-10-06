import React from "react";
import { motion } from "framer-motion";
import DeckDisclaimer from "../components/DeckDisclaimer";
import { DeckComponentProps, SlideMeta } from "../../types";

// Slide metadata with transitions
export const conceptToCockpitSlides: SlideMeta[] = [
  { id: "title", transition: "fade" },
  { id: "overview", transition: "slide" },
  { id: "challenge", transition: "slide" },
  { id: "three-tracks", transition: "slide" },
  { id: "track1", transition: "slide" },
  { id: "track2", transition: "slide" },
  { id: "track3", transition: "slide" },
  { id: "technologies", transition: "slide" },
  { id: "results", transition: "slide" },
  { id: "demo-flow", transition: "slide" },
  { id: "impact", transition: "slide" },
  { id: "qa", transition: "fade" },
];

// Slide titles for reference
const slideTitles: Record<string, string> = {
  title: "ConceptToCockpit",
  overview: "What is ConceptToCockpit?",
  challenge: "The Engineering Challenge",
  "three-tracks": "Three-Track Approach",
  track1: "Track 1: Requirements Engineering",
  track2: "Track 2: Prototype Development",
  track3: "Track 3: Simulation & Validation",
  technologies: "Key Technologies",
  results: "Results & Achievements",
  "demo-flow": "Live Demo Flow",
  impact: "Impact & Benefits",
  qa: "Q&A & Next Steps",
};

// Title Slide Component
function TitleSlide() {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
      >
        <div className="space-y-4">
          <motion.h1
            className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            ConceptToCockpit
          </motion.h1>
          <motion.h2
            className="text-3xl text-gray-300 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Spec-Driven Gauge Development
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Hyper Velocity Engineering: From Drawing to Deployed Cockpit Display
            in 3 Days
          </motion.p>
        </div>

        <motion.div
          className="space-y-4 text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <p className="text-lg">CES3 Hackathon • September 2025</p>
          <p className="text-sm">
            High-Velocity, Audit-Ready Aviation Engineering
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Overview Slide
function OverviewSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          What is ConceptToCockpit?
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="surface p-6 rounded-xl"
            >
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                North Star Goal
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Demonstrate{" "}
                <strong className="text-white">
                  high-velocity, audit-ready engineering
                </strong>{" "}
                by taking a Fuel-Flow Gauge from initial drawing to approved
                requirements, spec-driven prototype, and 100-mission automated
                simulation with objective pass/fail evidence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="surface p-6 rounded-xl"
            >
              <h3 className="text-2xl font-semibold text-green-300 mb-4">
                Key Principles
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>
                  • <strong>Data-Driven:</strong> Specs, tests, missions all
                  structured
                </li>
                <li>
                  • <strong>Traceable:</strong> HLR ↔ LLR ↔ Tests ↔ Evidence
                </li>
                <li>
                  • <strong>Reproducible:</strong> One-click from clean clone
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="surface p-8 rounded-xl text-center space-y-4"
          >
            <div className="text-6xl">⚡</div>
            <h3 className="text-2xl font-semibold text-yellow-300">
              Timeline Target
            </h3>
            <div className="space-y-2 text-lg">
              <p className="text-gray-300">
                Idea → Approved HLR:{" "}
                <span className="text-green-400 font-bold">≤ 60 min</span>
              </p>
              <p className="text-gray-300">
                Push → Bundle:{" "}
                <span className="text-green-400 font-bold">≤ 5 min</span>
              </p>
              <p className="text-gray-300">
                Mission Pass Rate:{" "}
                <span className="text-green-400 font-bold">≥ 90%</span>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// Challenge Slide
function ChallengeSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          The Engineering Challenge
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="surface p-6 rounded-xl border-l-4 border-red-500">
              <h3 className="text-2xl font-semibold text-red-300 mb-4">
                Traditional Approach
              </h3>
              <ul className="text-gray-300 space-y-3">
                <li>• Manual requirements authoring</li>
                <li>• Weeks/months of development cycles</li>
                <li>• Fragmented toolchains</li>
                <li>• Limited traceability</li>
                <li>• Late-stage validation</li>
                <li>• Manual test execution</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="surface p-6 rounded-xl border-l-4 border-green-500">
              <h3 className="text-2xl font-semibold text-green-300 mb-4">
                HVE Approach
              </h3>
              <ul className="text-gray-300 space-y-3">
                <li>• AI-assisted requirement generation</li>
                <li>• Hours/days development cycles</li>
                <li>• Integrated, automated pipeline</li>
                <li>• Built-in traceability matrices</li>
                <li>• Continuous validation</li>
                <li>• 100+ automated test missions</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="surface p-6 rounded-xl"
        >
          <h3 className="text-2xl font-semibold text-blue-300 mb-4 text-center">
            The Vision
          </h3>
          <p className="text-gray-300 text-center text-lg leading-relaxed">
            Transform aviation cockpit development from a months-long manual
            process into a
            <span className="text-yellow-300 font-semibold">
              {" "}
              data-driven, AI-accelerated pipeline
            </span>{" "}
            that delivers audit-ready results in days with complete traceability
            and reproducibility.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Three Tracks Slide
function ThreeTracksSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
          Three-Track Methodology
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            {
              track: "Track 1",
              title: "Requirements Engineering",
              focus: "Prompt Engineering",
              icon: "📋",
              color: "blue",
              goals: [
                "Drawing → HLR/LLR",
                "AI-generated requirements",
                "Schema validation",
                "Traceability matrix",
              ],
            },
            {
              track: "Track 2",
              title: "Prototype Development",
              focus: "Code Development",
              icon: "⚙️",
              color: "green",
              goals: [
                "Requirements → Prototype",
                "ARINC-661 compliance",
                "JSBSim integration",
                "Real-time rendering",
              ],
            },
            {
              track: "Track 3",
              title: "Simulation & Validation",
              focus: "Scale Testing",
              icon: "🚀",
              color: "purple",
              goals: [
                "Prototype → Validation",
                "100 parallel missions",
                "Automated evaluation",
                "Evidence generation",
              ],
            },
          ].map((track, index) => (
            <motion.div
              key={track.track}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
              className={`surface p-6 rounded-xl border-l-4 border-${track.color}-500 hover:scale-105 transition-transform duration-300`}
            >
              <div className="text-center space-y-4">
                <div className="text-4xl">{track.icon}</div>
                <h3 className={`text-xl font-semibold text-${track.color}-300`}>
                  {track.track}
                </h3>
                <h4 className="text-lg text-white font-medium">
                  {track.title}
                </h4>
                <p className={`text-${track.color}-200 text-sm`}>
                  Focus: {track.focus}
                </p>

                <ul className="text-gray-300 text-sm space-y-1 text-left">
                  {track.goals.map((goal, i) => (
                    <li key={i}>• {goal}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-4 surface p-4 rounded-full">
            <span className="text-blue-300">📋 Requirements</span>
            <span className="text-gray-400">→</span>
            <span className="text-green-300">⚙️ Prototype</span>
            <span className="text-gray-400">→</span>
            <span className="text-purple-300">🚀 Validation</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Track 1 Slide
function Track1Slide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="flex items-center space-x-4">
          <div className="text-5xl">📋</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Track 1: Requirements Engineering
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="surface p-6 rounded-xl">
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                Input
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Fuel-flow gauge drawing</li>
                <li>• Operating behavior description</li>
                <li>• Human factors requirements</li>
                <li>• Industry HMI standards</li>
              </ul>
            </div>

            <div className="surface p-6 rounded-xl">
              <h3 className="text-2xl font-semibold text-green-300 mb-4">
                AI-Powered Process
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Flask web application</li>
                <li>• Configurable LLM prompts</li>
                <li>• Aviation standards compliance</li>
                <li>• Real-time generation</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="surface p-6 rounded-xl border-l-4 border-yellow-500">
              <h3 className="text-2xl font-semibold text-yellow-300 mb-4">
                Generated Outputs
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>
                  • <strong>HLR.json</strong> - High-Level Requirements
                </li>
                <li>
                  • <strong>LLR.json</strong> - Low-Level Requirements
                </li>
                <li>
                  • <strong>TraceMatrix.csv</strong> - Traceability links
                </li>
                <li>
                  • <strong>GaugeSpec.json</strong> - Behavior definition
                </li>
                <li>
                  • <strong>SysML 2 format</strong> - Formal modeling
                </li>
              </ul>
            </div>

            <div className="surface p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-purple-300 mb-3">
                Success Criteria
              </h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>✓ 100% HLR→LLR→Test coverage</li>
                <li>✓ Schema-valid requirements</li>
                <li>✓ ARINC 661/653 compliance</li>
                <li>✓ DO-178C traceability</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="surface p-4 rounded-xl text-center"
        >
          <p className="text-lg text-gray-300">
            <span className="text-cyan-300 font-semibold">Target:</span> Idea →
            Approved HLR in ≤ 60 minutes
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Track 2 Slide
function Track2Slide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="flex items-center space-x-4">
          <div className="text-5xl">⚙️</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Track 2: Prototype Development
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="surface p-6 rounded-xl">
              <h3 className="text-2xl font-semibold text-green-300 mb-4">
                Spec-Driven Renderer
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Reads GaugeSpec.json</li>
                <li>• React + Tailwind v4 + Vite</li>
                <li>• SVG-based gauge rendering</li>
                <li>• Real-time data playback</li>
              </ul>
            </div>

            <div className="surface p-6 rounded-xl">
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                JSBSim Integration
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Flight simulation engine</li>
                <li>• Mission XML generation</li>
                <li>• CSV data output</li>
                <li>• Real-time/batch modes</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="surface p-6 rounded-xl border-l-4 border-orange-500">
              <h3 className="text-2xl font-semibold text-orange-300 mb-4">
                Key Features
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Pointer dynamics (filters, latency)</li>
                <li>• Color band behavior</li>
                <li>• LOW FUEL FLOW annunciator</li>
                <li>• Failure mode simulation</li>
                <li>• Mission scrub/playback</li>
              </ul>
            </div>

            <div className="surface p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-emerald-300 mb-3">
                ARINC-661 Compliance
              </h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Standard color schemes</li>
                <li>• Typography guidelines</li>
                <li>• Layout specifications</li>
                <li>• Interaction patterns</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
        >
          {[
            { tech: "React + TypeScript", desc: "Modern web framework" },
            { tech: "JSBSim Engine", desc: "Flight simulation core" },
            { tech: "Docker + Makefile", desc: "Containerized workflow" },
          ].map((item, index) => (
            <div key={index} className="surface p-4 rounded-xl text-center">
              <h4 className="text-green-300 font-semibold">{item.tech}</h4>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

// Track 3 Slide
function Track3Slide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="flex items-center space-x-4">
          <div className="text-5xl">🚀</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Track 3: Simulation & Validation
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="surface p-6 rounded-xl">
              <h3 className="text-2xl font-semibold text-purple-300 mb-4">
                Massive Scale Testing
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>• 100 parallel mission runs</li>
                <li>• Deterministic evaluator</li>
                <li>• CI/CD pipeline integration</li>
                <li>• Configurable test parameters</li>
              </ul>
            </div>

            <div className="surface p-6 rounded-xl">
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                Validation Scenarios
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Normal operating ranges</li>
                <li>• Warning/danger thresholds</li>
                <li>• Valve-close decay behavior</li>
                <li>• Stuck sensor handling</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="surface p-6 rounded-xl border-l-4 border-pink-500">
              <h3 className="text-2xl font-semibold text-pink-300 mb-4">
                Generated Evidence
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Per-mission reports & plots</li>
                <li>• JUnit test results</li>
                <li>• Coverage analysis</li>
                <li>• Provenance documentation</li>
                <li>• Signed evidence bundle</li>
              </ul>
            </div>

            <div className="surface p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-pink-300 mb-3">
                Quality Gates
              </h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>✓ ≥90% mission pass rate</li>
                <li>✓ All critical paths tested</li>
                <li>✓ Fail→fix→pass cycle proven</li>
                <li>✓ Full audit trail</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="surface p-6 rounded-xl"
        >
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold text-purple-300">
              Automation Pipeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="space-y-2">
                <div className="text-purple-300 font-semibold">
                  Parallel Execution
                </div>
                <div className="text-gray-300">100 missions fan out in CI</div>
              </div>
              <div className="space-y-2">
                <div className="text-pink-300 font-semibold">
                  Real-time Evaluation
                </div>
                <div className="text-gray-300">Time-windowed assertions</div>
              </div>
              <div className="space-y-2">
                <div className="text-blue-300 font-semibold">
                  Result Aggregation
                </div>
                <div className="text-gray-300">Merge to single report</div>
              </div>
              <div className="space-y-2">
                <div className="text-green-300 font-semibold">
                  Quality Gating
                </div>
                <div className="text-gray-300">Pass/fail with evidence</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Technologies Slide
function TechnologiesSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent text-center">
          Key Technologies
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="surface p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-3xl">🧠</div>
                <h3 className="text-2xl font-semibold text-blue-300">
                  AI/LLM Integration
                </h3>
              </div>
              <ul className="text-gray-300 space-y-2">
                <li>• GPT-4/5 for requirements generation</li>
                <li>• Structured prompt engineering</li>
                <li>• Function calling for validation</li>
                <li>• Multi-model support</li>
              </ul>
            </div>

            <div className="surface p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-3xl">✈️</div>
                <h3 className="text-2xl font-semibold text-green-300">
                  JSBSim Engine
                </h3>
              </div>
              <ul className="text-gray-300 space-y-2">
                <li>• Open-source flight simulator</li>
                <li>• XML-based aircraft modeling</li>
                <li>• Real-time & batch execution</li>
                <li>• Comprehensive physics model</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="surface p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-3xl">🌐</div>
                <h3 className="text-2xl font-semibold text-purple-300">
                  Modern Web Stack
                </h3>
              </div>
              <ul className="text-gray-300 space-y-2">
                <li>• React + TypeScript</li>
                <li>• Tailwind CSS v4</li>
                <li>• Vite build system</li>
                <li>• Framer Motion animations</li>
              </ul>
            </div>

            <div className="surface p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-3xl">🔧</div>
                <h3 className="text-2xl font-semibold text-orange-300">
                  DevOps & Tooling
                </h3>
              </div>
              <ul className="text-gray-300 space-y-2">
                <li>• Docker containerization</li>
                <li>• Python uv package manager</li>
                <li>• Makefile automation</li>
                <li>• CI/CD pipeline integration</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="surface p-6 rounded-xl"
        >
          <h3 className="text-2xl font-semibold text-cyan-300 mb-4 text-center">
            Integration Architecture
          </h3>
          <div className="flex items-center justify-center space-x-4 text-lg">
            <span className="text-blue-300">AI Requirements</span>
            <span className="text-gray-400">→</span>
            <span className="text-green-300">JSBSim Missions</span>
            <span className="text-gray-400">→</span>
            <span className="text-purple-300">Web Renderer</span>
            <span className="text-gray-400">→</span>
            <span className="text-orange-300">Validation</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Results Slide
function ResultsSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent text-center">
          Results & Achievements
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="surface p-6 rounded-xl border-l-4 border-green-500">
              <h3 className="text-2xl font-semibold text-green-300 mb-4">
                What "Good" Looks Like
              </h3>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <div>
                    <strong>One-click bundle:</strong> HLR.json, LLR.json,
                    GaugeSpec.json, TestCases.json, 100 mission results, plots,
                    JUnit, TraceMatrix.csv
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <div>
                    <strong>100% coverage:</strong> HLR→LLR→Test links
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <div>
                    <strong>≥90% reliability:</strong> Mission pass-rate with
                    fail→fix→pass cycle
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="surface p-6 rounded-xl border-l-4 border-yellow-500">
              <h3 className="text-2xl font-semibold text-yellow-300 mb-4">
                Performance Metrics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                  <span className="text-gray-300">Idea → Approved HLR</span>
                  <span className="text-yellow-400 font-bold">≤ 60 min</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                  <span className="text-gray-300">Push → Bundle</span>
                  <span className="text-yellow-400 font-bold">≤ 5 min</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                  <span className="text-gray-300">Mission Success Rate</span>
                  <span className="text-green-400 font-bold">≥ 90%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                  <span className="text-gray-300">Parallel Missions</span>
                  <span className="text-blue-400 font-bold">100+</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="surface p-6 rounded-xl"
        >
          <h3 className="text-2xl font-semibold text-orange-300 mb-4 text-center">
            Delivered Artifacts
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { artifact: "Requirements", count: "HLR + LLR" },
              { artifact: "Test Cases", count: "100+ missions" },
              { artifact: "Evidence", count: "Full traceability" },
              { artifact: "Documentation", count: "PDF + HTML" },
            ].map((item, index) => (
              <div key={index} className="p-4 bg-gray-800/30 rounded-lg">
                <div className="text-lg font-semibold text-orange-300">
                  {item.artifact}
                </div>
                <div className="text-gray-300 text-sm">{item.count}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Demo Flow Slide
function DemoFlowSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent text-center">
          Live Demo Flow
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="surface p-6 rounded-xl"
        >
          <blockquote className="text-xl italic text-gray-300 text-center leading-relaxed">
            "Here's the drawing → here are the approved requirements → here's
            the spec that drives the prototype. We press Play; you see the gauge
            respond and the LOW FUEL FLOW annunciator behave exactly as
            specified. In parallel, 100 missions run in CI. One fails on
            purpose; we tighten a threshold, rerun that shard, and it passes.
            Finally, we generate a signed evidence bundle with full traceability
            and provenance."
          </blockquote>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "Input Drawing",
              desc: "Fuel-flow gauge sketch and behavior description",
              icon: "📋",
              color: "blue",
            },
            {
              step: "2",
              title: "Generate Requirements",
              desc: "AI creates HLR/LLR with full traceability",
              icon: "🧠",
              color: "green",
            },
            {
              step: "3",
              title: "Render Prototype",
              desc: "Spec-driven gauge with mission playback",
              icon: "⚙️",
              color: "yellow",
            },
            {
              step: "4",
              title: "Validate at Scale",
              desc: "100 missions with evidence bundle",
              icon: "🚀",
              color: "purple",
            },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
              className={`surface p-6 rounded-xl text-center border-l-4 border-${item.color}-500 hover:scale-105 transition-transform duration-300`}
            >
              <div className="space-y-4">
                <div className="text-4xl">{item.icon}</div>
                <div className={`text-2xl font-bold text-${item.color}-300`}>
                  Step {item.step}
                </div>
                <h4 className="text-lg font-semibold text-white">
                  {item.title}
                </h4>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-3 surface p-4 rounded-full">
            <span className="text-blue-300">📋 Drawing</span>
            <span className="text-gray-400">→</span>
            <span className="text-green-300">🧠 AI Requirements</span>
            <span className="text-gray-400">→</span>
            <span className="text-yellow-300">⚙️ Live Prototype</span>
            <span className="text-gray-400">→</span>
            <span className="text-purple-300">🚀 Proven Evidence</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Impact Slide
function ImpactSlide() {
  return (
    <div className="h-full p-8 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent text-center">
          Impact & Benefits
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="surface p-6 rounded-xl border-l-4 border-emerald-500"
          >
            <div className="text-center space-y-4">
              <div className="text-5xl">⚡</div>
              <h3 className="text-2xl font-semibold text-emerald-300">
                Velocity
              </h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Months → Days development</li>
                <li>• 60min idea-to-requirements</li>
                <li>• 5min push-to-validation</li>
                <li>• Continuous integration</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="surface p-6 rounded-xl border-l-4 border-blue-500"
          >
            <div className="text-center space-y-4">
              <div className="text-5xl">🔗</div>
              <h3 className="text-2xl font-semibold text-blue-300">
                Traceability
              </h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• HLR ↔ LLR ↔ Tests ↔ Evidence</li>
                <li>• Automated matrix generation</li>
                <li>• Audit-ready documentation</li>
                <li>• Compliance by design</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="surface p-6 rounded-xl border-l-4 border-purple-500"
          >
            <div className="text-center space-y-4">
              <div className="text-5xl">🔄</div>
              <h3 className="text-2xl font-semibold text-purple-300">
                Reproducibility
              </h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• One-click from clean clone</li>
                <li>• Containerized environments</li>
                <li>• Deterministic results</li>
                <li>• Version-controlled artifacts</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="surface p-6 rounded-xl">
            <h3 className="text-2xl font-semibold text-emerald-300 mb-4">
              Industry Transformation
            </h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Democratizes aviation software development</li>
              <li>• Reduces certification timelines</li>
              <li>• Enables rapid prototyping</li>
              <li>• Improves safety through extensive testing</li>
            </ul>
          </div>

          <div className="surface p-6 rounded-xl">
            <h3 className="text-2xl font-semibold text-blue-300 mb-4">
              Future Applications
            </h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Full cockpit display systems</li>
              <li>• Multi-aircraft configurations</li>
              <li>• Real-time mission adaptation</li>
              <li>• AI-driven flight testing</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="surface p-4 rounded-xl text-center"
        >
          <p className="text-xl text-gray-300">
            <span className="text-emerald-300 font-semibold">The Future:</span>
            From concept sketch to certified cockpit display in hours, not
            months
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Q&A Slide
function QASlide() {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
      >
        <motion.div
          className="space-y-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Q&A & Next Steps
          </h1>
          <div className="text-4xl">❓</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="space-y-6 max-w-4xl"
        >
          <div className="surface p-6 rounded-xl">
            <h3 className="text-2xl font-semibold text-blue-300 mb-4">
              Key Questions
            </h3>
            <div className="text-left space-y-2 text-gray-300">
              <p>• How can HVE be applied to your domain?</p>
              <p>• What are the certification implications?</p>
              <p>• How does this scale to full cockpit systems?</p>
              <p>• What's the ROI for your organization?</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="surface p-6 rounded-xl border-l-4 border-green-500">
              <h4 className="text-xl font-semibold text-green-300 mb-3">
                Next Steps
              </h4>
              <ul className="text-gray-300 space-y-1 text-sm text-left">
                <li>• Extend to multi-gauge layouts</li>
                <li>• Add real-time data feeds</li>
                <li>• Integrate with certification tools</li>
                <li>• Develop industry standards</li>
              </ul>
            </div>

            <div className="surface p-6 rounded-xl border-l-4 border-purple-500">
              <h4 className="text-xl font-semibold text-purple-300 mb-3">
                Get Involved
              </h4>
              <ul className="text-gray-300 space-y-1 text-sm text-left">
                <li>• GitHub: CES3-Hackathon/ConceptToCockpit</li>
                <li>• Try the three-track workflow</li>
                <li>• Contribute to the ecosystem</li>
                <li>• Share your use cases</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-2xl text-gray-300"
        >
          Thank you for your attention!
        </motion.div>
      </motion.div>
    </div>
  );
}

// Main Deck Component
export default function ConceptToCockpitDeck({
  slide,
  idx,
}: DeckComponentProps) {
  const slideComponents: Record<string, JSX.Element> = {
    title: <TitleSlide />,
    overview: <OverviewSlide />,
    challenge: <ChallengeSlide />,
    "three-tracks": <ThreeTracksSlide />,
    track1: <Track1Slide />,
    track2: <Track2Slide />,
    track3: <Track3Slide />,
    technologies: <TechnologiesSlide />,
    results: <ResultsSlide />,
    "demo-flow": <DemoFlowSlide />,
    impact: <ImpactSlide />,
    qa: <QASlide />,
  };

  const fallback = (
    <div className="h-full flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">
          {slideTitles[slide.id] || slide.id}
        </h1>
        <p className="text-gray-400">Slide content coming soon...</p>
      </div>
    </div>
  );

  const content = slideComponents[slide.id] || fallback;

  return (
    <div className="flex h-full flex-col">
      <DeckDisclaimer />
      <div className="flex-1 overflow-hidden">{content}</div>
    </div>
  );
}
