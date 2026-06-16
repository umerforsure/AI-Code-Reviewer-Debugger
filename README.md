# 🤖 AI Code Reviewer & Debugger

> Paste your code, get an instant quality score, bug report, improvement suggestions, and a refactored version — all powered by a local AI. No paid APIs. No data sent to the cloud.

![Python](https://img.shields.io/badge/Python-3.10+-blue?style=flat-square&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green?style=flat-square&logo=fastapi)
![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![Ollama](https://img.shields.io/badge/Ollama-local%20LLM-orange?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-purple?style=flat-square)

---

## ✨ What It Does

- **Quality Score** — rates your code from 0 to 100
- **Bug Detection** — finds issues like unhandled exceptions, resource leaks, type errors
- **Improvement Suggestions** — tells you exactly what to fix and why
- **Auto Refactoring** — rewrites your code with the fixes applied
- **12 Languages Supported** — Python, JavaScript, TypeScript, Go, Rust, Java, C++, C#, Ruby, PHP, Swift, Kotlin

---

## 🖼️ Preview

| Code Input | Analysis Output |
|---|---|
| Paste your buggy code on the left | Get score, issues, and refactored code on the right |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend | FastAPI (Python) |
| AI Model | DeepSeek Coder 6.7B via Ollama |
| Communication | REST API |

**100% free and local** — the AI runs on your own machine via Ollama. No OpenAI key needed.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://python.org/) (3.10+)
- [Ollama](https://ollama.com/) — for running the AI locally

### 1. Clone the repo

```bash
git clone https://github.com/umerforsure/AI-Code-Reviewer-Debugger.git
cd AI-Code-Reviewer
```

### 2. Set up Ollama and pull the model

```bash
# Install Ollama from https://ollama.com then run:
ollama pull deepseek-coder:6.7b
```

### 3. Start the backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`

### 4. Start the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`

### 5. Open the app

Go to [http://localhost:3000](http://localhost:3000), paste your code, set a goal, and hit **Analyze**.

---

## 📁 Project Structure

```
AI-Code-Reviewer/
├── backend/
│   ├── main.py              # FastAPI app entry point
│   ├── api/
│   │   └── routes.py        # /analyze endpoint
│   └── core/
│       ├── llm.py           # Ollama API call + JSON parsing
│       └── prompt.py        # Prompt builder
├── frontend/
│   └── src/
│       ├── app/
│       │   └── page.tsx
│       ├── components/
│       │   ├── code-reviewer.tsx   # Main component
│       │   ├── analysis-panel.tsx  # Results display
│       │   ├── code-editor.tsx     # Code input
│       │   └── top-bar.tsx         # Language + goal selector
│       └── lib/
│           └── types.ts
└── README.md
```

---

## 🔌 API

### `POST /analyze`

**Request:**
```json
{
  "code": "def divide(a, b):\n    return a / b",
  "language": "Python",
  "goal": "Find bugs and fix them"
}
```

**Response:**
```json
{
  "analysis": {
    "score": 85,
    "issues": ["ZeroDivisionError: division by zero"],
    "improvements": ["Add input validation"],
    "refactored_code": "def divide(a, b):\n    if b == 0:\n        return None\n    return a / b"
  }
}
```

---

## 🤝 Contributing

Pull requests are welcome! If you find a bug or want to add a feature, feel free to open an issue first.

---

## 👤 Author

**Umer** — [@umerforsure](https://github.com/umerforsure)

---

## ⭐ Support

If this project helped you, give it a star on GitHub — it helps a lot!
