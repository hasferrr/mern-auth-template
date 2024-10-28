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

## API

### Summary

| **Endpoint**     | **Method** | **Description**               |             **Body**              | **Token?** |
| ---------------- | ---------- | ----------------------------- | :-------------------------------: | :--------: |
| `/auth/register` | `POST`     | Register a new user           |  `username`, `email`, `password`  |     -      |
| `/auth/login`    | `POST`     | Login an existing user        | `username` or `email`, `password` |     -      |
| `/auth/google`   | `GET`      | Register or Login with Google |                 -                 |     -      |
| `/user`          | `GET`      | Get user data                 |                 -                 |    yes     |

#### Token Authorization

Put the token in the Header with `Authorization` key and `Bearer {token}` value.

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
