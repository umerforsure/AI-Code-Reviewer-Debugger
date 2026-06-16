def build_review_prompt(code: str, language: str, goal: str):
    return f"""You are a code review API. Analyze the following {language} code.

GOAL: {goal}

CODE:
{code}

Respond with ONLY a valid JSON object in this exact format, nothing else:
{{
  "score": <number 0-100>,
  "issues": ["issue 1", "issue 2"],
  "improvements": ["improvement 1", "improvement 2"],
  "refactored_code": "full refactored code here"
}}"""