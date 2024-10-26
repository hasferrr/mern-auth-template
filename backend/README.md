# Backend

## Getting Started

Environment variables

```.env
PORT=8080
MONGODB_URI=mongodb+srv://<username>:<db_password>@cluster0.qqnfc.mongodb.net
SECRET=secret
```

Install dependency and run

```bash
bun install
bun dev
```

## API Documentation

### Summary

| **Endpoint**         | **Method** | **Description**        |
| -------------------- | ---------- | ---------------------- |
| `/api/auth/register` | `POST`     | Register a new user    |
| `/api/auth/login`    | `POST`     | Login an existing user |

---

### POST /api/auth/register

#### Register a new user

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Request Body**:
  - `username` (string): The new user's username.
  - `email` (string): The new user's email.
  - `password` (string): The new user's password.
- **Response**:
  - **201**: User registered successfully along with JWT token.

    ```json
    {
      "message": "register success",
      "user": {
        "_id": "user_id_here",
        "username": "new_username",
        "email": "new_email",
        "passwordHash": "hashed_password"
      },
      "token": "jwt_token_here"
    }
    ```

  - **400**: Invalid request body or input validation error.

    - If required fields are missing:

      ```json
      { "message": "invalid request body" }
      ```

    - If `username` or `password` are too short or too long:

      ```json
      { "message": "username or password too short/long" }
      ```

    - If `username` or `email` already exists:

      ```json
      { "message": "username or email already in use" }
      ```

---

### POST /api/auth/login

#### Login an existing user

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:
  - `username` (string): The user's username. (optional, if `email` is provided)
  - `email` (string): The user's email. (optional, if `username` is provided)
  - `password` (string): The user's password.
- **Response**:
  - **200**: Login successful. Returns the user object and a JWT token.

    ```json
    {
      "message": "login success",
      "user": {
        "_id": "user_id_here",
        "username": "existing_username",
        "email": "existing_email",
        "passwordHash": "hashed_password"
      },
      "token": "jwt_token_here"
    }
    ```

  - **400**: Invalid credentials or invalid request body.

    - If both `username` and `email` are missing:

      ```json
      { "message": "invalid request body" }
      ```

    - If credentials are incorrect:

      ```json
      { "message": "invalid credentials" }
      ```
