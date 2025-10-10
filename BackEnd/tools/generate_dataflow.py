"""
generate_dataflow.py

Create a PlantUML dataflow diagram from a parsed resume JSON file.

Usage:
  python generate_dataflow.py --input parsed_resume.json --output ../architecture_dataflow.puml

If input is not provided or not found, the script will create a small sample parsed JSON and generate the diagram from it.

The produced PlantUML file can be rendered with PlantUML (VSCode extension or CLI).
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any, Dict, List


SAMPLE = {
    "id": "sample-1",
    "text": "John Doe\nExperience: ...\nSkills: Python, SQL, FastAPI\nEducation: B.Sc Computer Science",
    "skills": ["Python", "SQL", "FastAPI"],
    "entities": {"emails": ["john@example.com"], "phones": ["+1-555-1234"]},
    "recommendations": ["Add metrics to experience", "Highlight SQL projects"]
}


def load_parsed(path: Path) -> Dict[str, Any]:
    if not path.exists():
        print(f"Input file {path} not found — writing sample to ./sample_parsed.json and using it")
        sample_path = Path("sample_parsed.json")
        sample_path.write_text(json.dumps(SAMPLE, indent=2, ensure_ascii=False))
        return SAMPLE

    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def safe_count(s: Any) -> int:
    if s is None:
        return 0
    if isinstance(s, (list, dict, str)):
        return len(s)
    try:
        return int(s)
    except Exception:
        return 1


def to_plantuml(data: Dict[str, Any], title: str = "Resume Dataflow") -> str:
    # Build a simple vertical dataflow diagram
    skills = data.get("skills", [])
    entities = data.get("entities", {})
    recs = data.get("recommendations", [])
    text = data.get("text", "")

    text_len = len(text)
    skills_count = safe_count(skills)
    emails_count = safe_count(entities.get("emails"))
    phones_count = safe_count(entities.get("phones"))
    recs_count = safe_count(recs)

    parts: List[str] = []
    parts.append("@startuml")
    parts.append(f"title {title}")
    parts.append("skinparam componentStyle rectangle")
    parts.append("skinparam ranksep 60")
    parts.append("top to bottom direction")
    parts.append("")

    parts.append('actor "User" as User')
    parts.append('component "Frontend (React + Vite)" as Frontend')
    parts.append('component "Parse API (FastAPI)" as Parser')
    parts.append('component "Parsed Text" as ParsedText')
    parts.append('component "Entities" as Entities')
    parts.append('component "Skills" as Skills')
    parts.append('component "Recommendations" as Recs')
    parts.append('database "MySQL" as DB')
    parts.append('component "Puter.js (in-browser AI)" as Puter')

    parts.append("")
    parts.append('User --> Frontend : open app / upload resume')
    parts.append(f'Frontend --> Parser : file upload (raw bytes)')
    parts.append(f'Parser --> ParsedText : extracted text ({text_len} chars)')
    parts.append(f'ParsedText --> Entities : detect emails ({emails_count}), phones ({phones_count})')
    parts.append(f'ParsedText --> Skills : detected ({skills_count})')
    parts.append(f'ParsedText --> Recs : generate ({recs_count})')
    parts.append('ParsedText --> Frontend : return parsed text')
    parts.append('Frontend --> Puter : analyze parsed text + JD (local)')
    parts.append('Frontend --> DB : save structured result (via Save API)')
    parts.append('DB --> Frontend : stored id / confirmation')

    parts.append("")
    parts.append('note top of ParsedText')
    parts.append('  Parsed text is the primary artifact created by the parser.')
    parts.append('end note')

    parts.append('note right of Skills')
    parts.append('  Skills are extracted entities used by the frontend and recommendations.')
    parts.append('end note')

    parts.append("")
    parts.append("@enduml")
    return "\n".join(parts)


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate PlantUML dataflow from parsed resume JSON")
    parser.add_argument("--input", "-i", type=Path, default=Path("parsed_resume.json"), help="Parsed JSON input file")
    parser.add_argument("--output", "-o", type=Path, default=Path("../architecture_dataflow.puml"), help="PlantUML output file")
    args = parser.parse_args()

    data = load_parsed(args.input)
    puml = to_plantuml(data, title=f"Dataflow for {data.get('id', 'resume')}")

    out_path = args.output
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(puml, encoding="utf-8")
    print(f"Wrote PlantUML dataflow to: {out_path}")


if __name__ == "__main__":
    main()
