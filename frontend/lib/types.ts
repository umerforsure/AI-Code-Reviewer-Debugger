export type Severity = "low" | "medium" | "high" | "critical" | string

export interface AnalysisIssue {
  title?: string
  message?: string
  description?: string
  severity?: Severity
  line?: number
  [key: string]: unknown
}

export interface AnalysisResponse {
  score?: number
  issues?: Array<AnalysisIssue | string>
  improvements?: Array<string | { title?: string; description?: string }>
  refactored_code?: string
  [key: string]: unknown
}

export interface AnalyzeRequest {
  code: string
  language: string
  goal: string
}

export const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Go",
  "Rust",
  "Java",
  "C++",
  "C#",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin",
] as const
