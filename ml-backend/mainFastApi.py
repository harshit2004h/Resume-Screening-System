from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI()
# Allow requests from your frontend (e.g., localhost:3000 or your domain)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],  # For development: allow everything. Change this in production!
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

    pdf_data = requests.get(data.url)
    with open(data.name, "wb") as f:
        f.write(pdf_data.content)

    return {"message": "PDF URL received and saved successfully!"}
