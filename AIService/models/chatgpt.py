import os
import openai
import json

class ChatGPT:
    def __init__(self, role):
        openai_key = os.getenv('OPENAI_KEY')
        openai.api_key = openai_key
        self.dialog = [{ 'role': 'system', 'content': role }]

    
    def ask(self, language: str, words: list[str]):
        question = f"Bring the words { ', '.join(words) } in context and answer in the language { language }."
        self.dialog.append({ 'role': 'user', 'content': question })
        ergebnis = openai.ChatCompletion.create(
            model='gpt-3.5-turbo',
            messages=self.dialog
        )
        antwort = ergebnis.choices[0].message.content

        return antwort