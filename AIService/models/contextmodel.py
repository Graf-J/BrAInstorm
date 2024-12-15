from pydantic import BaseModel

class ContextModel(BaseModel):
    language: str
    context: str
    words: list[str]