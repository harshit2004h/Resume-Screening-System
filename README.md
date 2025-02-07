# AI-Powered Resume Screening System

## 🚀 Overview

An AI-driven hiring platform that automates resume screening, skill matching, and employer-employee interaction. This system helps HR professionals efficiently analyze resumes, shortlist candidates, and schedule interviews—all powered by **AI & NLP models**.

## 🌟 Features

### 📂 Resume Upload & AI-Powered Parsing

- Supports **PDF, DOCX, TXT, JSON** formats
- Extracts **Skills, Experience, Education, Projects**
- Powered by **Hugging Face Transformers** for text analysis

### 🎯 Smart Resume Ranking System

- AI matches resumes to job descriptions
- Uses **Cosine Similarity** for ranking
- **LangChain-based RAG system** for employer queries

### 📊 HR Dashboard with Skill Visualization

- **Advanced Search & Filtering** (by skills, experience, location)
- **AI-powered skill categorization** (ML, Web, Data Science, etc.)
- Visual analytics powered by **Plotly.js**

### 💬 Real-Time Communication & Scheduling

- **WebSockets-based Chat** between employees & employers
- **Google Calendar API Integration** for interview scheduling
- Automated email & SMS notifications

## 🛠️ Tech Stack

### **Frontend**

- **Next.js (React)** – Modern UI
- **TailwindCSS** – Styling
- **Redux Toolkit** – State management

### **Backend**

- **FastAPI (Python)** – API for AI processing
- **Node.js + Express.js** – Additional APIs
- **LangChain** – AI-powered resume search

### **AI & Data Processing**

- **Hugging Face Transformers** – AI resume parsing
- **OpenAI Embeddings** – Resume skill matching
- **Pinecone / ChromaDB** – Vector database for searches

### **Storage & Deployment**

- **UploadThing / Firebase Storage** – File uploads
- **PostgreSQL + MongoDB (Hybrid)** – Structured & unstructured data

## 📌 API Endpoints

### **Resume Upload & Parsing**

- `POST /upload-resume` – Uploads and parses resumes
- `GET /search-resumes` – Retrieves resumes based on job criteria

### **Chat & Interview Scheduling**

- `POST /create-event` – Creates interview events using Google Calendar API
- `GET /messages` – Fetch chat messages between candidates and employers

## 📜 License

This project is licensed under the **MIT License**.

---

🚀 **Contributions are welcome!** Feel free to open issues and submit PRs. Happy coding!
