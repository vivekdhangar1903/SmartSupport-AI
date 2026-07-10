from passlib.context import CryptContext

from jose import jwt, JWTError

from datetime import datetime, timedelta

from fastapi import HTTPException, Depends

from fastapi.security import OAuth2PasswordBearer

from core.config import settings



pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)



oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login-token"
)



def hash_password(password: str):

    return pwd_context.hash(password)



def verify_password(password, hashed):

    return pwd_context.verify(
        password,
        hashed
    )



def create_access_token(data: dict):

    to_encode = data.copy()


    expire = datetime.utcnow() + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )


    to_encode.update(
        {
            "exp": expire
        }
    )


    token = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )


    return token




def verify_token(
    token: str = Depends(oauth2_scheme)
):

    try:

        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[
                settings.ALGORITHM
            ]
        )


        email = payload.get(
            "email"
        )


        if email is None:

            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )


        return email


    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )