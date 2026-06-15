"use client"

import { useMemo } from "react"

interface CodeEditorProps {
  value: string
  language: string
  onChange: (value: string) => void
}

export function CodeEditor({ value, language, onChange }: CodeEditorProps) {
  const lineCount = useMemo(() => Math.max(value.split("\n").length, 1), [value])
  const lineNumbers = useMemo(
    () => Array.from({ length: lineCount }, (_, i) => i + 1),
    [lineCount],
  )

  return (
    <section
      aria-label="Code editor"
      className="glass flex min-h-[420px] flex-col overflow-hidden rounded-2xl shadow-sm lg:min-h-0"
    >
      {/* Editor chrome */}
      <div className="flex items-center justify-between border-b border-white/40 bg-[oklch(0.22_0.02_257)] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-xs text-white/60">
          source.{extensionFor(language)}
        </span>
        <span className="font-mono text-xs text-white/40">{lineCount} lines</span>
      </div>

      {/* Editor body */}
      <div className="relative flex flex-1 overflow-hidden bg-[oklch(0.18_0.02_257)]">
        <div
          aria-hidden="true"
          className="select-none overflow-hidden py-4 pl-4 pr-3 text-right font-mono text-sm leading-6 text-white/25"
        >
          {lineNumbers.map((n) => (
            <div key={n}>{n}</div>
          ))}
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          placeholder="Paste your code here…"
          className="flex-1 resize-none bg-transparent py-4 pr-4 font-mono text-sm leading-6 text-[oklch(0.92_0.02_150)] caret-primary outline-none placeholder:text-white/30"
        />
      </div>
    </section>
  )
}

function extensionFor(language: string): string {
  const map: Record<string, string> = {
    JavaScript: "js",
    TypeScript: "ts",
    Python: "py",
    Go: "go",
    Rust: "rs",
    Java: "java",
    "C++": "cpp",
    "C#": "cs",
    Ruby: "rb",
    PHP: "php",
    Swift: "swift",
    Kotlin: "kt",
  }
  return map[language] ?? "txt"
}
