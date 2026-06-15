"use client"

import {
  AlertTriangle,
  ArrowUpRight,
  Code2,
  FileSearch,
  Loader2,
  ShieldAlert,
  Sparkles,
  TriangleAlert,
} from "lucide-react"
import type { AnalysisIssue, AnalysisResponse } from "@/lib/types"

interface AnalysisPanelProps {
  result: AnalysisResponse | null
  loading: boolean
  error: string | null
}

export function AnalysisPanel({ result, loading, error }: AnalysisPanelProps) {
  return (
    <section
      aria-label="Analysis results"
      className="glass flex min-h-[420px] flex-col overflow-hidden rounded-2xl shadow-sm lg:min-h-0"
    >
      <div className="flex items-center gap-2 border-b border-white/40 px-5 py-3.5">
        <FileSearch className="size-4 text-primary" aria-hidden="true" />
        <h2 className="text-sm font-semibold">Analysis</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {loading && <LoadingState />}
        {!loading && error && <ErrorState message={error} />}
        {!loading && !error && !result && <EmptyState />}
        {!loading && !error && result && <Results result={result} />}
      </div>
    </section>
  )
}

function Results({ result }: { result: AnalysisResponse }) {
  return (
    <div className="flex flex-col gap-5">
      {typeof result.score === "number" && <ScoreCard score={result.score} />}
      <IssuesSection issues={result.issues} />
      <ImprovementsSection improvements={result.improvements} />
      <RefactoredCodeSection code={result.refactored_code} />
    </div>
  )
}

function ScoreCard({ score }: { score: number }) {
  const pct = Math.max(0, Math.min(100, score))
  const tone =
    pct >= 80
      ? "text-emerald-600"
      : pct >= 50
        ? "text-amber-600"
        : "text-rose-600"
  const bar =
    pct >= 80 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-rose-500"

  return (
    <div className="rounded-xl border border-border bg-card/60 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" aria-hidden="true" />
          <h3 className="text-sm font-semibold">Quality Score</h3>
        </div>
        <span className={`text-2xl font-bold tabular-nums ${tone}`}>
          {pct}
          <span className="text-sm font-medium text-muted-foreground">/100</span>
        </span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all ${bar}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function IssuesSection({ issues }: { issues: AnalysisResponse["issues"] }) {
  return (
    <div>
      <SectionHeader
        icon={<TriangleAlert className="size-4 text-amber-600" aria-hidden="true" />}
        title="Issues"
        count={issues?.length}
      />
      {!issues || issues.length === 0 ? (
        <EmptyHint text="No issues reported." />
      ) : (
        <ul className="mt-2 flex flex-col gap-2">
          {issues.map((issue, i) => {
            const normalized: AnalysisIssue =
              typeof issue === "string" ? { message: issue } : issue
            const title =
              normalized.title ?? normalized.message ?? normalized.description ?? "Issue"
            const detail =
              normalized.title && (normalized.message ?? normalized.description)
                ? normalized.message ?? normalized.description
                : undefined
            return (
              <li
                key={i}
                className="rounded-xl border border-border bg-card/60 p-3"
              >
                <div className="flex items-start gap-2.5">
                  <SeverityBadge severity={normalized.severity} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{title}</p>
                    {detail && (
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {detail}
                      </p>
                    )}
                    {typeof normalized.line === "number" && (
                      <span className="mt-1 inline-block font-mono text-[11px] text-muted-foreground">
                        line {normalized.line}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function ImprovementsSection({
  improvements,
}: {
  improvements: AnalysisResponse["improvements"]
}) {
  return (
    <div>
      <SectionHeader
        icon={<ArrowUpRight className="size-4 text-primary" aria-hidden="true" />}
        title="Improvements"
        count={improvements?.length}
      />
      {!improvements || improvements.length === 0 ? (
        <EmptyHint text="No improvements suggested." />
      ) : (
        <ul className="mt-2 flex flex-col gap-2">
          {improvements.map((item, i) => {
            const title = typeof item === "string" ? item : item.title
            const description = typeof item === "string" ? undefined : item.description
            return (
              <li
                key={i}
                className="flex items-start gap-2.5 rounded-xl border border-border bg-card/60 p-3"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <div>
                  <p className="text-sm text-foreground">{title}</p>
                  {description && (
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function RefactoredCodeSection({ code }: { code?: string }) {
  return (
    <div>
      <SectionHeader
        icon={<Code2 className="size-4 text-emerald-600" aria-hidden="true" />}
        title="Refactored Code"
      />
      {!code ? (
        <EmptyHint text="No refactored code provided." />
      ) : (
        <pre className="mt-2 overflow-x-auto rounded-xl bg-[oklch(0.18_0.02_257)] p-4 font-mono text-xs leading-6 text-[oklch(0.92_0.02_150)]">
          <code>{code}</code>
        </pre>
      )}
    </div>
  )
}

function SectionHeader({
  icon,
  title,
  count,
}: {
  icon: React.ReactNode
  title: string
  count?: number
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <h3 className="text-sm font-semibold">{title}</h3>
      {typeof count === "number" && count > 0 && (
        <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {count}
        </span>
      )}
    </div>
  )
}

function SeverityBadge({ severity }: { severity?: string }) {
  const s = (severity ?? "info").toLowerCase()
  const styles: Record<string, string> = {
    critical: "bg-rose-100 text-rose-700",
    high: "bg-rose-100 text-rose-700",
    medium: "bg-amber-100 text-amber-700",
    low: "bg-sky-100 text-sky-700",
    info: "bg-slate-100 text-slate-600",
  }
  const cls = styles[s] ?? styles.info
  return (
    <span
      className={`mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold capitalize ${cls}`}
    >
      <ShieldAlert className="size-3" aria-hidden="true" />
      {severity ?? "info"}
    </span>
  )
}

function EmptyHint({ text }: { text: string }) {
  return <p className="mt-2 text-sm text-muted-foreground">{text}</p>
}

function LoadingState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
      <Loader2 className="size-7 animate-spin text-primary" aria-hidden="true" />
      <p className="text-sm font-medium text-foreground">Reviewing your code…</p>
      <p className="text-xs text-muted-foreground">This may take a few seconds.</p>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-muted">
        <FileSearch className="size-6 text-muted-foreground" aria-hidden="true" />
      </div>
      <p className="text-sm font-medium text-foreground">No analysis yet</p>
      <p className="max-w-xs text-pretty text-xs text-muted-foreground">
        Paste your code, set a goal, and hit Analyze to see the score, issues,
        improvements, and a refactored version.
      </p>
    </div>
  )
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-rose-100">
        <AlertTriangle className="size-6 text-rose-600" aria-hidden="true" />
      </div>
      <p className="text-sm font-medium text-foreground">Analysis failed</p>
      <p className="max-w-xs text-pretty text-xs text-muted-foreground">{message}</p>
    </div>
  )
}
