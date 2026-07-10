from fastapi import APIRouter, Depends, HTTPException

from bson import ObjectId

from utils.validators import validate_object_id
from models.company import (
    CompanyCreate,
    AddMember
)

from services.security import verify_token

from database import get_database


router = APIRouter(
    prefix="/company",
    tags=["Company"]
)


db = get_database()



@router.post("/create")
def create_company(
    company: CompanyCreate,
    user_email=Depends(verify_token)
):


    result = db.companies.insert_one(
        {
            "name": company.name,

            "owner": user_email,

            "members": [
                user_email
            ]
        }
    )


    return {
        "message": "Company created",
        "company_id": str(
            result.inserted_id
        )
    }

@router.post("/{company_id}/add-member")
def add_member(
    company_id: str,
    member: AddMember,
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


    if company["owner"] != user_email:

        raise HTTPException(
            status_code=403,
            detail="Only owner can add members"
        )


    result = db.companies.update_one(
        {
            "_id": validate_object_id(company_id)
        },

        {
            "$addToSet": {
                "members": member.email
            }
        }
    )


    return {
        "message": "Member added successfully",
        "matched": result.matched_count,
        "modified": result.modified_count
    }

@router.get("/my-companies")
def my_companies(
    user_email=Depends(verify_token)
):


    companies = db.companies.find(
        {
            "members": user_email
        }
    )


    result = []


    for company in companies:

        result.append(
            {
                "company_id": str(
                    company["_id"]
                ),

                "name": company["name"],

                "owner": company["owner"]
            }
        )


    return result