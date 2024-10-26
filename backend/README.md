# Backend

## Getting Started

```bash
bun install
bun dev
```

## API Documentation

Summary

| **Endpoint**         | **Method** | **Description**        |
| -------------------- | ---------- | ---------------------- |
| `/api/auth/register` | `POST`     | Register a new user    |
| `/api/auth/login`    | `POST`     | Login an existing user |

### POST /api/auth/register

#### Register a new user

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Request Body**:
  - `username` (string): The new user's username.
  - `password` (string): The new user's password.
- **Response**:
  - **201**: User registered successfully.

    ```json
    { "message": "User registered successfully" }
    ```

  - **400**: If any required field is missing or invalid.

    ```json
    { "message": "Invalid input" }
    ```

  - **500**: Error occurred during registration.

---

### POST /api/auth/login

#### Login an existing user

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:
  - `username` (string): The user's username.
  - `password` (string): The user's password.
- **Response**:
  - **200**: Login successful. Returns a JWT token.

    ```json
    { "token": "jwt_token_here" }
    ```

  - **400**: Invalid credentials.

    ```json
    { "message": "Invalid credentials" }
    ```

  - **500**: Error occurred during login.
