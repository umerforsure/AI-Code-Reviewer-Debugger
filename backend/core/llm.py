import requests
import json
import re


def extract_json(text: str):
    text = re.sub(r"```(?:json)?", "", text).strip()
    text = re.sub(r"```", "", text).strip()
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if match:
        return match.group(0)
    return None


def analyze_code(prompt: str):
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "qwen2.5-coder:7b",
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": 0.1,
                "num_predict": 2048,
            }
        }
    )

    raw = response.json()["response"]
    json_str = extract_json(raw)

    if not json_str:
        return {
            "score": 0,
            "issues": ["Model did not return valid JSON."],
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