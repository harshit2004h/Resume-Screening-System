from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from textExtractor import extract_text_from_pdf_url, chunk_data
from geminiAPI import get_gemini_embedding
from pineconeClient import upsert_to_pinecone
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
    email: str


@app.post("/upload-url")
async def receive_resume_url(data: ResumeURL):
    print("✅ PDF URL received:", data.url)
    print("✅ Name received:", data.name)
    print("✅ Email received:", data.email)

    full_text = extract_text_from_pdf_url(data.url)
    documents = [Document(page_content=full_text)]
    split_text = chunk_data(documents)
    chunks = [chunk.page_content for chunk in split_text]

    embeddings = get_gemini_embedding(chunks)

    upsert_to_pinecone(chunks, embeddings, data.email)

    return {
        "message": "Embeddings generated and stored successfully!",
        "chunks": chunks,
        "embeddings": embeddings,
    }
