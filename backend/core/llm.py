import requests
import json
import re


def extract_json(text: str):
    # Strip markdown fences
    text = re.sub(r"```(?:json)?", "", text).strip()
    # Find JSON object
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if match:
        return match.group(0)
    return None


def analyze_code(prompt: str):
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "deepseek-coder:6.7b",
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": 0.1,       # low = more predictable output
                "num_predict": 1024,
            },
            "stop": ["<|im_end|>", "<|im_start|>"]  # stop at chat tokens
        }
    )

    raw = response.json()["response"]

    # The prompt ended with `{` so prepend it back
    raw = "{" + raw

    json_str = extract_json(raw)

    if not json_str:
        return {
            "score": 0,
            "issues": ["Model did not return JSON. Try a simpler/shorter code snippet."],
            "improvements": [],
            "refactored_code": raw[:500]
        }

    try:
        return json.loads(json_str)
    except:
        return {
            "score": 0,
            "issues": ["JSON parse failed. Model output was malformed."],
            "improvements": [],
            "refactored_code": raw[:500]
        }