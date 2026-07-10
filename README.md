# SmartSupport AI

SmartSupport AI is a multi-tenant AI customer support platform that allows companies to upload documents and create AI assistants powered by Retrieval Augmented Generation (RAG).

## Features

- User Authentication with JWT
- Secure Password Hashing
- Company Workspace Management
- Add Company Members
- PDF Document Upload
- Text Extraction
- Vector Embeddings
- ChromaDB Vector Database
- RAG Based Question Answering
- Local LLM Integration using Ollama
- Llama 3.1 Support
- Chat History Storage

## Tech Stack

### Backend
- FastAPI
- Python
- MongoDB
- ChromaDB

### AI
- Ollama
- Llama 3.1
- Sentence Transformers
- RAG Architecture

## Architecture

User
↓  
FastAPI API
↓  
JWT Authentication
↓  
Company Workspace
↓  
Document Processing
↓  
ChromaDB Vector Search
↓  
Llama 3.1 AI Model
↓  
AI Response


## Project Structure
