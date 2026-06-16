"use client"

import { ChevronDown, Sparkles, Loader2, Code2 } from "lucide-react"
import { LANGUAGES } from "@/lib/types"

interface TopBarProps {
  language: string
  goal: string
  loading: boolean
  onLanguageChange: (value: string) => void
  onGoalChange: (value: string) => void
  onAnalyze: () => void
}

export function TopBar({
  language,
  goal,
  loading,
  onLanguageChange,
  onGoalChange,
  onAnalyze,
}: TopBarProps) {
  return (
    <header className="glass sticky top-0 z-20 rounded-2xl px-4 py-3 shadow-sm md:px-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Code2 className="size-5" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <h1 className="text-pretty text-sm font-semibold">AI Code Reviewer & Debugger</h1>
            <p className="text-xs text-muted-foreground">Analyze, score &amp; refactor</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          {/* Language dropdown */}
          <div className="relative sm:w-44">
            <label htmlFor="language" className="sr-only">
              Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="w-full appearance-none rounded-xl border border-border bg-card/70 px-3.5 py-2.5 pr-9 text-sm font-medium text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
          </div>

          {/* Goal input */}
          <div className="flex-1">
            <label htmlFor="goal" className="sr-only">
              Review goal
            </label>
            <input
              id="goal"
              type="text"
              value={goal}
              onChange={(e) => onGoalChange(e.target.value)}
              placeholder="What should the review focus on? e.g. performance, security, readability"
              className="w-full rounded-xl border border-border bg-card/70 px-3.5 py-2.5 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
            />
          </div>

          {/* Analyze button */}
          <button
            type="button"
            onClick={onAnalyze}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Sparkles className="size-4" aria-hidden="true" />
            )}
            {loading ? "Analyzing…" : "Analyze"}
          </button>
        </div>
      </div>
    </header>
  )
}
