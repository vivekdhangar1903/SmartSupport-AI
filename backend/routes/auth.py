from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from models.user import UserRegister, UserLogin
from database import get_database

from services.security import (
    hash_password,
    verify_password,
    create_access_token
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


db = get_database()


@router.post("/register")
def register(user: UserRegister):

    existing_user = db.users.find_one(
        {"email": user.email}
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )


    db.users.insert_one(
        {
            "name": user.name,
            "email": user.email,
            "password": hash_password(user.password)
        }
    )


    return {
        "message": "User registered successfully"
    }



@router.post("/login")
def login(user: UserLogin):

    existing_user = db.users.find_one(
        {"email": user.email}
    )


    if not existing_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )


    if not verify_password(
        user.password,
        existing_user["password"]
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )


    access_token = create_access_token(
        {
            "email": existing_user["email"]
        }
    )


    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.post("/login-token")
def login_token(
    form_data: OAuth2PasswordRequestForm = Depends()
):

    existing_user = db.users.find_one(
        {
            "email": form_data.username
        }
    )


    if not existing_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )


    if not verify_password(
        form_data.password,
        existing_user["password"]
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )


    access_token = create_access_token(
        {
            "email": existing_user["email"]
        }
    )


    return {
        "access_token": access_token,
        "token_type": "bearer"
    }