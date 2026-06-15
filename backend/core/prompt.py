def build_review_prompt(code: str, language: str, goal: str):
    return f"""<|im_start|>system
You are a JSON API. You output ONLY raw JSON. No text before or after. No markdown. No explanation. No ```json fences. Only a single JSON object.
<|im_end|>
<|im_start|>user
Review this {language} code for the goal: {goal}

Code:
{code}

Respond with ONLY this JSON (fill in the values):
{{"score": 85, "issues": ["issue 1", "issue 2"], "improvements": ["improvement 1"], "refactored_code": "your code here"}}
<|im_end|>
<|im_start|>assistant
{{"""