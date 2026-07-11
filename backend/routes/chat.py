from utils.validators import validate_object_id
from fastapi import APIRouter, Depends, HTTPException
from models.chat import ChatRequest
from services.security import verify_token
from services.ai_service import generate_response
from services.rag_service import search_document

from database import get_database


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


db = get_database()



@router.post("/ask/{company_id}")
def ask_question(
    company_id: str,
    request: ChatRequest,
    user_email=Depends(verify_token)
):


    company = db.companies.find_one(
        {
            "_id": validate_object_id(company_id)
        }
    )


    if not company:

        raise HTTPException(
            status_code=404,
            detail="Company not found"
        )


    if user_email not in company["members"]:

        raise HTTPException(
            status_code=403,
            detail="You are not member of this company"
        )



    relevant_docs = search_document(
        request.question,
        company_id
    )


    context = "\n".join(
        relevant_docs
    )


    answer = generate_response(
        request.question,
        context
    )



    db.chats.insert_one(
        {
            "company_id": company_id,

            "user": user_email,

            "question": request.question,

            "answer": answer
        }
    )



    return {
        "company": company["name"],

        "question": request.question,

        "answer": answer
    }

@router.get("/history/{company_id}")
def get_chat_history(
    company_id: str,
    user_email=Depends(verify_token)
):


    chats = db.chats.find(
        {
            "company_id": company_id,
            "user": user_email
        }
    )


    result = []


    for chat in chats:

        result.append(
            {
                "question": chat["question"],

                "answer": chat["answer"]
            }
        )


    return result