import os
import uvicorn
import requests
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import JWTBearer, WordColorAI, ContextModel, ChatGPT

# load_dotenv()

app = FastAPI() 

origins = [
    os.getenv('WEBSITE_URL'),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get Public Key from Auth Service
response = requests.get(f"{ os.environ['AUTH_SERVER_URL'] }/auth/public-key")
public_key = response.json()['publicKey']


# Endpoints
@app.get('/color/{word}')
def get_color(word: str):
    try:
        color = WordColorAI.get_color(word)

        return { 'color': color }
    except:
        return { 'color': '#ffffff' }
    

@app.post('/context', dependencies=[Depends(JWTBearer(public_key))])
def get_context(context_model: ContextModel):
    try:
        gpt = ChatGPT(context_model.context)
        context = gpt.ask(context_model.language, context_model.words)

        return context
    except:
        raise HTTPException(409, 'ChatGPT is too busy to answer the request.')
    

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)