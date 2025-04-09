import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

# Configure Gemini API
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)


def get_gemini_embedding(text_list):
    embeddings = [] 
    for text in text_list:
        response = genai.embed_content(
            model="models/embedding-001",
            content=text,
            task_type="retrieval_document",  # recommended for chunked docs
        )
        embeddings.append(response["embedding"])
    return embeddings
