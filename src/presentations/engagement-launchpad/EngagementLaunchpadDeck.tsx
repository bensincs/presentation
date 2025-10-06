import React from "react";
import { motion } from "framer-motion";
import DeckDisclaimer from "../components/DeckDisclaimer";
import type { DeckComponentProps, SlideMeta } from "../../types";

export const engagementLaunchpadSlides: SlideMeta[] = [
  { id: "engagement-launchpad", transition: "fade" },
];

function EngagementLaunchpadSlide() {
  const pillars = [
    {
      title: "Signal Intelligence",
      description:
        "Unify product telemetry, campaign analytics, and CRM events into a real-time engagement graph.",
      accentClass: "from-sky-400 to-cyan-400",
    },
    {
      title: "Adaptive Journeys",
      description:
        "Auto-orchestrate messaging cadences that respond to likelihood-to-convert and lifecycle stage.",
      accentClass: "from-violet-400 to-fuchsia-400",
    },
    {
      title: "Outcome Automation",
      description:
        "Trigger sales assists, loyalty rewards, or retention playbooks with measurable revenue impact.",
      accentClass: "from-emerald-400 to-teal-400",
    },
  ];

  const launchMetrics = [
    { label: "Audience Profiles", value: "12" },
    { label: "Lifecycle Plays", value: "8" },
    { label: "Realtime Signals", value: "45+" },
  ];

  return (
    <div className="flex h-full flex-col gap-8 p-8 md:p-12">
      <div className="space-y-4">
        <motion.h1
          className="text-[clamp(42px,8vw,96px)] font-extrabold bg-gradient-to-r from-sky-400 via-emerald-400 to-fuchsia-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Engagement Launchpad
        </motion.h1>
        <motion.p
          className="max-w-3xl text-lg text-[var(--muted)] md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A first-step activation deck that marries signal intelligence with AI
          copilots to orchestrate personalized customer journeys, launch
          campaigns faster, and expose measurable growth lift.
        </motion.p>
      </div>

      <motion.div
        className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="surface flex flex-col gap-4 rounded-3xl border border-white/10 p-6"
          >
            <div
              className={`inline-flex items-center rounded-full bg-gradient-to-r ${pillar.accentClass} px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-950`}
            >
              Growth Pillar
            </div>
            <h2 className="text-2xl font-bold text-white">{pillar.title}</h2>
            <p className="text-sm text-[var(--muted)]">{pillar.description}</p>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="surface flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 px-6 py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
      >
        <div className="text-sm uppercase tracking-wide text-white/70">
          Launch Readiness Snapshot
        </div>
        <div className="flex flex-wrap gap-4 text-center">
          {launchMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2"
            >
              <div className="text-2xl font-bold text-white">
                {metric.value}
              </div>
              <div className="text-xs uppercase tracking-wide text-white/60">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-[var(--muted)]">
          Built for RevOps, Growth, and Lifecycle teams launching new offerings.
        </div>
      </motion.div>
    </div>
  );
}

export default function EngagementLaunchpadDeck({
  slide,
}: DeckComponentProps) {
  const slides: Record<string, JSX.Element> = {
    "engagement-launchpad": <EngagementLaunchpadSlide />,
  };

  const fallback = (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">{slide.id}</h2>
        <p className="mt-2 text-[var(--muted)]">
          Slide content not yet implemented.
        </p>
      </div>
    </div>
  );

  const content = slides[slide.id] ?? fallback;

  return (
    <div className="flex h-full flex-col">
      <DeckDisclaimer />
      <div className="flex-1 overflow-hidden">{content}</div>
    </div>
  );
}
