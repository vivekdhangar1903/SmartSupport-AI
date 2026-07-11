from fastapi import APIRouter, UploadFile, File, Depends
from datetime import datetime
from bson import ObjectId

from services.security import verify_token
from services.document_service import extract_pdf_text
from services.rag_service import (
    store_document,
    delete_document_vectors
)

from database import get_database


router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


db = get_database()



@router.post("/upload/{company_id}")
async def upload_document(
    company_id: str,
    file: UploadFile = File(...),
    user=Depends(verify_token)
):

    file_path = f"uploads/{file.filename}"


    with open(file_path, "wb") as f:

        f.write(
            await file.read()
        )


    text = extract_pdf_text(
        file_path
    )


    document = db.documents.insert_one(

        {
            "company_id": company_id,

            "filename": file.filename,

            "uploaded_at": datetime.utcnow()
        }

    )


    document_id = str(
        document.inserted_id
    )


    chunks = store_document(
        text,
        company_id,
        document_id
    )


    return {

        "filename": file.filename,

        "company_id": company_id,

        "document_id": document_id,

        "chunks_created": chunks,

        "message": "Document stored in company AI memory"

    }





@router.get("/list/{company_id}")
def list_documents(
    company_id: str,
    user=Depends(verify_token)
):


    docs = db.documents.find(
        {
            "company_id": company_id
        }
    )


    result = []


    for doc in docs:

        result.append(

            {
                "id": str(doc["_id"]),

                "filename": doc["filename"],

                "uploaded_at": doc["uploaded_at"]
            }

        )


    return result

@router.delete("/delete/{document_id}")
def delete_document(
    document_id: str,
    user=Depends(verify_token)
):


    result = db.documents.delete_one(
        {
            "_id": ObjectId(document_id)
        }
    )


    if result.deleted_count == 0:

        return {
            "message":"Document not found"
        }


    delete_document_vectors(
        document_id
    )


    return {

        "message":
        "Document deleted successfully"

    }