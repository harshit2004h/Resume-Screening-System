from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from textExtractor import extract_text_from_pdf_url, chunk_data
from geminiAPI import get_gemini_embedding
from langchain.schema import Document

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ResumeURL(BaseModel):
    url: str
    name: str


@app.post("/upload-url")
async def receive_resume_url(data: ResumeURL):
    print("✅ PDF URL received:", data.url)
    print("✅ PDF Name received:", data.name)

    full_text = extract_text_from_pdf_url(data.url)

    # Wrap into Document object
    documents = [Document(page_content=full_text)]

    # Split text into chunks
    split_text = chunk_data(documents)

    # Get Gemini embeddings
    embeddings = get_gemini_embedding([chunk.page_content for chunk in split_text])

    print("✅ Embeddings generated", embeddings)
    return {
        "message": "Embeddings generated successfully!",
        "chunks": [chunk.page_content for chunk in split_text],
        "embeddings": embeddings,
    }
