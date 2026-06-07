from fastapi import APIRouter
from pydantic import BaseModel

from services.auth_service import (
    signup_user,
    login_user
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


class UserRequest(BaseModel):
    email: str
    password: str


@router.post("/signup")
def signup(
    request: UserRequest
):

    return signup_user(
        request.email,
        request.password
    )


@router.post("/login")
def login(
    request: UserRequest
):

    return login_user(
        request.email,
        request.password
    )