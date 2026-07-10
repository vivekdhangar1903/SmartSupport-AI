from pydantic import BaseModel


class CompanyCreate(BaseModel):

    name: str

class AddMember(BaseModel):

    email: str