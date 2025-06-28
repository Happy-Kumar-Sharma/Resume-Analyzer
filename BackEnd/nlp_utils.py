import spacy
from typing import Dict, List

nlp = spacy.load("en_core_web_sm")

SKILL_KEYWORDS = [
    "python", "java", "c++", "nlp", "machine learning", "deep learning", "sql", "docker", "aws", "react", "fastapi", "django", "flask"
]

def extract_entities(text: str) -> Dict:
    doc = nlp(text)
    skills = [token.text for token in doc if token.text.lower() in SKILL_KEYWORDS]
    education = [ent.text for ent in doc.ents if ent.label_ == "ORG" or "university" in ent.text.lower()]
    experience = [sent.text for sent in doc.sents if any(word in sent.text.lower() for word in ["engineer", "developer", "manager", "intern"])]
    email = None
    phone = None
    for ent in doc.ents:
        if ent.label_ == "EMAIL":
            email = ent.text
        if ent.label_ == "PHONE":
            phone = ent.text
    name = doc.ents[0].text if doc.ents else None
    return {
        "name": name,
        "email": email,
        "phone": phone,
        "skills": list(set(skills)),
        "education": list(set(education)),
        "experience": list(set(experience)),
    }
