# JuriSight: AI-Powered Legal Assistant for Digital India ⚖

JuriSight is a web-based application developed for the *Gen AI Exchange Hackathon*. It's designed to help everyday consumers and small business owners understand complex legal documents, with a special focus on bridging the language and accessibility gap in India.

## Problem Statement

* *Language Barrier*: A significant portion of the Indian population struggles with complex English, the primary language for legal documents, creating a major barrier to comprehension.
* *Low Legal Literacy*: The complexity and cost of legal services mean that a vast majority of citizens cannot afford or access timely legal aid, leaving them vulnerable.
* *Digital Divide*: Access to modern legal technology is heavily concentrated in urban centers, leaving rural and underserved populations with limited resources.

## Solution Impact

* *Simplify & Translate*: Jurisight will simplify complex legal documents and offer translations into regional languages, making them accessible to all.
* *Provide AI-Powered Guidance*: The application will serve as a "first-step" legal assistant, answering user questions and explaining clauses in simple terms.
* *Bridge the Access Gap*: By being a web-based tool, Jurisight aims to bring essential legal technology to rural and semi-urban users, promoting digital inclusion.

---

## Key Features

* *Multi-Format Document Upload*: Users can easily upload legal documents in various formats like PDF, DOCX, and TXT.
* *"At-a-Glance" Summaries*: Instantly generates a high-level summary of the document, highlighting key parties, dates, and financial figures.
* *Interactive Q&A*: A conversational chat interface, powered by a Retrieval-Augmented Generation (RAG) model, allows users to ask specific questions about their document.
* *Explainable AI (XAI) Module*: To ensure transparency and build trust, every answer is directly tied back to the source clause in the original document.

---

## Tech Stack & Architecture

Our solution is built on a modern, serverless architecture using Google Cloud, ensuring scalability and efficiency.

| Component      | Technology / Service                                                              |
| :------------- | :-------------------------------------------------------------------------------- |
| *Frontend* | [React](https://reactjs.org/)                                                     |
| *Backend* | [Python](https://www.python.org/) (using Flask)                                   |
| *AI Model* | [Google Vertex AI](https://cloud.google.com/vertex-ai) (Gemini API)               |
| *Deployment* | [Cloud Run](https://cloud.google.com/run), [Firebase Hosting](https://firebase.google.com/docs/hosting) |
| *Database* | [Cloud SQL](https://cloud.google.com/sql) (with pgvector for embeddings)          |
| *Processing* | [Document AI](https://cloud.google.com/document-ai), [Cloud Storage](https://cloud.google.com/storage), [Pub/Sub](https://cloud.google.com/pubsub)   |

### Architecture Diagram

```mermaid
graph TD
    subgraph Frontend & User Interaction
        UI[User Interface: Web Application]
    end

    subgraph Backend & Core Logic
        API[API Gateway / Backend Service: Cloud Run]
    end

    subgraph Data Ingestion & Processing
        A[User Uploads Document] --> B[Google Cloud Storage]
        B --> C[Cloud Pub/Sub (Trigger)]
        C --> D[Cloud Run (Ingestion Service)]
        D --> E[Google Cloud Document AI]
        E --> F[Vertex AI Gemini API (Embeddings)]
        F --> G[Cloud SQL (pgvector)]
    end

    subgraph AI & Data Retrieval
        H[Cloud SQL (pgvector)]
        I[Vertex AI Gemini API (Generation)]
    end

    subgraph Main Connections
        UI -- HTTP Requests --> API
        API -- Document Upload --> B
        API -- Query --> H
        API -- Generation Request --> I
        H -- Embeddings Retrieval --> API
        I -- Generated Response --> API
    end