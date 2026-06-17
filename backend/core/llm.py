import requests
import json
import re


def extract_json(text: str):
    # Strip markdown fences
    text = re.sub(r"```(?:json)?", "", text).strip()
    text = re.sub(r"```", "", text).strip()
    
    # Find the first { and last } and grab everything between
    start = text.find("{")
    end = text.rfind("}")
    
    if start == -1 or end == -1:
        return None
        
    return text[start:end+1]


def analyze_code(prompt: str):
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "qwen2.5-coder:7b",
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": 0.1,
                "num_predict": 4096,
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
    except json.JSONDecodeError as e:
        # Try to fix truncated JSON by closing open brackets
        try:
            fixed = json_str
            open_braces = fixed.count("{") - fixed.count("}")
            open_brackets = fixed.count("[") - fixed.count("]")
            fixed += "]" * open_brackets + "}" * open_braces
            return json.loads(fixed)
        except:
            return {
                "score": 0,
                "issues": ["JSON parse failed. Model output was malformed."],
                "improvements": [],
                "refactored_code": raw[:500]
            }