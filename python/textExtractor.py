from pypdf import PdfReader
import requests
from io import BytesIO
from langchain.text_splitter import RecursiveCharacterTextSplitter
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()
# Configure Gemini API
api_key = os.getenv("GEMINI_API_KEY")

prompt = """You are a highly accurate and context-aware resume parser. Given raw resume text, extract and organize key candidate details in a well-structured and readable format.

Begin with Personal Information in the exact format below:
Name:  
Phone Number:  
Location:  
Gmail ID:  
LinkedIn:  
GitHub:  

Then move on to the Education section and organize it into levels: Primary, Secondary, Graduation, Post-Graduation, and PhD (only include those levels present in the resume). For each level, provide the institution name, field of study, percentage or CGPA, and duration/years attended. Ensure consistent formatting and group by education level.

Next, for the Work Experience section, extract each job and format it as a paragraph with the following structure:  
Company Name:  
Location:  
Job Role:  
Duration:  
Responsibilities/Accomplishments:
- (List responsibilities and accomplishments as bullet points, focusing on achievements, systems developed, technologies used, and quantifiable outcomes.)

Then extract the Projects. For each project, include the following in paragraph format:
Title:  
Tech Stack:  
Description:  
GitHub Link:  
Dates:  

Follow that with a Certificates or Achievements section. For each item, include:
Name:  
Tech/Domain:  
Description:  
Issuer (if available):  
Date (if available):  

Then extract Technical Skills and categorize them under:
Languages, Frameworks/Libraries, Databases, Tools, and Core CS Concepts (like DSA, OOPs, OS, Networking, DBMS). Present each as a list.

After that, extract Extracurricular Activities and Leadership Roles. For each, mention:
Position/Role:  
Organization/Club:  
Key Contributions and Impact:  

If Publications are present, include:
Title:  
Conference/Journal:  
Year:  
Summary:  

Finally, add any Additional Information such as:
- Hobbies/Personal Interests  
- Languages Known  
- Volunteer Experience  
- Portfolio/Website Links  

Ensure the output is well-formatted, complete, and only uses information from the input resume. Do not add or assume any data. Present the result in a clear, formal paragraph structure with consistent headings and spacing. Do not use bold text, emojis, or markdown."""


def extract_text_from_pdf_url(url: str) -> str:
    response = requests.get(url)
    pdf_file = BytesIO(response.content)

    reader = PdfReader(pdf_file)
    full_text = ""

    for page in reader.pages:
        extracted = page.extract_text()
        if extracted:
            full_text += extracted

    genai.configure(api_key=api_key)

    model = genai.GenerativeModel(model_name="gemini-2.0-flash")
    response = model.generate_content(f"{prompt}\n\n\n\n{full_text}")

    print("RESPONSE TEXT-\n", response.text)
    return response.text


### https://api.python.langchain.com/en/latest/text_splitter/langchain.text_splitter.RecursiveCharacterTextSplitter.html#
def chunk_data(docs, chunk_size=800, chunk_overlap=50):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size, chunk_overlap=chunk_overlap
    )
    doc = text_splitter.split_documents(docs)
    return doc
