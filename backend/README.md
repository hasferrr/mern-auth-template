# Backend

## Getting Started

Environment variables

```.env
PORT=8080
BACKEND_URL=http://localhost:8080
FRONTEND_URL=http://localhost:5173
SECRET=secret
MONGODB_URI=mongodb+srv://<username>:<db_password>@cluster0.qqnfc.mongodb.net
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Install dependencies and run

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

##### Method 1

Put token into cookies and allow credentials in axios requests.

```ts
await axios.get(baseUrl, {
  withCredentials: true,
})
```

Get cookies from `req.cookies` object.

```ts
(req: Request, res: Response) => {
  const token: string | null = req.cookies.jwt
}
```

##### Method 2

Put the token in the Header with `Authorization` key and `Bearer {token}` value.

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Get the token from the header.

```ts
(req: Request, res: Response) => {
  const authorization: string | undefined = req.get('authorization')
}
```
