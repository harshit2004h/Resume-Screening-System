from pypdf import PdfReader
import requests
from io import BytesIO
from langchain.text_splitter import RecursiveCharacterTextSplitter

def extract_text_from_pdf_url(url: str) -> str:
    response = requests.get(url)
    pdf_file = BytesIO(response.content)

    reader = PdfReader(pdf_file)
    full_text = ""

    for page in reader.pages:
        extracted = page.extract_text()
        if extracted:
            full_text += extracted

    print("📝 Full Extracted Text:\n", full_text)
    return full_text


### https://api.python.langchain.com/en/latest/text_splitter/langchain.text_splitter.RecursiveCharacterTextSplitter.html#
def chunk_data(docs, chunk_size=800, chunk_overlap=50):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size, chunk_overlap=chunk_overlap
    )
    doc = text_splitter.split_documents(docs)
    return doc
