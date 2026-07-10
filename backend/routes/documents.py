from fastapi import APIRouter, UploadFile, File, Depends

from services.security import verify_token
from services.document_service import extract_pdf_text
from services.rag_service import store_document

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


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
    chunks = store_document(
    text,
    company_id
)


    return {
    "filename": file.filename,
    "company_id": company_id,
    "chunks_created": chunks,
    "message": "Document stored in company AI memory"
}