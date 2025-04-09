from pinecone import Pinecone, ServerlessSpec
from dotenv import load_dotenv
import os
import google.generativeai as genai

load_dotenv()
api_key = os.getenv("PINECONE_API_KEY")
genai_api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=genai_api_key)
pc = Pinecone(api_key=api_key)

index = pc.Index("skillsage")


def upsert_to_pinecone(chunks, embeddings, user_email):
    vectors = []
    for i, (text, embedding) in enumerate(zip(chunks, embeddings)):
        vectors.append(
            {
                "id": f"{user_email}_chunk_{i}",
                "values": embedding,
                "metadata": {"user_email": user_email, "text": text},
            }
        )

    index.upsert(vectors=vectors)
    print(f"✅ Upserted {len(vectors)} vectors for {user_email}")
