# Backend

## Getting Started

Environment variables

```.env
PORT=8080
MONGODB_URI=mongodb+srv://<username>:<db_password>@cluster0.qqnfc.mongodb.net
SECRET=secret
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Install dependency and run

```bash
bun install
bun dev
```

## API Documentation

### Summary

| **Endpoint**         | **Method** | **Description**               | **Token Required?** |
| -------------------- | ---------- | ----------------------------- | :-----------------: |
| `/api/auth/register` | `POST`     | Register a new user           |          -          |
| `/api/auth/login`    | `POST`     | Login an existing user        |          -          |
| `/auth/google`       | `GET`      | Register or Login with Google |          -          |
| `/api/user`          | `GET`      | Get user data                 |         yes         |

#### Token Authorization

Put the token in the Header with `Authorization` key and `Bearer {token}` value.

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### POST /api/auth/register

#### Register a new user

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Authorization**: none
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
- **Authorization**: none
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

---

### GET /auth/google

#### Register or Login with Google

- **URL**: `/auth/google`
- **Method**: `GET`
- **Authorization**: none
- **Request Body**: none
- **Response**:
  - **200**: Returns JWT token.

    ```json
    {
      "message": "google login success",
      "token": "jwt_token_here"
    }
    ```

---

### GET /api/user

#### Get user data

- **URL**: `/api/user`
- **Method**: `GET`
- **Authorization**: Bearer token
- **Request Body**: none
- **Response**:
  - **200**: Returns the user object and a JWT token.

    ```json
    {
      "message": "google login success",
      "token": "jwt_token_here"
    }
    ```

  - **401**: Invalid token.

      ```json
      { "message": "user is not found" }
      ```

      ```json
      { "message": "token is invalid" }
      ```
