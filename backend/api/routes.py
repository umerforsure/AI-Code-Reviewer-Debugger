from fastapi import APIRouter
from core.llm import analyze_code
from core.prompt import build_review_prompt

router = APIRouter()


@router.post("/analyze")
def analyze(request: dict):

    prompt = build_review_prompt(
        code=request["code"],
        language=request["language"],
        goal=request["goal"]
    )

    result = analyze_code(prompt)

    return {
        "analysis": result
    }