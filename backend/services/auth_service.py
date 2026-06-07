import json
import os

USERS_FILE = "database/users.json"


def load_users():

    if not os.path.exists(
        USERS_FILE
    ):
        return []

    with open(
        USERS_FILE,
        "r"
    ) as file:

        return json.load(
            file
        )


def save_users(users):

    with open(
        USERS_FILE,
        "w"
    ) as file:

        json.dump(
            users,
            file,
            indent=4
        )


def signup_user(
    email,
    password
):

    users = load_users()

    existing_user = next(
        (
            user
            for user in users
            if user["email"]
            == email
        ),
        None
    )

    if existing_user:

        return {
            "success": False,
            "message":
            "User already exists."
        }

    new_user = {
        "id":
        len(users) + 1,

        "email":
        email,

        "password":
        password
    }

    users.append(
        new_user
    )

    save_users(
        users
    )

    return {
        "success": True,
        "message":
        "Account created."
    }


def login_user(
    email,
    password
):

    users = load_users()

    user = next(
        (
            user
            for user in users
            if user["email"]
            == email
            and user["password"]
            == password
        ),
        None
    )

    if not user:

        return {
            "success": False,
            "message":
            "Invalid credentials."
        }

    return {
        "success": True,
        "message":
        "Login successful.",
        "user": {
            "id":
            user["id"],

            "email":
            user["email"]
        }
    }