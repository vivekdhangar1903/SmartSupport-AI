from fastapi import FastAPI
from database import get_database
from routes import auth, chat, documents, company


app = FastAPI(
    title="SmartSupport AI",
    description="AI Customer Support Assistant Backend",
    version="1.0.0"
)
app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(documents.router)
app.include_router(company.router)
@app.get("/")
def home():
    return {
        "message": "SmartSupport AI Backend Running 🚀"
    }


@app.get("/health")
def health_check():

    db = get_database()

    return {
        "status": "healthy",
        "database": db.name
    }