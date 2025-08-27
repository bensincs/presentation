import type { DeckComponentProps } from "../../types";

export default function PythonUvDeck({ slide, idx }: DeckComponentProps) {
  if (slide.id === "title") return <TitleSlide />;
  if (slide.id === "introduction") return <IntroductionSlide />;
  if (slide.id === "what-is-uv") return <WhatIsUvSlide />;
  if (slide.id === "speed-comparison") return <SpeedComparisonSlide />;
  if (slide.id === "key-features") return <KeyFeaturesSlide />;
  if (slide.id === "installation") return <InstallationSlide />;
  if (slide.id === "basic-usage") return <BasicUsageSlide />;
  if (slide.id === "project-management") return <ProjectManagementSlide />;
  if (slide.id === "advanced-features") return <AdvancedFeaturesSlide />;
  if (slide.id === "migration-guide") return <MigrationGuideSlide />;
  if (slide.id === "benefits") return <BenefitsSlide />;
  if (slide.id === "qa") return <QASlide />;

  return (
    <div className="mx-auto max-w-5xl w-full">
      <div className="placeholder">
        Missing slide: {slide.id} (index {idx})
      </div>
    </div>
  );
}

function TitleSlide() {
  return (
    <div className="mx-auto max-w-5xl w-full">
      <div className="py-16 text-center">
        <div className="text-[clamp(32px,7vw,72px)] font-extrabold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
            UV: The Future of
          </span>
        </div>
        <div className="text-[clamp(28px,6vw,64px)] font-extrabold tracking-tight">
          <span className="text-[var(--foreground)]">
            Python Package Management
          </span>
        </div>
        <div className="mt-4 mx-auto h-2 rounded-full bg-gradient-to-r from-accent to-accent2 w-[min(50vw,600px)] animate-scale-x-in" />

        <div className="mt-8 text-lg text-[var(--muted)]">
          Lightning-fast Python package installer and resolver written in Rust
        </div>

        <div className="mt-8 flex gap-3 justify-center flex-wrap">
          {[
            "10-100x Faster",
            "Drop-in Replacement",
            "Rust-Powered",
            "Cross-Platform",
          ].map((tag, i) => (
            <span
              key={tag}
              className="surface border border-[var(--line)] rounded-full px-4 py-2 text-sm font-semibold animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-12 text-sm text-[var(--muted)]">
          By Ben Sinclair • September 2024
        </div>
      </div>
    </div>
  );
}

function IntroductionSlide() {
  return (
    <div className="mx-auto max-w-5xl w-full">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 text-[var(--foreground)]">
          The Python Packaging Problem
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="surface p-6">
          <h3 className="text-xl font-bold mb-4 text-red-400">
            Current Issues
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-red-500">⚠️</span>
              <span className="font-medium">Slow installations</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-yellow-500">⚠️</span>
              <span className="font-medium">Dependency conflicts</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-orange-500">⚠️</span>
              <span className="font-medium">Tool fragmentation</span>
            </div>
          </div>
        </div>

        <div className="surface p-6">
          <h3 className="text-xl font-bold mb-4 text-green-400">
            The Solution
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-green-500">✓</span>
              <span className="font-medium">Lightning-fast installs</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-500">✓</span>
              <span className="font-medium">Unified toolchain</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-500">✓</span>
              <span className="font-medium">Drop-in replacement</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-accent/10 to-accent2/10 rounded-lg border border-accent/20">
            <div className="text-lg font-bold text-accent">Enter UV 🚀</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatIsUvSlide() {
  return (
    <div className="mx-auto max-w-5xl w-full">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
            What is UV?
          </span>
        </h2>
        <p className="text-lg text-[var(--muted)]">
          One tool to replace pip, poetry, pyenv, and virtualenv
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="surface p-6">
          <div className="text-3xl mb-3 text-center">⚡</div>
          <h3 className="font-bold text-xl mb-3 text-center">Built in Rust</h3>
          <p className="text-sm text-[var(--muted)] text-center">
            Lightning-fast package resolution and installation
          </p>
        </div>

        <div className="surface p-6">
          <div className="text-3xl mb-3 text-center">🔄</div>
          <h3 className="font-bold text-xl mb-3 text-center">
            Drop-in Replacement
          </h3>
          <p className="text-sm text-[var(--muted)] text-center">
            Compatible with pip commands - no migration headaches
          </p>
        </div>

        <div className="surface p-6">
          <div className="text-3xl mb-3 text-center">🎯</div>
          <h3 className="font-bold text-xl mb-3 text-center">All-in-One</h3>
          <p className="text-sm text-[var(--muted)] text-center">
            Package management, virtual environments, Python installation
          </p>
        </div>

        <div className="surface p-6">
          <div className="text-3xl mb-3 text-center">🔒</div>
          <h3 className="font-bold text-xl mb-3 text-center">Reproducible</h3>
          <p className="text-sm text-[var(--muted)] text-center">
            Lock files ensure consistent environments
          </p>
        </div>
      </div>
    </div>
  );
}

function SpeedComparisonSlide() {
  return (
    <div className="mx-auto max-w-5xl w-full">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
            Speed Comparison
          </span>
        </h2>
        <p className="text-lg text-[var(--muted)]">
          UV vs Traditional Tools - Real World Benchmarks
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="surface p-8">
          <h3 className="text-xl font-bold mb-6">
            Installing Django + Dependencies
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <span className="font-medium">UV</span>
              <span className="text-green-400 font-bold">2.3s</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg">
              <span className="font-medium">pip</span>
              <span className="text-orange-400">45s</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg">
              <span className="font-medium">poetry</span>
              <span className="text-red-400">68s</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg">
              <span className="font-medium">pipenv</span>
              <span className="text-red-400">92s</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
            <div className="text-sm font-semibold text-accent">
              🚀 20-40x Faster
            </div>
            <div className="text-xs text-[var(--muted)]">
              Cold cache installation
            </div>
          </div>
        </div>

        <div className="surface p-8">
          <h3 className="text-xl font-bold mb-6">Why So Fast?</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-accent mt-2"></div>
              <div>
                <div className="font-semibold">Parallel Downloads</div>
                <div className="text-sm text-[var(--muted)]">
                  Multiple packages downloaded simultaneously
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-accent2 mt-2"></div>
              <div>
                <div className="font-semibold">Rust Performance</div>
                <div className="text-sm text-[var(--muted)]">
                  Zero-copy parsing and memory-efficient operations
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-accent mt-2"></div>
              <div>
                <div className="font-semibold">Smart Caching</div>
                <div className="text-sm text-[var(--muted)]">
                  Global cache with intelligent invalidation
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-accent2 mt-2"></div>
              <div>
                <div className="font-semibold">Advanced Resolution</div>
                <div className="text-sm text-[var(--muted)]">
                  Optimized dependency resolver algorithm
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KeyFeaturesSlide() {
  return (
    <div className="mx-auto max-w-5xl w-full">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">Key Features</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="surface p-6">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">📦</div>
            <h3 className="text-xl font-bold">Package Management</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 justify-center">
              <span className="text-green-500">✓</span>
              <span>pip-compatible commands</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <span className="text-green-500">✓</span>
              <span>pyproject.toml native</span>
            </div>
          </div>
        </div>

        <div className="surface p-6">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-xl font-bold">Performance</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 justify-center">
              <span className="text-green-500">✓</span>
              <span>Parallel operations</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <span className="text-green-500">✓</span>
              <span>Smart caching</span>
            </div>
          </div>
        </div>

        <div className="surface p-6">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">🐍</div>
            <h3 className="text-xl font-bold">Python Management</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 justify-center">
              <span className="text-green-500">✓</span>
              <span>Version management</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <span className="text-green-500">✓</span>
              <span>Virtual environments</span>
            </div>
          </div>
        </div>

        <div className="surface p-6">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">🔧</div>
            <h3 className="text-xl font-bold">Developer Tools</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 justify-center">
              <span className="text-green-500">✓</span>
              <span>Project scaffolding</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <span className="text-green-500">✓</span>
              <span>Script execution</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InstallationSlide() {
  return (
    <div className="mx-auto max-w-5xl w-full">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">Getting Started with UV</h2>
        <p className="text-lg text-[var(--muted)]">
          Installation is quick and easy
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="surface p-8">
          <h3 className="text-xl font-bold mb-6">Installation Options</h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span>🍎</span> macOS
              </h4>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                brew install uv
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span>🐧</span> Linux / WSL
              </h4>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                curl -LsSf https://astral.sh/uv/install.sh | sh
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span>🪟</span> Windows
              </h4>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span>🐍</span> Via pip
              </h4>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                pip install uv
              </div>
            </div>
          </div>
        </div>

        <div className="surface p-8">
          <h3 className="text-xl font-bold mb-6">Verify Installation</h3>

          <div className="space-y-4">
            <div>
              <div className="font-medium mb-2">Check version:</div>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                uv --version
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Get help:</div>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                uv --help
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Quick test:</div>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                uv pip list
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span className="font-semibold text-green-400">Ready to go!</span>
            </div>
            <div className="text-sm text-[var(--muted)] mt-1">
              UV is now installed and ready to use
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BasicUsageSlide() {
  return (
    <div className="mx-auto max-w-5xl w-full">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">Basic Usage</h2>
        <p className="text-lg text-[var(--muted)]">
          Common commands and workflows
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="surface p-8">
          <h3 className="text-xl font-bold mb-6">Package Operations</h3>

          <div className="space-y-4">
            <div>
              <div className="font-medium mb-2">Install packages:</div>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                uv pip install requests numpy
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Install from requirements:</div>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                uv pip install -r requirements.txt
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Upgrade packages:</div>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                uv pip install --upgrade requests
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">List installed:</div>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                uv pip list
              </div>
            </div>
          </div>
        </div>

        <div className="surface p-8">
          <h3 className="text-xl font-bold mb-6">Virtual Environments</h3>

          <div className="space-y-4">
            <div>
              <div className="font-medium mb-2">
                Create virtual environment:
              </div>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                uv venv myproject
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Activate (Unix):</div>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                source myproject/bin/activate
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Activate (Windows):</div>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                myproject\Scripts\activate
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Install in venv:</div>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                uv pip install --python myproject django
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 surface p-6">
        <h3 className="text-lg font-bold mb-4">💡 Pro Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-accent">•</span>
            <span>
              Use{" "}
              <code className="bg-[var(--surface)] px-1 rounded">--system</code>{" "}
              to install globally
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-accent2">•</span>
            <span>
              Add{" "}
              <code className="bg-[var(--surface)] px-1 rounded">
                --dry-run
              </code>{" "}
              to preview changes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectManagementSlide() {
  return (
    <div className="mx-auto max-w-5xl w-full">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
            Project Management
          </span>
        </h2>
        <p className="text-lg text-[var(--muted)]">
          Modern Python project workflows with UV
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="surface p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span>🚀</span> Creating New Projects
          </h3>

          <div className="space-y-4">
            <div>
              <div className="font-medium mb-2">Initialize new project:</div>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                uv init myproject
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Navigate and setup:</div>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                cd myproject
                <br />
                uv add requests pandas
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Run your code:</div>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                uv run hello.py
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
            <div className="text-sm font-semibold text-accent">
              ✨ Auto-creates
            </div>
            <ul className="text-xs text-[var(--muted)] mt-1 space-y-1">
              <li>• pyproject.toml with dependencies</li>
              <li>• .python-version file</li>
              <li>• Virtual environment</li>
              <li>• Lock file (uv.lock)</li>
            </ul>
          </div>
        </div>

        <div className="surface p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span>📋</span> Dependency Management
          </h3>

          <div className="space-y-4">
            <div>
              <div className="font-medium mb-2">Add dependencies:</div>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                uv add fastapi uvicorn
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Add dev dependencies:</div>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                uv add --dev pytest black
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Update all packages:</div>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                uv lock --upgrade
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Remove packages:</div>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                uv remove old-package
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 surface p-6">
        <h3 className="text-lg font-bold mb-4">📁 Project Structure</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[var(--surface)] p-4 rounded-lg border font-mono text-sm">
            <div className="text-[var(--muted)] mb-2">
              Generated project structure:
            </div>
            <div className="space-y-1">
              <div>myproject/</div>
              <div className="pl-4">├── pyproject.toml</div>
              <div className="pl-4">├── uv.lock</div>
              <div className="pl-4">├── .python-version</div>
              <div className="pl-4">├── README.md</div>
              <div className="pl-4">└── hello.py</div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div>
                <div className="font-semibold text-green-400">Reproducible</div>
                <div className="text-sm text-[var(--muted)]">
                  Lock files ensure exact versions
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <div>
                <div className="font-semibold text-blue-400">Isolated</div>
                <div className="text-sm text-[var(--muted)]">
                  Each project has its own environment
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
              <div>
                <div className="font-semibold text-purple-400">Standard</div>
                <div className="text-sm text-[var(--muted)]">
                  Uses modern Python packaging standards
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdvancedFeaturesSlide() {
  return (
    <div className="mx-auto max-w-5xl w-full">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">Advanced Features</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="surface p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span>🐍</span> Python Management
          </h3>
          <div className="space-y-2 text-sm">
            <div className="bg-[var(--surface)] p-2 rounded border font-mono">
              uv python install 3.12
            </div>
            <div className="bg-[var(--surface)] p-2 rounded border font-mono">
              uv python pin 3.11
            </div>
          </div>
          <p className="text-xs text-[var(--muted)] mt-2">
            Automatic Python version management
          </p>
        </div>

        <div className="surface p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span>🔧</span> Tool Management
          </h3>
          <div className="space-y-2 text-sm">
            <div className="bg-[var(--surface)] p-2 rounded border font-mono">
              uv tool install ruff
            </div>
            <div className="bg-[var(--surface)] p-2 rounded border font-mono">
              uv tool run black .
            </div>
          </div>
          <p className="text-xs text-[var(--muted)] mt-2">
            Isolated tool environments
          </p>
        </div>

        <div className="surface p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span>🏗️</span> Workspaces
          </h3>
          <div className="bg-[var(--surface)] p-3 rounded border font-mono text-sm">
            [tool.uv.workspace]
            <br />
            members = ["packages/*"]
          </div>
          <p className="text-xs text-[var(--muted)] mt-2">
            Multi-package repositories
          </p>
        </div>

        <div className="surface p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span>🎯</span> Script Execution
          </h3>
          <div className="bg-[var(--surface)] p-3 rounded border font-mono text-sm">
            uv run --with requests script.py
          </div>
          <p className="text-xs text-[var(--muted)] mt-2">
            Run with temporary dependencies
          </p>
        </div>
      </div>
    </div>
  );
}

function MigrationGuideSlide() {
  return (
    <div className="mx-auto max-w-5xl w-full">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
            Migration Guide
          </span>
        </h2>
        <p className="text-lg text-[var(--muted)]">
          Transitioning from existing tools to UV
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="surface p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="text-blue-500">📦</span> From pip
          </h3>

          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-red-400 mb-2">
                Before (pip):
              </div>
              <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20 font-mono text-sm">
                pip install requests
                <br />
                pip freeze {">"} requirements.txt
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-green-400 mb-2">
                After (UV):
              </div>
              <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20 font-mono text-sm">
                uv pip install requests
                <br />
                uv pip freeze {">"} requirements.txt
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
            <div className="text-sm font-semibold text-accent">
              ✅ Drop-in replacement
            </div>
            <div className="text-xs text-[var(--muted)]">
              Same commands, faster execution
            </div>
          </div>
        </div>

        <div className="surface p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="text-purple-500">📝</span> From Poetry
          </h3>

          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-red-400 mb-2">
                Before (Poetry):
              </div>
              <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20 font-mono text-sm">
                poetry init
                <br />
                poetry add requests
                <br />
                poetry install
                <br />
                poetry run python app.py
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-green-400 mb-2">
                After (UV):
              </div>
              <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20 font-mono text-sm">
                uv init
                <br />
                uv add requests
                <br />
                uv sync
                <br />
                uv run python app.py
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
            <div className="text-sm font-semibold text-accent">
              🚀 Similar workflow
            </div>
            <div className="text-xs text-[var(--muted)]">
              Familiar commands, better performance
            </div>
          </div>
        </div>

        <div className="surface p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="text-yellow-500">🔧</span> From pipenv
          </h3>

          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-red-400 mb-2">
                Before (pipenv):
              </div>
              <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20 font-mono text-sm">
                pipenv install requests
                <br />
                pipenv shell
                <br />
                pipenv run python app.py
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-green-400 mb-2">
                After (UV):
              </div>
              <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20 font-mono text-sm">
                uv add requests
                <br />
                uv shell # or source .venv/bin/activate
                <br />
                uv run python app.py
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
            <div className="text-sm font-semibold text-accent">
              ⚡ Much faster
            </div>
            <div className="text-xs text-[var(--muted)]">
              Eliminates slow pipenv operations
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 surface p-6">
        <h3 className="text-lg font-bold mb-4">🎯 Migration Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 text-accent">
              Step-by-step approach:
            </h4>
            <ol className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>Install UV alongside existing tools</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span>Test UV on new or non-critical projects</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>Migrate existing projects gradually</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  4
                </span>
                <span>Update CI/CD pipelines</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  5
                </span>
                <span>Train team on new workflows</span>
              </li>
            </ol>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-accent2">
              Migration helpers:
            </h4>
            <div className="space-y-3">
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                # Convert requirements.txt
                <br />
                uv add -r requirements.txt
              </div>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                # Import from poetry
                <br />
                uv init --from pyproject.toml
              </div>
              <div className="bg-[var(--surface)] p-3 rounded-lg border font-mono text-sm">
                # Export to requirements
                <br />
                uv export --format requirements-txt
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BenefitsSlide() {
  return (
    <div className="mx-auto max-w-5xl w-full">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
            Real-World Benefits
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="surface p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-green-500">⚡</span> Developer Impact
          </h3>
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20 mb-4">
            <div className="font-bold text-green-400 text-3xl">10-100x</div>
            <div className="text-sm text-[var(--muted)]">
              Faster installations
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Less waiting, more coding</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">✓</span>
              <span>One tool for everything</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-500">✓</span>
              <span>Better error messages</span>
            </div>
          </div>
        </div>

        <div className="surface p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-blue-500">🏢</span> Enterprise Value
          </h3>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 mb-4">
            <div className="font-bold text-blue-400 text-3xl">60%</div>
            <div className="text-sm text-[var(--muted)]">
              CI/CD time reduction
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-orange-500">✓</span>
              <span>Lower infrastructure costs</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500">✓</span>
              <span>Improved reliability</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Easier team onboarding</span>
            </div>
          </div>
        </div>
      </div>

      <div className="surface p-6">
        <h3 className="text-lg font-bold mb-4 text-center">
          📊 Success Stories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
          <div className="p-4 bg-accent/5 rounded-lg">
            <div className="text-2xl mb-2">🚀</div>
            <div className="font-semibold mb-1">AI Startup</div>
            <div className="text-[var(--muted)]">
              "Docker builds: 8min → 45s"
            </div>
          </div>
          <div className="p-4 bg-accent2/5 rounded-lg">
            <div className="text-2xl mb-2">🏢</div>
            <div className="font-semibold mb-1">Fortune 500</div>
            <div className="text-[var(--muted)]">
              "50+ services migrated successfully"
            </div>
          </div>
          <div className="p-4 bg-purple-500/5 rounded-lg">
            <div className="text-2xl mb-2">🎓</div>
            <div className="font-semibold mb-1">University</div>
            <div className="text-[var(--muted)]">"Setup: 30min → 2min"</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QASlide() {
  return (
    <div className="mx-auto max-w-5xl w-full">
      <div className="py-16 text-center">
        <div className="text-[clamp(32px,6vw,64px)] font-extrabold tracking-tight mb-8">
          <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
            Questions & Discussion
          </span>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <div className="surface p-6">
            <h3 className="text-xl font-bold mb-4">Ready to try UV?</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="https://docs.astral.sh/uv/"
                className="surface border border-accent/50 rounded-lg px-4 py-2 text-sm font-medium hover:bg-accent/10 transition-colors"
              >
                📚 Documentation
              </a>
              <a
                href="https://github.com/astral-sh/uv"
                className="surface border border-accent2/50 rounded-lg px-4 py-2 text-sm font-medium hover:bg-accent2/10 transition-colors"
              >
                🔧 GitHub Repository
              </a>
            </div>
          </div>

          <div className="text-lg text-[var(--muted)]">
            Thank you for your attention! 🚀
          </div>
        </div>
      </div>
    </div>
  );
}
