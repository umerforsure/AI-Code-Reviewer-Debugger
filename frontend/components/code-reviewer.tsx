"use client"

import { useState } from "react"
import { TopBar } from "@/components/top-bar"
import { CodeEditor } from "@/components/code-editor"
import { AnalysisPanel } from "@/components/analysis-panel"
import type { AnalysisResponse } from "@/lib/types"

const SAMPLE_CODE = `function getUsers(users) {
  var result = []
  for (var i = 0; i < users.length; i++) {
    if (users[i].active == true) {
      result.push(users[i].name)
    }
  }
  return result
}`

const API_URL = "http://localhost:8000/analyze"

export function CodeReviewer() {
  const [code, setCode] = useState(SAMPLE_CODE)
  const [language, setLanguage] = useState("JavaScript")
  const [goal, setGoal] = useState("Improve readability and performance")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<AnalysisResponse | null>(null)

  async function handleAnalyze() {
    if (!code.trim()) {
      setError("Please enter some code to analyze.")
      setResult(null)
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, goal }),
      })

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status} ${res.statusText}`)
      }

      const data = await res.json()
      setResult(data.analysis) 
    } catch (err) {
      const message =
        err instanceof TypeError
          ? `Could not reach the analyzer at ${API_URL}. Make sure your backend is running.`
          : err instanceof Error
            ? err.message
            : "Something went wrong while analyzing the code."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4 p-4 md:p-6">
      <TopBar
        language={language}
        goal={goal}
        loading={loading}
        onLanguageChange={setLanguage}
        onGoalChange={setGoal}
        onAnalyze={handleAnalyze}
      />

      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
        <CodeEditor value={code} language={language} onChange={setCode} />
        <AnalysisPanel result={result} loading={loading} error={error} />
      </div>
    </main>
  )
}
