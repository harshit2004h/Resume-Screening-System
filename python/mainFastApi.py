from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from pypdf import PdfReader
import requests
from io import BytesIO

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

    response = requests.get(data.url)
    pdf_file = BytesIO(response.content)

    reader = PdfReader(pdf_file)
    full_text = ""
    for page in reader.pages:
        extracted = page.extract_text()
        if extracted:
            full_text += extracted

    print("Full Extracted Text:\n", full_text)

    return {
        "message": "PDF read and full text extracted successfully!",
        "text": full_text,
    }
